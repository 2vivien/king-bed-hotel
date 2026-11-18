import type { Metadata } from "next";
import { Suspense } from "react";
import { ReservationFlow } from "@/features/booking/components/ReservationFlow";

export const metadata: Metadata = {
  title: "Reservation",
  description:
    "Check live availability and reserve your SuiteSavvy boutique suite or private villa with instant confirmation.",
};

export default function ReservationPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14">
          <div className="h-[520px] rounded-3xl bg-[#f4f3f0] animate-pulse" />
        </div>
      }
    >
      <ReservationFlow />
    </Suspense>
  );
}
