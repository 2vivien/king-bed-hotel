import type { Booking } from "@/features/booking/types/booking.types";

// Date fixe lointaine pour éviter tout conflit de dispo avec le calendrier courant
const checkIn = "2027-08-10";
const checkOut = "2027-08-13";

export const initialBookingsMock: Booking[] = [
  {
    id: "KB-8K2F9A",
    roomSlug: "royal-villa",
    roomName: "Suite Pavillon Royal",
    destinationName: "King's Bed Hotel · Savalou",
    address: "Savalou, Bénin",
    image: "/images/rooms/royal-villa.jpg",
    checkIn,
    checkOut,
    guests: 2,
    nights: 3,
    pricePerNight: 524000,
    subtotal: 1572000,
    taxes: 188640,
    total: 1760640,
    currency: "XOF",
    status: "confirmed",
    guest: {
      firstName: "Sarah",
      lastName: "Martin",
      email: "sarah.martin@example.com",
      phone: "+229 01 62 34 56 78",
      notes: "Arrivée en fin d'après-midi, petit-déjeuner en chambre souhaité.",
    },
    createdAt: new Date().toISOString(),
  },
];
