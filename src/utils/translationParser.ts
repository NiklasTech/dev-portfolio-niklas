import { type Translations } from "../types/translations";

// In-memory cache to avoid multiple fetches
let cachedTranslations: Translations | null = null;

export async function loadTranslations(): Promise<Translations> {
  // Return cached translations if available
  if (cachedTranslations) {
    return cachedTranslations;
  }

  const translations: Translations = {
    en: {},
    de: {},
  };

  try {
    // Load XML file from the public folder
    const response = await fetch("/translations.xml");

    if (!response.ok) {
      throw new Error(`Failed to load translations: ${response.status}`);
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Check for parser errors
    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      throw new Error("XML parsing error: " + parseError.textContent);
    }

    const textElements = xmlDoc.querySelectorAll("text");
    let count = 0;

    textElements.forEach((element) => {
      const name = element.getAttribute("name");
      const langEn = element.getAttribute("langEn");
      const langDe = element.getAttribute("langDe");

      if (name && langEn && langDe) {
        translations.en[name] = langEn;
        translations.de[name] = langDe;
        count++;
      } else {
        console.warn("Incomplete translation entry:", name);
      }
    });

    console.log(`Loaded ${count} translations`);

    // Cache the translations
    cachedTranslations = translations;
  } catch (error) {
    console.error("Error loading translations:", error);

    // Add fallback translations for critical UI elements
    const fallbacks = {
      loading: ["Loading...", "Laden..."],
      error: ["Error loading content", "Fehler beim Laden des Inhalts"],
      hero_greeting: ["Hi, I am Niklas", "Hi, ich bin Niklas"],
      hero_title: ["Full Stack Developer", "Full Stack Entwickler"],
      nav_home: ["Home", "Startseite"],
      nav_skills: ["Skills", "Fähigkeiten"],
      nav_projects: ["Projects", "Projekte"],
      nav_contact: ["Contact", "Kontakt"],
    };

    // Add fallbacks to translation object
    Object.entries(fallbacks).forEach(([key, [en, de]]) => {
      translations.en[key] = en;
      translations.de[key] = de;
    });

    // Re-throw the error for the caller to handle
    throw error;
  }

  return translations;
}
