import type { Metadata } from "next";
import { RoomsCollectionView } from "@/features/rooms/components/RoomsCollectionView";

export const metadata: Metadata = {
  title: "Our Rooms & Suites",
  description:
    "Explore Deluxe Rooms, Executive Suites, Ocean Villas, and Presidential Penthouses curated for quiet luxury and architectural comfort.",
};

export default function RoomsPage() {
  return <RoomsCollectionView />;
}
