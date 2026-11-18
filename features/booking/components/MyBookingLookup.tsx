"use client";

import { Calendar, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  cancelBooking,
  getBooking,
} from "@/features/booking/services/booking.service";
import { useBookingStore } from "@/features/booking/store/booking.store";
import type { Booking } from "@/features/booking/types/booking.types";
import { formatReadableDate } from "@/lib/utils/format-date";
import { formatMoney } from "@/lib/utils/format-money";
import { buildBookingIcs, buildGoogleCalendarUrl } from "@/lib/utils/ics";

export function MyBookingLookup() {
  const searchParams = useSearchParams();
  const { confirmedBookings, saveConfirmedBooking } = useBookingStore();

  const [reference, setReference] = useState(searchParams.get("ref") ?? "");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(
    Boolean(searchParams.get("ref") && searchParams.get("email"))
  );
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  const performLookup = async (refCode: string, guestEmail: string) => {
    setLoading(true);
    setError("");
    try {
      const localMatch = confirmedBookings[refCode.trim().toUpperCase()];
      if (
        localMatch &&
        localMatch.guest.email.toLowerCase() === guestEmail.trim().toLowerCase()
      ) {
        setBooking(localMatch);
        return;
      }
      const fetched = await getBooking(refCode, guestEmail);
      setBooking(fetched);
      saveConfirmedBooking(fetched);
    } catch (err) {
      setBooking(null);
      setError(err instanceof Error ? err.message : "Aucune réservation correspondante n'a été trouvée.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const qRef = searchParams.get("ref");
    const qEmail = searchParams.get("email");
    if (!qRef || !qEmail) return;

    let active = true;
    const localMatch = confirmedBookings[qRef.trim().toUpperCase()];
    if (
      localMatch &&
      localMatch.guest.email.toLowerCase() === qEmail.trim().toLowerCase()
    ) {
      Promise.resolve().then(() => {
        if (!active) return;
        setBooking(localMatch);
        setLoading(false);
      });
      return () => {
        active = false;
      };
    }

    getBooking(qRef, qEmail)
      .then((fetched) => {
        if (!active) return;
        setBooking(fetched);
        saveConfirmedBooking(fetched);
      })
      .catch((err) => {
        if (!active) return;
        setBooking(null);
        setError(err instanceof Error ? err.message : "Aucune réservation correspondante n'a été trouvée.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void performLookup(reference, email);
  };

  const handleCancel = async () => {
    if (!booking) return;
    setCancelling(true);
    setError("");
    try {
      const updated = await cancelBooking(booking.id, booking.guest.email);
      setBooking(updated);
      saveConfirmedBooking(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible d'annuler cette réservation.");
    } finally {
      setCancelling(false);
    }
  };

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-5 rounded-[28px] bg-white border border-[#111111]/8 p-7 shadow-[0_8px_30px_rgba(0,0,0,0.05)] space-y-5">
        <h2 className="text-[20px] font-normal tracking-[-0.015em] text-[#111111]">
          Retrouver Votre Séjour
        </h2>
        <p className="text-[14px] text-[#5F5F5A] leading-relaxed">
          Saisissez votre référence de réservation et l&apos;adresse e-mail utilisée lors de votre commande.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Référence de Réservation"
            placeholder="KB-8K2F9A"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
          <Input
            label="E-mail du Client"
            type="email"
            placeholder="sarah.martin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error ? (
            <p className="text-[13px] text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            <Search className="w-4 h-4" strokeWidth={1.5} />
            {loading ? "Recherche..." : "Trouver Ma Réservation"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            setReference("KB-8K2F9A");
            setEmail("sarah.martin@example.com");
            void performLookup("KB-8K2F9A", "sarah.martin@example.com");
          }}
          className="text-[13px] text-[#5F5F5A] underline underline-offset-2 hover:text-[#111111] cursor-pointer"
        >
          Essayer avec l&apos;exemple (KB-8K2F9A)
        </button>
      </div>

      <div className="lg:col-span-7">
        {booking ? (
          <div className="rounded-[28px] bg-white border border-[#111111]/8 p-7 sm:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.06)] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#111111]/8">
              <div>
                <p className="text-[13px] font-mono text-[#5F5F5A] tabular-nums">
                  {booking.id}
                </p>
                <h3 className="text-[24px] font-light tracking-[-0.02em] text-[#111111]">
                  {booking.roomName}
                </h3>
                <p className="text-[14px] text-[#5F5F5A]">{booking.destinationName}</p>
              </div>
              <span
                className={`h-8 px-4 rounded-full text-[13px] font-medium inline-flex items-center ${
                  booking.status === "cancelled"
                    ? "bg-[#F4F1EA] text-[#5F5F5A]"
                    : "bg-[#D8EBDD] text-[#1F3A2C]"
                }`}
              >
                {booking.status === "cancelled" ? "Annulée" : "Confirmée"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-[18px] overflow-hidden shrink-0 bg-[#EFE6D6]">
                <SuiteImage src={booking.image} alt={booking.roomName} sizes="96px" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1 text-[14px]">
                <div>
                  <p className="text-[#5F5F5A]">Arrivée</p>
                  <p className="font-medium tabular-nums">
                    {formatReadableDate(booking.checkIn)}
                  </p>
                </div>
                <div>
                  <p className="text-[#5F5F5A]">Départ</p>
                  <p className="font-medium tabular-nums">
                    {formatReadableDate(booking.checkOut)}
                  </p>
                </div>
                <div>
                  <p className="text-[#5F5F5A]">Hôtes</p>
                  <p className="font-medium tabular-nums">
                    {booking.guests} {booking.guests > 1 ? "personnes" : "personne"}
                  </p>
                </div>
                <div>
                  <p className="text-[#5F5F5A]">Client</p>
                  <p className="font-medium">
                    {booking.guest.firstName} {booking.guest.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-[#5F5F5A]">Total</p>
                  <p className="font-medium tabular-nums">
                    {formatMoney(booking.total, booking.currency)}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#111111]/8 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <Button type="button" variant="secondary" onClick={handleDownloadIcs}>
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  Télécharger .ics
                </Button>
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
                  className="h-11 px-5 rounded-full bg-white border border-[#111111]/12 text-[#111111] text-[14px] font-medium inline-flex items-center hover:bg-[#F4F1EA] transition-colors"
                >
                  Google Agenda
                </a>
              </div>

              {booking.status !== "cancelled" ? (
                <Button
                  type="button"
                  variant="sand"
                  disabled={cancelling}
                  onClick={handleCancel}
                >
                  {cancelling ? "Annulation..." : "Annuler la Réservation"}
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] bg-white border border-[#111111]/8 p-10 text-center space-y-2">
            <p className="text-[18px] font-light text-[#111111]">
              Votre réservation s&apos;affichera ici
            </p>
            <p className="text-[14px] text-[#5F5F5A]">
              Recherchez une confirmation King&apos;s Bed Hotel pour exporter l&apos;agenda ou gérer votre séjour.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
