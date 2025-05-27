import { useTranslation } from "../hooks/useTranslation";

export function Skills() {
  const { t } = useTranslation();

  const frontendSkills = [
    { name: "React", logo: "R" },
    { name: "TypeScript", logo: "T" },
    { name: "JavaScript", logo: "J" },
    { name: "Tailwind", logo: "T" },
    { name: "HTML/CSS", logo: "H" },
  ];

  const backendSkills = [
    { name: "FastAPI", logo: "F" },
    { name: "Python", logo: "P" },
    { name: "Node.js", logo: "N" },
    { name: "SQLite", logo: "S" },
    { name: "Express", logo: "E" },
  ];

  const otherSkills = [
    "Git",
    "Vite",
    "Webpack",
    "phpMyAdmin",
    "Database UI Tools",
    "VS Code",
    "Linux",
    "Windows",
    "Lua Scripting",
  ];

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-green-500 font-mono mb-2">what_i_do.ts</p>
            <h2 className="text-4xl font-bold text-white">
              {t("skills_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="card p-6">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <span className="text-green-500 mr-2">&lt;/&gt;</span>{" "}
                {t("skills_frontend_title")}
              </h3>

              <div className="grid grid-cols-5 gap-4 mb-8">
                {frontendSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-icon flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 card-element rounded-lg flex items-center justify-center text-2xl text-green-500 mb-2">
                      {skill.logo}
                    </div>
                    <span className="text-sm text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      React Development
                    </span>
                    <span className="text-sm font-medium text-green-500">
                      85%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      {t("skills_responsive_design")}
                    </span>
                    <span className="text-sm font-medium text-green-500">
                      82%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      TypeScript Integration
                    </span>
                    <span className="text-sm font-medium text-green-500">
                      78%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      Modern CSS & Styling
                    </span>
                    <span className="text-sm font-medium text-green-500">
                      80%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <span className="text-green-500 mr-2">&lt;/&gt;</span>{" "}
                {t("skills_backend_title")}
              </h3>

              <div className="grid grid-cols-5 gap-4 mb-8">
                {backendSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-icon flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 card-element rounded-lg flex items-center justify-center text-2xl text-green-500 mb-2">
                      {skill.logo}
                    </div>
                    <span className="text-sm text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      API Development
                    </span>
                    <span className="text-sm font-medium text-green-500">
                      72%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      Database Management
                    </span>
                    <span className="text-sm font-medium text-green-500">
                      68%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "68%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      Python Development
                    </span>
                    <span className="text-sm font-medium text-green-500">
                      65%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      Server Architecture
                    </span>
                    <span className="text-sm font-medium text-green-500">
                      60%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
              <span className="text-green-500 mr-2"></span>
              {t("skills_other_technologies")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {otherSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800/60 border border-gray-700/50 text-gray-300 rounded-lg text-sm transition-all duration-300 hover:text-white hover:border-green-500/50 hover:bg-gray-700/60 hover:scale-105 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
