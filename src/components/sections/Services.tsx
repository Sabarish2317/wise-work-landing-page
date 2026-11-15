"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { PointerEvent } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/content/site";

const OFFERS = [
  {
    eyebrow: "4 Flagship Products",
    title: ["Enterprise AI", "Platforms"],
    body: "Wise Ultima™, Wise Migrate™, iStruct™ and Wise Maestro™ for infra health, migration, documents and knowledge.",
    tags: ["Infra Health", "Cloud Migration", "Document AI", "Private GPT"],
    href: "/#products",
    icon: "/figma/icon-reports.svg",
    glow: "linear-gradient(90deg, #94ecc4 0%, #90c0ff 55%, #66cfff 100%)",
  },
  {
    eyebrow: "End-to-End AI and IT",
    title: ["AI and IT", "Services"],
    body: "Gen AI and agentic AI, ML, custom development, IT consulting and process automation, delivered at scale and speed.",
    tags: ["Gen AI", "Agentic AI", "Cloud", "Full-stack"],
    href: "/services",
    icon: "/figma/icon-automated.svg",
    glow: "linear-gradient(90deg, #90c0ff 0%, #66a3ff 50%, #8f8cff 100%)",
  },
  {
    eyebrow: "Patent Tech Consulting",
    title: ["Patent", "Gym™"],
    body: "Harvest hidden patents, seed new ones and protect copyrights and trademarks, now powered by the Cortexa™ platform.",
    tags: ["Harvesting", "Seeding", "Other IPs"],
    href: "/patent-gym",
    icon: "/figma/icon-transfer.svg",
    glow: "linear-gradient(90deg, #9494ec 0%, #bfacff 36%, #90c0ff 67%, #66cfff 100%)",
  },
];

type OfferCardProps = (typeof OFFERS)[number] & { featured: boolean };

/** Gradient glow card; the glow follows the pointer and blooms on hover. */
const OfferCard = ({ eyebrow, title, body, tags, href, icon, glow, featured }: OfferCardProps) => {
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${pointerX}% ${pointerY}%, rgb(28 116 250 / 0.10), transparent 60%)`;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <Link
      href={href}
      onPointerMove={handlePointerMove}
      className="group relative flex h-[380px] flex-col items-start justify-end gap-4 overflow-hidden rounded-xl border border-[#e4e4e4] p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 ease-(--ease-out-expo) hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgb(28_116_250/0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:h-[400px]"
      style={{ backgroundImage: "linear-gradient(160.5deg, #fff 13.4%, #f0f0f0 186.6%)" }}
    >
      {/* Blurred colour wash (Figma 1146:32). Always on for the featured card, blooms on hover for the rest. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-px left-0 h-[182px] w-full blur-[50px] transition-[opacity,transform] duration-700 ease-(--ease-out-expo) ${
          featured ? "opacity-100" : "translate-y-[-30%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        }`}
      >
        <div className="absolute -top-[15px] -left-[29px] h-[212px] w-[436px] blur-[34.5px]" style={{ backgroundImage: glow }} />
      </div>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <span
        className={`absolute top-[18px] left-[23px] flex size-[55px] items-center justify-center rounded-[48px] backdrop-blur-[8.7px] transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-105 group-hover:rotate-[-8deg] ${
          featured ? "" : "bg-white shadow-[0_4px_14px_rgb(28_116_250/0.18)]"
        }`}
        style={featured ? { backgroundImage: "linear-gradient(140.7deg, rgb(255 255 255 / 0.2) 0%, rgb(255 255 255 / 0.4) 91.8%)" } : undefined}
      >
        <Image src={icon} alt="" width={24} height={24} />
      </span>
      <span className="absolute top-6 right-6 flex size-9 items-center justify-center rounded-full bg-white/80 text-ink opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:opacity-100 max-sm:opacity-100 sm:-translate-x-2">
        →
      </span>

      <p className="relative font-mono text-[14px] leading-[0.98] font-medium tracking-[0.02em] text-muted uppercase sm:text-base">{eyebrow}</p>
      <h3 className="relative text-2xl leading-[1.1] font-medium tracking-[-0.02em] text-ink">
        {title[0]}
        <br />
        {title[1]}
      </h3>
      <p className="relative text-base leading-[1.25] tracking-[0.01em] text-muted">{body}</p>
      <ul className="relative flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li key={tag} className="rounded-full border border-line bg-white/80 px-2.5 py-1 text-[12px] font-medium text-ink/80">
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
};

export const Services = () => (
  <section id="offer" className="relative px-4 py-16 sm:px-8 lg:px-16">
    <div className="relative mx-auto flex max-w-[1169px] flex-col items-center gap-8">
      <motion.div
        aria-hidden
        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 hidden md:block"
      >
        <Image src="/figma/dot-grid.svg" alt="" width={69} height={68} />
      </motion.div>

      <SectionHeading
        eyebrow="What We Offer"
        title="Products, Services and Patent Gym™"
        description="An AI-native innovation company: we build enterprise products, deliver engineering services and turn ideas into patents."
      />

      <Stagger className="grid w-full gap-6 md:grid-cols-3" stagger={0.12}>
        {OFFERS.map((offer, index) => (
          <StaggerItem key={offer.eyebrow}>
            <OfferCard {...offer} featured={index === OFFERS.length - 1} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="flex w-full flex-col items-center gap-5">
        <p className="font-mono text-[13px] font-medium tracking-[0.06em] text-muted uppercase">Industries we serve</p>
        <ul className="flex max-w-[760px] flex-wrap justify-center gap-2">
          {INDUSTRIES.map((industry) => (
            <li
              key={industry}
              className="rounded-full border border-line bg-white px-4 py-2 text-[15px] text-ink transition-colors duration-300 hover:border-brand/40 hover:text-brand"
            >
              {industry}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-[18px]">
          <Button href="#contact" withPhone>
            Book a call
          </Button>
          <Button href="/about" variant="light">
            About Wise Work <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </div>
      </Reveal>
    </div>
  </section>
);
