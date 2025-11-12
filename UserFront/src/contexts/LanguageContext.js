import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../translations";

const STORAGE_KEY = "app_language";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    return stored === "ar" ? "ar" : "en";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "ar" ? "ar" : "en";
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.body.dir = dir;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const translationFn = useMemo(() => {
    return (key) => {
      if (!key) return "";
      const dict = translations[language] || {};
      const fallbackDict = translations.en || {};
      return dict[key] ?? fallbackDict[key] ?? key;
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: translationFn,
    }),
    [language, translationFn]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
};


