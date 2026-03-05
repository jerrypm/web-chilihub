"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import en from "./en.json";
import id from "./id.json";

type Locale = "en" | "id";
const translations = { en, id } as const;

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("chilihub-lang") as Locale;
    if (saved && (saved === "en" || saved === "id")) {
      setLocaleState(saved);
    }
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem("chilihub-lang", l);
  }

  function t(key: string): string {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[locale];
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === "string" ? value : key;
  }

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
