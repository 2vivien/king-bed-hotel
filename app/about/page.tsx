import type { Metadata } from "next";
import { AboutCuratorsSection } from "@/features/about/components/AboutCuratorsSection";
import { AboutGenesisSection } from "@/features/about/components/AboutGenesisSection";
import { AboutHeroMosaic } from "@/features/about/components/AboutHeroMosaic";
import { AboutPillarsSection } from "@/features/about/components/AboutPillarsSection";
import { AboutSustainabilityAndCta } from "@/features/about/components/AboutSustainabilityAndCta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Curating unmatched private sanctuaries, architectural purity, and carbon-neutral luxury stays since 2019.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-[#faf9f6]">
      <AboutHeroMosaic />
      <AboutGenesisSection />
      <AboutPillarsSection />
      <AboutCuratorsSection />
      <AboutSustainabilityAndCta />
    </div>
  );
}
