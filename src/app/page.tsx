import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Footprint } from "@/components/sections/Footprint";
import { Founders } from "@/components/sections/Founders";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Offerings } from "@/components/sections/Offerings";
import { Products } from "@/components/sections/Products";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative overflow-x-clip">
        {/* Large violet/blue wash behind the product section (Figma Group 1000002579). */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[520px] left-1/2 h-[1216px] w-[1899px] -translate-x-1/2 animate-drift-slow"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/blob-lower.svg" alt="" width={1899} height={1216} className="size-full" />
        </div>
        <Hero />
        <Products />
        <Services />
        <Offerings />
        <Footprint />
        <Founders />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
