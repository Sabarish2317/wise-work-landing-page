"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE_OUT_EXPO, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScaleToFit } from "@/components/ui/ScaleToFit";
import { PRODUCTS, type Product } from "@/content/site";
import { Dashboard, DASHBOARD_HEIGHT, DASHBOARD_WIDTH, type DashboardData } from "./Dashboard";

const AUTOPLAY_MS = 7000;

const ULTIMA_DASHBOARD: DashboardData = {
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
};

/** Trapezoid tab outline, same path as the Figma "Vector 273" asset, so its fill can animate. */
const TabShape = ({ active }: { active: boolean }) => (
  <svg aria-hidden viewBox="0 0 171.378 41.6489" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
    <path
      d="M10.5699 6.31157L0.66203 41.1489H170.716L160.808 6.31156C159.83 2.8725 156.689 0.5 153.114 0.5H18.2647C14.6893 0.5 11.548 2.87251 10.5699 6.31157Z"
      className="transition-[fill] duration-500"
      fill={active ? "#ffffff" : "#f7f7f7"}
      stroke="#EAEAEA"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

/** Two stacked screenshots plus a floating headline metric. */
const ScreenVisual = ({ product }: { product: Product }) => {
  const [front, back] = product.screens;
  return (
    <div className="relative w-full max-w-[470px] pt-6 pb-10 lg:w-[470px]">
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 0 }}
        animate={{ opacity: 0.9, y: 0, rotate: 3 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 }}
        className="absolute top-0 right-0 w-[78%] origin-bottom-right"
      >
        <BrowserFrame src={back.src} width={back.width} height={back.height} alt="" sizes="360px" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
        className="relative mt-10 w-[88%]"
      >
        <BrowserFrame src={front.src} width={front.width} height={front.height} alt={`${product.short} ${front.title}`} sizes="420px" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="absolute right-2 bottom-0 rounded-2xl border-[1.5px] border-line bg-white/90 px-4 py-3 shadow-[3px_-1px_61px_0_rgb(98_157_246/0.25)] backdrop-blur-md"
      >
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <p className="font-mono text-[26px] leading-none font-medium text-brand">{product.headline.value}</p>
          <p className="mt-1 text-[12px] font-medium text-[#1b1c20]">{product.headline.label}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

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
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % PRODUCTS.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoplay, inView]);

  return (
    <section id="products" className="relative scroll-mt-24 px-4 pt-6 pb-16 sm:px-8 lg:px-16">
      <div ref={sectionRef} className="mx-auto flex max-w-[1169px] flex-col items-center gap-8">
        <SectionHeading
          eyebrow="Flagship Products"
          title="Intelligence engineered for enterprise"
          description="Four AI platforms for infrastructure, cloud migration, documents and enterprise knowledge."
        />

        <Reveal className="w-full" amount={0.15}>
          <div role="tablist" aria-label="Wise Work products" className="no-scrollbar -mb-px flex gap-1.5 overflow-x-auto px-3 sm:gap-2.5 sm:px-5">
            {PRODUCTS.map((item, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={item.slug}
                  role="tab"
                  type="button"
                  id={`tab-${item.slug}`}
                  aria-selected={active}
                  aria-controls={`panel-${item.slug}`}
                  onClick={() => select(index)}
                  className={`relative z-[1] h-[41px] w-[124px] shrink-0 overflow-hidden text-[15px] font-medium tracking-[-0.02em] transition-colors duration-300 sm:w-[170px] sm:text-lg ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <TabShape active={active} />
                  <span className="relative">{item.short}</span>
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
            id={`panel-${product.slug}`}
            aria-labelledby={`tab-${product.slug}`}
            className="relative flex flex-col overflow-hidden rounded-xl border-2 border-t border-line shadow-[var(--shadow-card)] lg:h-[499px] lg:flex-row lg:items-start lg:justify-between lg:p-8"
            style={{ backgroundImage: "linear-gradient(168deg, #fff 16.6%, #f0f0f0 98.7%)" }}
            onMouseEnter={() => setAutoplay(false)}
          >
            {/* Copy */}
            <div className="relative z-[2] flex flex-col items-start gap-[18px] p-6 sm:p-8 lg:w-[540px] lg:p-0">
              <div className="flex w-full items-center justify-between gap-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  >
                    <Image src={product.logo.src} alt={product.name} width={product.logo.width} height={product.logo.height} className="h-9 w-auto" />
                  </motion.div>
                </AnimatePresence>
                <Link
                  href={`/products/${product.slug}`}
                  className="group py-3 text-base leading-[1.2] font-medium tracking-[0.01em] whitespace-nowrap text-ink"
                >
                  Learn More{" "}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  className="flex flex-col gap-[14px]"
                >
                  <p className="text-base leading-[1.2] tracking-[0.01em] text-muted">{product.category}</p>
                  <p className="max-w-[540px] text-xl leading-[1.3] tracking-[0.01em] text-ink text-pretty">{product.summary}</p>
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

            {/* Visual */}
            <div className="relative z-[2] flex justify-center px-6 pb-8 sm:px-8 lg:h-full lg:items-center lg:p-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={product.slug}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.3 }}
                  className="flex w-full justify-center"
                >
                  {product.slug === "wise-ultima" ? (
                    <ScaleToFit width={DASHBOARD_WIDTH} height={DASHBOARD_HEIGHT}>
                      <Dashboard data={ULTIMA_DASHBOARD} dataKey={product.slug} />
                    </ScaleToFit>
                  ) : (
                    <ScreenVisual product={product} />
                  )}
                </motion.div>
              </AnimatePresence>
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
                key={product.slug}
                className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[648px] lg:grid-cols-[repeat(3,200px)]"
                stagger={0.06}
                amount={0.3}
              >
                {product.features.map((feature) => (
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
