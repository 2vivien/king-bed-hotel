import { ArrowUpRight, Maximize2, Users } from "lucide-react";
import Link from "next/link";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { formatMoney } from "@/lib/utils/format-money";
import type { Room } from "@/types/hotel.types";

interface RoomCardProps {
  room: Room;
  variant?: "overlay" | "catalog";
}

export function RoomCard({ room, variant = "overlay" }: RoomCardProps) {
  const priceLabel = formatMoney(room.pricePerNight);

  if (variant === "catalog") {
    return (
      <article className="group rounded-[24px] bg-white border border-[#111111]/8 overflow-hidden flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <Link
          href={`/rooms/${room.slug}`}
          className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFE6D6]"
        >
          <SuiteImage
            src={room.image}
            alt={room.name}
            sizes="(max-width: 768px) 100vw, 400px"
            className="group-hover:scale-[1.03] transition-transform duration-500"
          />
        </Link>
        <div className="p-6 flex flex-col flex-1 justify-between gap-5">
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <Link href={`/rooms/${room.slug}`}>
                <h3 className="text-[22px] font-normal tracking-[-0.015em] text-[#111111] hover:opacity-75 transition-opacity">
                  {room.name}
                </h3>
              </Link>
              <p className="text-[16px] font-medium tabular-nums text-[#111111]">
                {priceLabel}
                <span className="text-[13px] font-normal text-[#5F5F5A]"> / nuit</span>
              </p>
            </div>
            <div className="mt-2.5 flex items-center gap-3 text-[13px] text-[#5F5F5A]">
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
                {room.maxGuests} pers.
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                {room.sizeSqm} m²
              </span>
            </div>
          </div>

          <Link
            href={`/account/reservation?room=${room.slug}`}
            className="h-11 rounded-full bg-[#111111] text-white text-[14px] font-medium flex items-center justify-center hover:bg-[#2A2A28] transition-colors"
          >
            Réserver
          </Link>
        </div>
      </article>
    );
  }

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="group relative aspect-[4/3] rounded-[24px] overflow-hidden bg-[#EFE6D6] block"
    >
      <SuiteImage
        src={room.image}
        alt={room.name}
        sizes="(max-width: 768px) 100vw, 400px"
        className="group-hover:scale-[1.03] transition-transform duration-500"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4 text-white">
        <div>
          <h3 className="text-[24px] font-normal tracking-[-0.015em] leading-tight">
            {room.name}
          </h3>
          <p className="mt-1 text-[15px] text-white/85 tabular-nums">
            {priceLabel} <span className="text-white/70">/ nuit</span>
          </p>
        </div>
        <span className="w-11 h-11 rounded-full bg-white text-[#111111] flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
