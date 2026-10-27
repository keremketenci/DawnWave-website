// next
import Image from "next/image";

// translations
import { getTranslations } from "next-intl/server";

// data
import { supportLinks } from "@/data/socials";

// components ui
import { ButtonSocials } from "@/components/ui/button/ButtonSocials";

// hooks & utils
import { siteConfig } from "@/lib/site";

export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-screen">
      {/* Text Section */}
      <div className="flex flex-col w-full lg:w-2/3 lg:pr-8 items-center lg:items-start text-center lg:text-left">
        <h1 className="text-4xl font-bold text-accent pb-6">{`${t("title")}!`}</h1>
        <p className="text-lg text-gray-300 pb-6">{`${t("about")}.`}</p>
        <p className="text-highlight font-bold whitespace-nowrap">{t("Donate.title")}</p>
        <p className="text-gray-300">{`${t("Donate.text")}.`}</p>

        <div className="flex justify-center lg:justify-start py-4 gap-2">
          {supportLinks.map((link) => (
            <ButtonSocials
              key={link.icon}
              href={link.href}
              label={link.label}
              icon={link.icon}
              iconClass={link.iconClass}
              isActive={true}
            />
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center w-full lg:w-1/3 lg:mb-12">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={1000}
            height={1000}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 448px, (min-width: 640px) 384px, 320px"
            preload
            className="w-full h-auto"
          />
          <div
            className="absolute inset-0 bg-transparent rounded-full blur-xl opacity-10 z-0"
            style={{
              background: "radial-gradient(circle at center, #00ffff, #ff00ff, #ff6600)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
