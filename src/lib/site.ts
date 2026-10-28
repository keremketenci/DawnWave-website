import { xHandle } from "@/data/socials";

export const siteConfig = {
  name: "DawnWave",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dawnwave.com.tr").replace(/\/+$/, ""),
  logo: "/images/brand/logo.png",
  logoSize: 1254,
  ogImage: { url: "/images/brand/og-image.png", width: 1200, height: 630 },
  email: "contact@dawnwave.com",
  phone: "+905396712793",
  address: {
    streetAddress: "Muallimköy Mah, Deniz Cad. No:143/8, 1.1.C1 Blok Zemin Kat Kapı No: Z01",
    addressLocality: "Gebze",
    addressRegion: "Kocaeli",
    addressCountry: "TR",
  },
  twitter: `@${xHandle}`,
} as const;
