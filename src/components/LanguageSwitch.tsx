import { useTranslation } from "../hooks/useTranslation";

export function LanguageSwitcher() {
  const { language, changeLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => changeLanguage("en")}
        aria-label="Switch to English"
        className={`transition-colors ${
          language === "en"
            ? "text-ink font-semibold"
            : "text-muted hover:text-ink"
        }`}
      >
        EN
      </button>
      <span className="text-line">/</span>
      <button
        onClick={() => changeLanguage("de")}
        aria-label="Auf Deutsch wechseln"
        className={`transition-colors ${
          language === "de"
            ? "text-ink font-semibold"
            : "text-muted hover:text-ink"
        }`}
      >
        DE
      </button>
    </div>
  );
}
