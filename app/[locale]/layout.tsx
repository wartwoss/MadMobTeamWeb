import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {ThemeProvider} from "../components/ThemeContext";
import {InlineScript} from "../components/InlineScript";
import StructuredData from "../components/StructuredData";
import Analytics from "../components/Analytics";
import {buildPageMetadata} from "@/app/lib/metadata";
import {organizationSchema, websiteSchema} from "@/app/lib/schema";
import {SITE_NAME, SITE_URL} from "@/app/lib/site";
import "../globals.css";

const bigShoulders = localFont({
  src: '../fonts/big-shoulders-latin.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
});

const spaceMono = localFont({
  src: [
    {
      path: '../fonts/space-mono-400-latin.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/space-mono-700-latin.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-space-mono',
  display: 'swap',
});

/* Arabic-script face. Playpen Sans Arabic is a playful, handwriting-style
   family that still stays highly legible, and it covers the Sorani Kurdish
   letters (ڕ ڵ ێ ۆ ە) that many Arabic fonts omit. It carries both headings
   and body copy for Arabic/Kurdish. */
const arabicSans = localFont({
  src: '../fonts/arabic-playpen.woff2',
  weight: '100 800',
  style: 'normal',
  variable: '--font-arabic',
  display: 'swap',
  preload: false,
});

/* ---- Modern-theme faces. Sora (display) + Inter (body) carry the Latin
   locales; Noto Sans Arabic covers Arabic and Sorani Kurdish — including
   ڕ ڵ ێ ۆ ە — with a clean, contemporary grotesque that matches the
   cyan/teal look. Not preloaded: they are only fetched once a visitor
   actually switches to the modern theme. ---- */
const sora = localFont({
  src: '../fonts/sora-latin.woff2',
  weight: '100 800',
  style: 'normal',
  variable: '--font-sora',
  display: 'swap',
  preload: false,
});

const inter = localFont({
  src: '../fonts/inter-latin.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-inter',
  display: 'swap',
  preload: false,
});

const notoArabic = localFont({
  src: '../fonts/noto-sans-arabic.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-noto-arabic',
  display: 'swap',
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#041419" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const home = await buildPageMetadata({
    locale,
    page: "home",
    route: "/",
    absoluteTitle: true,
  });

  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  return {
    ...home,
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    title: {
      default: t("home.title"),
      template: `%s | ${SITE_NAME}`,
    },
    description: t("home.description"),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    alternates: home.alternates,
    openGraph: home.openGraph,
    twitter: home.twitter,
    verification: {
      ...(googleVerification ? { google: googleVerification } : {}),
      ...(bingVerification
        ? { other: { "msvalidate.01": bingVerification } }
        : {}),
    },
    other: {
      "apple-mobile-web-app-title": SITE_NAME,
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  /* Opt every locale into static rendering. Without this, getMessages()
     makes the route dynamic and metadata is resolved per request. */
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({locale, namespace: "Meta"});
  const dir = locale === 'ar' || locale === 'ckb' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} data-theme="brutalistic" suppressHydrationWarning>
      <head>
        {/* Runs synchronously during HTML parsing — before the first paint —
            so a stored "modern" preference never flashes the brutalist tree.
            Same source of truth as ThemeProvider's lazy read. Rendered via
            InlineScript so React's client-side re-creates of <head> (Strict
            Mode remount, Fast Refresh) emit it as an inert data block and
            never warn about a client-rendered script. */}
        <InlineScript
          html={`(function(){try{var t=localStorage.getItem("mmt-theme");if(t==="modern"||t==="brutalistic"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`}
        />
        {/* No-JS fallback: the design system boots with animated overlays and
            opacity-0 reveal states. Without JavaScript those would hide the
            page forever, so disable the overlays and force revealed content
            for crawlers and no-script visitors. */}
        <noscript>
          <style>{`[data-page-loader],[data-theme-boot]{display:none!important}[style*="opacity:0"]{opacity:1!important}[style*="translateY"]{transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${bigShoulders.variable} ${spaceMono.variable} ${arabicSans.variable} ${sora.variable} ${inter.variable} ${notoArabic.variable} font-[family-name:var(--font-display)]`}>
        <StructuredData
          data={[organizationSchema(), websiteSchema(locale)]}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[500] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black focus:outline-2 focus:outline-offset-2 focus:outline-red-600"
        >
          {t("skip")}
        </a>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
