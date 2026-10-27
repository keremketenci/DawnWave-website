import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "tr"],

  // Used when no locale matches
  defaultLocale: "en",

  // hreflang links are rendered in the page <head> (see src/lib/seo.ts), so the
  // middleware does not need to add them as a Link header.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
