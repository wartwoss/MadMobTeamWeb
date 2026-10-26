"use client";

import { useTranslations } from "next-intl";
import ModernPageFrame from "./ModernPageFrame";
import ModernContact from "./ModernContact";

/* Modern-theme contact page — glass channel cards + brand-tinted bubbles. */
export default function ModernContactPage() {
  const t = useTranslations("Contact");

  return (
    <ModernPageFrame title={t("title")}>
      <ModernContact />
    </ModernPageFrame>
  );
}
