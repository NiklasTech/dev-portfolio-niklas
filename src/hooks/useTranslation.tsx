import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type {
  Language,
  TranslationContextType,
  Translations,
} from "../types/translations";
import { loadTranslations } from "../utils/translationParser";

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

interface TranslationProviderProps {
  children: ReactNode;
}

// Initial empty translations structure
const emptyTranslations: Translations = {
  en: {},
  de: {},
};

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get browser language if available, otherwise default to English
    const browserLang = navigator.language.split("-")[0].toLowerCase();
    const savedLanguage = localStorage.getItem("language") as Language;

    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "de")) {
      return savedLanguage;
    }

    return browserLang === "de" ? "de" : "en";
  });

  const [translations, setTranslations] =
    useState<Translations>(emptyTranslations);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  // Load language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "de")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Load translations
  useEffect(() => {
    const initTranslations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const loadedTranslations = await loadTranslations();
        setTranslations(loadedTranslations);
      } catch (error) {
        console.error("Failed to initialize translations:", error);
        setError("Failed to load translations. Using fallback text.");

        // Set minimal fallback translations
        setTranslations({
          en: {
            loading: "Loading...",
            error: "An error occurred",
            hero_greeting: "Hi, I am Niklas",
            hero_title: "Full Stack Developer",
          },
          de: {
            loading: "Laden...",
            error: "Ein Fehler ist aufgetreten",
            hero_greeting: "Hi, ich bin Niklas",
            hero_title: "Full Stack Entwickler",
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    initTranslations();
  }, []);

  const t = (key: string, defaultValue?: string): string => {
    if (isLoading) {
      return language === "de" ? "Laden..." : "Loading...";
    }

    const translation = translations[language][key];
    if (!translation) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Translation missing for key: ${key} (${language})`);
      }
      return defaultValue || key;
    }

    return translation;
  };

  const changeLanguage = (lang: Language): void => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang; // Set HTML lang attribute for accessibility
  };

  const value: TranslationContextType = {
    t,
    language,
    changeLanguage,
    isLoading,
    error: null,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
