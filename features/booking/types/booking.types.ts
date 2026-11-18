import { z } from "zod";

export const BookingSearchSchema = z
  .object({
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid check-in date"),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid check-out date"),
    guests: z.number().int().min(1).max(8),
    roomSlug: z.string().optional(),
  })
  .refine((v) => v.checkOut > v.checkIn, {
    path: ["checkOut"],
    message: "Check-out date must be after check-in date",
  });

export const GuestDetailsSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(6, "Phone number is required").max(20),
  notes: z.string().trim().max(500).optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Please accept the booking terms",
  }),
});

export const CreateBookingInputSchema = z.object({
  roomSlug: z.string().min(1),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.number().int().min(1).max(8),
  guest: GuestDetailsSchema,
  addOns: z.array(z.enum(["chauffeur", "breakfast", "spa"])).optional(),
  promoCode: z.string().trim().max(32).optional(),
  paymentMethod: z.enum(["Apple Pay", "Card"]).optional(),
  idempotencyKey: z.string().min(8).max(120).optional(),
});

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1500),
  website: z.string().max(0).optional(), // honeypot
});

export const NewsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
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
  paymentMethod: "Apple Pay" | "Card";
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
