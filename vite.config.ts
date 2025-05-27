import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: "copy-translation-file",
      buildStart() {
        // Create public directory if it doesn't exist
        if (!fs.existsSync("public")) {
          fs.mkdirSync("public");
        }

        // Copy the translations.xml file to the public directory
        fs.copyFileSync(
          resolve(__dirname, "src/translation/translations.xml"),
          resolve(__dirname, "public/translations.xml")
        );
        console.log("✓ Copied translations.xml to public directory");
      },
    },
  ],
});
