import { useTranslation } from "../hooks/useTranslation";
import { Reveal } from "./Reveal";

export function NhWebDevBand() {
  const { t } = useTranslation();

  return (
    <section aria-label="NH-WebDev" className="border-y border-line">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-ink font-medium">{t("nhwd_text")}</p>
            <p className="text-sm text-muted">{t("nhwd_services")}</p>
            <a
              href="https://nh-webdev.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
            >
              {t("nhwd_link")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
