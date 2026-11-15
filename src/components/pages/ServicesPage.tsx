"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE_OUT_EXPO, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Card, Eyebrow } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT, EMAIL_CASE, INDUSTRIES, MENTORA_CASE, SERVICE_EXTRAS, SERVICE_PILLARS, TECH_GROUPS } from "@/content/site";

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="relative px-4 py-14 sm:px-8 lg:px-16">
    <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-10">{children}</div>
  </section>
);

export const ServicesPage = () => (
  <main className="relative overflow-x-clip">
    <PageHero
      eyebrow="We Make It Smarter"
      title={["End-to-End AI", "and IT Services"]}
      body="IT consulting, cloud services, AI and ML solutions and process automation, delivered at scale and speed by the team behind our own platforms."
    >
      <Button href={`mailto:${CONTACT.email}`} withPhone>
        Book a call
      </Button>
      <Button href="#cases" variant="light">
        See our work <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
      </Button>
    </PageHero>

    <Section>
      <Stagger className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {SERVICE_PILLARS.map((pillar, i) => (
          <StaggerItem key={pillar.title}>
            <Card className="group flex h-full min-h-[260px] flex-col justify-between gap-6 p-6 transition-transform duration-500 hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl bg-white shadow-[var(--shadow-chip)] transition-transform duration-500 group-hover:rotate-[-6deg]">
                  <Image src={pillar.icon} alt="" width={24} height={24} />
                </span>
                <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl leading-[1.1] font-medium tracking-[-0.02em] text-ink">{pillar.title}</h2>
                <p className="text-[15px] leading-[1.45] text-muted">{pillar.body}</p>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="flex w-full flex-col items-center gap-5">
        <Eyebrow>Also delivering</Eyebrow>
        <ul className="flex max-w-[900px] flex-wrap justify-center gap-2">
          {SERVICE_EXTRAS.map((item) => (
            <li key={item} className="rounded-full border border-line bg-white px-4 py-2 text-[15px] text-ink transition-colors hover:border-brand/40 hover:text-brand">
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>

    <section id="cases" className="relative scroll-mt-24 px-4 py-14 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-10">
        <SectionHeading eyebrow="In Production" title="Client use cases" />

        <Reveal className="w-full" amount={0.15}>
          <Card className="flex flex-col gap-8 p-6 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex max-w-[620px] flex-col gap-3">
                <Eyebrow>
                  {EMAIL_CASE.client} · {EMAIL_CASE.partner}
                </Eyebrow>
                <h3 className="text-[26px] leading-[1.15] font-medium tracking-[-0.02em] text-ink sm:text-[30px]">{EMAIL_CASE.title}</h3>
                <p className="text-base leading-[1.5] text-muted">{EMAIL_CASE.body}</p>
              </div>
              <Image src="/deck/client-trianz.webp" alt="Trianz" width={410} height={260} className="h-14 w-auto" />
            </div>
            <div className="no-scrollbar overflow-x-auto rounded-xl border-2 border-line bg-white">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th scope="col" className="px-5 py-4 font-mono text-[13px] font-medium tracking-[0.04em] text-muted uppercase">
                      Metric
                    </th>
                    {EMAIL_CASE.columns.map((column, i) => (
                      <th key={column} scope="col" className={`px-5 py-4 text-sm font-medium ${i === 2 ? "bg-brand/[0.06] text-brand" : "text-ink"}`}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {EMAIL_CASE.rows.map((row) => (
                    <tr key={row.metric} className="border-b border-line last:border-0">
                      <th scope="row" className="px-5 py-4 text-[15px] font-normal text-ink">
                        {row.metric}
                      </th>
                      {row.values.map((value, i) => (
                        <td
                          key={i}
                          className={`px-5 py-4 font-mono text-[17px] ${i === 2 ? "bg-brand/[0.06] font-medium text-brand" : i === 1 ? "text-muted line-through decoration-bad/40" : "text-ink"}`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[14px] leading-[1.45] text-muted">Built on {EMAIL_CASE.stack}</p>
          </Card>
        </Reveal>

        <Reveal className="w-full" amount={0.15}>
          <Card className="flex flex-col gap-8 p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="max-w-[560px] text-[26px] leading-[1.15] font-medium tracking-[-0.02em] text-ink sm:text-[30px]">{MENTORA_CASE.title}</h3>
              <Image src={MENTORA_CASE.logo} alt={MENTORA_CASE.client} width={129} height={137} className="h-14 w-auto" />
            </div>
            <ol className="grid gap-6 md:grid-cols-3">
              {MENTORA_CASE.points.map((point, i) => (
                <li key={point.title} className="flex flex-col gap-2 border-t border-line pt-4">
                  <span className="font-mono text-sm text-brand">
                    {String(i + 1).padStart(2, "0")} · {point.title}
                  </span>
                  <p className="text-[15px] leading-[1.5] text-ink-2/90">{point.body}</p>
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>
      </div>
    </section>

    <Section>
      <SectionHeading eyebrow="Technologies" title="Fast, scalable and secure" description="The stack we build with across backend, frontend, AI, data, cloud and XR." />
      <Reveal className="flex w-full flex-col items-center gap-6" amount={0.2}>
        <ul className="flex flex-wrap justify-center gap-2">
          {TECH_GROUPS.map((group, i) => (
            <motion.li
              key={group}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: EASE_OUT_EXPO }}
              className="rounded-full bg-brand px-4 py-2 text-[15px] font-medium text-white"
            >
              {group}
            </motion.li>
          ))}
        </ul>
        <div className="w-full max-w-[900px] overflow-hidden rounded-xl border-2 border-line bg-white p-4 sm:p-8">
          <Image src="/deck/tech-stack.webp" alt="Technology logos including Django, Node.js, React, PyTorch, OpenAI, Azure and Unity" width={1320} height={600} className="h-auto w-full" />
        </div>
      </Reveal>
    </Section>

    <Section>
      <SectionHeading eyebrow="Industries We Serve" title="Built for regulated, real-world operations" />
      <Reveal>
        <ul className="flex max-w-[760px] flex-wrap justify-center gap-2">
          {INDUSTRIES.map((industry) => (
            <li key={industry} className="rounded-full border border-line bg-white px-5 py-2.5 text-base text-ink">
              {industry}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  </main>
);
