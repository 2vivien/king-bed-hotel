import { differenceInCalendarDays, parseISO } from "date-fns";

const TAX_RATE = 0.12;

/**
 * Calcule le nombre de nuits calendaires entre deux dates ISO.
 */
export function calculateNights(checkInIso: string, checkOutIso: string): number {
  const start = parseISO(checkInIso);
  const end = parseISO(checkOutIso);
  const diff = differenceInCalendarDays(end, start);
  return Number.isFinite(diff) && diff > 0 ? diff : 0;
}

/**
 * Calcule le sous-total, les taxes (12 %) et le total en unités mineures.
 */
export function computeBookingPricing(pricePerNightMinor: number, nights: number): {
  subtotal: number;
  taxes: number;
  total: number;
} {
  const safeNights = Math.max(0, nights);
  const subtotal = pricePerNightMinor * safeNights;
  const taxes = Math.round(subtotal * TAX_RATE);
  return {
    subtotal,
    taxes,
    total: subtotal + taxes,
  };
}
