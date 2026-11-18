export type RoomCategory = "rooms" | "suites" | "villas" | "penthouses";

export type RoomExperienceTag = "pool" | "ocean" | "butler" | "spa";

export interface Room {
  slug: string;
  name: string;
  category: RoomCategory;
  destinationSlug: string;
  destinationName: string;
  pricePerNight: number; // unités mineures (centimes)
  originalPricePerNight?: number;
  maxGuests: number;
  sizeSqm: number;
  bedType: string;
  tagline: string;
  description: string;
  image: string;
  gallery: readonly string[];
  amenities: readonly string[];
  rules: readonly string[];
  featured: boolean;
  rating?: number;
  reviewCount?: number;
  badgeLabel?: string;
  badgeSublabel?: string;
  experienceTags?: readonly RoomExperienceTag[];
  horizonView?: string;
  waterFeature?: string;
  breakfastIncluded?: string;
  chauffeurInfo?: string;
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  regionLabel: string;
  summary: string;
  description: string;
  bestTime: string;
  climate: string;
  image: string;
  activities: readonly string[];
  featuredHome: boolean;
}

export interface HotelServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  hours: string;
  highlights: readonly string[];
}

export type GalleryCategory = "All" | "Rooms" | "Pool" | "Dining" | "Wellness";

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, "All">;
  image: string;
  span?: "tall" | "wide" | "square";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  stayTitle: string;
  avatarLabel: string;
  image: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
