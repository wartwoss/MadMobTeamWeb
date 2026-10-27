"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PageFrame from "../components/PageFrame";

export default function NotFound() {
  const t = useTranslations("NotFound");

  const content = (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center px-6 py-24 text-start"
    >
      <span className="font-[family-name:var(--font-space-mono)] text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">
        404
      </span>
      <h1
        id="not-found-title"
        className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tighter text-neutral-900 sm:text-6xl"
      >
        {t("title")}
      </h1>
      <p className="mt-5 max-w-xl font-[family-name:var(--font-space-mono)] text-sm leading-relaxed text-neutral-600 sm:text-base">
        {t("description")}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 border-2 border-black bg-black px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
      >
        {t("back")}
      </Link>
    </section>
  );

  return (
    <>
      <meta name="robots" content="noindex" />
      <PageFrame title={t("title")}>{content}</PageFrame>
    </>
  );
}
