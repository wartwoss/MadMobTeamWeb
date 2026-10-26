"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CpuChipIcon,
  GlobeAltIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { EASE, VIEWPORT_ONCE } from "./motion";
import FaqSection from "../FaqSection";

const SERVICES = [
  { key: "software", Icon: CpuChipIcon },
  { key: "web", Icon: GlobeAltIcon },
  { key: "community", Icon: UsersIcon },
] as const;

const CARD =
  "rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/25";

function SectionHeader({
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
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.7, ease: EASE }}
      className="mb-6 flex items-center gap-4"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-cyan-300/25 bg-cyan-400/10 font-modern-display text-sm font-extrabold text-cyan-200">
        {index}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-cyan-50/45">
          {label}
        </span>
        <h2
          id={id}
          className="font-modern-display mt-0.5 truncate text-xl font-bold text-white sm:text-2xl"
        >
          {title}
        </h2>
      </span>
      <span className="h-px flex-1 bg-gradient-to-e from-cyan-300/35 to-transparent" />
    </motion.div>
  );
}

export default function ModernAbout() {
  const t = useTranslations("About");
  const tNav = useTranslations("Nav");
  const reduce = useReducedMotion();

  const rise = {
    initial: { opacity: 0, y: reduce ? 0 : 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_ONCE,
    transition: { duration: 0.75, ease: EASE },
  } as const;

  return (
    <article
      aria-labelledby="about-title"
      className="relative px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:pb-28"
    >
      <div className="mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[21rem_1fr] lg:gap-16">
        {/* sticky identity column */}
        <motion.aside
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.35, ease: EASE }}
          className="lg:sticky lg:top-28"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-cyan-200/85 backdrop-blur-md">
            <span className="modern-pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-300" />
            {t("studioProfile")}
          </span>

          <h1
            id="about-title"
            className="font-modern-display mt-6 text-5xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-6xl"
          >
            {t("title")}
            <span className="modern-gradient-text mt-2 block">
              <bdi dir="ltr">MadMobTeam</bdi>
            </span>
          </h1>

          <p className="mt-7 border-s-2 border-cyan-300/50 ps-5 text-lg font-medium leading-snug text-cyan-50/80">
            {t("headline")}
          </p>

          <Link href="/contact" className="group mt-9 inline-block">
            <motion.span
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="modern-shine flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-300 to-teal-400 px-6 py-3 font-modern-display text-sm font-bold text-[#04212b] shadow-[0_10px_32px_rgba(34,211,238,0.3)]"
            >
              {tNav("contact")}
              <ArrowRightIcon className="h-4 w-4 rtl:-scale-x-100" />
            </motion.span>
          </Link>
        </motion.aside>

        {/* scrolling content column */}
        <div className="flex min-w-0 flex-col gap-14">
          {/* intro */}
          <motion.section
            {...rise}
            aria-label={t("studioProfile")}
            className={`${CARD} p-7 sm:p-9`}
          >
            <p className="text-[0.9375rem] leading-relaxed text-cyan-50/70 sm:text-base">
              {t.rich("intro", {
                studio: (chunks) => (
                  <bdi dir="ltr" className="modern-gradient-text font-bold">
                    {chunks}
                  </bdi>
                ),
              })}
            </p>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-cyan-50/55 sm:text-base">
              {t("introBody")}
            </p>
          </motion.section>

          {/* statement */}
          <motion.blockquote
            {...rise}
            className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/[0.12] via-teal-400/[0.06] to-transparent p-7 sm:p-9"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-10 start-4 select-none font-modern-display text-[10rem] font-extrabold leading-none text-cyan-100/[0.07]"
            >
              &ldquo;
            </span>
            <p className="font-modern-display relative text-xl font-semibold leading-snug text-white sm:text-2xl">
              {t("statement")}
            </p>
          </motion.blockquote>

          {/* services */}
          <section aria-labelledby="about-services-title">
            <SectionHeader
              index="01"
              id="about-services-title"
              label={t("services.label")}
              title={t("services.title")}
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {SERVICES.map(({ key, Icon }, index) => (
                <motion.article
                  key={key}
                  initial={{ opacity: 0, y: reduce ? 0 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{
                    duration: 0.65,
                    delay: reduce ? 0 : index * 0.12,
                    ease: EASE,
                  }}
                  whileHover={reduce ? undefined : { y: -6 }}
                  className={`${CARD} group flex flex-col p-6`}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/15 to-teal-400/[0.06] text-cyan-300 transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-modern-display mt-5 text-base font-bold leading-snug text-white">
                    {t(`services.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-cyan-50/55">
                    {key === "community"
                      ? t.rich("services.items.community.body", {
                          studio: (chunks) => (
                            <bdi dir="ltr" className="font-semibold text-cyan-200">
                              {chunks}
                            </bdi>
                          ),
                        })
                      : t(`services.items.${key}.body`)}
                  </p>
                </motion.article>
              ))}
            </div>

            {/* approach checklist */}
            <motion.div {...rise} className={`${CARD} mt-4 p-7 sm:p-8`}>
              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3.5">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <p className="text-[0.9375rem] leading-relaxed text-cyan-50/65">
                    {t("approach.architecture")}
                  </p>
                </li>
                <li className="flex items-start gap-3.5">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <p className="text-[0.9375rem] leading-relaxed text-cyan-50/65">
                    {t.rich("approach.api", {
                      tech: (chunks) => (
                        <bdi dir="ltr" className="font-semibold text-cyan-200">
                          {chunks}
                        </bdi>
                      ),
                    })}
                  </p>
                </li>
                <li className="flex items-start gap-3.5">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <p className="text-[0.9375rem] leading-relaxed text-cyan-50/65">
                    {t.rich("approach.tools", {
                      tech: (chunks) => (
                        <bdi dir="ltr" className="font-semibold text-cyan-200">
                          {chunks}
                        </bdi>
                      ),
                    })}
                  </p>
                </li>
              </ul>
            </motion.div>
          </section>

          {/* vision */}
          <section aria-labelledby="about-vision-title">
            <SectionHeader
              index="02"
              id="about-vision-title"
              label={t("vision.label")}
              title={t("vision.title")}
            />
            <motion.div {...rise} className={`${CARD} p-7 sm:p-9`}>
              <p className="text-[0.9375rem] leading-relaxed text-cyan-50/65 sm:text-base">
                {t("vision.paragraph1")}
              </p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-cyan-50/65 sm:text-base">
                {t("vision.paragraph2")}
              </p>
            </motion.div>
          </section>

          {/* FAQ */}
          <FaqSection />

          {/* CTA banner */}
          <motion.section
            {...rise}
            aria-labelledby="about-cta-title"
            className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-500/[0.16] via-teal-500/[0.07] to-transparent p-8 sm:p-11"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -end-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-[90px]"
            />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-[#041419]/40 px-3.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.25em] text-cyan-200">
              {t("cta.label")}
            </span>
            <h2
              id="about-cta-title"
              className="font-modern-display relative mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl"
            >
              {t("cta.title")}
            </h2>
            <p className="relative mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-cyan-50/65">
              {t("cta.body")}
            </p>
            <p className="font-modern-display relative mt-7 text-lg font-bold text-white sm:text-xl">
              {t("cta.promiseStart")}{" "}
              <span className="modern-gradient-text">{t("cta.promiseHighlight")}</span>
            </p>
            <p className="relative mt-3 text-sm text-cyan-50/45">{t("cta.closing")}</p>
          </motion.section>
        </div>
      </div>
    </article>
  );
}
