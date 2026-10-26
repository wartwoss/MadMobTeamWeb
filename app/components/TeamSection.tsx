"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { START } from "./Reveal";
import SignalBars from "./SignalBars";

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
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [booted, setBooted] = useState(false);

  /* Hold the reveal until the page loader has cleared, otherwise the section
     animates behind the loader on phones and is already static by the time it
     is visible. */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timer = window.setTimeout(
      () => setBooted(true),
      reduce ? 0 : START * 1000 + 150,
    );
    return () => window.clearTimeout(timer);
  }, []);

  const show = inView && booted;

  return (
    <section
      ref={ref}
      aria-labelledby="team-title"
      className="relative overflow-hidden border-b-4 border-black bg-white px-6 pt-14 pb-28 sm:pt-16 sm:pb-36"
    >
      <BloodSplash show={show} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16">
          <h2
            id="team-title"
            className="inline-block bg-neutral-200 px-6 py-3 text-5xl font-black uppercase italic tracking-tighter sm:text-6xl lg:text-7xl"
            style={{ transform: "skewX(-6deg)" }}
          >
            <span className="inline-block" style={{ transform: "skewX(6deg)" }}>
              <motion.span
                className="inline-block"
                initial={false}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              >
                MadMobTeam
              </motion.span>
            </span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:gap-14">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={false}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.65,
                delay: 0.35 + index * 0.22,
                ease: EASE,
              }}
              className="min-w-0"
            >
              <div className="team-card">
                <div className="team-card-shape bg-orange-600 p-[3px] sm:p-1">
                  <div className="team-card-shape relative overflow-hidden bg-neutral-950">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.14]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgba(249,115,22,0.6) 0 1px, transparent 1px 9px)",
                      }}
                    />

                    <span
                      aria-hidden
                      className="pointer-events-none absolute end-4 top-1/2 hidden -translate-y-1/2 -skew-x-6 select-none font-[family-name:var(--font-space-mono)] text-[4.5rem] font-black leading-none text-orange-500/10 lg:block xl:text-[6.5rem]"
                    >
                      0{index + 1}
                    </span>

                    <div className="team-card-inner relative">
                      <div className="flex items-center gap-3.5 sm:gap-4">
                        <div className="flex h-12 w-12 shrink-0 -skew-x-6 items-center justify-center border-2 border-orange-400 bg-orange-500 font-black text-lg uppercase text-black shadow-[0_0_16px_rgba(249,115,22,0.45)] sm:h-14 sm:w-14 sm:text-xl">
                          <span className="skew-x-6">{member.name[0]}</span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="team-card-name font-[family-name:var(--font-space-mono)] text-base font-black uppercase leading-tight tracking-tight text-white sm:text-lg lg:text-xl">
                            {member.name}
                          </h3>
                          <p className="mt-2 inline-block max-w-full border border-orange-600/70 bg-orange-600/10 px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-[0.5625rem] uppercase tracking-[0.18em] text-orange-400 sm:text-[0.625rem]">
                            {t(member.roleKey)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3 border-t-2 border-orange-600/40 pt-3">
                        <span className="font-[family-name:var(--font-space-mono)] text-[0.5rem] uppercase tracking-[0.3em] text-neutral-500">
                          MMT // CREW
                        </span>
                        <SignalBars className="text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}