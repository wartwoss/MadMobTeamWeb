"use client";

import { useLocale, useTranslations } from "next-intl";
import PageFrame from "./PageFrame";
import { FadeIn } from "./Reveal";
import FaqSection from "./FaqSection";

const MONO = "font-[family-name:var(--font-space-mono)]";
const BODY = `${MONO} text-sm leading-relaxed text-neutral-600 sm:text-base`;
const SERVICES = ["software", "web", "community"] as const;

function SectionHeading({
  index,
  label,
  title,
  id,
}: {
  index: string;
  label: string;
  title: string;
  id: string;
}) {
  return (
    <div className="border-b-2 border-neutral-300 pb-3">
      <span
        className={`${MONO} block text-[0.625rem] font-bold uppercase tracking-[0.3em] text-neutral-500`}
      >
        <bdi dir="ltr">{index} /</bdi> {label}
      </span>
      <h2
        id={id}
        className="mt-2 text-2xl font-black uppercase leading-none tracking-tight text-neutral-900 sm:text-3xl"
      >
        {title}
      </h2>
    </div>
  );
}

export default function AboutView() {
  const t = useTranslations("About");
  const tNav = useTranslations("Nav");
  const locale = useLocale();
  const isArabicScript = locale === "ar" || locale === "ckb";
  const servicesGrid = isArabicScript
    ? "mt-8 grid gap-8 md:grid-cols-2 md:gap-6 xl:grid-cols-3 lg:gap-8"
    : "mt-8 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8";

  return (
    <PageFrame title={t("title")} loaderTitle={tNav("about")}>
      <article
        aria-labelledby="about-title"
        className="bg-neutral-100 text-neutral-900"
      >
        <FadeIn
          duration={1.2}
          className="mx-auto w-full max-w-4xl px-6 py-20 text-start sm:px-8 sm:py-28"
        >
          {/* Title */}
          <header>
            <span
              className={`${MONO} block text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-neutral-500`}
            >
              {t("studioProfile")}
            </span>

            <h1
              id="about-title"
              className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-tighter text-neutral-900 sm:text-6xl lg:text-7xl"
            >
              {t("title")}{" "}
              <span className="inline-block -skew-x-6 bg-red-600 px-2 text-neutral-50 sm:px-3">
                <bdi dir="ltr" className="inline-block skew-x-6">
                  MadMobTeam
                </bdi>
              </span>
            </h1>

            <p className="mt-8 max-w-2xl border-s-4 border-red-600 ps-5 text-2xl font-black uppercase leading-[1.02] tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              {t("headline")}
            </p>
          </header>

          {/* Intro */}
          <div className="mt-12 max-w-2xl space-y-5 sm:mt-14">
            <p className={BODY}>
              {t.rich("intro", {
                studio: (chunks) => (
                  <bdi dir="ltr" className="font-bold text-neutral-900">
                    {chunks}
                  </bdi>
                ),
              })}
            </p>
            <p className={BODY}>{t("introBody")}</p>
          </div>

          {/* Statement */}
          <p className="mt-10 max-w-3xl bg-neutral-200/70 p-5 text-lg font-black uppercase leading-tight tracking-tight text-neutral-900 sm:p-6 sm:text-xl">
            {t("statement")}
          </p>

          {/* What We Do */}
          <section
            aria-labelledby="about-services-title"
            className="mt-16 sm:mt-20"
          >
            <SectionHeading
              index="01"
              id="about-services-title"
              label={t("services.label")}
              title={t("services.title")}
            />

            <div className={servicesGrid}>
              {SERVICES.map((service) => (
                <div
                  key={service}
                  className="border-t-2 border-neutral-900 pt-4"
                >
                  <h3 className="text-lg font-black uppercase leading-tight tracking-tight text-neutral-900 lg:text-xl">
                    {t(`services.items.${service}.title`)}
                  </h3>
                  <p className={`mt-3 ${BODY}`}>
                    {service === "community"
                      ? t.rich("services.items.community.body", {
                          studio: (chunks) => (
                            <bdi dir="ltr" className="font-bold text-neutral-900">
                              {chunks}
                            </bdi>
                          ),
                        })
                      : t(`services.items.${service}.body`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-s-4 border-neutral-900 bg-neutral-200/60 px-5 py-4 sm:px-6 sm:py-5">
              <p className={BODY}>{t("approach.architecture")}</p>
              <p className={`mt-3 ${BODY}`}>
                {t.rich("approach.api", {
                  tech: (chunks) => <bdi dir="ltr">{chunks}</bdi>,
                })}
              </p>
              <p className={`mt-3 ${BODY}`}>
                {t.rich("approach.tools", {
                  tech: (chunks) => <bdi dir="ltr">{chunks}</bdi>,
                })}
              </p>
            </div>
          </section>

          {/* Our Vision */}
          <section aria-labelledby="about-vision-title" className="mt-16 sm:mt-20">
            <SectionHeading
              index="02"
              id="about-vision-title"
              label={t("vision.label")}
              title={t("vision.title")}
            />

            <div className="mt-8 max-w-2xl space-y-5">
              <p className={BODY}>{t("vision.paragraph1")}</p>
              <p className={BODY}>{t("vision.paragraph2")}</p>
            </div>
          </section>

          {/* FAQ */}
          <FaqSection />

          {/* CTA */}
          <section
            aria-labelledby="about-cta-title"
            className="mt-16 bg-neutral-900 p-6 text-neutral-100 sm:mt-20 sm:p-10"
          >
            <span
              className={`${MONO} text-[0.625rem] font-bold uppercase tracking-[0.3em] text-red-500`}
            >
              {t("cta.label")}
            </span>
            <h2
              id="about-cta-title"
              className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-neutral-50 sm:text-4xl lg:text-5xl"
            >
              {t("cta.title")}
            </h2>
            <p
              className={`mt-5 max-w-xl ${MONO} text-sm leading-relaxed text-neutral-300 sm:text-base`}
            >
              {t("cta.body")}
            </p>
            <p className="mt-8 text-xl font-black uppercase leading-tight tracking-tight text-neutral-100 sm:text-2xl">
              {t("cta.promiseStart")}{" "}
              <span className="bg-red-600 px-1 text-neutral-50">
                {t("cta.promiseHighlight")}
              </span>
            </p>
            <p
              className={`mt-4 ${MONO} text-sm leading-relaxed text-neutral-400 sm:text-base`}
            >
              {t("cta.closing")}
            </p>
          </section>
        </FadeIn>
      </article>
    </PageFrame>
  );
}
