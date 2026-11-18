"use client";

import Link from "next/link";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { siteConfig } from "@/config/site";
import { useBookingStore } from "@/features/booking/store/booking.store";
import { destinationsMock } from "@/mocks/destinations";
import { roomsMock } from "@/mocks/rooms";

export function HeroCardStay() {
  const { destinationSlug, roomSlug, lastConfirmedId, confirmedBookings } =
    useBookingStore();
  const activeBooking = lastConfirmedId
    ? confirmedBookings[lastConfirmedId.toUpperCase()]
    : undefined;

  const destination =
    destinationsMock.find((d) => d.slug === destinationSlug) ?? destinationsMock[3];
  const room =
    roomsMock.find((r) => r.slug === (activeBooking?.roomSlug ?? roomSlug)) ??
    roomsMock[2];

  const detailsHref = activeBooking
    ? `/reservation/confirmation/${activeBooking.id}`
    : "/my-booking";

  return (
    <div className="glass-surface-subtle rounded-[28px] p-4 border border-white/30 text-white shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-[14px] overflow-hidden shrink-0 border border-white/30">
          <SuiteImage src={room.image} alt={room.name} sizes="48px" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2 text-[12px]">
            <span className="text-white/75">Votre séjour :</span>
            <span className="font-medium truncate">{destination.name}</span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-0.5">
            <Link
              href={`/rooms/${room.slug}`}
              className="text-[11px] underline underline-offset-2 text-white/85 hover:text-white"
            >
              Voir la suite
            </Link>
            <span className="text-[11px] text-white/75 truncate">
              {siteConfig.shortAddress}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 h-10 rounded-full bg-white px-3 flex items-center justify-between text-[#111111]">
        <span className="text-[12px] font-medium px-2">Apple Pay</span>
        <span className="h-7 px-3 rounded-full bg-[#111111] text-white text-[11px] font-medium inline-flex items-center">
          {activeBooking ? "Confirmé" : "Paiement Direct"}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          href={detailsHref}
          className="h-9 rounded-full bg-white text-[#111111] text-[12px] font-medium flex items-center justify-center hover:bg-[#EFE6D6] transition-colors whitespace-nowrap px-3"
        >
          Détails du séjour
        </Link>
        <Link
          href="/reservation"
          className="h-9 rounded-full border border-white/35 bg-white/10 text-white text-[12px] font-medium flex items-center justify-center hover:bg-white/20 transition-colors whitespace-nowrap px-3"
        >
          Modifier
        </Link>
      </div>
    </div>
  );
}
