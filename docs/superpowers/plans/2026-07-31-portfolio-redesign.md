# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Kompletter Neuaufbau des Portfolios im hellen Editorial-Stil mit neuen Inhalten (Ausbildung, NH-WebDev, Pragma, Kundenprojekte), siehe Spec `docs/superpowers/specs/2026-07-31-portfolio-redesign-design.md`.

**Architecture:** React 19 + Vite 6 + Tailwind CSS 4 Single-Page-App. Design-Tokens über Tailwind-4-`@theme` in `src/index.css`. i18n weiterhin über `public/translations.xml` + bestehendem `TranslationProvider`. Keine Test-Framework-Abhängigkeit: Verifikation pro Task über `npm run build`, `npm run lint` und `npm run verify:translations` (neues Node-Skript, das Key-Vollständigkeit und die Copy-Regel prüft).

**Tech Stack:** React 19, TypeScript, Vite 6, Tailwind CSS 4, @fontsource-variable/fraunces, @fontsource-variable/inter, EmailJS, Vercel Analytics/Speed Insights.

## Global Constraints

- **Keine Gedankenstriche** (`—` U+2014, `–` U+2013) in sichtbaren Texten, also nicht in `public/translations.xml` und nicht in JSX-Texten. Jahreszahlen mit einfachem Bindestrich: „2021 - 2023".
- **Keine git-Commits.** Der Auftraggeber hat Commits nicht freigegeben. Task-Ende = erfolgreiche Verifikation (build/lint/verify), kein `git commit`.
- Farben nur über Tokens: `paper` `#FAFAF7`, `ink` `#16150F`, `muted` `#6B6659`, `accent` `#C64B2A`, `line` `#E3E0D8`. Keine `green-*`/`gray-*`-Klassen aus dem alten Theme.
- Fonts: `font-display` (Fraunces) für Überschriften, Default-Sans (Inter) für alles andere.
- Sichtbare Texte kommen aus `t("...")` (translations.xml). Ausnahmen: Eigennamen und Tech-Begriffe („Niklas Häusler", „Pragma", „React", „nh-webdev.de", E-Mail-Adresse).
- Windows-Umgebung, Bash via Git Bash. Löschbefehle mit `rm`, Pfade mit Forward-Slashes.
- Nach jeder Task: `npm run build` und `npm run lint` müssen fehlerfrei durchlaufen.

---

### Task 1: Foundation (Fonts, Design-Tokens, index.html)

**Files:**
- Modify: `package.json` (via npm install)
- Rewrite: `src/index.css`
- Modify: `src/main.tsx`
- Rewrite: `index.html`

**Interfaces:**
- Produces: Tailwind-Tokens `bg-paper`, `text-ink`, `text-muted`, `text-accent`, `border-line`, `bg-line`, `font-display`. Alle späteren Tasks nutzen genau diese Klassennamen.

- [ ] **Step 1: Fontsource-Pakete installieren**

```bash
npm install @fontsource-variable/fraunces @fontsource-variable/inter
```

Expected: beide Pakete in `package.json` unter `dependencies`.

- [ ] **Step 2: `src/index.css` komplett ersetzen**

```css
@import "tailwindcss";

@theme {
  --color-paper: #FAFAF7;
  --color-ink: #16150F;
  --color-muted: #6B6659;
  --color-accent: #C64B2A;
  --color-line: #E3E0D8;
  --font-display: "Fraunces Variable", Georgia, serif;
  --font-sans: "Inter Variable", system-ui, sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: var(--color-accent);
    color: var(--color-paper);
  }
}
```

Hinweis: Die alten Klassen (`.card`, `.terminal-text`, `.text-green-500`-Glow etc.) fliegen komplett raus. Die noch alten Komponenten sehen danach ungestylt aus, das ist bis Task 3 akzeptiert (Build muss nur kompilieren).

- [ ] **Step 3: `src/main.tsx` Font-Imports ergänzen**

Kompletter neuer Inhalt:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./index.css";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 4: `index.html` ersetzen (repariert nebenbei die falschen `/public/`-Pfade)**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Niklas Häusler, Fachinformatiker für Anwendungsentwicklung aus Heinsberg. Webentwicklung, E-Commerce und eigene Tools."
    />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <title>Niklas Häusler · Fachinformatiker für Anwendungsentwicklung</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Verifikation**

Run: `npm run build`
Expected: Build erfolgreich (die alten Komponenten kompilieren weiter, nur ungestylt).

---

### Task 2: Neue Übersetzungen + Verify-Skript

**Files:**
- Rewrite: `public/translations.xml`
- Create: `scripts/verify-translations.mjs`
- Modify: `package.json` (Script `verify:translations`)

**Interfaces:**
- Produces: Alle Translation-Keys, die die Komponenten-Tasks 4 bis 10 verwenden (exakte Namen siehe XML unten). CLI: `npm run verify:translations`.

- [ ] **Step 1: `scripts/verify-translations.mjs` erstellen**

```js
import { readFileSync } from "node:fs";

const xml = readFileSync(
  new URL("../public/translations.xml", import.meta.url),
  "utf8"
);

const entryRe = /<text\s+([^>]+?)\/>/gs;
const seen = new Set();
let errors = 0;

for (const match of xml.matchAll(entryRe)) {
  const attrRe = /(\w+)="([^"]*)"/g;
  const attrs = {};
  let a;
  while ((a = attrRe.exec(match[1])) !== null) {
    attrs[a[1]] = a[2];
  }

  const { name, langEn, langDe } = attrs;

  if (!name || !langEn || !langDe) {
    console.error(`Incomplete entry: ${name ?? match[1]}`);
    errors++;
    continue;
  }

  if (seen.has(name)) {
    console.error(`Duplicate key: ${name}`);
    errors++;
  }
  seen.add(name);

  for (const [lang, value] of [
    ["langEn", langEn],
    ["langDe", langDe],
  ]) {
    if (/[—–]/.test(value)) {
      console.error(`Gedankenstrich gefunden in ${name} (${lang})`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`FAILED: ${errors} problem(s) found`);
  process.exit(1);
}

console.log(`OK: ${seen.size} keys complete, no dashes`);
```

