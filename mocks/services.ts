import type { HotelServiceItem } from "@/types/hotel.types";

export const servicesMock: readonly HotelServiceItem[] = [
  {
    id: "concierge",
    title: "Concierge Service",
    subtitle: "Personalized 24/7 assistance for every moment of your journey.",
    description:
      "From last-minute private dining tables to bespoke cultural itineraries, our dedicated hosts anticipate every detail quietly and effortlessly.",
    hours: "Available 24/7 via suite tablet or direct WhatsApp line",
    highlights: [
      "Tailored multi-day local discovery itineraries",
      "Priority reservations at Michelin & hidden local tables",
      "Private yacht, helicopter & cultural guide access",
    ],
  },
  {
    id: "spa",
    title: "Spa & Wellness",
    subtitle: "Relax and rejuvenate with holistic botanical rituals.",
    description:
      "Set inside sunlit stone pavilions, our sanctuary combines warm volcanic stone therapies, organic essential oils, and mindful breathwork.",
    hours: "Daily 08:00 – 21:00 · In-villa rituals available",
    highlights: [
      "90-minute signature warm stone & botanical oil ritual",
      "Private herbal steam & cold plunge courtyard",
      "Sunrise breathwork and guided mobility sessions",
    ],
  },
  {
    id: "dining",
    title: "Fine Dining",
    subtitle: "Seasonal gourmet cuisine crafted from regional harvests.",
    description:
      "Our culinary team celebrates local coastal seafood, heirloom orchard produce, and wood-fired craftsmanship served beneath the open sky.",
    hours: "Breakfast 07:00 – 11:00 · Dinner 18:30 – 23:00",
    highlights: [
      "7-course seasonal chef tasting menu",
      "Organic morning breakfast served on your private terrace",
      "Curated biodynamic cellar pairings",
    ],
  },
  {
    id: "transfers",
    title: "Private Transfers",
    subtitle: "Travel in seamless comfort from tarmac to suite doorstep.",
    description:
      "Enjoy VIP meet-and-greet arrival assistance, chilled organic towels, and whisper-quiet electric or luxury hybrid sedans directly to your sanctuary.",
    hours: "Coordinated 24/7 with live flight tracking",
    highlights: [
      "VIP tarmac & fast-track customs greeting",
      "Chauffeured luxury fleet with Wi-Fi & refreshments",
      "Seaplane & private speedboat connections",
    ],
  },
];
