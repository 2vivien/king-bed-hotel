"use client";

import { Calendar, Check } from "lucide-react";
import Link from "next/link";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { useBookingStore } from "@/features/booking/store/booking.store";
import { formatReadableDate } from "@/lib/utils/format-date";
import { formatMoney } from "@/lib/utils/format-money";
import { buildBookingIcs, buildGoogleCalendarUrl } from "@/lib/utils/ics";

export function ConfirmationView({ bookingId }: { bookingId: string }) {
  const { confirmedBookings } = useBookingStore();
  const booking = confirmedBookings[bookingId.toUpperCase()];

  const handleDownloadIcs = () => {
    if (!booking) return;
    const content = buildBookingIcs({
      bookingId: booking.id,
      roomName: booking.roomName,
      location: booking.destinationName,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
    });
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kingsbed-${booking.id}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const myBookingHref = booking
    ? `/my-booking?ref=${encodeURIComponent(booking.id)}&email=${encodeURIComponent(
        booking.guest.email
      )}`
    : `/my-booking?ref=${encodeURIComponent(bookingId)}`;

  return (
    <div className="relative rounded-[36px] overflow-hidden bg-white border border-[#111111]/8 p-8 sm:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.08)] text-center max-w-2xl mx-auto">
      <div className="w-[72px] h-[72px] rounded-full bg-[#D8EBDD] flex items-center justify-center mx-auto">
        <Check className="w-8 h-8 text-[#111111]" strokeWidth={1.5} />
      </div>

      <p className="mt-6 text-[13px] font-mono tracking-wider text-[#5F5F5A] tabular-nums">
        Référence · {bookingId.toUpperCase()}
      </p>
      <h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-light leading-[1.08] tracking-[-0.03em] text-[#111111]">
        Votre Réservation est Confirmée !
      </h1>
      <p className="mt-3 text-[16px] text-[#5F5F5A] max-w-md mx-auto leading-[1.6]">
        Merci d&apos;avoir choisi King&apos;s Bed Hotel. Un e-mail de confirmation vient de vous
        être envoyé avec votre itinéraire et les coordonnées de notre réception.
      </p>

      {booking ? (
        <div className="mt-8 rounded-[24px] bg-[#FAF9F6] border border-[#111111]/8 p-5 text-left space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-[14px] overflow-hidden shrink-0 bg-[#EFE6D6]">
              <SuiteImage src={booking.image} alt={booking.roomName} sizes="64px" />
            </div>
            <div>
              <p className="text-[17px] font-medium text-[#111111]">{booking.roomName}</p>
              <p className="text-[13px] text-[#5F5F5A]">{booking.destinationName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-[#111111]/8 text-[13px]">
            <div>
              <p className="text-[#5F5F5A]">Arrivée</p>
              <p className="font-medium text-[#111111] mt-0.5 tabular-nums">
                {formatReadableDate(booking.checkIn)}
              </p>
            </div>
            <div>
              <p className="text-[#5F5F5A]">Départ</p>
              <p className="font-medium text-[#111111] mt-0.5 tabular-nums">
                {formatReadableDate(booking.checkOut)}
              </p>
            </div>
            <div>
              <p className="text-[#5F5F5A]">Total Réglé</p>
              <p className="font-medium text-[#111111] mt-0.5 tabular-nums">
                {formatMoney(booking.total, booking.currency)}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={myBookingHref}
          className="h-11 px-7 rounded-full bg-[#111111] text-white text-[14px] font-medium inline-flex items-center justify-center hover:bg-[#2A2A28] transition-colors"
        >
          Voir Ma Réservation
        </Link>

        {booking ? (
          <>
            <button
              type="button"
              onClick={handleDownloadIcs}
              className="h-11 px-5 rounded-full bg-[#FAF9F6] border border-[#111111]/12 text-[#111111] text-[14px] font-medium inline-flex items-center gap-2 hover:bg-[#EFE6D6] transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
              Télécharger .ics
            </button>
            <a
              href={buildGoogleCalendarUrl({
                bookingId: booking.id,
                roomName: booking.roomName,
                location: booking.destinationName,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
              })}
              target="_blank"
              rel="noreferrer"
              className="h-11 px-5 rounded-full bg-[#FAF9F6] border border-[#111111]/12 text-[#111111] text-[14px] font-medium inline-flex items-center hover:bg-[#EFE6D6] transition-colors"
            >
              Google Agenda
            </a>
          </>
        ) : null}
      </div>
    </div>
  );
}
