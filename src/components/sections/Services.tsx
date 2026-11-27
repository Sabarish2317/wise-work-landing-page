"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { PointerEvent } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES, PRODUCTS } from "@/content/site";

const OFFERS = [
  {
    eyebrow: "4 Flagship Products",
    title: ["Enterprise AI", "Platforms"],
    body: "Wise Ultima™, Wise Migrate™, iStruct™ and Wise Maestro™ for infra health, migration, documents and knowledge.",
    tags: ["Infra Health", "Document AI", "Private GPT"],
    href: "/#products",
    icon: "/figma/icon-reports.svg",
    glow: "linear-gradient(90deg, #94ecc4 0%, #90c0ff 55%, #66cfff 100%)",
  },
  {
    eyebrow: "End-to-End AI and IT",
    title: ["AI and IT", "Services"],
    body: "Gen AI and agentic AI, ML, custom development, IT consulting and process automation, delivered at scale and speed.",
    tags: ["Agentic AI", "Cloud", "Full-stack"],
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

const PRODUCT_LOGOS = PRODUCTS.map((product) => product.logo);

/** Product wordmarks as small tiles that fan out on hover. */
const ProductsVisual = () => (
  <div className="grid grid-cols-2 gap-2">
    {PRODUCT_LOGOS.map((logo, i) => (
      <span
        key={logo.src}
        className={`flex h-9 w-[104px] items-center justify-center rounded-lg border border-line bg-white px-2 shadow-[0_6px_16px_-8px_rgb(28_116_250/0.35)] transition-transform duration-500 ease-(--ease-out-expo) ${
          ["group-hover:-translate-x-1 group-hover:-translate-y-1", "group-hover:translate-x-1 group-hover:-translate-y-1", "group-hover:-translate-x-1 group-hover:translate-y-1", "group-hover:translate-x-1 group-hover:translate-y-1"][i]
        }`}
      >
        <Image src={logo.src} alt="" width={logo.width} height={logo.height} className="h-5 w-auto" />
      </span>
    ))}
  </div>
);

/** Data → LLM → Agent pipeline with a pulse travelling along it. */
const ServicesVisual = () => (
  <div className="relative flex items-center gap-6">
    <span aria-hidden className="absolute inset-x-4 top-1/2 border-t border-dashed border-brand/40" />
    <motion.span
      aria-hidden
      className="absolute top-1/2 left-4 size-2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_10px_#1c74fa]"
      animate={{ left: ["8%", "88%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    />
    {["Data", "LLM", "Agent"].map((node) => (
      <span
        key={node}
        className="relative rounded-lg border border-line bg-white px-3 py-2 font-mono text-[12px] font-medium text-ink shadow-[0_6px_16px_-8px_rgb(28_116_250/0.35)]"
      >
        {node}
      </span>
    ))}
  </div>
);

/** Headline patent count on a glass chip over the colour wash. */
const PatentVisual = () => (
  <div className="rounded-xl border border-white/60 bg-white/45 px-4 py-3 backdrop-blur-md">
    <p className="font-mono text-[28px] leading-none font-medium text-ink">140+</p>
    <p className="mt-1 text-[12px] text-ink/70">patents filed · 100+ granted</p>
  </div>
);

const VISUALS = [ProductsVisual, ServicesVisual, PatentVisual];

type OfferCardProps = (typeof OFFERS)[number] & { featured: boolean; index: number };

/** Gradient glow card; the glow follows the pointer and blooms on hover. */
const OfferCard = ({ eyebrow, title, body, tags, href, icon, glow, featured, index }: OfferCardProps) => {
  const Visual = VISUALS[index];
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
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#e4e4e4] p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 ease-(--ease-out-expo) hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgb(28_116_250/0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:p-6"
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

      <div className="relative flex items-start justify-between">
        <span
          className={`flex size-[55px] shrink-0 items-center justify-center rounded-[48px] backdrop-blur-[8.7px] transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-105 group-hover:rotate-[-8deg] ${
            featured ? "" : "bg-white shadow-[0_4px_14px_rgb(28_116_250/0.18)]"
          }`}
          style={featured ? { backgroundImage: "linear-gradient(140.7deg, rgb(255 255 255 / 0.2) 0%, rgb(255 255 255 / 0.4) 91.8%)" } : undefined}
        >
          <Image src={icon} alt="" width={24} height={24} />
        </span>
        <span className="flex size-9 items-center justify-center rounded-full bg-white/80 text-ink transition-[opacity,transform] duration-500 lg:-translate-x-2 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
          →
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center py-6 sm:py-8">
        <Visual />
      </div>

      <div className="relative flex flex-col items-start gap-4">
        <p className="font-mono text-[14px] leading-[0.98] font-medium tracking-[0.02em] text-muted uppercase sm:text-base">{eyebrow}</p>
        <h3 className="text-2xl leading-[1.1] font-medium tracking-[-0.02em] text-ink">
          {title[0]}
          <br />
          {title[1]}
        </h3>
        <p className="text-base leading-[1.25] tracking-[0.01em] text-muted">{body}</p>
        <ul className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line bg-white/80 px-2.5 py-1 text-[12px] font-medium text-ink/80">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export const Services = () => (
  <section id="offer" className="relative px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
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

      <Stagger className="grid w-full gap-5 md:grid-cols-2 md:[&>*:last-child]:col-span-2 lg:grid-cols-3 lg:gap-6 lg:[&>*:last-child]:col-span-1" stagger={0.12}>
        {OFFERS.map((offer, index) => (
          <StaggerItem key={offer.eyebrow} className="h-full">
            <OfferCard {...offer} index={index} featured={index === OFFERS.length - 1} />
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
