/* Single source of truth for everything search engines and share cards need:
   canonical origin, brand name, contact details, social profiles and the
   locale/route matrix. Keep this file free of React so it can be imported by
   server routes (sitemap, robots, JSON-LD) and client components alike. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://madmobteam.com"
).replace(/\/+$/, "");

export const SITE_NAME = "MadMobTeam";
export const SITE_LEGAL_NAME = "MadMobTeam";

export const CONTACT_EMAIL = "madmobteam@gmail.com";
export const CONTACT_PHONE = "+9647704056209";
export const CONTACT_PHONE_HREF = CONTACT_PHONE.replace(/[^+\d]/g, "");

export const BUSINESS = {
  locality: "Sulaymaniyah",
  region: "Kurdistan Region",
  country: "IQ",
  countryName: "Iraq",
  areaServed: ["Sulaymaniyah", "Kurdistan Region", "Iraq"],
  foundingYear: "2025",
} as const;

export const SOCIAL_LINKS = [
  { name: "WhatsApp", href: "https://wa.me/9647704056209" },
  { name: "Instagram", href: "https://www.instagram.com/madmobteam" },
  { name: "Telegram", href: "https://t.me/madmobteam" },
  { name: "TikTok", href: "https://www.tiktok.com/@madmobteam" },
] as const;

export const LOCALES = ["en", "ar", "ckb"] as const;
export type SiteLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: SiteLocale = "en";

/* Open Graph uses language_TERRITORY while <html lang> / hreflang use the
   plain ISO codes. */
export const OG_LOCALE: Record<SiteLocale, string> = {
  en: "en_US",
  ar: "ar_IQ",
  ckb: "ckb_IQ",
};

export const PAGE_ROUTES = ["/", "/projects", "/about", "/contact"] as const;
export type PageRoute = (typeof PAGE_ROUTES)[number];

export const PAGE_PRIORITY: Record<PageRoute, number> = {
  "/": 1,
  "/projects": 0.9,
  "/about": 0.8,
  "/contact": 0.9,
};

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/* "/en", "/en/about", ... — next-intl is configured with localePrefix
   "always", so the locale segment is never omitted. */
export function localePath(locale: string, route: PageRoute | string): string {
  const suffix = route === "/" ? "" : route.startsWith("/") ? route : `/${route}`;
  return `/${locale}${suffix}`;
}

/* Full hreflang map used by both page metadata and the sitemap. */
export function languageAlternates(
  route: PageRoute | string,
): Record<string, string> {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, absoluteUrl(localePath(locale, route))]),
  );
  languages["x-default"] = absoluteUrl(localePath(DEFAULT_LOCALE, route));
  return languages;
}
