# SuiteSavvy — Dossier de conception (Next.js)

Projet : site d'hôtel de luxe avec réservation, **fidèle aux 3 maquettes fournies**, style **Apple** (clarté, déférence, profondeur).

## Ordre de lecture (pour toi et pour l'agent de code)

| # | Fichier | Rôle |
|---|---------|------|
| 01 | `01-DESIGN-SYSTEM.md` | Tokens (couleurs, typo, rayons, ombres, motion) + composants, extraits des maquettes |
| 02 | `02-ARCHITECTURE.md` | Stack, arborescence, limites de taille de fichiers, règles hooks/services/stores/types |
| 03 | `03-PAGES-ET-SECTIONS.md` | Chaque page, chaque section, contenu, composants, états |
| 04 | `04-RESERVATION.md` | Parcours de réservation, modèle de données, validation, mock/API, paiement |
| 05 | `05-ASSETS-IMAGES.md` | Inventaire des images, noms, ratios, prompts pour les images manquantes |
| 06 | `06-BONNES-PRATIQUES.md` | Qualité de code, sécurité, performance, accessibilité, SEO, tests |
| 07 | `07-PROMPT-AGENT.md` | Prompt maître + phases d'exécution + checklist de fin (rien ne tombe) |

## Les 3 maquettes de référence

- **Image 1** — planche de 9 écrans : Accueil (hero), À propos, Chambres & Suites, Galerie, Destinations, Services, Contact, Réservation, Confirmation.
- **Image 2** — page d'accueil complète en version longue (hero clair, destinations, "Unlock the Art…", suites, avis, newsletter, footer).
- **Image 3** — variante sombre du hero (référence d'ambiance, typographie géométrique fine, cartes vitrées).

> **Règle d'or : le design est gelé.** Aucune couleur, aucune image, aucun espacement, aucun arrondi ne change par rapport aux maquettes. Toute page absente des maquettes (FAQ, mentions légales, détail chambre…) est **dérivée** des mêmes tokens et composants — jamais inventée.

## Points d'attention relevés dans les maquettes

1. Total affiché `$588` pour `$299/nuit` : le calcul réel est `nuits × prix` (598 $ pour 2 nuits). Le site calcule, il ne copie pas.
2. Dates `13.07.2023`, `© 2024` : placeholders → toujours dynamiques (`new Date().getFullYear()`).
3. Les couleurs sont **échantillonnées à l'œil** depuis les images : les valider à la pipette sur l'image source avant de figer `tokens.css`.
4. Adresse/téléphone de la page Contact (Ubud, Bali) = contenu de la maquette → centralisé dans `config/site.ts`, facile à remplacer.
