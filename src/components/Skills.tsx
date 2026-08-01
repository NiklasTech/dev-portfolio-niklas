import { useTranslation } from "../hooks/useTranslation";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const SKILLS = [
  { id: "web", titleKey: "skill_web_title", descKey: "skill_web_desc" },
  {
    id: "ecommerce",
    titleKey: "skill_ecommerce_title",
    descKey: "skill_ecommerce_desc",
  },
  { id: "backend", titleKey: "skill_backend_title", descKey: "skill_backend_desc" },
  { id: "uiux", titleKey: "skill_uiux_title", descKey: "skill_uiux_desc" },
  {
    id: "software",
    titleKey: "skill_software_title",
    descKey: "skill_software_desc",
  },
  { id: "devops", titleKey: "skill_devops_title", descKey: "skill_devops_desc" },
] as const;

export function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader label={t("section_skills")} title={t("skills_title")} />
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {SKILLS.map((skill, index) => (
            <Reveal key={skill.id} delay={(index % 3) * 100}>
              <div className="border-t border-line pt-6">
                <h3 className="font-display text-xl text-ink mb-2">
                  {t(skill.titleKey)}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t(skill.descKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
