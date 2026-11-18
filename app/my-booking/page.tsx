import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MyBookingLookup } from "@/features/booking/components/MyBookingLookup";

export const metadata: Metadata = {
  title: "Ma Réservation",
  description: "Consultez, exportez dans votre agenda ou gérez votre réservation au King's Bed Hotel.",
};

export default function MyBookingPage() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-14 pb-20 space-y-12">
      <SectionHeading
        as="h1"
        eyebrow="Gérer Mon Séjour"
        title="Ma Réservation"
        subtitle="Accédez à votre réservation confirmée, téléchargez votre invitation calendrier ou modifiez votre séjour."
      />
      <Suspense
        fallback={
          <div className="h-[360px] rounded-[28px] bg-[#F4F1EA] animate-pulse" />
        }
      >
        <MyBookingLookup />
      </Suspense>
    </section>
  );
}
