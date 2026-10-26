import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  DEFAULT_LOCALE,
  LOCALES,
  OG_LOCALE,
  SITE_NAME,
  absoluteUrl,
  languageAlternates,
  localePath,
  type SiteLocale,
} from "./site";

export type MetaPage = "home" | "about" | "projects" | "contact";

type PageMetadataArgs = {
  locale: string;
  page: MetaPage;
  route: "/" | "/about" | "/projects" | "/contact";
  /* Home controls its full title so the brand is not repeated by the
     "%s | MadMobTeam" template. */
  absoluteTitle?: boolean;
};

const toLocale = (locale: string): SiteLocale =>
  (LOCALES as readonly string[]).includes(locale)
    ? (locale as SiteLocale)
    : DEFAULT_LOCALE;

function ogLocales(locale: SiteLocale) {
  return LOCALES.filter((item) => item !== locale).map((item) => OG_LOCALE[item]);
}

/* Builds canonical + hreflang + Open Graph + Twitter metadata for one page.
   Every page uses this so titles, descriptions and language alternates can
   never drift apart. */
export async function buildPageMetadata({
  locale,
  page,
  route,
  absoluteTitle = false,
}: PageMetadataArgs): Promise<Metadata> {
  const safeLocale = toLocale(locale);
  const t = await getTranslations({ locale: safeLocale, namespace: "Meta" });

  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const keywords = t(`${page}.keywords`)
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const canonical = absoluteUrl(localePath(safeLocale, route));
  const ogImage = {
    url: absoluteUrl("/opengraph-image"),
    width: 1200,
    height: 630,
    alt: title,
    type: "image/png",
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: languageAlternates(route),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: canonical,
      locale: OG_LOCALE[safeLocale],
      alternateLocale: ogLocales(safeLocale),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
