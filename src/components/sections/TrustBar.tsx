"use client";

import { CountUp } from "@/components/motion/CountUp";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { HEADLINE_STATS } from "@/content/site";

/** Headline numbers from the profile cover, then the client and partner logo strip. */
export const TrustBar = () => (
  <section aria-label="Wise Work in numbers" className="relative px-4 pb-16 sm:px-8 lg:px-16">
    <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-12">
      <Stagger
        className="grid w-full grid-cols-2 overflow-hidden rounded-xl border-2 border-line bg-white/70 backdrop-blur-sm lg:grid-cols-4"
        stagger={0.08}
        amount={0.4}
      >
        {HEADLINE_STATS.map((stat, i) => (
          <StaggerItem
            key={stat.label}
            className={`flex flex-col gap-2 px-5 py-6 sm:px-8 sm:py-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${
              i >= 2 ? "border-t border-line lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <span className="font-mono text-[36px] leading-none font-medium tracking-[0.02em] text-ink sm:text-[48px]">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </span>
            <span className="h-[3px] w-10 rounded-full bg-brand" />
            <span className="text-[15px] leading-[1.25] text-muted sm:text-base">{stat.label}</span>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="flex w-full flex-col items-center gap-6">
        <p className="font-mono text-[13px] font-medium tracking-[0.06em] text-muted uppercase">
          Trusted by clients and innovation partners
        </p>
        <LogoMarquee />
      </Reveal>
    </div>
  </section>
);
