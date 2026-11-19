import { DestinationTeaserRow } from "@/features/home/components/DestinationTeaserRow";
import { HeroSection } from "@/features/home/components/HeroSection";
import { NewsletterBanner } from "@/features/home/components/NewsletterBanner";
import { SuitesShowcase } from "@/features/home/components/SuitesShowcase";
import { TestimonialsSection } from "@/features/home/components/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DestinationTeaserRow />
      <SuitesShowcase />
      <TestimonialsSection />
      <NewsletterBanner />
    </>
  );
}
