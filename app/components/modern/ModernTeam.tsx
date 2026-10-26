"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { TEAM } from "./data";
import { EASE, blurRise, staggerGroup } from "./motion";

export default function ModernTeam() {
  const t = useTranslations("Team");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      aria-labelledby="team-title"
      className="relative px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        {/* heading */}
        <motion.div
          variants={staggerGroup}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mb-14 flex flex-col items-center text-center"
        >
          <motion.span
            variants={blurRise}
            className="mb-5 h-px w-24 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
          />
          <motion.h2
            id="team-title"
            variants={blurRise}
            className="font-modern-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            MadMob<span className="modern-gradient-text">Team</span>
          </motion.h2>
          <motion.p
            variants={blurRise}
            className="mt-4 max-w-md text-sm leading-relaxed text-cyan-50/50"
          >
            {t("role")} {t("frontend")} · {t("backend")}
          </motion.p>
        </motion.div>

        {/* member cards */}
        <motion.div
          variants={staggerGroup}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {TEAM.map((member, index) => (
            <motion.div key={member.name} variants={blurRise}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="modern-shine group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.015] p-8 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/30"
              >
                {/* hover bloom */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -end-16 h-52 w-52 rounded-full bg-cyan-400/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* oversized ghost index */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 -end-2 select-none font-modern-display text-[7rem] font-extrabold leading-none text-cyan-100/[0.05] transition-colors duration-500 group-hover:text-cyan-300/10"
                >
                  0{index + 1}
                </span>

                <div className="relative flex items-center gap-5">
                  {/* gradient avatar with orbit ring */}
                  <div className="relative shrink-0">
                    <motion.span
                      aria-hidden
                      className="absolute -inset-1.5 rounded-[1.4rem] border border-cyan-300/25"
                      animate={{ rotate: [0, 6, 0, -6, 0] }}
                      transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 1.2,
                      }}
                    />
                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-teal-500 font-modern-display text-2xl font-extrabold text-[#04212b] shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                      {member.name[0]}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-modern-display truncate text-xl font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-cyan-200">
                      <span className="h-1 w-1 rounded-full bg-cyan-300" />
                      {t(member.roleKey)}
                    </p>
                  </div>
                </div>

                <div className="relative mt-8 flex items-center justify-between border-t border-white/5 pt-5">
                  <span className="text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-cyan-50/35">
                    MMT · CREW
                  </span>
                  <span className="flex items-center gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-cyan-300/60"
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: dot * 0.25,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </span>
                </div>
              </motion.article>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
