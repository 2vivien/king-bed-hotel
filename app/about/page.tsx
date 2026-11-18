import type { Metadata } from "next";
import { AboutCuratorsSection } from "@/features/about/components/AboutCuratorsSection";
import { AboutGenesisSection } from "@/features/about/components/AboutGenesisSection";
import { AboutHeroMosaic } from "@/features/about/components/AboutHeroMosaic";
import { AboutPillarsSection } from "@/features/about/components/AboutPillarsSection";
import { AboutSustainabilityAndCta } from "@/features/about/components/AboutSustainabilityAndCta";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "King's Bed Hotel : chambres d'exception, petit-déjeuner artisanal et salles de réunion et de conférences sur mesure.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <AboutHeroMosaic />
      <AboutGenesisSection />
      <AboutPillarsSection />
      <AboutCuratorsSection />
      <AboutSustainabilityAndCta />
    </div>
  );
}
