const icons = {
  instagram: "/icons/socials/instagram.svg",
  github: "/icons/socials/github.svg",
  linkedin: "/icons/socials/linkedin.svg",
  patreon: "/icons/socials/patreon.svg",
  itchio: "/icons/socials/itchio.svg",
  discord: "/icons/socials/discord.svg",
  youtube: "/icons/socials/youtube.svg",
  x: "/icons/socials/x.svg",
  faceit: "/icons/socials/faceit.svg",
  steam: "/icons/socials/steam.svg",
  tr: "/icons/languages/tr.svg",
  en: "/icons/languages/en.svg",
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
  /** Leave empty for decorative icons (the parent should carry the label). */
  alt?: string;
}

export function Icon({ name, className, alt = "" }: IconProps) {
  return (
    // Small static SVGs: next/image would not optimise them anyway.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={icons[name]} alt={alt} className={className} decoding="async" />
  );
}
