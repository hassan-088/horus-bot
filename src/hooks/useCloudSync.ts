import { useCallback, useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserProgress {
  visited_exhibits: string[];
  quiz_completed: boolean;
  quiz_score: number;
  chat_count: number;
  ar_used: boolean;
  streak_days: number;
  last_visit_date: string | null;
  total_visits: number;
}

interface VisitHistoryItem {
  id: string;
  exhibit_id: string;
  visited_at: string;
}

const PROGRESS_DOC_ID = 'main';

function tsToIso(v: unknown): string {
  if (!v) return new Date().toISOString();
  if (v instanceof Timestamp) return v.toDate().toISOString();
  return String(v);
}

export function useCloudSync() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [visitHistory, setVisitHistory] = useState<VisitHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchAllData = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const favCol = collection(db, 'users', user.id, 'favorites');
      const histCol = collection(db, 'users', user.id, 'visitHistory');
      const progRef = doc(db, 'users', user.id, 'progress', PROGRESS_DOC_ID);

      const [favSnap, histSnap, progSnap] = await Promise.all([
        getDocs(favCol),
        getDocs(query(histCol, orderBy('visited_at', 'desc'))),
        getDoc(progRef),
      ]);

      setFavorites(favSnap.docs.map((d) => d.id));
      setVisitHistory(
        histSnap.docs.map((d) => {
          const x = d.data() as Record<string, unknown>;
          return {
            id: d.id,
            exhibit_id: (x.exhibit_id as string) ?? '',
            visited_at: tsToIso(x.visited_at),
          };
        }),
      );

      if (progSnap.exists()) {
        const p = progSnap.data() as Record<string, unknown>;
        setProgress({
          visited_exhibits: (p.visited_exhibits as string[]) ?? [],
          quiz_completed: (p.quiz_completed as boolean) ?? false,
          quiz_score: (p.quiz_score as number) ?? 0,
          chat_count: (p.chat_count as number) ?? 0,
          ar_used: (p.ar_used as boolean) ?? false,
          streak_days: (p.streak_days as number) ?? 0,
          last_visit_date: (p.last_visit_date as string) ?? null,
          total_visits: (p.total_visits as number) ?? 0,
        });
      } else {
        const today = new Date().toISOString().split('T')[0];
        const initial: UserProgress = {
          visited_exhibits: [],
          quiz_completed: false,
          quiz_score: 0,
          chat_count: 0,
          ar_used: false,
          streak_days: 1,
          last_visit_date: today,
          total_visits: 1,
        };
        await setDoc(progRef, initial);
        setProgress(initial);
      }
    } catch (e) {
      console.error('Error fetching user data:', e);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAllData();
    } else {
      setFavorites([]);
      setProgress(null);
      setVisitHistory([]);
      setIsLoading(false);
    }
  }, [user, fetchAllData]);

  const updateProgress = async (uid: string, patch: Partial<UserProgress>) => {
    const ref = doc(db, 'users', uid, 'progress', PROGRESS_DOC_ID);
    await setDoc(ref, patch, { merge: true });
  };

  const toggleFavorite = useCallback(
    async (exhibitId: string): Promise<boolean> => {
      if (!user) return false;
      setIsSyncing(true);
      const isSaved = favorites.includes(exhibitId);
      try {
        const ref = doc(db, 'users', user.id, 'favorites', exhibitId);
        if (isSaved) {
          await deleteDoc(ref);
          setFavorites((prev) => prev.filter((id) => id !== exhibitId));
        } else {
          await setDoc(ref, { exhibit_id: exhibitId, created_at: serverTimestamp() });
          setFavorites((prev) => [...prev, exhibitId]);
        }
        return !isSaved;
      } catch (e) {
        console.error('Error toggling favorite:', e);
        return isSaved;
      } finally {
        setIsSyncing(false);
      }
    },
    [user, favorites],
  );

  const markVisited = useCallback(
    async (exhibitId: string) => {
      if (!user || !progress) return;
      if (progress.visited_exhibits.includes(exhibitId)) return;
      setIsSyncing(true);
      const newVisited = [...progress.visited_exhibits, exhibitId];
      try {
        await updateProgress(user.id, { visited_exhibits: newVisited });
        const histRef = await addDoc(collection(db, 'users', user.id, 'visitHistory'), {
          exhibit_id: exhibitId,
          visited_at: serverTimestamp(),
        });
        setProgress((prev) => (prev ? { ...prev, visited_exhibits: newVisited } : prev));
        setVisitHistory((prev) => [
          { id: histRef.id, exhibit_id: exhibitId, visited_at: new Date().toISOString() },
          ...prev,
        ]);
      } catch (e) {
        console.error('Error marking visited:', e);
      } finally {
        setIsSyncing(false);
      }
    },
    [user, progress],
  );

  const completeQuiz = useCallback(
    async (score: number) => {
      if (!user) return;
      setIsSyncing(true);
      try {
        await updateProgress(user.id, { quiz_completed: true, quiz_score: score });
        setProgress((prev) => (prev ? { ...prev, quiz_completed: true, quiz_score: score } : prev));
      } catch (e) {
        console.error('Error completing quiz:', e);
      } finally {
        setIsSyncing(false);
      }
    },
    [user],
  );

  const incrementChatCount = useCallback(async () => {
    if (!user || !progress) return;
    setIsSyncing(true);
    const newCount = progress.chat_count + 1;
    try {
      await updateProgress(user.id, { chat_count: newCount });
      setProgress((prev) => (prev ? { ...prev, chat_count: newCount } : prev));
    } catch (e) {
      console.error('Error incrementing chat count:', e);
    } finally {
      setIsSyncing(false);
    }
  }, [user, progress]);

  const markARUsed = useCallback(async () => {
    if (!user || progress?.ar_used) return;
    setIsSyncing(true);
    try {
      await updateProgress(user.id, { ar_used: true });
      setProgress((prev) => (prev ? { ...prev, ar_used: true } : prev));
    } catch (e) {
      console.error('Error marking AR used:', e);
    } finally {
      setIsSyncing(false);
    }
  }, [user, progress]);

  const updateStreak = useCallback(async () => {
    if (!user || !progress) return;
    const today = new Date().toISOString().split('T')[0];
    if (progress.last_visit_date === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const isConsecutive = progress.last_visit_date === yesterday;
    const newStreak = isConsecutive ? progress.streak_days + 1 : 1;
    setIsSyncing(true);
    try {
      await updateProgress(user.id, {
        streak_days: newStreak,
        last_visit_date: today,
        total_visits: progress.total_visits + 1,
      });
      setProgress((prev) =>
        prev
          ? {
              ...prev,
              streak_days: newStreak,
              last_visit_date: today,
              total_visits: prev.total_visits + 1,
            }
          : prev,
      );
    } catch (e) {
      console.error('Error updating streak:', e);
    } finally {
      setIsSyncing(false);
    }
  }, [user, progress]);

  return {
    favorites,
    progress,
    visitHistory,
    isLoading,
    isSyncing,
    isLoggedIn: !!user,
    toggleFavorite,
    markVisited,
    completeQuiz,
    incrementChatCount,
    markARUsed,
    updateStreak,
    refreshData: fetchAllData,
  };
}
