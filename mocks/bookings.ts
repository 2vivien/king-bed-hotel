import type { Booking } from "@/features/booking/types/booking.types";
import { getDefaultFutureDates } from "@/lib/utils/format-date";

const { checkIn, checkOut } = getDefaultFutureDates();

export const initialBookingsMock: Booking[] = [
  {
    id: "KB-8K2F9A",
    roomSlug: "royal-villa",
    roomName: "Suite Pavillon Royal",
    destinationName: "King's Bed Hotel · Paris",
    address: "25 Avenue Royale",
    image: "/images/rooms/royal-villa.jpg",
    checkIn,
    checkOut,
    guests: 2,
    nights: 3,
    pricePerNight: 79900,
    subtotal: 239700,
    taxes: 28764,
    total: 268464,
    currency: "EUR",
    status: "confirmed",
    paymentMethod: "Apple Pay",
    guest: {
      firstName: "Sarah",
      lastName: "Martin",
      email: "sarah.martin@example.com",
      phone: "+33 6 12 34 56 78",
      notes: "Arrivée en fin d'après-midi, petit-déjeuner en chambre souhaité.",
    },
    createdAt: new Date().toISOString(),
  },
];
