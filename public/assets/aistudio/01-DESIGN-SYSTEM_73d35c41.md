# 01 — Design System SuiteSavvy

Extrait des 3 maquettes. **Gelé** : ne pas modifier sans validation. Philosophie Apple : *Clarity* (le contenu d'abord), *Deference* (l'interface s'efface), *Depth* (couches : verre, ombres douces, mouvement).

## 1. Principes de style (ce qui rend le rendu "Apple")

- Titres **légers (300)**, très grands, interlettrage serré (`-0.03em`), interligne ~1.05.
- Beaucoup de **blanc** : sections espacées (96–120 px desktop), aucun élément décoratif superflu.
- **Coins continus** (squircle) : grands arrondis sur hero/cartes, **capsules** (pill) pour boutons, nav, champs.
- **Verre dépoli** (vibrancy) pour la nav et les cartes flottantes du hero.
- **Ombres très douces**, jamais dures ; bordures 1 px à 6 % d'opacité.
- Mouvement **court et naturel** (ressort / `cubic-bezier(0.22,1,0.36,1)`), jamais gratuit ; `prefers-reduced-motion` respecté.
- Cibles tactiles **≥ 44 px**. Contraste AA minimum. Mode clair uniquement (comme les maquettes) ; variante hero sombre = image 3.

## 2. Couleurs (tokens)

| Token | Valeur | Usage (vu dans les maquettes) |
|-------|--------|-------------------------------|
| `--bg` | `#FAF9F6` | Fond de page (blanc cassé chaud) |
| `--surface` | `#FFFFFF` | Cartes, nav, formulaires |
| `--surface-muted` | `#F4F1EA` | Champs, zones secondaires |
| `--sand` | `#EFE6D6` | Lien actif de la nav, bouton "Confirm Booking" |
| `--ink` | `#111111` | Texte principal, boutons pleins ("Booking", "Book Now") |
| `--ink-2` | `#5F5F5A` | Texte secondaire, sous-titres |
| `--ink-3` | `#9A9A93` | Placeholders, légendes |
| `--line` | `rgba(17,17,17,0.08)` | Bordures, séparateurs |
| `--forest` | `#1F3A2C` | Bandeau newsletter (feuillage sombre) |
| `--mint` | `#D8EBDD` | Pastille de confirmation (coche) |
| `--glass` | `rgba(255,255,255,0.72)` | Cartes flottantes du hero (+ blur) |
| `--on-image` | `#FFFFFF` | Texte posé sur photo |
| `--star` | `#111111` | Étoile de note (pleine, noire) |

Dégradé de lisibilité sur photo : `linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,0) 55%)` (titres blancs sur cartes chambres/destinations).

## 3. Typographie

- Police : **Inter** (variable, via `next/font`), la plus proche de SF Pro hors plateformes Apple. Pile : `Inter, -apple-system, "SF Pro Display", system-ui, sans-serif`.
- Une seule famille. La hiérarchie vient de la taille et du poids.

| Style | Taille (desktop / mobile) | Poids | Interligne | Tracking |
|-------|---------------------------|-------|-----------|----------|
| `display` (hero) | 72 / 44 px | 300 | 1.02 | -0.035em |
| `h1` (titres de page) | 56 / 38 | 300 | 1.05 | -0.03em |
| `h2` (sections) | 44 / 32 | 300 | 1.1 | -0.025em |
| `h3` (cartes) | 24 / 20 | 400 | 1.2 | -0.015em |
| `body-lg` | 18 | 400 | 1.55 | -0.01em |
| `body` | 16 | 400 | 1.55 | 0 |
| `small` (labels, méta) | 14 | 400/500 | 1.4 | 0 |
| `caption` / eyebrow | 12–13 | 400 | 1.35 | 0.01em |
| `button` | 14–15 | 500 | 1 | 0 |

Utiliser `clamp()` pour le fluide (ex. `clamp(2.75rem, 6vw, 4.5rem)` pour `display`). Pas de `text-transform: uppercase` (absent des maquettes).

## 4. Espacement, grille, rayons, ombres

- Grille 8 pt : `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 120`.
- Conteneur : `max-width: 1280px`, marges latérales `24px` (mobile) / `40px` (desktop). Hero et nav : pleine largeur avec marge de 16–24 px (effet "carte" arrondie).
- Rayons : `--r-sm 12` · `--r-md 20` (cartes chambres/destinations) · `--r-lg 28` (cartes verre) · `--r-xl 36` (hero, bandeau newsletter) · `--r-full 9999` (boutons, nav, champs, chips).
- Règle de concentricité : `rayon intérieur = rayon extérieur − padding`.
- Ombres : `--shadow-1: 0 1px 2px rgba(0,0,0,.04)` · `--shadow-2: 0 8px 30px rgba(0,0,0,.08)` · `--shadow-glass: 0 20px 60px rgba(0,0,0,.18)`.

## 5. Motion

- Durées : micro `150ms` · standard `300ms` · entrée de section `600ms`.
- Courbe : `cubic-bezier(0.22, 1, 0.36, 1)` ; ressort Framer : `{ type: "spring", stiffness: 260, damping: 30 }`.
- Apparition au scroll : fondu + translation Y 16 px, une seule fois, décalage de 60 ms entre enfants.
- Hover carte : image `scale(1.03)` en 500 ms ; bouton flèche : translation X 2 px.
- Hero : léger parallaxe de l'image (≤ 8 %). Désactivé si `prefers-reduced-motion`.

## 6. Composants (spécification fidèle aux maquettes)

**NavbarPill** — capsule blanche flottante (verre léger), hauteur 56–64 px, marge haute 16 px. Gauche : logo (cercle double + texte "SuiteSavvy", 600). Centre : Home · About Us · Services · Destinations · Gallery (lien actif = capsule `--sand`). Droite : icône réglages, icône recherche, avatar rond, bouton noir capsule **Booking**. Mobile : logo + bouton Booking + burger → feuille plein écran.

**Button** — variantes : `primary` (fond ink, texte blanc, capsule), `secondary` (blanc, bordure `--line`), `ghost-on-image` (blanc translucide + blur), `sand` (fond `--sand`, texte ink), `icon-circle` (44 px, rond, flèche ↗/→). Tous : hauteur 44–48, `active: scale(0.98)`, focus ring 2 px ink décalé de 2.

**HeroCard (verre)** — `--glass` + `backdrop-filter: blur(24px) saturate(180%)`, rayon 28, padding 20, `--shadow-glass`. Deux cartes empilées à droite du hero : *Booking is confirmed!* (vignette chambre, lignes Check In / Check Out / Guests, "Add to Calendar" + 3 boutons : Apple, Google, calendrier) et *Your stay* (vignette, destination, "Get Directions", capsule noire "Apple Pay | Confirmed", boutons "Booking details" / "Confirmation").

**ScrollCue** — bouton rond blanc (56 px) avec flèche ↓ à cheval sur le bas du hero + libellé "Learn more".

**DestinationTile** — image 3:2 (rayon 20), libellé blanc en bas à gauche, chip "Search" en haut à droite (accueil) ou flèche ronde (page Destinations avec sous-titre pays).

**RoomCard** — image 4:5 plein cadre ; nom (h3 blanc) + `$299 / night` en bas, bouton rond flèche à droite (accueil). Version page Chambres : carte blanche, image en haut, nom, prix, méta (👤 invités · ▢ m²), bouton pleine largeur **Book Now**.

**SegmentedTabs** — capsule noire pour l'onglet actif, fond blanc : All Rooms · Suites · Villas.

**TestimonialCard** — carte blanche rayon 28 : guillemet ❝, citation, avatar + nom + ville, flèches ← →, à côté d'une photo plage rayon 28.

**StatsRow** — pile d'avatars (5, chevauchés) + "100K+ happy guests" + note `4.9 ★` + capsule "Guest's Reviews".

**NewsletterBanner** — fond `--forest` + texture feuillage (image en overlay 15 %), rayon 36, titre blanc "Stay Inspired", champ capsule blanche + bouton noir **Subscribe** intégré à droite.

**Footer** — logo, liens (Home, About Us, Services, Destinations, Gallery, Contact), icônes sociales (Instagram, X, YouTube, LinkedIn), © année dynamique.

**Champs de formulaire** — capsule ou rayon 16, fond `--surface-muted`, sans bordure ; focus : fond blanc + anneau 2 px ink ; erreur : texte 13 px sous le champ + `aria-invalid`.

**ConfirmationBadge** — rond `--mint` 72 px, coche noire fine.

## 7. Icônes

Tabler Icons (trait 1.5 px, style fin comme les maquettes). Tailles : 16 (inline), 20 (boutons), 24 (cartes). Toujours `aria-hidden` sauf bouton sans texte (alors `aria-label`).

## 8. Tailwind v4 — bloc de tokens prêt à coller (`src/styles/tokens.css`)

```css
@theme {
  --color-bg: #FAF9F6;
  --color-surface: #FFFFFF;
  --color-surface-muted: #F4F1EA;
  --color-sand: #EFE6D6;
  --color-ink: #111111;
  --color-ink-2: #5F5F5A;
  --color-ink-3: #9A9A93;
  --color-forest: #1F3A2C;
  --color-mint: #D8EBDD;
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 28px;
  --radius-xl: 36px;
  --shadow-1: 0 1px 2px rgba(0,0,0,.04);
  --shadow-2: 0 8px 30px rgba(0,0,0,.08);
  --shadow-glass: 0 20px 60px rgba(0,0,0,.18);
  --ease-apple: cubic-bezier(0.22, 1, 0.36, 1);
  --font-sans: var(--font-inter), -apple-system, "SF Pro Display", system-ui, sans-serif;
}
```
