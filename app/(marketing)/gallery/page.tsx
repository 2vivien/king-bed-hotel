import type { Metadata } from "next";
import { GalleryAnthologyView } from "@/features/gallery/components/GalleryAnthologyView";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Découvrez en images les chambres King Size, le salon petit-déjeuner, les espaces de conférence et les lieux de détente du King's Bed Hotel.",
};

export default function GalleryPage() {
  return <GalleryAnthologyView />;
}
