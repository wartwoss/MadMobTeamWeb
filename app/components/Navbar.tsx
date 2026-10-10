"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function SettingsContent() {
  const t = useTranslations("Settings");

  return (
    <div className="w-full">
      <div className="mb-3 border-b-2 border-white pb-2 font-[family-name:var(--font-space-mono)] text-xs font-bold uppercase tracking-widest text-white">
        {t("theme")}
      </div>
      <div className="mb-3 flex gap-2">
        <span className="cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-xs text-white transition-all hover:bg-white hover:text-black">
          {t("brutalistic")}
        </span>
        <span className="cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-xs text-white transition-all hover:bg-white hover:text-black">
          {t("minimalistic")}
        </span>
      </div>
      <div className="mb-3 border-b-2 border-white pb-2 font-[family-name:var(--font-space-mono)] text-xs font-bold uppercase tracking-widest text-white">
        {t("fontSize")}
      </div>
      <div className="mb-3 flex gap-2">
        <span className="cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-xs text-white transition-all hover:bg-white hover:text-black">
          {t("sm")}
        </span>
        <span className="cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-xs text-white transition-all hover:bg-white hover:text-black">
          {t("md")}
        </span>
        <span className="cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-xs text-white transition-all hover:bg-white hover:text-black">
          {t("lg")}
        </span>
      </div>
      <div className="border-b-2 border-white pb-2 font-[family-name:var(--font-space-mono)] text-xs font-bold uppercase tracking-widest text-white">
        {t("language")}
      </div>
      <LanguageButtons />
    </div>
  );
}

function LanguageButtons() {
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(locale: string) {
    router.replace(pathname, {locale});
  }

  return (
    <div className="mt-2 flex gap-2">
      <button
        onClick={() => switchLocale("en")}
        className="cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-xs text-white transition-all hover:bg-white hover:text-black"
      >
        En
      </button>
      <button
        onClick={() => switchLocale("ar")}
        className="cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-xs text-white transition-all hover:bg-white hover:text-black"
      >
        Ar
      </button>
      <button
        onClick={() => switchLocale("ckb")}
        className="cursor-pointer border-2 border-white px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-xs text-white transition-all hover:bg-white hover:text-black"
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

  return (
    <nav className="border-b-4 border-white bg-black">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="border-4 border-white bg-white px-3 py-1 text-xl font-black capitalize text-black tracking-tighter transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0_0_#333] hover:bg-black hover:text-white sm:px-5 sm:py-2 sm:text-3xl"
          style={{ transform: "skewX(-6deg)" }}
        >
          <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>
            LOGO
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-10">
          <Link
            href="/projects"
            className="border-b-2 border-white font-[family-name:var(--font-space-mono)] text-xs font-bold capitalize tracking-widest text-white transition-colors hover:bg-white hover:text-black sm:text-sm"
          >
            {t("projects")}
          </Link>
          <Link
            href="/about"
            className="border-b-2 border-white font-[family-name:var(--font-space-mono)] text-xs font-bold capitalize tracking-widest text-white transition-colors hover:bg-white hover:text-black sm:text-sm"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="border-b-2 border-white font-[family-name:var(--font-space-mono)] text-xs font-bold capitalize tracking-widest text-white transition-colors hover:bg-white hover:text-black sm:text-sm"
          >
            {t("contact")}
          </Link>
          <div className="relative">
            <button
              onClick={() => setSettingsOpen((prev) => !prev)}
              className="border-2 border-white px-4 py-1.5 font-[family-name:var(--font-space-mono)] text-xs font-bold capitalize tracking-widest text-white transition-all hover:-translate-y-1 hover:skew-x-[-4deg] hover:bg-white hover:text-black"
              style={{ transform: "skewX(-4deg)" }}
            >
              <span style={{ display: "inline-block", transform: "skewX(4deg)" }}>
                {t("settings")}
              </span>
            </button>
            <div
              className={`absolute end-0 top-full z-50 mt-2 min-w-[200px] border-4 border-white bg-black p-4 shadow-[6px_6px_0_0_#fff] transition-all ${
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
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setSettingsOpen(false);
            }}
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
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col">
          <Link
            href="/projects"
            className="border-b-2 border-white px-6 py-3 font-[family-name:var(--font-space-mono)] text-sm font-bold capitalize tracking-widest text-white transition-colors hover:bg-white hover:text-black"
          >
            {t("projects")}
          </Link>
          <Link
            href="/about"
            className="border-b-2 border-white px-6 py-3 font-[family-name:var(--font-space-mono)] text-sm font-bold capitalize tracking-widest text-white transition-colors hover:bg-white hover:text-black"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="border-b-2 border-white px-6 py-3 font-[family-name:var(--font-space-mono)] text-sm font-bold capitalize tracking-widest text-white transition-colors hover:bg-white hover:text-black"
          >
            {t("contact")}
          </Link>
          <button
            onClick={() => setSettingsOpen((prev) => !prev)}
            className="px-6 py-3 text-start font-[family-name:var(--font-space-mono)] text-sm font-bold capitalize tracking-widest text-white transition-colors hover:bg-white hover:text-black"
          >
            {t("settings")}
          </button>
          <div
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