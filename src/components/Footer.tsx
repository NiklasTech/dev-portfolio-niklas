import { useTranslation } from "../hooks/useTranslation";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">{t("footer_text")}</p>
        <SocialLinks />
      </div>
    </footer>
  );
}
