"use client";

import { useTranslations } from "next-intl";
import PageFrame from "./PageFrame";
import VendingMachine from "./VendingMachine";
import { useTheme } from "./ThemeContext";
import ModernProjectsPage from "./modern/ModernProjectsPage";

export default function ProjectsView() {
  const t = useTranslations("Nav");
  const { theme } = useTheme();

  if (theme === "modern") {
    return <ModernProjectsPage />;
  }

  return (
    <PageFrame title={t("projects")}>
      <VendingMachine />
    </PageFrame>
  );
}
