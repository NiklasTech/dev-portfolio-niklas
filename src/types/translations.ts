export type Language = "en" | "de";

export interface TranslationData {
  [key: string]: string;
}

export interface Translations {
  en: TranslationData;
  de: TranslationData;
}

export interface TranslationContextType {
  t: (key: string, defaultValue?: string) => string;
  language: Language;
  changeLanguage: (lang: Language) => void;
  isLoading: boolean;
  error: string | null;
}
