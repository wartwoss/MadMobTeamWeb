"use client";

import { useTranslations } from "next-intl";
import PageFrame from "./PageFrame";
import ContactFunnel from "./ContactFunnel";
import { useTheme } from "./ThemeContext";
import ModernContactPage from "./modern/ModernContactPage";

export default function ContactView() {
  const t = useTranslations("Contact");
  const { theme } = useTheme();

  if (theme === "modern") {
    return <ModernContactPage />;
  }

  return (
    <PageFrame title={t("title")}>
      <ContactFunnel />
    </PageFrame>
  );
}
