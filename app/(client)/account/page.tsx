import type { Metadata } from "next";
import { UserDashboardView } from "@/features/auth/components/UserDashboardView";

export const metadata: Metadata = {
  title: "Espace Client & Séjours | King's Bed Hotel",
  description:
    "Consultez vos chambres réservées, formules petit-déjeuner et préférences d'accueil à King's Bed Hotel.",
};

export default function AccountPage() {
  return (
    <UserDashboardView />
  );
}
