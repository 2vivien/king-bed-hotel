"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useBookingStore } from "@/features/booking/store/booking.store";
import { formatMoney } from "@/lib/utils/format-money";
import { calculateNights, computeBookingPricing } from "@/lib/utils/nights";
import type { Room } from "@/types/hotel.types";

export function RoomBookingWidget({ room }: { room: Room }) {
  const router = useRouter();
  const draft = useBookingStore();
  const [checkIn, setCheckIn] = useState(draft.checkIn);
  const [checkOut, setCheckOut] = useState(draft.checkOut);
  const [guests, setGuests] = useState(Math.min(draft.guests, room.maxGuests));
  const [error, setError] = useState("");

  const nights = calculateNights(checkIn, checkOut);
  const pricing = computeBookingPricing(room.pricePerNight, nights);

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (nights <= 0) {
      setError("Check-out must be after check-in.");
      return;
    }
    setError("");
    draft.setDraft({
      roomSlug: room.slug,
      destinationSlug: room.destinationSlug,
      checkIn,
      checkOut,
      guests,
    });
    const params = new URLSearchParams({
      room: room.slug,
      checkIn,
      checkOut,
      guests: String(guests),
    });
    router.push(`/reservation?${params.toString()}`);
  };

  return (
    <aside className="rounded-[28px] bg-white border border-[#111111]/8 p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:sticky lg:top-24">
      <div className="flex items-baseline justify-between gap-2 pb-5 border-b border-[#111111]/8">
        <div>
          <p className="text-[28px] font-light tracking-[-0.02em] tabular-nums text-[#111111]">
            {formatMoney(room.pricePerNight)}
          </p>
          <p className="text-[13px] text-[#5F5F5A]">per night · taxes calculated below</p>
        </div>
        <span className="text-[13px] text-[#5F5F5A]">Max {room.maxGuests} guests</span>
      </div>

      <form onSubmit={handleProceed} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Check In"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
          <Input
            label="Check Out"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="suite-guests" className="text-[13px] font-medium text-[#5F5F5A]">
            Guests
          </label>
          <select
            id="suite-guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="h-12 w-full rounded-2xl bg-[#F4F1EA] px-4 text-[15px] text-[#111111] outline-none focus:bg-white focus:ring-2 focus:ring-[#111111]/10"
          >
            {Array.from({ length: room.maxGuests }, (_, idx) => idx + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        {error ? (
          <p className="text-[13px] text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        {nights > 0 ? (
          <div className="pt-4 border-t border-[#111111]/8 space-y-2 text-[14px]">
            <div className="flex justify-between text-[#5F5F5A]">
              <span>
                {formatMoney(room.pricePerNight)} × {nights} nights
              </span>
              <span className="tabular-nums">{formatMoney(pricing.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#5F5F5A]">
              <span>Sanctuary taxes (12%)</span>
              <span className="tabular-nums">{formatMoney(pricing.taxes)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#111111]/8 font-medium text-[16px] text-[#111111]">
              <span>Estimated Total</span>
              <span className="tabular-nums">{formatMoney(pricing.total)}</span>
            </div>
          </div>
        ) : null}

        <Button type="submit" variant="sand" size="lg" className="w-full mt-2">
          Reserve Suite
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </Button>
      </form>
    </aside>
  );
}
