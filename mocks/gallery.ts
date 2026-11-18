import type { GalleryItem } from "@/types/hotel.types";

export const galleryMock: readonly GalleryItem[] = [
  {
    id: "g-01",
    title: "Piscine & Terrasses de l'Hôtel",
    caption: "Bassin miroir et terrasses en pierre naturelle au cœur du King's Bed Hotel.",
    category: "Pool",
    image: "/images/hero/hero-pool.jpg",
    span: "wide",
  },
  {
    id: "g-02",
    title: "Chambre Deluxe Jardin",
    caption: "Murs en travertin et larges baies vitrées ouvrant sur le jardin paisible.",
    category: "Rooms",
    image: "/images/rooms/deluxe-room.jpg",
    span: "tall",
  },
  {
    id: "g-03",
    title: "Espace Spa & Bien-Être",
    caption: "Linge biologique, huiles essentielles botaniques et soins relaxants.",
    category: "Wellness",
    image: "/images/services/spa-towels.jpg",
    span: "square",
  },
  {
    id: "g-04",
    title: "Suite Pavillon Royal",
    caption: "Terrasse privative en teck et bassin privé réservés aux résidents.",
    category: "Pool",
    image: "/images/rooms/royal-villa.jpg",
    span: "tall",
  },
  {
    id: "g-05",
    title: "Grand Salon & Espace Petit-Déjeuner",
    caption: "Salon lumineux pour le petit-déjeuner du matin et les pauses séminaires.",
    category: "Dining",
    image: "/images/about/about-lounge.jpg",
    span: "wide",
  },
  {
    id: "g-06",
    title: "Suite Exécutive Salon",
    caption: "Salon privé idéal pour vos rendez-vous d'affaires ou moments de détente.",
    category: "Rooms",
    image: "/images/rooms/premium-suite.jpg",
    span: "square",
  },
];
