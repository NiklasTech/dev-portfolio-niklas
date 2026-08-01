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
    throw error;
  }

  return translations;
}
