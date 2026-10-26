"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowUpRightIcon,
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { EASE, VIEWPORT_ONCE, blurRise, staggerGroup, useBooted } from "./motion";

const EASE_ARR = EASE;

const ModernSocialFeed = dynamic(() => import("./ModernSocialFeed"));

export default function ModernContact() {
  const t = useTranslations("Contact");
  const reduce = useReducedMotion();
  const booted = useBooted();
  const [copied, setCopied] = useState<string | null>(null);
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    };
  }, []);

  /* The card keeps its native mailto:/tel: href (so the OS handler still
     launches), and also copies the value to the clipboard. Desktops without
     a configured mail/phone app otherwise show no reaction at all — the
     "Copied" chip gives every click visible feedback. */
  async function handleChannelClick(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* Clipboard unavailable — native handler already fired. */
      return;
    }
    setCopied(label);
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(null), 2200);
  }

  const cards = [
    {
      Icon: EnvelopeIcon,
      label: t("info.email"),
      value: t("values.email"),
      href: `mailto:${t("values.email")}`,
    },
    {
      Icon: PhoneIcon,
      label: t("info.phone"),
      value: t("values.phone"),
      href: `tel:${t("values.phone").replace(/[^+\d]/g, "")}`,
    },
  ];

  return (
    <section
      aria-labelledby="contact-title"
      className="relative px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:pb-28"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* header */}
        <motion.header
          variants={staggerGroup}
          initial="hidden"
          animate={booted ? "show" : "hidden"}
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={blurRise}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-cyan-200/85 backdrop-blur-md"
          >
            <span className="modern-pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-300" />
            {t("eyebrow")}
          </motion.span>

          <motion.h1
            id="contact-title"
            variants={blurRise}
            className="font-modern-display mt-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {t("headline").split(" ")[0]}{" "}
            <span className="modern-gradient-text drop-shadow-[0_0_30px_rgba(34,211,238,0.35)]">
              {t("headline").split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          <motion.p
            variants={blurRise}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-cyan-50/60"
          >
            {t("description")}
          </motion.p>

          <motion.span
            variants={blurRise}
            className="mt-7 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs font-medium text-cyan-50/60 backdrop-blur-md"
          >
            {t("chip")}
          </motion.span>
        </motion.header>

        {/* direct channels — address is the correct element for the page's
            own contact details, and every channel stays a native link. */}
        <address className="mt-14 grid gap-4 not-italic sm:grid-cols-2">
          {cards.map(({ Icon, label, value, href }, index) => (
            <motion.a
              key={label}
              href={href}
              onClick={() => handleChannelClick(value, label)}
              initial={{ opacity: 0, y: reduce ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.65, delay: reduce ? 0 : index * 0.12, ease: EASE_ARR }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group relative flex h-full items-center gap-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/30"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-16 -end-10 h-40 w-40 rounded-full bg-cyan-400/12 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/15 to-teal-400/[0.06] text-cyan-300 transition-shadow duration-300 group-hover:shadow-[0_0_26px_rgba(34,211,238,0.25)]">
                <Icon className="h-6 w-6" />
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-cyan-50/45">
                  {label}
                </span>
                <span className="mt-1.5 block break-all font-modern-display text-base font-semibold text-white sm:text-lg">
                  <bdi dir="ltr">{value}</bdi>
                </span>
              </span>

              {/* copy feedback — falls back to the hover arrow */}
              <span className="relative flex w-24 shrink-0 items-center justify-end" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  {copied === label ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-1 text-[0.625rem] font-semibold text-cyan-100"
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                      {t("copied")}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="arrow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRightIcon className="h-5 w-5 text-cyan-300/50 transition-colors duration-300 group-hover:text-cyan-300 rtl:-scale-x-100" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </motion.a>
          ))}
        </address>

        <ModernSocialFeed />
      </div>
    </section>
  );
}
