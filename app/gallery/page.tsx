import type { Metadata } from "next";
import { GalleryAnthologyView } from "@/features/gallery/components/GalleryAnthologyView";

export const metadata: Metadata = {
  title: "Our Gallery",
  description:
    "A curated visual anthology of SuiteSavvy private sanctuaries, infinity pools, holistic spa rituals, and coastal estates.",
};

export default function GalleryPage() {
  return <GalleryAnthologyView />;
}
