/**
 * Kaplan & Kaplan — language context for 5-language site (EN/ES/FR/PT/IT).
 * Spec: flag selector in sticky header; all copy from CONTENT (content.ts).
 */
import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "@/lib/content";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    // Allow ?lang=xx deep-linking for QA and shared links
    const p = new URLSearchParams(window.location.search).get("lang");
    return p && ["en", "es", "fr", "pt", "it"].includes(p) ? (p as Lang) : "en";
  });
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
