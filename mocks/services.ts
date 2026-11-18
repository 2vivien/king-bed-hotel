import type { HotelServiceItem } from "@/types/hotel.types";

export const servicesMock: readonly HotelServiceItem[] = [
  {
    id: "dining",
    title: "Petit-Déjeuner & Restauration",
    subtitle: "Formule Bed & Breakfast artisanale servie en salle ou en chambre.",
    description:
      "Chaque matin au King's Bed Hotel, profitez d'un buffet gourmand de viennoiseries chaudes, fruits frais, œufs préparés à la minute et jus pressés, complété le soir par une cuisine de saison.",
    hours: "Petit-déjeuner 06h30 – 10h30 · Dîner 18h30 – 23h00",
    highlights: [
      "Buffet petit-déjeuner complet ou plateau servi en chambre",
      "Pauses café, viennoiseries & déjeuners d'affaires pour séminaires",
      "Carte de saison et cave sélectionnée par notre sommelier",
    ],
  },
  {
    id: "conferences",
    title: "Salles de Réunion & Conférences",
    subtitle: "Espaces modulables équipés pour séminaires, conseils et congrès.",
    description:
      "King's Bed Hotel met à disposition des salles de réunion acoustiques et un auditorium jusqu'à 180 personnes, dotés d'écrans 4K, visioconférence, fibre dédiée et restauration sur mesure.",
    hours: "Disponible de 07h00 à 22h00 · Privatisation journée ou demi-journée",
    highlights: [
      "3 salles de réunion exécutives (8 à 25 pers.) & 1 grand salon conférence (180 pers.)",
      "Équipement audiovisuel 4K, micros sans fil et Wi-Fi fibre symétrique",
      "Forfaits journée d'étude avec petit-déjeuner d'accueil et pauses gourmandes",
    ],
  },
  {
    id: "spa",
    title: "Spa & Espace Bien-Être",
    subtitle: "Détente et soins relaxants après vos journées de séjour ou de travail.",
    description:
      "Installé dans nos pavillons en pierre naturelle, notre espace bien-être associe bassin chauffé, sauna, massages aux huiles essentielles bio et soins du corps.",
    hours: "Tous les jours 08h00 – 21h00 · Soins en chambre sur demande",
    highlights: [
      "Massages signature aux pierres chaudes et huiles botaniques",
      "Sauna, hammam et bassin de relaxation chauffé",
      "Séances de remise en forme et réveil musculaire matinal",
    ],
  },
  {
    id: "transfers",
    title: "Conciergerie & Transferts Privés",
    subtitle: "Accueil personnalisé 24h/24, voiturier et navettes gare ou aéroport.",
    description:
      "Notre réception assure un accueil fluide 24h/24 pour nos voyageurs individuels et nos délégations d'entreprise, avec voiturier, bornes de recharge électrique et navettes privées.",
    hours: "Réception & conciergerie 24h/24 · Suivi des vols en temps réel",
    highlights: [
      "Accueil personnalisé en gare ou à l'aéroport avec chauffeur",
      "Parking privé sécurisé avec service voiturier et bornes électriques",
      "Gestion complète des groupes, séminaires et check-in prioritaire",
    ],
  },
];
