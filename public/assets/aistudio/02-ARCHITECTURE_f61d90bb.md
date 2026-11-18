# 02 — Architecture Next.js

## 1. Stack (figée)

Next.js 16 (App Router, `src/`) · React 19 · TypeScript `strict` · Tailwind CSS v4 · Framer Motion · shadcn/ui (primitives accessibles, restylées avec les tokens) · Tabler Icons · `next/image` + `next/font` · react-hook-form + zod · Zustand (brouillon de réservation) · TanStack Query (disponibilités, mutations) · date-fns + react-day-picker · ESLint (CLI) + Prettier · Vitest + Testing Library · Playwright (parcours réservation).

Next.js 16 : `cookies()`, `headers()`, `params` et `searchParams` sont **asynchrones** (`await`). Ne jamais appeler ses propres Route Handlers depuis un Server Component : extraire la logique dans `lib/server/` et l'appeler directement. Pas de `next/dynamic` avec `ssr: false` dans un Server Component.

## 2. Arborescence

```
suitesavvy/
├─ public/
│  ├─ images/           # hero, rooms, destinations, gallery, services, about, textures
│  └─ icons/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx · page.tsx · loading.tsx · error.tsx · not-found.tsx
│  │  ├─ globals.css · sitemap.ts · robots.ts · manifest.ts
│  │  ├─ (site)/
│  │  │  ├─ about/page.tsx
│  │  │  ├─ rooms/page.tsx · rooms/[slug]/page.tsx
│  │  │  ├─ services/page.tsx
│  │  │  ├─ destinations/page.tsx · destinations/[slug]/page.tsx
│  │  │  ├─ gallery/page.tsx
│  │  │  ├─ contact/page.tsx
│  │  │  ├─ faq/page.tsx
│  │  │  └─ legal/(privacy|terms)/page.tsx
│  │  ├─ (booking)/
│  │  │  ├─ reservation/page.tsx
│  │  │  ├─ reservation/confirmation/[id]/page.tsx
│  │  │  └─ my-booking/page.tsx
│  │  └─ api/
│  │     ├─ availability/route.ts · bookings/route.ts · bookings/[id]/route.ts
│  │     ├─ contact/route.ts · newsletter/route.ts
│  ├─ features/                      # 1 dossier = 1 domaine (feature-based)
│  │  ├─ home/ · about/ · rooms/ · services/ · destinations/
│  │  ├─ gallery/ · contact/ · newsletter/ · testimonials/ · booking/
│  │  └─ <feature>/{components,hooks,services,store,types,constants}/ + README.md
│  ├─ components/
│  │  ├─ ui/        # Button, Input, Select, Badge, Chip, Tabs, Dialog, Sheet, Skeleton
│  │  ├─ layout/    # NavbarPill, MobileMenu, Footer, PageShell, Section
│  │  └─ shared/    # Reveal, SectionHeading, ImageCard, IconCircleButton, AvatarStack
│  ├─ lib/
│  │  ├─ utils/ (cn, format-money, format-date, nights) · motion/ · seo/
│  │  └─ server/ (bookings.service, availability.service, mailer, rate-limit)
│  ├─ config/ (site.ts, nav.ts, env.ts)    # env validé par zod
│  ├─ mocks/  (rooms.ts, destinations.ts, bookings.ts, testimonials.ts)
│  ├─ styles/ (tokens.css)
│  └─ types/  (global.d.ts)
├─ tests/ (unit/, e2e/)
├─ docs/    # ces fichiers MD
├─ .env.example · next.config.ts · tsconfig.json · eslint.config.mjs
```

## 3. Limites de taille (strictes, non négociables)

| Élément | Max lignes | Règle |
|---------|-----------|-------|
| Composant (`.tsx`) | **50** | Au-delà : découper en sous-composants |
| Page (`page.tsx`) | **120** | Une page assemble des sections, aucune logique métier |
| Hook | 60 | Un hook = une responsabilité |
| Service | 80 | Une fonction = une opération ; I/O isolé |
| Store Zustand | 80 | Un store par feature, actions nommées |
| Types | 80 | Un fichier par entité |
| Constantes / données mock | 150 | Une entité par fichier ; au-delà → découper |
| Fonction | 30 | Sinon extraire |
| Fichier utilitaire | 100 | Fonctions pures, testées |

Autres règles : **zéro `any`** (utiliser `unknown` + zod) · pas de `// @ts-ignore` · pas de `console.log` committé · pas de fichier `utils.ts` fourre-tout · imports absolus `@/…` · noms : composants `PascalCase.tsx`, hooks `use-xxx.ts`, services `xxx.service.ts`, stores `xxx.store.ts`, types `xxx.types.ts`.

## 4. Séparation des responsabilités

- **Composant** : affichage pur (props typées, pas de fetch, pas de règle métier).
- **Hook** (`hooks/`) : état + effets + appels aux services (ex. `useAvailability`, `useBookingDraft`).
- **Service** (`services/`) : accès données/API, sélection `USE_MOCK` (`NEXT_PUBLIC_USE_MOCK=true|false`) → mock local ou vraie API. Même signature dans les deux cas.
- **Store** : état partagé côté client uniquement (brouillon de réservation, persisté en `sessionStorage`).
- **Types** : source de vérité = schémas zod, types dérivés avec `z.infer`.
- **Server Components par défaut** ; `'use client'` seulement pour interaction (carousel, formulaire, calendrier, lightbox, menu mobile) et **le plus bas possible dans l'arbre**.

## 5. Exemple de découpage — page d'accueil (≤ 120 lignes)

```tsx
// app/page.tsx — assemble uniquement
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DestinationTeaserRow />
      <IntroStats />
      <SuitesShowcase />
      <TestimonialsSection />
      <NewsletterBanner />
    </>
  );
}
```
Chaque section vit dans `features/home/components/` (≤ 50 lignes, sinon sous-composants : `HeroCardConfirmed`, `HeroCardStay`, `ScrollCue`…).

## 6. Variables d'environnement (`.env.example`)

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_USE_MOCK=true
NEXT_PUBLIC_CURRENCY=USD
DATABASE_URL=
EMAIL_FROM=
EMAIL_API_KEY=
PAYMENT_PROVIDER=mock
```
Tout est validé au démarrage dans `config/env.ts` (zod) : l'app refuse de démarrer si une variable obligatoire manque.
