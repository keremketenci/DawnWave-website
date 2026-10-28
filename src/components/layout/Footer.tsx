// next
import Image from "next/image";

// translations
import { getLocale, getTranslations } from "next-intl/server";

// data
import { navSections } from "@/data/navigation";
import { studioSocials, supportLinks } from "@/data/socials";

// components
import { LabelAsync } from "@/components/effects/LabelAsync";
import { CurrentYear } from "@/components/layout/CurrentYear";

// components ui
import { ButtonSocials } from "@/components/ui/button/ButtonSocials";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/shadcn/navigation-menu";
import { Separator } from "@/components/ui/shadcn/separator";

// hooks & utils
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("Footer");
  const locale = await getLocale();

  // Turkish puts the name before the verb ("DawnWave Tarafından Tasarlandı").
  const credits =
    locale === "tr"
      ? {
          text1: t("studio"),
          text1Class: "text-accent",
          text3: t("designBy"),
          text3Class: "text-champagne",
          text2: "Kerem Ketenci",
          text2Class: "text-accent",
          text4: t("developedBy"),
          text4Class: "text-champagne",
        }
      : {
          text1: t("designBy"),
          text1Class: "text-champagne",
          text3: t("studio"),
          text3Class: "text-accent",
          text2: t("developedBy"),
          text2Class: "text-champagne",
          text4: "Kerem Ketenci",
          text4Class: "text-accent",
        };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Image
          src={siteConfig.logoSvg}
          unoptimized
          alt={siteConfig.name}
          width={siteConfig.logoSize}
          height={siteConfig.logoSize}
          sizes="144px"
          className="w-36 h-auto lg:mb-0"
        />
        <div>
          <NavigationMenu>
            <NavigationMenuList className="grid grid-cols-2 lg:grid-cols-1 lg:mt-4 lg:flex text-center items-center gap-x-8 lg:gap-x-0 lg:space-x-8">
              {navSections.map((section) => (
                <NavigationMenuItem className="cursor-pointer" key={section.id}>
                  <NavigationMenuLink
                    href={`#${section.id}`}
                    className={`hover:text-white hover:bg-transparent hover:text-accent text-xl ${navigationMenuTriggerStyle()}`}
                  >
                    {t(`Link.${section.key}`)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col-reverse mt-8 lg:mt-0 lg:flex-row justify-between items-center text-white">
        <div className="text-lg py-8 text-center">
          <div>
            {` ${t("Copyright.copyright")} @ `}
            <CurrentYear fallback={new Date().getFullYear()} />{" "}
            <a
              href={t("Domain.link")}
              className="text-xl text-highlight"
            >{`${t("Domain.text")} `}</a>
            {` ${t("Copyright.allRightsReserved")}. `}
            <div className="flex flex-row justify-center mt-2">
              <LabelAsync {...credits} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mb-0 lg:mb-2 gap-2.5 items-center">
          {[...studioSocials, ...supportLinks].map((social) => (
            <ButtonSocials
              key={social.icon}
              href={social.href}
              label={social.label}
              icon={social.icon}
              iconClass={social.iconClass}
              isActive={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
