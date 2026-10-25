"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Fragment } from "react";
import {
  EASE,
  RevealLine,
  RevealMark,
  RevealMotion,
  RevealUp,
  START,
} from "./Reveal";

type StoryIntroProps = {
  lines: string[];
  chip?: string;
  paragraphs?: string[];
  titleClassName?: string;
};

export default function StoryIntro({
  lines,
  chip,
  paragraphs = [],
  titleClassName = "text-5xl font-black uppercase leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl",
}: StoryIntroProps) {
  const locale = useLocale();
  const isArabicScript = locale === "ar" || locale === "ckb";
  const skew = isArabicScript ? 5 : -5;
  const chipDelay = 0.15 + lines.length * 0.17;

  return (
    <section className="relative overflow-hidden border-b-4 border-black bg-neutral-100 px-6 py-24 text-black sm:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className={titleClassName}>
          {lines.map((line, index) => (
            <RevealLine key={line} delay={0.15 + index * 0.17} className="pb-1">
              {line}
            </RevealLine>
          ))}

          {chip && (
            <span className="block overflow-hidden px-2 pt-3 pb-2">
              <span
                className="inline-block"
                style={{ transform: `skewX(${skew}deg)` }}
              >
                <RevealMotion inline delay={chipDelay} duration={0.8}>
                  <span className="inline-block border-4 border-red-600 bg-red-600 px-4 py-1.5 text-white sm:px-6 sm:py-2">
                    <span
                      className="inline-block"
                      style={{ transform: `skewX(${-skew}deg)` }}
                    >
                      {chip}
                    </span>
                  </span>
                </RevealMotion>
              </span>
            </span>
          )}
        </h1>

        {paragraphs.length > 0 && (
          <>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: START + 0.7, duration: 0.5, ease: EASE }}
              className="mt-12 block h-1 w-24 bg-black"
            />

            <div className="mt-12 w-full max-w-2xl">
              {paragraphs.map((paragraph, index) => (
                <Fragment key={paragraph}>
                  {index > 0 && <RevealMark delay={0.75 + index * 0.14} />}
                  <RevealUp delay={0.65 + index * 0.14}>
                    <p className="font-[family-name:var(--font-space-mono)] text-base leading-relaxed text-neutral-600 sm:text-lg">
                      {paragraph}
                    </p>
                  </RevealUp>
                </Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
