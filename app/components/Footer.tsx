"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  SITE_NAME,
} from "@/app/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <footer ref={ref} className="relative z-10 bg-black px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={false}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <Link
              href="/"
              aria-label={SITE_NAME}
              className="border-4 border-white bg-white px-3 py-1 text-xl font-black uppercase tracking-tighter text-black transition-colors hover:bg-black hover:text-white sm:px-5 sm:py-2 sm:text-3xl"
              style={{ transform: "skewX(-6deg)" }}
            >
              <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>
                {SITE_NAME}
              </span>
            </Link>
            <p className="font-[family-name:var(--font-space-mono)] text-sm text-neutral-400">
              {t("rights")}
            </p>
          </div>

          <div className="grid gap-6 border-t-2 border-white/20 pt-6 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="max-w-lg font-[family-name:var(--font-display)] text-lg font-black uppercase leading-tight tracking-tight text-white sm:text-xl">
                {t("tagline")}
              </p>
              <p className="mt-2 max-w-xl font-[family-name:var(--font-space-mono)] text-xs leading-relaxed text-neutral-400 sm:text-sm">
                {t("enterprise")}
              </p>
            </div>

            <address className="flex flex-col gap-2 font-[family-name:var(--font-space-mono)] text-sm not-italic text-neutral-300 sm:items-end">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="w-fit border-b border-transparent transition-colors hover:border-orange-500 hover:text-white"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE_HREF}`}
                className="w-fit border-b border-transparent transition-colors hover:border-orange-500 hover:text-white"
              >
                <bdi dir="ltr">{CONTACT_PHONE}</bdi>
              </a>
            </address>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
