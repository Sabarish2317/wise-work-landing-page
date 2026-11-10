"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE_OUT_EXPO, Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "/figma/linkedin.svg" },
  { label: "X", href: "https://x.com", icon: "/figma/x.svg" },
  { label: "WhatsApp", href: "https://wa.me", icon: "/figma/whatsapp.svg" },
];

const WORDMARK = "WiseWork".split("");

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] });
  const glowX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const wordmarkY = useTransform(scrollYProgress, [0.3, 1], ["30%", "0%"]);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative flex flex-col items-center gap-16 overflow-hidden bg-gradient-to-b from-brand-deep to-brand-soft px-4 pt-16 pb-6 sm:gap-20 sm:px-8 lg:px-16"
    >
      <motion.div
        aria-hidden
        style={{ x: glowX }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_255_255/0.22),transparent_60%)] blur-2xl"
      />

      <Reveal className="relative flex flex-col items-center gap-9 text-center text-white">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-[34px] leading-[1.1] font-medium tracking-[-0.01em] sm:text-[42px]">
              Let&apos;s Work Together
            </h2>
            <p className="mx-auto max-w-[300px] text-base leading-[1.2] tracking-[0.01em] text-white/90">
              Observability Platform, designed to predict and proactively manage your infrastructure swiftly.
            </p>
          </div>
          <Button href="mailto:hello@wisework.in" variant="white" withPhone className="py-[15px]">
            Book a call
          </Button>
        </div>
        <ul className="flex items-center gap-7">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="block rounded-md transition-[transform,opacity] duration-300 hover:-translate-y-1 hover:opacity-80"
              >
                <Image src={social.icon} alt="" width={28} height={28} />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="relative flex w-full max-w-[1169px] flex-col gap-5 text-white">
        <motion.p
          aria-label="WiseWork"
          style={{ y: wordmarkY }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex justify-center overflow-hidden text-center text-[clamp(64px,17.8vw,208px)] leading-[1.1] font-medium tracking-[-0.01em] select-none"
        >
          {WORDMARK.map((letter, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: "0%", opacity: 1 },
              }}
              transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: i * 0.05 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.p>
        <div className="flex flex-col items-center justify-between gap-2 text-sm leading-6 font-medium sm:flex-row">
          <p>© WiseWork.in</p>
          <div className="flex gap-4">
            <a href="#" className="transition-opacity hover:opacity-70">
              Terms
            </a>
            <a href="#" className="transition-opacity hover:opacity-70">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