- [ ] **Step 2: npm-Script hinzufügen**

In `package.json` unter `scripts` ergänzen:

```json
"verify:translations": "node scripts/verify-translations.mjs"
```

- [ ] **Step 3: `public/translations.xml` komplett ersetzen**

Regel: genau ein Eintrag pro Zeile (das Verify-Skript parst zeilenbasiert), `&` als `&amp;` escapen.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<translations>
  <!-- Navigation -->
  <text name="nav_about" langEn="About" langDe="Über mich" />
  <text name="nav_skills" langEn="Skills" langDe="Skills" />
  <text name="nav_projects" langEn="Projects" langDe="Projekte" />
  <text name="nav_journey" langEn="Journey" langDe="Werdegang" />
  <text name="nav_contact" langEn="Contact" langDe="Kontakt" />

  <!-- Hero -->
  <text name="hero_role" langEn="IT Specialist for Application Development · Full-Stack Developer" langDe="Fachinformatiker für Anwendungsentwicklung · Full-Stack-Entwickler" />
  <text name="hero_intro" langEn="Freshly certified IT specialist from Heinsberg, Germany. I build web applications, online shops and my own developer tools." langDe="Frisch ausgebildeter Fachinformatiker aus Heinsberg. Ich entwickle Webanwendungen, Online-Shops und eigene Tools." />
  <text name="hero_cta_projects" langEn="View projects" langDe="Projekte ansehen" />
  <text name="hero_cta_contact" langEn="Get in touch" langDe="Kontakt aufnehmen" />

  <!-- Section labels & titles -->
  <text name="section_about" langEn="01 · About" langDe="01 · Über mich" />
  <text name="section_skills" langEn="02 · Skills" langDe="02 · Skills" />
  <text name="section_projects" langEn="03 · Projects" langDe="03 · Projekte" />
  <text name="section_journey" langEn="04 · Journey" langDe="04 · Werdegang" />
  <text name="section_contact" langEn="05 · Contact" langDe="05 · Kontakt" />
  <text name="about_title" langEn="About me" langDe="Über mich" />
  <text name="skills_title" langEn="Skills" langDe="Skills" />
  <text name="projects_title" langEn="Selected work" langDe="Ausgewählte Projekte" />
  <text name="journey_title" langEn="My journey" langDe="Mein Werdegang" />
  <text name="contact_title" langEn="Contact" langDe="Kontakt" />

  <!-- About -->
  <text name="about_text_1" langEn="I am a certified IT specialist for application development (IHK exam passed in July 2026) with a focus on full-stack web development. Alongside my training, I have been running my own small web development business, NH-WebDev, since October 2025." langDe="Ich bin Fachinformatiker für Anwendungsentwicklung (IHK-Abschluss im Juli 2026) mit Schwerpunkt auf Full-Stack-Webentwicklung. Neben der Ausbildung betreibe ich seit Oktober 2025 mein eigenes Kleingewerbe NH-WebDev." />
  <text name="about_text_2" langEn="I build customer projects from business websites to e-commerce platforms, and I develop my own tools like Pragma, an AI-native desktop IDE. What drives me: clean code, thoughtful design and software that solves real problems." langDe="Ich realisiere Kundenprojekte von der Unternehmenswebsite bis zur E-Commerce-Plattform und entwickle eigene Tools wie Pragma, eine AI-native Desktop-IDE. Was mich antreibt: sauberer Code, durchdachtes Design und Software, die echte Probleme löst." />
  <text name="about_fact_location_label" langEn="Location" langDe="Standort" />
  <text name="about_fact_location_value" langEn="Heinsberg, Germany" langDe="Heinsberg, Deutschland" />
  <text name="about_fact_education_label" langEn="Education" langDe="Ausbildung" />
  <text name="about_fact_education_value" langEn="IT specialist for application development, IHK 2026" langDe="Fachinformatiker für Anwendungsentwicklung, IHK 2026" />
  <text name="about_fact_languages_label" langEn="Languages" langDe="Sprachen" />
  <text name="about_fact_languages_value" langEn="German (native) · English (C1 level)" langDe="Deutsch (Muttersprache) · Englisch (C1-Niveau)" />

  <!-- Skills -->
  <text name="skills_frontend_title" langEn="Frontend" langDe="Frontend" />
  <text name="skills_backend_title" langEn="Backend" langDe="Backend" />
  <text name="skills_tools_title" langEn="Tools &amp; Deployment" langDe="Tools &amp; Deployment" />

  <!-- Projects -->
  <text name="projects_intro" langEn="Own tools, client projects from my business NH-WebDev and demo templates." langDe="Eigene Tools, Kundenprojekte aus meinem Gewerbe NH-WebDev und Demo-Templates." />
  <text name="project_featured" langEn="Featured project" langDe="Featured-Projekt" />
  <text name="project_type_own" langEn="Own project" langDe="Eigenprojekt" />
  <text name="project_type_client" langEn="Client project · NH-WebDev" langDe="Kundenprojekt · NH-WebDev" />
  <text name="project_type_template" langEn="Template" langDe="Template" />
  <text name="project_visit" langEn="Visit website" langDe="Website besuchen" />
  <text name="project_code" langEn="View code" langDe="Code ansehen" />
  <text name="project_pragma_desc" langEn="AI-native desktop IDE with integrated terminal, Git and Docker integration. Built with Tauri 2, Rust and React." langDe="AI-native Desktop-IDE mit integriertem Terminal sowie Git- und Docker-Integration. Gebaut mit Tauri 2, Rust und React." />
  <text name="project_vehiclelab_desc" langEn="Website for an automotive appraisal company near Aachen. Clear presentation of services, fast contact options, fully responsive." langDe="Website für ein KFZ-Sachverständigenbüro im Raum Aachen. Klare Leistungsdarstellung, schnelle Kontaktmöglichkeiten, voll responsiv." />
  <text name="project_fairdress_desc" langEn="E-commerce shop for verified secondhand designer fashion with product management and checkout." langDe="E-Commerce-Shop für geprüfte Secondhand-Designerkleidung mit Produktverwaltung und Checkout." />
  <text name="project_template_friseur_desc" langEn="Demo template for barbershops and hair salons." langDe="Demo-Template für Friseursalons und Barbershops." />
  <text name="project_template_blog_desc" langEn="Demo template for blogs and editorial websites." langDe="Demo-Template für Blogs und redaktionelle Websites." />
  <text name="project_template_bau_desc" langEn="Demo template for construction companies." langDe="Demo-Template für Bauunternehmen." />

  <!-- NH-WebDev band -->
  <text name="nhwd_text" langEn="Self-employed web developer since October 2025." langDe="Selbstständiger Webentwickler seit Oktober 2025." />
  <text name="nhwd_services" langEn="Web development · E-Commerce · Custom development" langDe="Webentwicklung · E-Commerce · Entwicklung nach Auftrag" />
  <text name="nhwd_link" langEn="nh-webdev.de" langDe="nh-webdev.de" />

  <!-- Journey -->
  <text name="journey_nhwd_period" langEn="Since Oct 2025" langDe="Seit Okt. 2025" />
  <text name="journey_nhwd_title" langEn="NH-WebDev · Small business (part-time)" langDe="NH-WebDev · Kleingewerbe (nebenberuflich)" />
  <text name="journey_nhwd_desc" langEn="Design and development of web applications, e-commerce platforms and custom client work." langDe="Konzeption und Entwicklung von Webanwendungen, E-Commerce-Plattformen und individueller Auftragsentwicklung." />
  <text name="journey_ausbildung_period" langEn="2023 - 2026" langDe="2023 - 2026" />
  <text name="journey_ausbildung_title" langEn="IT specialist for application development · AixperSoft" langDe="Fachinformatiker für Anwendungsentwicklung · AixperSoft" />
  <text name="journey_ausbildung_desc" langEn="Three-year vocational training. IHK final exam passed in July 2026. Employed at the training company until 15.08.2026." langDe="Dreijährige betriebliche Ausbildung. IHK-Abschlussprüfung im Juli 2026 bestanden. Anstellung im Ausbildungsbetrieb bis 15.08.2026." />
  <text name="journey_fhr_period" langEn="2021 - 2023" langDe="2021 - 2023" />
  <text name="journey_fhr_title" langEn="Fachhochschulreife · Vocational school" langDe="Fachhochschulreife · Berufsschule" />
  <text name="journey_fhr_desc" langEn="Specialization in computer science with a focus on web development. Learned the fundamentals of programming and software development and discovered a passion for frontend development and UI/UX design." langDe="Spezialisierung auf Informatik mit Fokus auf Webentwicklung. Grundlagen der Programmierung und Softwareentwicklung erlernt und die Leidenschaft für Frontend-Entwicklung und UI/UX-Design entdeckt." />

  <!-- Contact -->
  <text name="contact_intro" langEn="Interested in working together? Write me a message." langDe="Interesse an einer Zusammenarbeit? Schreib mir eine Nachricht." />
  <text name="contact_subject" langEn="Subject" langDe="Betreff" />
  <text name="contact_subject_placeholder" langEn="What is it about?" langDe="Worum geht es?" />
  <text name="contact_name" langEn="Name" langDe="Name" />
  <text name="contact_name_placeholder" langEn="Your name" langDe="Dein Name" />
  <text name="contact_email" langEn="Email" langDe="E-Mail" />
  <text name="contact_email_placeholder" langEn="you@example.com" langDe="du@beispiel.de" />
  <text name="contact_message" langEn="Message" langDe="Nachricht" />
  <text name="contact_message_placeholder" langEn="Your message..." langDe="Deine Nachricht..." />
  <text name="contact_submit" langEn="Send message" langDe="Nachricht senden" />
  <text name="contact_sending" langEn="Sending..." langDe="Wird gesendet..." />
  <text name="contact_success_message" langEn="Thank you! Your message has been sent successfully." langDe="Danke! Deine Nachricht wurde erfolgreich gesendet." />
  <text name="contact_error_message" langEn="Sorry, something went wrong. Please try again later." langDe="Es ist ein Fehler aufgetreten. Bitte versuche es später erneut." />
  <text name="contact_error_required_fields" langEn="Please fill in all required fields." langDe="Bitte fülle alle Pflichtfelder aus." />
  <text name="contact_error_config" langEn="The contact form is not configured. Please email me directly." langDe="Das Formular ist nicht konfiguriert. Bitte schreib mir direkt per E-Mail." />
  <text name="contact_rate_limit_exceeded" langEn="You have reached the limit of {0} emails per hour. Please try again in {1} minutes." langDe="Du hast das Limit von {0} E-Mails pro Stunde erreicht. Bitte versuche es in {1} Minuten erneut." />
  <text name="contact_rate_limit_cooldown" langEn="Please wait {0} minutes before sending another message." langDe="Bitte warte {0} Minuten, bevor du eine weitere Nachricht sendest." />
  <text name="contact_info_title" langEn="Contact information" langDe="Kontaktinformationen" />
  <text name="contact_email_label" langEn="Email" langDe="E-Mail" />
  <text name="contact_location_label" langEn="Location" langDe="Standort" />
  <text name="contact_location_value" langEn="Heinsberg, Germany" langDe="Heinsberg, Deutschland" />
  <text name="contact_availability_label" langEn="Availability" langDe="Verfügbarkeit" />
  <text name="contact_availability_value" langEn="Available from mid-August 2026" langDe="Verfügbar ab Mitte August 2026" />
  <text name="contact_social_title" langEn="Social" langDe="Social" />

  <!-- Footer & misc -->
  <text name="footer_text" langEn="© 2026 Niklas Häusler. All rights reserved." langDe="© 2026 Niklas Häusler. Alle Rechte vorbehalten." />
  <text name="loading" langEn="Loading..." langDe="Laden..." />
