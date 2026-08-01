# Portfolio Redesign: „Editorial Portfolio"

**Datum:** 2026-07-31
**Status:** Vom Auftraggeber freigegebenes Konzept (Struktur-Details: kreative Freiheit)

## Ziel

Komplette Überarbeitung des Portfolios (optisch und inhaltlich). Nichts soll mehr an das alte Matrix-/Terminal-Design erinnern. Ergebnis: ein professionelles, helles Portfolio im Editorial-Stil mit aktuellen Inhalten (Ausbildungsabschluss, Selbstständigkeit, neue Projekte).

## Copy-Regel

**Keine Gedankenstriche (— oder –) in sichtbaren Website-Texten.** Stattdessen Kommas, Doppelpunkte oder Punkte verwenden. Jahreszahlen werden mit einfachem Bindestrich geschrieben („2021 - 2023").

## Technischer Ansatz

- **Stack bleibt:** React 19 + TypeScript + Vite 6 + Tailwind CSS 4. Deployment auf Vercel unverändert.
- **i18n bleibt:** Bestehendes System (`public/translations.xml`, `src/hooks/useTranslation.tsx`, `src/utils/translationParser.ts`) wird weiterverwendet; alle Inhalte in `translations.xml` werden komplett neu geschrieben (DE + EN).
- **Kompletter Neuaufbau** aller Komponenten und Styles. Alter Code, der nicht mehr gebraucht wird, wird gelöscht (siehe „Entfernt wird").
- **Fonts:** `Fraunces` (Variable Serif, Display/Überschriften) + `Inter` (Variable Sans, Fließtext), self-hosted via `@fontsource-variable/fraunces` und `@fontsource-variable/inter` (kein Google-Fonts-Request, DSGVO-freundlich).
- **Kontaktformular:** EmailJS bleibt, inkl. bestehendem Rate-Limiting (3 Mails/Stunde, 5 Min Cooldown via localStorage). Nur neues Styling; keine hartkodierten Fallback-Credentials mehr, nur noch `import.meta.env`-Variablen (Werte stehen in `.env`).
- **Analytics:** `@vercel/analytics` und `@vercel/speed-insights` bleiben.

## Design-System

- **Hintergrund:** Off-White `#FAFAF7`
- **Text (Ink):** `#16150F`; gedämpft: `#6B6659`
- **Akzent:** Terracotta `#C64B2A` (sparsam: Links, Hover-States, kleine Marker)
- **Linien:** feine Haarlinien `#E3E0D8` als Trenner (Editorial-Look)
- **Typografie:**
  - Display: Fraunces, große Größen (Hero-Name bis ca. `clamp(3rem, 8vw, 7rem)`), enge Zeilenhöhe
  - Fließtext/UI: Inter
  - Kleine Labels: Inter, uppercase, weite Laufweite (`tracking-widest`), 12 bis 13 px
- **Layout:** max. Breite ca. `72rem`, großzügige Sektionsabstände (`py-24` bis `py-32`), 12-Spalten-Gefühl über CSS Grid; Sektionen mit Editorial-Nummerierung („01 · Über mich")
- **Motion:** dezent, nur Fade/Slide-in beim Scrollen via IntersectionObserver (kleiner Hook `useReveal`), Hover-Transitions 200 bis 300 ms. Keine Parallax-Effekte, kein Typewriter, kein Canvas.
- **Responsive:** Mobile-first; Hero und Projekt-Layout brechen sauber auf eine Spalte um.

## Seitenstruktur (Single Page)

### Navbar
Sticky, transparent, wird beim Scrollen Off-White mit Haarlinie. Links: „Niklas Häusler" (Fraunces). Rechts: Sektions-Links, DE/EN-Toggle (bestehender `LanguageSwitch`, neu gestylt), optional E-Mail-Button.

### Hero
- Editorial: sehr groß gesetzter Name über volle Breite, darunter Rollenzeile: „Fachinformatiker für Anwendungsentwicklung · Full-Stack-Entwickler"
- Neues Foto `src/assets/Profile-Pic.jpeg`, versetzt rechts, mit feinem Rahmen/Akzent-Offset (kein Kreis-Crop im alten Stil)
- Kurze Intro (2 Sätze), CTAs: „Projekte ansehen" (gefüllt, Ink) + „Kontakt" (Outline)
- Social Links: GitHub (github.com/NiklasTech), LinkedIn (linkedin.com/in/niklas-h-tech/), E-Mail (haeussler.business@gmail.com)

### 01 · Über mich
Zweispaltig: links Fließtext-Bio, rechts Faktenliste.
- Bio: Frisch ausgebildeter Fachinformatiker für Anwendungsentwicklung (IHK-Abschluss Juli 2026), Full-Stack-Fokus, aus Heinsberg. Nebenberuflich selbstständig (NH-WebDev, seit Okt. 2025). Baut eigene Tools (Pragma) und Kundenprojekte.
- Fakten: Standort Heinsberg (DE) · Ausbildung Fachinformatiker AE (IHK 2026) · Sprachen: Deutsch (Muttersprache), Englisch (C1-Niveau, ohne Zertifikat, formuliert als „C1-Niveau")

### 02 · Skills
Drei Gruppen als saubere Listen mit Haarlinien (keine Prozentbalken, keine Icon-Kacheln):
- **Frontend:** React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML/CSS
- **Backend:** Node.js, Python, FastAPI, Express, PostgreSQL, SQLite
- **Tools & Deployment:** Git, Docker, Vite, Vercel, Linux

### 03 · Projekte
Editorial-Index mit Nummern. **Pragma** als große Featured-Card, darunter Grid mit den übrigen.

1. **Pragma** (featured, Eigenprojekt): AI-native Desktop-IDE mit integriertem Terminal. Tauri 2, Rust, React 19, TypeScript, CodeMirror 6, xterm.js. Links: GitHub (github.com/NiklasTech/pragma) + Website (pragma-zeta-two.vercel.app)
2. **Vehicle Lab** (Kundenprojekt, NH-WebDev): Website für KFZ-Sachverständigenbüro, Raum Aachen/Herzogenrath. Live: vehicle-lab.de
3. **Fairdress** (Kundenprojekt, NH-WebDev): E-Commerce-Shop für geprüfte Secondhand-Designerkleidung. Live: fairdress.de
4. **Template: Friseur/Barbershop:** Demo-Template. Live: template-friseur.vercel.app
5. **Template: Blog:** Demo-Template. Live: template-blog-phi.vercel.app
6. **Template: Bauunternehmen:** Demo-Template. Live: bauunternehmen.vercel.app

Screenshots pro Projekt mit Carousel (Logik aus altem `Projects.tsx` übernehmen, neu gestylt).

### NH-WebDev-Band (dezent)
Schmaler Akzent-Streifen zwischen Projekten und Werdegang: „Selbstständig als Webentwickler seit Oktober 2025" plus Leistungen in einer Zeile (Webentwicklung · E-Commerce · Entwicklung nach Auftrag) plus Link „nh-webdev.de". Kein Sales-Pitch, keine Preise.

### 04 · Werdegang
Chronologische Liste (neueste zuerst) mit Jahreszahlen in Fraunces und Haarlinien:
- **Seit Okt. 2025 · NH-WebDev (Kleingewerbe, nebenberuflich):** Konzeption und Entwicklung von Webanwendungen, E-Commerce-Plattformen und Auftragsentwicklung
- **2023 - 2026 · Ausbildung Fachinformatiker für Anwendungsentwicklung, AixperSoft:** IHK-Abschlussprüfung Juli 2026 bestanden; Anstellung im Ausbildungsbetrieb bis 15.08.2026
- **2021 - 2023 · Fachhochschulreife, Berufsschule:** Spezialisierung Informatik mit Fokus Webentwicklung; Grundlagen der Programmierung und Softwareentwicklung; dort Leidenschaft für Frontend-Entwicklung und UI/UX-Design entwickelt

### 05 · Kontakt
- EmailJS-Formular (Betreff, Name, E-Mail, Nachricht) mit bestehender Validierung und Rate-Limiting, komplett neu gestylt
- Kontaktinfos: haeussler.business@gmail.com, Heinsberg (DE), Verfügbarkeit (ab Mitte August 2026)
- Footer: Name, Social Links, „© 2026"

## Entfernt wird

- `src/components/Matrix.tsx`, `src/matrix.css`
- `src/components/Terminal.tsx`
- `src/components/Testimonials.tsx` (ungenutzt)
- `src/components/LoadingSpinner.tsx` (durch schlichten Loader ersetzt)
- Altes Foto `src/assets/Niklas_ProfilePic.jpg`
- Alte Screenshots `public/screenshots/authron-*` und `portfolio-*`
- Authron-Projekt komplett (Inhalte + Translations)
- Hartkodierte EmailJS-Fallback-Credentials in `Contact.tsx`
- `window.location.origin`-Demo-Link-Hack und `yourusername`-Platzhalter-Link

## Neue Assets

- Screenshots für: Pragma (Website), vehicle-lab.de, fairdress.de, 3 Templates, abgelegt in `public/screenshots/`
- Erstellung: automatisiert per Headless-Browser (Playwright in isoliertem Temp-Setup), sofern in der Umgebung machbar; Fallback: Platzhalter-Grafiken im neuen Stil, Austausch durch Auftraggeber später
- Neues Foto liegt bereits: `src/assets/Profile-Pic.jpeg`

## Inhalte / Copy

Alle Texte neu in `public/translations.xml` (DE + EN), Keys neu strukturiert nach Sektionen (z. B. `about_*`, `work_*`, `project_pragma_*`). `src/utils/verifyTranslations.ts` bleibt zur Prüfung der Vollständigkeit. Copy-Regel (keine Gedankenstriche) gilt für alle Texte.

## Akzeptanzkriterien

- `npm run build` und `npm run lint` laufen fehlerfrei
- Kein sichtbares Element des alten Designs (Matrix, Terminal, grünes Theme, Typewriter)
- Alle 6 Projekte mit korrekten Links; Authron nirgends mehr referenziert
- DE und EN vollständig (keine fehlenden Keys, keine Konsolen-Warnungen)
- Keine Gedankenstriche in sichtbaren Texten
- Kontaktformular funktioniert mit `.env`-Credentials
- Responsive: Mobile, Tablet, Desktop geprüft
