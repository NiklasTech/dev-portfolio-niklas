import { loadTranslations } from "./translationParser";

export async function verifyTranslations() {
  try {
    const translations = await loadTranslations();

    // Get all unique keys
    const enKeys = Object.keys(translations.en);
    const deKeys = Object.keys(translations.de);
    const allKeys = new Set([...enKeys, ...deKeys]);

    // Check for missing translations
    const missingEn = [...allKeys].filter((key) => !translations.en[key]);
    const missingDe = [...allKeys].filter((key) => !translations.de[key]);

    if (missingEn.length > 0) {
      console.error("Missing English translations:", missingEn);
    }

    if (missingDe.length > 0) {
      console.error("Missing German translations:", missingDe);
    }

    if (missingEn.length === 0 && missingDe.length === 0) {
      console.log("✓ All translations are complete");
    } else {
      console.log(
        `❌ Found ${missingEn.length + missingDe.length} missing translations`
      );
    }
  } catch (error) {
    console.error("Error verifying translations:", error);
  }
}
