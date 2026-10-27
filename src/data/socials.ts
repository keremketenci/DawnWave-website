import type { IconName } from "@/components/ui/Icon";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
  iconClass: string;
}

export const studioSocials: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/dawnwavegames/",
    icon: "instagram",
    iconClass: "w-8",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/dawnwave-games/",
    icon: "linkedin",
    iconClass: "w-6",
  },
  {
    label: "Discord",
    href: "https://discord.com/invite/W3Bn8AkWg3",
    icon: "discord",
    iconClass: "w-8",
  },
  {
    label: "GitHub",
    href: "https://github.com/DawnWave-Studio",
    icon: "github",
    iconClass: "w-8",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCPafZ1CJUTh_ycPAseFqKxg",
    icon: "youtube",
    iconClass: "w-8",
  },
  {
    label: "X",
    href: "https://x.com/dawnwavegames",
    icon: "x",
    iconClass: "w-8",
  },
];

export const supportLinks: SocialLink[] = [
  {
    label: "Patreon",
    href: "https://www.patreon.com/dawnwave",
    icon: "patreon",
    iconClass: "w-8",
  },
  {
    label: "itch.io",
    href: "https://dawnwave.itch.io/wishes-of-dawn",
    icon: "itchio",
    iconClass: "w-8",
  },
];

export const linkedInCompanyUrl = "https://www.linkedin.com/company/dawnwave-games/";
