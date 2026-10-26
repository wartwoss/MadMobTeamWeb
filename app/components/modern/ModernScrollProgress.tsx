"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useLocale } from "next-intl";

/* Hairline gradient reading indicator — glows cyan and flips its origin in
   RTL locales. */
export default function ModernScrollProgress() {
  const locale = useLocale();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.3,
  });
  const rtl = locale === "ar" || locale === "ckb";

  return (
    <motion.div
      className={`fixed inset-x-0 top-0 z-[150] h-[3px] bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 shadow-[0_0_12px_rgba(34,211,238,0.7)] ${
        rtl ? "origin-right" : "origin-left"
      }`}
      style={{ scaleX }}
    />
  );
}
