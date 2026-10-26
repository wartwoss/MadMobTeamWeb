"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "./ThemeContext";

const ITEMS = ["q1", "q2", "q3", "q4"] as const;
const MONO = "font-[family-name:var(--font-space-mono)]";

/* Visible FAQ. The same questions are emitted as FAQPage JSON-LD by the
   About page, which is why the copy lives in the About namespace. */
export default function FaqSection() {
  const t = useTranslations("About");
  const { theme } = useTheme();
  const modern = theme === "modern";

  return (
    <section
      aria-labelledby="faq-title"
      className={modern ? "mt-14" : "mt-16 sm:mt-20"}
    >
      {modern ? (
        <div className="mb-6 flex items-center gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-cyan-300/25 bg-cyan-400/10 font-modern-display text-sm font-extrabold text-cyan-200">
            03
          </span>
          <span className="min-w-0">
            <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-cyan-50/45">
              {t("faq.label")}
            </span>
            <h2
              id="faq-title"
              className="font-modern-display mt-0.5 text-xl font-bold text-white sm:text-2xl"
            >
              {t("faq.title")}
            </h2>
          </span>
          <span className="h-px flex-1 bg-gradient-to-e from-cyan-300/35 to-transparent" />
        </div>
      ) : (
        <div className="border-b-2 border-neutral-300 pb-3">
          <span
            className={`${MONO} block text-[0.625rem] font-bold uppercase tracking-[0.3em] text-neutral-500`}
          >
            03 / {t("faq.label")}
          </span>
          <h2
            id="faq-title"
            className="mt-2 text-2xl font-black uppercase leading-none tracking-tight text-neutral-900 sm:text-3xl"
          >
            {t("faq.title")}
          </h2>
        </div>
      )}

      <div
        className={
          modern
            ? "mt-6 flex flex-col gap-3"
            : "mt-6 border-t-2 border-neutral-900"
        }
      >
        {ITEMS.map((item, index) => (
          <details
            key={item}
            open={index === 0}
            className={
              modern
                ? "group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-colors open:border-cyan-300/25"
                : "group border-b-2 border-neutral-300 py-4 open:bg-neutral-200/50"
            }
          >
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-4 font-bold ${
                modern
                  ? "font-modern-display text-base text-white sm:text-lg"
                  : "text-sm uppercase tracking-tight text-neutral-900 sm:text-base"
              }`}
            >
              <span>{t(`faq.items.${item}.q`)}</span>
              <span
                aria-hidden
                className={`shrink-0 text-xl leading-none transition-transform duration-200 group-open:rotate-45 ${
                  modern ? "text-cyan-300" : "text-red-600"
                }`}
              >
                +
              </span>
            </summary>
            <p
              className={`mt-3 max-w-2xl leading-relaxed ${
                modern
                  ? "text-[0.875rem] text-cyan-50/60"
                  : `${MONO} text-sm text-neutral-600`
              }`}
            >
              {t(`faq.items.${item}.a`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
