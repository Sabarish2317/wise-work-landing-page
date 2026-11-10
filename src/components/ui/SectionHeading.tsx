import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  /** Small monospace lead-in ("We Are", "Meet Our"). */
  eyebrow?: string;
  /** When true the eyebrow sits inline with the title instead of above it. */
  inline?: boolean;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export const SectionHeading = ({
  eyebrow,
  inline = false,
  title,
  description,
  className = "",
}: SectionHeadingProps) => (
  <Reveal
    className={`mx-auto flex max-w-[460px] flex-col items-center gap-4 text-center ${className}`}
  >
    <h2 className="text-[26px] leading-[1.1] font-medium tracking-[-0.01em] text-ink text-balance sm:text-[32px]">
      {eyebrow && (
        <span
          className={`font-mono font-medium tracking-[-0.03em] text-muted ${inline ? "" : "block"}`}
        >
          {eyebrow}
          {inline ? " " : ""}
        </span>
      )}
      {title}
    </h2>
    {description && (
      <p className="text-base leading-[1.2] tracking-[0.01em] text-muted text-pretty">
        {description}
      </p>
    )}
  </Reveal>
);
