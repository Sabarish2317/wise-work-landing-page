"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const OFFERINGS = [
  {
    eyebrow: "Patent Tech Consulting",
    title: "Patent Gym",
    body: "Turn raw ideas into defensible patents with a programme led by a 120+ patent inventor.",
  },
  {
    eyebrow: "Gen AI LLM",
    title: "Large Language Models",
    body: "Custom LLMs, RAG pipelines and agents tuned on your data and deployed in your cloud.",
  },
  {
    eyebrow: "AIOps",
    title: "Self-healing Infrastructure",
    body: "Predictive monitoring that finds failing nodes early and fixes them automatically.",
  },
  {
    eyebrow: "Metaverse",
    title: "Virtual World Creation",
    body: "Immersive 3D worlds and digital twins for training, retail and remote collaboration.",
  },
];

const LAST = OFFERINGS.length - 1;

type StackCardProps = {
  index: number;
  progress: MotionValue<number>;
  offering: (typeof OFFERINGS)[number];
};

/** One card of the deck. `progress` runs 0 → LAST; card i flies off as progress passes i. */
const StackCard = ({ index, progress, offering }: StackCardProps) => {
  const leave = useTransform(progress, (p) => Math.min(Math.max(p - index, 0), 1));
  const depth = useTransform(progress, (p) => Math.max(index - p, 0));

  const y = useTransform([leave, depth], ([l, d]: number[]) => `${-l * 135 + d * 2.5}%`);
  const x = useTransform(leave, (l) => `${l * 18}%`);
  const rotate = useTransform([leave, depth], ([l, d]: number[]) => -l * 16 + d * 3);
  const scale = useTransform(depth, (d) => 1 - Math.min(d, 3) * 0.035);
  const opacity = useTransform([leave, depth], ([l, d]: number[]) =>
    index === LAST ? 1 : Math.min(1 - Math.max(l - 0.55, 0) / 0.45, d > 3 ? 0 : 1),
  );

  return (
    <motion.article
      style={{ y, x, rotate, scale, opacity, zIndex: OFFERINGS.length - index }}
      className="absolute inset-0 flex flex-col items-start justify-end gap-4 overflow-hidden rounded-xl border border-[#e4e4e4] p-6 shadow-[0_1px_30px_0_#f7f7f7,0_30px_60px_-20px_rgb(0_0_120/0.35)] will-change-transform sm:gap-[22px]"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: "linear-gradient(160.5deg, #fff 13.4%, #f0f0f0 186.6%)" }}
      />
      <span className="flex-1 font-mono text-2xl leading-[1.1] font-medium tracking-[-0.02em] text-ink">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="pointer-events-none absolute -top-[110px] left-[63%] size-[250px] -rotate-6">
        <Image src="/figma/card-badge.png" alt="" width={250} height={250} className="size-full" />
      </div>
      <p className="font-mono text-base leading-[0.98] font-medium text-muted">{offering.eyebrow}</p>
      <h3 className="text-[26px] leading-[1.1] font-medium tracking-[-0.02em] text-ink sm:text-[30px]">
        {offering.title}
      </h3>
      <p className="text-base leading-[1.2] tracking-[0.01em] text-muted">{offering.body}</p>
    </motion.article>
  );
};

export const Offerings = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(imageProgress, [0, 0.45], [0.88, 1]);
  const imageInner = useTransform(imageProgress, [0, 1], [1.18, 1]);
  const imageY = useTransform(imageProgress, [0, 1], ["-6%", "6%"]);
  const floatY = useTransform(imageProgress, [0, 1], [40, -40]);

  const { scrollYProgress: stackProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });
  const deck = useTransform(stackProgress, [0.08, 0.92], [0, LAST], { clamp: true });
  const stageBlur = useTransform(stackProgress, [0, 0.15], ["blur(0px)", "blur(4.45px)"]);
  const stageScale = useTransform(stackProgress, [0, 1], [1.05, 1.25]);
  const progressBar = useTransform(deck, [0, LAST], [0, 1]);

  useMotionValueEvent(deck, "change", (value) => setActiveIndex(Math.round(value)));

  return (
    <section aria-labelledby="offerings-title" className="relative px-4 pt-16 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-[1169px] flex-col items-center gap-8">
        <SectionHeading
          eyebrow="What"
          inline
          title={
            <span id="offerings-title">
              Trusted <span className="text-brand">Services</span>
              <br />
              We Offer for your company
            </span>
          }
          description="Deep-tech services, built and run by the people who invented them."
        />

        {/* Isometric hero illustration — scales to full width as it enters. */}
        <motion.div
          ref={imageRef}
          style={{ scale: imageScale }}
          className="relative aspect-[1169/507.56] w-full overflow-hidden rounded-[11px] max-sm:aspect-[4/3]"
        >
          <motion.div style={{ scale: imageInner, y: imageY }} className="absolute inset-0">
            <Image
              src="/figma/services-hero.png"
              alt="Isometric illustration of a hand holding a cloud-native city of services"
              fill
              sizes="(min-width: 1297px) 1169px, 100vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            aria-hidden
            style={{ y: floatY }}
            className="pointer-events-none absolute bottom-6 left-6 hidden items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-ink shadow-[0_8px_24px_rgb(0_0_120/0.15)] backdrop-blur-md sm:flex"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-good" />
              <span className="relative size-2 rounded-full bg-good" />
            </span>
            4 practices · 1 team
          </motion.div>
        </motion.div>
      </div>

      {/* Pinned card deck */}
      <div id="offerings" ref={stackRef} className="relative mx-auto mt-16 h-[360vh] max-w-[1169px]">
        <div className="sticky top-0 flex h-svh items-center pt-20 pb-4 sm:py-6">
          <div className="relative h-[min(650px,100%)] w-full overflow-hidden rounded-[11px]">
            <motion.div style={{ filter: stageBlur, scale: stageScale }} className="absolute inset-0">
              <Image
                src="/figma/services-hero.png"
                alt=""
                fill
                sizes="(min-width: 1297px) 1169px, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 45% 55% at 50% 50%, rgb(255 255 255 / 0.55), transparent 70%)" }}
            />

            <div className="absolute top-5 left-5 z-20 flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 font-mono text-sm text-ink backdrop-blur-md sm:top-6 sm:left-6">
              <span className="tabular-nums">
                {String(activeIndex + 1).padStart(2, "0")} / {String(OFFERINGS.length).padStart(2, "0")}
              </span>
              <span className="relative h-[3px] w-16 overflow-hidden rounded-full bg-ink/10">
                <motion.span
                  style={{ scaleX: progressBar }}
                  className="absolute inset-0 origin-left rounded-full bg-brand"
                />
              </span>
            </div>
            <p className="absolute right-6 bottom-6 z-20 hidden font-mono text-sm text-white/90 sm:block">
              Scroll to explore ↓
            </p>

            <div className="absolute top-1/2 left-1/2 h-[340px] w-[min(340px,82%)] -translate-x-1/2 -translate-y-1/2 sm:h-[360px] sm:w-[373.67px]">
              {OFFERINGS.map((offering, index) => (
                <StackCard key={offering.title} index={index} progress={deck} offering={offering} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
