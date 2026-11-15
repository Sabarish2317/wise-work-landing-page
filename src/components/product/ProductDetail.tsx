"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { EASE_OUT_EXPO, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Button } from "@/components/ui/Button";
import { Card, CARD_GRADIENT, Eyebrow } from "@/components/ui/Card";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT, PRODUCTS, type Product } from "@/content/site";

const Section = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <section id={id} className="relative scroll-mt-24 px-4 py-14 sm:px-8 lg:px-16">
    <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-10">{children}</div>
  </section>
);

/** Large first screenshot that grows to full size as it scrolls in. */
const HeroShot = ({ product }: { product: Product }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const shot = product.screens[0];

  return (
    <div className="relative px-4 sm:px-8 lg:px-16 [perspective:1600px]">
      <motion.div ref={ref} style={{ scale, rotateX }} className="relative mx-auto max-w-[1000px] origin-top">
        <BrowserFrame src={shot.src} width={shot.width} height={shot.height} alt={`${product.short}: ${shot.title}`} priority sizes="(min-width: 1100px) 1000px, 100vw" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 20 }}
          className="absolute -bottom-6 left-4 rounded-2xl border-[1.5px] border-line bg-white/90 px-5 py-4 shadow-[3px_-1px_61px_0_rgb(98_157_246/0.3)] backdrop-blur-md sm:left-[-24px]"
        >
          <p className="font-mono text-[30px] leading-none font-medium text-brand">{product.headline.value}</p>
          <p className="mt-1 text-[13px] font-medium text-ink">{product.headline.label}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Steps = ({ product }: { product: Product }) => (
  <Section>
    <SectionHeading eyebrow="How It Works" title={`Inside ${product.name}`} description={product.summary} />
    <Stagger className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
      {product.steps?.map((step, i) => (
        <StaggerItem key={step.title}>
          <Card className="group relative flex h-full flex-col gap-3 overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1">
            <span className="font-mono text-2xl font-medium text-ink">{String(i + 1).padStart(2, "0")}</span>
            <motion.span
              className="h-[3px] w-10 origin-left rounded-full bg-brand"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 + i * 0.1 }}
            />
            <h3 className="mt-6 text-xl leading-[1.15] font-medium tracking-[-0.01em] text-ink">{step.title}</h3>
            <p className="text-[15px] leading-[1.45] text-muted">{step.body}</p>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
    <Reveal className="w-full">
      <ul className="flex flex-wrap justify-center gap-2">
        {product.features.map((feature) => (
          <li key={feature.label} className="flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pr-4 pl-1.5 text-[15px] text-ink">
            <span className="flex size-7 items-center justify-center rounded-full bg-brand/[0.08]">
              <Image src={feature.icon} alt="" width={16} height={16} />
            </span>
            {feature.label}
          </li>
        ))}
      </ul>
    </Reveal>
  </Section>
);

/** List of screen names on the left; the selected screenshot cross-fades on the right. */
const ScreenTour = ({ product }: { product: Product }) => {
  const [active, setActive] = useState(0);
  const screen = product.screens[active];

  return (
    <Section>
      <SectionHeading eyebrow="Product Tour" title="See it in action" description="Real screens from production deployments." />
      <Reveal className="grid w-full gap-6 lg:grid-cols-[320px_1fr] lg:items-center" amount={0.2}>
        <div role="tablist" aria-label={`${product.short} screens`} className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col">
          {product.screens.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                className={`relative shrink-0 rounded-xl border px-4 py-3 text-left transition-[background-color,border-color] duration-300 lg:px-5 lg:py-4 ${
                  selected ? "border-brand/30 bg-white shadow-[var(--shadow-card)]" : "border-transparent hover:bg-white/60"
                }`}
              >
                {selected && (
                  <motion.span layoutId={`tour-${product.slug}`} className="absolute top-3 bottom-3 left-0 w-[3px] rounded-full bg-brand max-lg:hidden" />
                )}
                <span className={`block text-[15px] font-medium whitespace-nowrap lg:text-base ${selected ? "text-ink" : "text-muted"}`}>{item.title}</span>
                <span className="mt-1 hidden text-[14px] leading-[1.4] text-muted lg:block">{item.body}</span>
              </button>
            );
          })}
        </div>
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={screen.src}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            >
              <BrowserFrame src={screen.src} width={screen.width} height={screen.height} alt={`${product.short}: ${screen.title}`} sizes="(min-width: 1024px) 800px, 100vw" />
              <p className="mt-3 text-[14px] text-muted lg:hidden">{screen.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
};

