import type { MetadataRoute } from "next";
import {
  LOCALES,
  PAGE_PRIORITY,
  PAGE_ROUTES,
  absoluteUrl,
  languageAlternates,
  localePath,
} from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGE_ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(localePath(locale, route)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: PAGE_PRIORITY[route],
      alternates: {
        languages: languageAlternates(route),
      },
    })),
  );
}
