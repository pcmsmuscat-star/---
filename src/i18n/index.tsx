import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createInstance } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';
import en from './en';
import ar from './ar';
import { keys, storage } from '@/lib/storage';

export type Language = 'en' | 'ar';

const i18n = createInstance();

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export function deviceLanguage(): Language {
  try {
    return getLocales()[0]?.languageCode === 'ar' ? 'ar' : 'en';
  } catch {
    return 'en';
  }
}

type LanguageContextValue = {
  language: Language;
  isRTL: boolean;
  /** True once the saved language has been read (or there was none). */
  ready: boolean;
  /** Whether the person has chosen a language yet (onboarding step 1.1). */
  chosen: boolean;
  setLanguage: (lang: Language) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  isRTL: false,
  ready: true,
  chosen: false,
  setLanguage: async () => {},
});

/**
 * Owns the app language and layout direction.
 * Direction is applied with a `direction` style on the root view, so switching
 * language mirrors the layout immediately without restarting the app.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Language>(deviceLanguage());
  const [ready, setReady] = useState(false);
  const [chosen, setChosen] = useState(false);

  useEffect(() => {
    let alive = true;
    storage.get(keys.language).then((saved) => {
      if (!alive) return;
      if (saved === 'en' || saved === 'ar') {
        setLang(saved);
        setChosen(true);
      }
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [language]);

  const setLanguage = useCallback(async (lang: Language) => {
    setLang(lang);
    setChosen(true);
    await storage.set(keys.language, lang);
  }, []);

  const value = useMemo(
    () => ({ language, isRTL: language === 'ar', ready, chosen, setLanguage }),
    [language, ready, chosen, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Translation hook re-exported so screens import from one place. */
export function useT() {
  return useTranslation().t;
}

export { i18n };
