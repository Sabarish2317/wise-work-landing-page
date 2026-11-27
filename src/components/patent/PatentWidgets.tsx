"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";
import { WidgetHeader } from "@/components/sections/HeroWidgets";

/** Illustrative UI snippets for the Patent Gym™ hero. Figures are sample data, not client data. */

const HARVEST_FINDS = [
  { title: "Adaptive cache eviction", tag: "Strong", tone: "good" },
  { title: "Multi-cloud cost router", tag: "Strong", tone: "good" },
  { title: "Log anomaly fingerprint", tag: "Review", tone: "warn" },
] as const;

export const HarvestScan = () => (
  <>
    <WidgetHeader logo="/deck/icons/harvesting.png" title="Harvesting scan" badge={<span className="text-[10px] whitespace-nowrap text-muted">core-api</span>} />
    <div className="mb-2.5 flex items-baseline justify-between">
      <span className="font-mono text-[24px] leading-none font-medium text-ink">12</span>
      <span className="text-[10.5px] text-muted">hidden inventions found</span>
    </div>
    <span className="mb-3 block h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
      <motion.span
        className="block h-full rounded-full bg-brand"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ delay: 1.4, duration: 2.2, ease: "easeInOut" }}
      />
    </span>
    <div className="flex flex-col gap-1.5">
      {HARVEST_FINDS.map((find, i) => (
        <motion.div
          key={find.title}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 + i * 0.25, duration: 0.6, ease: EASE_OUT_EXPO }}
          className="flex items-center justify-between rounded-lg bg-[#f6f7f9] px-2 py-1.5"
        >
          <span className="text-[11px] text-ink">{find.title}</span>
          <span
            className={`rounded-full px-1.5 py-0.5 text-[9.5px] font-medium ${
              find.tone === "good" ? "bg-good/10 text-good" : "bg-warn/10 text-warn"
            }`}
          >
            {find.tag}
          </span>
        </motion.div>
      ))}
    </div>
  </>
);

const RING = 2 * Math.PI * 30;

export const NoveltyGauge = () => (
  <>
    <WidgetHeader logo="/deck/icons/evaluation.png" title="Evaluation" badge={<span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-medium text-brand">MBrain™</span>} />
    <div className="flex items-center gap-3">
      <div className="relative size-[76px] shrink-0">
        <svg viewBox="0 0 76 76" className="size-full -rotate-90">
          <circle cx="38" cy="38" r="30" fill="none" stroke="rgb(0 0 0 / 0.06)" strokeWidth="7" />
          <motion.circle
            cx="38"
            cy="38"
            r="30"
            fill="none"
            stroke="url(#novelty-gradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={RING}
            initial={{ strokeDashoffset: RING }}
            animate={{ strokeDashoffset: RING * (1 - 0.86) }}
            transition={{ delay: 1.5, duration: 1.6, ease: EASE_OUT_EXPO }}
          />
          <defs>
            <linearGradient id="novelty-gradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#8f8cff" />
              <stop offset="100%" stopColor="#1c74fa" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-[18px] leading-none font-medium text-ink">86</span>
          <span className="text-[8.5px] text-muted">novelty</span>
        </span>
      </div>
      <div className="flex flex-col gap-1.5 text-[10.5px]">
        {[
          ["Inventive step", "High"],
          ["Prior art hits", "3"],
          ["Commercial fit", "91"],
        ].map(([label, value]) => (
          <span key={label} className="flex justify-between gap-3">
            <span className="text-black/65">{label}</span>
            <span className="font-medium text-ink">{value}</span>
          </span>
        ))}
      </div>
    </div>
  </>
);

const DRAFT_STEPS = [
  { label: "Claims", done: true },
  { label: "Figures", done: true },
  { label: "Abstract", done: false },
];

export const DraftProgress = () => (
  <>
    <WidgetHeader logo="/deck/icons/drafting.png" title="Patent draft" badge={<span className="text-[10px] text-muted">v3</span>} />
    <div className="mb-3 space-y-1.5 rounded-lg bg-[#f6f7f9] p-2.5">
      {[92, 100, 76, 88, 54].map((width, i) => (
        <motion.span
          key={i}
          className="block h-1.5 rounded-full bg-black/10"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ delay: 1.5 + i * 0.12, duration: 0.8, ease: EASE_OUT_EXPO }}
        />
      ))}
    </div>
    <div className="flex flex-col gap-1.5">
      {DRAFT_STEPS.map((step, i) => (
        <motion.span
          key={step.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 + i * 0.2 }}
          className="flex items-center justify-between text-[11px]"
        >
          <span className="flex items-center gap-1.5 text-ink">
            <span
              className={`flex size-3.5 items-center justify-center rounded-full text-[8px] text-white ${step.done ? "bg-good" : "border border-warn bg-white"}`}
            >
              {step.done ? "✓" : ""}
            </span>
            {step.label}
          </span>
          <span className={step.done ? "text-good" : "text-warn"}>{step.done ? "Done" : "Human review"}</span>
        </motion.span>
      ))}
    </div>
  </>
);

