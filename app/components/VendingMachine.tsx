"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import MachineSlot from "./MachineSlot";
import MachineDetails, { type MachineProject } from "./MachineDetails";
import { START } from "./Reveal";

const MONO = "font-[family-name:var(--font-space-mono)]";

/* Fires right when the page loader clears — same baseline the Reveal helpers use. */
const BOOT_MS = START * 1000;

/* Fake inventory — one code per slot (A-D rows, 1-3 columns).
   Names, prices and stack stay language-neutral; tag + description live in
   the "Machine.projects" messages for each locale. */
const PROJECTS: MachineProject[] = [
  {
    code: "A1",
    name: "Souq Sync",
    price: "$24.00",
    year: "2026",
    stack: ["Next.js", "Stripe", "Postgres"],
  },
  {
    code: "A2",
    name: "KurdCast",
    price: "$18.00",
    year: "2025",
    stack: ["React", "FFmpeg", "S3"],
  },
  {
    code: "A3",
    name: "Nomad CLI",
    price: "$09.00",
    year: "2025",
    stack: ["Node.js", "TypeScript", "Ink"],
  },
  {
    code: "B1",
    name: "Halabja Maps",
    price: "$16.00",
    year: "2024",
    stack: ["React Native", "Mapbox", "SQLite"],
  },
  {
    code: "B2",
    name: "Zozik Studio",
    price: "$30.00",
    year: "2026",
    stack: ["Three.js", "WebGL", "Blender"],
  },
];

const BULB_COUNT = 14;

