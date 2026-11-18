import { NextRequest, NextResponse } from "next/server";
import { CreateBookingInputSchema } from "@/features/booking/types/booking.types";
import { createBookingServer } from "@/lib/server/bookings.service";
import { checkRateLimit } from "@/lib/server/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const rate = checkRateLimit(`book:${ip}`, 15);
  if (!rate.allowed) {
    return NextResponse.json(
      { code: "RATE_LIMITED", message: "Trop de tentatives de réservation. Veuillez patienter quelques instants." },
      { status: 429 }
    );
  }

  const body: unknown = await req.json().catch(() => null);
  const parsed = CreateBookingInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        code: "VALIDATION_ERROR",
        message: parsed.error.issues[0]?.message ?? "Veuillez vérifier les détails de votre réservation.",
      },
      { status: 400 }
    );
  }

  const idempotencyKey = req.headers.get("Idempotency-Key") ?? parsed.data.idempotencyKey;
  const outcome = createBookingServer({ ...parsed.data, idempotencyKey });

  if (outcome.error) {
    return NextResponse.json(
      { code: outcome.error.code, message: outcome.error.message },
      { status: outcome.error.status }
    );
  }

  return NextResponse.json({ booking: outcome.booking }, { status: 201 });
}
