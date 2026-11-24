import Image from "next/image";
import { CLIENT_LOGOS } from "@/content/site";

/** Infinite, hover-pausable strip of client logos with faded edges. */
export const LogoMarquee = () => (
  <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
    <ul className="flex w-max animate-marquee items-center gap-4 group-hover:[animation-play-state:paused] sm:gap-6">
      {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
        <li
          key={`${logo.file}-${i}`}
          aria-hidden={i >= CLIENT_LOGOS.length}
          className="flex h-[72px] w-[148px] shrink-0 items-center justify-center rounded-xl border border-line bg-white px-5 py-3 shadow-[var(--shadow-card)] sm:h-[84px] sm:w-[172px]"
        >
          <Image
            src={`/deck/clients/${logo.file}.webp`}
            alt={i >= CLIENT_LOGOS.length ? "" : logo.name}
            width={230}
            height={150}
            className="max-h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
          />
        </li>
      ))}
    </ul>
  </div>
);
