import type {
  AvailabilityResult,
  Booking,
  ContactFormInput,
  CreateBookingInput,
  NewsletterInput,
} from "@/features/booking/types/booking.types";

interface ApiErrorPayload {
  code?: string;
  message?: string;
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json().catch(() => ({}))) as T & ApiErrorPayload;
  if (!res.ok) {
    throw new Error(data.message ?? "Impossible d'effectuer la demande. Veuillez réessayer.");
  }
  return data;
}

export async function searchAvailability(params: {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomSlug?: string;
}): Promise<AvailabilityResult[]> {
  const query = new URLSearchParams({
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    guests: String(params.guests),
  });
  if (params.roomSlug) query.set("roomSlug", params.roomSlug);
  const res = await fetch(`/api/availability?${query.toString()}`, {
    cache: "no-store",
  });
  const data = await parseJson<{ results: AvailabilityResult[] }>(res);
  return data.results;
}

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(input.idempotencyKey ? { "Idempotency-Key": input.idempotencyKey } : {}),
    },
    body: JSON.stringify(input),
  });
  const data = await parseJson<{ booking: Booking }>(res);
  return data.booking;
}

export async function getBooking(id: string, email: string): Promise<Booking> {
  const query = new URLSearchParams({ email });
  const res = await fetch(`/api/bookings/${encodeURIComponent(id)}?${query.toString()}`, {
    cache: "no-store",
  });
  const data = await parseJson<{ booking: Booking }>(res);
  return data.booking;
}

export async function cancelBooking(id: string, email: string): Promise<Booking> {
  const res = await fetch(`/api/bookings/${encodeURIComponent(id)}/cancel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await parseJson<{ booking: Booking }>(res);
  return data.booking;
}

export async function submitContact(
  input: ContactFormInput
): Promise<{ ok: boolean; message: string }> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseJson<{ ok: boolean; message: string }>(res);
}

export async function subscribeNewsletter(
  input: NewsletterInput
): Promise<{ ok: boolean; message: string }> {
  const res = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseJson<{ ok: boolean; message: string }>(res);
}