const GRANTS = [
  { region: "US", value: 38 },
  { region: "IN", value: 30 },
  { region: "EP", value: 18 },
  { region: "Other", value: 14 },
];

export const GrantsChart = () => (
  <>
    <WidgetHeader logo="/deck/icons/portfolio.png" title="Portfolio" badge={<span className="text-[10px] text-muted">Grants</span>} />
    <p className="font-mono text-[24px] leading-none font-medium text-ink">100+</p>
    <p className="mt-1 mb-3 text-[10.5px] text-muted">patents granted worldwide</p>
    <div className="flex h-[64px] items-end gap-2.5">
      {GRANTS.map((grant, i) => (
        <div key={grant.region} className="flex flex-1 flex-col items-center gap-1">
          <motion.span
            className="w-full rounded-t-md bg-gradient-to-t from-brand to-[#8fb8ff]"
            initial={{ height: 0 }}
            animate={{ height: `${(grant.value / 38) * 48}px` }}
            transition={{ delay: 1.6 + i * 0.12, duration: 1, ease: EASE_OUT_EXPO }}
          />
          <span className="text-[9.5px] text-muted">{grant.region}</span>
        </div>
      ))}
    </div>
  </>
);

/** Small decorative illustrations for the three Patent Gym™ offering cards. */
export const HarvestIllustration = () => (
  <div aria-hidden className="relative w-full overflow-hidden rounded-lg border border-line bg-white p-3">
    <div className="space-y-1.5">
      {[88, 64, 92, 48, 76].map((width, i) => (
        <span key={i} className={`block h-1.5 rounded-full ${i === 2 ? "bg-brand/50" : "bg-black/[0.07]"}`} style={{ width: `${width}%` }} />
      ))}
    </div>
    <motion.span
      className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-brand/15 to-transparent"
      animate={{ top: ["-20%", "100%"] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    />
    <span className="absolute top-2 right-2 rounded-full bg-good/10 px-1.5 py-0.5 text-[9px] font-medium text-good">+1 found</span>
  </div>
);

export const SeedIllustration = () => (
  <svg aria-hidden viewBox="0 0 140 64" className="h-16 w-full">
    {[14, 32, 50].map((y, i) => (
      <motion.path
        key={y}
        d={`M24 32 C 60 32, 70 ${y}, 104 ${y}`}
        fill="none"
        stroke="#1c74fa"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + i * 0.15, duration: 0.9, ease: EASE_OUT_EXPO }}
      />
    ))}
    <circle cx="24" cy="32" r="9" fill="#1c74fa" />
    <text x="24" y="35.5" textAnchor="middle" fontSize="10" fill="white">★</text>
    {[14, 32, 50].map((y, i) => (
      <motion.circle
        key={y}
        cx="110"
        cy={y}
        r="6"
        fill="white"
        stroke="#1c74fa"
        strokeWidth="1.5"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9 + i * 0.15, type: "spring", stiffness: 300, damping: 15 }}
      />
    ))}
  </svg>
);

