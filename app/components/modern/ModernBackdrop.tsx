"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Ambient backdrop for the modern theme: a deep teal base, a faint dot grid
   and two slow-drifting aurora blooms. Purely decorative — sits behind every
   page section and never intercepts pointer events. */
export default function ModernBackdrop() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#0a2e3a_0%,#062029_45%,#03131a_100%)]" />

      {/* dot grid, fading out towards the bottom */}
      <div className="modern-dot-grid absolute inset-0" />

      {/* aurora blooms */}
      <motion.div
        className="absolute -top-40 start-[8%] h-[34rem] w-[34rem] rounded-full bg-cyan-500/12 blur-[130px]"
        animate={
          reduce
            ? undefined
            : { x: [0, 70, -20, 0], y: [0, 40, 80, 0], scale: [1, 1.15, 1.05, 1] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[38%] end-[-10%] h-[30rem] w-[30rem] rounded-full bg-teal-400/10 blur-[130px]"
        animate={
          reduce
            ? undefined
            : { x: [0, -60, 20, 0], y: [0, -50, 30, 0], scale: [1, 1.1, 0.95, 1] }
        }
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-14rem] start-[28%] h-[26rem] w-[26rem] rounded-full bg-sky-500/8 blur-[120px]"
        animate={
          reduce
            ? undefined
            : { x: [0, 50, -40, 0], y: [0, -30, 20, 0] }
        }
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* top hairline glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
    </div>
  );
}
