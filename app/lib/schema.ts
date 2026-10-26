import {
  BUSINESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  absoluteUrl,
  localePath,
  type PageRoute,
} from "./site";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    alternateName: ["Mad Mob Team", "MMT"],
    url: SITE_URL,
    logo: absoluteUrl("/apple-icon"),
    image: absoluteUrl("/opengraph-image"),
    description:
      "MadMobTeam is a web and software development studio in Sulaymaniyah, Iraq, building websites, web applications, mobile apps and custom business systems.",
    slogan: "We build digital solutions.",
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    foundingDate: BUSINESS.foundingYear,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    areaServed: BUSINESS.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      availableLanguage: ["en", "ar", "ckb"],
    },
    knowsAbout: [
      "Web development",
      "Software development",
      "Web applications",
      "Mobile applications",
      "Custom business systems",
      "UI and UX design",
      "Community platforms",
      "React",
      "Next.js",
      "Laravel",
      "NestJS",
      "Flutter",
    ],
    sameAs: SOCIAL_LINKS.map((social) => social.href),
  };
}

export function websiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: locale,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

type WebPageType = "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";

export function webPageSchema({
  locale,
  route,
  type,
  name,
  description,
}: {
  locale: string;
  route: PageRoute;
  type: WebPageType;
  name: string;
  description: string;
}) {
  const url = absoluteUrl(localePath(locale, route));

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };
}

export function breadcrumbSchema({
  locale,
  items,
}: {
  locale: string;
  items: { name: string; route: string }[];
}) {
  const pageUrl = absoluteUrl(localePath(locale, items[items.length - 1]?.route ?? "/"));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.route)),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
