"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE_OUT_EXPO, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScaleToFit } from "@/components/ui/ScaleToFit";
import { Dashboard, DASHBOARD_HEIGHT, DASHBOARD_WIDTH, type DashboardData } from "./Dashboard";

type Product = {
  id: string;
  name: string;
  logo: { src: string; width: number; height: number };
  tagline: string;
  pitch: string;
  dashboard: DashboardData;
};

const PRODUCTS: Product[] = [
  {
    id: "maestro",
    name: "Wise Maestro",
    logo: { src: "/figma/maestro-logo.png", width: 30, height: 33 },
    tagline: "Your Cloud Migration Partner",
    pitch: "Observability Platform, designed to predict and proactively manage your server infrastructure.",
    dashboard: {
      database: 68,
      databaseDelta: "+2.1%",
      memory: 68,
      memoryDelta: "+2.1%",
      servers: 1035,
      running: [748, "72.27 %"],
      throttling: [155, "14.08%"],
      attention: [132, "12.75%"],
      criticalApp: "Critical App I",
      criticalScore: 50.05,
      criticalChance: "0.9",
    },
  },
  {
    id: "ultima",
    name: "Wise Ultima",
    logo: { src: "/figma/logo.svg", width: 36, height: 28 },
    tagline: "Your AIOps Command Center",
    pitch: "One intelligent console that correlates every signal and resolves incidents before users notice.",
    dashboard: {
      database: 82,
      databaseDelta: "+4.6%",
      memory: 57,
      memoryDelta: "+1.2%",
      servers: 2410,
      running: [2088, "86.64 %"],
      throttling: [214, "8.88%"],
      attention: [108, "4.48%"],
      criticalApp: "Payments API",
      criticalScore: 72.4,
      criticalChance: "0.4",
    },
  },
  {
    id: "migrate",
    name: "Wise Migrate",
    logo: { src: "/figma/logo.svg", width: 36, height: 28 },
    tagline: "Zero-downtime cloud moves",
    pitch: "Plan, rehearse and run cloud migrations with automated dependency mapping and safe rollbacks.",
    dashboard: {
      database: 45,
      databaseDelta: "+7.9%",
      memory: 76,
      memoryDelta: "+3.4%",
      servers: 640,
      running: [512, "80.00 %"],
      throttling: [86, "13.44%"],
      attention: [42, "6.56%"],
      criticalApp: "Legacy ERP",
      criticalScore: 38.9,
      criticalChance: "1.6",
    },
  },
];

const FEATURES = [
  { label: "Predictive Analysis", icon: "/figma/icon-predictive.svg" },
  { label: "Real-Time Monitoring", icon: "/figma/icon-realtime.svg" },
  { label: "Comprehensive Reports", icon: "/figma/icon-reports.svg" },
  { label: "Automated Actions", icon: "/figma/icon-automated.svg" },
  { label: "AI-Powered Insights", icon: "/figma/icon-insights.svg" },
];

const AUTOPLAY_MS = 7000;

