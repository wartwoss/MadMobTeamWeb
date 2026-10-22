"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";

const MONO = "font-[family-name:var(--font-space-mono)]";
const LABEL = `${MONO} text-[0.5625rem] font-bold uppercase tracking-[0.3em] text-white/50`;

export type MachineProject = {
  code: string;
  name: string;
  price: string;
  year: string;
  stack: string[];
};

type MachineDetailsProps = {
  project: MachineProject | null;
  onClear: () => void;
};

export default function MachineDetails({
  project,
  onClear,
}: MachineDetailsProps) {
  const t = useTranslations("Machine");

  return (
    <div
      className="boot-fade border-4 border-black bg-black text-white"
      style={{ "--boot-delay": "0.5s" } as CSSProperties}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 border-b-2 border-white/20 px-3 py-2">
        <span
          className={`${MONO} whitespace-nowrap text-[0.5625rem] uppercase tracking-[0.1em] text-white/50`}
        >
          {t("details.header")}
        </span>
        <span className="ms-auto flex shrink-0 items-center gap-1.5">
          <span className="h-2 w-2 animate-blink bg-red-600" />
          <span
            className={`${MONO} whitespace-nowrap text-[0.5625rem] uppercase tracking-[0.1em] text-red-500`}
          >
            {t("details.selected")}
          </span>
        </span>
      </div>

      <div aria-live="polite" className="p-3 sm:p-4">
        {project ? (
          <>
            <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter sm:text-4xl">
              {project.name}
            </h3>
            <p
              className={`${MONO} mt-1.5 text-[0.5625rem] uppercase tracking-[0.25em] text-white/50`}
            >
              {t(`projects.${project.code}.tag`)}
            </p>

            <div className="my-4 h-[3px] w-full bg-white/20" />

            <p className={LABEL}>{t("details.description")}</p>
            <p
              className={`${MONO} mt-2 text-xs leading-relaxed text-white/80`}
            >
              {t(`projects.${project.code}.description`)}
            </p>

            <div className="my-4 h-[3px] w-full bg-white/20" />

            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <span className={LABEL}>{t("details.year")}</span>
              <span className={`${MONO} text-xs font-bold tracking-widest`}>
                {project.year}
              </span>
            </div>

            <p className={`${LABEL} mt-4`}>{t("details.stack")}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className={`${MONO} border-2 border-white/70 px-2 py-0.5 text-[0.5625rem] uppercase tracking-widest`}
                >
                  {item}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={onClear}
              className={`${MONO} mt-5 w-full cursor-pointer border-2 border-white py-2 text-[0.625rem] font-bold uppercase tracking-[0.25em] transition-all hover:bg-white hover:text-black focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
            >
              {t("details.clear")}
            </button>
          </>
        ) : (
          <div className="flex min-h-[248px] flex-col justify-between gap-6">
            <div>
              <p
                className={`${MONO} text-[0.625rem] uppercase tracking-widest text-white/50`}
              >
                &gt; {t("details.awaiting")}
                <span className="animate-blink text-red-600">_</span>
              </p>
              <h3 className="mt-3 text-2xl font-black uppercase leading-[0.95] tracking-tighter text-white/35 sm:text-3xl">
                {t("details.empty")}
              </h3>
            </div>
            <p
              className={`${MONO} text-[0.5625rem] uppercase leading-relaxed tracking-[0.2em] text-white/40`}
            >
              {t("details.hint")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
