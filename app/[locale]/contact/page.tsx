"use client";

import { useLocale, useTranslations } from 'next-intl';
import PageFrame from "../../components/PageFrame";
import ContactFunnel from "../../components/ContactFunnel";
import { RevealMotion, RevealUp } from "../../components/Reveal";

export default function Contact() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const skew = locale === "ar" || locale === "ckb" ? 6 : -6;

  return (
    <PageFrame title={t('title')}>
      <section className="border-b-4 border-black bg-neutral-100 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <h1 className="text-4xl font-black uppercase leading-none tracking-tighter sm:text-6xl lg:text-7xl">
              <span className="block overflow-hidden pb-1">
                <RevealMotion inline delay={0.15} from="90%">
                  {t('title')}
                </RevealMotion>
              </span>
              <span className="mt-3 block overflow-hidden py-1">
                <RevealMotion inline delay={0.35} from="110%">
                  <span
                    className="inline-block border-4 border-red-600 bg-red-600 px-4 py-1.5 text-lg text-white sm:px-6 sm:py-2 sm:text-2xl"
                    style={{ transform: `skewX(${skew}deg)` }}
                  >
                    <span className="inline-block" style={{ transform: `skewX(${-skew}deg)` }}>
                      {t('chip')}
                    </span>
                  </span>
                </RevealMotion>
              </span>
            </h1>

            <RevealUp
              delay={0.5}
              duration={0.6}
              className="max-w-sm pt-2 font-[family-name:var(--font-space-mono)] text-base leading-relaxed text-neutral-500 sm:text-lg lg:text-end"
            >
              {t('description')}
            </RevealUp>
          </div>
        </div>
      </section>

      <ContactFunnel />
    </PageFrame>
  );
}
