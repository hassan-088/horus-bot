import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/lib/i18n';

type FontScale = 'sm' | 'md' | 'lg' | 'xl';

interface AppState {
  language: Language;
  fontScale: FontScale;
}

interface AppContextType extends AppState {
  setLanguage: (lang: Language) => void;
  setFontScale: (scale: FontScale) => void;
  isRTL: boolean;
}

const STORAGE_KEY = 'horus-bot-prefs';
const LEGACY_KEY = 'ankhu-app-state';

const defaultState: AppState = {
  language: 'en',
  fontScale: 'md',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function normalizeLanguage(language: unknown): Language {
  return language === 'ar' ? 'ar' : 'en';
}

function loadInitial(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    // Drop the legacy key if present — we have migrated.
    if (localStorage.getItem(LEGACY_KEY)) localStorage.removeItem(LEGACY_KEY);
    return {
      language: normalizeLanguage(parsed.language),
      fontScale: (parsed.fontScale as FontScale) ?? defaultState.fontScale,
    };
  } catch {
    return defaultState;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Site is locked to LIGHT mode — no dark / high-contrast classes.
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'high-contrast');
  }, []);

  // RTL + lang attributes
  useEffect(() => {
    document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = state.language;
  }, [state.language]);

  // Font scale class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg', 'font-scale-xl');
    root.classList.add(`font-scale-${state.fontScale}`);
  }, [state.fontScale]);

  const setLanguage = (language: Language) => setState((s) => ({ ...s, language: normalizeLanguage(language) }));
  const setFontScale = (fontScale: FontScale) => setState((s) => ({ ...s, fontScale }));

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLanguage,
        setFontScale,
        isRTL: state.language === 'ar',
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}
