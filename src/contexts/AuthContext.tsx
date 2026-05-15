import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile as fbUpdateProfile,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '@/integrations/firebase/client';

// Public app-level user shape. We keep `id` as the field name (mapped from
// Firebase `uid`) so the rest of the codebase doesn't need to change.
interface AppUser {
  id: string;
  email: string | null;
}

interface Profile {
  id: string;
  uid: string;
  user_id: string;
  email: string | null;
  display_name: string | null;
  full_name: string | null;
  phone_number: string | null;
  nationality: string | null;
  preferred_language: string | null;
  avatar_url: string | null;
  accessibility_defaults: Record<string, unknown>;
  marketing_opt_in: boolean;
  visit_count: number;
  created_at: string;
  updated_at: string;
  last_seen_at: string;
}

export interface SignUpExtras {
  fullName?: string;
  phoneNumber?: string;
  nationality?: string;
  preferredLanguage?: string;
}

interface AuthContextType {
  user: AppUser | null;
  session: { user: AppUser } | null; // back-compat shim
  profile: Profile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, displayNameOrExtras?: string | SignUpExtras) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Map Firebase Auth error codes to friendly messages. Never expose raw codes.
export function friendlyAuthError(err: unknown, isArabic = false): string {
  const code = (err as { code?: string })?.code ?? '';
  const map: Record<string, { en: string; ar: string }> = {
    'auth/email-already-in-use': {
      en: 'This email is already registered. Please log in instead.',
      ar: 'هذا البريد مسجَّل بالفعل. سجّل الدخول بدلاً من ذلك.',
    },
    'auth/invalid-email': {
      en: 'Please enter a valid email address.',
      ar: 'الرجاء إدخال بريد إلكتروني صحيح.',
    },
    'auth/weak-password': {
      en: 'Password is too weak. Use at least 8 characters with uppercase, lowercase, number, and special character.',
      ar: 'كلمة المرور ضعيفة. استخدم 8 أحرف على الأقل تشمل حرفاً كبيراً وصغيراً ورقماً ورمزاً خاصاً.',
    },
    'auth/operation-not-allowed': {
      en: 'Email/password sign-up is not enabled yet. Please contact support.',
      ar: 'تسجيل الدخول بالبريد وكلمة المرور غير مفعَّل بعد. تواصل مع الدعم.',
    },
    'auth/network-request-failed': {
      en: 'Connection issue. Please check your internet and try again.',
      ar: 'مشكلة في الاتصال. تحقق من الإنترنت وحاول مرة أخرى.',
    },
    'auth/user-not-found': {
      en: 'No account found with this email.',
      ar: 'لا يوجد حساب بهذا البريد الإلكتروني.',
    },
    'auth/wrong-password': {
      en: 'Email or password is incorrect.',
      ar: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    },
    'auth/invalid-credential': {
      en: 'Email or password is incorrect.',
      ar: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    },
    'auth/too-many-requests': {
      en: 'Too many attempts. Please wait a moment and try again.',
      ar: 'محاولات كثيرة. انتظر قليلاً ثم حاول مرة أخرى.',
    },
  };
  const entry = map[code];
  if (entry) return isArabic ? entry.ar : entry.en;
  return isArabic ? 'حدث خطأ غير متوقع. حاول مرة أخرى.' : 'Something went wrong. Please try again.';
}

function toAppUser(fu: FirebaseUser | null): AppUser | null {
  if (!fu) return null;
  return { id: fu.uid, email: fu.email };
}

const tsToIso = (v: unknown): string => {
  if (!v) return new Date().toISOString();
  if (typeof v === 'object' && v !== null && 'toDate' in v) {
    return (v as { toDate: () => Date }).toDate().toISOString();
  }
  return String(v);
};

