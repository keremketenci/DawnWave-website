import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

// Paths (without locale prefix) of every localized page.
const pages = [""];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((pathname) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}${localizedPath(locale, pathname)}`,
      changeFrequency: "monthly" as const,
      priority: pathname === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${siteConfig.url}${localizedPath(l, pathname)}`]),
        ),
      },
    })),
  );
}
