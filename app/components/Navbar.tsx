"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SITE_NAME } from "@/app/lib/site";
import { useTheme, type Theme } from "./ThemeContext";

function SettingsContent() {
  const t = useTranslations("Settings");
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const isArabicScript = locale === "ar" || locale === "ckb";
  const size = isArabicScript ? "text-lg" : "text-base";
  const tracking = isArabicScript ? "tracking-normal" : "tracking-widest";

  const themeButton = (value: Theme) =>
    `cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] ${size} transition-all ${
      theme === value
        ? "bg-white text-black"
        : "text-white hover:bg-white hover:text-black"
    }`;

  return (
    <div className="w-full">
      <div className={`mb-3 border-b-2 border-white pb-2 font-[family-name:var(--font-space-mono)] ${size} font-bold uppercase ${tracking} text-white`}>
        {t("theme")}
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTheme("brutalistic")}
          aria-pressed={theme === "brutalistic"}
          className={themeButton("brutalistic")}
        >
          {t("brutalistic")}
        </button>
        <button
          type="button"
          onClick={() => setTheme("modern")}
          aria-pressed={theme === "modern"}
          className={themeButton("modern")}
        >
          {t("modern")}
        </button>
      </div>
      <div className={`border-b-2 border-white pb-2 font-[family-name:var(--font-space-mono)] ${size} font-bold uppercase ${tracking} text-white`}>
        {t("language")}
      </div>
      <LanguageButtons />
    </div>
  );
}

function LanguageButtons() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const size =
    locale === "ar" || locale === "ckb" ? "text-lg" : "text-base";

  function switchLocale(locale: string) {
    router.replace(pathname, {locale});
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => switchLocale("en")}
        aria-current={locale === "en" ? "true" : undefined}
        className={`cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] ${size} transition-all ${
          locale === "en"
            ? "bg-white text-black"
            : "text-white hover:bg-white hover:text-black"
        }`}
      >
        En
      </button>
      <button
        type="button"
        onClick={() => switchLocale("ar")}
        aria-current={locale === "ar" ? "true" : undefined}
        className={`cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] ${size} transition-all ${
          locale === "ar"
            ? "bg-white text-black"
            : "text-white hover:bg-white hover:text-black"
        }`}
      >
        Ar
      </button>
      <button
        type="button"
        onClick={() => switchLocale("ckb")}
        aria-current={locale === "ckb" ? "true" : undefined}
        className={`cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] ${size} transition-all ${
          locale === "ckb"
            ? "bg-white text-black"
            : "text-white hover:bg-white hover:text-black"
        }`}
      >
        Kur
      </button>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const isArabicScript = locale === "ar" || locale === "ckb";

  return (
    <nav aria-label={t("primary")} className="relative border-b-4 border-white bg-black">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          aria-label={SITE_NAME}
          className="border-4 border-white bg-white px-3 py-1 text-xl font-black capitalize text-black tracking-tighter transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0_0_#333] hover:bg-black hover:text-white sm:px-5 sm:py-2 sm:text-3xl"
          style={{ transform: "skewX(-6deg)" }}
        >
          <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>
            MadMobTeam
          </span>
        </Link>

        <div className={`hidden items-center md:flex ${isArabicScript ? "gap-4 lg:gap-8" : "gap-6 lg:gap-10"}`}>
          <Link
            href="/projects"
            aria-current={pathname === "/projects" ? "page" : undefined}
            className={`border-b-2 border-white font-[family-name:var(--font-display)] font-bold uppercase text-white transition-colors hover:bg-white hover:text-black ${
              isArabicScript
                ? "text-xl tracking-normal lg:text-2xl"
                : "text-lg tracking-[0.16em] lg:text-xl"
            }`}
          >
            {t("projects")}
          </Link>
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            className={`border-b-2 border-white font-[family-name:var(--font-display)] font-bold uppercase text-white transition-colors hover:bg-white hover:text-black ${
              isArabicScript
                ? "text-xl tracking-normal lg:text-2xl"
                : "text-lg tracking-[0.16em] lg:text-xl"
            }`}
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`border-b-2 border-white font-[family-name:var(--font-display)] font-bold uppercase text-white transition-colors hover:bg-white hover:text-black ${
              isArabicScript
                ? "text-xl tracking-normal lg:text-2xl"
                : "text-lg tracking-[0.16em] lg:text-xl"
            }`}
          >
            {t("contact")}
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setSettingsOpen((prev) => !prev)}
              aria-expanded={settingsOpen}
              aria-controls="desktop-settings"
              aria-label={t("settings")}
              className={`border-2 border-white px-4 py-1.5 font-[family-name:var(--font-display)] font-extrabold uppercase text-white transition-all hover:-translate-y-1 hover:skew-x-[-4deg] hover:bg-white hover:text-black ${
                isArabicScript
                  ? "text-xl tracking-normal lg:text-2xl"
                  : "text-lg tracking-[0.16em] lg:text-xl"
              }`}
              style={{ transform: "skewX(-4deg)" }}
            >
              <span style={{ display: "inline-block", transform: "skewX(4deg)" }}>
                {t("settings")}
              </span>
            </button>
            <div
              id="desktop-settings"
              className={`absolute end-0 top-full z-[70] mt-2 w-64 max-w-[calc(100vw-2rem)] border-4 border-white bg-black p-4 shadow-[6px_6px_0_0_#fff] transition-all ${
                settingsOpen
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              <SettingsContent />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setSettingsOpen(false);
            }}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("closeMenu") : t("menu")}
            className="bg-neutral-800 p-2 text-white transition-all hover:bg-white hover:text-black"
          >
            <span
              className="block transition-transform duration-300"
              style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {menuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`relative z-[70] overflow-hidden bg-black transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col">
          <Link
            href="/projects"
            aria-current={pathname === "/projects" ? "page" : undefined}
            className={`border-b-2 border-white px-6 py-3 font-[family-name:var(--font-display)] font-bold uppercase text-white transition-colors hover:bg-white hover:text-black ${
              isArabicScript ? "text-2xl tracking-normal" : "text-xl tracking-[0.16em]"
            }`}
          >
            {t("projects")}
          </Link>
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            className={`border-b-2 border-white px-6 py-3 font-[family-name:var(--font-display)] font-bold uppercase text-white transition-colors hover:bg-white hover:text-black ${
              isArabicScript ? "text-2xl tracking-normal" : "text-xl tracking-[0.16em]"
            }`}
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`border-b-2 border-white px-6 py-3 font-[family-name:var(--font-display)] font-bold uppercase text-white transition-colors hover:bg-white hover:text-black ${
              isArabicScript ? "text-2xl tracking-normal" : "text-xl tracking-[0.16em]"
            }`}
          >
            {t("contact")}
          </Link>
          <button
            type="button"
            onClick={() => setSettingsOpen((prev) => !prev)}
            aria-expanded={settingsOpen}
            aria-controls="mobile-settings"
            className={`px-6 py-3 text-start font-[family-name:var(--font-display)] font-bold uppercase text-white transition-colors hover:bg-white hover:text-black ${
              isArabicScript ? "text-2xl tracking-normal" : "text-xl tracking-[0.16em]"
            }`}
          >
            {t("settings")}
          </button>
          <div
            id="mobile-settings"
            className={`overflow-hidden transition-all duration-300 ${
              settingsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 py-4">
              <SettingsContent />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}