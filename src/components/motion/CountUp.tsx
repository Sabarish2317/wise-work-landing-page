"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type CountUpProps = {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts from 0 to `to` once it scrolls into view; writes to the DOM directly to avoid re-renders. */
export const CountUp = ({
  to,
  decimals = 0,
  suffix = "",
  duration = 1.8,
  className,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    const controls = animate(0, to, {
      duration: reduceMotion ? 0 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        node.textContent = `${value.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, suffix, duration, reduceMotion]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {`${(0).toFixed(decimals)}${suffix}`}
    </span>
  );
};
