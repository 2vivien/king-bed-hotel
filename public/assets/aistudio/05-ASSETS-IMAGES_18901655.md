# 05 — Assets et images

**Principe : les images fournies restent telles quelles** (contenu, cadrage, couleurs). Aucune retouche de teinte. On ne change que le format (WebP/AVIF) et la taille.

## 1. Règles techniques

- Stockage : `public/images/<catégorie>/<nom-kebab>.webp`. Rendu via `next/image` uniquement (`sizes` obligatoire, `alt` obligatoire et descriptif).
- Poids cible : hero ≤ 250 Ko · cartes ≤ 120 Ko · vignettes ≤ 40 Ko. Largeurs sources : hero 2400 px · cartes 1200 px · vignettes 600 px.
- `priority` uniquement sur l'image du hero (LCP). Le reste : `loading="lazy"` + `placeholder="blur"` (blurDataURL généré au build).
- Ratios fixes pour éviter le décalage de mise en page (CLS) : hero 16:9 (mobile 4:5) · chambre 4:5 · destination 3:2 (page Destinations : 3:4) · galerie variable (grille définie) · avatar 1:1.
- Légendes/crédits : stocker dans `mocks/` (`alt`, `caption`).

## 2. Inventaire (d'après les maquettes)

| Fichier cible | Usage | Ratio | Source |
|---------------|-------|-------|--------|
| `hero/hero-pool.webp` | Hero accueil (piscine tropicale, villa) | 16:9 | Maquette 1/2 |
| `hero/hero-dark-stairs.webp` | Variante sombre (marches vertes) | 16:9 | Maquette 3 (optionnel) |
| `rooms/deluxe-room.webp` | Deluxe Room | 4:5 | Maquette |
| `rooms/premium-suite.webp` | Premium Suite | 4:5 | Maquette |
| `rooms/royal-villa.webp` | Royal Villa (villa + piscine) | 4:5 | Maquette |
| `destinations/lisbon.webp` | Lisbonne (tram jaune) | 3:2 | Maquette 2 |
| `destinations/positano.webp` | Positano | 3:2 | Maquette 2 |
| `destinations/maldives.webp` | Maldives (bungalows sur l'eau) | 3:2 | Maquette 1/2 |
| `destinations/bali.webp` | Bali (temple) | 3:2 | Maquette 1 |
| `destinations/santorini.webp` | Santorin (dômes bleus) | 3:2 | Maquette 1 |
| `about/about-hero-lounge.webp` | À propos (salon, baie vitrée) | 16:9 | Maquette 1 |
| `about/mission-pool.webp` | Bloc Mission | 4:3 | Maquette 1 |
| `services/spa-towels.webp` | Services (spa) | 4:5 | Maquette 1 |
| `gallery/g-01…g-12.webp` | Mosaïque galerie (villa, chambre, palmiers, restaurant, jardin) | variable | Maquette 1 + lot fourni |
| `testimonials/beach.webp` | Photo à côté de l'avis | 4:3 | Maquette 2 |
| `testimonials/avatar-01…05.webp` | Avatars (Sarah Johnson, etc.) | 1:1 | Maquette 2 |
| `textures/leaf-dark.webp` | Texture feuillage du bandeau newsletter | 4:1 | Maquette 2 |
| `textures/palm-corner-left/right.webp` | Palmes de la page Confirmation/Contact | libre (PNG/WebP transparent) | Maquettes 1 |
| `brand/logo.svg` · `logo-mark.svg` | Logo (double cercle) | — | À vectoriser depuis la maquette |

> Les maquettes sont des captures : les images y sont recadrées/compressées. Utiliser les **originaux** que tu possèdes ; si seule la capture existe, la recadrer proprement (sans toucher couleurs) et remplacer dès que possible.

## 3. Images manquantes à produire (pages ajoutées)

Pour garder la cohérence : lumière naturelle chaude, tons sable/vert profond, végétation tropicale, architecture contemporaine, **aucun texte, aucun logo, aucune personne reconnaissable**.

Prompt de base (à adapter par image) :
> *"Luxury tropical boutique hotel, [sujet], warm natural daylight, soft shadows, muted sand and deep green palette, editorial architectural photography, shot on 35mm, shallow depth of field, no text, no people, 4:5"*

Sujets à couvrir : salle de bain marbre/pierre · terrasse petit-déjeuner · restaurant (table dressée, soir) · spa (soin, pierres chaudes) · transfert privé (voiture sombre à l'entrée) · réception/lobby · plage privée au coucher du soleil · détail literie · équipe (portraits sobres, fond neutre) pour À propos · vues supplémentaires par chambre (4 par chambre pour `/rooms/[slug]`).

## 4. Optimisation et livraison

Script `scripts/optimize-images.mjs` (sharp) : génère WebP + AVIF aux tailles ci-dessus, calcule `blurDataURL`, échoue le build si un fichier dépasse le budget de poids. `next.config.ts` : `images.formats = ["image/avif","image/webp"]`.
