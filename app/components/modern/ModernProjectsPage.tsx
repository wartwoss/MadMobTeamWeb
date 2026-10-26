"use client";

import { useTranslations } from "next-intl";
import ModernPageFrame from "./ModernPageFrame";
import ModernProjects from "./ModernProjects";

/* Modern-theme projects page — same content as the vending machine,
   presented as a bento showcase with a sticky details panel. */
export default function ModernProjectsPage() {
  const t = useTranslations("Nav");

  return (
    <ModernPageFrame title={t("projects")}>
      <ModernProjects />
    </ModernPageFrame>
  );
}
