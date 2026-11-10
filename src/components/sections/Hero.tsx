"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, type FormEvent } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { SwipeToBook } from "./SwipeToBook";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
});

type CursorTagProps = { label: string; className: string; delay: number; color: string };

const CursorTag = ({ label, className, delay, color }: CursorTagProps) => (
  <motion.div
    aria-hidden
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8, ease: EASE_OUT_EXPO }}
    className={`pointer-events-none absolute hidden lg:block ${className}`}
  >
    <motion.div
      animate={{ x: [0, 14, -6, 0], y: [0, -10, 8, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay }}
      className="flex flex-col items-start"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 2l5.5 14 2.2-5.8L15.5 8 2 2z" fill={color} stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span
        className="ml-3 rounded-full px-2.5 py-1 text-xs font-medium text-white shadow-[0_6px_16px_rgb(28_116_250/0.25)]"
        style={{ backgroundColor: color }}
      >
        {label}
      </span>
    </motion.div>
  </motion.div>
);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[640px] items-center justify-center overflow-hidden px-4 pt-32 pb-20 sm:min-h-[720px] sm:px-8 sm:pt-36 lg:min-h-[600px] lg:pt-32 lg:pb-16"
    >
      {/* Soft violet + blue glow from the design (Group 1000002575). */}
      <motion.div
        aria-hidden
        style={{ scale: blobScale }}
        className="pointer-events-none absolute top-[-40px] left-1/2 h-[697px] w-[801px] -translate-x-1/2"
      >
        <div className="size-full animate-drift">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/blob-hero.svg" alt="" width={801} height={697} className="size-full opacity-90" />
        </div>
      </motion.div>
      {/* Faint grid that fades out toward the edges for a bit of depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent)] opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(0 0 0 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <CursorTag label="Predict" color="#1c74fa" className="top-[38%] left-[12%]" delay={1.4} />
      <CursorTag label="Prevent" color="#8b5cf6" className="top-[52%] right-[12%]" delay={1.7} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex w-full max-w-[1000px] flex-col items-center gap-8 text-center"
      >
        <motion.div {...fadeUp(0.1)}>
          <SwipeToBook />
        </motion.div>

        <div className="flex flex-col items-center gap-6">
          <h1 className="text-[40px] leading-[0.98] font-normal tracking-[-0.035em] text-[#1e1e1e] sm:text-[52px] lg:text-[64px] lg:leading-[0.95] lg:[&_.block]:whitespace-nowrap">
            <SplitWords
              immediate
              delay={0.25}
              lines={["Building a wiser tomorrow, today.", "driven by exceptional service."]}
            />
          </h1>
          <motion.p
            {...fadeUp(0.8)}
            className="max-w-[560px] text-base leading-[1.3] tracking-[0.01em] text-muted text-balance sm:text-lg sm:leading-[1.2]"
          >
            Observability Platform, designed to predict and proactively manage your infrastructure swiftly.
          </motion.p>
        </div>

        <motion.div {...fadeUp(1)} className="flex w-full flex-col items-center gap-4">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[420px] items-center gap-3 rounded-[18px] border border-[#ebebeb] bg-white pl-5 shadow-[0_4px_22px_#e4e4e4] transition-shadow duration-500 focus-within:shadow-[0_8px_34px_rgb(28_116_250/0.18)] sm:w-auto sm:gap-10 sm:pl-6"
          >
            <label htmlFor="hero-email" className="sr-only">
              Email address
            </label>
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.span
                  key="thanks"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="min-w-0 flex-1 text-left text-base text-ink sm:w-[220px]"
                >
                  You&apos;re on the list ✓
                </motion.span>
              ) : (
                <motion.input
                  key="input"
                  exit={{ opacity: 0, y: -8 }}
                  id="hero-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your mail address"
                  className="min-w-0 flex-1 bg-transparent text-base tracking-[0.01em] text-ink outline-none placeholder:text-muted sm:w-[220px] sm:flex-none"
                />
              )}
            </AnimatePresence>
            <button
              type="submit"
              className="group shrink-0 rounded-[18px] bg-brand px-5 py-4 text-base leading-[1.2] tracking-[0.01em] text-white shadow-[var(--shadow-cta)] transition-[background-color,transform,box-shadow] duration-300 hover:bg-[#0f66ea] hover:shadow-[0_8px_22px_#9cc3ff] active:scale-[0.96] sm:px-6"
            >
              Get Started{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </form>
          <p className="text-base leading-[1.2] tracking-[0.01em] text-muted">Futuristic Innovation</p>
        </motion.div>
      </motion.div>
    </section>
  );
};
