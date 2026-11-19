# AGENTS.md — Règles du dépôt King's Bed Hotel

## Règle non négociable : micro-commits + push immédiats

- **Chaque petite tâche = un commit + un push, immédiatement.** Même le plus petit changement (un bouton, une icône, une ligne de texte).
- **On n'enchaîne pas sur une autre tâche avant d'avoir commité et poussé la précédente.** Si une tâche est grande, on la découpe en plusieurs micro-commits.
- **Jamais de travail accumulé non commité.** La session ne garde rien en suspens : dès qu'un changement est fait et vérifié, il est commité et poussé.
- **Message de commit court et factuel**, style Conventional Commits, **en français**.
- Vérifier avant de commiter (`tsc --noEmit`, `eslint`), jamais un « je commite et je corrige après ».
- Ne rien commiter ni pousser sans avoir **terminé** le changement demandé.
- Ne pas amasser plusieurs minutes de travail sans aucun commit.

Cette règle prévaut sur tout style de travail précédent et vaut pour tout projet de l'entreprise.
