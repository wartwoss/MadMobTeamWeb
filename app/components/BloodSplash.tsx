import type { CSSProperties } from "react";

/* Each drip hangs off the underside of the team plaque. `edge` is the
   fraction of the plaque width, used to follow the slanted bottom edge. */
const TITLE_DRIPS = [
  { left: 11, edge: 0.09, length: 28, width: 5, delay: 1.05, fall: 3.8 },
  { left: 27, edge: 0.26, length: 42, width: 7, delay: 1.3, fall: 4.6 },
  { left: 48, edge: 0.47, length: 32, width: 5, delay: 1.55, fall: 4.1 },
  { left: 68, edge: 0.67, length: 54, width: 8, delay: 1.15, fall: 5.2 },
  { left: 86, edge: 0.85, length: 36, width: 6, delay: 1.42, fall: 4.4 },
];

export function BloodDrips({ show }: { show: boolean }) {
  return (
    <div aria-hidden className={`blood-drips${show ? " is-on" : ""}`}>
      <svg aria-hidden className="absolute h-0 w-0">
        <defs>
          <linearGradient id="blood-drip-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4c0507" />
            <stop offset="45%" stopColor="#7a0d0f" />
            <stop offset="100%" stopColor="#a31618" />
          </linearGradient>
        </defs>
      </svg>
      {TITLE_DRIPS.map((drip, index) => (
        <span
          key={index}
          className="blood-drip"
          style={
            {
              left: `${drip.left}%`,
              "--drip-w": `${drip.width}px`,
              "--drip-len": `${drip.length}px`,
              "--drip-delay": `${drip.delay}s`,
              "--drip-fall": `${drip.fall}s`,
              "--drip-edge": `${drip.edge}`,
            } as CSSProperties
          }
        >
          <svg
            aria-hidden
            viewBox="0 0 20 100"
            preserveAspectRatio="none"
            className="blood-drip-tail"
          >
            <path
              d="M10 0C9.2 12 7.6 24 6.8 38C6 52 4 58 2.8 68C1.4 79 1 87 2.8 93C4.4 98.4 7 100 10 100C13 100 15.6 98.4 17.2 93C19 87 18.6 79 17.2 68C16 58 14 52 13.2 38C12.4 24 10.8 12 10 0Z"
              fill="url(#blood-drip-gradient)"
            />
          </svg>
          <span className="blood-drip-fall" />
        </span>
      ))}
    </div>
  );
}

export default function BloodSplash({ show }: { show: boolean }) {
  return (
    <div
      aria-hidden
      className={`blood-splash pointer-events-none absolute inset-0 overflow-hidden${
        show ? " is-on" : ""
      }`}
    >
      <div className="blood-stain blood-stain--impact" />
      <div className="blood-stain blood-stain--drip" />
      <div className="blood-stain blood-stain--mist" />
      <div className="blood-stain blood-stain--flare" />
      <div className="blood-stain blood-stain--top" />
    </div>
  );
}
