"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import ModernPageFrame from "./ModernPageFrame";
import ModernHero from "./ModernHero";

/* Below-the-fold crew section — code-split, still SSR'd so the names are in
   the HTML for search engines. */
const ModernTeam = dynamic(() => import("./ModernTeam"));

/* Modern-theme home page: same content tree as the brutalist home
   (hero + team), entirely different presentation. */
export default function ModernHome() {
  const t = useTranslations("Home");

  return (
    <ModernPageFrame title={t("title")}>
      <ModernHero />
      <ModernTeam />
    </ModernPageFrame>
  );
}
