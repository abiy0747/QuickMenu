"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import {
  translate,
  languages,
  type Language,
  type TranslationKey,
} from "@/lib/translations";

const STORAGE_KEY = "quickmenu-lang";

let currentLang: Language = "en";

const listeners = new Set<() => void>();

function readStoredLang(): Language {
  if (typeof window === "undefined") {
    return currentLang;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  return languages.includes(stored as Language)
    ? (stored as Language)
    : currentLang;
}

function subscribe(callback: () => void) {
  listeners.add(callback);

  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Language {
  return readStoredLang();
}

function getServerSnapshot(): Language {
  return "en";
}

function persist(lang: Language) {
  currentLang = lang;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lang);
  }

  listeners.forEach((listener) => listener());
}

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (
    key: TranslationKey,
    params?: Record<string, string | number>
  ) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(
  null
);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setLang = useCallback((next: Language) => {
    persist(next);
  }, []);

  const toggleLang = useCallback(() => {
    persist(getSnapshot() === "en" ? "am" : "en");
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      return translate(lang, key, params);
    },
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggleLang, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
