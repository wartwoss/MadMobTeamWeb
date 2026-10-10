"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useLocale } from "next-intl";

export default function ScrollProgress() {
  const locale = useLocale();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.4,
  });
  const rtl = locale === "ar" || locale === "ckb";

  return (
    <motion.div
      className={`fixed inset-x-0 top-0 z-[150] h-1.5 bg-orange-600 ${
        rtl ? "origin-right" : "origin-left"
      }`}
      style={{ scaleX }}
    />
  );
}
