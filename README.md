# Wise Work — landing page

Marketing site for Wise Work, built from the Figma file
[Wise Work › wise work main landing page](https://www.figma.com/design/C8qjhotu9FREJ5V5hT57Qm/Wise-Work?node-id=1092-174).

**Stack:** Next.js 16 (App Router), Tailwind CSS v4, [Motion](https://motion.dev) for animation,
[Lenis](https://lenis.darkroom.engineering) for smooth scrolling and Geist Sans/Mono, self-hosted from the `geist` package.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Structure

```
src/app/                 layout (fonts, smooth scroll) and the single page
src/components/motion/   Reveal / Stagger, SplitWords, CountUp, SmoothScroll
src/components/ui/       Button, SectionHeading, ScaleToFit
src/components/sections/ one file per page section
public/figma/            assets exported from the Figma file
```

## Sections and motion

| Section | What moves |
| --- | --- |
| Header | Turns into a frosted bar on scroll, with an animated mobile menu |
| Hero | Word-by-word masked headline, drifting gradient blobs, a draggable "Swipe to Book a meet" knob, parallax fade on scroll |
| Products | Tabbed Wise Maestro / Ultima / Migrate card that autoplays with a progress bar. The floating dashboard widgets fill their gauges and bars and count up their numbers. |
| Services | Staggered cards with a glow that follows the pointer and a colour wash on hover |
| Offerings | Isometric illustration scales to full width, then a pinned deck of 4 service cards that flips as you scroll |
| Footprint | Dotted world map revealed by a sweep, pulsing office markers, arcs drawn to HQ, counting stats |
| Founders | Photos revealed with a clip-path, stat counters, dividers that grow in |
| FAQ | Accessible accordion with height animation |
| Footer | Letter-by-letter "WiseWork" wordmark with scroll parallax |

All motion respects `prefers-reduced-motion`. The site is light mode only, as in the design.

## Notes

- SF Pro and Aeonik Fono (the Figma fonts) are licensed, so the site uses Geist Sans and Geist Mono in their place.
- `public/figma/world-map.svg` was rebuilt from the Figma export as plain `<circle>`s, which cut it from 630 KB to 67 KB while keeping the halftone dots.
- The Figma placeholder copy ("…that damn thing int he.", Vercel FAQ text) was replaced with on-brand copy. Contact links (`mailto:hello@wisework.in`, social URLs) are placeholders.
