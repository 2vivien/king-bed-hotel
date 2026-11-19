import type { Metadata } from "next";
import { RoomsCollectionView } from "@/features/rooms/components/RoomsCollectionView";

export const metadata: Metadata = {
  title: "Chambres & Suites",
  description:
    "Découvrez nos Chambres Deluxe, Suites Exécutives, Villas et Penthouses avec literie King Size, petit-déjeuner inclus et accès aux espaces de conférence.",
};

export default function RoomsPage() {
  return <RoomsCollectionView />;
}
