import { useTranslation } from "../hooks/useTranslation";
import { useState } from "react";

export function Projects() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: number]: number;
  }>({});

  const projects = [
    {
      title: t("project_authron_title"),
      description: t("project_authron_desc"),
      tags: [
        "React",
        "TypeScript",
        "FastAPI",
        "SQLite",
        "Tailwind CSS",
        "2FA/TOTP",
      ],
      images: [
        "/screenshots/authron-login.png",
        "/screenshots/authron-dashboard.png",
        "/screenshots/authron-settings.png",
        "/screenshots/authron-generator.png",
      ],
      demoLink: null,
      codeLink: "https://github.com/niklastech/authron",
      featured: true,
    },
    {
      title: t("project_portfolio_title"),
      description: t("project_portfolio_desc"),
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      images: [
        "/screenshots/portfolio-hero.png",
        "/screenshots/portfolio-terminal.png",
        "/screenshots/portfolio-projects.png",
      ],
      demoLink: window.location.origin,
      codeLink: "https://github.com/yourusername/portfolio",
      featured: false,
    },
  ];

  const nextImage = (projectIndex: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (projectIndex: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectIndex]:
        ((prev[projectIndex] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const setImageIndex = (projectIndex: number, imageIndex: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectIndex]: imageIndex,
    }));
  };

  return (
    <section id="projects" className="py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-green-500 font-mono mb-2">my_work.js</p>
          <h2 className="text-4xl font-bold text-white">
            {t("projects_title")}
          </h2>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
            {t("projects_description_real")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`card mb-12 overflow-hidden transition-all hover:translate-y-[-5px] ${
                project.featured
                  ? "border-green-500/30 bg-gradient-to-br from-green-500/5 to-gray-900"
                  : "bg-gradient-to-bl from-gray-900 to-gray-950"
              } ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {project.featured && (
                <div className="absolute top-4 right-4 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                  {t("project_featured")}
                </div>
              )}

              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center`}
              >
                <div className="md:w-1/2 p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-800 text-green-400 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.demoLink && project.demoLink !== "#" ? (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
                      >
                        <span>{t("project_live_demo")}</span>
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
                      <span className="flex items-center gap-1 text-sm font-medium text-gray-500">
                        <span>{t("project_no_demo")}</span>
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
                            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </span>
                    )}
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                      <span>{t("project_view_code")}</span>
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
                          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="md:w-1/2 relative bg-gray-800">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    {project.images && project.images.length > 0 ? (
                      <div className="relative h-full w-full">
                        <img
                          src={project.images[currentImageIndex[index] || 0]}
                          alt={`${project.title} Screenshot`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            if (e.currentTarget.nextElementSibling) {
                              (
                                e.currentTarget
                                  .nextElementSibling as HTMLElement
                              ).style.display = "flex";
                            }
                          }}
                        />
                        {project.images.length > 1 && (
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                            <button
                              className="bg-gray-900/70 text-white rounded-full px-2 py-1 text-xs"
                              onClick={() =>
                                prevImage(index, project.images.length)
                              }
                              aria-label="Previous image"
                              type="button"
                            >
                              &#8592;
                            </button>
                            {project.images.map((_, imgIdx) => (
                              <button
                                key={imgIdx}
                                className={`w-2 h-2 rounded-full ${
                                  currentImageIndex[index] === imgIdx
                                    ? "bg-green-400"
                                    : "bg-gray-500"
                                }`}
                                onClick={() => setImageIndex(index, imgIdx)}
                                aria-label={`Go to image ${imgIdx + 1}`}
                                type="button"
                              />
                            ))}
                            <button
                              className="bg-gray-900/70 text-white rounded-full px-2 py-1 text-xs"
                              onClick={() =>
                                nextImage(index, project.images.length)
                              }
                              aria-label="Next image"
                              type="button"
                            >
                              &#8594;
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 font-mono bg-gray-800">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="w-12 h-12 mb-4 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                        <span className="text-sm">
                          {t("project_screenshot_coming")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="card p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              {t("projects_work_in_progress")}
            </h3>
            <p className="text-gray-400 mb-4">{t("projects_more_coming")}</p>
            <a
              href="https://github.com/NiklasTech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <span>{t("projects_github_follow")}</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
