"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE_OUT_EXPO, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Card";
import { RECOGNITION } from "@/content/site";

/** MCIT AdopTech / LEAP 2026 recognition: photo collage with parallax, plus the programme numbers. */
export const Recognition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const frontY = useTransform(scrollYProgress, [0, 1], [-20, 30]);

  return (
    <section aria-labelledby="recognition-title" className="relative px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
      <Reveal
        amount={0.15}
        className="mx-auto grid max-w-[1169px] items-center gap-10 overflow-hidden rounded-xl border-2 border-line bg-white p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-14"
      >
        <div ref={ref} className="relative mx-auto aspect-[5/4] w-full max-w-[520px]">
          <motion.div style={{ y: backY }} className="absolute top-0 left-0 w-[72%] -rotate-3 overflow-hidden rounded-xl shadow-[0_24px_60px_-20px_rgb(0_0_0/0.35)]">
            <Image src="/deck/mcit-award.webp" alt="Wise Work receiving the award on the AdopTech stage at LEAP 2026" width={1200} height={1020} sizes="380px" className="h-auto w-full" />
          </motion.div>
          <motion.div style={{ y: frontY }} className="absolute right-0 bottom-0 w-[58%] rotate-3 overflow-hidden rounded-xl border-4 border-white shadow-[0_24px_60px_-20px_rgb(0_0_0/0.35)]">
            <Image src="/deck/mcit-certificate.webp" alt="MCIT Certificate of Appreciation awarded to Wise Work" width={1000} height={743} sizes="300px" className="h-auto w-full" />
          </motion.div>
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 16 }}
            className="absolute top-[4%] right-[4%] flex size-16 items-center justify-center rounded-full bg-brand font-mono text-[13px] leading-tight font-medium text-white shadow-[var(--shadow-cta)]"
          >
            1 of 16
          </motion.span>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Image src="/deck/mcit-logo.webp" alt="Ministry of Communications and Information Technology" width={600} height={300} className="h-12 w-auto" />
            <span className="h-8 w-px bg-line" />
            <Image src="/deck/leap-logo.webp" alt="LEAP × DeepFest" width={600} height={140} className="h-6 w-auto" />
          </div>
          <Eyebrow>{RECOGNITION.eyebrow}</Eyebrow>
          <h2 id="recognition-title" className="text-[30px] leading-[1.1] font-medium tracking-[-0.02em] text-ink sm:text-[38px]">
            {RECOGNITION.title}
          </h2>
          <p className="text-base leading-[1.45] text-muted">{RECOGNITION.body}</p>
          <Stagger className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6" stagger={0.08}>
            {RECOGNITION.stats.map((stat) => (
              <StaggerItem key={stat.label} className="flex flex-col gap-1">
                <span className="font-mono text-[32px] leading-none font-medium text-ink">{stat.value}</span>
                <motion.span
                  className="my-1 h-[3px] w-8 origin-left rounded-full bg-brand"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
                />
                <span className="text-[14px] leading-[1.35] text-muted">{stat.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Reveal>
    </section>
  );
};
