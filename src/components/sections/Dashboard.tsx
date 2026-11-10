"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";

export type DashboardData = {
  database: number;
  databaseDelta: string;
  memory: number;
  memoryDelta: string;
  servers: number;
  running: [number, string];
  throttling: [number, string];
  attention: [number, string];
  criticalApp: string;
  criticalScore: number;
  criticalChance: string;
};

export const DASHBOARD_WIDTH = 432;
export const DASHBOARD_HEIGHT = 376;

/** Opacity of each of the 15 gauge segments, left to right, matching the Figma export. */
const GAUGE_SEGMENTS = Array.from({ length: 15 }, (_, i) => ({
  src: `/figma/gauge-${i}.svg`,
  angle: -84 + i * 12,
}));

type FloatCardProps = {
  show: boolean;
  className: string;
  delay: number;
  floatDelay: number;
  children: ReactNode;
};

const FloatCard = ({ show, className, delay, floatDelay, children }: FloatCardProps) => (
  <motion.div
    initial="hidden"
    animate={show ? "visible" : "hidden"}
    variants={{
      hidden: { opacity: 0, y: 36, scale: 0.94, filter: "blur(10px)" },
      visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    }}
    transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      className="size-full"
    >
      {children}
    </motion.div>
  </motion.div>
);

const MoreButton = ({ src }: { src: string }) => (
  <span className="relative flex size-[22px] items-center justify-center rounded-full border-[0.5px] border-[#e2e2e2] bg-white">
    <Image src={src} alt="" width={10} height={3} className="h-[2.5px] w-[9.6px]" />
  </span>
);

type MeterProps = { value: number; restColor: string; inView: boolean };

/** 14-step bar meter; fills left to right when it enters the viewport. */
const Meter = ({ value, restColor, inView }: MeterProps) => {
  const filled = Math.round((value / 100) * 14) - 1;
  return (
    <div className="flex items-center gap-[4.9px]">
      {Array.from({ length: 14 }, (_, i) => (
        <motion.span
          key={i}
          className="h-[19.6px] w-[4.9px] origin-bottom"
          initial={false}
          animate={{
            backgroundColor: inView && i < filled ? "#1c74fa" : restColor,
            scaleY: inView ? 1 : 0.4,
          }}
          transition={{ delay: 0.6 + i * 0.045, duration: 0.5, ease: EASE_OUT_EXPO }}
        />
      ))}
    </div>
  );
};

type StatCardProps = {
  title: string;
  value: number;
  delta: string;
  restColor: string;
  corner: "tl" | "tr";
  inView: boolean;
};

const StatCard = ({ title, value, delta, restColor, corner, inView }: StatCardProps) => (
  <div
    className={`flex flex-col items-start gap-3 border-[1.5px] border-line bg-white/85 px-[15.66px] py-5 backdrop-blur-[5px] ${
      corner === "tl" ? "rounded-t-[12.72px] rounded-bl-[12.72px]" : "rounded-r-[12.72px] rounded-bl-[12.72px]"
    }`}
  >
    <p className="text-[15.66px] font-medium text-[#1b1c20]">{title}</p>
    <p className="flex items-center gap-[5.9px] font-medium whitespace-nowrap text-[#1b1c20]">
      <span className="text-[15.66px]">
        <CountUp to={value} suffix="%" />
      </span>
      <span className="text-[10.77px]">
        <span className="text-good">{delta}</span> in last week
      </span>
    </p>
    <Meter value={value} restColor={restColor} inView={inView} />
  </div>
);

type LegendRowProps = { color: string; count: number; label: string; share: string };

const LegendRow = ({ color, count, label, share }: LegendRowProps) => (
  <div className="flex items-center justify-between">
    <span className="flex w-10 items-center gap-[5.9px]">
      <span className="size-[10px] rounded-[2px]" style={{ backgroundColor: color }} />
      <span className="text-[8.8px] font-medium text-black/90 tabular-nums">{count}</span>
    </span>
    <span className="text-[10.77px] font-medium text-black/80">{label}</span>
    <span className="w-10 text-right text-[8.8px] font-medium tabular-nums" style={{ color }}>
      {share}
    </span>
  </div>
);

type DashboardProps = { data: DashboardData; dataKey: string };

