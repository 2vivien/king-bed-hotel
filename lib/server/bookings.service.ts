import { env } from "@/config/env";
import { siteConfig } from "@/config/site";
import {
  type AvailabilityResult,
  type Booking,
  type CreateBookingInput,
} from "@/features/booking/types/booking.types";
import { calculateNights, computeBookingPricing } from "@/lib/utils/nights";
import { initialBookingsMock } from "@/mocks/bookings";
import { roomsMock } from "@/mocks/rooms";

interface BookingStoreGlobal {
  bookings: Booking[];
  idempotencyMap: Map<string, Booking>;
}

const globalForBookings = globalThis as unknown as {
  __suitesavvyStore?: BookingStoreGlobal;
};

function getStore(): BookingStoreGlobal {
  if (!globalForBookings.__suitesavvyStore) {
    globalForBookings.__suitesavvyStore = {
      bookings: [...initialBookingsMock],
      idempotencyMap: new Map<string, Booking>(),
    };
  }
  return globalForBookings.__suitesavvyStore;
}

function datesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return aStart < bEnd && bStart < aEnd;
}

function generateBookingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `KB-${suffix}`;
}

/**
 * Vérifie les disponibilités et calcule les tarifs côté serveur.
 */
export function checkAvailabilityServer(params: {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomSlug?: string;
}): AvailabilityResult[] {
  const nights = calculateNights(params.checkIn, params.checkOut);
  if (nights <= 0 || nights > 30) {
    return [];
  }

  const store = getStore();
  const candidates = params.roomSlug
    ? roomsMock.filter((r) => r.slug === params.roomSlug)
    : roomsMock;

  return candidates.map((room) => {
    const fitsGuests = params.guests <= room.maxGuests;
    const hasConflict = store.bookings.some(
      (b) =>
        b.status === "confirmed" &&
        b.roomSlug === room.slug &&
        datesOverlap(params.checkIn, params.checkOut, b.checkIn, b.checkOut)
    );
    const pricing = computeBookingPricing(room.pricePerNight, nights);

    return {
      roomSlug: room.slug,
      available: fitsGuests && !hasConflict,
      pricePerNight: room.pricePerNight,
      nights,
      subtotal: pricing.subtotal,
      taxes: pricing.taxes,
      total: pricing.total,
    };
  });
}

/**
 * Crée une réservation en recalculant le prix côté serveur.
 */
export function createBookingServer(input: CreateBookingInput): {
  booking?: Booking;
  error?: { code: string; message: string; status: number };
} {
  const store = getStore();

  if (input.idempotencyKey && store.idempotencyMap.has(input.idempotencyKey)) {
    return { booking: store.idempotencyMap.get(input.idempotencyKey) };
  }

  const room = roomsMock.find((r) => r.slug === input.roomSlug);
  if (!room) {
    return {
      error: { code: "ROOM_NOT_FOUND", message: "L'hébergement ou la salle sélectionnée est introuvable.", status: 404 },
    };
  }

  const nights = calculateNights(input.checkIn, input.checkOut);
  if (nights <= 0 || nights > 30) {
    return {
      error: {
        code: "INVALID_DATES",
        message: "La durée du séjour doit être comprise entre 1 et 30 nuits.",
        status: 400,
      },
    };
  }

  if (input.guests > room.maxGuests) {
    return {
      error: {
        code: "CAPACITY_EXCEEDED",
        message: `${room.name} accueille jusqu'à ${room.maxGuests} personnes.`,
        status: 400,
      },
    };
  }

  const conflict = store.bookings.some(
    (b) =>
      b.status === "confirmed" &&
      b.roomSlug === room.slug &&
      datesOverlap(input.checkIn, input.checkOut, b.checkIn, b.checkOut)
  );
  if (conflict) {
    return {
      error: {
        code: "DATES_UNAVAILABLE",
        message: "Cet espace vient tout juste d'être réservé aux dates sélectionnées.",
        status: 409,
      },
    };
  }

  const pricing = computeBookingPricing(room.pricePerNight, nights);
  const selectedAddOns = new Set(input.addOns ?? []);
  let addOnsTotal = 0;
  if (selectedAddOns.has("chauffeur")) addOnsTotal += 12000;
  if (selectedAddOns.has("breakfast")) addOnsTotal += 4500 * input.guests * nights;
  if (selectedAddOns.has("spa")) addOnsTotal += 22000;

  const normalizedPromo = input.promoCode?.trim().toUpperCase();
  const discount =
    normalizedPromo === "KINGSBED" || normalizedPromo === "SAVVYVIP" || normalizedPromo === "PRIVILEGE"
      ? 20000
      : 0;

  const adjustedSubtotal = pricing.subtotal;
  const taxes = Math.round((adjustedSubtotal + addOnsTotal) * 0.1);
  const total = Math.max(0, adjustedSubtotal + addOnsTotal + taxes - discount);

  const booking: Booking = {
    id: generateBookingCode(),
    roomSlug: room.slug,
    roomName: room.name,
    destinationName: room.destinationName,
    address: siteConfig.shortAddress,
    image: room.image,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
    nights,
    pricePerNight: room.pricePerNight,
    subtotal: adjustedSubtotal,
    addOnsTotal,
    discount,
    taxes,
    total,
    currency: env.NEXT_PUBLIC_CURRENCY,
    status: "confirmed",
    paymentMethod: input.paymentMethod ?? "Apple Pay",
    guest: {
      firstName: input.guest.firstName,
      lastName: input.guest.lastName,
      email: input.guest.email,
      phone: input.guest.phone,
      notes: input.guest.notes,
    },
    createdAt: new Date().toISOString(),
  };

  store.bookings.unshift(booking);
  if (input.idempotencyKey) {
    store.idempotencyMap.set(input.idempotencyKey, booking);
  }

  return { booking };
}

/**
 * Récupère une réservation par référence et e-mail (anti-énumération).
 */
export function findBookingServer(id: string, email?: string): Booking | null {
  const store = getStore();
  const normalizedId = id.trim().toUpperCase();
  const match = store.bookings.find((b) => b.id.toUpperCase() === normalizedId);
  if (!match) return null;
  if (email && match.guest.email.trim().toLowerCase() !== email.trim().toLowerCase()) {
    return null;
  }
  return match;
}

/**
 * Annule une réservation après vérification de la référence et de l'e-mail.
 */
export function cancelBookingServer(id: string, email: string): Booking | null {
  const store = getStore();
  const normalizedId = id.trim().toUpperCase();
  const normalizedEmail = email.trim().toLowerCase();
  const match = store.bookings.find(
    (b) =>
      b.id.toUpperCase() === normalizedId &&
      b.guest.email.trim().toLowerCase() === normalizedEmail
  );
  if (!match) return null;
  match.status = "cancelled";
  return match;
}
