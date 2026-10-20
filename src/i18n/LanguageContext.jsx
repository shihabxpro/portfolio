import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ui } from "./ui.js";

const LanguageContext = createContext(null);
const STORAGE_KEY = "shihab-lang";

export function pick(value, lang) {
  if (value == null || typeof value === "string") return value;
  return value[lang] ?? value.bn ?? "";
}

function getInitialLang() {
  if (typeof window === "undefined") return "bn";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "bn" || stored === "en") return stored;
  } catch {
    return "bn";
  }

  return "bn";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = ui[lang].docTitle;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", ui[lang].docDesc);

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const t = useCallback((value) => pick(value, lang), [lang]);

  const value = useMemo(
    () => ({ lang, setLang, u: ui[lang], t }),
    [lang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLang must be used inside LanguageProvider");
  }

  return context;
}
