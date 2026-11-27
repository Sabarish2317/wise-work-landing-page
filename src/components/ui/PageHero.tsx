"use client";

import { motion } from "motion/react";
import { useRef, type ComponentType, type ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import {
  CompactWidgetRow,
  FloatingWidgetRing,
} from "@/components/sections/HeroWidgets";

/** Card positions around the inner-page copy column (its top is the eyebrow pill). */
const PAGE_SLOTS = [
  {
    className: "top-[-30px] right-[calc(50%+380px)]",
    delay: 1.0,
    depth: -14,
    drift: -1 as const,
  },
  {
    className: "top-[230px] right-[calc(50%+410px)]",
    delay: 1.25,
    depth: 18,
    drift: -1 as const,
  },
  {
    className: "top-[-30px] left-[calc(50%+380px)]",
    delay: 1.15,
    depth: 16,
    drift: 1 as const,
  },
  {
    className: "top-[230px] left-[calc(50%+410px)]",
    delay: 1.4,
    depth: -12,
    drift: 1 as const,
  },
];

type PageHeroProps = {
  eyebrow: string;
  /** Each entry renders as its own line. */
  title: string[];
  body: string;
  children?: ReactNode;
  /** Optional four illustrative glass cards: floating around the copy on xl, a swipe row below. */
  widgets?: ComponentType[];
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
});

/** Inner-page hero: same type scale and glow as the home hero, without the form. */
export const PageHero = ({
  eyebrow,
  title,
  body,
  children,
  widgets,
}: PageHeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden px-4 pt-36 pb-14 sm:px-8 sm:pt-40 lg:px-16 ${widgets ? "xl:pt-48 xl:pb-32" : ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-120px] left-1/2 h-[697px] w-[801px] -translate-x-1/2"
      >
        <div className="size-full animate-drift">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/blob-hero.svg"
            alt=""
            width={801}
            height={697}
            className="size-full"
          />
        </div>
      </div>
      <div className="relative mx-auto flex max-w-[880px] flex-col items-center gap-6 text-center">
        {widgets && (
          <FloatingWidgetRing
            sectionRef={sectionRef}
            widgets={widgets}
            slots={PAGE_SLOTS}
          />
        )}
        <motion.span
          {...fadeUp(0)}
          className="rounded-[15px] border-2 border-[#ebebeb] bg-white px-4 py-2 font-mono text-[13px] font-medium tracking-[0.04em] text-ink uppercase"
        >
          {eyebrow}
        </motion.span>
        <h1 className="text-[36px] leading-[1.06] font-normal tracking-[-0.035em] text-ink sm:text-[52px] sm:leading-[1.02] lg:text-[60px] [&_.block]:text-balance">
          <SplitWords immediate delay={0.1} lines={title} />
        </h1>
        <motion.p
          {...fadeUp(0.5)}
          className="max-w-[620px] text-base leading-[1.35] tracking-[0.01em] text-muted text-balance sm:text-lg"
        >
          {body}
        </motion.p>
        {children && (
          <motion.div
            {...fadeUp(0.7)}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {children}
          </motion.div>
        )}
        {widgets && <CompactWidgetRow widgets={widgets} />}
      </div>
    </section>
  );
};
