import { NextRequest, NextResponse } from "next/server";
import { BookingSearchSchema } from "@/features/booking/types/booking.types";
import { checkAvailabilityServer } from "@/lib/server/bookings.service";
import { checkRateLimit } from "@/lib/server/rate-limit";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const rate = checkRateLimit(`avail:${ip}`, 40);
  if (!rate.allowed) {
    return NextResponse.json(
      { code: "RATE_LIMITED", message: "Trop de demandes de disponibilité. Veuillez patienter un instant." },
      { status: 429 }
    );
  }

  const { searchParams } = req.nextUrl;
  const parsed = BookingSearchSchema.safeParse({
    checkIn: searchParams.get("checkIn") ?? "",
    checkOut: searchParams.get("checkOut") ?? "",
    guests: Number(searchParams.get("guests") ?? "2"),
    roomSlug: searchParams.get("roomSlug") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { code: "INVALID_QUERY", message: parsed.error.issues[0]?.message ?? "Dates invalides." },
      { status: 400 }
    );
  }

  const results = checkAvailabilityServer(parsed.data);
  return NextResponse.json({ results });
}
