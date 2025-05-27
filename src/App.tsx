import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Matrix } from "./components/Matrix";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Terminal } from "./components/Terminal";
import { Timeline } from "./components/Timeline";
import { TranslationProvider } from "./hooks/useTranslation";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Suspense, useEffect } from "react";

export function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <TranslationProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="min-h-screen text-gray-200">
          <Matrix />
          <Navbar />
          <main>
            <Hero />
            <Terminal />
            <Skills />
            <Projects />
            <Timeline />
            <Contact />
          </main>
        </div>
      </Suspense>
    </TranslationProvider>
  );
}
