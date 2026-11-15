import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wise Work — Enterprise AI, Cloud & Patent Innovation",
    template: "%s · Wise Work",
  },
  description:
    "AI-native company building enterprise products (Wise Ultima™, Wise Migrate™, iStruct™, Wise Maestro™), delivering AI and IT services and turning ideas into patents with Patent Gym™.",
};

export const viewport: Viewport = {
  themeColor: "#f0f0f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
