"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TEAM, type TeamMember } from "@/content/site";

/** Soft brand gradients, one per card, so the illustrated avatars don't look identical. */
const AVATAR_GRADIENTS = [
  "linear-gradient(150deg, #dbe8ff 0%, #8fb8ff 55%, #1c74fa 100%)",
  "linear-gradient(150deg, #ece6ff 0%, #b9a8ff 55%, #6d5dfc 100%)",
  "linear-gradient(150deg, #dff6ff 0%, #8fdcff 55%, #2b9bf4 100%)",
  "linear-gradient(150deg, #e7f0ff 0%, #a3b8ff 55%, #4d4dff 100%)",
  "linear-gradient(150deg, #e3fbf2 0%, #95e3c6 55%, #1c9e8a 100%)",
];

/** Abstract head-and-shoulders silhouette used until real portraits are added. */
const Silhouette = () => (
  <svg viewBox="0 0 200 250" className="absolute inset-x-0 bottom-0 h-[86%] w-full" aria-hidden>
    <circle cx="100" cy="92" r="46" fill="white" fillOpacity="0.9" />
    <path d="M18 250c0-52 37-88 82-88s82 36 82 88z" fill="white" fillOpacity="0.9" />
  </svg>
);

const MemberCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <article className="group flex h-full flex-col gap-4 rounded-xl border border-[#e4e4e4] bg-white p-3 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 ease-(--ease-out-expo) hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgb(28_116_250/0.12)]">
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-lg"
      style={{ backgroundImage: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
    >
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="(min-width: 1024px) 220px, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div aria-hidden className="absolute -top-10 -right-10 size-32 rounded-full bg-white/30 blur-2xl" />
          <Silhouette />
        </motion.div>
      )}
      <span className="absolute top-2.5 left-2.5 rounded-full bg-white/85 px-2 py-0.5 font-mono text-[10.5px] font-medium tracking-[0.04em] text-ink uppercase backdrop-blur-sm">
        {member.team}
      </span>
      <a
        href={member.linkedin}
        aria-label={`${member.name} on LinkedIn`}
        className="absolute right-2.5 bottom-2.5 flex size-8 items-center justify-center rounded-full bg-ink/80 opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:opacity-100 focus-visible:opacity-100 max-lg:opacity-100"
      >
        <Image src="/figma/linkedin.svg" alt="" width={14} height={14} />
      </a>
    </div>
    <div className="flex flex-1 flex-col gap-1.5 px-1 pb-1">
      <h3 className="text-lg leading-[1.15] font-medium tracking-[-0.01em] text-ink">{member.name}</h3>
      <p className="text-[14px] font-medium text-brand">{member.role}</p>
      <p className="text-[13.5px] leading-[1.4] text-muted">{member.bio}</p>
    </div>
  </article>
);

export const Team = () => (
  <section id="team" className="relative scroll-mt-24 px-4 py-16 sm:px-8 lg:px-16">
    <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-10">
      <SectionHeading
        eyebrow="Our"
        inline
        title="Team"
        description="The engineers and operators who build, ship and run our platforms."
      />
      <Stagger
        className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:w-full sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5"
        stagger={0.08}
        amount={0.2}
      >
        {TEAM.map((member, index) => (
          <StaggerItem key={`${member.role}-${index}`} className="w-[68%] shrink-0 snap-center sm:w-auto">
            <MemberCard member={member} index={index} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);
