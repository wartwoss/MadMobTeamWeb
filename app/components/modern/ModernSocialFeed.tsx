"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HeartIcon } from "@heroicons/react/24/solid";
import { SOCIALS, SOCIAL_ICONS } from "./data";
import { EASE, VIEWPORT_ONCE } from "./motion";

const EASE_ARR = EASE;

function BrandIcon({
  d,
  ...props
}: { d: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d={d} />
    </svg>
  );
}

/* The feed is the only part of the contact page that needs social data and
   per-card motion; it is loaded as its own chunk below the fold while still
   being server-rendered for crawlers. */
export default function ModernSocialFeed() {
  const t = useTranslations("Contact");
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="contact-social-title"
      data-nosnippet
      className="mt-16"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="contact-social-title"
          className="font-modern-display text-2xl font-bold text-white"
        >
          {t("social.title")}
        </h2>
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-3.5 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
          <span className="modern-pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-300" />
          {t("social.demo")}
        </span>
      </div>

      <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {SOCIALS.map((post, index) => {
          const text = post.text ?? t(post.textKey ?? "");

          return (
            <motion.li
              key={post.key}
              initial={{ opacity: 0, y: reduce ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{
                duration: 0.6,
                delay: reduce ? 0 : index * 0.1,
                ease: EASE_ARR,
              }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="min-w-0"
            >
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${post.name} — ${t("social.demo")}`}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                <header className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${post.color}1f`,
                      border: `1px solid ${post.color}55`,
                      color: post.color,
                    }}
                  >
                    <BrandIcon
                      d={SOCIAL_ICONS[post.key]}
                      className="h-4.5 w-4.5"
                    />
                  </span>
                  <span className="min-w-0">
                    <h3 className="block truncate font-modern-display text-sm font-semibold text-white">
                      {post.name}
                    </h3>
                  </span>
                </header>

                <p
                  className="mt-4 rounded-2xl rounded-ss-sm px-4 py-3 text-[0.8125rem] leading-relaxed text-white/90"
                  style={{
                    backgroundColor: `${post.color}14`,
                    border: `1px solid ${post.color}33`,
                  }}
                >
                  {text}
                  {post.heart && (
                    <HeartIcon
                      aria-hidden
                      className="ms-1.5 inline-block h-3 w-3 align-[-0.1em] text-rose-400"
                    />
                  )}
                </p>
              </a>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
