# 03 — Pages et sections

Légende : **[M]** = présent dans les maquettes (copie fidèle) · **[D]** = dérivé des tokens/composants (absent des maquettes).
Toutes les pages : `PageShell` (NavbarPill + Footer), métadonnées SEO, `Reveal` sur les sections, états `loading`/`error`/vide.

## Routes

| Route | Page | Source |
|-------|------|--------|
| `/` | Accueil | M (images 1, 2, 3) |
| `/about` | À propos | M |
| `/rooms` | Chambres & Suites | M |
| `/rooms/[slug]` | Détail chambre | D |
| `/services` | Services | M |
| `/destinations` · `/destinations/[slug]` | Destinations / détail | M / D |
| `/gallery` | Galerie | M |
| `/contact` | Contact | M |
| `/reservation` | Réservation (tunnel) | M + D |
| `/reservation/confirmation/[id]` | Confirmation | M |
| `/my-booking` | Retrouver ma réservation | D |
| `/faq` · `/legal/privacy` · `/legal/terms` | Compléments hôtel | D |
| `not-found` | 404 | D |

## `/` Accueil [M]

1. **Hero** (carte arrondie 36 px, plein écran) : image piscine tropicale ; eyebrow "Discover luxury, experience more." ; titre `display` "Book Perfect Stay For Your Vacation" ; boutons "Explore More →" (blanc) et "View Video ▶" (verre) ; à droite 2 cartes verre (Booking confirmed + Your stay) ; ScrollCue ↓ "Learn more".
2. **Destinations teaser** : 3 tuiles (Lisbon Portugal · Positano Italy · Maldives) avec chip "Search".
3. **Intro** : titre "Unlock the Art of Sophisticated Stays", "Since 2019", astérisque ✳, paragraphe, StatsRow (avatars, 100K+ happy guests, 4.9 ★, "Guest's Reviews").
4. **Suites** : eyebrow "Our Suites", h2 "Experience Luxury in Every Detail", sous-texte, bouton "View All Rooms →", 3 RoomCard (Deluxe Room $299 · Premium Suite $499 · Royal Villa $799).
5. **Témoignages** : "What Our Guests Say" / "Trusted by Travelers Worldwide", TestimonialCard (Sarah Johnson, New York, USA) + photo plage.
6. **Newsletter** : "Stay Inspired — Get the latest offers, travel tips and exclusive deals." + champ email + Subscribe.
7. **Footer**.

Les cartes du hero sont **fonctionnelles** : si un brouillon de réservation existe (store), elles affichent ses vraies données ; sinon, un exemple statique issu de la maquette (jamais de fausses dates vieillies : générer des dates futures).

## `/about` [M]
- Hero image (salon + baie vitrée), eyebrow "About Us", titre "Redefining Luxury Stays", texte, bouton "▶ Watch our story" (ouvre une `Dialog` vidéo).
- Bloc "Our Mission" : image piscine à gauche, "Exceptional Hospitality, Always", texte, bouton noir "Learn more" (→ `/services`).
- [D] sections complémentaires dans le même style : valeurs (3 cartes), chiffres clés (ligne StatsRow), équipe (cartes portrait).

## `/rooms` [M]
- Titre h1 "Our Rooms & Suites", sous-titre "Designed for comfort. Crafted for unforgettable stays."
- SegmentedTabs : All Rooms · Suites · Villas (filtre côté client via `?type=` dans l'URL).
- Grille 3 colonnes de RoomCard : image, nom, `$/night`, 👤 invités, m², bouton **Book Now** (→ `/reservation?room=slug`).
- Données : Deluxe Room 299 $ · 2 guests · 28 m² · Premium Suite 499 $ · 2 guests · 45 m² · Royal Villa 799 $ · 4 guests · 90 m².

## `/rooms/[slug]` [D]
Galerie (1 grande + 4 vignettes) · titre + prix + méta · description · équipements (icônes) · règles (check-in/out) · avis · bloc sticky "Réserver" (dates + invités + total) · chambres similaires. `generateStaticParams` + `generateMetadata`.

## `/services` [M]
- h1 "Our Services", "Premium services for an exceptional stay."
- Liste verticale (icône ronde + titre + 1 ligne) : **Concierge Service** (assistance 24/7) · **Spa & Wellness** (relax and rejuvenate) · **Fine Dining** (gourmet cuisine) · **Private Transfers** (travel in comfort).
- À droite : grande image spa (serviettes, flacons, fleur) rayon 28, bouton rond flèche.
- Bouton "Explore All Services" (secondaire). [D] pages/anchors détail par service.

## `/destinations` [M]
h1 "Our Destinations", "Explore our exclusive locations around the world." · 3 cartes hautes (Bali Indonesia · Santorini Greece · Maldives Indian Ocean) avec flèche ronde → `/destinations/[slug]` [D] (description, hôtels/chambres liés, carte, meilleures périodes, activités).

## `/gallery` [M]
- h1 "Our Gallery", "A glimpse into the SuiteSavvy experience."
- Mosaïque 3 + 3 images (mix paysages/chambres/restaurant/jardin) + bouton noir "View More →" (charge 6 de plus, "load more" accessible).
- [D] Lightbox (`Dialog`) : navigation clavier ← →, Échap, focus trap, légendes. Filtres par catégorie (Rooms, Pool, Dining, Wellness).

## `/contact` [M]
- Colonne gauche : h1 "Contact Us", "We'd love to hear from you. Get in touch with our team for any inquiries.", téléphone, e-mail, adresse, icônes sociales.
- Colonne droite : carte formulaire (Your Name, Your Email, Your Message, bouton noir "Send Message"), fond feuillage en pied de page.
- Validation zod, anti-spam (honeypot + rate limit), succès = toast + champs réinitialisés. [D] section "Emplacements" : carte (embed sans clé côté client ou image statique) + horaires.

## `/reservation` [M] — voir `04-RESERVATION.md`
Colonne gauche : image tropicale + formulaire "Your Reservations" (Check In / Check Out / Guests / **Check Availability**). Colonne droite : récapitulatif "Your Stay" (vignette, chambre, prix/nuit, Total, bouton sable **Confirm Booking**).

## `/reservation/confirmation/[id]` [M]
Fond feuillage palmes aux coins, rond mint + coche, "Your Booking is Confirmed!", "Thank you for choosing SuiteSavvy. A confirmation email has been sent to you.", bouton noir **View My Booking** (→ `/my-booking?ref=…`).

## Pages [D] de complément
- **FAQ** : accordéon accessible (check-in, annulation, enfants, animaux, paiement, parking, navettes).
- **Légal** : confidentialité, CGV/annulation — gabarit éditorial sobre (`max-width: 720px`).
- **404** : titre light, bouton "Back to home".

## Navigation
`config/nav.ts` : Home · About Us · Services · Destinations · Gallery · (Contact dans footer + page) · CTA **Booking** → `/reservation`. Lien actif = capsule sable. Rooms accessible via CTA "View All Rooms" et le footer.
