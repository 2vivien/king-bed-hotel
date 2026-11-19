import { ConferenceHallsShowcase } from "@/features/home/components/ConferenceHallsShowcase";
import { ContactFaqSection } from "@/features/contact/components/ContactFaqSection";
import { DestinationTeaserRow } from "@/features/home/components/DestinationTeaserRow";
import { HeroSection } from "@/features/home/components/HeroSection";
import { LeavesCta } from "@/components/shared/LeavesCta";
import { SuitesShowcase } from "@/features/home/components/SuitesShowcase";
import { TestimonialsSection } from "@/features/home/components/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DestinationTeaserRow />
      <SuitesShowcase />
      <ConferenceHallsShowcase />
      <TestimonialsSection />
      <ContactFaqSection />
      <LeavesCta />
    </>
  );
}
