"use client";

import { useTranslations } from "next-intl";

const ITEMS = ["q1", "q2", "q3", "q4"] as const;
const MONO = "font-[family-name:var(--font-space-mono)]";

/* Visible FAQ. The same questions are emitted as FAQPage JSON-LD by the
   About page, which is why the copy lives in the About namespace. */
export default function FaqSection() {
  const t = useTranslations("About");

  return (
    <section aria-labelledby="faq-title" className="mt-16 sm:mt-20">
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

      <div className="mt-6 border-t-2 border-neutral-900">
        {ITEMS.map((item, index) => (
          <details
            key={item}
            open={index === 0}
            className="group border-b-2 border-neutral-300 py-4 open:bg-neutral-200/50"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold uppercase tracking-tight text-neutral-900 sm:text-base">
              <span>{t(`faq.items.${item}.q`)}</span>
              <span
                aria-hidden
                className="shrink-0 text-xl leading-none text-red-600 transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p
              className={`mt-3 max-w-2xl ${MONO} text-sm leading-relaxed text-neutral-600`}
            >
              {t(`faq.items.${item}.a`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
