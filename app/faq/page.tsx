import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FaqAccordion } from "@/features/faq/components/FaqAccordion";
import { faqMock } from "@/mocks/testimonials";

export const metadata: Metadata = {
  title: "Foire Aux Questions",
  description:
    "Réponses concernant les arrivées au King's Bed Hotel, le petit-déjeuner, nos salles de réunion et conférences, ainsi que l'annulation flexible.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqMock.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-14 pb-20 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SectionHeading
        as="h1"
        eyebrow="Informations Pratiques"
        title="Questions Fréquentes"
        subtitle="Tout ce qu'il faut savoir avant votre arrivée pour votre séjour, petit-déjeuner ou conférence au King's Bed Hotel."
      />
      <FaqAccordion />
    </section>
  );
}
