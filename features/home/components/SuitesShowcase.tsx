import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { roomsMock } from "@/mocks/rooms";
import { RoomCard } from "./RoomCard";

export function SuitesShowcase() {
  const homeSlugs = new Set(["deluxe-room", "premium-suite", "royal-villa"]);
  const featuredRooms = roomsMock.filter((r) => homeSlugs.has(r.slug)).slice(0, 3);

  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Our Suites"
            title="Experience Luxury in Every Detail"
            subtitle="Thoughtfully composed architecture, serene natural stone, and timeless comfort across every sanctuary."
          />
          <Link
            href="/rooms"
            className="h-11 px-6 rounded-full bg-white border border-[#111111]/12 text-[#111111] text-[14px] font-medium inline-flex items-center gap-2 hover:bg-[#EFE6D6] transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            View All Rooms
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredRooms.map((room, idx) => (
          <Reveal key={room.slug} delay={idx * 0.06}>
            <RoomCard room={room} variant="overlay" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
