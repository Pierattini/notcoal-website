"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode
} from "react";

import es from "@/messages/es.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";

type Lang = "es" | "en" | "de";

type Messages = typeof en;

const translations: Record<Lang, Messages> = {
  es,
  en,
  de
};

type ContextType = {
  locale: Lang;
  setLocale: (lang: Lang) => void;
  t: Messages;
};

const LanguageContext =
  createContext<ContextType | null>(null);

export function LanguageProvider({
  children
}: {
  children: ReactNode;
}) {

  const [locale, setLocale] =
    useState<Lang>("en");

  const t = translations[locale];

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {

  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}