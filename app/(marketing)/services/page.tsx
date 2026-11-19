import type { Metadata } from "next";
import { ServicesShowcase } from "@/features/services/components/ServicesShowcase";

export const metadata: Metadata = {
  title: "Nos Services",
  description:
    "Chambres King Size, petit-déjeuner artisanal, salles de réunion et de conférences équipées, transferts privés et conciergerie 24h/24 au King's Bed Hotel.",
};

export default function ServicesPage() {
  return <ServicesShowcase />;
}
