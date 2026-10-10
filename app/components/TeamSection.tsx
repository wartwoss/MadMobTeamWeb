"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const team = [
  {
    name: "Bandan Kamal",
    roleKey: "frontend" as const,
  },
  {
    name: "Las Taha",
    roleKey: "backend" as const,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function BloodSplash({ show }: { show: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
      transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 h-64 w-72 rotate-[-15deg] rounded-[60%_40%_50%_50%] bg-red-400/40 blur-[2px]" />
      <div className="absolute -top-4 right-20 h-40 w-48 rotate-[10deg] rounded-[45%_55%_60%_40%] bg-red-500/35 blur-[1px]" />
      <div className="absolute top-16 right-[35%] h-28 w-36 rotate-[-30deg] rounded-[50%_50%_40%_60%] bg-red-400/30 blur-[2px]" />
      <div className="absolute top-[40%] right-[10%] h-20 w-24 rotate-[25deg] rounded-[55%_45%_50%_50%] bg-red-500/30 blur-[1px]" />
      <div className="absolute top-[55%] left-[15%] h-16 w-20 rotate-[-10deg] rounded-[40%_60%_55%_45%] bg-red-400/25 blur-[2px]" />
      <div className="absolute bottom-20 right-[45%] h-12 w-16 rotate-[35deg] rounded-[50%_50%_45%_55%] bg-red-500/25 blur-[1px]" />
      <div className="absolute -top-6 right-[55%] h-10 w-10 rotate-[-20deg] rounded-full bg-red-400/35 blur-[1px]" />
      <div className="absolute top-28 right-[5%] h-8 w-8 rotate-[45deg] rounded-full bg-red-500/40" />
      <div className="absolute top-[70%] left-[5%] h-6 w-8 rotate-[-40deg] rounded-full bg-red-400/25" />
      <div className="absolute bottom-16 right-[15%] h-5 w-6 rotate-[30deg] rounded-full bg-red-500/35" />
      <div className="absolute bottom-10 right-[8%] h-4 w-5 rotate-[-15deg] rounded-full bg-red-400/30" />
      <div className="absolute bottom-24 right-[20%] h-6 w-7 rotate-[50deg] rounded-full bg-red-500/30" />
      <div className="absolute bottom-8 right-[25%] h-3 w-4 rotate-[-25deg] rounded-full bg-red-400/25" />
      <div className="absolute bottom-20 right-[10%] h-4 w-4 rotate-[40deg] rounded-full bg-red-500/35" />
      <div className="hidden sm:block absolute top-[20%] left-[8%] h-20 w-24 rotate-[-20deg] rounded-[50%_50%_40%_60%] bg-red-400/30 blur-[1px]" />
      <div className="hidden sm:block absolute top-[35%] left-[3%] h-14 w-16 rotate-[15deg] rounded-[45%_55%_50%_50%] bg-red-500/25 blur-[1px]" />
      <div className="hidden sm:block absolute top-[50%] left-[5%] h-10 w-12 rotate-[-25deg] rounded-full bg-red-400/30" />
      <div className="hidden sm:block absolute top-[65%] left-[10%] h-8 w-10 rotate-[30deg] rounded-full bg-red-500/25" />
      <div className="hidden sm:block absolute top-[15%] left-[12%] h-6 w-7 rotate-[-35deg] rounded-full bg-red-400/35" />
      <div className="hidden sm:block absolute top-[75%] left-[3%] h-5 w-5 rotate-[20deg] rounded-full bg-red-500/30" />
      <div className="hidden sm:block absolute top-[45%] left-[1%] h-12 w-14 rotate-[-8deg] rounded-[55%_45%_45%_55%] bg-red-400/20 blur-[2px]" />
      <div className="hidden sm:block absolute top-[85%] left-[8%] h-4 w-6 rotate-[40deg] rounded-full bg-red-500/25" />
    </motion.div>
  );
}

export default function TeamSection() {
  const t = useTranslations("Team");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b-4 border-black bg-white px-6 pt-14 pb-28 sm:pt-16 sm:pb-36"
    >
      <BloodSplash show={inView} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16">
          <h2
            className="inline-block bg-neutral-200 px-6 py-3 text-5xl font-black uppercase italic tracking-tighter sm:text-6xl lg:text-7xl"
            style={{ transform: "skewX(-6deg)" }}
          >
            <span className="inline-block" style={{ transform: "skewX(6deg)" }}>
              <motion.span
                className="inline-block"
                initial={false}
                animate={
                  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.9, delay: 0, ease: EASE }}
              >
                Mad Mob Team
              </motion.span>
            </span>
          </h2>
        </div>

        <div className="relative flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:items-start sm:gap-10 lg:gap-16">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={false}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.18 + index * 0.14,
                ease: EASE,
              }}
              className="w-full border-4 border-black bg-neutral-100 p-5 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] sm:w-96 sm:p-8"
            >
              <motion.div
                initial={false}
                animate={
                  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.26 + index * 0.14,
                  ease: EASE,
                }}
                className="mb-4 flex items-center gap-4"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-black bg-neutral-300 font-black text-xl uppercase sm:h-16 sm:w-16 sm:text-2xl">
                  {member.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-space-mono)] text-lg font-bold capitalize sm:text-xl">
                    {member.name}
                  </h3>
                  <p className="font-[family-name:var(--font-space-mono)] text-xs text-neutral-500 sm:text-sm">
                    {t("role")} {t(member.roleKey)}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}