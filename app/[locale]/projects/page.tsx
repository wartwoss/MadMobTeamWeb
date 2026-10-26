import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectsView from "../../components/ProjectsView";
import StructuredData from "../../components/StructuredData";
import { buildPageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/app/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "projects", route: "/projects" });
}

export default async function Projects({
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
            route: "/projects",
            type: "CollectionPage",
            name: tMeta("projects.title"),
            description: tMeta("projects.description"),
          }),
          breadcrumbSchema({
            locale,
            items: [
              { name: tHome("title"), route: "/" },
              { name: tNav("projects"), route: "/projects" },
            ],
          }),
        ]}
      />
      <ProjectsView />
    </>
  );
}
