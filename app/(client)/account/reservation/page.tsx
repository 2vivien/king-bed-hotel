import type { Metadata } from "next";
import { ReservationGate } from "@/features/auth/components/ReservationGate";
import { UserDashboardView } from "@/features/auth/components/UserDashboardView";
import { ReservationModal } from "@/features/booking/components/ReservationModal";

export const metadata: Metadata = {
  title: "Réservation | Espace Client — King's Bed Hotel",
  description:
    "Réservez votre chambre King Size, formule petit-déjeuner ou salle de conférence depuis votre espace client, Savalou, Bénin.",
};

export default function ReservationPage() {
  return (
    <ReservationGate>
      <UserDashboardView />
      <ReservationModal />
    </ReservationGate>
  );
}
