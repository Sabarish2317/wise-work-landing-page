import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wise Work — Building a wiser tomorrow, today",
  description:
    "Observability platform designed to predict and proactively manage your server infrastructure. Wise Maestro, Wise Ultima and Wise Migrate.",
};

export const viewport: Viewport = {
  themeColor: "#f0f0f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
