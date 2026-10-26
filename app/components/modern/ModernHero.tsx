"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { PROJECTS } from "./data";
import { BOOT, EASE } from "./motion";

function Ticker() {
  const t = useTranslations("Machine");

  const items = PROJECTS.map((project) => ({
    code: project.code,
    name: project.name,
    tag: t(`projects.${project.code}.tag`),
  }));

  return (
    <div className="modern-marquee-host relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-4">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-e from-[#041419] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-w from-[#041419] to-transparent" />

      <div className="modern-marquee flex w-max items-center gap-10 pe-10">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-10 pe-10">
            {items.map((item) => (
              <span key={item.code} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rotate-45 rounded-[2px] bg-cyan-300/70" />
                <span className="font-modern-display text-sm font-semibold text-cyan-50/85">
                  {item.name}
                </span>
                <span className="text-xs text-cyan-50/40">{item.tag}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ModernHero() {
  const t = useTranslations("Hero");
  const tNav = useTranslations("Nav");
  const tMachine = useTranslations("Machine");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 90]);

  /* Arabic reads "we build -> solutions -> digital", so the gradient word
     lands on the last line — same ordering rule the brutalist hero uses. */
  const highlightLast = locale === "ar";
  const isArabicScript = locale === "ar" || locale === "ckb";
  const titleSize = isArabicScript
    ? "text-5xl sm:text-7xl lg:text-8xl"
    : "text-[2.75rem] sm:text-7xl lg:text-8xl";

  /* Gate first-viewport animations behind the loader (skipped entirely for
     reduced motion). */
  const at = (offset: number) => (reduce ? 0 : BOOT + offset);
  const rise = { opacity: 0, y: 26, filter: "blur(10px)" } as const;
  const risen = { opacity: 1, y: 0, filter: "blur(0px)" } as const;
  const riseTransition = (delay: number) => ({
    delay: at(delay),
    duration: reduce ? 0.4 : 0.85,
    ease: EASE,
  });

  const digitalLine = (delay: number) => (
    <motion.span
      className="block"
      initial={rise}
      animate={risen}
      transition={riseTransition(delay)}
    >
      <span className="modern-gradient-text font-extrabold drop-shadow-[0_0_28px_rgba(34,211,238,0.35)]">
        {t("digital")}
      </span>
    </motion.span>
  );

  const plainLine = (text: string, delay: number) => (
    <motion.span
      className="block"
      initial={rise}
      animate={risen}
      transition={riseTransition(delay)}
    >
      {text}
    </motion.span>
  );

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative">
      <div className="relative overflow-hidden px-6 pt-24 sm:pt-32 lg:pt-40">
        {/* parallax blooms */}
        <motion.div
          aria-hidden
          style={{ y: reduce ? undefined : orbY1 }}
          className="pointer-events-none absolute -top-28 start-[12%] h-72 w-72 rounded-full bg-cyan-400/15 blur-[95px]"
        />
        <motion.div
          aria-hidden
          style={{ y: reduce ? undefined : orbY2 }}
          className="pointer-events-none absolute top-44 end-[8%] h-80 w-80 rounded-full bg-teal-400/12 blur-[105px]"
        />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* status badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={riseTransition(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-4 py-1.5 backdrop-blur-md"
          >
            <span className="modern-pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-300" />
            <span className="font-modern-display text-xs font-semibold tracking-wide text-cyan-100/90">
              MadMobTeam
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-cyan-100/50">
              {tMachine("base.est")}
            </span>
          </motion.span>

          {/* headline */}
          <h1
            id="hero-title"
            className={`font-modern-display mt-8 ${titleSize} font-bold leading-[1.04] tracking-tight text-white`}
          >
            {plainLine(t("weBuild"), 0.1)}
            {highlightLast ? plainLine(t("solutions"), 0.22) : digitalLine(0.22)}
            {highlightLast ? digitalLine(0.34) : plainLine(t("solutions"), 0.34)}
          </h1>

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={riseTransition(0.48)}
            className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-cyan-50/60 sm:text-lg"
          >
            {t("tagline")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={riseTransition(0.62)}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/projects" className="group relative">
              <motion.span
                whileHover={{ scale: 1.045, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="modern-shine flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-300 to-teal-400 px-7 py-3.5 font-modern-display text-sm font-bold text-[#04212b] shadow-[0_10px_35px_rgba(34,211,238,0.35)]"
              >
                {tNav("projects")}
                <ArrowRightIcon className="h-4 w-4 rtl:-scale-x-100" />
              </motion.span>
            </Link>
            <Link href="/contact" className="group">
              <motion.span
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] px-7 py-3.5 font-modern-display text-sm font-semibold text-cyan-50 backdrop-blur-md transition-colors duration-300 group-hover:border-cyan-300/35 group-hover:bg-cyan-400/10"
              >
                {tNav("contact")}
                <ArrowRightIcon className="h-4 w-4 rtl:-scale-x-100" />
              </motion.span>
            </Link>
          </motion.div>

          {/* scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: at(1.1), duration: 0.8 }}
            className="mt-16 hidden sm:block"
            aria-hidden
          >
            <motion.span
              animate={reduce ? undefined : { y: [0, 9, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-11 w-7 items-start justify-center rounded-full border border-white/15 pt-2"
            >
              <ChevronDownIcon className="h-4 w-4 text-cyan-200/60" />
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* project ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: at(0.9), duration: 1 }}
        className="mt-16 sm:mt-24"
      >
        <Ticker />
      </motion.div>
    </section>
  );
}