</translations>
```

- [ ] **Step 4: Verify-Skript laufen lassen**

Run: `npm run verify:translations`
Expected: `OK: 71 keys complete, no dashes` (bei abweichender Zahl zählt: Exit-Code 0 und „OK"-Zeile).

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: erfolgreich.

---

### Task 3: Cleanup + neuer App-Skeleton

**Files:**
- Delete: `src/components/Matrix.tsx`, `src/components/Terminal.tsx`, `src/components/Testimonials.tsx`, `src/components/LoadingSpinner.tsx`, `src/components/Timeline.tsx`, `src/matrix.css`, `src/assets/Niklas_ProfilePic.jpg`, `public/screenshots/` (komplettes altes Verzeichnis)
- Rewrite: `src/App.tsx`
- Create (Stubs): `src/components/About.tsx`, `src/components/Journey.tsx`, `src/components/NhWebDevBand.tsx`, `src/components/Footer.tsx`
- Rewrite (Stubs): `src/components/Navbar.tsx`, `src/components/Hero.tsx`, `src/components/Skills.tsx`, `src/components/Projects.tsx`, `src/components/Contact.tsx`, `src/components/LanguageSwitch.tsx`

**Interfaces:**
- Produces: `App` rendert in dieser Reihenfolge: `Navbar`, `main` > `Hero`, `About`, `Skills`, `Projects`, `NhWebDevBand`, `Journey`, `Contact`, dann `Footer`. Sektions-IDs: `home`, `about`, `skills`, `projects`, `journey`, `contact`. Spätere Tasks ersetzen die Stub-Inhalte, ohne `App.tsx` anzufassen.

- [ ] **Step 1: Alte Dateien löschen**

```bash
rm src/components/Matrix.tsx src/components/Terminal.tsx src/components/Testimonials.tsx src/components/LoadingSpinner.tsx src/components/Timeline.tsx src/matrix.css src/assets/Niklas_ProfilePic.jpg
rm -r public/screenshots
mkdir public/screenshots
```

- [ ] **Step 2: `src/App.tsx` ersetzen**

```tsx
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { NhWebDevBand } from "./components/NhWebDevBand";
import { Journey } from "./components/Journey";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { TranslationProvider, useTranslation } from "./hooks/useTranslation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect } from "react";

