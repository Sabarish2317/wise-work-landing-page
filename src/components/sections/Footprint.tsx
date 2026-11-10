"use client";

import Image from "next/image";
import { animate, motion, useInView, useMotionTemplate, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { EASE_OUT_EXPO, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const MAP_WIDTH = 648;
const MAP_HEIGHT = 432;

/** Hub (white marker in the Figma map) and the offices it links to, in map pixel coordinates. */
const HUB = { x: 442.3, y: 215.5, label: "India · HQ" };
const OFFICES = [
  { x: 152, y: 152, label: "USA" },
  { x: 312, y: 112, label: "UK" },
  { x: 487, y: 254, label: "Singapore" },
];

const STATS = [
  { value: 25, suffix: "+", label: "Clients" },
  { value: 4, suffix: "", label: "Countries" },
  { value: 80, suffix: "%", label: "ROI" },
  { value: 800, suffix: "+", label: "Employees" },
];

const arcPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
  const midX = (from.x + to.x) / 2;
  const midY = Math.min(from.y, to.y) - Math.abs(from.x - to.x) * 0.28;
  return `M${from.x} ${from.y} Q${midX} ${midY} ${to.x} ${to.y}`;
};

const toPercent = (point: { x: number; y: number }) => ({
  left: `${(point.x / MAP_WIDTH) * 100}%`,
  top: `${(point.y / MAP_HEIGHT) * 100}%`,
});

export const Footprint = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapRef, { once: true, amount: 0.4 });
  const sweep = useMotionValue(-20);
  const mask = useMotionTemplate`linear-gradient(100deg, black ${sweep}%, transparent calc(${sweep}% + 18%))`;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(sweep, 120, { duration: 2.2, ease: [0.45, 0, 0.2, 1] });
    return () => controls.stop();
  }, [inView, sweep]);

  return (
    <section id="footprint" className="relative px-4 pt-8 pb-16 sm:px-8 lg:px-16">
      <Reveal
        amount={0.15}
        className="relative mx-auto flex max-w-[1169px] flex-col items-center gap-6 overflow-hidden rounded-xl bg-white px-4 pt-12 pb-12 shadow-[0_4px_40px_rgb(0_0_0/0.04)] sm:px-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-[200px] left-1/2 size-[772px] -translate-x-1/2 rounded-full opacity-60 blur-[90px]"
          style={{ background: "radial-gradient(circle, rgb(28 116 250 / 0.12), transparent 65%)" }}
        />

        <SectionHeading
          eyebrow="Our"
          inline
          title="Global Footprint"
          description="Our state-of-the-art Gen AI empowers a generational shift in the extraction of all intelligence."
          className="max-w-[380px]"
        />

        <div ref={mapRef} className="relative aspect-[650/433] w-full max-w-[650px]">
          <motion.div className="absolute inset-0" style={{ maskImage: mask, WebkitMaskImage: mask }}>
            <Image src="/figma/world-map.svg" alt="Dotted world map" fill className="object-contain" />
          </motion.div>

          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
            aria-hidden
          >
            <defs>
              <linearGradient id="arc-gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#1c74fa" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#1c74fa" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {OFFICES.map((office, i) => (
              <motion.path
                key={office.label}
                d={arcPath(office, HUB)}
                fill="none"
                stroke="url(#arc-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 1.6 + i * 0.25, duration: 1.4, ease: EASE_OUT_EXPO }}
              />
            ))}
          </svg>

          {[HUB, ...OFFICES].map((point, i) => {
            const isHub = point === HUB;
            return (
              <motion.div
                key={point.label}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={toPercent(point)}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2 + i * 0.2, type: "spring", stiffness: 300, damping: 18 }}
              >
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-brand" style={{ animationDelay: `${i * 0.4}s` }} />
                <span
                  className={`relative block rounded-full ${isHub ? "size-[10px] border-[2.5px] border-brand bg-white" : "size-[8px] bg-brand ring-2 ring-white"}`}
                />
                <span
                  className={`absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-ink px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white transition-opacity duration-300 ${
                    isHub ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {point.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <Stagger className="grid grid-cols-2 gap-x-10 gap-y-8 sm:flex sm:gap-14" stagger={0.1} amount={0.5}>
          {STATS.map((stat) => (
            <StaggerItem key={stat.label} className="flex flex-col items-center gap-2.5">
              <span className="font-mono text-[32px] leading-[1.2] font-medium tracking-[0.04em] text-ink">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </span>
              <motion.span
                className="h-[3px] w-[44.6px] origin-center rounded-full bg-brand"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.9, ease: EASE_OUT_EXPO }}
              />
              <span className="text-base leading-[1.2] font-medium tracking-[0.04em] text-ink">{stat.label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>
    </section>
  );
};
