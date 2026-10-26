"use client";

import { useTranslations } from "next-intl";
import ModernPageFrame from "./ModernPageFrame";
import ModernAbout from "./ModernAbout";

/* Modern-theme about page — sticky identity column + glass section cards. */
export default function ModernAboutPage() {
  const t = useTranslations("About");
  const tNav = useTranslations("Nav");

  return (
    <ModernPageFrame title={t("title")} loaderTitle={tNav("about")}>
      <ModernAbout />
    </ModernPageFrame>
  );
}
