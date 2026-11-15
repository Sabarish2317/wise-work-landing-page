import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description: "Wise Work at a glance: an AI-native company built for enterprise delivery, recognized by MCIT at LEAP 2026.",
};

export default function Page() {
  return <AboutPage />;
}
