import type { FaqItem, Testimonial } from "@/types/hotel.types";

export const testimonialsMock: readonly Testimonial[] = [
  {
    id: "t-1",
    name: "Sarah Johnson",
    location: "New York, USA",
    quote:
      "Every detail felt quietly effortless—from the sunlit travertine suite overlooking the palms to the private evening dining under the stars. SuiteSavvy transformed our getaway into something unforgettable.",
    stayTitle: "Stayed in Royal Villa · Bali",
    avatarLabel: "SJ",
    image: "/images/destinations/maldives.jpg",
  },
  {
    id: "t-2",
    name: "Henrik Lindqvist",
    location: "Stockholm, Sweden",
    quote:
      "Rarely does hospitality feel both architecturally inspiring and deeply personal. Waking up above the lagoon in the Maldives felt like living inside a tranquil dream.",
    stayTitle: "Stayed in Lagoon Water Villa · Maldives",
    avatarLabel: "HL",
    image: "/images/destinations/santorini.jpg",
  },
  {
    id: "t-3",
    name: "Amélie Laurent",
    location: "Paris, France",
    quote:
      "The restraint, calm materials, and intuitive concierge made our Amalfi stay extraordinary. Our private boat excursion and terrace dinners were handled before we even thought to ask.",
    stayTitle: "Stayed in Terrace Garden Room · Positano",
    avatarLabel: "AL",
    image: "/images/destinations/positano.jpg",
  },
];

export const faqMock: readonly FaqItem[] = [
  {
    id: "check-in",
    question: "What are the standard check-in and check-out times?",
    answer:
      "Standard check-in begins at 15:00 and check-out is until 12:00. Early arrival or late departure may be arranged through your dedicated concierge subject to suite availability.",
  },
  {
    id: "cancellation",
    question: "What is SuiteSavvy's cancellation policy?",
    answer:
      "Deluxe Rooms may be cancelled free of charge up to 48 hours prior to arrival. Suites allow free cancellation up to 72 hours prior, and Villas up to 7 days before check-in.",
  },
  {
    id: "transfers",
    question: "Are private airport transfers included with my stay?",
    answer:
      "Complimentary private transfers are included with all Premium Suite and Royal Villa reservations. Deluxe Room guests may request seamless chauffeured pickup during booking.",
  },
  {
    id: "children",
    question: "Are families and children welcome at SuiteSavvy properties?",
    answer:
      "Yes, families are warmly welcomed across our Bali, Lisbon, and Maldives residences, with multi-bedroom villas and bespoke family excursions available upon request.",
  },
  {
    id: "payment",
    question: "Which payment methods are accepted?",
    answer:
      "We support Apple Pay, major international credit cards, and instant confirmation receipts. All totals include applicable sanctuary taxes with zero hidden resort fees.",
  },
  {
    id: "parking",
    question: "Is private valet parking or EV charging available?",
    answer:
      "Complimentary valet parking and high-speed electric vehicle charging stations are available at all mainland properties in Bali, Lisbon, and Positano.",
  },
];
