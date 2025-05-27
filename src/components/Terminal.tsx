import { useState, useRef, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";

type CommandOutput = {
  command: string;
  output: React.ReactNode;
};

export function Terminal() {
  const { t, isLoading } = useTranslation();
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !isInitialized) {
      setHistory([
        {
          command: "",
          output: (
            <div className="mb-2">
              <span className="text-green-500 font-bold">
                {t("terminal_welcome")}
              </span>
              <br />
              {t("terminal_try_commands")}{" "}
              <span className="text-purple-400">help</span>,{" "}
              <span className="text-purple-400">about</span>,{" "}
              <span className="text-purple-400">skills</span>,{" "}
              <span className="text-purple-400">projects</span>,{" "}
              <span className="text-purple-400">contact</span>,{" "}
              <span className="text-purple-400">clear</span>
            </div>
          ),
        },
      ]);
      setIsInitialized(true);
    }
  }, [isLoading, isInitialized, t]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();

    if (!command.trim()) return;

    let output: React.ReactNode;

    switch (command.toLowerCase()) {
      case "help":
        output = (
          <div>
            <p className="text-green-400 font-semibold">
              {t("terminal_help_available")}
            </p>
            <ul className="ml-4 space-y-1">
              <li>
                <span className="text-purple-400">about</span> -{" "}
                {t("terminal_help_about")}
              </li>
              <li>
                <span className="text-purple-400">skills</span> -{" "}
                {t("terminal_help_skills")}
              </li>
              <li>
                <span className="text-purple-400">projects</span> -{" "}
                {t("terminal_help_projects")}
              </li>
              <li>
                <span className="text-purple-400">contact</span> -{" "}
                {t("terminal_help_contact")}
              </li>
              <li>
                <span className="text-purple-400">clear</span> -{" "}
                {t("terminal_help_clear")}
              </li>
              <li>
                <span className="text-purple-400">help</span> -{" "}
                {t("terminal_help_help")}
              </li>
            </ul>
          </div>
        );
        break;

      case "about":
        output = (
          <div>
            <p className="mb-2">{t("terminal_about_text")}</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div>
            <p className="text-green-400 font-semibold">
              {t("terminal_skills_frontend")}
            </p>
            <p className="ml-4">
              React, TypeScript, JavaScript, Tailwind CSS, HTML/CSS
            </p>
            <p className="text-green-400 font-semibold mt-2">
              {t("terminal_skills_backend")}
            </p>
            <p className="ml-4">FastAPI, Python, Node.js, SQLite, Express</p>
            <p className="text-green-400 font-semibold mt-2">
              {t("terminal_skills_tools")}
            </p>
            <p className="ml-4">
              Git, Vite, Webpack, phpMyAdmin, VS Code, Lua Scripting
            </p>
            <p className="text-yellow-400 font-semibold mt-2">
              🎓 Lerne aktuell:
            </p>
            <p className="ml-4 text-gray-300">
              Testing, Docker, Advanced Database Concepts
            </p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div>
            <p className="text-green-400 font-semibold">
              {t("terminal_projects_recent")}
            </p>
            <ul className="ml-4 space-y-2">
              <li>
                <span className="text-purple-400 font-semibold">
                  {t("project_ecommerce_title")}
                </span>
                <p>{t("terminal_project_ecommerce")}</p>
              </li>
              <li>
                <span className="text-purple-400 font-semibold">
                  {t("project_taskmanager_title")}
                </span>
                <p>{t("terminal_project_taskmanager")}</p>
              </li>
              <li>
                <span className="text-purple-400 font-semibold">
                  {t("project_authron_title")}
                </span>
                <p>{t("terminal_project_portfolio")}</p>
              </li>
            </ul>
            <p className="mt-2">{t("terminal_project_more")}</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div>
            <p className="text-green-400 font-semibold">
              {t("terminal_contact_info")}
            </p>
            <ul className="ml-4 space-y-1">
              <li>
                Email:{" "}
                <a
                  href="mailto:your.email@example.com"
                  className="text-blue-400 hover:underline"
                >
                  haeussler.business@gmail.com
                </a>
              </li>
              <li>
                GitHub:{" "}
                <a
                  href="https://github.com/NiklasTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  github.com/niklastech
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/niklas-h-tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  linkedin.com/in/niklas-h-tech
                </a>
              </li>
            </ul>
            <p className="mt-2">{t("terminal_contact_message")}</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setCommand("");
        return;

      case "cd projects":
        output = <p>{t("terminal_navigate_projects")}</p>;
        setTimeout(() => {
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 1000);
        break;

      case "cd skills":
        output = <p>{t("terminal_navigate_skills")}</p>;
        setTimeout(() => {
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 1000);
        break;

      case "cd contact":
        output = <p>{t("terminal_navigate_contact")}</p>;
        setTimeout(() => {
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 1000);
        break;

      default:
        output = (
          <p className="text-red-400">
            {t("terminal_command_not_found")} {command}.{" "}
            {t("terminal_type_help")}
          </p>
        );
    }

    setHistory((prev) => [...prev, { command, output }]);
    setCommand("");
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-900 rounded-lg border border-gray-800 shadow-lg overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-sm text-gray-400 font-mono">
                terminal@portfolio ~
              </p>
            </div>
            <div className="p-4 h-80 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-green-500 font-mono">
                  Initializing terminal...
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div
          className="bg-gray-900 rounded-lg border border-gray-800 shadow-lg overflow-hidden"
          onClick={focusInput}
        >
          <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <p className="text-sm text-gray-400 font-mono">
              terminal@portfolio ~
            </p>
          </div>

          <div
            ref={terminalRef}
            className="p-4 h-80 overflow-y-auto font-mono text-sm"
          >
            {history.map((entry, index) => (
              <div key={index} className="mb-4">
                {entry.command && (
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">$</span>
                    <span>{entry.command}</span>
                  </div>
                )}
                <div className="ml-4 mt-1 text-gray-300">{entry.output}</div>
              </div>
            ))}

            <form onSubmit={handleCommand} className="flex items-center">
              <span className="text-green-500 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="flex-grow bg-transparent outline-none"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
