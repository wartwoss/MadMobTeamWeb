"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  Bars3Icon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useTheme, type Theme } from "../ThemeContext";
import { EASE, SPRING } from "./motion";

const NAV_LINKS = [
  { href: "/projects", labelKey: "projects" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
] as const;

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-teal-500 font-modern-display text-lg font-extrabold text-[#041419] shadow-[0_0_22px_rgba(34,211,238,0.35)]">
        M
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/40" />
      </span>
      {!compact && (
        <span className="font-modern-display text-sm font-bold tracking-tight text-white">
          MADMOB
          <span className="modern-gradient-text font-extrabold">TEAM</span>
        </span>
      )}
    </span>
  );
}

function SettingsPanel({ idSuffix }: { idSuffix: string }) {
  const t = useTranslations("Settings");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const bigger = locale === "ar" || locale === "ckb";

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  const themes: { value: Theme; label: string }[] = [
    { value: "brutalistic", label: t("brutalistic") },
    { value: "modern", label: t("modern") },
  ];

  const languages = [
    { value: "en", label: "En" },
    { value: "ar", label: "Ar" },
    { value: "ckb", label: "Kur" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.25em] text-cyan-200/60">
          {t("theme")}
        </p>
        <div className="grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {themes.map((option) => {
            const active = theme === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                aria-pressed={active}
                className={`relative cursor-pointer rounded-full px-3 py-1.5 font-modern-display font-semibold transition-colors duration-200 ${
                  bigger ? "text-sm" : "text-xs"
                } ${
                  active
                    ? "text-[#041419]"
                    : "text-cyan-50/60 hover:text-cyan-50"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId={`theme-seg-${idSuffix}`}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 to-teal-400 shadow-[0_0_18px_rgba(34,211,238,0.45)]"
                    transition={SPRING}
                  />
                )}
                <span className="relative z-10">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.25em] text-cyan-200/60">
          {t("language")}
        </p>
        <div className="flex gap-2">
          {languages.map((option) => {
            const active = locale === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => switchLocale(option.value)}
                aria-current={active ? "true" : undefined}
                className={`cursor-pointer rounded-full border px-4 py-1.5 font-modern-display font-semibold transition-all duration-200 ${
                  bigger ? "text-sm" : "text-xs"
                } ${
                  active
                    ? "border-cyan-300/50 bg-cyan-400/15 text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.2)]"
                    : "border-white/10 bg-white/[0.03] text-cyan-50/55 hover:border-cyan-300/30 hover:text-cyan-50"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ModernNavbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  /* Slip away on scroll-down, glide back on scroll-up. */
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastY.current;
    lastY.current = latest;
    if (latest < 160) {
      setHidden(false);
      return;
    }
    setHidden(latest > previous && latest > 320);
  });

  /* Dismiss the settings popover on any outside interaction. */
  useEffect(() => {
    if (!settingsOpen) return;
    function onPointerDown(event: PointerEvent) {
      const node = settingsRef.current;
      if (node && !node.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [settingsOpen]);

  return (
    <motion.header
      className="sticky top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-4"
      animate={{ y: hidden ? -96 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <nav
        aria-label={t("primary")}
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#071e26]/75 px-4 py-2.5 shadow-[0_10px_40px_rgba(2,12,16,0.55)] backdrop-blur-xl sm:px-5"
      >
        <Link
          href="/"
          aria-label="MadMobTeam"
          className="group rounded-xl transition-transform duration-300 hover:scale-[1.03]"
        >
          <Logo />
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 font-modern-display font-medium transition-colors duration-200 ${
                  active
                    ? "text-white"
                    : "text-cyan-50/55 hover:text-cyan-50"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill-modern"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.09]"
                    transition={SPRING}
                  />
                )}
                <span className="relative z-10">{t(link.labelKey)}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {/* settings (desktop popover) */}
          <div className="relative hidden md:block" ref={settingsRef}>
            <button
              type="button"
              onClick={() => setSettingsOpen((prev) => !prev)}
              aria-expanded={settingsOpen}
              aria-controls="modern-desktop-settings"
              aria-label={t("settings")}
              className="group grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/[0.04] text-cyan-100/80 transition-all duration-300 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-100"
            >
              <Cog6ToothIcon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
            </button>
            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  id="modern-desktop-settings"
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="absolute end-0 top-full z-[110] mt-3 w-72 origin-top rounded-3xl border border-white/10 bg-[#08222b]/95 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
                >
                  <SettingsPanel idSuffix="desktop" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* mobile hamburger */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setSettingsOpen(false);
            }}
            aria-expanded={menuOpen}
            aria-controls="modern-mobile-nav"
            aria-label={menuOpen ? t("closeMenu") : t("menu")}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/[0.04] text-cyan-100/80 transition-colors hover:bg-cyan-400/10 md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "x" : "bars"}
                initial={{ rotate: menuOpen ? -45 : 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: menuOpen ? 45 : -45, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {menuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="modern-mobile-nav"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="mx-auto mt-2 max-w-6xl origin-top rounded-3xl border border-white/10 bg-[#08222b]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-2xl px-4 py-3 font-modern-display font-medium transition-colors ${
                      active
                        ? "border border-cyan-300/25 bg-cyan-400/10 text-white"
                        : "text-cyan-50/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 border-t border-white/10 pt-5">
              <SettingsPanel idSuffix="mobile" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
