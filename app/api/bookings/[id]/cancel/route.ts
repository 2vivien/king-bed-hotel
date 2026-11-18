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
      { code: "INVALID_EMAIL", message: "Une adresse e-mail de réservation valide est requise." },
      { status: 400 }
    );
  }

  const cancelled = cancelBookingServer(id, parsed.data.email);
  if (!cancelled) {
    return NextResponse.json(
      { code: "NOT_FOUND", message: "Aucune réservation correspondante n'a été trouvée." },
      { status: 404 }
    );
  }

  return NextResponse.json({ booking: cancelled });
}
