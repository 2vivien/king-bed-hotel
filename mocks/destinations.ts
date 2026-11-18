import type { Destination } from "@/types/hotel.types";

export const destinationsMock: readonly Destination[] = [
  {
    slug: "lisbon",
    name: "Chambres & Suites",
    country: "King's Bed Hotel",
    regionLabel: "Chambres & Suites",
    summary: "Lits King Size d'exception, calme acoustique et terrasses privées.",
    description:
      "Des chambres Deluxe lumineuses aux suites exécutives avec terrasse, chaque hébergement du King's Bed Hotel garantit un confort irréprochable.",
    bestTime: "Toute l'année",
    climate: "Lit King Size · Calme absolu",
    image: "/images/destinations/lisbon.jpg",
    activities: [
      "Literie King Size haut de gamme",
      "Fibre Wi-Fi et bureau exécutif",
      "Service en chambre 24h/24",
    ],
    featuredHome: true,
  },
  {
    slug: "positano",
    name: "Petit-Déjeuner",
    country: "Bed & Breakfast",
    regionLabel: "Petit-Déjeuner",
    summary: "Buffet gastronomique artisanal servi chaque matin en salle ou en chambre.",
    description:
      "Viennoiseries chaudes, fruits de saison, œufs bio et cafés de spécialité servis dès 6h30 dans notre verrière ou directement sur votre terrasse.",
    bestTime: "06h30 – 10h30",
    climate: "Formule Buffet & Service en Chambre",
    image: "/images/destinations/positano.jpg",
    activities: [
      "Buffet chaud & froid de saison",
      "Service petit-déjeuner en chambre",
      "Pauses gourmandes pour séminaires",
    ],
    featuredHome: true,
  },
  {
    slug: "maldives",
    name: "Réunions & Conférences",
    country: "Espaces Pro",
    regionLabel: "Salles & Conférences",
    summary: "Salons modulables et auditorium équipé pour séminaires et conseils.",
    description:
      "Organisez vos réunions d'affaires, conférences et lancements dans des salles baignées de lumière naturelle dotées d'équipements audiovisuels 4K.",
    bestTime: "07h00 – 22h00",
    climate: "8 à 180 personnes · Équipement 4K",
    image: "/images/destinations/maldives.jpg",
    activities: [
      "Salles de réunion acoustiques",
      "Visioconférence & écrans 4K",
      "Forfaits séminaire clé en main",
    ],
    featuredHome: true,
  },
  {
    slug: "bali",
    name: "King's Bed Hotel",
    country: "Paris · France",
    regionLabel: "King's Bed Hotel",
    summary: "Chambres & suites raffinées, petit-déjeuner inclus et centre de conférences.",
    description:
      "Votre adresse dédiée aux séjours d'exception, aux petits-déjeuners gourmands et à la réussite de vos réunions et conférences.",
    bestTime: "Ouvert 24h/24",
    climate: "Chambres · Breakfast · Conférences",
    image: "/images/destinations/bali.jpg",
    activities: [
      "Chambres & Suites King Size",
      "Petit-déjeuner artisanal inclus",
      "Salles de réunion & conférences",
    ],
    featuredHome: false,
  },
  {
    slug: "santorini",
    name: "Espace Bien-Être",
    country: "Spa & Détente",
    regionLabel: "Spa & Détente",
    summary: "Piscine intérieure, sauna et soins botaniques réservés aux résidents.",
    description:
      "Prolongez vos journées de travail ou de visite dans notre spa apaisant avec piscine chauffée et soins sur mesure.",
    bestTime: "08h00 – 21h00",
    climate: "Piscine · Sauna · Soins",
    image: "/images/destinations/santorini.jpg",
    activities: [
      "Bassin chauffé toute l'année",
      "Massages et soins sur réservation",
      "Salon tisanerie au calme",
    ],
    featuredHome: false,
  },
];
