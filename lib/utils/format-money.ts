export type SupportedCurrency = "USD" | "EUR" | "XOF";

/**
 * Formate un montant stocké en unités mineures (centimes pour USD/EUR, unités pour XOF).
 */
export function formatMoney(
  amountMinor: number,
  currency: SupportedCurrency = "USD"
): string {
  const value = currency === "XOF" ? amountMinor : amountMinor / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: amountMinor % 100 === 0 ? 0 : 2,
  }).format(value);
}
