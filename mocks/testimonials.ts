import type { FaqItem, Testimonial } from "@/types/hotel.types";

export const testimonialsMock: readonly Testimonial[] = [
  {
    id: "t-1",
    name: "Sarah Martin",
    location: "Lyon, France",
    quote:
      "Chaque détail était parfait : la literie King Size incroyable, le buffet de petit-déjeuner frais et généreux, et la qualité de nos salles de réunion pour notre comité de direction.",
    stayTitle: "Séjour & Séminaire · Suite Royale",
    avatarLabel: "SM",
    image: "/images/destinations/maldives.jpg",
  },
  {
    id: "t-2",
    name: "Henri Laurent",
    location: "Genève, Suisse",
    quote:
      "Rarement un hôtel parvient à combiner autant de sérénité pour dormir et une telle efficacité pour organiser des conférences de 80 personnes avec déjeuners et pauses café.",
    stayTitle: "Conférence Annuelle · Suite Exécutive",
    avatarLabel: "HL",
    image: "/images/destinations/santorini.jpg",
  },
  {
    id: "t-3",
    name: "Amélie Moreau",
    location: "Paris, France",
    quote:
      "Le petit-déjeuner servi sur la terrasse, l'attention discrète de la réception 24h/24 et le calme absolu des chambres font du King's Bed Hotel notre adresse favorite.",
    stayTitle: "Week-end Détente · Chambre Deluxe",
    avatarLabel: "AM",
    image: "/images/destinations/positano.jpg",
  },
];

export const faqMock: readonly FaqItem[] = [
  {
    id: "check-in",
    question: "Quels sont les horaires d'arrivée, de départ et du petit-déjeuner ?",
    answer:
      "Les arrivées s'effectuent à partir de 15h00 et les départs jusqu'à 12h00. Le petit-déjeuner est servi tous les jours de 06h30 à 10h30 en salle ou directement dans votre chambre.",
  },
  {
    id: "conferences",
    question: "Comment réserver une salle de réunion ou un espace de conférence ?",
    answer:
      "King's Bed Hotel dispose de salles modulables de 8 à 180 participants équipées en 4K et fibre très haut débit. Contactez notre équipe événements ou sélectionnez l'option lors de votre demande pour recevoir un devis sous 2 heures.",
  },
  {
    id: "breakfast",
    question: "Le petit-déjeuner est-il inclus dans les chambres ?",
    answer:
      "Oui, nos formules incluent un petit-déjeuner buffet artisanal (viennoiseries, œufs à la minute, fruits frais, jus pressés) ou un service en chambre sans frais cachés.",
  },
  {
    id: "cancellation",
    question: "Quelle est la politique d'annulation du King's Bed Hotel ?",
    answer:
      "Les Chambres Deluxe sont annulables gratuitement jusqu'à 48h avant l'arrivée, les Suites jusqu'à 72h avant, et les Résidences & privatisations de conférences jusqu'à 7 jours avant la date prévue.",
  },
  {
    id: "payment",
    question: "Quels moyens de paiement sont acceptés ?",
    answer:
      "Nous acceptons Apple Pay, toutes les cartes bancaires internationales ainsi que la facturation entreprise sur bon de commande pour les séminaires et conférences.",
  },
  {
    id: "parking",
    question: "Disposez-vous d'un parking privé et de bornes de recharge électrique ?",
    answer:
      "Oui, un parking souterrain sécurisé avec service voiturier et bornes de recharge rapide pour véhicules électriques est mis à la disposition de nos clients et participants aux conférences.",
  },
];