function Marquee() {
  const t = useTranslations("Machine");
  const tMeta = useTranslations("Meta");

  return (
    <div
      className="boot-fade border-b-4 border-black bg-black px-4 py-4 sm:px-6"
      style={{ "--boot-delay": "0.4s" } as CSSProperties}
    >
      <div className="flex items-center justify-between gap-1.5">
        {Array.from({ length: BULB_COUNT }).map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 shrink-0 animate-blink sm:h-2.5 sm:w-2.5 ${
              index % 3 === 0 ? "bg-red-600" : "bg-white"
            }`}
            style={{ animationDelay: `${(index % 6) * 0.18}s` }}
          />
        ))}
      </div>

      <div className="mt-3 sm:mt-4">
        <h1
          id="projects-title"
          className="text-[clamp(1.75rem,8vw,3.75rem)] font-black uppercase leading-[0.85] tracking-tighter text-white"
        >
          {t("marquee.title")}
        </h1>
        <p className="mt-3 max-w-2xl font-[family-name:var(--font-space-mono)] text-xs leading-relaxed text-neutral-400 sm:text-sm">
          {tMeta("projects.intro")}
        </p>
      </div>
    </div>
  );
}

function GlassBay({
  selectedCode,
  onSelect,
}: {
  selectedCode: string | null;
  onSelect: (code: string) => void;
}) {
  const t = useTranslations("Machine");

  return (
    <div
      className="boot-fade relative min-w-0 flex-1 border-b-4 border-black bg-neutral-900 p-3 sm:p-5 lg:border-b-0 lg:border-e-4"
      style={{ "--boot-delay": "0.45s" } as CSSProperties}
    >
      <div className="relative overflow-hidden border-2 border-white/20 bg-neutral-950 p-2.5 sm:p-4">
        {/* glass reflection */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 bottom-[-25%] left-[-35%] w-[24%] rotate-[16deg] bg-white/[0.05]" />
          <div className="absolute -top-10 bottom-[-25%] left-[-12%] w-[9%] rotate-[16deg] bg-white/[0.04]" />
        </div>

        <div className="relative mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b-2 border-white/15 pb-2">
          <div className="flex items-center gap-2">
            <span
              className={`${MONO} text-[0.5625rem] uppercase tracking-[0.25em] text-white/50 sm:text-[0.625rem]`}
            >
              {t("glass.team")}
            </span>
            {/* Project count badge beside the team label. */}
            <span
              className={`${MONO} bg-red-600 px-2.5 py-0.5 text-[0.5625rem] font-bold uppercase leading-relaxed tracking-[0.2em] text-white sm:text-[0.625rem]`}
            >
              {t("marquee.slots")}
            </span>
          </div>
          <span
            className={`${MONO} text-[0.5625rem] uppercase tracking-[0.25em] text-red-500 sm:text-[0.625rem]`}
          >
            {t("glass.pick")}
          </span>
        </div>

        <div className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4">
          {PROJECTS.map((project, index) => (
            <MachineSlot
              key={project.code}
              index={index}
              code={project.code}
              name={project.name}
              tag={t(`projects.${project.code}.tag`)}
              selected={selectedCode === project.code}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DeliveryBin({ project }: { project: MachineProject | null }) {
  const t = useTranslations("Machine");

  return (
    <div
      className="boot-fade bg-neutral-200 px-4 py-4 sm:px-6"
      style={{ "--boot-delay": "0.95s" } as CSSProperties}
    >
      <div className="border-4 border-black bg-neutral-900 px-4 py-3 sm:py-4">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span
            className={`${MONO} text-[0.5625rem] uppercase tracking-[0.3em] text-white/50`}
          >
            {t("delivery.bay")}
          </span>
          <span
            className={`${MONO} text-[0.5625rem] uppercase tracking-[0.3em] ${
              project ? "text-red-500" : "text-white/40"
            }`}
          >
            {project ? t("delivery.dispensed") : t("delivery.waiting")}
          </span>
        </div>

        {project ? (
          <div
            key={project.code}
            className="dispense-ticket mt-3 border-4 border-black bg-white p-3 text-black shadow-[4px_4px_0_0_#dc2626] sm:p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
              <div className="min-w-0">
                <h3 className="truncate text-xl font-black uppercase leading-[0.95] tracking-tighter sm:text-2xl">
                  {project.name}
                </h3>
                <p
                  className={`${MONO} mt-1 truncate text-[0.5rem] uppercase tracking-[0.2em] text-neutral-500 sm:text-[0.5625rem]`}
                >
                  {t(`projects.${project.code}.tag`)}
                </p>
              </div>
              <span
                className={`${MONO} shrink-0 border-2 border-black px-2 py-0.5 text-[0.625rem] font-bold leading-none`}
              >
                {project.year}
              </span>
            </div>

            <div className="my-3 border-t-2 border-dashed border-black/30" />

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className={`${MONO} border-2 border-black px-1.5 py-0.5 text-[0.5rem] uppercase tracking-widest sm:text-[0.5625rem]`}
                >
                  {item}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className={`${MONO} mt-3 flex w-full items-center justify-between gap-2 border-2 border-black bg-red-600 px-3 py-2 text-[0.5625rem] font-bold uppercase tracking-[0.1em] text-white transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-[3px_3px_0_0_#000] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black sm:text-[0.625rem]`}
            >
              {t("delivery.cta")}
              <span aria-hidden className="rtl:rotate-180">
                →
              </span>
            </Link>
          </div>
        ) : (
          <div
            className="mt-3 flex min-h-12 items-center justify-center border-2 border-white/25 bg-black px-3 py-4 text-center sm:min-h-16"
            style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)" }}
          >
            <span
              className={`${MONO} text-[0.5rem] uppercase leading-relaxed tracking-[0.2em] text-white/35 sm:text-[0.5625rem]`}
            >
              {t("delivery.prompt")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VendingMachine() {
  const t = useTranslations("Machine");
  const sectionRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const selected =
    PROJECTS.find((project) => project.code === selectedCode) ?? null;

  /* Kick off the fade-in sequence once the page loader clears. Sets a single
     attribute so CSS does the work — no re-renders, no per-element JS. */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(
      () => node.setAttribute("data-boot", "on"),
      BOOT_MS,
    );
    return () => window.clearTimeout(timer);
  }, []);

  function handleSelect(code: string) {
    setSelectedCode((current) => (current === code ? null : code));
  }

  /* Bring the details into view after every pick — on phones the panel sits
     under the machine, on lg+ it opens in the right-hand column. The glass bay
     is much taller than the panel, so once the lower slots are on screen the
     panel has usually scrolled off above; scroll it back to the top of the
     viewport. Skipped when it is already fully visible so clicking a slot never
     yanks the page around. Measured after the re-render so the box we check is
     the one showing the newly selected project. */
  useEffect(() => {
    const node = detailsRef.current;
    if (!selectedCode || !node) return;

    const box = node.getBoundingClientRect();
    if (box.top >= 0 && box.bottom <= window.innerHeight) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, [selectedCode]);

  function handleClear() {
    setSelectedCode(null);
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="projects-title"
      className="relative border-b-4 border-black bg-neutral-100 px-4 py-10 sm:px-6 sm:py-14 lg:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div
          className="boot-fade border-4 border-black bg-white shadow-[8px_8px_0_0_#000] sm:shadow-[16px_16px_0_0_#000]"
          style={{ "--boot-duration": "0.8s" } as CSSProperties}
        >
          <Marquee />

          <div className="flex flex-col lg:flex-row">
            <GlassBay selectedCode={selectedCode} onSelect={handleSelect} />

            <aside className="w-full shrink-0 bg-neutral-100 p-4 sm:p-5 lg:w-[300px] xl:w-[330px]">
              <div ref={detailsRef} className="scroll-mt-4 sm:scroll-mt-6">
                <MachineDetails project={selected} onClear={handleClear} />
              </div>
            </aside>
          </div>

          <div
            className="boot-fade h-3 border-t-4 border-black"
            style={{
              "--boot-delay": "0.85s",
              backgroundImage:
                "repeating-linear-gradient(45deg, #000 0 8px, #dc2626 8px 16px)",
            } as CSSProperties}
          />

          <DeliveryBin project={selected} />

          <div
            className="boot-fade flex items-center justify-between border-t-4 border-black bg-black px-4 py-2 sm:px-6"
            style={{ "--boot-delay": "1.05s" } as CSSProperties}
          >
            <span
              className={`${MONO} text-[0.5625rem] uppercase tracking-[0.3em] text-white/40`}
            >
              {t("base.location")}
            </span>
            <span className="flex items-center gap-1.5">
              {[0, 1, 2].map((index) => (
                <span key={index} className="h-2 w-2 rounded-full bg-white/30" />
              ))}
            </span>
            <span
              className={`${MONO} text-[0.5625rem] uppercase tracking-[0.3em] text-white/40`}
            >
              {t("base.est")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
