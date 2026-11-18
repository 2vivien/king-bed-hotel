# 06 — Bonnes pratiques

## 1. Code
- TypeScript `strict`, **zéro `any`**, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.
- Composants purs et petits (≤ 50 lignes), pages d'assemblage (≤ 120), hooks/services/stores/types séparés (voir 02).
- Server Components par défaut ; `'use client'` le plus bas possible ; pas de données serveur dans des props client inutiles.
- Données : récupérées dans les Server Components via `lib/server/` (pas de `fetch('/api/...')` interne). Mutations : Route Handlers ou Server Actions validés par zod.
- Cache Next.js 16 : privilégier les **Cache Components** (`cacheComponents: true`) plutôt que `unstable_cache` pour le contenu statique (chambres, destinations) ; les disponibilités ne sont **jamais** mises en cache longue durée.
- Hooks : dépendances exhaustives, pas d'effet pour dériver un état (calculer pendant le rendu), nettoyage des abonnements, `useMemo/useCallback` seulement sur mesure.
- Documentation : TSDoc en français sur les fonctions exportées + un `README.md` court par feature.
- Pas de duplication : une règle métier = un seul endroit (ex. `computeTotal`).

## 2. Design / CSS
- Aucune valeur en dur : tout passe par les tokens (`tokens.css`). Pas de `style={{}}` sauf valeur dynamique.
- Classes Tailwind via `cn()` ; variantes avec `class-variance-authority` (Button, Chip, Badge).
- Mobile-first : breakpoints `sm 640 · md 768 · lg 1024 · xl 1280`. Tester 390 px, 768 px, 1440 px.
- `backdrop-filter` : prévoir un fond de repli opaque (`@supports not (backdrop-filter: blur(1px))`).

## 3. Performance (objectifs Lighthouse mobile ≥ 90)
- LCP < 2,5 s (image hero `priority`, `sizes` corrects, AVIF/WebP) · CLS < 0,05 (ratios fixes) · INP < 200 ms.
- Pas de bibliothèque lourde pour une seule fonction (dates : `date-fns` par import nommé ; icônes : imports nommés).
- Framer Motion : composants `LazyMotion` + `domAnimation` ; animations sur `transform`/`opacity` uniquement.
- Polices : `next/font` (Inter variable, `display: swap`, sous-ensemble latin).
- Analyser le bundle (`@next/bundle-analyzer`) avant chaque release ; budget JS initial < 150 Ko gzip par route.

## 4. Accessibilité (WCAG 2.2 AA)
- HTML sémantique (`header/nav/main/section/footer`), un seul `h1` par page, hiérarchie des titres respectée.
- Lien d'évitement "Aller au contenu", focus visible partout, ordre de tabulation logique.
- Dialogs/sheets/lightbox : focus trap, Échap, restitution du focus (primitives shadcn/Radix).
- Contraste ≥ 4,5:1 — **vérifier le texte blanc sur photos** (dégradé de lisibilité obligatoire).
- `prefers-reduced-motion` : désactive parallaxe et révélations. Cibles ≥ 44 px.

## 5. Sécurité
- Validation zod de toute entrée ; sortie échappée par React (jamais `dangerouslySetInnerHTML` sauf contenu maîtrisé et assaini).
- En-têtes : CSP stricte, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS (dans `next.config.ts`).
- Rate limiting (contact, newsletter, réservation, recherche de réservation) · honeypot + délai minimal anti-bot.
- Secrets uniquement côté serveur (`.env.local`, jamais `NEXT_PUBLIC_` pour une clé privée).
- Données personnelles minimales (RGPD) : consentement CGV, politique de confidentialité, suppression sur demande.
- Anti-énumération : `my-booking` exige référence **et** e-mail ; réponses identiques en cas d'échec.

## 6. SEO
- `generateMetadata` par page (titre, description, Open Graph, Twitter), `sitemap.ts`, `robots.ts`, canonical.
- Données structurées JSON-LD : `Hotel`/`LodgingBusiness`, `Room`/`Offer`, `FAQPage`, `BreadcrumbList`.
- URLs propres et stables (`/rooms/royal-villa`), `alt` descriptifs, pas de contenu critique chargé uniquement au clic.

## 7. i18n (optionnel, prévu dès le départ)
Textes dans `messages/en.json` (+ `fr.json`) via `next-intl` si le site doit être bilingue ; aucun texte visible codé dans les composants une fois i18n activé. Formats date/monnaie via `Intl`.

## 8. Qualité automatisée
- CI : `typecheck` · `lint` · `test` · `build` · script de contrôle des tailles de fichiers (échoue si > limites du 02) · budget images.
- Husky + lint-staged (Prettier + ESLint) · Conventional Commits.
- Tests : unitaires (Vitest) sur calculs/validation, composants clés (Testing Library), E2E Playwright sur le tunnel de réservation.
- Boucle de vérification avant livraison : audit technique → sécurité → QA visuelle/click-through comparée aux maquettes.
