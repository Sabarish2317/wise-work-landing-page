"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE_OUT_EXPO, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Footprint } from "@/components/sections/Footprint";
import { Recognition } from "@/components/sections/Recognition";
import { Button } from "@/components/ui/Button";
import { Card, Eyebrow } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ACADEMIC, CONTACT, FOUNDER, GLANCE_STATS, VISION } from "@/content/site";

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="relative px-4 py-14 sm:px-8 lg:px-16">
    <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-10">{children}</div>
  </section>
);

export const AboutPage = () => (
  <main className="relative overflow-x-clip">
    <PageHero
      eyebrow="Wise Work at a Glance"
      title={["An AI-Native Company", "Built for Enterprise Delivery"]}
      body="Since 2023 we have built enterprise AI products, delivered engineering services and turned ideas into patents for clients across India, Saudi Arabia and the USA."
    >
      <Button href={`mailto:${CONTACT.email}`} withPhone>
        Get in touch
      </Button>
    </PageHero>

    <Section>
      <Stagger className="grid w-full grid-cols-2 overflow-hidden rounded-xl border-2 border-line bg-white lg:grid-cols-4" stagger={0.05} amount={0.2}>
        {GLANCE_STATS.map((stat, i) => (
          <StaggerItem
            key={stat.label}
            className={`flex flex-col gap-2 border-line p-5 sm:p-7 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t" : ""} ${
              i % 4 === 2 ? "lg:border-l" : ""
            } ${i < 4 ? "lg:border-t-0" : ""}`}
          >
            <span className="font-mono text-[30px] leading-none font-medium text-ink sm:text-[40px]">{stat.value}</span>
            <span className="h-[3px] w-8 rounded-full bg-brand" />
            <span className="text-[14px] leading-[1.4] text-muted sm:text-[15px]">{stat.label}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>

    <Section>
      <SectionHeading eyebrow="Our Vision" title={VISION.title} />
      <Stagger className="grid w-full gap-4 md:grid-cols-3" stagger={0.1}>
        {VISION.missions.map((mission, i) => (
          <StaggerItem key={mission.title}>
            <Card className="relative flex h-full min-h-[220px] flex-col justify-end gap-3 overflow-hidden p-6">
              <span className="absolute top-4 right-5 font-mono text-[64px] leading-none font-medium text-brand/10">{i + 1}</span>
              <Eyebrow>{mission.label}</Eyebrow>
              <h3 className="text-2xl leading-[1.1] font-medium tracking-[-0.02em] text-ink">{mission.title}</h3>
              <p className="text-[15px] leading-[1.45] text-muted">{mission.body}</p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>

    <Section>
      <SectionHeading eyebrow="Leadership" title="Meet our founder" />
      <Reveal className="grid w-full gap-6 rounded-xl border-2 border-line bg-white p-4 sm:p-6 md:grid-cols-[300px_1fr] lg:gap-10" amount={0.2}>
        <motion.div
          initial={{ clipPath: "inset(10% 10% 10% 10% round 8px)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 8px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          className="relative aspect-[555/700] w-full overflow-hidden rounded-lg bg-[#d9e9db]"
        >
          <Image src="/deck/founder-madhan-portrait.webp" alt={`Portrait of ${FOUNDER.name}`} fill sizes="300px" className="object-cover object-top" />
        </motion.div>
        <div className="flex flex-col gap-6 p-2 sm:p-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-[26px] leading-[1.1] font-medium tracking-[-0.02em] text-ink sm:text-[30px]">{FOUNDER.name}</h3>
            <p className="text-base text-muted">{FOUNDER.role}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-y border-line py-5 sm:grid-cols-4">
            {FOUNDER.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-mono text-[30px] leading-none font-medium text-ink">{stat.value}</span>
                <span className="text-[13px] text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {FOUNDER.credentials.map((item) => (
              <li key={item} className="flex gap-2.5 text-[15px] leading-[1.4] text-ink-2">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>

    <Recognition />

    <Section>
      <SectionHeading
        eyebrow="Collaborations"
        title="Academic ecosystem"
        description="A direct academic innovation network with leading universities across India."
      />
      <Stagger className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.07}>
        {ACADEMIC.stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card className="flex h-full flex-col gap-2 p-5 sm:p-6">
              <span className="font-mono text-[30px] leading-none font-medium text-ink sm:text-[38px]">{stat.value}</span>
              <span className="text-[14px] leading-[1.4] text-muted">{stat.label}</span>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="flex w-full flex-col gap-6" amount={0.15}>
        <div className="overflow-hidden rounded-xl border-2 border-line bg-white p-4 sm:p-6">
          <Image src="/deck/academic-logos.webp" alt="Logos of partner universities" width={1610} height={460} className="h-auto w-full" />
        </div>
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Academic MOUs</Eyebrow>
            <ul className="flex flex-wrap gap-2">
              {ACADEMIC.partners.map((partner) => (
                <li key={partner} className="rounded-full border border-line bg-white px-3 py-1.5 text-[14px] text-ink">
                  {partner}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow>Professor of Practice</Eyebrow>
            <ul className="flex flex-col gap-2">
              {ACADEMIC.professorships.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15px] text-ink-2">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>

    <Footprint />
  </main>
);
