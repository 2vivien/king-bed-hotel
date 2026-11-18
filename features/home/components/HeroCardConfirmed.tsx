"use client";

import { Asterisk, Calendar, Check } from "lucide-react";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { useBookingStore } from "@/features/booking/store/booking.store";
import { formatDisplayDate } from "@/lib/utils/format-date";
import { buildBookingIcs, buildGoogleCalendarUrl } from "@/lib/utils/ics";
import { roomsMock } from "@/mocks/rooms";

export function HeroCardConfirmed() {
  const { checkIn, checkOut, guests, roomSlug, lastConfirmedId, confirmedBookings } =
    useBookingStore();
  const activeBooking = lastConfirmedId
    ? confirmedBookings[lastConfirmedId.toUpperCase()]
    : undefined;

  const displayRoom =
    roomsMock.find((r) => r.slug === (activeBooking?.roomSlug ?? roomSlug)) ??
    roomsMock[2];
  const activeCheckIn = activeBooking?.checkIn ?? checkIn;
  const activeCheckOut = activeBooking?.checkOut ?? checkOut;
  const activeGuests = activeBooking?.guests ?? guests;

  const handleDownloadIcs = () => {
    const content = buildBookingIcs({
      bookingId: activeBooking?.id ?? "SS-PREVIEW",
      roomName: displayRoom.name,
      location: displayRoom.destinationName,
      checkIn: activeCheckIn,
      checkOut: activeCheckOut,
    });
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `suitesavvy-${activeCheckIn}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const googleUrl = buildGoogleCalendarUrl({
    bookingId: activeBooking?.id ?? "SS-PREVIEW",
    roomName: displayRoom.name,
    location: displayRoom.destinationName,
    checkIn: activeCheckIn,
    checkOut: activeCheckOut,
  });

  return (
    <div className="glass-surface rounded-[28px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-white/40 text-[#111111]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full border border-[#111111]/15 bg-white/80 flex items-center justify-center">
              <Check className="w-4 h-4 text-[#111111]" strokeWidth={1.5} />
            </span>
            <Asterisk className="w-4 h-4 text-[#111111]/70" strokeWidth={1.5} />
          </div>
          <p className="text-[19px] leading-[1.15] font-normal tracking-[-0.02em]">
            {activeBooking ? "Booking is confirmed!" : "Stay ready to book"}
          </p>
        </div>

        <div className="relative w-20 h-20 rounded-[18px] overflow-hidden shrink-0 border border-white/50">
          <SuiteImage
            src={displayRoom.image}
            alt={displayRoom.name}
            sizes="80px"
          />
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-[#111111]/8 space-y-2 text-[13px]">
        <div className="flex items-center justify-between">
          <span className="text-[#5F5F5A]">Check In</span>
          <span className="font-medium tabular-nums">
            {formatDisplayDate(activeCheckIn)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#5F5F5A]">Check Out</span>
          <span className="font-medium tabular-nums">
            {formatDisplayDate(activeCheckOut)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#5F5F5A]">Guests</span>
          <span className="font-medium tabular-nums">
            {activeGuests} {activeGuests === 1 ? "guest" : "people"}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#111111]/8">
        <p className="text-[12px] text-[#5F5F5A] mb-2">Add to Calendar</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={handleDownloadIcs}
            aria-label="Add to Apple Calendar"
            className="h-8 rounded-full bg-white/85 hover:bg-white border border-[#111111]/10 text-[12px] font-medium flex items-center justify-center transition-colors cursor-pointer"
          >
            Apple
          </button>
          <a
            href={googleUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Add to Google Calendar"
            className="h-8 rounded-full bg-white/85 hover:bg-white border border-[#111111]/10 text-[12px] font-medium flex items-center justify-center transition-colors"
          >
            Google
          </a>
          <button
            type="button"
            onClick={handleDownloadIcs}
            aria-label="Download calendar invite"
            className="h-8 rounded-full bg-white/85 hover:bg-white border border-[#111111]/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
