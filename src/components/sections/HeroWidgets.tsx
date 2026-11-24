"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";

type WidgetProps = {
  className: string;
  delay: number;
  /** How strongly the card follows the pointer; negative values move against it. */
  depth: number;
  /** Which way the card drifts as the hero scrolls away. */
  drift: -1 | 1;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scroll: MotionValue<number>;
  children: ReactNode;
};

/** Glass card that enters after the headline, floats, follows the pointer and drifts out on scroll. */
const Widget = ({ className, delay, depth, drift, pointerX, pointerY, scroll, children }: WidgetProps) => {
  const x = useTransform([pointerX, scroll], ([px, s]: number[]) => px * depth + s * drift * 90);
  const y = useTransform([pointerY, scroll], ([py, s]: number[]) => py * depth - s * 40);
  const opacity = useTransform(scroll, [0, 0.7], [1, 0]);

  return (
    <motion.div style={{ x, y, opacity }} className={`pointer-events-auto absolute ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.92, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay * 1.3 }}
          className="w-[214px] rounded-2xl border-[1.5px] border-line bg-white/80 p-3.5 shadow-[0_18px_50px_-18px_rgb(28_116_250/0.35)] backdrop-blur-md transition-transform duration-500 ease-(--ease-out-expo) hover:scale-[1.03]"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Header = ({ logo, title, badge }: { logo?: string; title: string; badge?: ReactNode }) => (
  <div className="mb-3 flex items-center justify-between gap-2">
    <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#1b1c20]">
      {logo && <Image src={logo} alt="" width={16} height={16} className="size-4" />}
      {title}
    </span>
    {badge}
  </div>
);

const LiveBadge = () => (
  <span className="flex items-center gap-1 rounded-full bg-good/10 px-1.5 py-0.5 text-[10px] font-medium text-good">
    <span className="relative flex size-1.5">
      <span className="absolute inset-0 animate-ping-soft rounded-full bg-good" />
      <span className="relative size-1.5 rounded-full bg-good" />
    </span>
    Live
  </span>
);

const HEALTH_ROWS = [
  { label: "Servers", value: "1,040", color: "#0b9e76", width: "88%" },
  { label: "Storage", value: "115", color: "#ff9307", width: "64%" },
  { label: "Network", value: "44", color: "#1c74fa", width: "76%" },
];

const InfraHealth = () => (
  <>
    <Header logo="/figma/critical-app.svg" title="Infra Health" badge={<LiveBadge />} />
    <p className="font-mono text-[26px] leading-none font-medium text-ink">
      99.9<span className="text-[16px]">%</span>
    </p>
    <p className="mt-1 mb-3 text-[11px] text-muted">uptime predicted this week</p>
    <div className="flex flex-col gap-1.5">
      {HEALTH_ROWS.map((row, i) => (
        <div key={row.label} className="grid grid-cols-[52px_1fr_34px] items-center gap-2 text-[10.5px]">
          <span className="text-black/70">{row.label}</span>
          <span className="h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
            <motion.span
              className="block h-full rounded-full"
              style={{ backgroundColor: row.color }}
              initial={{ width: 0 }}
              animate={{ width: row.width }}
              transition={{ delay: 1.6 + i * 0.15, duration: 1.2, ease: EASE_OUT_EXPO }}
            />
          </span>
          <span className="text-right font-medium text-ink tabular-nums">{row.value}</span>
        </div>
      ))}
    </div>
  </>
);

const DocumentExtraction = () => (
  <>
    <Header logo="/figma/icon-reports.svg" title="iStruct™" badge={<span className="text-[10px] text-muted">Job #2048</span>} />
    <div className="flex flex-col gap-1.5">
      {[
        { label: "الإجمالي · Total", value: "SAR 12,450", score: 98 },
        { label: "التاريخ · Date", value: "14 Nov 2026", score: 96 },
        { label: "Meter reading", value: "48,210 L", score: 72 },
      ].map((field, i) => (
        <motion.div
          key={field.label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8 + i * 0.2, duration: 0.6, ease: EASE_OUT_EXPO }}
          className="flex items-center justify-between rounded-lg bg-[#f6f7f9] px-2 py-1.5"
        >
          <span className="flex flex-col">
            <span className="text-[9.5px] text-muted">{field.label}</span>
            <span className="text-[12px] font-medium text-ink">{field.value}</span>
          </span>
          <span
            className={`rounded-full px-1.5 py-0.5 text-[9.5px] font-medium ${
              field.score > 90 ? "bg-good/10 text-good" : "bg-warn/10 text-warn"
            }`}
          >
            {field.score > 90 ? `${field.score}%` : "Review"}
          </span>
        </motion.div>
      ))}
    </div>
  </>
);

const PatentScore = () => (
  <>
    <Header title="Patent Gym™" badge={<span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-medium text-brand">Seeding</span>} />
    <p className="text-[12px] leading-[1.35] text-ink">Auto-healing for hybrid clusters</p>
    <div className="mt-3 flex flex-col gap-2">
      {[
        { label: "Novelty", value: 86 },
        { label: "Commercial fit", value: 91 },
      ].map((metric, i) => (
        <div key={metric.label} className="flex flex-col gap-1">
          <span className="flex justify-between text-[10.5px]">
            <span className="text-black/70">{metric.label}</span>
            <span className="font-medium text-ink tabular-nums">{metric.value}</span>
          </span>
          <span className="h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
            <motion.span
              className="block h-full rounded-full bg-gradient-to-r from-[#8f8cff] to-brand"
              initial={{ width: 0 }}
              animate={{ width: `${metric.value}%` }}
              transition={{ delay: 1.7 + i * 0.15, duration: 1.2, ease: EASE_OUT_EXPO }}
            />
          </span>
        </div>
      ))}
    </div>
  </>
);

/** Shows typing dots, then reveals the assistant's answer. */
const MaestroChat = () => {
  const [answered, setAnswered] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setAnswered(true), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Header logo="/figma/icon-insights.svg" title="Wise Maestro™" badge={<span className="text-[10px] text-muted max-sm:hidden">Private GPT</span>} />
      <p className="ml-auto w-fit max-w-[88%] rounded-xl rounded-br-sm bg-brand px-2.5 py-1.5 text-[11px] leading-[1.35] text-white">
        Which contracts renew before Q1?
      </p>
      <div className="mt-2 min-h-[46px] w-fit max-w-[92%] rounded-xl rounded-bl-sm bg-[#f2f4f7] px-2.5 py-1.5 text-[11px] leading-[1.35] text-ink">
        {answered ? (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            3 contracts, all in logistics. Sources: 2 PDFs, 1 Excel sheet.
          </motion.span>
        ) : (
          <span className="flex h-[30px] items-center gap-1" aria-label="Typing">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="size-1.5 rounded-full bg-black/40"
                animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
              />
            ))}
          </span>
        )}
      </div>
    </>
  );
};

/**
 * Four product snippets placed around the hero copy, positioned against the copy column
 * (whose top is the "Swipe to Book" pill). Desktop (xl+) only; they would crowd smaller screens.
 */
export const HeroWidgets = ({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const pointerY = useSpring(rawY, { stiffness: 60, damping: 18 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
      rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    };
    section.addEventListener("pointermove", handleMove);
    return () => section.removeEventListener("pointermove", handleMove);
  }, [sectionRef, rawX, rawY]);

  const shared = { pointerX, pointerY, scroll: scrollYProgress };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden text-left xl:block">
      <Widget className="top-[-96px] right-[calc(50%+150px)]" delay={1.1} depth={-14} drift={-1} {...shared}>
        <InfraHealth />
      </Widget>
      <Widget className="top-[236px] right-[calc(50%+300px)]" delay={1.35} depth={18} drift={-1} {...shared}>
        <DocumentExtraction />
      </Widget>
      <Widget className="top-[-96px] left-[calc(50%+150px)]" delay={1.25} depth={16} drift={1} {...shared}>
        <PatentScore />
      </Widget>
      <Widget className="top-[246px] left-[calc(50%+300px)]" delay={1.5} depth={-12} drift={1} {...shared}>
        <MaestroChat />
      </Widget>
    </div>
  );
};

const CompactCard = ({ className, delay, children }: { className: string; delay: number; children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
    className={`w-[172px] shrink-0 rounded-2xl border-[1.5px] border-line bg-white/85 p-3.5 text-left shadow-[0_18px_50px_-18px_rgb(28_116_250/0.35)] backdrop-blur-md sm:w-[220px] ${className}`}
  >
    {children}
  </motion.div>
);

/** Below xl there is no side space, so two of the widgets sit fanned out under the call to action. */
export const HeroWidgetsCompact = () => (
  <div aria-hidden className="flex justify-center pt-2 xl:hidden">
    <CompactCard className="relative z-[1] -rotate-[5deg] translate-x-3 translate-y-2" delay={1.1}>
      <InfraHealth />
    </CompactCard>
    <CompactCard className="rotate-[4deg] -translate-x-3" delay={1.3}>
      <MaestroChat />
    </CompactCard>
  </div>
);
