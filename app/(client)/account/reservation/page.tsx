import type { Metadata } from "next";
import { Suspense } from "react";
import { ReservationGate } from "@/features/auth/components/ReservationGate";
import { ReservationFlow } from "@/features/booking/components/ReservationFlow";

export const metadata: Metadata = {
  title: "Réservation",
  description:
    "Réservez votre chambre King Size, formule petit-déjeuner ou salle de conférence au King's Bed Hotel, Savalou, Bénin.",
};

export default function ReservationPage() {
  return (
    <ReservationGate>
      <Suspense
        fallback={
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14">
            <div className="h-[520px] rounded-3xl bg-[#f4f3f0] animate-pulse" />
          </div>
        }
      >
        <ReservationFlow />
      </Suspense>
    </ReservationGate>
  );
}
