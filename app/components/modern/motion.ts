"use client";

import { useEffect, useState } from "react";
import type { Transition, Variants } from "framer-motion";

/* Total time the modern page loader owns the screen:
   progress (~0.85s) + hold (~0.1s) + circular exit (~0.55s).
   First-viewport animations start at this baseline so they never play
   behind the loader — the modern twin of the brutalist theme's START. */
export const BOOT = 1.5;

/* Signature easing for the modern theme — a long, soft deceleration that
   reads completely different from the brutalist snap. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const SPRING: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.7,
};

/* Blur-in rise used for headings and first-viewport blocks. */
export const blurRise: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

/* Staggered container — pairs with blurRise / fadeUp children. */
export const staggerGroup: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/* In-viewport defaults so sections animate once as they scroll in. */
export const VIEWPORT_ONCE = { once: true, amount: 0.25 } as const;

/**
 * True once the page loader has cleared (or immediately when the visitor
 * prefers reduced motion). Used to hold first-viewport reveals.
 */
export function useBooted(delayMs: number = BOOT * 1000): boolean {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = window.setTimeout(() => setBooted(true), reduce ? 0 : delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  return booted;
}
