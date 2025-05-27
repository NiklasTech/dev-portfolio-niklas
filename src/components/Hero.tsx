import { useState, useEffect } from "react";
import Niklas_ProfilePic from "../assets/Niklas_ProfilePic.jpg";
import { useTranslation } from "../hooks/useTranslation";

export function Hero() {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState("");
  const fullText = t("hero_greeting");
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowDescription(true), 500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="space-y-3">
              <p className="terminal-text font-mono text-lg">$ whoami</p>
              <h1 className="text-5xl md:text-6xl font-bold mb-2">
                {displayText}
                <span
                  className={`ml-1 inline-block w-2 h-12 bg-green-500 animate-cursor ${
                    showDescription ? "opacity-0" : ""
                  }`}
                ></span>
              </h1>
              <h2
                className={`text-2xl text-gray-400 transition-opacity duration-500 ${
                  showDescription ? "opacity-100" : "opacity-0"
                }`}
              >
                {t("hero_title")}
              </h2>
            </div>

            <div
              className={`transition-opacity duration-500 delay-300 ${
                showDescription ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-lg text-gray-300">
                <span className="text-green-500 font-semibold">
                  {t("hero_description")}
                </span>
              </p>
            </div>

            <div
              className={`flex gap-4 transition-opacity duration-500 delay-500 ${
                showDescription ? "opacity-100" : "opacity-0"
              }`}
            >
              <a
                href="#contact"
                className="bg-green-600 hover:bg-green-700 text-black font-medium px-6 py-3 rounded-lg transition flex items-center gap-2"
              >
                <span>{t("hero_cta_work")}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
              <a
                href="#projects"
                className="border border-gray-600 hover:border-green-500 text-gray-300 hover:text-green-500 px-6 py-3 rounded-lg transition"
              >
                {t("hero_view_projects")}
              </a>
            </div>

            <div
              className={`flex gap-6 transition-opacity duration-500 delay-700 ${
                showDescription ? "opacity-100" : "opacity-0"
              }`}
            >
              <a
                href="https://github.com/NiklasTech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/niklas-h-tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="mailto:haeussler.business@gmail.com"
                className="text-gray-400 hover:text-white transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 profile-card rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-green-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-gray-800/50 to-gray-900/80 animate-gradient"></div>

              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 pattern-overlay"></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-700 rounded-full opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
                  <img
                    src={Niklas_ProfilePic}
                    alt="Niklas Profile"
                    className="relative w-64 h-64 rounded-full object-cover border-2 border-gray-700/50 group-hover:border-green-500/50 transition duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
