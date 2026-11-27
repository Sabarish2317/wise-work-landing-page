"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, type FormEvent } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroWidgets, HeroWidgetsCompact } from "./HeroWidgets";
import { SwipeToBook } from "./SwipeToBook";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
});

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
      className="relative flex min-h-[640px] items-center justify-center overflow-hidden px-4 pt-32 pb-20 sm:min-h-[720px] sm:px-8 sm:pt-36 lg:min-h-[600px] lg:pt-32 lg:pb-16 xl:pt-48 xl:pb-28"
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


      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex w-full max-w-[1000px] flex-col items-center gap-8 text-center"
      >
        <HeroWidgets sectionRef={sectionRef} />
        <motion.div {...fadeUp(0.1)}>
          <SwipeToBook />
        </motion.div>

        <div className="flex flex-col items-center gap-6">
          <h1 className="text-[38px] leading-[1.06] font-normal tracking-[-0.035em] text-[#1e1e1e] sm:text-[52px] sm:leading-[1.02] lg:text-[64px] lg:leading-[0.98] [&_.block]:text-balance lg:[&_.block]:whitespace-nowrap">
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
            An AI-native company for enterprise AI, cloud and patent innovation. We build products, deliver
            engineering services and turn ideas into patents.
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
          <p className="flex items-center gap-2 text-[15px] leading-[1.2] tracking-[0.01em] text-muted">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-good" />
              <span className="relative size-2 rounded-full bg-good" />
            </span>
            Recognized by MCIT at LEAP 2026
          </p>
        </motion.div>
        <HeroWidgetsCompact />
      </motion.div>
    </section>
  );
};