/** Floating observability widgets from the product card, laid out at their 432px design size. */
export const Dashboard = ({ data, dataKey }: DashboardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div
      ref={ref}
      className="relative font-sans"
      style={{ width: DASHBOARD_WIDTH, height: DASHBOARD_HEIGHT }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={dataKey}
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="absolute inset-0"
        >
          <FloatCard show={inView} className="top-[2px] left-0 w-[163px]" delay={0.05} floatDelay={0}>
            <StatCard
              title="Database"
              value={data.database}
              delta={data.databaseDelta}
              restColor="#d9d9d9"
              corner="tl"
              inView={inView}
            />
          </FloatCard>

          <FloatCard show={inView} className="top-0 left-[175.7px] h-[244.65px] w-[256.14px]" delay={0.15} floatDelay={1.2}>
            <div className="flex size-full flex-col items-center justify-between rounded-[12.72px] border-[1.5px] border-line bg-white/85 p-[15.66px] backdrop-blur-[5px]">
              <div className="flex w-full items-center justify-between">
                <p className="text-[15.66px] font-medium text-[#1b1c20]">All Regions</p>
                <MoreButton src="/figma/dots.svg" />
              </div>
              <div className="relative h-[86.3px] w-[179px]">
                {GAUGE_SEGMENTS.map((segment, i) => (
                  <motion.span
                    key={segment.src}
                    className="absolute top-[0.4px] left-[80.6px] h-[25.15px] w-[15.26px]"
                    style={{ rotate: segment.angle, transformOrigin: "7.63px 89.6px" }}
                    initial={false}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.5, ease: EASE_OUT_EXPO }}
                  >
                    <Image src={segment.src} alt="" width={15} height={25} className="size-full" />
                  </motion.span>
                ))}
                <div className="absolute top-[41px] left-1/2 flex -translate-x-[calc(50%+2px)] flex-col items-center text-center">
                  <span className="text-[19.17px] leading-none font-medium text-[#1b1c20]">
                    <CountUp to={data.servers} />
                  </span>
                  <span className="mt-0.5 text-[8.2px] leading-tight text-black/80">
                    Server instances
                    <br />
                    running
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-[6px]">
                <LegendRow color="#0b9e76" count={data.running[0]} label="Running fine" share={data.running[1]} />
                <LegendRow color="#ff9307" count={data.throttling[0]} label="Throttling" share={data.throttling[1]} />
                <LegendRow color="#ff292d" count={data.attention[0]} label="Needs attention" share={data.attention[1]} />
              </div>
            </div>
          </FloatCard>

          <FloatCard show={inView} className="top-[136px] left-0 z-10 h-[244.65px] w-[256.14px]" delay={0.3} floatDelay={2.1}>
            <div className="flex size-full flex-col items-start justify-between rounded-[12.72px] border-[1.5px] border-line bg-white/90 p-[15.66px] shadow-[3px_-1px_61px_0_rgb(98_157_246/0.2)] backdrop-blur-[5px]">
              <div className="flex w-full items-center justify-between">
                <span className="flex items-center gap-[4.9px]">
                  <Image src="/figma/critical-app.svg" alt="" width={19} height={19} className="h-[19px] w-[19.08px]" />
                  <span className="text-[15.66px] font-medium text-[#1b1c20]">{data.criticalApp}</span>
                </span>
                <MoreButton src="/figma/dots-2.svg" />
              </div>
              <motion.span
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/figma/exclamation.svg" alt="" width={24} height={24} />
              </motion.span>
              <div className="flex w-full flex-col">
                <div className="flex items-start gap-[4.9px] py-3">
                  <span className="text-[33.27px] leading-[0.75] font-medium text-brand">
                    <CountUp to={data.criticalScore} decimals={2} />
                  </span>
                  <Image
                    src="/figma/trend-arrow.png"
                    alt=""
                    width={19}
                    height={19}
                    className="size-[18.6px] -scale-y-100"
                  />
                </div>
                <p className="text-[10.77px] font-medium whitespace-pre text-[#1b1c20]/85">
                  {`${data.criticalChance} %  possible chances in this week`}
                </p>
              </div>
              <p className="text-[15.17px] leading-snug font-medium text-[#1b1c20]">
                No Potential <span className="text-brand">disk space exhaustion</span> predicted.
              </p>
            </div>
          </FloatCard>

          <FloatCard show={inView} className="top-[256px] left-[267.7px] w-[163.6px]" delay={0.45} floatDelay={3}>
            <StatCard
              title="Memory"
              value={data.memory}
              delta={data.memoryDelta}
              restColor="#7f7f7f"
              corner="tr"
              inView={inView}
            />
          </FloatCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
