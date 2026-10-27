import type { Metadata } from "next";

import { routing, type Locale } from "@/i18n/routing";

export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  tr: "tr_TR",
};

export function localizedPath(locale: Locale, pathname = "") {
  return `/${locale}${pathname}`;
}

/** Canonical + hreflang links for a page that exists in every locale. */
export function getAlternates(locale: Locale, pathname = ""): Metadata["alternates"] {
  return {
    canonical: localizedPath(locale, pathname),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, localizedPath(l, pathname)])),
      "x-default": localizedPath(routing.defaultLocale, pathname),
    },
  };
}

/** Serialises JSON-LD safely for use inside a <script> tag. */
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
