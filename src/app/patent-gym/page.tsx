import type { Metadata } from "next";
import { PatentGymPage } from "@/components/pages/PatentGymPage";

export const metadata: Metadata = {
  title: "Patent Gym™ and Cortexa™",
  description: "Patent harvesting, patent seeding and other IP, plus Cortexa™, the enterprise patent intelligence platform.",
};

export default function Page() {
  return <PatentGymPage />;
}
