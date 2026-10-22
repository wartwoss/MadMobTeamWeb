"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROD_WIDTH = 18;
const ROD_MID = ROD_WIDTH / 2;

// Dark gunmetal: near-black rims, a subdued specular line, faint reflected rim.
const ROD_METAL = [
  "#040507 0%",
  "#0b0f13 5%",
  "#171d23 15%",
  "#29313a 28%",
  "#3f4953 38%",
  "#55606b 45%",
  "#6b7681 47%",
  "#49535d 54%",
  "#2c343c 70%",
  "#191f25 84%",
  "#0c1014 93%",
  "#040507 100%",
].join(", ");

// Contact shadow where the rod meets the bar above and the card below.
const ROD_SHADE =
  "linear-gradient(180deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0) 9px, rgba(0,0,0,0) calc(100% - 9px), rgba(0,0,0,0.6) 100%)";

const BOLT =
  "radial-gradient(circle at 35% 30%, #6a747e 0%, #2b323a 45%, #0a0d10 100%)";

const rodVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  shown: (delay: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

const mountVariants = {
  hidden: { opacity: 0, y: -6 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: 0.45 },
  },
};

export default function TrapezoidChains() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0 }}
    >
      {/* the rod */}
      <motion.div
        variants={rodVariants}
        custom={0.5}
        className="absolute left-1/2 origin-bottom"
        style={{
          width: ROD_WIDTH,
          marginLeft: -ROD_MID,
          top: "calc(-1 * var(--chain-nav-overlap))",
          height:
            "calc(var(--chain-gap-top) + var(--chain-trap-overlap) + var(--chain-nav-overlap))",
          backgroundImage: `${ROD_SHADE}, linear-gradient(90deg, ${ROD_METAL})`,
          boxShadow: "3px 2px 7px rgba(0, 0, 0, 0.22)",
        }}
      />

      {/* mounting plate bolted to the bar the rod hangs from */}
      <motion.div
        variants={mountVariants}
        className="absolute left-1/2 flex items-center justify-between rounded-[1px]"
        style={{
          top: "calc(-1 * var(--chain-nav-overlap))",
          width: 38,
          height: 14,
          marginLeft: -19,
          padding: "0 6px",
          backgroundImage:
            "linear-gradient(180deg, #434c55 0%, #262d34 38%, #10151a 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.7), 2px 2px 5px rgba(0,0,0,0.38)",
        }}
      >
        <span
          className="block rounded-full"
          style={{
            width: 5,
            height: 5,
            backgroundImage: BOLT,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.65)",
          }}
        />
        <span
          className="block rounded-full"
          style={{
            width: 5,
            height: 5,
            backgroundImage: BOLT,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.65)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
