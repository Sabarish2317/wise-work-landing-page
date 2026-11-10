"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CountUp } from "@/components/motion/CountUp";
import { EASE_OUT_EXPO, Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FOUNDERS = [
  {
    name: "Dr. Madhan Kumar Srinivasan",
    role: "CEO",
    photo: "/figma/founder-madhan.png",
    bio: "Inventor of 121 Patents | TEDx Speaker | Accenture Prolific Inventor & Infosys Cloud Tech Guru awardee | Cloud AI & Futuristic Tech Expert | Serial Entrepreneur with 20+ years of experience & 30+ research publications",
    stat: { value: 120, suffix: "+", label: "Patent inventor" },
  },
  {
    name: "Shivaram K R",
    role: "President",
    photo: "/figma/founder-shivaram.png",
    bio: "Serial Entrepreneur | Founder of 11 AI Startups | 4 First-time World Innovations | TEDx Speaker | AI Expert | Algo Trader | AI Advisor to World Economic Forum and Government of India | 20+ years of AI experience | IIT Delhi Alumni | Hands-on Coder",
    stat: { value: 11, suffix: "", label: "AI startups Founder" },
  },
];

type FounderCardProps = (typeof FOUNDERS)[number] & { index: number };

const FounderCard = ({ name, role, photo, bio, stat, index }: FounderCardProps) => (
  <Reveal
    delay={index * 0.08}
    amount={0.25}
    className="group flex w-full flex-col gap-0 rounded-xl border-2 border-line bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_rgb(0_0_0/0.06)] md:flex-row md:gap-6 md:px-6"
  >
    <div className="p-4 pb-0 sm:p-6 sm:pb-0 md:px-0 md:py-6">
      <motion.div
        initial={{ clipPath: "inset(12% 12% 12% 12% round 8px)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 8px)", opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        className="relative aspect-square w-full overflow-hidden rounded-lg md:size-[269px]"
      >
        <Image
          src={photo}
          alt={`Portrait of ${name}`}
          fill
          sizes="(min-width: 768px) 269px, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-[1.04]"
        />
      </motion.div>
    </div>

    <div className="flex flex-1 flex-col justify-between gap-6 px-5 py-6 sm:px-7 md:px-3 md:py-8">
      <p className="text-base leading-[1.45] tracking-[0.02em] text-ink-2/90 text-pretty lg:text-lg lg:leading-[1.4]">{bio}</p>
      <div className="flex flex-col gap-2">
        <h3 className="text-[22px] leading-[1.1] font-medium text-ink sm:text-2xl">{name}</h3>
        <p className="text-base leading-[1.2] tracking-[0.01em] text-muted">{role}</p>
      </div>
    </div>

    <motion.span
      aria-hidden
      className="mx-5 block h-[3px] origin-left bg-line md:mx-0 md:h-auto md:w-[3px] md:origin-top"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.2 }}
    />

    <div className="flex flex-col items-start justify-end p-6 md:w-[240px] lg:w-[300px]">
      <span className="font-mono text-[52px] leading-[1.2] font-medium tracking-[0.04em] text-[#242424] sm:text-[64px]">
        <CountUp to={stat.value} suffix={stat.suffix} duration={2} />
      </span>
      <span className="text-xl leading-[1.15] tracking-[0.02em] text-[#242424] sm:text-2xl">{stat.label}</span>
    </div>
  </Reveal>
);

export const Founders = () => (
  <section id="founders" className="relative px-4 py-16 sm:px-8 lg:px-16">
    <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-8">
      <SectionHeading
        eyebrow="Meet Our"
        inline
        title="Founders"
        description="Inventors and operators who have built, scaled and exited deep-tech companies."
        className="max-w-[520px]"
      />
      {FOUNDERS.map((founder, index) => (
        <FounderCard key={founder.name} {...founder} index={index} />
      ))}
    </div>
  </section>
);
