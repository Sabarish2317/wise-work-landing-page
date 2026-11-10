"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { EASE_OUT_EXPO, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const FAQS = [
  {
    q: "Do you offer custom invoicing?",
    a: "Yes. Enterprise plans can be invoiced monthly or annually, in INR, USD or GBP, with PO numbers and custom billing contacts.",
  },
  {
    q: "What are the limits for each plan?",
    a: "Limits are based on monitored hosts and data retention. Every plan includes unlimited users, dashboards and alert rules.",
  },
  {
    q: "I went over my limits. What can I do?",
    a: "Nothing breaks. We keep collecting data and let you know, then you can upgrade, add a host pack or trim noisy sources.",
  },
  {
    q: "Can I buy additional bandwidth?",
    a: "Yes. Ingest and bandwidth add-ons can be bought from the billing page at any time and are prorated for the current cycle.",
  },
  {
    q: "I have a starter account, how do I upgrade to a paid plan?",
    a: "Open Settings → Billing and pick a plan. Your data, dashboards and integrations carry over without any downtime.",
  },
  {
    q: "Is there a limit to how many teams I can have?",
    a: "No. Create as many teams and workspaces as you need, each with its own roles, alert routing and SSO groups.",
  },
  {
    q: "I want to migrate my workloads to Wise Work. Is there a fee?",
    a: "Migrations planned through Wise Migrate include onboarding at no extra cost. Large or regulated estates get a scoped quote.",
  },
  {
    q: "How does Wise Work calculate usage?",
    a: "Usage is the peak number of monitored hosts per hour, averaged across the month, plus any data retained beyond your plan.",
  },
];

type FaqItemProps = { question: string; answer: string; open: boolean; onToggle: () => void };

const FaqItem = ({ question, answer, open, onToggle }: FaqItemProps) => {
  const id = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="group flex min-h-[69px] w-full items-center justify-between gap-6 py-3 text-left text-[15.9px] leading-[1.25] font-medium tracking-[0.02em] text-ink transition-colors hover:text-brand"
        >
          <span>{question}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${open ? "bg-brand/10" : "group-hover:bg-black/[0.04]"}`}
          >
            <Image src="/figma/chevron.svg" alt="" width={16} height={16} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <p className="pr-10 pb-5 text-[15px] leading-[1.5] text-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-4 sm:px-8 lg:px-16">
      <Reveal
        amount={0.1}
        className="mx-auto flex max-w-[1169px] flex-col gap-12 rounded-t-[14px] border-2 border-line bg-white px-5 py-10 sm:p-10 lg:flex-row lg:justify-between lg:gap-16 lg:p-16"
      >
        <div className="flex flex-col justify-between gap-10 lg:w-[383px]">
          <div className="flex flex-col items-start gap-6">
            <span className="rounded-[64px] bg-brand px-5 py-3 font-mono text-[18px] leading-[1.3] font-medium tracking-[0.02em] text-white sm:text-[21px]">
              FAQ&apos;S
            </span>
            <h2 className="text-[34px] leading-[1.2] font-medium text-ink sm:text-[42px]">
              Frequently asked
              <br />
              questions
            </h2>
          </div>

          <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-[23px] bg-brand/5 p-6">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-brand/10 blur-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative flex flex-col gap-3">
              <p className="text-2xl leading-[1.3] font-medium tracking-[0.02em] text-ink-2">Have a Question ?</p>
              <p className="max-w-[320px] text-base leading-[1.3] tracking-[0.02em] text-ink-2/90">
                Our team is up 24X7 to answer your questions, kindly send us a message describing your issue or
                questions.
              </p>
            </div>
            <Button href="mailto:hello@wisework.in" withPhone className="relative">
              Send a mail
            </Button>
          </div>
        </div>

        <Stagger className="flex-1 lg:max-w-[570px]" stagger={0.05}>
          {FAQS.map((faq, index) => (
            <StaggerItem key={faq.q}>
              <FaqItem
                question={faq.q}
                answer={faq.a}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>
    </section>
  );
};
