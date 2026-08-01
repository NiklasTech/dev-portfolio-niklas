import { useTranslation } from "../hooks/useTranslation";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";

const EMAIL = "haeussler.business@gmail.com";

export function Contact() {
  const { t } = useTranslation();

  const infoItems = [
    { label: t("contact_email_label"), value: EMAIL, href: `mailto:${EMAIL}` },
    { label: t("contact_location_label"), value: t("contact_location_value") },
    {
      label: t("contact_availability_label"),
      value: t("contact_availability_value"),
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader label={t("section_contact")} title={t("contact_title")} />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16">
          <Reveal>
            <p className="text-lg text-muted max-w-md mb-10">
              {t("contact_intro")}
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-block font-display text-2xl md:text-3xl text-ink underline underline-offset-8 decoration-line hover:decoration-accent hover:text-accent transition-colors break-all"
            >
              {EMAIL}
            </a>
            <div className="mt-10">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-block bg-ink text-paper px-8 py-3 text-sm font-medium hover:bg-accent transition-colors"
              >
                {t("contact_email_cta")}
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
              {t("contact_info_title")}
            </h3>
            <dl className="mb-12">
              {infoItems.map((item) => (
                <div key={item.label} className="border-t border-line py-5">
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted mb-2">
                    {item.label}
                  </dt>
                  <dd className="text-ink break-all">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-accent transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="text-xs uppercase tracking-[0.2em] text-muted mb-4 border-t border-line pt-5">
              {t("contact_social_title")}
            </h3>
            <SocialLinks />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
