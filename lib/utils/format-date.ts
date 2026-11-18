import { addDays, format, isValid, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Formate une date ISO (YYYY-MM-DD) pour l'affichage éditorial (ex. 18.06.2027).
 */
export function formatDisplayDate(isoDate: string): string {
  const parsed = parseISO(isoDate);
  if (!isValid(parsed)) return isoDate;
  return format(parsed, "dd.MM.yyyy");
}

/**
 * Formate une date ISO en libellé lisible long en français (ex. 18 juin 2027).
 */
export function formatReadableDate(isoDate: string): string {
  const parsed = parseISO(isoDate);
  if (!isValid(parsed)) return isoDate;
  return format(parsed, "dd MMM yyyy", { locale: fr });
}

/**
 * Génère des dates futures par défaut pour le brouillon initial.
 */
export function getDefaultFutureDates(): { checkIn: string; checkOut: string } {
  const start = addDays(new Date(), 14);
  const end = addDays(start, 3);
  return {
    checkIn: format(start, "yyyy-MM-dd"),
    checkOut: format(end, "yyyy-MM-dd"),
  };
}
