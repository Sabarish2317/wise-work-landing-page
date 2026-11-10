"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Footprint", href: "#footprint" },
  { label: "Founders", href: "#founders" },
  { label: "FAQ", href: "#faq" },
];

export const Header = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-8 sm:pt-4 lg:px-16"
    >
      <div
        className={`mx-auto flex max-w-[1169px] items-center justify-between rounded-2xl py-2 transition-[background-color,box-shadow,padding,backdrop-filter] duration-500 ease-(--ease-out-expo) ${
          scrolled || menuOpen
            ? "bg-white/70 px-3 shadow-[0_8px_30px_rgb(0_0_0/0.06)] ring-1 ring-black/5 backdrop-blur-xl sm:px-4"
            : "px-0"
        }`}
      >
        <a href="#top" className="flex items-center gap-3 py-0.5" aria-label="Wise Work home">
          <Image src="/figma/logo.svg" alt="" width={49} height={38} priority className="h-[30px] w-auto sm:h-[37.5px]" />
          <span className="text-[17px] font-semibold text-[#00283b] sm:text-lg">Wise Work</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[15px] text-ink/70 transition-colors duration-300 hover:bg-black/[0.04] hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-xl bg-brand px-[18px] py-3 text-[15px] leading-none font-medium text-white transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#0f66ea] hover:shadow-[0_8px_20px_#9cc3ff] active:scale-[0.97] sm:inline-flex"
          >
            Contact Us
          </a>
          <button
            type="button"
            className="relative flex size-11 items-center justify-center rounded-xl md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`absolute h-[1.5px] w-5 rounded bg-ink transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-[5px]"}`}
            />
            <span
              className={`absolute h-[1.5px] w-5 rounded bg-ink transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-[5px]"}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="mx-auto mt-2 flex max-w-[1169px] origin-top flex-col gap-1 rounded-2xl bg-white/90 p-2 shadow-[0_8px_30px_rgb(0_0_0/0.08)] ring-1 ring-black/5 backdrop-blur-xl md:hidden"
          >
            {[...NAV_LINKS, { label: "Contact Us", href: "#contact" }].map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.4, ease: EASE_OUT_EXPO }}
                className="rounded-xl px-4 py-3 text-base text-ink hover:bg-black/[0.04]"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
