# 04 — Système de réservation

## 1. Parcours

1. **Entrée** : bouton *Booking* (nav), *Book Now* (carte chambre), *Check Availability* → `/reservation` (paramètres optionnels : `room`, `checkIn`, `checkOut`, `guests`).
2. **Dates & invités** : `Check In`, `Check Out`, `Guests` (1–8). Validation : arrivée ≥ aujourd'hui, départ > arrivée, séjour ≤ 30 nuits, invités ≤ capacité de la chambre.
3. **Disponibilité** : `Check Availability` → appel `GET /api/availability`. Résultat : chambres libres (sinon message + dates alternatives proposées).
4. **Choix chambre** : si pas déjà choisie, liste compacte des chambres disponibles (même `RoomCard`).
5. **Coordonnées** : prénom, nom, e-mail, téléphone, demandes spéciales (optionnel), acceptation CGV.
6. **Récapitulatif** (colonne droite, sticky) : vignette, chambre, prix/nuit, nuits, taxes, **Total calculé**, bouton sable **Confirm Booking**.
7. **Paiement** : interface `PaymentProvider` (voir §5). Par défaut `mock` (succès simulé).
8. **Confirmation** : création de la réservation → redirection `/reservation/confirmation/[id]` + e-mail.
9. **Suivi** : `/my-booking` (référence + e-mail) → détails, calendrier (.ics, Google, Apple), annulation selon règles.

L'état du tunnel est dans l'URL (dates, chambre) + un store Zustand (`booking.store.ts`, `sessionStorage`) pour les coordonnées. Rafraîchir la page ne perd rien.

## 2. Modèle de données (zod = source de vérité)

```ts
// features/booking/types/booking.types.ts
import { z } from "zod";

export const BookingSearchSchema = z
  .object({
    checkIn: z.coerce.date(),
    checkOut: z.coerce.date(),
    guests: z.number().int().min(1).max(8),
    roomSlug: z.string().optional(),
  })
  .refine((v) => v.checkOut > v.checkIn, { path: ["checkOut"], message: "invalid_range" });

export const GuestDetailsSchema = z.object({
  firstName: z.string().min(1).max(60),
  lastName: z.string().min(1).max(60),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  notes: z.string().max(500).optional(),
  acceptTerms: z.literal(true),
});

export type BookingSearch = z.infer<typeof BookingSearchSchema>;
export type GuestDetails = z.infer<typeof GuestDetailsSchema>;
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: string;          // référence publique ex. SS-8K2F9A
  roomSlug: string;
  checkIn: string;     // ISO date (YYYY-MM-DD), sans heure
  checkOut: string;
  guests: number;
  nights: number;
  total: number;       // en unités mineures (centimes) — jamais de float
  currency: "USD" | "EUR" | "XOF";
  status: BookingStatus;
  guest: GuestDetails;
  createdAt: string;
}
```
Les montants sont des **entiers** (centimes ; pour XOF, unité entière). `nights = diffInCalendarDays(checkOut, checkIn)`. `total = nights × pricePerNight + taxes`.

## 3. API (Route Handlers fins → `lib/server/*.service.ts`)

| Méthode | Route | Rôle |
|---------|-------|------|
| GET | `/api/availability?checkIn&checkOut&guests` | Chambres disponibles + prix calculés |
| POST | `/api/bookings` | Crée une réservation (revalide dispo + prix **côté serveur**) |
| GET | `/api/bookings/[id]?email=` | Récupère une réservation (e-mail requis) |
| POST | `/api/bookings/[id]/cancel` | Annulation selon règles |
| POST | `/api/contact` · `/api/newsletter` | Formulaires |

Règles serveur non négociables : **ne jamais faire confiance au prix envoyé par le client** (recalculer) · validation zod en entrée et en sortie · rate limiting par IP · idempotence (`Idempotency-Key`) pour éviter les doubles réservations · vérification de chevauchement de dates dans une **transaction** · erreurs normalisées `{ code, message }` sans fuite technique.

## 4. Mock / réel (`USE_MOCK`)

`features/booking/services/booking.service.ts` expose `searchAvailability`, `createBooking`, `getBooking`, `cancelBooking`. Avec `NEXT_PUBLIC_USE_MOCK=true` → données de `mocks/` (latence simulée 300–600 ms, quelques chambres "complètes" pour tester les états). Avec `false` → les Route Handlers. Les composants ne savent pas lequel est actif.

Base de données conseillée en prod : PostgreSQL + Prisma (tables `rooms`, `bookings`, `blocked_dates`), contrainte d'exclusion sur plages de dates pour empêcher le chevauchement.

## 5. Paiement (interface extensible)

```ts
export interface PaymentProvider {
  readonly id: "mock" | "stripe" | "kkiapay" | "fedapay";
  createSession(input: { bookingId: string; amount: number; currency: string; returnUrl: string }): Promise<{ url?: string; reference: string }>;
  verify(reference: string): Promise<"paid" | "failed" | "pending">;
}
```
`mock` (défaut) · adaptateurs ajoutables sans toucher à l'UI. Pour un public d'Afrique de l'Ouest : prévoir Kkiapay/Fedapay et la devise XOF via `NEXT_PUBLIC_CURRENCY` (formatage `Intl.NumberFormat`). Apple Pay (maquette) = option Stripe, à activer seulement si le fournisseur le permet.

## 6. États UI à couvrir

Chargement (skeletons, pas de spinner plein écran) · aucune disponibilité · erreur réseau (retry) · dates invalides (message sous le champ) · conflit pendant la confirmation (chambre prise entre-temps → retour à l'étape chambres) · paiement échoué · succès · réservation introuvable.

## 7. Accessibilité du calendrier et des formulaires

Libellés visibles et associés · navigation clavier complète dans le calendrier (flèches, Pg↑/Pg↓, Échap) · `aria-live="polite"` pour résultats de disponibilité · erreurs annoncées · jamais de couleur seule pour l'état · champs `autocomplete` (`given-name`, `email`, `tel`).

## 8. E-mails

Confirmation (référence, dates, chambre, total, lien "View My Booking", .ics), annulation, accusé du formulaire contact. Gabarits sobres alignés sur le design system (React Email), envoi côté serveur uniquement.

## 9. Tests minimum

Unitaires : calcul des nuits/total, validation zod, formatage monnaie/dates. Intégration : service disponibilité. E2E Playwright : recherche → choix → coordonnées → confirmation ; cas "chambre indisponible" ; mobile 390 px.
