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
import { Section, sectionPadding } from "@/components/layout/Section";
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

      {/* Home */}
      <Section id="Home" fullHeightOnMobile className={sectionPadding}>
        <Hero />
      </Section>

      {/* Team */}
      <Section id="Team" className="px-4 sm:px-8 lg:px-12">
        <Team />
      </Section>

      {/* Photo gallery (hidden until photos are added in src/data/media.ts) */}
      {galleryPhotos.length > 0 && (
        <Section id="Gallery">
          <div className="w-full" {...reveal()}>
            <CarouselImage images={galleryPhotos} alt="DawnWave photo" />
          </div>
        </Section>
      )}

      {/* YouTube videos */}
      <Section id="Videos">
        <div className="w-full" {...reveal()}>
          <CarouselYouTube videos={youTubeVideos} playLabel={tVideos("play")} />
        </div>
      </Section>

      {/* Contact */}
      <Section id="Contact" className={sectionPadding}>
        <Contact />
      </Section>

      {/* Subscribe + footer share the last screen: newsletter centred, footer at the bottom */}
      <section id="Subscribe" className="flex flex-col md:min-h-svh pt-24 md:pt-18">
        <div
          {...reveal()}
          className={`flex flex-1 flex-col justify-center py-12 ${sectionPadding}`}
        >
          <Subscribe />
        </div>
        <footer {...reveal()} className={`pb-12 ${sectionPadding}`} id="Footer">
          <Footer />
        </footer>
      </section>
    </div>
  );
}
