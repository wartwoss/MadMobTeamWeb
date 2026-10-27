"use client";

import { useTranslations } from "next-intl";
import PageFrame from "./PageFrame";
import VendingMachine from "./VendingMachine";

export default function ProjectsView() {
  const t = useTranslations("Nav");

  return (
    <PageFrame title={t("projects")}>
      <VendingMachine />
    </PageFrame>
  );
}
