"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE_OUT_EXPO, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Card, Eyebrow } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT, PATENT_GYM } from "@/content/site";

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="relative px-4 py-14 sm:px-8 lg:px-16">
    <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-10">{children}</div>
  </section>
);

const STATS = [
  { value: "140+", label: "Patents filed" },
  { value: "100+", label: "Grants worldwide" },
  { value: "23+", label: "Years of patent consulting" },
];

export const PatentGymPage = () => (
  <main className="relative overflow-x-clip">
    <PageHero
      eyebrow="Patent Gym™ · Patent Tech Consulting"
      title={["Turning Invention", "Into Intellectual Property"]}
      body={PATENT_GYM.intro}
    >
      <Button href={`mailto:${CONTACT.email}?subject=Patent%20Gym`} withPhone>
        Talk to us
      </Button>
      <Button href="#cortexa" variant="light">
        Meet Cortexa™ <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
      </Button>
    </PageHero>

    <Section>
      <Reveal className="grid w-full items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]" amount={0.2}>
        <div className="relative min-h-[280px] overflow-hidden rounded-xl">
          <Image src="/deck/patent-hands.webp" alt="Hand holding blocks spelling PATENT" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 rounded-xl bg-white/85 p-4 backdrop-blur-md">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-mono text-[24px] leading-none font-medium text-ink sm:text-[28px]">{stat.value}</span>
                <span className="text-[12px] leading-tight text-muted sm:text-[13px]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {PATENT_GYM.offerings.map((offering, i) => (
            <Card key={offering.title} className="group flex items-start gap-5 p-6 transition-transform duration-500 hover:-translate-x-1">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[var(--shadow-chip)]">
                <Image src={offering.icon} alt="" width={24} height={24} />
              </span>
              <div className="flex flex-col gap-1.5">
                <Eyebrow>
                  {String(i + 1).padStart(2, "0")} · {offering.eyebrow}
                </Eyebrow>
                <h2 className="text-[22px] leading-[1.15] font-medium tracking-[-0.02em] text-ink">{offering.title}</h2>
                <p className="text-[15px] leading-[1.45] text-muted">{offering.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="w-full max-w-[860px] text-center">
        <blockquote className="text-[22px] leading-[1.35] font-normal tracking-[-0.01em] text-ink text-balance sm:text-[28px]">
          <span className="text-brand">“</span>
          {PATENT_GYM.testimonial.quote}
          <span className="text-brand">”</span>
        </blockquote>
        <p className="mt-4 font-mono text-sm text-muted">— {PATENT_GYM.testimonial.author}</p>
      </Reveal>
    </Section>

    <section id="cortexa" className="relative scroll-mt-24 px-4 py-14 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-10">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <Image src="/deck/logo-cortexa.webp" alt="Cortexa" width={690} height={139} className="h-10 w-auto mix-blend-multiply sm:h-12" />
          <h2 className="text-[26px] leading-[1.1] font-medium tracking-[-0.01em] text-ink sm:text-[32px]">Enterprise Patent Intelligence Platform</h2>
          <p className="max-w-[560px] text-base leading-[1.4] text-muted">
            An innovation-to-IP platform to discover, evaluate, create, manage and monetize intellectual property, before, during and
            after patent filing.
          </p>
        </Reveal>

        <Stagger className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {PATENT_GYM.engines.map((engine, i) => (
            <StaggerItem key={engine.title}>
              <Card className="group relative flex h-full flex-col gap-3 overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: "linear-gradient(90deg, #9494ec, #90c0ff, #66cfff)" }}
                />
                <span className="relative font-mono text-sm text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="relative text-xl leading-[1.15] font-medium tracking-[-0.01em] text-ink">{engine.title}</h3>
                <p className="relative text-[15px] leading-[1.45] text-muted">{engine.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    <Section>
      <SectionHeading eyebrow="Cortexa™ Architecture" title="Built on MBrain™, governed by people" />
      <div className="flex w-full max-w-[860px] flex-col gap-2">
        {PATENT_GYM.layers.map((layer, i) => (
          <motion.div
            key={layer.title}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
            className={`flex flex-col gap-1 rounded-xl px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${
              i === 1 ? "bg-brand text-white shadow-[var(--shadow-cta)]" : "border-2 border-line bg-white text-ink"
            }`}
            style={{ marginInline: `${i * 1.5}%` }}
          >
            <p className="text-lg font-medium">{layer.title}</p>
            <p className={`text-[14px] leading-[1.4] sm:max-w-[380px] sm:text-right ${i === 1 ? "text-white/85" : "text-muted"}`}>{layer.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>

    <Section>
      <SectionHeading eyebrow="Five Design Principles" title="AI that assists the inventor" />
      <Stagger className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.07}>
        {PATENT_GYM.principles.map((principle) => (
          <StaggerItem key={principle.title}>
            <Card className="flex h-full flex-col gap-2 p-5">
              <span className="h-[3px] w-8 rounded-full bg-brand" />
              <h3 className="mt-3 text-lg leading-[1.15] font-medium text-ink">{principle.title}</h3>
              <p className="text-[14px] leading-[1.45] text-muted">{principle.body}</p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  </main>
);
