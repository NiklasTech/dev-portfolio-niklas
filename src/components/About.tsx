import { useTranslation } from "../hooks/useTranslation";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function About() {
  const { t } = useTranslation();

  const facts = [
    { id: "location", label: t("about_fact_location_label"), value: t("about_fact_location_value") },
    { id: "education", label: t("about_fact_education_label"), value: t("about_fact_education_value") },
    { id: "languages", label: t("about_fact_languages_label"), value: t("about_fact_languages_value") },
  ];

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader label={t("section_about")} title={t("about_title")} />
        </Reveal>

        <div className="grid md:grid-cols-12 gap-12">
          <Reveal className="md:col-span-7">
            <p className="text-lg text-ink leading-relaxed mb-6">
              {t("about_text_1")}
            </p>
            <p className="text-lg text-muted leading-relaxed">
              {t("about_text_2")}
            </p>
          </Reveal>

          <Reveal delay={150} className="md:col-span-5">
            <dl>
              {facts.map((fact) => (
                <div
                  key={fact.id}
                  className="border-t border-line py-5 last:border-b"
                >
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted mb-2">
                    {fact.label}
                  </dt>
                  <dd className="text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
