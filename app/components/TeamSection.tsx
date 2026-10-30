"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { START } from "./Reveal";
import SignalBars from "./SignalBars";
import BloodSplash, { BloodDrips } from "./BloodSplash";

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
          <div className="team-title-stack relative inline-block">
            <span aria-hidden className="team-title-shadow" />
            <BloodDrips show={show} />
            <h2
              id="team-title"
              className="team-title inline-block px-6 text-4xl font-black uppercase italic tracking-tighter text-neutral-950 sm:px-8 sm:text-6xl lg:px-10 lg:text-7xl"
              style={{ transform: "skewX(-6deg)" }}
            >
              <span aria-hidden className="team-title-sheen" />
              <span
                className="relative inline-block"
                style={{ transform: "skewX(6deg)" }}
              >
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
              className="flex min-w-0"
            >
              <div className="team-card flex w-full flex-col">
                <div className="team-card-shape flex flex-1 bg-orange-600 p-[3px] sm:p-1">
                  <div className="team-card-shape relative flex flex-1 flex-col overflow-hidden bg-neutral-950">
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

                    <div className="team-card-inner relative flex flex-1 flex-col">
                      <div className="flex-1">
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