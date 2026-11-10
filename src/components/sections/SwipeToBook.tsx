"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useRef, useState } from "react";

const KNOB_SIZE = 32;
const PADDING = 8;

/** "Swipe to Book a meet" pill — drag the knob to the end to jump to the contact section. */
export const SwipeToBook = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [booked, setBooked] = useState(false);

  const maxTravel = () => {
    const track = trackRef.current;
    return track ? track.offsetWidth - KNOB_SIZE - PADDING * 2 : 0;
  };

  const progress = useTransform(x, (value) => {
    const max = maxTravel();
    return max > 0 ? Math.min(value / max, 1) : 0;
  });
  const labelOpacity = useTransform(progress, [0, 0.6], [1, 0]);
  const fillWidth = useTransform(x, (value) => value + KNOB_SIZE);

  const complete = () => {
    setBooked(true);
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => {
      setBooked(false);
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    }, 1600);
  };

  const handleDragEnd = () => {
    if (progress.get() > 0.85) {
      animate(x, maxTravel(), { type: "spring", stiffness: 400, damping: 35 });
      complete();
      return;
    }
    animate(x, 0, { type: "spring", stiffness: 500, damping: 32 });
  };

  return (
    <div
      ref={trackRef}
      className="relative flex h-[48px] w-[236px] items-center overflow-hidden rounded-[15px] border-2 border-[#ebebeb] bg-white p-2 select-none"
    >
      <motion.div
        aria-hidden
        className="absolute top-2 left-2 h-8 rounded-[8.3px] bg-[#1e1e1e]/[0.06]"
        style={{ width: fillWidth }}
      />
      <motion.span
        style={{ opacity: labelOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center pl-9 text-base leading-[1.2] font-medium tracking-[0.01em] text-[#1e1e1e]"
      >
        {booked ? "" : "Swipe to Book a meet"}
      </motion.span>
      {booked && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center pr-8 text-base font-medium text-brand"
        >
          Let&apos;s talk ✓
        </motion.span>
      )}
      <motion.button
        type="button"
        aria-label="Swipe or press to book a meeting"
        drag="x"
        dragConstraints={trackRef}
        dragElastic={0.04}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onClick={() => {
          if (x.get() < 4) complete();
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94, cursor: "grabbing" }}
        style={{ x }}
        className="relative z-10 flex size-8 cursor-grab items-center justify-center rounded-[8.3px] bg-[#1e1e1e] font-mono text-[14.7px] font-bold text-white shadow-[0_4px_12px_rgb(0_0_0/0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <motion.span
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          -&gt;
        </motion.span>
      </motion.button>
    </div>
  );
};
