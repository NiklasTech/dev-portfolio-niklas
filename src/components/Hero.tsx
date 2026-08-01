import ProfilePic from "../assets/Profile-Pic.jpeg";
import { useTranslation } from "../hooks/useTranslation";
import { SocialLinks } from "./SocialLinks";
import { Reveal } from "./Reveal";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-accent mb-6">
                {t("hero_role")}
              </p>
              <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-ink mb-8">
                Niklas Häußler
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-xl mb-10">
                {t("hero_intro")}
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#projects"
                  className="bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
                >
                  {t("hero_cta_projects")}
                </a>
                <a
                  href="#contact"
                  className="border border-ink text-ink px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                >
                  {t("hero_cta_contact")}
                </a>
              </div>
              <SocialLinks />
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={150}>
              <div className="relative max-w-sm mx-auto md:ml-auto">
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-accent" />
                <img
                  src={ProfilePic}
                  alt="Niklas Häußler"
                  className="relative w-full aspect-[4/5] object-cover border border-line"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
