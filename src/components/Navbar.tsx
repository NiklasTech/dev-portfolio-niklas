import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./LanguageSwitch";
import { useTranslation } from "../hooks/useTranslation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    closeMobileMenu();
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav
      className={`fixed w-full z-20 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-950/90 backdrop-blur-md py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-mono font-bold">
          <span className="text-green-500">dev</span>
          <span className="text-white">@niklas</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex space-x-8">
            <li>
              <a
                href="#home"
                className="text-gray-300 hover:text-green-500 transition hover:underline underline-offset-4"
              >
                {t("nav_home")}
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="text-gray-300 hover:text-green-500 transition hover:underline underline-offset-4"
              >
                {t("nav_skills")}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="text-gray-300 hover:text-green-500 transition hover:underline underline-offset-4"
              >
                {t("nav_projects")}
              </a>
            </li>
            <li>
              <a
                href="#timeline"
                className="text-gray-300 hover:text-green-500 transition hover:underline underline-offset-4"
              >
                {t("nav_journey")}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-300 hover:text-green-500 transition hover:underline underline-offset-4"
              >
                {t("nav_contact")}
              </a>
            </li>
          </ul>
          <LanguageSwitcher />
        </div>
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={toggleMobileMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 text-gray-300 hover:text-green-500 hover:border-green-500 transition"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gray-950/95 backdrop-blur-md border-t border-gray-800 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => handleNavClick("#home")}
                className="block w-full text-left text-gray-300 hover:text-green-500 transition py-2 text-lg"
              >
                {t("nav_home")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("#skills")}
                className="block w-full text-left text-gray-300 hover:text-green-500 transition py-2 text-lg"
              >
                {t("nav_skills")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("#projects")}
                className="block w-full text-left text-gray-300 hover:text-green-500 transition py-2 text-lg"
              >
                {t("nav_projects")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("#timeline")}
                className="block w-full text-left text-gray-300 hover:text-green-500 transition py-2 text-lg"
              >
                {t("nav_journey")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("#contact")}
                className="block w-full text-left text-gray-300 hover:text-green-500 transition py-2 text-lg"
              >
                {t("nav_contact")}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 -z-10"
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
}
