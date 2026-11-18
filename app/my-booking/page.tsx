import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MyBookingLookup } from "@/features/booking/components/MyBookingLookup";

export const metadata: Metadata = {
  title: "My Booking",
  description: "View, export to calendar, or manage your SuiteSavvy reservation.",
};

export default function MyBookingPage() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-14 pb-20 space-y-12">
      <SectionHeading
        as="h1"
        eyebrow="Manage Stay"
        title="My Booking"
        subtitle="Access your confirmed reservation, download calendar invites, or update your stay."
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