const Roi = ({ product }: { product: Product }) => (
  <Section>
    <SectionHeading eyebrow="Return on Investment" title={product.roi.title} />
    <Reveal className="grid w-full gap-6 lg:grid-cols-[1fr_1.3fr]" amount={0.2}>
      <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-xl bg-gradient-to-br from-brand-deep to-brand p-8 text-white">
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/20 blur-3xl" />
        <p className="relative font-mono text-[13px] tracking-[0.06em] text-white/75 uppercase">{product.roi.figureLabel}</p>
        <div className="relative">
          <p className="font-mono text-[44px] leading-none font-medium sm:text-[56px]">{product.roi.figure}</p>
          <p className="mt-4 max-w-[380px] text-base leading-[1.4] text-white/90">{product.roi.figureNote}</p>
        </div>
        <p className="relative border-t border-white/20 pt-4 text-[14px] leading-[1.45] text-white/75">Baseline: {product.roi.baseline}</p>
      </div>
      <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.07}>
        {product.roi.drivers.map((driver) => (
          <StaggerItem key={driver.label}>
            <Card className="flex h-full flex-col justify-end gap-2 p-6">
              {driver.value ? (
                <span className="font-mono text-[34px] leading-none font-medium text-ink">{driver.value}</span>
              ) : (
                <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-brand" aria-hidden>
                  ✓
                </span>
              )}
              <span className="h-[3px] w-8 rounded-full bg-brand" />
              <span className="text-[15px] leading-[1.4] text-ink-2">{driver.label}</span>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  </Section>
);

const OtherProducts = ({ current }: { current: Product }) => (
  <Section>
    <SectionHeading eyebrow="Explore" title="Other flagship products" />
    <Stagger className="grid w-full gap-4 sm:grid-cols-3" stagger={0.08}>
      {PRODUCTS.filter((product) => product.slug !== current.slug).map((product) => (
        <StaggerItem key={product.slug}>
          <Link
            href={`/products/${product.slug}`}
            className="group flex h-full flex-col gap-4 rounded-xl border border-[#e4e4e4] p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgb(28_116_250/0.12)]"
            style={{ backgroundImage: CARD_GRADIENT }}
          >
            <Image src={product.logo.src} alt={product.name} width={product.logo.width} height={product.logo.height} className="h-8 w-auto self-start" />
            <Eyebrow>{product.category}</Eyebrow>
            <p className="flex-1 text-[15px] leading-[1.45] text-muted">{product.summary}</p>
            <span className="text-[15px] font-medium text-ink">
              View product <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  </Section>
);

export const ProductDetail = ({ product }: { product: Product }) => (
  <main className="relative overflow-x-clip">
    <PageHero eyebrow={product.category} title={[product.name]} body={product.description}>
      <Button href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`${product.name} demo`)}`} withPhone>
        Book a demo
      </Button>
      <Button href="#results" variant="light">
        See results <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
      </Button>
    </PageHero>
    <HeroShot product={product} />
    {product.steps && <Steps product={product} />}
    <ScreenTour product={product} />
    <Roi product={product} />
    <Section>
      <SectionHeading eyebrow="Competitive Landscape" title="How we compare" />
      <Reveal className="w-full" amount={0.1}>
        <ComparisonTable comparison={product.comparison} />
      </Reveal>
    </Section>
    <Section id="results">
      <SectionHeading eyebrow="Proven Impact" title="Client use cases" />
      <Stagger className="flex w-full flex-col gap-6" stagger={0.1} amount={0.1}>
        {product.cases.map((study) => (
          <StaggerItem key={study.title}>
            <CaseStudyCard study={study} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
    <OtherProducts current={product} />
  </main>
);
