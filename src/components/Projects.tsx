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

function ProjectImage({ project, eager = false }: { project: Project; eager?: boolean }) {
  const [index, setIndex] = useState(0);
  const [failedSrcs, setFailedSrcs] = useState<string[]>([]);
  const hasMultiple = project.images.length > 1;
  const currentSrc = project.images[index];
  const currentFailed = failedSrcs.includes(currentSrc);

  return (
    <div className="relative border border-line overflow-hidden bg-paper">
      {currentFailed ? (
        <div className="w-full aspect-[16/10] flex items-center justify-center border-line bg-line/30">
          <span className="font-display text-2xl text-muted">{project.title}</span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={`${project.title} Screenshot`}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailedSrcs((prev) => [...prev, currentSrc])}
          className="w-full aspect-[16/10] object-cover object-top"
        />
      )}
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
            <ProjectImage project={featured} eager />
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
