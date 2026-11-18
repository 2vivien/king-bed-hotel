"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  AuthUser,
  ManagedBooking,
  ManagedBookingStatus,
  UserRole,
} from "../types/auth.types";

export const DEMO_USERS: Record<UserRole, AuthUser> = {
  user: {
    id: "usr-client-01",
    name: "Claire Martin",
    email: "client@kingsbedhotel.com",
    role: "user",
    title: "Compte Client Google",
    initials: "CM",
    phone: "+33 6 48 12 90 34",
    memberNumber: "KB-PRIV-4088",
  },
  admin: {
    id: "usr-admin-01",
    name: "Sophie Castiglione",
    email: "agueoundev@gmail.com",
    role: "admin",
    title: "Compte Admin Google",
    initials: "SC",
    phone: "+33 1 42 68 90 00",
    memberNumber: "KB-ADMIN-01",
  },
};

export const DEMO_CREDENTIALS: Record<UserRole, { email: string; password: string }> = {
  user: {
    email: "client@kingsbedhotel.com",
    password: "client123",
  },
  admin: {
    email: "admin@kingsbedhotel.com",
    password: "admin123",
  },
};

const INITIAL_MANAGED_BOOKINGS: ManagedBooking[] = [
  {
    id: "kb-8924",
    ref: "#KB-8924",
    guestName: "Claire Martin",
    guestInitials: "CM",
    guestEmail: "client@kingsbedhotel.com",
    guestPhone: "+33 6 48 12 90 34",
    guestTier: "Membre Privilège",
    historyLabel: "4 séjours précédents • Profil vérifié",
    status: "confirmed",
    statusLabel: "Confirmé • Chambre & Breakfast",
    roomTitle: "Suite Panoramique King Size & Terrasse",
    locationLabel: "King's Bed Hotel • 4e Étage Aile Jardin",
    dateRange: "14 — 19 Oct. 2025",
    durationLabel: "5 nuits",
    guestsLabel: "2 Adultes",
    breakfastOrHallLabel: "Petit-Déjeuner Verrière Inclus",
    serviceIncluded: "Réception & Voiturier 24h",
    butlerName: "Julian Vance",
    amountEur: 2490,
    image: "/images/rooms/oceanfront-sanctuary.jpg",
    perkTitle: "Petit-déjeuner artisanal & accueil tardif préparés",
    perkSubtitle:
      "Table réservée sous la verrière à 08h30 et sélection de viennoiseries tièdes + sans gluten.",
    perkBadge: "Formule Confirmée",
    deadlineHint: "Protocole d'arrivée activé",
    internalNote:
      "Préfère un oreiller ferme hypoallergénique et une carafe d'eau filtrée en chambre à l'arrivée.",
    requests: [
      {
        icon: "utensils",
        title: "Petit-Déjeuner Sans Gluten en Verrière",
        desc: "Service prévu chaque matin entre 08h00 et 09h30.",
      },
      {
        icon: "car",
        title: "Transfert Gare de Lyon → Hôtel",
        desc: "Berline électrique réservée le jour d'arrivée à 14h20.",
      },
      {
        icon: "bed",
        title: "Préférences de Literie King Size",
        desc: "Oreillers fermes en duvet hypoallergénique.",
      },
    ],
  },
  {
    id: "kb-9931",
    ref: "#KB-9931",
    guestName: "Claire Martin",
    guestInitials: "CM",
    guestEmail: "client@kingsbedhotel.com",
    guestPhone: "+33 6 48 12 90 34",
    guestTier: "Membre Privilège",
    historyLabel: "Entreprise Conseil • Salle + Chambres",
    status: "pending",
    statusLabel: "En attente de validation",
    roomTitle: "Salon Conférence Haussmann + 4 Chambres Deluxe",
    locationLabel: "King's Bed Hotel • Centre de Conférences",
    dateRange: "24 — 26 Nov. 2025",
    durationLabel: "2 jours d'étude",
    guestsLabel: "18 Participants",
    breakfastOrHallLabel: "Journée d'Étude + Pauses Café",
    serviceIncluded: "Régie 4K & Visio",
    butlerName: "Camille Laurent",
    amountEur: 4850,
    image: "/images/about/about-lounge.jpg",
    perkTitle: "Configuration en U & pauses gourmandes prévues",
    perkSubtitle:
      "Écran 4K interactif, fibre symétrique dédiée, accueil petit-déjeuner et déjeuner d'affaires.",
    perkBadge: "Validation sous 2h",
    deadlineHint: "Décision attendue sous 2h",
    internalNote:
      "Vérifier la disponibilité des 4 chambres communicantes au 2e étage pour les intervenants.",
    requests: [
      {
        icon: "presentation",
        title: "Disposition en U pour 18 Personnes",
        desc: "Tableau numérique 4K, 4 micros sans fil et multiprises intégrées.",
      },
      {
        icon: "utensils",
        title: "Accueil Petit-Déjeuner & Pauses Matin/Après-Midi",
        desc: "Viennoiseries artisanales, jus pressés et café de spécialité.",
      },
    ],
  },
  {
    id: "kb-9104",
    ref: "#KB-9104",
    guestName: "Jean-Marc de la Tour",
    guestInitials: "JT",
    guestEmail: "jmdelatour@patrimoine-conseil.fr",
    guestPhone: "+33 6 88 44 21 00",
    guestTier: "Compte Entreprise",
    historyLabel: "Comité de Direction • Journée d'Étude",
    status: "pending",
    statusLabel: "En attente d'approbation",
    roomTitle: "Salle Royale Vendôme & 6 Suites Exécutives",
    locationLabel: "King's Bed Hotel • 1er Étage Conférences",
    dateRange: "02 — 04 Déc. 2025",
    durationLabel: "3 jours / 2 nuits",
    guestsLabel: "24 Convives",
    breakfastOrHallLabel: "Buffet Matin + Déjeuner Privé",
    serviceIncluded: "Coordinateur Dédié",
    butlerName: "Julian Vance",
    amountEur: 6900,
    image: "/images/rooms/royal-villa.jpg",
    perkTitle: "Séminaire exécutif avec dîner privé",
    perkSubtitle:
      "Privatisation du salon Vendôme avec connexion fibre sécurisée et transfert VIP.",
    perkBadge: "En Attente",
    deadlineHint: "Reçu il y a 38 min",
    internalNote:
      "Client fidèle. Prévoir menu végétarien pour deux participants et accès parking privé.",
    requests: [
      {
        icon: "presentation",
        title: "Système Visioconférence Polycom",
        desc: "Test technique demandé la veille à 17h00.",
      },
      {
        icon: "car",
        title: "Navettes Aéroport CDG",
        desc: "Deux arrivées prévues à 09h15 et 10h30.",
      },
    ],
  },
  {
    id: "kb-8502",
    ref: "#KB-8502",
    guestName: "Lord & Lady Sterling",
    guestInitials: "LS",
    guestEmail: "sterling.household@chambers.co.uk",
    guestPhone: "+44 20 7946 0991",
    guestTier: "Hôtes d'Honneur",
    historyLabel: "Protocole d'arrivée VIP activé",
    status: "confirmed",
    statusLabel: "Confirmé • Suite & Spa",
    roomTitle: "Suite Royale Jardin & Bassin Privé",
    locationLabel: "King's Bed Hotel • Rez-de-Jardin",
    dateRange: "24 — 30 Nov. 2025",
    durationLabel: "6 nuits",
    guestsLabel: "2 Adultes",
    breakfastOrHallLabel: "Petit-Déjeuner en Suite",
    serviceIncluded: "Majordome Julian V.",
    butlerName: "Julian Vance",
    amountEur: 5400,
    image: "/images/rooms/penthouse-retreat.jpg",
    perkTitle: "Bouquet d'orchidées blanches & thé à 16h30",
    perkSubtitle: "Service quotidien en suite et accès privé au bassin chauffé le matin.",
    perkBadge: "Confirmé",
    deadlineHint: "Ligne directe #104 active",
    internalNote:
      "Séjour anniversaire de mariage. Bouquet d'orchidées renouvelé tous les deux jours.",
    requests: [
      {
        icon: "utensils",
        title: "Thé Earl Grey & Pâtisseries à 16h30",
        desc: "Servi sur la terrasse privée de la suite.",
      },
      {
        icon: "sparkles",
        title: "Accès Privé Espace Spa",
        desc: "Créneau réservé de 07h30 à 08h30 chaque matin.",
      },
    ],
  },
  {
    id: "kb-7102",
    ref: "#KB-7102",
    guestName: "Claire Martin",
    guestInitials: "CM",
    guestEmail: "client@kingsbedhotel.com",
    guestPhone: "+33 6 48 12 90 34",
    guestTier: "Membre Privilège",
    historyLabel: "Séjour archivé • Facture réglée",
    status: "history",
    statusLabel: "Séjour Terminé • Facture Disponible",
    roomTitle: "Chambre Deluxe King & Petit-Déjeuner",
    locationLabel: "King's Bed Hotel • 3e Étage",
    dateRange: "12 — 15 Janv. 2025",
    durationLabel: "3 nuits",
    guestsLabel: "2 Adultes",
    breakfastOrHallLabel: "Petit-Déjeuner Buffet Inclus",
    serviceIncluded: "Départ Tardif 14h",
    butlerName: "Elena Moretti",
    amountEur: 980,
    image: "/images/rooms/deluxe-room.jpg",
    perkTitle: "Séjour accompli avec satisfaction 5/5",
    perkSubtitle: "Reçu fiscal et facture détaillée disponibles au téléchargement.",
    perkBadge: "Archivé",
    deadlineHint: "Facture #FAC-9824 émise",
    internalNote: "Excellents retours sur le buffet du petit-déjeuner et le calme de la chambre.",
    requests: [
      {
        icon: "bed",
        title: "Chambre Calme Côté Jardin",
        desc: "Demande honorée au 3e étage.",
      },
    ],
  },
  {
    id: "kb-7419",
    ref: "#KB-7419",
    guestName: "Marcus Thorne",
    guestInitials: "MT",
    guestEmail: "marcus@thornecap.com",
    guestPhone: "+1 (415) 555-0199",
    guestTier: "Agence Affaires",
    historyLabel: "Demande de privatisation complète",
    status: "declined",
    statusLabel: "Refusée (Capacité atteinte) • Remboursé",
    roomTitle: "Grand Auditorium Conférences (140 pers.)",
    locationLabel: "King's Bed Hotel • Centre de Conférences",
    dateRange: "10 — 12 Déc. 2025",
    durationLabel: "3 jours",
    guestsLabel: "140 Participants",
    breakfastOrHallLabel: "Restauration Complète",
    serviceIncluded: "Remboursement Exécuté",
    butlerName: "Sophie Castiglione",
    amountEur: 4200,
    image: "/images/rooms/stone-spa-bath.jpg",
    perkTitle: "Proposition d'alternative envoyée",
    perkSubtitle: "Fonds restitués sous 24h • Dates alternatives proposées du 16 au 18 Déc.",
    perkBadge: "Remboursé",
    deadlineHint: "Clôturé",
    internalNote:
      "Capacité déjà réservée sur ce créneau. Alternative proposée sur la semaine suivante.",
    requests: [
      {
        icon: "ban",
        title: "Capacité Maximale Déjà Réservée",
        desc: "Dates alternatives transmises par courriel.",
      },
    ],
  },
];

