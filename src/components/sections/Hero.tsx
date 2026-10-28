// next
import Image from "next/image";

// translations
import { getTranslations } from "next-intl/server";

// data
import { communityLinks, supportLinks, type SocialLink } from "@/data/socials";

// components ui
import { ButtonSocials } from "@/components/ui/button/ButtonSocials";

// hooks & utils
import { siteConfig } from "@/lib/site";

function renderLinks(links: SocialLink[]) {
  return links.map((link) => (
    <ButtonSocials
      key={link.icon}
      href={link.href}
      label={link.label}
      icon={link.icon}
      iconClass={link.iconClass}
      isActive={true}
    />
  ));
}

export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12">
      {/* Text Section */}
      <div className="flex flex-col w-full lg:w-2/3 lg:pr-8 items-center lg:items-start text-center lg:text-left">
        <h1 className="text-4xl font-bold text-accent pb-6">{`${t("title")}!`}</h1>
        <p className="text-lg text-gray-300 pb-6">{`${t("about")}.`}</p>
        <p className="text-highlight font-bold whitespace-nowrap">{t("Donate.title")}</p>
        <p className="text-gray-300">{`${t("Donate.text")}.`}</p>

        {/* Support platforms | community profiles */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start py-4 gap-2">
          {renderLinks(supportLinks)}
          <span aria-hidden="true" className="mx-2 h-8 w-px bg-slate-700" />
          {renderLinks(communityLinks)}
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center w-full lg:w-1/3 lg:mb-12">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          {/* Warm gold/amber glow behind the logo, slightly larger so it shows around the badge */}
          <div
            aria-hidden="true"
            className="absolute -inset-[6%] rounded-full blur-2xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, #e5bc45 0%, #f29a38 45%, rgba(160, 82, 20, 0.6) 65%, transparent 72%)",
            }}
          />
          <Image
            src={siteConfig.logoSvg}
            unoptimized
            alt={siteConfig.name}
            width={siteConfig.logoSize}
            height={siteConfig.logoSize}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 448px, (min-width: 640px) 384px, 320px"
            preload
            className="relative w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
