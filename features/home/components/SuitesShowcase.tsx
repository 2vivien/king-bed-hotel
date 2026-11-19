import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { roomsMock } from "@/mocks/rooms";
import { RoomCard } from "./RoomCard";

export function SuitesShowcase() {
  const homeSlugs = new Set(["deluxe-room", "premium-suite", "royal-villa"]);
  const featuredRooms = roomsMock.filter((r) => homeSlugs.has(r.slug)).slice(0, 3);

  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Texte à gauche */}
        <Reveal className="lg:col-span-4 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#3d6659] font-semibold">
              Nos Chambres &amp; Suites
            </span>
            <h2 className="mt-2 text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.12] font-medium tracking-[-0.02em] text-[#001510]">
              L&apos;Excellence dans
              <br />
              Chaque Détail
            </h2>
          </div>
          <p className="text-[16px] leading-[1.6] text-[#414846] max-w-sm">
            Chambres spacieuses, literie King Size, petit-déjeuner gastronomique
            et accès aux salles de conférence.
          </p>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 h-12 pl-6 pr-7 rounded-full bg-[#001510] text-white text-[14px] font-semibold hover:bg-[#0d2b24] transition-colors"
          >
            Voir toutes les chambres
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </Reveal>

        {/* Cartes alignées à droite */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {featuredRooms.map((room, idx) => (
            <Reveal key={room.slug} delay={idx * 0.06}>
              <RoomCard room={room} variant="overlay" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
