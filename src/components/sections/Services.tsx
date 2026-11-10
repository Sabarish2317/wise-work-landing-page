"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { PointerEvent } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SERVICES = [
  {
    eyebrow: "Intellectual Property Valuation",
    title: ["Hyphenate your", "IP Valuations"],
    body: "Data-backed valuations of your patents and IP portfolio, ready for funding, licensing and M&A.",
    icon: "/figma/icon-reports.svg",
    glow: "linear-gradient(90deg, #94ecc4 0%, #90c0ff 55%, #66cfff 100%)",
  },
  {
    eyebrow: "Automated Services",
    title: ["Tailormade cloud", "Services"],
    body: "Cloud architecture, automation and FinOps designed around how your teams actually ship.",
    icon: "/figma/icon-automated.svg",
    glow: "linear-gradient(90deg, #90c0ff 0%, #66a3ff 50%, #8f8cff 100%)",
  },
  {
    eyebrow: "Predict & Prevent",
    title: ["IT Infrastructure", "Management"],
    body: "Spot capacity, latency and failure risks early, then fix them before they become incidents.",
    icon: "/figma/icon-transfer.svg",
    glow: "linear-gradient(90deg, #9494ec 0%, #bfacff 36%, #90c0ff 67%, #66cfff 100%)",
  },
];

type ServiceCardProps = (typeof SERVICES)[number] & { featured: boolean };

/** Gradient glow card; the glow follows the pointer and blooms on hover. */
const ServiceCard = ({ eyebrow, title, body, icon, glow, featured }: ServiceCardProps) => {
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${pointerX}% ${pointerY}%, rgb(28 116 250 / 0.10), transparent 60%)`;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <article
      onPointerMove={handlePointerMove}
      className="group relative flex h-[320px] flex-col items-start justify-end gap-4 overflow-hidden rounded-xl border border-[#e4e4e4] p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 ease-(--ease-out-expo) hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgb(28_116_250/0.12)] sm:h-[360px]"
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
        className={`absolute top-[18px] left-[23px] flex size-[55px] items-center justify-center rounded-[48px] backdrop-blur-[8.7px] transition-[transform,background-color] duration-500 ease-(--ease-out-expo) group-hover:scale-105 group-hover:rotate-[-8deg] ${
          featured ? "" : "bg-white shadow-[0_4px_14px_rgb(28_116_250/0.18)]"
        }`}
        style={featured ? { backgroundImage: "linear-gradient(140.7deg, rgb(255 255 255 / 0.2) 0%, rgb(255 255 255 / 0.4) 91.8%)" } : undefined}
      >
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
        />
      </span>

      <p className="relative font-mono text-[14px] leading-[0.98] font-medium tracking-[0.02em] text-muted uppercase sm:text-base">
        {eyebrow}
      </p>
      <h3 className="relative text-2xl leading-[1.1] font-medium tracking-[-0.02em] text-ink">
        {title[0]}
        <br />
        {title[1]}
      </h3>
      <p className="relative text-base leading-[1.2] tracking-[0.01em] text-muted">{body}</p>
    </article>
  );
};

export const Services = () => (
  <section id="services" className="relative px-4 py-16 sm:px-8 lg:px-16">
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
        eyebrow="We Are"
        title="Trusted by enterprise IT teams"
        description="From IP strategy to cloud operations, one partner across the stack."
      />

      <Stagger className="grid w-full gap-6 md:grid-cols-3" stagger={0.12}>
        {SERVICES.map((service, index) => (
          <StaggerItem key={service.eyebrow}>
            <ServiceCard {...service} featured={index === SERVICES.length - 1} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="flex w-full flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-[18px]">
          <Button href="#contact" withPhone>
            Book a call
          </Button>
          <Button href="#products" variant="light">
            Get Started <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </div>
        <p className="max-w-[340px] text-center text-base leading-[1.3] tracking-[0.01em] text-muted">
          Talk to an engineer, not a sales script. We reply within one business day.
        </p>
      </Reveal>
    </div>
  </section>
);
