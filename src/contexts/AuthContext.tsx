import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile as fbUpdateProfile,
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
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  visit_count: number;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: AppUser | null;
  session: { user: AppUser } | null; // back-compat shim, not really used
  profile: Profile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toAppUser(fu: FirebaseUser | null): AppUser | null {
  if (!fu) return null;
  return { id: fu.uid, email: fu.email };
}

async function ensureProfileDoc(fu: FirebaseUser, displayName?: string): Promise<Profile> {
  const ref = doc(db, 'users', fu.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const nowIso = new Date().toISOString();
    const initial = {
      user_id: fu.uid,
      email: fu.email,
      display_name: displayName ?? fu.displayName ?? (fu.email ? fu.email.split('@')[0] : null),
      avatar_url: fu.photoURL ?? null,
      visit_count: 0,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    };
    await setDoc(ref, initial);
    return {
      id: fu.uid,
      user_id: fu.uid,
      display_name: initial.display_name,
      avatar_url: initial.avatar_url,
      visit_count: 0,
      created_at: nowIso,
      updated_at: nowIso,
    };
  }
  const d = snap.data() as Record<string, unknown>;
  const tsToIso = (v: unknown): string => {
    if (!v) return new Date().toISOString();
    if (typeof v === 'object' && v !== null && 'toDate' in v) {
      return (v as { toDate: () => Date }).toDate().toISOString();
    }
    return String(v);
  };
  return {
    id: fu.uid,
    user_id: fu.uid,
    display_name: (d.display_name as string | null) ?? null,
    avatar_url: (d.avatar_url as string | null) ?? null,
    visit_count: (d.visit_count as number) ?? 0,
    created_at: tsToIso(d.created_at),
    updated_at: tsToIso(d.updated_at),
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

  const signUp: AuthContextType['signUp'] = async (email, password, displayName) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        try { await fbUpdateProfile(cred.user, { displayName }); } catch { /* non-fatal */ }
      }
      const p = await ensureProfileDoc(cred.user, displayName);
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
