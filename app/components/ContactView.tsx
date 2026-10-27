"use client";

import { useTranslations } from "next-intl";
import PageFrame from "./PageFrame";
import ContactFunnel from "./ContactFunnel";

export default function ContactView() {
  const t = useTranslations("Contact");

  return (
    <PageFrame title={t("title")}>
      <ContactFunnel />
    </PageFrame>
  );
}
