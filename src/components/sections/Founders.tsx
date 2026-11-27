"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CountUp } from "@/components/motion/CountUp";
import { EASE_OUT_EXPO, Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FOUNDERS = [
  {
    name: "Dr. Madhan Kumar Srinivasan",
    role: "Founder and CEO",
    photo: "/figma/founder-madhan.png",
    bio: "140+ patents filed, 100+ granted worldwide | Ph.D. in Cloud AI, IIM Calcutta (EPBA) | Accenture Prolific Inventor, 1 of 49 globally, and creator of Cloud AI at Accenture | Infosys Cloud Tech Guru | 3× TEDx Speaker | Invited speaker, WEF Annual Meeting 2024, Davos",
    stat: { value: 140, suffix: "+", label: "Patents filed" },
  },
];

type FounderCardProps = (typeof FOUNDERS)[number] & { index: number };

/**
 * Phone: photo on top, text below. Tablet/laptop: photo beside the text, stat under the bio.
 * Wide desktop (xl): the Figma layout with the stat in its own column behind a divider.
 */
const FounderCard = ({ name, role, photo, bio, stat, index }: FounderCardProps) => {
  const statBlock = (
    <div className="flex flex-col items-start">
      <span className="font-mono text-[48px] leading-[1.1] font-medium tracking-[0.04em] text-[#242424] xl:text-[64px] xl:leading-[1.2]">
        <CountUp to={stat.value} suffix={stat.suffix} duration={2} />
      </span>
      <span className="text-lg leading-[1.15] tracking-[0.02em] text-[#242424] xl:text-2xl">{stat.label}</span>
    </div>
  );

  return (
    <Reveal
      delay={index * 0.08}
      amount={0.25}
      className="group grid w-full gap-5 rounded-xl border-2 border-line bg-white p-4 transition-shadow duration-500 hover:shadow-[0_24px_60px_rgb(0_0_0/0.06)] sm:p-6 md:grid-cols-[240px_1fr] md:gap-8 xl:grid-cols-[269px_1fr_3px_260px]"
    >
      <motion.div
        initial={{ clipPath: "inset(12% 12% 12% 12% round 8px)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 8px)", opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        className="relative aspect-square w-full self-start overflow-hidden rounded-lg max-md:max-w-[340px]"
      >
        <Image
          src={photo}
          alt={`Portrait of ${name}`}
          fill
          sizes="(min-width: 768px) 269px, 340px"
          className="object-cover transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-[1.04]"
        />
      </motion.div>

      <div className="flex flex-col justify-between gap-6 md:py-2 xl:py-6">
        <p className="text-[15px] leading-[1.5] tracking-[0.01em] text-ink-2/90 text-pretty sm:text-base lg:text-lg lg:leading-[1.45]">{bio}</p>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-[22px] leading-[1.15] font-medium text-ink sm:text-2xl">{name}</h3>
            <p className="text-base leading-[1.2] tracking-[0.01em] text-muted">{role}</p>
          </div>
          <div className="xl:hidden">{statBlock}</div>
        </div>
      </div>

      <motion.span
        aria-hidden
        className="hidden w-[3px] origin-top bg-line xl:block"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.2 }}
      />

      <div className="hidden items-end p-2 xl:flex">{statBlock}</div>
    </Reveal>
  );
};

export const Founders = () => (
  <section id="founders" className="relative px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
    <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-8">
      <SectionHeading
        eyebrow="Meet Our"
        inline
        title="Leadership"
        description="50+ years of combined leadership experience across AI, cloud and intellectual property."
        className="max-w-[520px]"
      />
      {FOUNDERS.map((founder, index) => (
        <FounderCard key={founder.name} {...founder} index={index} />
      ))}
    </div>
  </section>
);
