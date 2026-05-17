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
import { useQueryClient } from '@tanstack/react-query';
import { auth, db } from '@/integrations/firebase/client';
import type { Language } from '@/lib/i18n';
import { isConnectionError, productMessage } from '@/lib/productMessages';

// Public app-level user shape. We keep `id` as the field name (mapped from
// Firebase `uid`) so the rest of the codebase doesn't need to change.
interface AppUser {
  id: string;
  email: string | null;
}

interface Profile {
  id: string;
  uid: string;
  email: string | null;
  display_name: string | null;
  full_name: string | null;
  phone_number: string | null;
  nationality: string | null;
  preferred_language: string | null;
  avatar_url: string | null;
  accessibility_defaults: Record<string, unknown>;
  marketing_opt_in: boolean;
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
  profileLoadError: string | null;
  signUp: (email: string, password: string, displayNameOrExtras?: string | SignUpExtras) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  syncPreferredLanguage: (language: Language) => Promise<void>;
  reloadProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Map Firebase Auth error codes to friendly messages. Never expose raw codes.
export function friendlyAuthError(err: unknown, isArabic = false): string {
  const code = (err as { code?: string })?.code ?? '';
  if (code === 'auth/network-request-failed') return productMessage('network', isArabic);
  if (code === 'auth/operation-not-allowed') return productMessage('generic', isArabic);
  const map: Record<string, { en: string; ar: string }> = {
    'auth/email-already-in-use': {
      en: 'This email is already registered. Please log in instead.',
      ar: 'هذا البريد مسجل بالفعل. سجل الدخول بدلا من ذلك.',
    },
    'auth/invalid-email': {
      en: 'Please enter a valid email address.',
      ar: 'يرجى إدخال بريد إلكتروني صحيح.',
    },
    'auth/weak-password': {
      en: 'Password is too weak. Use at least 8 characters with uppercase, lowercase, number, and special character.',
      ar: 'كلمة المرور ضعيفة. استخدم 8 أحرف على الأقل مع حرف كبير وصغير ورقم ورمز.',
    },
    'auth/operation-not-allowed': {
      en: 'Something went wrong. Please try again.',
      ar: 'إنشاء الحساب بالبريد وكلمة المرور غير مفعل حاليا. يرجى التواصل مع الدعم.',
    },
    'auth/network-request-failed': {
      en: 'Connection issue. Please check your internet connection and try again.',
      ar: 'تعذر الاتصال. تحقق من الإنترنت ثم حاول مرة أخرى.',
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
      ar: 'محاولات كثيرة جدا. انتظر قليلا ثم حاول مرة أخرى.',
    },
  };
  const entry = map[code];
  if (entry) return isArabic ? entry.ar : entry.en;
  return isArabic ? 'حدث خطأ ما. يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.';
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

export const normalizeAccountLanguage = (value: unknown): 'english' | 'arabic' => {
  const raw = String(value ?? '').trim().toLowerCase().replaceAll('-', '_');
  return raw === 'ar' || raw === 'arabic' ? 'arabic' : 'english';
};

export const accountLanguageToUi = (value: unknown): Language =>
  normalizeAccountLanguage(value) === 'arabic' ? 'ar' : 'en';

export const uiLanguageToAccount = (language: Language): 'english' | 'arabic' =>
  language === 'ar' ? 'arabic' : 'english';

async function ensureProfileDoc(fu: FirebaseUser, extras?: SignUpExtras): Promise<Profile> {
  const ref = doc(db, 'users', fu.uid);
  const snap = await getDoc(ref);
  const nowIso = new Date().toISOString();
  if (!snap.exists()) {
    const fullName = extras?.fullName ?? fu.displayName ?? null;
    const initial = {
      uid: fu.uid,
      email: fu.email,
      full_name: fullName,
      display_name: fullName ?? (fu.email ? fu.email.split('@')[0] : null),
      phone_number: extras?.phoneNumber ?? null,
      nationality: extras?.nationality ?? null,
      preferred_language: normalizeAccountLanguage(extras?.preferredLanguage),
      avatar_url: fu.photoURL ?? null,
      accessibility_defaults: {},
      marketing_opt_in: false,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      last_seen_at: serverTimestamp(),
    };
    await setDoc(ref, initial);
    return {
      id: fu.uid,
      uid: fu.uid,
      email: fu.email,
      display_name: initial.display_name,
      full_name: initial.full_name,
      phone_number: initial.phone_number,
      nationality: initial.nationality,
      preferred_language: initial.preferred_language,
      avatar_url: initial.avatar_url,
      accessibility_defaults: initial.accessibility_defaults,
      marketing_opt_in: initial.marketing_opt_in,
      created_at: nowIso,
      updated_at: nowIso,
      last_seen_at: nowIso,
    };
  }
  const d = snap.data() as Record<string, unknown>;
  const merged = {
    uid: fu.uid,
    email: (d.email as string | null) ?? fu.email,
    full_name: (d.full_name as string | null) ?? fu.displayName ?? null,
    display_name:
      (d.display_name as string | null) ??
      fu.displayName ??
      (fu.email ? fu.email.split('@')[0] : null),
    phone_number: (d.phone_number as string | null) ?? null,
    nationality: (d.nationality as string | null) ?? null,
    preferred_language: normalizeAccountLanguage(d.preferred_language),
    avatar_url: (d.avatar_url as string | null) ?? fu.photoURL ?? null,
    accessibility_defaults: (d.accessibility_defaults as Record<string, unknown>) ?? {},
    marketing_opt_in: (d.marketing_opt_in as boolean) ?? false,
  };
  await setDoc(
    ref,
    {
      ...merged,
      created_at: d.created_at ?? serverTimestamp(),
      last_seen_at: serverTimestamp(),
    },
    { merge: true },
  );
  return {
    id: fu.uid,
    uid: fu.uid,
    email: merged.email,
    display_name: merged.display_name,
    full_name: merged.full_name,
    phone_number: merged.phone_number,
    nationality: merged.nationality,
    preferred_language: merged.preferred_language,
    avatar_url: merged.avatar_url,
    accessibility_defaults: merged.accessibility_defaults,
    marketing_opt_in: merged.marketing_opt_in,
    created_at: tsToIso(d.created_at),
    updated_at: tsToIso(d.updated_at),
    last_seen_at: nowIso,
  };
}

export function AuthProvider({
  children,
  onPreferredLanguageLoaded,
}: {
  children: ReactNode;
  onPreferredLanguageLoaded?: (language: Language) => void;
}) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoadError, setProfileLoadError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const loadProfile = async (fu: FirebaseUser) => {
    setProfileLoadError(null);
    try {
      const p = await ensureProfileDoc(fu);
      setProfile(p);
      onPreferredLanguageLoaded?.(accountLanguageToUi(p.preferred_language));
    } catch (e) {
      console.error('Failed to load profile', e);
      setProfile(null);
      setProfileLoadError(isConnectionError(e) ? productMessage('network') : productMessage('profileLoad'));
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fu) => {
      setUser(toAppUser(fu));
      if (fu) {
        await loadProfile(fu);
      } else {
        setProfile(null);
        setProfileLoadError(null);
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
      setProfileLoadError(null);
      return { error: null };
    } catch (e) {
      console.error('[Horus-Bot] Profile update failed', e);
      return {
        error: new Error(isConnectionError(e) ? productMessage('network') : productMessage('profile')),
      };
    }
  };

  const signIn: AuthContextType['signIn'] = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (e) {
      console.error('[Horus-Bot] Password reset failed', e);
      return {
        error: new Error(isConnectionError(e) ? productMessage('network') : productMessage('generic')),
      };
    }
  };

  const signOut = async () => {
    await fbSignOut(auth);
    setUser(null);
    setProfile(null);
    setProfileLoadError(null);
    queryClient.clear();
  };

  const updateProfile: AuthContextType['updateProfile'] = async (updates) => {
    if (!user) return { error: new Error(productMessage('generic')) };
    try {
      const ref = doc(db, 'users', user.id);
      const safeUpdates = sanitizeProfileUpdates(updates);
      await setDoc(
        ref,
        { ...safeUpdates, updated_at: serverTimestamp() },
        { merge: true },
      );
      setProfile((prev) =>
        prev ? { ...prev, ...safeUpdates, updated_at: new Date().toISOString() } : prev,
      );
      return { error: null };
    } catch (e) {
      console.error('[Horus-Bot] Profile update failed', e);
      return {
        error: new Error(isConnectionError(e) ? productMessage('network') : productMessage('profile')),
      };
    }
  };

  const syncPreferredLanguage: AuthContextType['syncPreferredLanguage'] = async (language) => {
    if (!user) return;
    const preferred_language = uiLanguageToAccount(language);
    const ref = doc(db, 'users', user.id);
    await setDoc(ref, { preferred_language, updated_at: serverTimestamp() }, { merge: true });
    setProfile((prev) =>
      prev ? { ...prev, preferred_language, updated_at: new Date().toISOString() } : prev,
    );
  };

  const reloadProfile = async () => {
    const fu = auth.currentUser;
    if (!fu) return;
    setIsLoading(true);
    await loadProfile(fu);
    setIsLoading(false);
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
        profileLoadError,
        signUp,
        signIn,
        signOut,
        updateProfile,
        resetPassword,
        syncPreferredLanguage,
        reloadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function sanitizeProfileUpdates(updates: Partial<Profile>): Partial<Profile> {
  const allowed: Partial<Profile> = {};
  if ('full_name' in updates) allowed.full_name = updates.full_name ?? null;
  if ('display_name' in updates) allowed.display_name = updates.display_name ?? null;
  if ('phone_number' in updates) allowed.phone_number = updates.phone_number ?? null;
  if ('nationality' in updates) allowed.nationality = updates.nationality ?? null;
  if ('preferred_language' in updates) {
    allowed.preferred_language = normalizeAccountLanguage(updates.preferred_language);
  }
  if ('avatar_url' in updates) allowed.avatar_url = updates.avatar_url ?? null;
  if ('accessibility_defaults' in updates) {
    allowed.accessibility_defaults = updates.accessibility_defaults ?? {};
  }
  if ('marketing_opt_in' in updates) {
    allowed.marketing_opt_in = updates.marketing_opt_in === true;
  }
  return allowed;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
