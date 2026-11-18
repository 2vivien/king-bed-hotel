"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Booking } from "@/features/booking/types/booking.types";
import { getDefaultFutureDates } from "@/lib/utils/format-date";

interface BookingDraftState {
  destinationSlug: string;
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  confirmedBookings: Record<string, Booking>;
  lastConfirmedId: string | null;
  setDraft: (
    patch: Partial<
      Pick<
        BookingDraftState,
        "destinationSlug" | "roomSlug" | "checkIn" | "checkOut" | "guests"
      >
    >
  ) => void;
  saveConfirmedBooking: (booking: Booking) => void;
  resetDraft: () => void;
}

const defaults = getDefaultFutureDates();

export const useBookingStore = create<BookingDraftState>()(
  persist(
    (set) => ({
      destinationSlug: "bali",
      roomSlug: "royal-villa",
      checkIn: defaults.checkIn,
      checkOut: defaults.checkOut,
      guests: 2,
      confirmedBookings: {},
      lastConfirmedId: null,
      setDraft: (patch) => set((state) => ({ ...state, ...patch })),
      saveConfirmedBooking: (booking) =>
        set((state) => ({
          ...state,
          lastConfirmedId: booking.id,
          confirmedBookings: {
            ...state.confirmedBookings,
            [booking.id.toUpperCase()]: booking,
          },
        })),
      resetDraft: () => {
        const nextDefaults = getDefaultFutureDates();
        set((state) => ({
          ...state,
          destinationSlug: "bali",
          roomSlug: "royal-villa",
          checkIn: nextDefaults.checkIn,
          checkOut: nextDefaults.checkOut,
          guests: 2,
        }));
      },
    }),
    {
      name: "kingsbed-booking-draft",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
