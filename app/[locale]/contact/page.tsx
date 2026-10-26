import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactView from "../../components/ContactView";
import StructuredData from "../../components/StructuredData";
import { buildPageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/app/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "contact", route: "/contact" });
}

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tHome = await getTranslations({ locale, namespace: "Home" });

  return (
    <>
      <StructuredData
        data={[
          webPageSchema({
            locale,
            route: "/contact",
            type: "ContactPage",
            name: tMeta("contact.title"),
            description: tMeta("contact.description"),
          }),
          breadcrumbSchema({
            locale,
            items: [
              { name: tHome("title"), route: "/" },
              { name: tNav("contact"), route: "/contact" },
            ],
          }),
        ]}
      />
      <ContactView />
    </>
  );
}
