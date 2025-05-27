import { useTranslation } from "../hooks/useTranslation";
import { useState, useEffect } from "react";

export function LanguageSwitcher() {
  const { language, changeLanguage, isLoading } = useTranslation();
  const [hoverEffect, setHoverEffect] = useState(false);
  const [pulseCode, setPulseCode] = useState(false);

  useEffect(() => {
    setHoverEffect(true);
    setPulseCode(true);

    const hoverTimer = setTimeout(() => setHoverEffect(false), 1000);
    const pulseTimer = setTimeout(() => setPulseCode(false), 800);

    return () => {
      clearTimeout(hoverTimer);
      clearTimeout(pulseTimer);
    };
  }, [language]);

  if (isLoading) {
    return (
      <div className="px-3 py-1.5 font-mono text-sm bg-gray-900/70 border border-gray-800 rounded-sm">
        <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="font-mono text-sm">
      <div
        className={`relative bg-gray-900/80 border border-gray-800 rounded-sm overflow-hidden ${
          pulseCode ? "shadow-[0_0_5px_1px_rgba(34,197,94,0.2)]" : ""
        } transition-shadow duration-500`}
      >
        <div className="absolute left-0 top-0 w-2 h-2 border-l border-t border-green-500/40"></div>
        <div className="absolute right-0 top-0 w-2 h-2 border-r border-t border-green-500/40"></div>
        <div className="absolute left-0 bottom-0 w-2 h-2 border-l border-b border-green-500/40"></div>
        <div className="absolute right-0 bottom-0 w-2 h-2 border-r border-b border-green-500/40"></div>

        <div className="absolute top-0 left-7 h-[1px] w-2 bg-green-500/30"></div>
        <div className="absolute top-0 right-7 h-[1px] w-2 bg-green-500/30"></div>
        <div className="absolute bottom-0 left-7 h-[1px] w-2 bg-green-500/30"></div>
        <div className="absolute bottom-0 right-7 h-[1px] w-2 bg-green-500/30"></div>

        <div className="px-3 py-1.5 relative z-10">
          <code className="flex items-center">
            <span
              className={`text-blue-400 ${
                pulseCode ? "opacity-80" : "opacity-100"
              } transition-opacity`}
            >
              const
            </span>{" "}
            <span className="text-yellow-400">lang</span>{" "}
            <span className="text-white">=</span>
            <div className="inline-flex relative">
              <button
                onClick={() => changeLanguage("en")}
                className={`relative px-1 focus:outline-none transition-colors ${
                  language === "en"
                    ? "text-green-400 font-bold"
                    : "text-gray-500 hover:text-gray-300"
                }`}
                aria-label="Switch to English"
              >
                "EN"
                {language === "en" && (
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-green-500 ${
                      hoverEffect ? "animate-pulse" : ""
                    }`}
                  ></span>
                )}
              </button>
              <span className="text-gray-600">|</span>
              <button
                onClick={() => changeLanguage("de")}
                className={`relative px-1 focus:outline-none transition-colors ${
                  language === "de"
                    ? "text-green-400 font-bold"
                    : "text-gray-500 hover:text-gray-300"
                }`}
                aria-label="Switch to German"
              >
                "DE"
                {language === "de" && (
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-green-500 ${
                      hoverEffect ? "animate-pulse" : ""
                    }`}
                  ></span>
                )}
              </button>
            </div>
            <span className="text-white">;</span>
          </code>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-transparent via-green-500/50 to-transparent ${
              pulseCode ? "opacity-100" : "opacity-40"
            } transition-opacity duration-500`}
          ></div>
        </div>
      </div>
    </div>
  );
}
