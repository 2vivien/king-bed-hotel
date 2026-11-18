import type { Metadata } from "next";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServicesShowcase } from "@/features/services/components/ServicesShowcase";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "24/7 concierge assistance, holistic botanical spa rituals, seasonal fine dining, and private chauffeured transfers.",
};

export default function ServicesPage() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-14 pb-20 space-y-12">
      <Reveal>
        <SectionHeading
          as="h1"
          eyebrow="Bespoke Hospitality"
          title="Our Services"
          subtitle="Premium services for an exceptional stay."
        />
      </Reveal>
      <ServicesShowcase />
    </section>
  );
}