function Page() {
  const { isLoading } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <span className="font-display text-2xl text-ink">Niklas Häusler</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <NhWebDevBand />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <TranslationProvider>
      <Page />
      <Analytics />
      <SpeedInsights />
    </TranslationProvider>
  );
}
```

- [ ] **Step 3: Stubs schreiben**

Jede Stub-Datei rendert eine leere Sektion mit korrekter `id`, damit der Build steht. Inhalte folgen in Tasks 4 bis 10.

`src/components/Navbar.tsx`:

```tsx
export function Navbar() {
  return <nav className="fixed w-full z-20 bg-paper border-b border-line" />;
}
```

`src/components/Hero.tsx`:

```tsx
export function Hero() {
  return <section id="home" />;
}
```

`src/components/About.tsx`:

```tsx
export function About() {
  return <section id="about" />;
}
```

`src/components/Skills.tsx`:

```tsx
export function Skills() {
  return <section id="skills" />;
}
```

`src/components/Projects.tsx`:

```tsx
export function Projects() {
  return <section id="projects" />;
}
```

`src/components/NhWebDevBand.tsx`:

```tsx
export function NhWebDevBand() {
  return <section aria-label="NH-WebDev" />;
}
```

`src/components/Journey.tsx`:

```tsx
export function Journey() {
  return <section id="journey" />;
}
```

`src/components/Contact.tsx`:

```tsx
export function Contact() {
  return <section id="contact" />;
}
```

`src/components/Footer.tsx`:

```tsx
export function Footer() {
  return <footer />;
}
```

`src/components/LanguageSwitch.tsx` (Named Export `LanguageSwitcher` beibehalten, Navbar Task 4 importiert ihn):

```tsx
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
```

- [ ] **Step 4: Verifikation**

Run: `npm run build && npm run lint`
Expected: beides fehlerfrei. Warnung „Translation missing" in der Browser-Konsole ist ok, falls alte Keys referenziert wären; mit den Stubs gibt es keine Referenzen.

---

### Task 4: Navbar

**Files:**
- Rewrite: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `LanguageSwitcher` aus `./LanguageSwitch`, `t()` Keys `nav_about`, `nav_skills`, `nav_projects`, `nav_journey`, `nav_contact`.
- Produces: Fixe Navbar, verlinkt auf `#home`, `#about`, `#skills`, `#projects`, `#journey`, `#contact`.

- [ ] **Step 1: `src/components/Navbar.tsx` ersetzen**

