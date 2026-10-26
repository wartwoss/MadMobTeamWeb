"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from "@/app/lib/site";
import { EASE } from "./motion";

const LINKS = [
  { href: "/projects", labelKey: "projects" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
] as const;

export default function ModernFooter() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  function toTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      ref={ref}
      className="relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent via-[#04161d]/60 to-[#020c11] px-6 pb-10 pt-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto max-w-6xl"
      >
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          {/* wordmark */}
          <Link
            href="/"
            aria-label="MadMobTeam"
            className="flex items-center gap-3"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-teal-500 font-modern-display text-lg font-extrabold text-[#041419] shadow-[0_0_24px_rgba(34,211,238,0.3)]">
              M
            </span>
            <span className="font-modern-display modern-gradient-text text-xl font-bold tracking-tight">
              MadMobTeam
            </span>
          </Link>

          {/* nav echoes */}
          <nav
            aria-label={tNav("primary")}
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-cyan-50/55 transition-colors hover:text-cyan-100"
              >
                {tNav(link.labelKey)}
                <span className="absolute -bottom-1 start-0 h-px w-0 bg-gradient-to-r from-cyan-300 to-teal-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* back to top */}
          <motion.button
            type="button"
            onClick={toTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.25, ease: EASE }}
            aria-label="Back to top"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/[0.04] text-cyan-100/70 transition-colors hover:border-cyan-300/35 hover:bg-cyan-400/10 hover:text-cyan-100"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="mt-8 grid gap-6 border-t border-white/5 pt-6 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="font-modern-display max-w-lg text-base font-semibold leading-snug text-white sm:text-lg">
              {t("tagline")}
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-cyan-50/50">
              {t("enterprise")}
            </p>
          </div>

          <address className="flex flex-col gap-1.5 text-sm not-italic text-cyan-50/55 sm:items-end">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="w-fit transition-colors hover:text-cyan-100"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE_HREF}`}
              className="w-fit transition-colors hover:text-cyan-100"
            >
              <bdi dir="ltr">{CONTACT_PHONE}</bdi>
            </a>
          </address>
        </div>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-cyan-50/40">{t("rights")}</p>
        </div>
      </motion.div>
    </footer>
  );
}
