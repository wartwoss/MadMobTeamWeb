"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import PageFrame from "./PageFrame";
import Hero from "./Hero";

/* The team section sits below the fold; splitting it keeps the home page's
   initial client bundle focused on the hero. SSR stays enabled so the names
   and roles are still in the HTML for crawlers. */
const TeamSection = dynamic(() => import("./TeamSection"));

export default function HomeView() {
  const t = useTranslations("Home");

  return (
    <PageFrame title={t("title")}>
      <Hero />
      <TeamSection />
    </PageFrame>
  );
}
