import { NextRequest, NextResponse } from "next/server";
import { ContactFormSchema } from "@/features/booking/types/booking.types";
import { checkRateLimit } from "@/lib/server/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const rate = checkRateLimit(`contact:${ip}`, 10);
  if (!rate.allowed) {
    return NextResponse.json(
      { code: "RATE_LIMITED", message: "Veuillez patienter une minute avant d'envoyer un autre message." },
      { status: 429 }
    );
  }

  const body: unknown = await req.json().catch(() => null);
  const parsed = ContactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        code: "VALIDATION_ERROR",
        message: parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs de votre demande.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Merci. Notre équipe de réception et événements vous répondra sous 2 heures.",
  });
}