export const OtherIpIllustration = () => (
  <div aria-hidden className="flex w-full items-center justify-center gap-2">
    {["©", "™", "®", "℠"].map((mark, i) => (
      <motion.span
        key={mark}
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: EASE_OUT_EXPO }}
        className="flex size-10 items-center justify-center rounded-xl border border-line bg-white font-mono text-lg text-brand shadow-[0_6px_16px_-8px_rgb(28_116_250/0.4)]"
      >
        {mark}
      </motion.span>
    ))}
  </div>
);

export const ENGINE_ICONS = [
  "/deck/icons/harvesting.png",
  "/deck/icons/seeding.png",
  "/deck/icons/evaluation.png",
  "/deck/icons/drafting.png",
  "/deck/icons/portfolio.png",
  "/deck/icons/commercialization.png",
];

const FLOW_STEPS = ["Discover", "Seed", "Evaluate", "Draft", "Manage", "Monetize"];

/** Innovation-to-IP pipeline: six engine icons on a track with a pulse running along it. */
export const EngineFlow = () => (
  <div aria-hidden className="relative w-full overflow-hidden rounded-xl border-2 border-line bg-white px-4 py-6 sm:px-8 sm:py-8">
    <div
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{ backgroundImage: "radial-gradient(circle at 50% 120%, rgb(28 116 250 / 0.10), transparent 60%)" }}
    />
    <div className="relative">
      <span className="absolute top-[22px] right-[8%] left-[8%] border-t-2 border-dashed border-brand/25 sm:top-[26px]" />
      <motion.span
        className="absolute top-[18px] size-2.5 rounded-full bg-brand shadow-[0_0_14px_#1c74fa] sm:top-[22px]"
        animate={{ left: ["8%", "92%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <ol className="relative grid grid-cols-6 gap-1">
        {FLOW_STEPS.map((step, i) => (
          <motion.li
            key={step}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: EASE_OUT_EXPO }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-white shadow-[0_8px_20px_-10px_rgb(28_116_250/0.5)] sm:size-[52px]">
              <Image src={ENGINE_ICONS[i]} alt="" width={56} height={56} className="size-6 sm:size-7" />
            </span>
            <span className="text-[10.5px] font-medium text-ink sm:text-[13px]">{step}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  </div>
);

/** MBrain™ core with the five layers orbiting it. */
export const MBrainOrbit = () => (
  <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[380px]">
    {[100, 76, 52].map((size, i) => (
      <motion.span
        key={size}
        className="absolute rounded-full border border-dashed border-brand/25"
        style={{ inset: `${(100 - size) / 2}%` }}
        animate={{ rotate: i % 2 ? -360 : 360 }}
        transition={{ duration: 40 + i * 12, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-brand/70 shadow-[0_0_10px_#1c74fa]" />
      </motion.span>
    ))}
    <div className="absolute inset-[34%] flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-deep to-brand text-white shadow-[0_20px_60px_-10px_rgb(28_116_250/0.6)]">
      <span className="text-[15px] font-medium sm:text-lg">MBrain™</span>
      <span className="text-[10px] text-white/80 sm:text-[11px]">23+ yrs of IP know-how</span>
    </div>
    {[
      { label: "Engines", pos: "top-[6%] left-1/2 -translate-x-1/2" },
      { label: "Decision layer", pos: "top-1/2 right-0 -translate-y-1/2" },
      { label: "Multi-model fabric", pos: "bottom-[6%] left-1/2 -translate-x-1/2" },
      { label: "Knowledge graph", pos: "top-1/2 left-0 -translate-y-1/2" },
    ].map((chip, i) => (
      <motion.span
        key={chip.label}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE_OUT_EXPO }}
        className={`absolute rounded-full border border-line bg-white/90 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-ink shadow-[0_6px_16px_-8px_rgb(28_116_250/0.4)] backdrop-blur-sm ${chip.pos}`}
      >
        {chip.label}
      </motion.span>
    ))}
  </div>
);