export interface UserPreferences {
  bedding: string;
  dietary: string;
  transfer: string;
}

interface AuthState {
  currentUser: AuthUser | null;
  authModalOpen: boolean;
  authModalPreferredRole: UserRole | null;
  managedBookings: ManagedBooking[];
  userPreferences: UserPreferences;
  openAuthModal: (preferredRole?: UserRole | null) => void;
  closeAuthModal: () => void;
  loginWithCredentials: (
    email: string,
    password: string
  ) => { ok: true; user: AuthUser } | { ok: false; error: string };
  loginQuickRole: (role: UserRole) => AuthUser;
  registerClient: (input: {
    name: string;
    email: string;
    password: string;
  }) => { ok: true; user: AuthUser } | { ok: false; error: string };
  logout: () => void;
  updateBookingStatus: (
    bookingId: string,
    status: ManagedBookingStatus,
    notePatch?: string
  ) => void;
  updateBookingNote: (bookingId: string, note: string) => void;
  assignBookingButler: (bookingId: string, butlerName: string) => void;
  updateUserPreferences: (patch: Partial<UserPreferences>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      authModalOpen: false,
      authModalPreferredRole: null,
      managedBookings: INITIAL_MANAGED_BOOKINGS,
      userPreferences: {
        bedding: "Matelas King Size, oreillers fermes en soie hypoallergénique",
        dietary: "Petit-déjeuner sans gluten, jus d'agrumes frais et espresso",
        transfer: "Berline 100 % électrique gare/aéroport & place de parking dédiée",
      },

      openAuthModal: (preferredRole = null) =>
        set({ authModalOpen: true, authModalPreferredRole: preferredRole }),

      closeAuthModal: () => set({ authModalOpen: false, authModalPreferredRole: null }),

      loginWithCredentials: (email, password) => {
        const normalized = email.trim().toLowerCase();
        if (
          normalized === DEMO_CREDENTIALS.admin.email &&
          password === DEMO_CREDENTIALS.admin.password
        ) {
          const user = DEMO_USERS.admin;
          set({ currentUser: user, authModalOpen: false, authModalPreferredRole: null });
          return { ok: true, user };
        }
        if (
          normalized === DEMO_CREDENTIALS.user.email &&
          password === DEMO_CREDENTIALS.user.password
        ) {
          const user = DEMO_USERS.user;
          set({ currentUser: user, authModalOpen: false, authModalPreferredRole: null });
          return { ok: true, user };
        }
        if (normalized.includes("@") && password.trim().length >= 4) {
          const namePart = normalized.split("@")[0].replace(/[._-]+/g, " ");
          const displayName = namePart
            .split(" ")
            .filter(Boolean)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
          const initials = displayName
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          const customUser: AuthUser = {
            id: `usr-${Date.now()}`,
            name: displayName || "Client King's Bed",
            email: normalized,
            role: "user",
            title: "Compte Client",
            initials: initials || "CK",
            phone: "+33 6 00 00 00 00",
            memberNumber: "KB-MEM-2025",
          };
          set({
            currentUser: customUser,
            authModalOpen: false,
            authModalPreferredRole: null,
          });
          return { ok: true, user: customUser };
        }
        return {
          ok: false,
          error:
            "Identifiants invalides. Utilisez les accès Client / Admin proposés ou un e-mail valide (4+ caractères).",
        };
      },

      loginQuickRole: (role) => {
        const user = DEMO_USERS[role];
        set({ currentUser: user, authModalOpen: false, authModalPreferredRole: null });
        return user;
      },

      registerClient: ({ name, email, password }) => {
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        if (cleanName.length < 2) {
          return { ok: false, error: "Veuillez saisir votre nom complet." };
        }
        if (!cleanEmail.includes("@")) {
          return { ok: false, error: "Veuillez saisir une adresse e-mail valide." };
        }
        if (password.trim().length < 4) {
          return {
            ok: false,
            error: "Le mot de passe doit contenir au moins 4 caractères.",
          };
        }
        const initials = cleanName
          .split(" ")
          .filter(Boolean)
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        const user: AuthUser = {
          id: `usr-${Date.now()}`,
          name: cleanName,
          email: cleanEmail,
          role: "user",
          title: "Compte Client",
          initials: initials || "CL",
          phone: "+33 6 12 34 56 78",
          memberNumber: `KB-${Math.floor(1000 + Math.random() * 8999)}`,
        };
        set({ currentUser: user, authModalOpen: false, authModalPreferredRole: null });
        return { ok: true, user };
      },

      logout: () => set({ currentUser: null }),

      updateBookingStatus: (bookingId, status, notePatch) => {
        const labelMap: Record<ManagedBookingStatus, string> = {
          confirmed: "Confirmé • Validé par la Direction",
          pending: "En attente de validation",
          history: "Archivé / Terminé",
          declined: "Refusée • Remboursé",
        };
        const badgeMap: Record<ManagedBookingStatus, string> = {
          confirmed: "Confirmé",
          pending: "En Attente",
          history: "Archivé",
          declined: "Refusé",
        };
        set({
          managedBookings: get().managedBookings.map((b) =>
            b.id === bookingId
              ? {
                  ...b,
                  status,
                  statusLabel: labelMap[status],
                  perkBadge: badgeMap[status],
                  internalNote: notePatch ? notePatch : b.internalNote,
                }
              : b
          ),
        });
      },

      updateBookingNote: (bookingId, note) =>
        set({
          managedBookings: get().managedBookings.map((b) =>
            b.id === bookingId ? { ...b, internalNote: note } : b
          ),
        }),

      assignBookingButler: (bookingId, butlerName) =>
        set({
          managedBookings: get().managedBookings.map((b) =>
            b.id === bookingId ? { ...b, butlerName } : b
          ),
        }),

      updateUserPreferences: (patch) =>
        set({
          userPreferences: {
            ...get().userPreferences,
            ...patch,
          },
        }),
    }),
    {
      name: "kingsbed-auth-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        managedBookings: state.managedBookings,
        userPreferences: state.userPreferences,
      }),
    }
  )
);
