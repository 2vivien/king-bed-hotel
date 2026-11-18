import type { Booking } from "@/features/booking/types/booking.types";
import { getDefaultFutureDates } from "@/lib/utils/format-date";

const { checkIn, checkOut } = getDefaultFutureDates();

export const initialBookingsMock: Booking[] = [
  {
    id: "SS-8K2F9A",
    roomSlug: "royal-villa",
    roomName: "Royal Villa",
    destinationName: "Bali, Indonesia",
    address: "Jalan Raya Ubud No. 25",
    image: "/images/rooms/royal-villa.jpg",
    checkIn,
    checkOut,
    guests: 2,
    nights: 3,
    pricePerNight: 79900,
    subtotal: 239700,
    taxes: 28764,
    total: 268464,
    currency: "USD",
    status: "confirmed",
    paymentMethod: "Apple Pay",
    guest: {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 212 555 0198",
      notes: "Late afternoon arrival, organic tea ritual preferred.",
    },
    createdAt: new Date().toISOString(),
  },
];
