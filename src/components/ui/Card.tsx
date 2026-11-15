import type { ComponentProps } from "react";

export const CARD_GRADIENT = "linear-gradient(160.5deg, #fff 13.4%, #f0f0f0 186.6%)";

/** The soft white-to-grey card used across the Figma design. */
export const Card = ({ className = "", style, ...rest }: ComponentProps<"div">) => (
  <div
    className={`rounded-xl border border-[#e4e4e4] shadow-[var(--shadow-card)] ${className}`}
    style={{ backgroundImage: CARD_GRADIENT, ...style }}
    {...rest}
  />
);

/** Small monospace label used above titles ("PREDICT & PREVENT"). */
export const Eyebrow = ({ className = "", ...rest }: ComponentProps<"p">) => (
  <p
    className={`font-mono text-[13px] leading-[1.1] font-medium tracking-[0.04em] text-muted uppercase sm:text-sm ${className}`}
    {...rest}
  />
);
