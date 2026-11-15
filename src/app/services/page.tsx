import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "AI and IT Services",
  description: "IT consulting, cloud services, AI and ML solutions and process automation, delivered at scale and speed.",
};

export default function Page() {
  return <ServicesPage />;
}
