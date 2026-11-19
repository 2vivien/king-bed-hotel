import { z } from "zod";

export const BookingSearchSchema = z
  .object({
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date d'arrivée invalide"),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date de départ invalide"),
    guests: z.number().int().min(1).max(8),
    roomSlug: z.string().optional(),
  })
  .refine((v) => v.checkOut > v.checkIn, {
    path: ["checkOut"],
    message: "La date de départ doit être postérieure à la date d'arrivée",
  });

export const GuestDetailsSchema = z.object({
  firstName: z.string().trim().min(1, "Le prénom est requis").max(60),
  lastName: z.string().trim().min(1, "Le nom est requis").max(60),
  email: z.string().trim().email("Veuillez saisir une adresse e-mail valide"),
  phone: z.string().trim().min(6, "Le numéro de téléphone est requis").max(20),
  notes: z.string().trim().max(500).optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Veuillez accepter les conditions de réservation",
  }),
});

export const CreateBookingInputSchema = z.object({
  roomSlug: z.string().min(1),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.number().int().min(1).max(8),
  guest: GuestDetailsSchema,
  addOns: z.array(z.enum(["chauffeur", "breakfast"])).optional(),
  promoCode: z.string().trim().max(32).optional(),
  idempotencyKey: z.string().min(8).max(120).optional(),
});

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, "Veuillez saisir votre nom").max(80),
  email: z.string().trim().email("Veuillez saisir une adresse e-mail valide"),
  message: z.string().trim().min(10, "Votre message doit contenir au moins 10 caractères").max(1500),
  website: z.string().max(0).optional(), // honeypot
});

export const NewsletterSchema = z.object({
  email: z.string().trim().email("Veuillez saisir une adresse e-mail valide"),
  company: z.string().max(0).optional(), // honeypot
});

export type BookingSearch = z.infer<typeof BookingSearchSchema>;
export type GuestDetails = z.infer<typeof GuestDetailsSchema>;
export type CreateBookingInput = z.infer<typeof CreateBookingInputSchema>;
export type ContactFormInput = z.infer<typeof ContactFormSchema>;
export type NewsletterInput = z.infer<typeof NewsletterSchema>;

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: string;
  roomSlug: string;
  roomName: string;
  destinationName: string;
  address: string;
  image: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  pricePerNight: number;
  subtotal: number;
  addOnsTotal?: number;
  discount?: number;
  taxes: number;
  total: number;
  currency: "USD" | "EUR" | "XOF";
  status: BookingStatus;
  guest: Omit<GuestDetails, "acceptTerms">;
  createdAt: string;
}

export interface AvailabilityResult {
  roomSlug: string;
  available: boolean;
  pricePerNight: number;
  nights: number;
  subtotal: number;
  taxes: number;
  total: number;
}
