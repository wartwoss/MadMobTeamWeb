"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import { useTranslations } from "next-intl";

const BARS = [40, 90, 55, 100, 30, 75, 60, 85, 45, 95, 50, 70];

type PageLoaderProps = {
  title: string;
};

export default function PageLoader({ title }: PageLoaderProps) {
  const t = useTranslations("Loader");
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const progress = useMotionValue(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const controls = animate(progress, 100, {
      duration: reduce ? 0.01 : 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setPct(Math.round(value)),
      onComplete: () => {
        const timer = window.setTimeout(() => setDone(true), reduce ? 0 : 120);
        return () => window.clearTimeout(timer);
      },
    });

    return () => controls.stop();
  }, [progress]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="mmt-loader"
          data-page-loader
          className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-black px-6 py-6 text-white sm:px-10 sm:py-8"
          exit={{ y: "-101%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between">
            <span className="bg-neutral-200 px-2 py-1 font-[family-name:var(--font-space-mono)] text-[0.625rem] font-bold uppercase tracking-widest text-black sm:text-xs">
              MadMobTeam
            </span>
            <span className="animate-blink-fast pt-1 font-[family-name:var(--font-space-mono)] text-[0.625rem] uppercase tracking-widest text-red-600 sm:text-xs">
              ■ {t("readingFiles")}
            </span>
          </div>

          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8">
              <span className="text-[18vw] font-black uppercase leading-[0.78] tracking-tighter sm:text-[11vw] lg:text-[8rem]">
                {title}
              </span>
            </div>

            <div className="border-4 border-white p-1.5">
              <motion.div
                className="h-5 bg-red-600 sm:h-7"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="flex items-end gap-1.5">
            {BARS.map((height, index) => (
              <motion.span
                key={index}
                className="w-4 bg-white/70 sm:w-6"
                initial={{ height: 0 }}
                animate={{ height: `${Math.round(height * 0.36)}px` }}
                transition={{
                  delay: 0.08 + index * 0.035,
                  duration: 0.3,
                  ease: "backOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
