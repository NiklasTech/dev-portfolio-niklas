import { useTranslation } from "../hooks/useTranslation";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function Journey() {
  const { t } = useTranslation();

  const entries = [
    {
      id: "nhwd",
      period: t("journey_nhwd_period"),
      title: t("journey_nhwd_title"),
      description: t("journey_nhwd_desc"),
    },
    {
      id: "ausbildung",
      period: t("journey_ausbildung_period"),
      title: t("journey_ausbildung_title"),
      description: t("journey_ausbildung_desc"),
    },
    {
      id: "fhr",
      period: t("journey_fhr_period"),
      title: t("journey_fhr_title"),
      description: t("journey_fhr_desc"),
    },
  ];

  return (
    <section id="journey" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader label={t("section_journey")} title={t("journey_title")} />
        </Reveal>

        <div>
          {entries.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 100}>
              <div className="grid md:grid-cols-[220px_1fr] gap-2 md:gap-12 border-t border-line py-10 last:border-b">
                <p className="font-display text-xl text-accent">{entry.period}</p>
                <div>
                  <h3 className="text-xl font-semibold text-ink mb-3">
                    {entry.title}
                  </h3>
                  <p className="text-muted leading-relaxed max-w-2xl">
                    {entry.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