/** Trapezoid tab outline, same path as the Figma "Vector 273" asset, so its fill can animate. */
const TabShape = ({ active }: { active: boolean }) => (
  <svg
    aria-hidden
    viewBox="0 0 171.378 41.6489"
    preserveAspectRatio="none"
    className="absolute inset-0 size-full overflow-visible"
  >
    <path
      d="M10.5699 6.31157L0.66203 41.1489H170.716L160.808 6.31156C159.83 2.8725 156.689 0.5 153.114 0.5H18.2647C14.6893 0.5 11.548 2.87251 10.5699 6.31157Z"
      className="transition-[fill] duration-500"
      fill={active ? "#ffffff" : "#f7f7f7"}
      stroke="#EAEAEA"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const product = PRODUCTS[activeIndex];

  const select = useCallback((index: number) => {
    setAutoplay(false);
    setActiveIndex((index + PRODUCTS.length) % PRODUCTS.length);
  }, []);

  useEffect(() => {
    if (!autoplay || !inView) return;
    const timer = window.setTimeout(
      () => setActiveIndex((index) => (index + 1) % PRODUCTS.length),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoplay, inView]);

  return (
    <section id="products" className="relative px-4 pt-6 pb-16 sm:px-8 lg:px-16 lg:pb-16">
      <div ref={sectionRef} className="mx-auto flex max-w-[1169px] flex-col items-center gap-8">
        <SectionHeading
          eyebrow="We Are"
          title="Trusted by enterprise IT teams"
          description="Observability Platform, designed to predict and proactively manage your infrastructure swiftly."
        />

        <Reveal className="w-full" amount={0.15}>
          <div role="tablist" aria-label="Wise Work products" className="no-scrollbar -mb-px flex gap-1.5 overflow-x-auto px-3 sm:gap-2.5 sm:px-5">
            {PRODUCTS.map((item, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={item.id}
                  role="tab"
                  type="button"
                  id={`tab-${item.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${item.id}`}
                  onClick={() => select(index)}
                  className={`relative z-[1] h-[41px] w-[124px] shrink-0 overflow-hidden text-[15px] font-medium tracking-[-0.02em] transition-colors duration-300 sm:w-[170px] sm:text-lg ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <TabShape active={active} />
                  <span className="relative">{item.name}</span>
                  {active && autoplay && inView && (
                    <motion.span
                      key={`progress-${activeIndex}`}
                      aria-hidden
                      className="absolute bottom-1 left-1/2 h-[2px] w-[60%] -translate-x-1/2 origin-left rounded-full bg-brand/70"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${product.id}`}
            aria-labelledby={`tab-${product.id}`}
            className="relative flex flex-col overflow-hidden rounded-xl border-2 border-t border-line shadow-[var(--shadow-card)] lg:h-[499px] lg:flex-row lg:items-start lg:justify-between lg:p-8"
            style={{ backgroundImage: "linear-gradient(168deg, #fff 16.6%, #f0f0f0 98.7%)" }}
            onMouseEnter={() => setAutoplay(false)}
          >
            {/* Copy */}
            <div className="relative z-[2] flex flex-col items-start gap-[18px] p-6 sm:p-8 lg:w-[560px] lg:p-0">
              <div className="flex w-full items-center justify-between">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                    className="flex items-center gap-1"
                  >
                    <span className="flex size-[41.6px] items-center justify-center">
                      <Image
                        src={product.logo.src}
                        alt=""
                        width={product.logo.width}
                        height={product.logo.height}
                        className="h-[30px] w-auto"
                      />
                    </span>
                    <span className="text-[15.6px] font-bold text-ink">{product.name}</span>
                  </motion.div>
                </AnimatePresence>
                <a
                  href="#contact"
                  className="group py-4 text-base leading-[1.2] font-medium tracking-[0.01em] text-ink"
                >
                  Learn More{" "}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  className="flex flex-col gap-[18px]"
                >
                  <p className="text-base leading-[1.2] tracking-[0.01em] text-muted">{product.tagline}</p>
                  <p className="max-w-[560px] text-xl leading-[1.3] tracking-[0.01em] text-ink text-pretty sm:text-2xl">
                    {product.pitch}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-[7.5px]">
                {[
                  { label: "Previous product", step: -1, flip: true },
                  { label: "Next product", step: 1, flip: false },
                ].map((control) => (
                  <button
                    key={control.label}
                    type="button"
                    aria-label={control.label}
                    onClick={() => select(activeIndex + control.step)}
                    className="flex size-[37.5px] items-center justify-center rounded-full bg-[#f0f0f0] text-[16.5px] text-[#4b4b4b] transition-[background-color,transform,color] duration-300 hover:bg-ink hover:text-white active:scale-90"
                  >
                    <span className={control.flip ? "rotate-180" : ""}>→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating dashboard widgets */}
            <div className="relative z-[2] flex justify-center px-6 pb-8 sm:px-8 lg:h-full lg:items-center lg:p-0">
              <ScaleToFit width={DASHBOARD_WIDTH} height={DASHBOARD_HEIGHT}>
                <Dashboard data={product.dashboard} dataKey={product.id} />
              </ScaleToFit>
            </div>

            {/* Feature band */}
            <div className="relative z-[1] bg-brand px-6 py-6 sm:px-7 lg:absolute lg:top-[282.8px] lg:-left-px lg:w-[calc(100%+2px)] lg:py-[22px]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 15% 0%, rgb(255 255 255 / 0.35), transparent 40%), radial-gradient(circle at 60% 120%, rgb(0 0 248 / 0.5), transparent 45%)",
                }}
              />
              <Stagger
                className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[648px] lg:grid-cols-[repeat(3,200px)]"
                stagger={0.07}
                amount={0.4}
              >
                {FEATURES.map((feature) => (
                  <StaggerItem key={feature.label} className="group flex flex-col items-start gap-2">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-white shadow-[var(--shadow-chip)] transition-transform duration-500 ease-(--ease-out-expo) group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
                      <Image src={feature.icon} alt="" width={24} height={24} />
                    </span>
                    <span className="text-[15px] leading-[1.3] font-medium text-white sm:text-base">{feature.label}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
