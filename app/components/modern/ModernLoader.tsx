"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { EASE } from "./motion";

type ModernLoaderProps = {
  title: string;
};

/* Modern boot screen: a pulsing orb, the page title in gradient type and a
   hairline progress meter — the calm counterpart to the brutalist loader.
   Exits through a circular iris wipe instead of sliding off. */
export default function ModernLoader({ title }: ModernLoaderProps) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: reduce ? 0.01 : 0.85,
      ease: EASE,
      onUpdate: (value) => setPct(Math.round(value)),
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [progress, reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="modern-loader"
          data-page-loader
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-10 overflow-hidden bg-[#041419] px-6"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: reduce ? 0.01 : 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* soft halo */}
          <div
            aria-hidden
            className="absolute top-1/2 start-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]"
          />

          {/* pulsing orb */}
          <div className="relative flex h-24 w-24 items-center justify-center">
            {[0, 0.45, 0.9].map((delay) => (
              <motion.span
                key={delay}
                aria-hidden
                className="absolute inset-0 rounded-full border border-cyan-300/40"
                initial={{ scale: 0.55, opacity: 0.8 }}
                animate={
                  reduce
                    ? { scale: 1, opacity: 0.25 }
                    : { scale: [0.55, 1.5], opacity: [0.8, 0] }
                }
                transition={{
                  duration: 1.8,
                  delay: reduce ? 0 : delay,
                  repeat: reduce ? 0 : Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
            <motion.span
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-teal-500 font-modern-display text-2xl font-extrabold text-[#041419] shadow-[0_0_44px_rgba(34,211,238,0.55)]"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              M
            </motion.span>
          </div>

          {/* title */}
          <div className="flex flex-col items-center gap-3 text-center">
            <motion.h2
              className="font-modern-display modern-gradient-text text-4xl font-bold tracking-tight sm:text-6xl"
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: reduce ? 0 : 0.15, ease: EASE }}
            >
              {title}
            </motion.h2>
            <motion.span
              className="text-[0.6875rem] font-semibold uppercase tracking-[0.4em] text-cyan-100/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.35 }}
            >
              MadMobTeam
            </motion.span>
          </div>

          {/* progress hairline */}
          <div className="flex w-64 max-w-full items-center gap-4 sm:w-80">
            <div className="h-px flex-1 overflow-hidden bg-white/10">
              <motion.div
                className="h-px bg-gradient-to-r from-cyan-300 to-teal-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-10 text-end font-modern-display text-xs font-semibold tabular-nums text-cyan-200/70">
              {pct}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
