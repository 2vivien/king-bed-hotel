import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FaqAccordion } from "@/features/faq/components/FaqAccordion";
import { faqMock } from "@/mocks/testimonials";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers regarding SuiteSavvy check-in, flexible cancellation, private airport transfers, and payment options.",
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
        eyebrow="Guest Information"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before arriving at your SuiteSavvy sanctuary."
      />
      <FaqAccordion />
    </section>
  );
}
