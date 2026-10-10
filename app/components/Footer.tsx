"use client";

import {useRef} from 'react';
import {motion, useInView} from 'framer-motion';
import {useTranslations} from 'next-intl';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const t = useTranslations('Footer');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <footer ref={ref} className="bg-black px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={false}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"
        >
          <div className="border-4 border-white bg-white px-4 py-2 text-xl font-black uppercase text-black" style={{ transform: "skewX(-6deg)" }}>
            <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>
              LOGO
            </span>
          </div>
          <p className="font-[family-name:var(--font-space-mono)] text-sm text-neutral-400">
            {t('rights')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}