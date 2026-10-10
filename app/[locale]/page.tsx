"use client";

import {useTranslations} from 'next-intl';
import PageFrame from "../components/PageFrame";
import Hero from "../components/Hero";
import TeamSection from "../components/TeamSection";

export default function Home() {
  const t = useTranslations('Home');

  return (
    <PageFrame title={t('title')}>
      <Hero />
      <TeamSection />
    </PageFrame>
  );
}