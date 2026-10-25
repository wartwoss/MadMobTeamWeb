"use client";

import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const FADE_EASE = [0.4, 0, 0.2, 1] as const;
export const START = 1.35;

type RevealMotionProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  from?: string | number;
  inline?: boolean;
  className?: string;
};

export function RevealMotion({
  children,
  delay = 0,
  duration = 0.8,
  from = "70%",
  inline = false,
  className = "",
}: RevealMotionProps) {
  return (
    <motion.span
      className={`${inline ? "inline-block" : "block"} ${className}`}
      initial={{ opacity: 0, y: from }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ delay: START + delay, duration, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export function FadeIn({
  children,
  delay = 0,
  duration = 1.2,
  className = "",
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: START + delay, duration, ease: FADE_EASE }}
    >
      {children}
    </motion.div>
  );
}

type RevealLineProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  from?: string | number;
  className?: string;
};

export function RevealLine({
  children,
  delay = 0,
  duration = 0.8,
  from = "70%",
  className = "",
}: RevealLineProps) {
  return (
    <span className={`reveal-clip block ${className}`}>
      <RevealMotion delay={delay} duration={duration} from={from}>
        {children}
      </RevealMotion>
    </span>
  );
}

type RevealUpProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  from?: number;
  className?: string;
};

export function RevealUp({
  children,
  delay = 0,
  duration = 0.75,
  from = 36,
  className = "",
}: RevealUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: from }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: START + delay, duration, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type RevealMarkProps = {
  delay?: number;
  duration?: number;
  className?: string;
};

export function RevealMark({
  delay = 0,
  duration = 0.55,
  className = "my-10",
}: RevealMarkProps) {
  return (
    <motion.span
      className={`block text-2xl leading-none text-red-600 ${className}`}
      initial={{ opacity: 0, scale: 0.4, rotate: -40 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: START + delay, duration, ease: EASE }}
    >
      *
    </motion.span>
  );
}