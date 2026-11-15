"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE_OUT_EXPO, Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT, PRODUCTS } from "@/content/site";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "/figma/linkedin.svg" },
  { label: "X", href: "https://x.com", icon: "/figma/x.svg" },
  { label: "WhatsApp", href: "https://wa.me", icon: "/figma/whatsapp.svg" },
];

const LINK_GROUPS = [
  {
    title: "Products",
    links: PRODUCTS.map((product) => ({ label: product.name, href: `/products/${product.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "AI and IT Services", href: "/services" },
      { label: "Patent Gym™", href: "/patent-gym" },
      { label: "About Wise Work", href: "/about" },
      { label: "Proven Impact", href: "/#impact" },
    ],
  },
];

const WORDMARK = "WiseWork".split("");

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] });
  const glowX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const wordmarkY = useTransform(scrollYProgress, [0.3, 1], ["12%", "0%"]);

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
            <h2 className="text-[34px] leading-[1.1] font-medium tracking-[-0.01em] sm:text-[42px]">Let&apos;s Work Together</h2>
            <p className="mx-auto max-w-[340px] text-base leading-[1.25] tracking-[0.01em] text-white/90">
              Let&apos;s build a wiser tomorrow, today. Tell us what you&apos;re working on.
            </p>
          </div>
          <Button href={`mailto:${CONTACT.email}`} variant="white" withPhone className="py-[15px]">
            Book a call
          </Button>
          <a href={`mailto:${CONTACT.email}`} className="text-[15px] font-medium text-white/90 underline-offset-4 hover:underline">
            {CONTACT.email}
          </a>
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
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8 sm:grid-cols-3">
          {LINK_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <p className="font-mono text-[12px] tracking-[0.08em] text-white/60 uppercase">{group.title}</p>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[15px] text-white/90 transition-opacity hover:opacity-70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <p className="font-mono text-[12px] tracking-[0.08em] text-white/60 uppercase">Where we work</p>
            <ul className="flex flex-wrap gap-2">
              {CONTACT.countries.map((country) => (
                <li key={country} className="rounded-full border border-white/25 px-3 py-1 text-[14px] text-white/90">
                  {country}
                </li>
              ))}
            </ul>
          </div>
        </nav>

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
          <p>© WiseWork.in · Since 2023</p>
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
