"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PageFrame from "../components/PageFrame";
import ModernPageFrame from "../components/modern/ModernPageFrame";
import { useTheme } from "../components/ThemeContext";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const { theme } = useTheme();
  const modern = theme === "modern";

  const content = (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center px-6 py-24 text-start"
    >
      <span
        className={`font-[family-name:var(--font-space-mono)] text-xs font-bold uppercase tracking-[0.3em] ${
          modern ? "text-cyan-200/50" : "text-neutral-500"
        }`}
      >
        404
      </span>
      <h1
        id="not-found-title"
        className={`mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tighter sm:text-6xl ${
          modern ? "text-white" : "text-neutral-900"
        }`}
      >
        {t("title")}
      </h1>
      <p
        className={`mt-5 max-w-xl font-[family-name:var(--font-space-mono)] text-sm leading-relaxed sm:text-base ${
          modern ? "text-cyan-50/60" : "text-neutral-600"
        }`}
      >
        {t("description")}
      </p>
      <Link
        href="/"
        className={`mt-8 inline-flex items-center gap-2 border-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors ${
          modern
            ? "border-cyan-300 bg-cyan-300 text-[#041419] hover:bg-transparent hover:text-cyan-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        }`}
      >
        {t("back")}
      </Link>
    </section>
  );

  return (
    <>
      <meta name="robots" content="noindex" />
      {modern ? (
        <ModernPageFrame title={t("title")}>{content}</ModernPageFrame>
      ) : (
        <PageFrame title={t("title")}>{content}</PageFrame>
      )}
    </>
  );
}
