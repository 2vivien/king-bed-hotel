# 07 — Prompt maître pour l'agent de code (Claude Code / Cursor)

## Prompt à coller

```
Tu es un ingénieur front-end senior. Tu construis le site hôtelier SuiteSavvy en Next.js 16 (App Router, TypeScript strict, Tailwind v4).

AVANT DE CODER, lis dans l'ordre : docs/00-README.md, 01-DESIGN-SYSTEM.md, 02-ARCHITECTURE.md, 03-PAGES-ET-SECTIONS.md, 04-RESERVATION.md, 05-ASSETS-IMAGES.md, 06-BONNES-PRATIQUES.md.
Les maquettes sont dans docs/maquettes/ (3 images). Ce sont la vérité visuelle.

RÈGLES ABSOLUES
1. Design gelé : mêmes couleurs, images, espacements, arrondis, textes que les maquettes. Tu ne "réinterprètes" rien. En cas de doute, tu compares à la maquette.
2. Style Apple : titres légers et serrés, beaucoup de blanc, capsules, verre dépoli, mouvement doux. Rien de générique.
3. Limites : composant ≤ 50 lignes, page ≤ 120 lignes, hook ≤ 60, service ≤ 80, store ≤ 80, zéro `any`.
4. Séparation stricte composants / hooks / services / stores / types. Pattern USE_MOCK.
5. Les pages absentes des maquettes sont dérivées des mêmes composants et tokens.
6. Le tunnel de réservation est fonctionnel de bout en bout (mock par défaut).
7. En cas de doute sur une librairie ou une pratique : recherche web de la meilleure option actuelle, puis applique-la correctement.
8. Rien ne tombe : tu termines chaque phase complètement avant la suivante, tu cases la checklist, tu ne laisses ni TODO ni page vide.

PHASES (valide chaque phase : typecheck + lint + build + comparaison visuelle)
P0 Init projet, config, tokens, polices, ESLint/Prettier, script de contrôle des tailles de fichiers
P1 Composants ui/ + layout/ (NavbarPill, MobileMenu, Footer, Button, Input, Tabs, Dialog…)
P2 Accueil complète (6 sections + hero cartes verre)
P3 Rooms (liste + détail) + Services + Destinations (liste + détail)
P4 About + Gallery (lightbox) + Contact (formulaire + API)
P5 Réservation : types, store, services mock, API, UI, confirmation, my-booking
P6 FAQ, légal, 404, SEO (metadata, sitemap, JSON-LD), a11y
P7 Perf (images, bundle), tests unitaires + E2E, audit sécurité
P8 Revue finale : checklist ci-dessous + captures comparées aux maquettes à 390 / 768 / 1440 px

À la fin de chaque phase, réponds avec : fichiers créés, écarts éventuels avec les maquettes, ce qui reste (doit être vide à P8).
```

## Checklist finale (rien ne doit manquer)

**Design fidèle**
- [ ] Hero identique (titre, boutons, 2 cartes verre, ScrollCue) — images 1/2/3
- [ ] Nav capsule, lien actif sable, bouton Booking noir
- [ ] 3 tuiles destinations + chips "Search"
- [ ] Bloc "Unlock the Art…" + StatsRow (100K+ / 4.9 ★)
- [ ] 3 RoomCard accueil (299 / 499 / 799 $)
- [ ] Témoignage Sarah Johnson + photo
- [ ] Bandeau newsletter forêt + footer
- [ ] About · Rooms (tabs) · Gallery · Destinations · Services · Contact · Reservation · Confirmation conformes

**Fonctionnel**
- [ ] Réservation de bout en bout (dates → dispo → chambre → coordonnées → confirmation → suivi)
- [ ] Total calculé (pas le 588 $ de la maquette), prix recalculé serveur
- [ ] Contact + newsletter avec validation, honeypot, rate limit
- [ ] Filtres chambres, lightbox galerie, vidéo "Watch our story"

**Qualité**
- [ ] Limites de taille respectées (script CI vert) · zéro `any`
- [ ] Lighthouse mobile ≥ 90 (perf, a11y, SEO, best practices)
- [ ] Navigation clavier + lecteur d'écran testés
- [ ] Responsive 390 / 768 / 1440 px validé
- [ ] Tests unitaires + E2E verts · `.env.example` complet · README racine

## Ce que tu dois me fournir à l'agent
Dossier `docs/` (ces 8 fichiers), dossier `docs/maquettes/` (3 images), tes images originales dans `public/images/` selon `05`, et le contenu définitif (adresse, téléphone, e-mail, textes) à saisir dans `config/site.ts`.
