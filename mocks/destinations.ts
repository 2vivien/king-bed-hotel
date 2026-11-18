import type { Destination } from "@/types/hotel.types";

export const destinationsMock: readonly Destination[] = [
  {
    slug: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    regionLabel: "Lisbon, Portugal",
    summary: "Golden hilltop terraces, Atlantic light, and timeless stone facades.",
    description:
      "Perched across seven sunlit hills above the Tagus River, our Lisbon sanctuary blends historic limestone architecture with understated contemporary calm.",
    bestTime: "April – October",
    climate: "24°C · Sunlit Mediterranean breezes",
    image: "/images/destinations/lisbon.jpg",
    activities: [
      "Private sunset sail along the Tagus",
      "Curated architectural walking tour in Alfama",
      "Rooftop cellar tasting with regional vintages",
    ],
    featuredHome: true,
  },
  {
    slug: "positano",
    name: "Positano",
    country: "Italy",
    regionLabel: "Positano, Italy",
    summary: "Cliffside lemon groves overlooking the deep azure Tyrrhenian Sea.",
    description:
      "Suspended between vertical coastal cliffs and cobalt waters, our Positano retreat offers secluded stone terraces, private boat charters, and unhurried Amalfi evenings.",
    bestTime: "May – September",
    climate: "26°C · Warm coastal sunshine",
    image: "/images/destinations/positano.jpg",
    activities: [
      "Private Riva wooden boat excursion to Capri",
      "Cliffside citrus grove breakfast experience",
      "Evening coastal dining overlooking the cove",
    ],
    featuredHome: true,
  },
  {
    slug: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    regionLabel: "Maldives",
    summary: "Overwater timber villas floating above translucent coral lagoons.",
    description:
      "Accessible by private seaplane, our Maldivian atoll sanctuary surrounds you with glass-calm turquoise horizons, private ocean decks, and barefoot serenity.",
    bestTime: "November – April",
    climate: "29°C · Crystal tropical waters",
    image: "/images/destinations/maldives.jpg",
    activities: [
      "Guided coral reef snorkeling at sunrise",
      "Sandbank private candlelight dinner",
      "Overwater holistic sound & spa therapy",
    ],
    featuredHome: true,
  },
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    regionLabel: "Bali, Indonesia",
    summary: "Mossy river valleys, terraced emerald pools, and serene Ubud jungle.",
    description:
      "Rooted in Ubud's tranquil rainforest canopy, our flagship Bali estate pairs hand-carved volcanic stone terraces with reflective infinity pools and sacred stillness.",
    bestTime: "April – October",
    climate: "27°C · Lush highland warmth",
    image: "/images/destinations/bali.jpg",
    activities: [
      "Dawn mist meditation in private jungle pavilion",
      "Traditional Balinese water blessing & spa ritual",
      "Private culinary journey through Ubud highlands",
    ],
    featuredHome: false,
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    regionLabel: "Santorini, Greece",
    summary: "Sculpted Cycladic curves suspended above the volcanic Aegean caldera.",
    description:
      "Carved softly into the cliffs of Oia, our Santorini suites pair pure lime-washed geometry with heated horizon plunge pools and unforgettable golden sunsets.",
    bestTime: "May – October",
    climate: "25°C · Crisp Aegean breeze",
    image: "/images/destinations/santorini.jpg",
    activities: [
      "Private catamaran cruise across the caldera",
      "Volcanic vineyard tasting at golden hour",
      "In-suite sunset dining overlooking the Aegean",
    ],
    featuredHome: false,
  },
];
