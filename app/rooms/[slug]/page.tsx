import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoomDetailView } from "@/features/rooms/components/RoomDetailView";
import { roomsMock } from "@/mocks/rooms";

export function generateStaticParams() {
  return roomsMock.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = roomsMock.find((r) => r.slug === slug);
  if (!room) return { title: "Chambre Introuvable" };
  return {
    title: room.name,
    description: room.tagline,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = roomsMock.find((r) => r.slug === slug);
  if (!room) notFound();

  const preferredSimilarSlugs = [
    "royal-garden-villa",
    "penthouse-horizon-retreat",
    "royal-villa",
    "palm-horizon-suite",
  ];
  const others = roomsMock.filter((r) => r.slug !== room.slug);
  const similar = [
    ...others.filter((r) => preferredSimilarSlugs.includes(r.slug)),
    ...others.filter((r) => !preferredSimilarSlugs.includes(r.slug)),
  ].slice(0, 3);

  return <RoomDetailView room={room} similarRooms={similar} />;
}
