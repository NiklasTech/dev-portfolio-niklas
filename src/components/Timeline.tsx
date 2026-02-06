import { useTranslation } from "../hooks/useTranslation";

export function Timeline() {
  const { t } = useTranslation();

  const experiences = [
    {
      title: t("timeline_it_specialist"),
      company: t("timeline_current_position"),
      period: "2023 - Present",
      description: [t("timeline_it_desc1"), t("timeline_it_desc2")],
      achievements: [
        t("timeline_it_achievement1"),
        t("timeline_it_achievement2"),
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "JavaScript"],
    },
    {
      title: t("timeline_freelance_title"),
      company: t("timeline_freelance_company"),
      period: "2023 - Present",
      description: [t("timeline_freelance_desc1"), t("timeline_freelance_desc2")],
      achievements: [
        t("timeline_freelance_achievement1"),
        t("timeline_freelance_achievement2"),
      ],
      technologies: ["React", "Next.js", "Node.js", "Tailwind CSS", "FastAPI"],
      website: "https://nh-webdev.de/",
    },
    {
      title: t("timeline_college_title"),
      company: t("timeline_college"),
      period: "2021 - 2023",
      description: [t("timeline_college_desc1"), t("timeline_college_desc2")],
      achievements: [
        t("timeline_college_achievement1"),
        t("timeline_college_achievement2"),
      ],
      technologies: [
        "HTML/CSS",
        "JavaScript",
        "Python",
        "Database Fundamentals",
      ],
    },
  ];

  return (
    <section id="timeline" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-green-500 font-mono mb-2">career_path.ts</p>
          <h2 className="text-4xl font-bold text-white">
            {t("timeline_title")}
          </h2>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
            {t("timeline_description")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="relative pl-12">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-500/30"></div>

              {experiences.map((experience, index) => (
                <div key={index} className="mb-12 relative">
                  <div
                    className="absolute w-4 h-4 rounded-full bg-green-500 z-10 border-2 border-gray-900"
                    style={{ left: "-2rem", top: "0.5rem" }}
                  ></div>

                  <div className="card p-6">
                    <div className="text-green-500 mb-2 font-mono text-sm">
                      {experience.period}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {experience.title}
                    </h3>
                    {experience.website ? (
                      <a
                        href={experience.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 mb-4 font-medium inline-flex items-center gap-1 hover:text-blue-300 transition"
                      >
                        {experience.company}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </a>
                    ) : (
                      <div className="text-blue-400 mb-4 font-medium">
                        {experience.company}
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-gray-400 font-medium mb-2 text-sm">
                          {t("timeline_responsibilities")}
                        </h4>
                        <ul className="text-gray-300 space-y-1">
                          {experience.description.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2 mt-1">
                                •
                              </span>
                              <span className="leading-relaxed text-sm">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-gray-400 font-medium mb-2 text-sm">
                          {t("timeline_key_focus")}
                        </h4>
                        <ul className="space-y-1">
                          {experience.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2 mt-1">
                                ◆
                              </span>
                              <span className="text-gray-300 leading-relaxed text-sm">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {experience.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-500/30"></div>

            {experiences.map((experience, index) => (
              <div
                key={index}
                className={`mb-20 flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-green-500 z-10"></div>

                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <div className="card p-6 transform transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-green-500 mb-2 font-mono text-sm">
                      {experience.period}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {experience.title}
                    </h3>
                    {experience.website ? (
                      <a
                        href={experience.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 mb-4 font-medium inline-flex items-center gap-1 hover:text-blue-300 transition"
                      >
                        {experience.company}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </a>
                    ) : (
                      <div className="text-blue-400 mb-4 font-medium">
                        {experience.company}
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-gray-400 font-medium mb-2 text-sm">
                          {t("timeline_responsibilities")}
                        </h4>
                        <ul className="text-gray-300 space-y-1">
                          {experience.description.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2 mt-1">
                                •
                              </span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-gray-400 font-medium mb-2 text-sm">
                          {t("timeline_key_focus")}
                        </h4>
                        <ul className="space-y-1">
                          {experience.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2 mt-1">
                                ◆
                              </span>
                              <span className="text-gray-300 leading-relaxed">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {experience.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Learning & Goals Section */}
          <div className="mt-16 text-center relative z-10">
            <div className="pt-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <div className="card p-6">
                  <div className="text-lg md:text-xl font-bold text-white mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 md:w-6 md:h-6 text-green-500 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                    <span>{t("timeline_learning_focus")}</span>
                  </div>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">•</span>
                      <span className="text-sm md:text-base">
                        {t("timeline_learning1")}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">•</span>
                      <span className="text-sm md:text-base">
                        {t("timeline_learning2")}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">•</span>
                      <span className="text-sm md:text-base">
                        {t("timeline_learning3")}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <div className="text-lg md:text-xl font-bold text-white mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 md:w-6 md:h-6 text-green-500 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                      />
                    </svg>
                    <span>{t("timeline_professional_goals")}</span>
                  </div>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">•</span>
                      <span className="text-sm md:text-base">
                        {t("timeline_goal1")}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">•</span>
                      <span className="text-sm md:text-base">
                        {t("timeline_goal2")}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">•</span>
                      <span className="text-sm md:text-base">
                        {t("timeline_goal3")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