```tsx
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./LanguageSwitch";
import { useTranslation } from "../hooks/useTranslation";

const NAV_LINKS = [
  { href: "#about", key: "nav_about" },
  { href: "#skills", key: "nav_skills" },
  { href: "#projects", key: "nav_projects" },
  { href: "#journey", key: "nav_journey" },
  { href: "#contact", key: "nav_contact" },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed w-full z-20 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-paper/95 backdrop-blur-sm border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <a href="#home" className="font-display text-xl text-ink">
          Niklas Häusler
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted hover:text-ink transition-colors"
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </div>

        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-ink"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-paper border-b border-line">
          <ul className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block py-2 text-lg text-ink"
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verifikation**

Run: `npm run build && npm run lint`
Expected: fehlerfrei.

---

### Task 5: Reveal, SectionHeader, SocialLinks + Hero

**Files:**
- Create: `src/components/Reveal.tsx`
- Create: `src/components/SectionHeader.tsx`
- Create: `src/components/SocialLinks.tsx`
- Rewrite: `src/components/Hero.tsx`

**Interfaces:**
- Produces: `<Reveal delay?: number>` (Wrapper mit Scroll-Fade-in), `<SectionHeader label title />` (Editorial-Kopf mit Nummer, Titel, Haarlinie), `<SocialLinks className?: string />` (GitHub/LinkedIn/Mail Icons). Tasks 6 bis 10 nutzen alle drei.

- [ ] **Step 1: `src/components/Reveal.tsx` erstellen**

```tsx
import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: `src/components/SectionHeader.tsx` erstellen**

```tsx
interface SectionHeaderProps {
  label: string;
  title: string;
}

export function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <div className="mb-16">
      <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">
        {label}
      </p>
      <h2 className="font-display text-4xl md:text-5xl text-ink">{title}</h2>
      <div className="mt-10 h-px bg-line" />
    </div>
  );
}
```

- [ ] **Step 3: `src/components/SocialLinks.tsx` erstellen**

```tsx
interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = "" }: SocialLinksProps) {
  const linkClass = "text-muted hover:text-accent transition-colors";

  return (
    <div className={`flex gap-5 ${className}`}>
      <a
        href="https://github.com/NiklasTech"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={linkClass}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/in/niklas-h-tech/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={linkClass}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>
      <a href="mailto:haeussler.business@gmail.com" aria-label="E-Mail" className={linkClass}>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
        </svg>
      </a>
    </div>
  );
}
```

- [ ] **Step 4: `src/components/Hero.tsx` ersetzen**

```tsx
import ProfilePic from "../assets/Profile-Pic.jpeg";
import { useTranslation } from "../hooks/useTranslation";
import { SocialLinks } from "./SocialLinks";
import { Reveal } from "./Reveal";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-accent mb-6">
                {t("hero_role")}
              </p>
              <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-ink mb-8">
                Niklas Häusler
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-xl mb-10">
                {t("hero_intro")}
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#projects"
                  className="bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
                >
                  {t("hero_cta_projects")}
                </a>
                <a
                  href="#contact"
                  className="border border-ink text-ink px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                >
                  {t("hero_cta_contact")}
                </a>
              </div>
              <SocialLinks />
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={150}>
              <div className="relative max-w-sm mx-auto md:ml-auto">
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-accent" />
                <img
                  src={ProfilePic}
                  alt="Niklas Häusler"
                  className="relative w-full aspect-[4/5] object-cover border border-line"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Verifikation**

Run: `npm run build && npm run lint`
Expected: fehlerfrei. `Profile-Pic.jpeg` existiert bereits in `src/assets/`.

---

### Task 6: About + Skills

**Files:**
- Rewrite: `src/components/About.tsx`
- Rewrite: `src/components/Skills.tsx`

**Interfaces:**
- Consumes: `SectionHeader`, `Reveal` aus Task 5. Keys: `section_about`, `about_title`, `about_text_1`, `about_text_2`, `about_fact_*`, `section_skills`, `skills_title`, `skills_frontend_title`, `skills_backend_title`, `skills_tools_title`.

- [ ] **Step 1: `src/components/About.tsx` ersetzen**

```tsx
import { useTranslation } from "../hooks/useTranslation";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function About() {
  const { t } = useTranslation();

  const facts = [
    { label: t("about_fact_location_label"), value: t("about_fact_location_value") },
    { label: t("about_fact_education_label"), value: t("about_fact_education_value") },
    { label: t("about_fact_languages_label"), value: t("about_fact_languages_value") },
  ];

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader label={t("section_about")} title={t("about_title")} />
        </Reveal>

        <div className="grid md:grid-cols-12 gap-12">
          <Reveal className="md:col-span-7">
            <p className="text-lg text-ink leading-relaxed mb-6">
              {t("about_text_1")}
            </p>
            <p className="text-lg text-muted leading-relaxed">
              {t("about_text_2")}
            </p>
          </Reveal>

          <Reveal delay={150} className="md:col-span-5">
            <dl>
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-t border-line py-5 last:border-b"
                >
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted mb-2">
                    {fact.label}
                  </dt>
                  <dd className="text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `src/components/Skills.tsx` ersetzen**

```tsx
import { useTranslation } from "../hooks/useTranslation";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const FRONTEND = ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS"];
const BACKEND = ["Node.js", "Python", "FastAPI", "Express", "PostgreSQL", "SQLite"];
const TOOLS = ["Git", "Docker", "Vite", "Vercel", "Linux"];

export function Skills() {
  const { t } = useTranslation();

  const groups = [
    { title: t("skills_frontend_title"), items: FRONTEND },
    { title: t("skills_backend_title"), items: BACKEND },
    { title: t("skills_tools_title"), items: TOOLS },
  ];

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader label={t("section_skills")} title={t("skills_title")} />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 100}>
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
                {group.title}
              </h3>
              <ul>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-line py-3 text-ink last:border-b"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verifikation**

Run: `npm run build && npm run lint`
Expected: fehlerfrei.

---

### Task 7: Screenshots der Projekte erstellen

**Files:**
- Create: `public/screenshots/pragma-1.png`, `pragma-2.png`, `vehicle-lab.png`, `fairdress.png`, `template-friseur.png`, `template-blog.png`, `template-bau.png`

**Interfaces:**
- Produces: Bildpfade unter `/screenshots/...`, die Task 8 in den Projekt-Daten referenziert.

- [ ] **Step 1: Playwright-Browser bereitstellen (kein Projekt-Dependency, nur npx-Cache)**

```bash
npx -y playwright@latest install chromium
```

Expected: Chromium wird in den npx-Cache installiert. Wenn bereits vorhanden, passiert nichts.

- [ ] **Step 2: Screenshots capturen (1440x900 Viewport)**

```bash
npx -y playwright@latest screenshot --viewport-size=1440,900 https://pragma-zeta-two.vercel.app public/screenshots/pragma-1.png
npx -y playwright@latest screenshot --viewport-size=1440,900 https://github.com/NiklasTech/pragma public/screenshots/pragma-2.png
npx -y playwright@latest screenshot --viewport-size=1440,900 https://vehicle-lab.de/ public/screenshots/vehicle-lab.png
npx -y playwright@latest screenshot --viewport-size=1440,900 https://fairdress.de/ public/screenshots/fairdress.png
npx -y playwright@latest screenshot --viewport-size=1440,900 https://template-friseur.vercel.app/ public/screenshots/template-friseur.png
npx -y playwright@latest screenshot --viewport-size=1440,900 https://template-blog-phi.vercel.app/ public/screenshots/template-blog.png
npx -y playwright@latest screenshot --viewport-size=1440,900 https://bauunternehmen.vercel.app/ public/screenshots/template-bau.png
```

Expected: 7 PNG-Dateien in `public/screenshots/`.

- [ ] **Step 3: Bilder prüfen**

Jede Datei öffnen (ReadMediaFile) und kontrollieren: Seite geladen, kein Error-Screen, keine Cookie-Banner-Wand. Falls eine Seite nicht lädt: Screenshot wiederholen (ggf. `--wait-for-timeout=3000` anhängen). Falls Capture generell scheitert: Stopp und Auftraggeber informieren (keine selbstgebauten Platzhalter ohne Rücksprache).

---

### Task 8: Projects

**Files:**
- Rewrite: `src/components/Projects.tsx`

**Interfaces:**
- Consumes: `SectionHeader`, `Reveal`, Keys `section_projects`, `projects_title`, `projects_intro`, `project_*`. Bildpfade aus Task 7.

- [ ] **Step 1: `src/components/Projects.tsx` ersetzen**

```tsx
import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

type ProjectType = "own" | "client" | "template";

interface Project {
  id: string;
  title: string;
  descKey: string;
  type: ProjectType;
  tags: string[];
  images: string[];
  liveUrl: string;
  codeUrl?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "pragma",
    title: "Pragma",
    descKey: "project_pragma_desc",
    type: "own",
    tags: ["Tauri 2", "Rust", "React 19", "TypeScript"],
    images: ["/screenshots/pragma-1.png", "/screenshots/pragma-2.png"],
    liveUrl: "https://pragma-zeta-two.vercel.app",
    codeUrl: "https://github.com/NiklasTech/pragma",
    featured: true,
  },
  {
    id: "vehiclelab",
    title: "Vehicle Lab",
    descKey: "project_vehiclelab_desc",
    type: "client",
    tags: [],
    images: ["/screenshots/vehicle-lab.png"],
    liveUrl: "https://vehicle-lab.de/",
  },
  {
    id: "fairdress",
    title: "Fairdress",
    descKey: "project_fairdress_desc",
    type: "client",
    tags: [],
    images: ["/screenshots/fairdress.png"],
    liveUrl: "https://fairdress.de/",
  },
  {
    id: "template-friseur",
    title: "Friseur / Barbershop",
    descKey: "project_template_friseur_desc",
    type: "template",
    tags: [],
    images: ["/screenshots/template-friseur.png"],
    liveUrl: "https://template-friseur.vercel.app/",
  },
  {
    id: "template-blog",
    title: "Blog",
    descKey: "project_template_blog_desc",
    type: "template",
    tags: [],
    images: ["/screenshots/template-blog.png"],
    liveUrl: "https://template-blog-phi.vercel.app/",
  },
  {
    id: "template-bau",
    title: "Bauunternehmen",
    descKey: "project_template_bau_desc",
    type: "template",
    tags: [],
    images: ["/screenshots/template-bau.png"],
    liveUrl: "https://bauunternehmen.vercel.app/",
  },
];

