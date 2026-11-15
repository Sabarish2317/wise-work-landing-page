"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";

type PageHeroProps = {
  eyebrow: string;
  /** Each entry renders as its own line. */
  title: string[];
  body: string;
  children?: ReactNode;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
});

/** Inner-page hero: same type scale and glow as the home hero, without the form. */
export const PageHero = ({ eyebrow, title, body, children }: PageHeroProps) => (
  <section className="relative overflow-hidden px-4 pt-36 pb-14 sm:px-8 sm:pt-40 lg:px-16">
    <div aria-hidden className="pointer-events-none absolute top-[-120px] left-1/2 h-[697px] w-[801px] -translate-x-1/2">
      <div className="size-full animate-drift">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/blob-hero.svg" alt="" width={801} height={697} className="size-full" />
      </div>
    </div>
    <div className="relative mx-auto flex max-w-[880px] flex-col items-center gap-6 text-center">
      <motion.span
        {...fadeUp(0)}
        className="rounded-[15px] border-2 border-[#ebebeb] bg-white px-4 py-2 font-mono text-[13px] font-medium tracking-[0.04em] text-ink uppercase"
      >
        {eyebrow}
      </motion.span>
      <h1 className="text-[38px] leading-[1] font-normal tracking-[-0.035em] text-ink sm:text-[52px] lg:text-[60px]">
        <SplitWords immediate delay={0.1} lines={title} />
      </h1>
      <motion.p {...fadeUp(0.5)} className="max-w-[620px] text-base leading-[1.35] tracking-[0.01em] text-muted text-balance sm:text-lg">
        {body}
      </motion.p>
      {children && (
        <motion.div {...fadeUp(0.7)} className="flex flex-wrap items-center justify-center gap-4">
          {children}
        </motion.div>
      )}
    </div>
  </section>
);
