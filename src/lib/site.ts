export const siteConfig = {
  name: "DawnWave",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dawnwave.com.tr").replace(/\/+$/, ""),
  logo: "/images/dawnwave/logo-mark.png",
  ogImage: { url: "/images/dawnwave/og-image.png", width: 1200, height: 630 },
  email: "contact@dawnwave.com",
  phone: "+905396712793",
  address: {
    streetAddress: "Muallimköy Mah, Deniz Cad. No:143/8, 1.1.C1 Blok Zemin Kat Kapı No: Z01",
    addressLocality: "Gebze",
    addressRegion: "Kocaeli",
    addressCountry: "TR",
  },
  twitter: "@dawnwavegames",
} as const;
