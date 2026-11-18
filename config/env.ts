import { z } from "zod";

const EnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().default("http://localhost:3000"),
  NEXT_PUBLIC_USE_MOCK: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),
  NEXT_PUBLIC_CURRENCY: z.enum(["USD", "EUR", "XOF"]).default("USD"),
  PAYMENT_PROVIDER: z.enum(["mock", "stripe", "kkiapay", "fedapay"]).default("mock"),
});

export const env = EnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  NEXT_PUBLIC_USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK || "true",
  NEXT_PUBLIC_CURRENCY: process.env.NEXT_PUBLIC_CURRENCY || "USD",
  PAYMENT_PROVIDER: process.env.PAYMENT_PROVIDER || "mock",
});