async function ensureProfileDoc(fu: FirebaseUser, extras?: SignUpExtras): Promise<Profile> {
  const ref = doc(db, 'users', fu.uid);
  const snap = await getDoc(ref);
  const nowIso = new Date().toISOString();
  if (!snap.exists()) {
    const fullName = extras?.fullName ?? fu.displayName ?? null;
    const initial = {
      uid: fu.uid,
      user_id: fu.uid,
      email: fu.email,
      full_name: fullName,
      display_name: fullName ?? (fu.email ? fu.email.split('@')[0] : null),
      phone_number: extras?.phoneNumber ?? null,
      nationality: extras?.nationality ?? null,
      preferred_language: extras?.preferredLanguage ?? null,
      avatar_url: fu.photoURL ?? null,
      accessibility_defaults: {},
      marketing_opt_in: false,
      visit_count: 0,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      last_seen_at: serverTimestamp(),
    };
    await setDoc(ref, initial);
    return {
      id: fu.uid,
      uid: fu.uid,
      user_id: fu.uid,
      email: fu.email,
      display_name: initial.display_name,
      full_name: initial.full_name,
      phone_number: initial.phone_number,
      nationality: initial.nationality,
      preferred_language: initial.preferred_language,
      avatar_url: initial.avatar_url,
      accessibility_defaults: initial.accessibility_defaults,
      marketing_opt_in: initial.marketing_opt_in,
      visit_count: 0,
      created_at: nowIso,
      updated_at: nowIso,
      last_seen_at: nowIso,
    };
  }
  const d = snap.data() as Record<string, unknown>;
  const merged = {
    uid: (d.uid as string) ?? fu.uid,
    user_id: (d.user_id as string) ?? fu.uid,
    email: (d.email as string | null) ?? fu.email,
    full_name: (d.full_name as string | null) ?? fu.displayName ?? null,
    display_name: (d.display_name as string | null) ?? fu.displayName ?? (fu.email ? fu.email.split('@')[0] : null),
    phone_number: (d.phone_number as string | null) ?? null,
    nationality: (d.nationality as string | null) ?? null,
    preferred_language: (d.preferred_language as string | null) ?? null,
    avatar_url: (d.avatar_url as string | null) ?? fu.photoURL ?? null,
    accessibility_defaults: (d.accessibility_defaults as Record<string, unknown>) ?? {},
    marketing_opt_in: (d.marketing_opt_in as boolean) ?? false,
    visit_count: (d.visit_count as number) ?? 0,
  };
  await setDoc(
    ref,
    {
      ...merged,
      created_at: d.created_at ?? serverTimestamp(),
      updated_at: serverTimestamp(),
      last_seen_at: serverTimestamp(),
    },
    { merge: true },
  );
  return {
    id: fu.uid,
    uid: fu.uid,
    user_id: merged.user_id,
    email: merged.email,
    display_name: merged.display_name,
    full_name: merged.full_name,
    phone_number: merged.phone_number,
    nationality: merged.nationality,
    preferred_language: merged.preferred_language,
    avatar_url: merged.avatar_url,
    accessibility_defaults: merged.accessibility_defaults,
    marketing_opt_in: merged.marketing_opt_in,
    visit_count: merged.visit_count,
    created_at: tsToIso(d.created_at),
    updated_at: nowIso,
    last_seen_at: nowIso,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fu) => {
      setUser(toAppUser(fu));
      if (fu) {
        try {
          const p = await ensureProfileDoc(fu);
          setProfile(p);
        } catch (e) {
          console.error('Failed to load profile', e);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const signUp: AuthContextType['signUp'] = async (email, password, displayNameOrExtras) => {
    try {
      const extras: SignUpExtras =
        typeof displayNameOrExtras === 'string'
          ? { fullName: displayNameOrExtras }
          : (displayNameOrExtras ?? {});
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (extras.fullName) {
        try { await fbUpdateProfile(cred.user, { displayName: extras.fullName }); } catch { /* non-fatal */ }
      }
      const p = await ensureProfileDoc(cred.user, extras);
      setProfile(p);
      return { error: null };
    } catch (e) {
      return { error: e as Error };
    }
  };

  const signIn: AuthContextType['signIn'] = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (e) {
      return { error: e as Error };
    }
  };

  const signOut = async () => {
    await fbSignOut(auth);
    setUser(null);
    setProfile(null);
  };

  const updateProfile: AuthContextType['updateProfile'] = async (updates) => {
    if (!user) return { error: new Error('No user logged in') };
    try {
      const ref = doc(db, 'users', user.id);
      await setDoc(
        ref,
        { ...updates, updated_at: serverTimestamp() },
        { merge: true },
      );
      setProfile((prev) => (prev ? { ...prev, ...updates, updated_at: new Date().toISOString() } : prev));
      return { error: null };
    } catch (e) {
      return { error: e as Error };
    }
  };

  const resetPassword: AuthContextType['resetPassword'] = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (e) {
      return { error: e as Error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session: user ? { user } : null,
        profile,
        isLoading,
        signUp,
        signIn,
        signOut,
        updateProfile,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
