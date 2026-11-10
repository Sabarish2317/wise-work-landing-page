"use client";

import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "./Reveal";

type SplitWordsProps = {
  /** Each entry renders on its own line. */
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll-into-view (for above-the-fold copy). */
  immediate?: boolean;
};

/** Masked word-by-word reveal. The real text stays in the DOM for screen readers. */
export const SplitWords = ({
  lines,
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: SplitWordsProps) => {
  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, amount: 0.6 } };

  let wordIndex = 0;

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block" aria-hidden>
          {line.split(" ").map((word, i) => {
            const index = wordIndex++;
            return (
              <span
                key={i}
                className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
              >
                <motion.span
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: { y: "105%", opacity: 0, filter: "blur(6px)" },
                    visible: { y: "0%", opacity: 1, filter: "blur(0px)" },
                  }}
                  transition={{
                    duration: 1,
                    ease: EASE_OUT_EXPO,
                    delay: delay + index * stagger,
                  }}
                >
                  {word}
                  {i < line.split(" ").length - 1 ? " " : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );
};
