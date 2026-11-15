import Image from "next/image";
import type { CaseStudy } from "@/content/site";
import { Card, Eyebrow } from "./Card";

const STEPS = [
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "impact", label: "Impact" },
] as const;

/** Problem → Solution → Impact case study, as laid out in the company profile. */
export const CaseStudyCard = ({ study }: { study: CaseStudy }) => (
  <Card className="flex flex-col gap-6 p-6 sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex flex-col gap-3">
        {study.logo ? (
          <Image src={study.logo} alt={study.client} width={160} height={60} className="h-9 w-auto object-contain object-left" />
        ) : (
          <Eyebrow>{study.client}</Eyebrow>
        )}
        <h3 className="max-w-[460px] text-2xl leading-[1.15] font-medium tracking-[-0.02em] text-ink">{study.title}</h3>
      </div>
      <div className="rounded-2xl bg-brand px-5 py-3 text-white shadow-[var(--shadow-cta)]">
        <p className="font-mono text-[28px] leading-none font-medium">{study.highlight.value}</p>
        <p className="mt-1 text-[13px] text-white/85">{study.highlight.label}</p>
      </div>
    </div>
    <ol className="grid gap-5 md:grid-cols-3">
      {STEPS.map((step, i) => (
        <li key={step.key} className="flex flex-col gap-2 border-t border-line pt-4">
          <span className="font-mono text-sm text-brand">
            {String(i + 1).padStart(2, "0")} · {step.label}
          </span>
          <p className="text-[15px] leading-[1.45] text-ink-2/90">{study[step.key]}</p>
        </li>
      ))}
    </ol>
    {study.quote && (
      <blockquote className="rounded-xl bg-brand/5 px-5 py-4 text-[15px] leading-[1.5] text-ink-2 italic">“{study.quote}”</blockquote>
    )}
  </Card>
);
