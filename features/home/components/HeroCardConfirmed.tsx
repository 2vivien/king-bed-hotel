"use client";

import { Check, Minus, Plus } from "lucide-react";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { useBookingStore } from "@/features/booking/store/booking.store";
import { formatMoney } from "@/lib/utils/format-money";
import { calculateNights, computeBookingPricing } from "@/lib/utils/nights";
import { findSpace, spacesMock } from "@/lib/utils/space-lookup";
import { conferenceHallsMock } from "@/mocks/halls";
import { roomsMock } from "@/mocks/rooms";

export function HeroCardConfirmed() {
  const {
    checkIn,
    checkOut,
    guests,
    roomSlug,
    lastConfirmedId,
    confirmedBookings,
    setDraft,
  } = useBookingStore();
  const activeBooking = lastConfirmedId
    ? confirmedBookings[lastConfirmedId.toUpperCase()]
    : undefined;

  const displayRoom =
    findSpace(activeBooking?.roomSlug ?? roomSlug) ?? roomsMock[2];
  const activeCheckIn = activeBooking?.checkIn ?? checkIn;
  const activeCheckOut = activeBooking?.checkOut ?? checkOut;
  const activeGuests = activeBooking?.guests ?? guests;

  const nights = calculateNights(activeCheckIn, activeCheckOut);
  const pricing = computeBookingPricing(displayRoom.pricePerNight, nights);
  const totalLabel = formatMoney(pricing.total);

  const updateGuests = (delta: number) => {
    setDraft({ guests: Math.min(8, Math.max(1, activeGuests + delta)) });
  };

  return (
    <div className="rounded-[24px] border border-black/5 bg-white p-5 text-[#111111] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col justify-between gap-3">
          <span className="w-8 h-8 rounded-full border border-[#111111]/15 bg-white flex items-center justify-center">
            <Check className="w-4 h-4 text-[#111111]" strokeWidth={1.5} />
          </span>
          <p className="text-[19px] leading-[1.15] font-semibold tracking-[-0.02em]">
            {activeBooking ? "Réservation confirmée" : "Prêt pour votre séjour"}
          </p>
        </div>

        <div className="relative w-20 h-20 rounded-[18px] overflow-hidden shrink-0 bg-[#EFE6D6]">
          <SuiteImage
            src={displayRoom.image}
            alt={displayRoom.name}
            sizes="80px"
          />
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {/* Room selector */}
        <label className="block">
          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#5F5F5A]">
            Chambre
          </span>
          <select
            value={displayRoom.slug}
            onChange={(e) => setDraft({ roomSlug: e.target.value })}
            aria-label="Choisir une chambre"
            className="mt-1 h-11 w-full rounded-2xl border border-[#EDEDEA] bg-[#faf9f6] px-3.5 text-[13px] font-medium text-[#111111] outline-none cursor-pointer focus:border-[#111111]"
          >
            <optgroup label="Chambres & Suites">
              {roomsMock.map((room) => (
                <option key={room.slug} value={room.slug}>
                  {room.name} — {formatMoney(room.pricePerNight)} / nuit
                </option>
              ))}
            </optgroup>
            <optgroup label="Salles de Conférence">
              {conferenceHallsMock.map((hall) => (
                <option key={hall.slug} value={hall.slug}>
                  {hall.name} — {formatMoney(hall.pricePerNight)} / jour
                </option>
              ))}
            </optgroup>
          </select>
        </label>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#5F5F5A]">
              Arrivée
            </span>
            <input
              type="date"
              value={activeCheckIn}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDraft({ checkIn: e.target.value })}
              aria-label="Date d'arrivée"
              className="mt-1 h-11 w-full rounded-2xl border border-[#EDEDEA] bg-[#faf9f6] px-3 text-[13px] font-medium tabular-nums text-[#111111] outline-none focus:border-[#111111]"
            />
          </label>
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#5F5F5A]">
              Départ
            </span>
            <input
              type="date"
              value={activeCheckOut}
              min={activeCheckIn}
              onChange={(e) => setDraft({ checkOut: e.target.value })}
              aria-label="Date de départ"
              className="mt-1 h-11 w-full rounded-2xl border border-[#EDEDEA] bg-[#faf9f6] px-3 text-[13px] font-medium tabular-nums text-[#111111] outline-none focus:border-[#111111]"
            />
          </label>
        </div>

        {/* Guests stepper */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#EDEDEA] bg-[#faf9f6] px-3.5 h-11">
          <span className="text-[12px] font-medium text-[#111111]">
            {activeGuests} {activeGuests === 1 ? "personne" : "personnes"}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateGuests(-1)}
              disabled={activeGuests <= 1}
              aria-label="Réduire le nombre de voyageurs"
              className="w-8 h-8 rounded-full border border-[#EDEDEA] bg-white text-[#111111] flex items-center justify-center hover:bg-[#f4f3f0] transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Minus className="w-4 h-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => updateGuests(1)}
              disabled={activeGuests >= 8}
              aria-label="Augmenter le nombre de voyageurs"
              className="w-8 h-8 rounded-full border border-[#EDEDEA] bg-white text-[#111111] flex items-center justify-center hover:bg-[#f4f3f0] transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Plus className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-[#111111]/8 pt-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5F5F5A]">
          Total estimé
        </span>
        <span className="text-[22px] font-semibold tabular-nums tracking-[-0.02em]">
          {totalLabel}
        </span>
      </div>
    </div>
  );
}
