"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { PROJECTS } from "./data";
import { BOOT, EASE, SPRING, blurRise, staggerGroup, useBooted } from "./motion";

const PANEL_EASE = EASE;

function monogram(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function DetailsPanel({
  selectedCode,
  onClear,
}: {
  selectedCode: string | null;
  onClear: () => void;
}) {
  const t = useTranslations("Machine");
  const project =
    PROJECTS.find((item) => item.code === selectedCode) ?? null;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#07202a]/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,12,16,0.45)]">
      {/* panel header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-3.5">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.25em] text-cyan-50/45">
          {t("details.header")}
        </span>
        <span
          className={`flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] transition-colors ${
            project ? "text-cyan-300" : "text-cyan-50/30"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              project ? "modern-pulse-dot bg-cyan-300" : "bg-white/20"
            }`}
          />
          {project ? t("details.selected") : t("delivery.waiting")}
        </span>
      </div>

      <div aria-live="polite" className="p-6">
        <AnimatePresence mode="wait">
          {project ? (
            <motion.div
              key={project.code}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: PANEL_EASE }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-modern-display truncate text-2xl font-bold text-white">
                    {project.name}
                  </h3>
                  <p className="mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-cyan-300/70">
                    {t(`projects.${project.code}.tag`)}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 font-modern-display text-xs font-bold text-cyan-100">
                  {project.year}
                </span>
              </div>

              <div className="my-5 h-px w-full bg-gradient-to-r from-cyan-300/30 via-white/10 to-transparent" />

              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.25em] text-cyan-50/40">
                {t("details.description")}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-cyan-50/65">
                {t(`projects.${project.code}.description`)}
              </p>

              <p className="mt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.25em] text-cyan-50/40">
                {t("details.stack")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-3 py-1 text-[0.6875rem] font-medium text-cyan-100/85"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link href="/contact" className="group mt-7 block">
                <motion.span
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: PANEL_EASE }}
                  className="modern-shine flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-teal-400 px-4 py-3 font-modern-display text-sm font-bold text-[#04212b] shadow-[0_8px_30px_rgba(34,211,238,0.3)]"
                >
                  {t("delivery.cta")}
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
                </motion.span>
              </Link>

              <button
                type="button"
                onClick={onClear}
                className="mt-3 w-full cursor-pointer rounded-2xl border border-white/10 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-cyan-50/55 transition-all duration-200 hover:border-white/25 hover:text-white"
              >
                {t("details.clear")}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: PANEL_EASE }}
              className="flex min-h-[240px] flex-col items-center justify-center gap-4 py-6 text-center"
            >
              <span className="relative flex h-14 w-14 items-center justify-center">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-cyan-300/30"
                  animate={{ scale: [0.7, 1.25], opacity: [0.7, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-300/70 to-teal-400/70 shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
              </span>
              <div>
                <h3 className="font-modern-display text-lg font-semibold text-white/60">
                  {t("details.empty")}
                </h3>
                <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-cyan-50/40">
                  {t("details.hint")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ModernProjects() {
  const t = useTranslations("Machine");
  const tMeta = useTranslations("Meta");
  const reduce = useReducedMotion();
  const booted = useBooted();
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const at = (offset: number) => (reduce ? 0 : BOOT + offset);

  /* Keep the details panel in view after every pick (mirrors the brutalist
     machine's behaviour but with the modern panel layout). */
  useEffect(() => {
    const node = detailsRef.current;
    if (!selectedCode || !node) return;

    const box = node.getBoundingClientRect();
    if (box.top >= 0 && box.bottom <= window.innerHeight) return;

    node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [selectedCode, reduce]);

  function handleSelect(code: string) {
    setSelectedCode((current) => (current === code ? null : code));
  }

  return (
    <section
      aria-labelledby="projects-title"
      className="relative px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* header */}
        <motion.header
          variants={staggerGroup}
          initial="hidden"
          animate={booted ? "show" : "hidden"}
          transition={{ delay: reduce ? 0 : BOOT }}
        >
          <motion.span
            variants={blurRise}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-cyan-200/85 backdrop-blur-md"
          >
            <span className="modern-pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-300" />
            {t("glass.pick")}
          </motion.span>

          <motion.h1
            id="projects-title"
            variants={blurRise}
            className="font-modern-display mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t("marquee.title").split(" ").slice(0, -2).join(" ")}{" "}
            <span className="modern-gradient-text">
              {t("marquee.title").split(" ").slice(-2).join(" ")}
            </span>
          </motion.h1>

          <motion.p
            variants={blurRise}
            className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-cyan-50/55 sm:text-base"
          >
            {tMeta("projects.intro")}
          </motion.p>

          <motion.div
            variants={blurRise}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <span className="text-sm text-cyan-50/50">{t("glass.team")}</span>
            <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 font-modern-display text-[0.6875rem] font-bold text-cyan-100">
              {t("marquee.slots")}
            </span>
          </motion.div>
        </motion.header>

        {/* showcase + details */}
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_22rem] xl:grid-cols-[1fr_24rem]">
          <motion.div
            variants={staggerGroup}
            initial="hidden"
            animate={booted ? "show" : "hidden"}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {PROJECTS.map((project, index) => {
              const selected = selectedCode === project.code;
              const featured = index === 0;

              return (
                <motion.button
                  key={project.code}
                  type="button"
                  variants={blurRise}
                  onClick={() => handleSelect(project.code)}
                  aria-pressed={selected}
                  className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-6 text-start backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:p-7 ${
                    featured ? "sm:col-span-2" : ""
                  } ${
                    selected
                      ? "border-cyan-300/50 bg-cyan-400/[0.09] shadow-[0_16px_50px_rgba(34,211,238,0.18)]"
                      : "border-white/10 bg-white/[0.035] hover:border-cyan-300/25 hover:bg-white/[0.06]"
                  }`}
                >
                  {/* shared selection ring — layoutId glides it between cards */}
                  {selected && (
                    <motion.span
                      layoutId="modern-project-ring"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-cyan-300/60"
                      transition={SPRING}
                    />
                  )}

                  {/* hover bloom */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -end-14 h-44 w-44 rounded-full bg-cyan-400/12 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div
                    className={`relative flex items-start gap-5 ${
                      featured ? "sm:items-center" : ""
                    }`}
                  >
                    {/* monogram tile */}
                    <span
                      className={`grid shrink-0 place-items-center rounded-2xl border font-modern-display font-extrabold transition-all duration-300 ${
                        selected
                          ? "border-cyan-300/40 bg-gradient-to-br from-cyan-300 to-teal-500 text-[#04212b] shadow-[0_0_26px_rgba(34,211,238,0.4)]"
                          : "border-white/10 bg-white/[0.05] text-cyan-100/90 group-hover:border-cyan-300/25"
                      } ${featured ? "h-16 w-16 text-xl sm:h-20 sm:w-20 sm:text-2xl" : "h-14 w-14 text-lg"}`}
                    >
                      {monogram(project.name)}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span
                          className={`font-modern-display truncate font-bold text-white ${
                            featured ? "text-xl sm:text-2xl" : "text-lg"
                          }`}
                        >
                          {project.name}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-modern-display text-[0.625rem] font-semibold text-cyan-50/55">
                          {project.year}
                        </span>
                      </span>
                      <span className="mt-1.5 block truncate text-[0.8125rem] text-cyan-200/60">
                        {t(`projects.${project.code}.tag`)}
                      </span>

                      {/* featured card exposes the stack inline */}
                      {featured && (
                        <span className="mt-4 flex flex-wrap gap-2">
                          {project.stack.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-cyan-300/15 bg-cyan-400/[0.06] px-3 py-1 text-[0.6875rem] font-medium text-cyan-100/75"
                            >
                              {item}
                            </span>
                          ))}
                        </span>
                      )}
                    </span>

                    <span className="flex shrink-0 flex-col items-end gap-3">
                      <span className="font-modern-display text-sm font-bold text-cyan-300/85">
                        {project.price}
                      </span>
                      <ArrowUpRightIcon
                        aria-hidden
                        className="h-5 w-5 text-cyan-300/0 transition-all duration-300 group-hover:text-cyan-300/90 rtl:-scale-x-100"
                      />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* sticky details */}
          <div ref={detailsRef} className="scroll-mt-24 lg:sticky lg:top-24">
            <DetailsPanel selectedCode={selectedCode} onClear={() => setSelectedCode(null)} />
          </div>
        </div>

        {/* base strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: booted ? 1 : 0 }}
          transition={{ delay: at(0.9), duration: 0.8 }}
          className="mt-10 flex items-center justify-between border-t border-white/5 pt-5"
        >
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-cyan-50/35">
            {t("base.location")}
          </span>
          <span className="flex items-center gap-1.5">
            {[0, 1, 2].map((index) => (
              <span key={index} className="h-1 w-1 rounded-full bg-cyan-300/40" />
            ))}
          </span>
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-cyan-50/35">
            {t("base.est")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
