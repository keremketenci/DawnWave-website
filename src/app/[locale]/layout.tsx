// styles
import "../globals.css";

// next
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// fonts
import { Inter } from "next/font/google";

// translations
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

// i18n
import { routing } from "@/i18n/routing";

// components
import { BackgroundPattern } from "@/components/effects/BackgroundPattern";
import { scrollRevealScript } from "@/components/effects/reveal";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Navbar } from "@/components/layout/Navbar";

// components ui
import { Toaster } from "@/components/ui/shadcn/sonner";

// hooks & utils
import { siteConfig } from "@/lib/site";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

// Only these namespaces are needed by client components.
const CLIENT_NAMESPACES = ["Navbar", "Contact", "Subscribe", "Toast", "Validation"] as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, messages[ns]]));

  return (
    // suppressHydrationWarning: the inline script adds a class to <html> before hydration.
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scrollRevealScript }} />
      </head>
      <body className={`${inter.className} relative bg-background text-white`}>
        <NextIntlClientProvider messages={clientMessages}>
          <header className="fixed top-0 left-0 w-full shadow-md z-10">
            <Navbar className="bg-black text-white flex w-screen p-4 px-4 md:px-24 lg:px-48" />
          </header>
          <div className="relative">
            {/* Background pattern */}
            <BackgroundPattern />
            {/* Main content */}
            <main className="relative z-0">
              {children}
              <Toaster className="dark" />
              <ScrollReveal />
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
