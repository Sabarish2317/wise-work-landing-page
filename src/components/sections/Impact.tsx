"use client";

import Image from "next/image";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CARD_GRADIENT } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EMAIL_CASE, PRODUCTS, type ProductSlug } from "@/content/site";

type Highlight = {
  key: string;
  client: string;
  logo?: string;
  tag: string;
  href: string;
  value: string;
  label: string;
  summary: string;
};

/** Turns the n-th case study of a product into a highlight card. */
const fromCase = (slug: ProductSlug, index: number): Highlight => {
  const product = PRODUCTS.find((item) => item.slug === slug)!;
  const study = product.cases[index];
  return {
    key: `${slug}-${index}`,
    client: study.client,
    logo: study.logo,
    tag: product.name,
    href: `/products/${slug}`,
    value: study.highlight.value,
    label: study.highlight.label,
    summary: study.impact,
  };
};

const HIGHLIGHTS: Highlight[] = [
  fromCase("wise-ultima", 0),
  fromCase("wise-ultima", 1),
  fromCase("wise-migrate", 0),
  fromCase("istruct", 0),
  fromCase("wise-maestro", 0),
  {
    key: "email",
    client: EMAIL_CASE.client,
    logo: "/deck/client-trianz.webp",
    tag: "AI Services",
    href: "/services",
    value: "95%+",
    label: "accuracy at 3.5 sec per email",
    summary: "5,000 emails a day across all 160 categories, after an earlier attempt stalled below 70% accuracy.",
  },
];

export const Impact = () => (
  <section id="impact" className="relative scroll-mt-24 px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
    <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-10">
      <SectionHeading
        eyebrow="Proven Impact"
        title="Results our clients can measure"
        description="From global IT services firms to Saudi conglomerates, our platforms run in production."
      />

      <Stagger
        className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:w-full sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3"
        stagger={0.08}
        amount={0.15}
      >
        {HIGHLIGHTS.map((item) => (
          <StaggerItem key={item.key} className="w-[82%] shrink-0 snap-center sm:w-auto">
            <Link
              href={item.href}
              className="group flex h-full flex-col gap-5 rounded-xl border border-[#e4e4e4] p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 ease-(--ease-out-expo) hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgb(28_116_250/0.12)]"
              style={{ backgroundImage: CARD_GRADIENT }}
            >
              <div className="flex h-10 items-center justify-between gap-3">
                {item.logo ? (
                  <Image src={item.logo} alt={item.client} width={140} height={60} className="h-8 w-auto max-w-[140px] object-contain object-left" />
                ) : (
                  <span className="text-[15px] font-medium text-ink">{item.client}</span>
                )}
                <span className="shrink-0 rounded-full bg-brand/[0.08] px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.02em] text-brand">
                  {item.tag}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[44px] leading-none font-medium tracking-[0.01em] text-ink">{item.value}</span>
                <span className="text-base text-ink">{item.label}</span>
              </div>
              <p className="flex-1 text-[15px] leading-[1.45] text-muted">{item.summary}</p>
              <span className="text-[15px] font-medium text-ink">
                Read the story{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);
