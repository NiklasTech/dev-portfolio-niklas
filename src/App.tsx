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
        <span className="font-display text-2xl text-ink">Niklas Häußler</span>
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
