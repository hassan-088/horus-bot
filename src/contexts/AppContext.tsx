import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/lib/i18n';
import { Ticket } from '@/lib/data';

type ThemeMode = 'system' | 'light' | 'dark';
type FontScale = 'sm' | 'md' | 'lg' | 'xl';

interface AppState {
  language: Language;
  themeMode: ThemeMode;
  highContrast: boolean;
  fontScale: FontScale;
  onboardingCompleted: boolean;
  savedExhibits: string[];
  visitedExhibits: string[];
  tickets: Ticket[];
  privacyAccepted: boolean;
  tourAlertShown: boolean;
  quizCompleted: boolean;
  quizScore: number;
}

interface AppContextType extends AppState {
  setLanguage: (lang: Language) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setHighContrast: (enabled: boolean) => void;
  setFontScale: (scale: FontScale) => void;
  completeOnboarding: () => void;
  toggleSavedExhibit: (exhibitId: string) => boolean;
  markExhibitVisited: (exhibitId: string) => void;
  addTickets: (tickets: Ticket[]) => void;
  acceptPrivacy: () => void;
  showTourAlert: () => void;
  completeQuiz: (score: number) => void;
  isRTL: boolean;
}

const defaultState: AppState = {
  language: 'en',
  themeMode: 'light',
  highContrast: false,
  fontScale: 'md',
  onboardingCompleted: false,
  savedExhibits: [],
  visitedExhibits: ['golden-mask', 'scarab-amulet'],
  tickets: [],
  privacyAccepted: false,
  tourAlertShown: false,
  quizCompleted: false,
  quizScore: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('ankhu-app-state');
    if (saved) {
      try {
        return { ...defaultState, ...JSON.parse(saved) };
      } catch {
        return defaultState;
      }
    }
    return defaultState;
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('ankhu-app-state', JSON.stringify(state));
  }, [state]);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('dark', 'high-contrast');
    
    if (state.highContrast) {
      root.classList.add('high-contrast');
    } else if (state.themeMode === 'dark') {
      root.classList.add('dark');
    } else if (state.themeMode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      }
    }
  }, [state.themeMode, state.highContrast]);

  // Apply RTL
  useEffect(() => {
    document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = state.language;
  }, [state.language]);

  // Apply font scale
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg', 'font-scale-xl');
    root.classList.add(`font-scale-${state.fontScale}`);
  }, [state.fontScale]);

  const setLanguage = (language: Language) => setState(s => ({ ...s, language }));
  const setThemeMode = (themeMode: ThemeMode) => setState(s => ({ ...s, themeMode }));
  const setHighContrast = (highContrast: boolean) => setState(s => ({ ...s, highContrast }));
  const setFontScale = (fontScale: FontScale) => setState(s => ({ ...s, fontScale }));
  const completeOnboarding = () => setState(s => ({ ...s, onboardingCompleted: true }));
  const acceptPrivacy = () => setState(s => ({ ...s, privacyAccepted: true }));
  const showTourAlert = () => setState(s => ({ ...s, tourAlertShown: true }));
  const completeQuiz = (score: number) => setState(s => ({ ...s, quizCompleted: true, quizScore: score }));

  const toggleSavedExhibit = (exhibitId: string): boolean => {
    const isSaved = state.savedExhibits.includes(exhibitId);
    setState(s => ({
      ...s,
      savedExhibits: isSaved
        ? s.savedExhibits.filter(id => id !== exhibitId)
        : [...s.savedExhibits, exhibitId],
    }));
    return !isSaved;
  };

  const markExhibitVisited = (exhibitId: string) => {
    if (!state.visitedExhibits.includes(exhibitId)) {
      setState(s => ({
        ...s,
        visitedExhibits: [...s.visitedExhibits, exhibitId],
      }));
    }
  };

  const addTickets = (newTickets: Ticket[]) => {
    setState(s => ({
      ...s,
      tickets: [...s.tickets, ...newTickets],
    }));
  };

  const isRTL = state.language === 'ar';

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLanguage,
        setThemeMode,
        setHighContrast,
        setFontScale,
        completeOnboarding,
        toggleSavedExhibit,
        markExhibitVisited,
        addTickets,
        acceptPrivacy,
        showTourAlert,
        completeQuiz,
        isRTL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
