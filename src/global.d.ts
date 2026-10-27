import type { Locale } from "@/i18n/routing";
import type messages from "../messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}

declare global {
  interface Window {
    /** Set by <ScrollReveal> once the observer is running. */
    __revealBooted?: boolean;
  }
}
