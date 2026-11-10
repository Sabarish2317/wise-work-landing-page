"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  amount?: number;
};

/** Fades, lifts and un-blurs its children the first time they scroll into view. */
export const Reveal = ({
  children,
  delay = 0,
  amount = 0.3,
  ...rest
}: RevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    variants={revealVariants}
    transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

type StaggerProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  amount?: number;
};

/** Parent that staggers any <StaggerItem> children as they enter the viewport. */
export const Stagger = ({
  children,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  ...rest
}: StaggerProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    transition={{ staggerChildren: stagger, delayChildren: delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children,
  ...rest
}: HTMLMotionProps<"div"> & { children: ReactNode }) => (
  <motion.div
    variants={revealVariants}
    transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
    {...rest}
  >
    {children}
  </motion.div>
);
