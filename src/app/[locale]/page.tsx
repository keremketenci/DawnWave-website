// next
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// translations
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

// schema.org
import type { Organization, WebSite, WithContext } from "schema-dts";

// i18n
import { routing } from "@/i18n/routing";

// data
import { galleryPhotos, youTubeVideos } from "@/data/media";
import { studioSocials, supportLinks } from "@/data/socials";

// components
import { reveal } from "@/components/effects/reveal";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact/Contact";
import { Hero } from "@/components/sections/Hero";
import { Subscribe } from "@/components/sections/Subscribe/Subscribe";
import { Team } from "@/components/sections/Team/Team";

// components ui
import { CarouselImage } from "@/components/ui/carousel/CarouselImage";
import { CarouselYouTube } from "@/components/ui/carousel/CarouselYouTube";

// hooks & utils
import { getAlternates, localizedPath, openGraphLocales, serializeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates(locale),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      url: localizedPath(locale),
      locale: openGraphLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => openGraphLocales[l]),
      images: [{ ...siteConfig.ogImage, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      title: t("title"),
      description: t("description"),
      images: [siteConfig.ogImage.url],
    },
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("Metadata");
  const tVideos = await getTranslations("Videos");

  const organization: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: t("description"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: { "@type": "PostalAddress", ...siteConfig.address },
    // Only real profile URLs (skips placeholder links that point to a site root).
    sameAs: [...new Set([...studioSocials, ...supportLinks].map((social) => social.href))].filter(
      (href) => new URL(href).pathname !== "/",
    ),
  };

  const website: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${siteConfig.url}${localizedPath(locale)}`,
    inLanguage: locale,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd([organization, website]) }}
      />

      {/* Home Section */}
      <section
        className="py-24 xs:py-16 sm:py-12 md:py-20 lg:py-0 px-4 sm:px-16 md:px-24 xl:px-32 2xl:px-48"
        id="Home"
      >
        <Hero />
      </section>

      <div className="mt-0 2xl:mt-32"></div>

      {/* Team Section */}
      <section className="py-20 md:py-20 2xl:py-16 px-4 sm:px-8 lg:px-12" id="Team">
        <Team />
      </section>

      <div className="mt-24"></div>

      {/* Photo Gallery Section (hidden until photos are added in src/data/media.ts) */}
      {galleryPhotos.length > 0 && (
        <>
          <section id="TeamPhotos">
            <div className="w-full" {...reveal()}>
              <CarouselImage images={galleryPhotos} alt="DawnWave photo" />
            </div>
          </section>

          <div className="mt-48"></div>
        </>
      )}

      {/* YouTube Video Section */}
      <section id="CarouselVideos">
        <div className="w-full h-full" {...reveal()}>
          <CarouselYouTube videos={youTubeVideos} playLabel={tVideos("play")} />
        </div>
      </section>

      <div className="mt-32"></div>

      {/* Contact Section */}
      <section
        className="py-16 2xs:py-20 md:py-16 px-4 sm:px-16 md:px-24 xl:px-32 2xl:px-48"
        id="Contact"
      >
        <Contact />
      </section>

      <div className="mt-16"></div>

      {/* Subscribe Section */}
      <section id="Subscribe">
        <div
          {...reveal()}
          className="flex flex-col justify-center px-4 sm:px-16 md:px-24 xl:px-32 2xl:px-48"
        >
          <Subscribe />
        </div>
      </section>

      <div className="mt-32"></div>

      {/* Footer Section */}
      <footer {...reveal()} className="px-4 sm:px-16 md:px-24 xl:px-32 2xl:px-48" id="Footer">
        <Footer />
      </footer>

      <div className="pt-12"></div>
    </div>
  );
}
