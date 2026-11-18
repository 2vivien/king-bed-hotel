import { NextRequest, NextResponse } from "next/server";
import { NewsletterSchema } from "@/features/booking/types/booking.types";
import { checkRateLimit } from "@/lib/server/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const rate = checkRateLimit(`newsletter:${ip}`, 10);
  if (!rate.allowed) {
    return NextResponse.json(
      { code: "RATE_LIMITED", message: "Please wait before subscribing again." },
      { status: 429 }
    );
  }

  const body: unknown = await req.json().catch(() => null);
  const parsed = NewsletterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        code: "VALIDATION_ERROR",
        message: parsed.error.issues[0]?.message ?? "Please provide a valid email address.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Welcome to SuiteSavvy. Exclusive seasonal invitations are on their way.",
  });
}
