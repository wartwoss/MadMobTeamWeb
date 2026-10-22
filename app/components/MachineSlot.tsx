"use client";

import type { CSSProperties } from "react";

const MONO = "font-[family-name:var(--font-space-mono)]";

type MachineSlotProps = {
  index: number;
  code: string;
  name: string;
  tag: string;
  selected: boolean;
  onSelect: (code: string) => void;
};

function Coil() {
  return (
    <svg
      viewBox="0 0 120 22"
      preserveAspectRatio="none"
      aria-hidden
      className="mt-1.5 h-5 w-full sm:h-6"
    >
      {[0, 1, 2, 3, 4].map((row) => (
        <ellipse
          key={row}
          cx="60"
          cy={3 + row * 4}
          rx="57"
          ry="3.2"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.6"
        />
      ))}
    </svg>
  );
}

export default function MachineSlot({
  index,
  code,
  name,
  tag,
  selected,
  onSelect,
}: MachineSlotProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <button
      type="button"
      onClick={() => onSelect(code)}
      aria-pressed={selected}
      aria-label={`${code} ${name}`}
      style={{ "--i": index } as CSSProperties}
      className={`boot-slot group relative flex h-full flex-col border-2 p-2 text-start transition-all duration-150 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:p-2.5 ${
        selected
          ? "border-red-600 bg-red-600/15 shadow-[5px_5px_0_0_#dc2626]"
          : "border-white/70 bg-neutral-950 hover:-translate-y-1 hover:border-red-600 hover:shadow-[5px_5px_0_0_#dc2626]"
      }`}
    >
      <div
        className={`flex h-14 items-center justify-center border-2 sm:h-16 ${
          selected
            ? "border-red-600 bg-red-600 text-white"
            : "border-white/25 bg-white text-black"
        }`}
      >
        <span className="text-xl font-black uppercase leading-none sm:text-2xl">
          {initials}
        </span>
      </div>

      <div className="mt-2">
        <p className="truncate text-[0.6875rem] font-black uppercase leading-tight tracking-tight text-white sm:text-xs">
          {name}
        </p>
        <p
          className={`${MONO} mt-0.5 truncate text-[0.5rem] uppercase tracking-widest text-neutral-400 sm:text-[0.5625rem]`}
        >
          {tag}
        </p>
      </div>

      <div className="mt-auto pt-2">
        <div className="h-[3px] w-full bg-white/30" />
        <Coil />
      </div>
    </button>
  );
}
