import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutView from "../../components/AboutView";
import StructuredData from "../../components/StructuredData";
import { buildPageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/app/lib/schema";

const FAQ_ITEMS = ["q1", "q2", "q3", "q4"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "about", route: "/about" });
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const tAbout = await getTranslations({ locale, namespace: "About" });
  const tHome = await getTranslations({ locale, namespace: "Home" });

  const faq = FAQ_ITEMS.map((item) => ({
    question: tAbout(`faq.items.${item}.q`),
    answer: tAbout(`faq.items.${item}.a`),
  }));

  return (
    <>
      <StructuredData
        data={[
          webPageSchema({
            locale,
            route: "/about",
            type: "AboutPage",
            name: tMeta("about.title"),
            description: tMeta("about.description"),
          }),
          breadcrumbSchema({
            locale,
            items: [
              { name: tHome("title"), route: "/" },
              { name: tAbout("title"), route: "/about" },
            ],
          }),
          faqSchema(faq),
        ]}
      />
      <AboutView />
    </>
  );
}
