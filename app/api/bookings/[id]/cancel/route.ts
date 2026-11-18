import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cancelBookingServer } from "@/lib/server/bookings.service";

const CancelSchema = z.object({
  email: z.string().trim().email(),
});

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body: unknown = await req.json().catch(() => null);
  const parsed = CancelSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { code: "INVALID_EMAIL", message: "A valid reservation email is required." },
      { status: 400 }
    );
  }

  const cancelled = cancelBookingServer(id, parsed.data.email);
  if (!cancelled) {
    return NextResponse.json(
      { code: "NOT_FOUND", message: "No matching reservation found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ booking: cancelled });
}