function ProjectImage({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = project.images.length > 1;

  return (
    <div className="relative border border-line overflow-hidden bg-paper">
      <img
        src={project.images[index]}
        alt={`${project.title} Screenshot`}
        className="w-full aspect-[16/10] object-cover object-top"
      />
      {hasMultiple && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() =>
              setIndex((index - 1 + project.images.length) % project.images.length)
            }
            className="bg-paper/90 border border-line text-ink px-2 py-1 text-xs"
          >
            &#8592;
          </button>
          {project.images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${
                index === i ? "bg-accent" : "bg-line"
              }`}
            />
          ))}
          <button
            type="button"
            aria-label="Next image"
            onClick={() => setIndex((index + 1) % project.images.length)}
            className="bg-paper/90 border border-line text-ink px-2 py-1 text-xs"
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const { t } = useTranslation();
  const linkClass =
    "text-sm font-medium text-ink underline underline-offset-4 decoration-line hover:decoration-accent hover:text-accent transition-colors";

  return (
    <div className="flex gap-6 mt-6">
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {t("project_visit")}
      </a>
      {project.codeUrl && (
        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {t("project_code")}
        </a>
      )}
    </div>
  );
}

export function Projects() {
  const { t } = useTranslation();

  const typeLabels: Record<ProjectType, string> = {
    own: t("project_type_own"),
    client: t("project_type_client"),
    template: t("project_type_template"),
  };

  const featured = PROJECTS.find((p) => p.featured)!;
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader label={t("section_projects")} title={t("projects_title")} />
          <p className="text-lg text-muted max-w-2xl -mt-8 mb-16">
            {t("projects_intro")}
          </p>
        </Reveal>

        <Reveal>
          <article className="grid md:grid-cols-2 gap-10 items-start mb-24">
            <ProjectImage project={featured} />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">
                {t("project_featured")} · {typeLabels[featured.type]}
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">
                {featured.title}
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                {t(featured.descKey)}
              </p>
              <ul className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-xs text-muted border border-line px-3 py-1"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <ProjectLinks project={featured} />
            </div>
          </article>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rest.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 100}>
              <article>
                <ProjectImage project={project} />
                <p className="text-xs uppercase tracking-[0.2em] text-muted mt-5 mb-2">
                  {typeLabels[project.type]}
                </p>
                <h3 className="font-display text-2xl text-ink mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t(project.descKey)}
                </p>
                <ProjectLinks project={project} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verifikation**

Run: `npm run build && npm run lint`
Expected: fehlerfrei.

---

### Task 9: NH-WebDev-Band + Journey

**Files:**
- Rewrite: `src/components/NhWebDevBand.tsx`
- Rewrite: `src/components/Journey.tsx`

**Interfaces:**
- Consumes: `SectionHeader`, `Reveal`, Keys `nhwd_*`, `section_journey`, `journey_title`, `journey_*`.

- [ ] **Step 1: `src/components/NhWebDevBand.tsx` ersetzen**

```tsx
import { useTranslation } from "../hooks/useTranslation";
import { Reveal } from "./Reveal";

export function NhWebDevBand() {
  const { t } = useTranslation();

  return (
    <section aria-label="NH-WebDev" className="border-y border-line">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-ink font-medium">{t("nhwd_text")}</p>
            <p className="text-sm text-muted">{t("nhwd_services")}</p>
            <a
              href="https://nh-webdev.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
            >
              {t("nhwd_link")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `src/components/Journey.tsx` ersetzen**

```tsx
import { useTranslation } from "../hooks/useTranslation";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function Journey() {
  const { t } = useTranslation();

  const entries = [
    {
      period: t("journey_nhwd_period"),
      title: t("journey_nhwd_title"),
      description: t("journey_nhwd_desc"),
    },
    {
      period: t("journey_ausbildung_period"),
      title: t("journey_ausbildung_title"),
      description: t("journey_ausbildung_desc"),
    },
    {
      period: t("journey_fhr_period"),
      title: t("journey_fhr_title"),
      description: t("journey_fhr_desc"),
    },
  ];

  return (
    <section id="journey" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader label={t("section_journey")} title={t("journey_title")} />
        </Reveal>

        <div>
          {entries.map((entry, index) => (
            <Reveal key={entry.title} delay={index * 100}>
              <div className="grid md:grid-cols-[220px_1fr] gap-2 md:gap-12 border-t border-line py-10 last:border-b">
                <p className="font-display text-xl text-accent">{entry.period}</p>
                <div>
                  <h3 className="text-xl font-semibold text-ink mb-3">
                    {entry.title}
                  </h3>
                  <p className="text-muted leading-relaxed max-w-2xl">
                    {entry.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verifikation**

Run: `npm run build && npm run lint`
Expected: fehlerfrei.

---

### Task 10: Contact + Footer

**Files:**
- Rewrite: `src/components/Contact.tsx`
- Rewrite: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `SectionHeader`, `Reveal`, `SocialLinks`, Keys `section_contact`, `contact_*`, `footer_text`. EmailJS-Credentials ausschließlich aus `import.meta.env.VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.

- [ ] **Step 1: `src/components/Contact.tsx` ersetzen**

Logik (Validierung, Rate-Limiting via localStorage, `emailjs.sendForm`) ist aus der alten Komponente übernommen; Styling und Credential-Handling sind neu. Keine hartkodierten Fallback-Credentials mehr.

```tsx
import { useState, useRef } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface RateLimitData {
  count: number;
  timestamp: number;
  lastEmailTime: number;
}

const RATE_LIMIT_CONFIG = {
  maxEmails: 3,
  timeWindow: 60 * 60 * 1000,
  cooldownPeriod: 5 * 60 * 1000,
};

const inputClass =
  "w-full px-4 py-3 bg-transparent border border-line text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors";

export function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "warning" | null;
    message: string;
  }>({ type: null, message: "" });

  const getRateLimitData = (): RateLimitData => {
    const stored = localStorage.getItem("contact_rate_limit");
    if (!stored) {
      return { count: 0, timestamp: Date.now(), lastEmailTime: 0 };
    }
    return JSON.parse(stored);
  };

  const setRateLimitData = (data: RateLimitData) => {
    localStorage.setItem("contact_rate_limit", JSON.stringify(data));
  };

  const checkRateLimit = (): { allowed: boolean; message?: string } => {
    const now = Date.now();
    const rateLimitData = getRateLimitData();

    if (now - rateLimitData.timestamp > RATE_LIMIT_CONFIG.timeWindow) {
      setRateLimitData({ count: 0, timestamp: now, lastEmailTime: 0 });
      return { allowed: true };
    }

    if (rateLimitData.count >= RATE_LIMIT_CONFIG.maxEmails) {
      const timeLeft = Math.ceil(
        (RATE_LIMIT_CONFIG.timeWindow - (now - rateLimitData.timestamp)) /
          (1000 * 60)
      );
      return {
        allowed: false,
        message: t("contact_rate_limit_exceeded")
          .replace("{0}", String(RATE_LIMIT_CONFIG.maxEmails))
          .replace("{1}", String(timeLeft)),
      };
    }

    if (
      rateLimitData.lastEmailTime &&
      now - rateLimitData.lastEmailTime < RATE_LIMIT_CONFIG.cooldownPeriod
    ) {
      const timeLeft = Math.ceil(
        (RATE_LIMIT_CONFIG.cooldownPeriod - (now - rateLimitData.lastEmailTime)) /
          (1000 * 60)
      );
      return {
        allowed: false,
        message: t("contact_rate_limit_cooldown").replace("{0}", String(timeLeft)),
      };
    }

    return { allowed: true };
  };

  const updateRateLimit = () => {
    const now = Date.now();
    const rateLimitData = getRateLimitData();

    if (now - rateLimitData.timestamp > RATE_LIMIT_CONFIG.timeWindow) {
      setRateLimitData({ count: 1, timestamp: now, lastEmailTime: now });
    } else {
      setRateLimitData({
        count: rateLimitData.count + 1,
        timestamp: rateLimitData.timestamp,
        lastEmailTime: now,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName =
      name === "from_name" ? "name" : name === "from_email" ? "email" : name;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({
        type: "error",
        message: t("contact_error_required_fields"),
      });
      return;
    }

    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setSubmitStatus({
        type: "warning",
        message: rateLimitCheck.message || t("contact_error_message"),
      });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus({ type: "error", message: t("contact_error_config") });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });

      updateRateLimit();
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitStatus({ type: "success", message: t("contact_success_message") });

      setTimeout(() => setSubmitStatus({ type: null, message: "" }), 8000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus({ type: "error", message: t("contact_error_message") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoItems = [
    { label: t("contact_email_label"), value: "haeussler.business@gmail.com", href: "mailto:haeussler.business@gmail.com" },
    { label: t("contact_location_label"), value: t("contact_location_value") },
    { label: t("contact_availability_label"), value: t("contact_availability_value") },
  ];

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader label={t("section_contact")} title={t("contact_title")} />
          <p className="text-lg text-muted max-w-2xl -mt-8 mb-16">
            {t("contact_intro")}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16">
          <Reveal>
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 border-l-2 text-sm ${
                  submitStatus.type === "success"
                    ? "border-accent text-ink bg-line/30"
                    : submitStatus.type === "warning"
                    ? "border-accent text-ink bg-line/30"
                    : "border-ink text-ink bg-line/30"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-ink mb-2">
                  {t("contact_subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={t("contact_subject_placeholder")}
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                  {t("contact_name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("contact_name_placeholder")}
                  required
                  disabled={isSubmitting}
                  minLength={2}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                  {t("contact_email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="from_email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("contact_email_placeholder")}
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                  {t("contact_message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t("contact_message_placeholder")}
                  required
                  disabled={isSubmitting}
                  minLength={10}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 text-sm font-medium transition-colors ${
                  isSubmitting
                    ? "bg-line text-muted cursor-not-allowed"
                    : "bg-ink text-paper hover:bg-accent"
                }`}
              >
                {isSubmitting ? t("contact_sending") : t("contact_submit")}
              </button>
            </form>
          </Reveal>

          <Reveal delay={150}>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
              {t("contact_info_title")}
            </h3>
            <dl className="mb-12">
              {infoItems.map((item) => (
                <div key={item.label} className="border-t border-line py-5">
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted mb-2">
                    {item.label}
                  </dt>
                  <dd className="text-ink">
                    {item.href ? (
                      <a href={item.href} className="hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="text-xs uppercase tracking-[0.2em] text-muted mb-4 border-t border-line pt-5">
              {t("contact_social_title")}
            </h3>
            <SocialLinks />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `src/components/Footer.tsx` ersetzen**

```tsx
import { useTranslation } from "../hooks/useTranslation";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">{t("footer_text")}</p>
        <SocialLinks />
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: `.env`-Variablen sicherstellen**

Run: `cat .env.example`
Expected: Enthält `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. Prüfen, dass eine lokale `.env` mit echten Werten existiert (`ls -a | grep "^\.env$"`). Falls nicht: Auftraggeber darauf hinweisen, dass das Formular ohne `.env` die konfigurierte Fehlermeldung zeigt.

- [ ] **Step 4: Verifikation**

Run: `npm run build && npm run lint`
Expected: fehlerfrei.

---

### Task 11: Abschluss-Verifikation

**Files:**
- Keine (nur Prüfungen)

- [ ] **Step 1: Build + Lint + Translations**

```bash
npm run build && npm run lint && npm run verify:translations
```

Expected: alles fehlerfrei, Verify meldet „OK".

- [ ] **Step 2: Keine Alt-Referenzen mehr**

```bash
grep -ri "authron" src public/translations.xml || echo "OK: authron gone"
grep -rn "matrix" src --include="*.tsx" --include="*.ts" --include="*.css" -i || echo "OK: matrix gone"
grep -rn "terminal_" src public/translations.xml || echo "OK: terminal keys gone"
grep -rn "green-500\|gray-8\|gray-9" src --include="*.tsx" || echo "OK: old colors gone"
grep -rn "yourusername" src || echo "OK: placeholder links gone"
grep -rn "service_x63nj8d\|template_2dlhx9o\|P7SERrBOTbuVz_6lh" src || echo "OK: hardcoded credentials gone"
```

Expected: jeweils die „OK"-Zeile.

- [ ] **Step 3: Keine Gedankenstriche in sichtbaren Texten**

```bash
grep -rn "—\|–" src --include="*.tsx" || echo "OK: no dashes in components"
npm run verify:translations
```

Expected: „OK"-Zeile und „OK: ... keys complete, no dashes".

- [ ] **Step 4: Dev-Server und Sichtprüfung**

```bash
npm run dev
```

Manuell (Auftraggeber) prüfen:
- Hero, About, Skills, Projekte (6 Einträge, Pragma featured mit 2 Screenshots), NH-WebDev-Band, Werdegang (3 Einträge), Kontakt, Footer
- DE/EN-Umschaltung ohne Konsolen-Warnungen („Translation missing")
- Mobile Ansicht (DevTools, 375px): Navbar-Burger-Menü, einspaltige Layouts, keine horizontalen Scrollbars
- Kein Matrix-Hintergrund, kein Terminal, kein grünes Theme sichtbar

- [ ] **Step 5: Lint-Regel react-refresh prüfen**

Run: `npm run lint`
Expected: keine Fehler durch neue Dateien (insb. `Reveal.tsx`, `SectionHeader.tsx`, `SocialLinks.tsx` exportieren nur Komponenten).
