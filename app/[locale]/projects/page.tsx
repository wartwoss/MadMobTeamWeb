"use client";

import { useTranslations } from "next-intl";
import PageFrame from "../../components/PageFrame";
import VendingMachine from "../../components/VendingMachine";

export default function Projects() {
  const t = useTranslations("Nav");

  return (
    <PageFrame title={t("projects")}>
      <VendingMachine />
    </PageFrame>
  );
}
