import { NextRequest, NextResponse } from "next/server";
import { findBookingServer } from "@/lib/server/bookings.service";
import { checkRateLimit } from "@/lib/server/rate-limit";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const rate = checkRateLimit(`lookup:${ip}`, 20);
  if (!rate.allowed) {
    return NextResponse.json(
      { code: "RATE_LIMITED", message: "Too many lookup attempts. Please wait briefly." },
      { status: 429 }
    );
  }

  const { id } = await context.params;
  const email = req.nextUrl.searchParams.get("email") ?? "";

  if (!email.trim()) {
    return NextResponse.json(
      { code: "NOT_FOUND", message: "No matching reservation found." },
      { status: 404 }
    );
  }

  const booking = findBookingServer(id, email);
  if (!booking) {
    return NextResponse.json(
      { code: "NOT_FOUND", message: "No matching reservation found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ booking });
}
