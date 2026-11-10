"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScaleToFitProps = {
  /** Natural (design) width/height of the content in px. */
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
};

/** Scales a fixed-size composition down to the available width while keeping its layout pixel-exact. */
export const ScaleToFit = ({ width, height, className = "", children }: ScaleToFitProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / width));
    });
    observer.observe(outer);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={outerRef} className={`w-full ${className}`} style={{ maxWidth: width }}>
      <div style={{ height: height * scale }}>
        <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          {children}
        </div>
      </div>
    </div>
  );
};
