"use client";

import { useTranslations } from 'next-intl';
import PageFrame from "../../components/PageFrame";
import ContactFunnel from "../../components/ContactFunnel";

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <PageFrame title={t('title')}>
      <ContactFunnel />
    </PageFrame>
  );
}
