# Wise Work — website

Marketing site for Wise Work. The visual design comes from the Figma file
[Wise Work › wise work main landing page](https://www.figma.com/design/C8qjhotu9FREJ5V5hT57Qm/Wise-Work?node-id=1092-174).
The content comes from the *Wise Work Company Profile* deck.

**Stack:** Next.js 16 (App Router, Cache Components), Tailwind CSS v4, [Motion](https://motion.dev) for animation,
[Lenis](https://lenis.darkroom.engineering) for smooth scrolling and Geist Sans/Mono, self-hosted from the `geist` package.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, headline stats and client logos, the 4 flagship products, what we offer, AI & IT services deck, proven impact, MCIT recognition, global footprint, leadership, FAQ |
| `/products/[slug]` | `wise-ultima`, `wise-migrate`, `istruct`, `wise-maestro`: how it works, product tour, ROI snapshot, competitor comparison, client use cases |
| `/services` | Service pillars, extra capabilities, AI email classification and Mentora case studies, tech stack, industries |
| `/patent-gym` | Patent Harvesting, Seeding and Other IPs, testimonial, the Cortexa™ engines, MBrain™ architecture, design principles |
| `/about` | At-a-glance stats, vision and missions, founder profile, MCIT recognition, academic ecosystem, footprint |

## Structure

```
src/content/site.ts       all copy and numbers from the company profile (edit here)
src/app/                  layout (header, footer, fonts, smooth scroll) and routes
src/components/sections/  home page sections plus header and footer
src/components/pages/     services, patent gym and about page bodies
src/components/product/   product detail template
src/components/ui/        Button, Card, PageHero, BrowserFrame, ComparisonTable, CaseStudyCard, LogoMarquee…
src/components/motion/    Reveal / Stagger, SplitWords, CountUp, SmoothScroll
public/figma/             assets exported from the Figma file
public/deck/              images from the company profile, converted to WebP
```

All motion respects `prefers-reduced-motion`. The site is light mode only, as in the design.

## Notes

- SF Pro and Aeonik Fono (the Figma fonts) are licensed, so the site uses Geist Sans and Geist Mono in their place.
- `public/figma/world-map.svg` was rebuilt from the Figma export as plain `<circle>`s (630 KB → 67 KB).
- Client logos in `public/deck/clients/` were cut from the deck's logo wall.
- Social links in the footer point to the platforms' home pages until real profile URLs are added.
