import type { Metadata } from "next";
import { AdminDashboardView } from "@/features/auth/components/AdminDashboardView";

export const metadata: Metadata = {
  title: "Bureau de Conciergerie Admin | King's Bed Hotel",
  description:
    "Interface de gestion des réservations de chambres, petits-déjeuners et salles de conférence de King's Bed Hotel.",
};

export default function AdminPage() {
  return (
    <AdminDashboardView />
  );
}
