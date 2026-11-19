export type SupportedCurrency = "USD" | "EUR" | "XOF";

/**
 * Formate un montant stocké en unités majeures (centimes pour USD/EUR,
 * francs entiers pour XOF — pas de centimes).
 */
export function formatMoney(
  amountMinor: number,
  currency: SupportedCurrency = "XOF"
): string {
  const value = currency === "XOF" ? amountMinor : amountMinor / 100;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "XOF" ? 0 : amountMinor % 100 === 0 ? 0 : 2,
  }).format(value);
}
