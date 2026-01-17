import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

export function useCloudSync() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [visitHistory, setVisitHistory] = useState<VisitHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Fetch all user data on mount
  useEffect(() => {
    if (user) {
      fetchAllData();
    } else {
      setFavorites([]);
      setProgress(null);
      setVisitHistory([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchAllData = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      // Fetch favorites, progress, and history in parallel
      const [favResult, progressResult, historyResult] = await Promise.all([
        supabase.from('user_favorites').select('exhibit_id').eq('user_id', user.id),
        supabase.from('user_progress').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('visit_history').select('*').eq('user_id', user.id).order('visited_at', { ascending: false }),
      ]);

      if (favResult.data) {
        setFavorites(favResult.data.map(f => f.exhibit_id));
      }

      if (progressResult.data) {
        setProgress({
          visited_exhibits: progressResult.data.visited_exhibits || [],
          quiz_completed: progressResult.data.quiz_completed || false,
          quiz_score: progressResult.data.quiz_score || 0,
          chat_count: progressResult.data.chat_count || 0,
          ar_used: progressResult.data.ar_used || false,
          streak_days: progressResult.data.streak_days || 0,
          last_visit_date: progressResult.data.last_visit_date,
          total_visits: progressResult.data.total_visits || 0,
        });
      } else {
        // Create initial progress record
        const today = new Date().toISOString().split('T')[0];
        const initialProgress = {
          user_id: user.id,
          visited_exhibits: [],
          quiz_completed: false,
          quiz_score: 0,
          chat_count: 0,
          ar_used: false,
          streak_days: 1,
          last_visit_date: today,
          total_visits: 1,
        };
        await supabase.from('user_progress').insert(initialProgress);
        setProgress({
          ...initialProgress,
          last_visit_date: today,
        });
      }

      if (historyResult.data) {
        setVisitHistory(historyResult.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle favorite
  const toggleFavorite = useCallback(async (exhibitId: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsSyncing(true);
    const isSaved = favorites.includes(exhibitId);

    try {
      if (isSaved) {
        await supabase.from('user_favorites').delete().eq('user_id', user.id).eq('exhibit_id', exhibitId);
        setFavorites(prev => prev.filter(id => id !== exhibitId));
      } else {
        await supabase.from('user_favorites').insert({ user_id: user.id, exhibit_id: exhibitId });
        setFavorites(prev => [...prev, exhibitId]);
      }
      return !isSaved;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return isSaved;
    } finally {
      setIsSyncing(false);
    }
  }, [user, favorites]);

  // Mark exhibit visited
  const markVisited = useCallback(async (exhibitId: string) => {
    if (!user || !progress) return;
    if (progress.visited_exhibits.includes(exhibitId)) return;

    setIsSyncing(true);
    const newVisited = [...progress.visited_exhibits, exhibitId];

    try {
      // Update progress
      await supabase.from('user_progress').update({
        visited_exhibits: newVisited,
      }).eq('user_id', user.id);

      // Add to visit history
      const { data } = await supabase.from('visit_history').insert({
        user_id: user.id,
        exhibit_id: exhibitId,
      }).select().single();

      setProgress(prev => prev ? { ...prev, visited_exhibits: newVisited } : null);
      if (data) {
        setVisitHistory(prev => [data, ...prev]);
      }
    } catch (error) {
      console.error('Error marking visited:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [user, progress]);

  // Complete quiz
  const completeQuiz = useCallback(async (score: number) => {
    if (!user) return;

    setIsSyncing(true);
    try {
      await supabase.from('user_progress').update({
        quiz_completed: true,
        quiz_score: score,
      }).eq('user_id', user.id);

      setProgress(prev => prev ? { ...prev, quiz_completed: true, quiz_score: score } : null);
    } catch (error) {
      console.error('Error completing quiz:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [user]);

  // Increment chat count
  const incrementChatCount = useCallback(async () => {
    if (!user || !progress) return;

    setIsSyncing(true);
    const newCount = progress.chat_count + 1;

    try {
      await supabase.from('user_progress').update({
        chat_count: newCount,
      }).eq('user_id', user.id);

      setProgress(prev => prev ? { ...prev, chat_count: newCount } : null);
    } catch (error) {
      console.error('Error incrementing chat count:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [user, progress]);

  // Mark AR used
  const markARUsed = useCallback(async () => {
    if (!user || progress?.ar_used) return;

    setIsSyncing(true);
    try {
      await supabase.from('user_progress').update({
        ar_used: true,
      }).eq('user_id', user.id);

      setProgress(prev => prev ? { ...prev, ar_used: true } : null);
    } catch (error) {
      console.error('Error marking AR used:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [user, progress]);

  // Update streak on app visit
  const updateStreak = useCallback(async () => {
    if (!user || !progress) return;

    const today = new Date().toISOString().split('T')[0];
    if (progress.last_visit_date === today) return; // Already visited today

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const isConsecutive = progress.last_visit_date === yesterday;
    const newStreak = isConsecutive ? progress.streak_days + 1 : 1;

    setIsSyncing(true);
    try {
      await supabase.from('user_progress').update({
        streak_days: newStreak,
        last_visit_date: today,
        total_visits: progress.total_visits + 1,
      }).eq('user_id', user.id);

      setProgress(prev => prev ? {
        ...prev,
        streak_days: newStreak,
        last_visit_date: today,
        total_visits: prev.total_visits + 1,
      } : null);
    } catch (error) {
      console.error('Error updating streak:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [user, progress]);

  return {
    // State
    favorites,
    progress,
    visitHistory,
    isLoading,
    isSyncing,
    isLoggedIn: !!user,
    
    // Actions
    toggleFavorite,
    markVisited,
    completeQuiz,
    incrementChatCount,
    markARUsed,
    updateStreak,
    refreshData: fetchAllData,
  };
}
