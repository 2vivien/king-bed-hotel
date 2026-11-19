"use client";

import {
  AlertCircle,
  ArrowRight,
  Ban,
  BedDouble,
  Calendar,
  Car,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  ConciergeBell,
  Download,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Menu,
  Phone,
  Presentation,
  Printer,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Utensils,
  Wallet,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type {
  ManagedBooking,
  ManagedBookingRequest,
} from "@/features/auth/types/auth.types";
import { useBookingStore } from "@/features/booking/store/booking.store";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/utils/format-money";

type AdminSidebarSection =
  | "overview"
  | "reservations"
  | "rooms-breakfast"
  | "conference-halls"
  | "team";

type AdminFilter = "all" | "pending" | "confirmed" | "declined";

const STAFF_BUTLERS = [
  "Julian Vance",
  "Camille Laurent",
  "Elena Moretti",
  "Sophie Castiglione",
];

function downloadTextFile(
  filename: string,
  content: string,
  mime = "text/plain;charset=utf-8"
) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function RequestIcon({ icon }: { icon: ManagedBookingRequest["icon"] }) {
  switch (icon) {
    case "utensils":
      return <Utensils className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />;
    case "presentation":
      return (
        <Presentation className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
      );
    case "car":
      return <Car className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />;
    case "bed":
      return <BedDouble className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />;
    case "ban":
      return <Ban className="w-4 h-4 text-[#5F5F5A] shrink-0 mt-0.5" />;
    default:
      return <Sparkles className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />;
  }
}

export function AdminDashboardView() {
  const router = useRouter();
  const mounted = useIsMounted();
  const [section, setSection] = useState<AdminSidebarSection>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<AdminFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>("kb-9931");
  const [confirmTarget, setConfirmTarget] = useState<ManagedBooking | null>(
    null
  );
  const [declineTarget, setDeclineTarget] = useState<ManagedBooking | null>(
    null
  );
  const [declineReason, setDeclineReason] = useState(
    "Dates complètes • Proposer une suite ou salle équivalente"
  );
  const [declineMessage, setDeclineMessage] = useState("");
  const [toast, setToast] = useState<{ title: string; subtitle: string } | null>(
    null
  );

  const currentUser = useAuthStore((s) => s.currentUser);
  const managedBookings = useAuthStore((s) => s.managedBookings);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);
  const loginQuickRole = useAuthStore((s) => s.loginQuickRole);
  const logout = useAuthStore((s) => s.logout);
  const updateBookingStatus = useAuthStore((s) => s.updateBookingStatus);
  const updateBookingNote = useAuthStore((s) => s.updateBookingNote);
  const assignBookingButler = useAuthStore((s) => s.assignBookingButler);

  const confirmedSessionBookings = useBookingStore((s) => s.confirmedBookings);

  const showToast = (title: string, subtitle: string) => {
    setToast({ title, subtitle });
    window.setTimeout(() => {
      setToast((current) => (current?.title === title ? null : current));
    }, 3600);
  };

  const allBookings = useMemo(() => {
    const sessionConverted: ManagedBooking[] = Object.values(
      confirmedSessionBookings
    ).map((b) => ({
      id: b.id,
      ref: `#${b.id}`,
      guestName: `${b.guest.firstName} ${b.guest.lastName}`,
      guestInitials:
        `${b.guest.firstName[0] ?? "C"}${b.guest.lastName[0] ?? "L"}`.toUpperCase(),
      guestEmail: b.guest.email,
      guestPhone: b.guest.phone,
      guestTier: "Réservation Directe Web",
      historyLabel: "Nouvelle demande web",
      status: b.status === "cancelled" ? "declined" : "pending",
      statusLabel:
        b.status === "cancelled" ? "Annulée" : "En attente de validation",
      roomTitle: b.roomName,
      locationLabel: "King's Bed Hotel",
      dateRange: `${b.checkIn} — ${b.checkOut}`,
      durationLabel: `${b.nights} nuit(s)`,
      guestsLabel: `${b.guests} personne(s)`,
      breakfastOrHallLabel: "Formule Petit-Déjeuner",
      serviceIncluded: "Réception 24h/24",
      butlerName: "Julian Vance",
      amount: b.total,
      image: b.image || "/images/rooms/oceanfront-sanctuary.jpg",
      perkTitle: "Réservation en ligne enregistrée",
      perkSubtitle: b.guest.notes || "Aucune note additionnelle.",
      perkBadge: "Nouveau",
      deadlineHint: "Reçu à l'instant",
      internalNote: b.guest.notes || "",
      requests: [],
    }));

    const existingIds = new Set(managedBookings.map((m) => m.id));
    return [
      ...sessionConverted.filter((s) => !existingIds.has(s.id)),
      ...managedBookings,
    ];
  }, [managedBookings, confirmedSessionBookings]);

  const counts = useMemo(() => {
    return {
      all: allBookings.length,
      pending: allBookings.filter((b) => b.status === "pending").length,
      confirmed: allBookings.filter((b) => b.status === "confirmed").length,
      declined: allBookings.filter(
        (b) => b.status === "declined" || b.status === "history"
      ).length,
      volume: allBookings
        .filter((b) => b.status !== "declined")
        .reduce((acc, cur) => acc + cur.amount, 0),
    };
  }, [allBookings]);

  const filteredBookings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allBookings.filter((b) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "declined"
            ? b.status === "declined" || b.status === "history"
            : b.status === filter;

      const matchesSearch =
        !q ||
        b.guestName.toLowerCase().includes(q) ||
        b.roomTitle.toLowerCase().includes(q) ||
        b.ref.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [allBookings, filter, searchQuery]);

  const selectedBooking = useMemo(() => {
    return (
      allBookings.find((b) => b.id === selectedId) ??
      filteredBookings[0] ??
      allBookings[0]
    );
  }, [allBookings, filteredBookings, selectedId]);

  const handleExportCsv = () => {
    const csvHeader = "Reference,Client,Prestation,Dates,Statut,Montant_XOF\n";
    const csvBody = allBookings
      .map(
        (b) =>
          `"${b.ref}","${b.guestName}","${b.roomTitle}","${b.dateRange}","${b.statusLabel}",${b.amount}`
      )
      .join("\n");
    downloadTextFile(
      "Audit-Reservations-KingsBed.csv",
      csvHeader + csvBody,
      "text/csv;charset=utf-8"
    );
    showToast(
      "Export CSV téléchargé",
      "Le registre des réservations a été exporté."
    );
  };

  if (!mounted) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 bg-white">
        <div className="h-44 rounded-3xl border border-[#EDEDEA] bg-white animate-pulse" />
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-[560px] mx-auto px-6 text-center">
          <div className="rounded-3xl border border-[#EDEDEA] bg-white p-8 md:p-10 shadow-[0_10px_30px_-10px_rgba(17,17,17,0.06)] space-y-6">
            <h1 className="text-[30px] md:text-[34px] font-medium tracking-[-0.02em] text-[#111111]">
              Accès réservé à la Direction &amp; Conciergerie
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => openAuthModal("admin")}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0d2b24] hover:bg-[#001510] text-white text-[14px] font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#bfecdc]" />
                Continuer avec Google (Admin)
              </button>
              <button
                type="button"
                onClick={() => loginQuickRole("admin")}
                className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#faf9f6] text-[#111111] text-[13px] font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#0d2b24]" />
                Accès immédiat Sophie C.
              </button>
            </div>
            <p className="text-[11px] text-[#5F5F5A] leading-relaxed">
              En vous connectant, vous acceptez nos{" "}
              <Link href="/legal/terms" className="underline underline-offset-2 hover:text-[#111111]">
                Conditions Générales
              </Link>{" "}
              et notre{" "}
              <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-[#111111]">
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    );
  }

  const navItems: {
    id: AdminSidebarSection;
    label: string;
    icon: typeof LayoutDashboard;
    badge?: number;
  }[] = [
    { id: "overview", label: "Tableau de bord", icon: LayoutDashboard },
    {
      id: "reservations",
      label: "Réservations & Salles",
      icon: ClipboardList,
      badge: counts.pending,
    },
    { id: "rooms-breakfast", label: "Chambres & Petit-Déj.", icon: BedDouble },
    {
      id: "conference-halls",
      label: "Salles de Conférence",
      icon: Presentation,
    },
    { id: "team", label: "Équipe & Majordomes", icon: Users },
  ];

  const sectionTitleMap: Record<AdminSidebarSection, string> = {
    overview: "Bureau de Conciergerie & Vue Globale",
    reservations: "Registre des Réservations & Validations",
    "rooms-breakfast": "Planning Chambres & Petits-Déjeuners",
    "conference-halls": "Centres de Conférences & Salons",
    team: "Équipe Conciergerie & Affectations",
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-5 bg-white">
      <div className="space-y-6">
        {/* Navigation */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9A9A93] mb-2">
            Administration Hôtel
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSection(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={cn(
                  "w-full px-3.5 py-2.5 rounded-xl text-[13px] font-medium flex items-center justify-between gap-2 transition-colors cursor-pointer",
                  active
                    ? "bg-[#0d2b24] text-white"
                    : "text-[#5F5F5A] hover:text-[#111111] hover:bg-[#faf9f6]"
                )}
              >
                <span className="flex items-center gap-2.5 truncate">
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  <span className="truncate">{item.label}</span>
                </span>
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[11px] font-semibold tabular-nums",
                      active
                        ? "bg-[#bfecdc] text-[#002018]"
                        : "bg-[#ffdcbd] text-[#2c1600]"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom Controls */}
      <div className="pt-5 border-t border-[#EDEDEA] space-y-2">
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="w-full px-3.5 py-2.5 rounded-xl text-[#ba1a1a] hover:bg-[#ffdad6]/40 text-[12px] font-medium flex items-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Déconnexion Google
        </button>
      </div>
    </div>
  );

  const renderLedgerAndDossier = () => (
    <div className="space-y-6">
      {/* Interactive Filters & Search Strip */}
      <div className="bg-white border border-[#EDEDEA] p-3.5 rounded-2xl flex flex-col xl:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
          {(
            [
              { id: "all", label: "Toutes", count: counts.all },
              { id: "pending", label: "À valider", count: counts.pending },
              { id: "confirmed", label: "Confirmées", count: counts.confirmed },
              {
                id: "declined",
                label: "Refusées / Archivées",
                count: counts.declined,
              },
            ] as const
          ).map((btn) => {
            const active = filter === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setFilter(btn.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-[13px] font-medium transition-all inline-flex items-center gap-2 cursor-pointer",
                  active
                    ? "bg-[#111111] text-white shadow-sm"
                    : "border border-[#EDEDEA] bg-white text-[#5F5F5A] hover:text-[#111111] hover:bg-[#faf9f6]"
                )}
              >
                <span>{btn.label}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[11px] font-semibold tabular-nums",
                    active
                      ? "bg-white/20 text-white"
                      : btn.id === "pending"
                        ? "bg-[#ffdcbd] text-[#2c1600]"
                        : "bg-[#faf9f6] text-[#5F5F5A]"
                  )}
                >
                  {btn.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-64">
            <Search className="w-4 h-4 text-[#5F5F5A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher hôte, chambre, réf..."
              className="w-full h-10 pl-10 pr-4 bg-white border border-[#EDEDEA] text-[#111111] placeholder:text-[#9A9A93] rounded-full text-[13px] focus:outline-none focus:border-[#111111]"
            />
          </div>
          <button
            type="button"
            onClick={handleExportCsv}
            aria-label="Télécharger export CSV"
            title="Télécharger export CSV"
            className="w-10 h-10 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#faf9f6] text-[#111111] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Split Workspace (8 / 4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7 space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white border border-[#EDEDEA] rounded-2xl p-10 text-center text-[#5F5F5A]">
              Aucune réservation ne correspond à votre recherche.
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const isSelected = selectedBooking?.id === booking.id;
              return (
                <div
                  key={booking.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedId(booking.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedId(booking.id);
                    }
                  }}
                  className={cn(
                    "cursor-pointer bg-white p-5 rounded-2xl border transition-all duration-200",
                    isSelected
                      ? "border-[#0d2b24]/45 ring-2 ring-[#0d2b24]/15 shadow-md"
                      : "border-[#EDEDEA] shadow-xs hover:shadow-md"
                  )}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-[#EDEDEA]">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center text-[14px] font-semibold shrink-0",
                          booking.status === "confirmed"
                            ? "bg-[#bce9d9] text-[#0d2b24]"
                            : booking.status === "pending"
                              ? "bg-[#ffdcbd] text-[#2c1600]"
                              : "bg-[#e9e8e5] text-[#5F5F5A]"
                        )}
                      >
                        {booking.guestInitials}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[16px] font-semibold text-[#111111]">
                            {booking.guestName}
                          </h3>
                          <span className="text-[11px] font-mono text-[#5F5F5A]">
                            {booking.ref}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#5F5F5A]">
                          {booking.historyLabel}
                        </p>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium shrink-0",
                        booking.status === "confirmed"
                          ? "bg-[#bce9d9] text-[#002018]"
                          : booking.status === "pending"
                            ? "bg-[#ffdcbd] text-[#2c1600]"
                            : "bg-[#e9e8e5] text-[#414846]"
                      )}
                    >
                      {booking.status === "confirmed" ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : booking.status === "pending" ? (
                        <Clock className="w-3.5 h-3.5" />
                      ) : (
                        <Ban className="w-3.5 h-3.5" />
                      )}
                      {booking.perkBadge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3.5">
                    <div>
                      <span className="text-[10px] font-semibold text-[#5F5F5A] block uppercase">
                        Chambre / Salle
                      </span>
                      <span className="text-[14px] font-semibold text-[#111111] block truncate mt-0.5">
                        {booking.roomTitle}
                      </span>
                      <span className="text-[12px] text-[#5F5F5A]">
                        {booking.breakfastOrHallLabel}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-[#5F5F5A] block uppercase">
                        Dates &amp; Convives
                      </span>
                      <span className="text-[13px] font-medium text-[#111111] block mt-0.5 tabular-nums">
                        {booking.dateRange}
                      </span>
                      <span className="text-[12px] text-[#5F5F5A]">
                        {booking.durationLabel} • {booking.guestsLabel}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-[#5F5F5A] block uppercase">
                        Montant TTC
                      </span>
                      <span className="text-[15px] font-semibold text-[#111111] block mt-0.5 tabular-nums">
                        {formatMoney(booking.amount)}
                      </span>
                      <span className="text-[12px] text-[#3d6659]">
                        {booking.butlerName}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#EDEDEA] flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[12px] text-[#5F5F5A] inline-flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-[#3d6659]" />
                      {booking.deadlineHint}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {booking.status !== "declined" && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeclineTarget(booking);
                          }}
                          className="px-3.5 py-1.5 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#ffdad6]/50 hover:text-[#93000a] text-[#5F5F5A] text-[12px] font-medium transition-colors cursor-pointer"
                        >
                          Refuser
                        </button>
                      )}
                      {booking.status !== "confirmed" && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmTarget(booking);
                          }}
                          className="px-4 py-1.5 rounded-full bg-[#0d2b24] hover:bg-[#001510] text-white text-[12px] font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Confirmer
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(booking.id);
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-[#faf9f6] border border-[#EDEDEA] hover:bg-[#e9e8e5] text-[#111111] text-[12px] font-medium inline-flex items-center gap-1 cursor-pointer"
                      >
                        Dossier
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sticky Dossier Concierge */}
        {selectedBooking && (
          <aside className="xl:col-span-5 bg-white border border-[#EDEDEA] p-6 rounded-3xl shadow-sm sticky top-6 space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#EDEDEA]">
              <div>
                <span className="text-[11px] font-semibold text-[#5F5F5A] uppercase tracking-wider">
                  Dossier Concierge Actif
                </span>
                <h2 className="text-[19px] font-semibold text-[#111111]">
                  {selectedBooking.guestName}
                </h2>
              </div>
              <span
                className={cn(
                  "px-2.5 py-1 rounded-full text-[11px] font-semibold",
                  selectedBooking.status === "confirmed"
                    ? "bg-[#bce9d9] text-[#002018]"
                    : selectedBooking.status === "pending"
                      ? "bg-[#ffdcbd] text-[#2c1600]"
                      : "bg-[#e9e8e5] text-[#414846]"
                )}
              >
                {selectedBooking.perkBadge}
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden h-36 border border-[#EDEDEA]">
              <Image
                src={selectedBooking.image}
                alt={selectedBooking.roomTitle}
                fill
                referrerPolicy="no-referrer"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                <p className="text-[14px] font-semibold truncate">
                  {selectedBooking.roomTitle}
                </p>
                <p className="text-[12px] text-[#bfecdc] truncate">
                  {selectedBooking.dateRange} • {selectedBooking.ref}
                </p>
              </div>
            </div>

            <div className="space-y-2 bg-[#faf9f6] border border-[#EDEDEA] p-4 rounded-2xl">
              <span className="text-[11px] font-semibold text-[#5F5F5A] uppercase tracking-wider block">
                Coordonnées de l&apos;hôte
              </span>
              <p className="text-[13px] text-[#111111] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3d6659]" />
                {selectedBooking.guestPhone}
              </p>
              <p className="text-[13px] text-[#111111] flex items-center gap-2 truncate">
                <Mail className="w-4 h-4 text-[#3d6659]" />
                {selectedBooking.guestEmail}
              </p>
              <p className="text-[13px] text-[#111111] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#3d6659]" />
                {selectedBooking.guestTier}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#5F5F5A] uppercase tracking-wider">
                  Demandes particulières
                </span>
                <span className="text-[11px] font-medium text-[#3d6659]">
                  {selectedBooking.requests.length} spécification(s)
                </span>
              </div>
              {selectedBooking.requests.length === 0 ? (
                <p className="text-[12px] text-[#5F5F5A] p-3 rounded-xl bg-[#faf9f6] border border-[#EDEDEA]">
                  Aucune demande spécifique enregistrée pour ce dossier.
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedBooking.requests.map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#faf9f6] border border-[#EDEDEA]"
                    >
                      <RequestIcon icon={req.icon} />
                      <div>
                        <p className="text-[12px] font-semibold text-[#111111]">
                          {req.title}
                        </p>
                        <p className="text-[11px] text-[#5F5F5A]">{req.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="admin-internal-note"
                className="text-[11px] font-semibold text-[#5F5F5A] uppercase tracking-wider block"
              >
                Note interne équipe conciergerie
              </label>
              <textarea
                id="admin-internal-note"
                rows={3}
                value={selectedBooking.internalNote}
                onChange={(e) =>
                  updateBookingNote(selectedBooking.id, e.target.value)
                }
                placeholder="Instructions confidentielles pour l'équipe..."
                className="w-full p-3 rounded-xl bg-[#faf9f6] border border-[#EDEDEA] text-[12px] text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="admin-butler-select"
                className="text-[11px] font-semibold text-[#5F5F5A] uppercase tracking-wider block"
              >
                Responsable / Majordome assigné
              </label>
              <select
                id="admin-butler-select"
                value={selectedBooking.butlerName}
                onChange={(e) => {
                  assignBookingButler(selectedBooking.id, e.target.value);
                  showToast(
                    "Responsable mis à jour",
                    `${e.target.value} a été affecté au dossier ${selectedBooking.ref}.`
                  );
                }}
                className="w-full h-10 px-3 rounded-xl bg-[#faf9f6] border border-[#EDEDEA] text-[13px] font-medium text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                {STAFF_BUTLERS.map((staff) => (
                  <option key={staff} value={staff}>
                    {staff}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-1 space-y-2.5">
              <button
                type="button"
                onClick={() => setConfirmTarget(selectedBooking)}
                className="w-full py-3 rounded-full bg-[#111111] hover:bg-[#2A2A28] text-white text-[13px] font-medium shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ConciergeBell className="w-4 h-4" />
                Valider et Notifier l&apos;Hôte
              </button>
              <button
                type="button"
                onClick={() => {
                  downloadTextFile(
                    `Feuille-de-Route-${selectedBooking.id}.txt`,
                    `KING'S BED HOTEL — FEUILLE DE ROUTE CONCIERGERIE\nRéférence : ${selectedBooking.ref}\nClient : ${selectedBooking.guestName} (${selectedBooking.guestPhone})\nChambre / Salle : ${selectedBooking.roomTitle}\nDates : ${selectedBooking.dateRange} (${selectedBooking.durationLabel})\nFormule : ${selectedBooking.breakfastOrHallLabel}\nResponsable assigné : ${selectedBooking.butlerName}\nMontant : ${formatMoney(selectedBooking.amount)} TTC\nNote interne : ${selectedBooking.internalNote}\n`
                  );
                  showToast(
                    "Feuille de route générée",
                    `Le récapitulatif ${selectedBooking.ref} est prêt.`
                  );
                }}
                className="w-full py-2.5 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#faf9f6] text-[#111111] text-[13px] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Générer Feuille de Route
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white text-[#111111]">
      <div className="max-w-[1440px] mx-auto flex min-h-[calc(100vh-64px)] bg-white">
        {/* Desktop Persistent Left Sidebar (264px) */}
        <aside className="hidden lg:block w-[264px] shrink-0 border-r border-[#EDEDEA] bg-white sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto">
          {sidebarContent}
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-[#001510]/40 backdrop-blur-xs lg:hidden flex"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div
              className="w-[280px] max-w-[85vw] h-full bg-white border-r border-[#EDEDEA] shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-[#EDEDEA]">
                <span className="text-[13px] font-semibold text-[#111111]">
                  Menu Admin
                </span>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#EDEDEA] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {sidebarContent}
            </div>
          </div>
        )}

        {/* Main Admin Workspace */}
        <div className="flex-1 min-w-0 bg-white">
          {/* Top Bar */}
          <div className="px-6 lg:px-10 py-5 border-b border-[#EDEDEA] flex flex-wrap items-center justify-between gap-4 bg-white">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Ouvrir le menu latéral admin"
                className="lg:hidden w-9 h-9 rounded-xl border border-[#EDEDEA] bg-white flex items-center justify-center text-[#111111]"
              >
                <Menu className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-1.5 text-[12px] text-[#5F5F5A]">
                  <span>Dashboard Admin</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-[#111111] font-medium">
                    {sectionTitleMap[section]}
                  </span>
                </div>
                <h1 className="text-[22px] sm:text-[26px] font-medium tracking-[-0.02em] text-[#111111] mt-0.5">
                  {sectionTitleMap[section]}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleExportCsv}
                className="h-10 px-4 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#faf9f6] text-[#111111] text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Export Audit CSV
              </button>
            </div>
          </div>

          <div className="p-6 lg:p-10 space-y-8 bg-white">
            {/* OVERVIEW SECTION */}
            {section === "overview" && (
              <>
                {/* 3 KPI Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-white border border-[#EDEDEA] p-6 rounded-2xl flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-[#b18456] uppercase tracking-wider">
                        Demandes en attente
                      </span>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-[40px] leading-none font-semibold text-[#111111] tabular-nums">
                          {counts.pending}
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#ffdcbd] text-[#2c1600]">
                          Validation requise
                        </span>
                      </div>
                      <p className="text-[12px] text-[#5F5F5A]">
                        Temps de réponse moyen : 14 min
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-[#ffdcbd]/70 flex items-center justify-center text-[#2c1600]">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-white border border-[#EDEDEA] p-6 rounded-2xl flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-[#5F5F5A] uppercase tracking-wider">
                        Séjours &amp; Salles confirmés
                      </span>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-[40px] leading-none font-semibold text-[#111111] tabular-nums">
                          {counts.confirmed}
                        </span>
                        <span className="text-[12px] font-medium text-[#3d6659] inline-flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> +22%
                        </span>
                      </div>
                      <p className="text-[12px] text-[#5F5F5A]">
                        100 % avec responsable désigné
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-[#bce9d9] flex items-center justify-center text-[#0d2b24]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-white border border-[#EDEDEA] p-6 rounded-2xl flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-[#5F5F5A] uppercase tracking-wider">
                        Volume géré actif
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[34px] leading-none font-semibold text-[#111111] tabular-nums">
                          {formatMoney(counts.volume)}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#3d6659] flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Chambres, Breakfast
                        &amp; Salles
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-[#e9e8e5] flex items-center justify-center text-[#111111]">
                      <Wallet className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {renderLedgerAndDossier()}
              </>
            )}

            {/* RESERVATIONS SECTION */}
            {section === "reservations" && renderLedgerAndDossier()}

            {/* ROOMS & BREAKFAST SECTION */}
            {section === "rooms-breakfast" && (
              <div className="rounded-2xl border border-[#EDEDEA] bg-white overflow-hidden">
                <div className="px-6 py-4 border-b border-[#EDEDEA] flex items-center justify-between">
                  <h2 className="text-[16px] font-semibold text-[#111111]">
                    Registre Chambres &amp; Service Petit-Déjeuner
                  </h2>
                  <span className="text-[12px] text-[#5F5F5A]">
                    Mise à jour temps réel
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#EDEDEA] text-[11px] font-semibold uppercase tracking-wider text-[#5F5F5A]">
                        <th className="py-3 px-6">Hôte</th>
                        <th className="py-3 px-4">Chambre / Suite</th>
                        <th className="py-3 px-4">Formule Breakfast</th>
                        <th className="py-3 px-4">Responsable</th>
                        <th className="py-3 px-6 text-right">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDEDEA] text-[13px]">
                      {allBookings.map((b) => (
                        <tr
                          key={b.id}
                          onClick={() => {
                            setSelectedId(b.id);
                            setSection("reservations");
                          }}
                          className="hover:bg-[#faf9f6] transition-colors cursor-pointer"
                        >
                          <td className="py-3.5 px-6 font-medium text-[#111111]">
                            {b.guestName}
                          </td>
                          <td className="py-3.5 px-4 text-[#111111]">
                            {b.roomTitle}
                          </td>
                          <td className="py-3.5 px-4 text-[#5F5F5A]">
                            {b.breakfastOrHallLabel}
                          </td>
                          <td className="py-3.5 px-4 text-[#3d6659] font-medium">
                            {b.butlerName}
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <span
                              className={cn(
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold",
                                b.status === "confirmed"
                                  ? "bg-[#bce9d9] text-[#002018]"
                                  : b.status === "pending"
                                    ? "bg-[#ffdcbd] text-[#2c1600]"
                                    : "bg-[#e9e8e5] text-[#414846]"
                              )}
                            >
                              {b.perkBadge}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CONFERENCE HALLS SECTION */}
            {section === "conference-halls" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    name: "Salon Conférence Haussmann",
                    capacity: "18 à 35 personnes",
                    equipment: "Écran 4K interactif, micros sans fil, fibre dédiée",
                    status: "Demande en attente (#KB-9931)",
                    badgeClass: "bg-[#ffdcbd] text-[#2c1600]",
                  },
                  {
                    name: "Salle Royale Vendôme",
                    capacity: "24 à 60 personnes",
                    equipment:
                      "Visioconférence Polycom, pauses café & déjeuner privé",
                    status: "En cours d'approbation (#KB-9104)",
                    badgeClass: "bg-[#ffdcbd] text-[#2c1600]",
                  },
                  {
                    name: "Grand Auditorium King's Bed",
                    capacity: "Jusqu'à 140 personnes",
                    equipment: "Régie complète, acoustique isolée, scène",
                    status: "Disponible fin décembre",
                    badgeClass: "bg-[#bce9d9] text-[#002018]",
                  },
                ].map((hall) => (
                  <div
                    key={hall.name}
                    className="rounded-2xl border border-[#EDEDEA] bg-white p-6 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#e9e8e5] flex items-center justify-center text-[#111111]">
                        <Presentation className="w-5 h-5" />
                      </div>
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[11px] font-semibold",
                          hall.badgeClass
                        )}
                      >
                        {hall.status}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[17px] font-semibold text-[#111111]">
                        {hall.name}
                      </h3>
                      <p className="text-[12px] text-[#3d6659] font-medium mt-0.5">
                        Capacité : {hall.capacity}
                      </p>
                    </div>
                    <p className="text-[13px] text-[#5F5F5A] leading-relaxed">
                      {hall.equipment}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSection("reservations")}
                      className="text-[13px] font-medium text-[#111111] hover:text-[#3d6659] inline-flex items-center gap-1 cursor-pointer"
                    >
                      Voir les dossiers liés
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TEAM SECTION */}
            {section === "team" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {STAFF_BUTLERS.map((staff) => {
                  const assignedCount = allBookings.filter(
                    (b) => b.butlerName === staff
                  ).length;
                  return (
                    <div
                      key={staff}
                      className="rounded-2xl border border-[#EDEDEA] bg-white p-6 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-full bg-[#0d2b24] text-[#bfecdc] flex items-center justify-center text-[14px] font-semibold">
                          {staff
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="text-[16px] font-semibold text-[#111111]">
                            {staff}
                          </h3>
                          <p className="text-[12px] text-[#5F5F5A]">
                            Équipe Conciergerie &amp; Coordination Séminaires
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[20px] font-semibold text-[#111111] tabular-nums">
                          {assignedCount}
                        </p>
                        <p className="text-[11px] text-[#5F5F5A]">
                          dossier(s) actif(s)
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {confirmTarget && (
        <div
          className="fixed inset-0 z-50 bg-[#001510]/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setConfirmTarget(null)}
        >
          <div
            className="bg-white border border-[#EDEDEA] max-w-lg w-full rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#EDEDEA] pb-3.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#3d6659]" />
                <h3 className="text-[19px] font-semibold text-[#111111]">
                  Confirmation du Séjour / Salle
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setConfirmTarget(null)}
                className="w-8 h-8 rounded-full border border-[#EDEDEA] flex items-center justify-center hover:bg-[#faf9f6] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-[14px] text-[#111111] leading-relaxed">
                Vous allez valider formellement la réservation de{" "}
                <strong>{confirmTarget.guestName}</strong> pour{" "}
                <strong>{confirmTarget.roomTitle}</strong> (
                {confirmTarget.dateRange}).
              </p>
              <div className="p-4 bg-[#faf9f6] border border-[#EDEDEA] rounded-2xl space-y-1.5">
                <p className="text-[12px] font-semibold text-[#3d6659]">
                  Actions déclenchées automatiquement :
                </p>
                <ul className="text-[12px] text-[#5F5F5A] space-y-1 list-disc list-inside">
                  <li>
                    Validation du montant de{" "}
                    {formatMoney(confirmTarget.amount)} TTC.
                  </li>
                  <li>
                    Envoi du voucher King&apos;s Bed Hotel à{" "}
                    {confirmTarget.guestEmail}.
                  </li>
                  <li>
                    Notification du responsable assigné :{" "}
                    {confirmTarget.butlerName}.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setConfirmTarget(null)}
                className="px-5 py-2.5 rounded-full border border-[#EDEDEA] text-[#111111] text-[13px] font-medium hover:bg-[#faf9f6] cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  updateBookingStatus(confirmTarget.id, "confirmed");
                  showToast(
                    "Réservation Confirmée",
                    `Le dossier ${confirmTarget.ref} (${confirmTarget.guestName}) est validé.`
                  );
                  setConfirmTarget(null);
                }}
                className="px-6 py-2.5 rounded-full bg-[#0d2b24] hover:bg-[#001510] text-white text-[13px] font-medium shadow-sm cursor-pointer"
              >
                Confirmer &amp; Envoyer Accréditations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Modal */}
      {declineTarget && (
        <div
          className="fixed inset-0 z-50 bg-[#001510]/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDeclineTarget(null)}
        >
          <div
            className="bg-white border border-[#EDEDEA] max-w-lg w-full rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#EDEDEA] pb-3.5">
              <div className="flex items-center gap-2 text-[#ba1a1a]">
                <Ban className="w-5 h-5" />
                <h3 className="text-[19px] font-semibold text-[#111111]">
                  Décliner ou Proposer une Alternative
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDeclineTarget(null)}
                className="w-8 h-8 rounded-full border border-[#EDEDEA] flex items-center justify-center hover:bg-[#faf9f6] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-[14px] text-[#111111]">
                Indiquez le motif transmis à{" "}
                <strong>{declineTarget.guestName}</strong> :
              </p>
              <select
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-[#EDEDEA] bg-[#faf9f6] text-[13px] text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                <option>
                  Dates complètes • Proposer une suite ou salle équivalente
                </option>
                <option>Période de privatisation complète de l&apos;aile</option>
                <option>Capacité d&apos;accueil dépassée pour ce salon</option>
                <option>Refus avec libération immédiate de l&apos;empreinte</option>
              </select>
              <textarea
                rows={3}
                value={declineMessage}
                onChange={(e) => setDeclineMessage(e.target.value)}
                placeholder="Message personnalisé de la direction..."
                className="w-full p-3 rounded-xl border border-[#EDEDEA] bg-[#faf9f6] text-[13px] text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setDeclineTarget(null)}
                className="px-5 py-2.5 rounded-full border border-[#EDEDEA] text-[#111111] text-[13px] font-medium hover:bg-[#faf9f6] cursor-pointer"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  const combinedNote = declineMessage.trim()
                    ? `${declineReason} — ${declineMessage.trim()}`
                    : declineReason;
                  updateBookingStatus(
                    declineTarget.id,
                    "declined",
                    combinedNote
                  );
                  showToast(
                    "Notification envoyée",
                    `Le dossier ${declineTarget.ref} a été classé avec alternative.`
                  );
                  setDeclineMessage("");
                  setDeclineTarget(null);
                }}
                className="px-6 py-2.5 rounded-full bg-[#ba1a1a] hover:opacity-90 text-white text-[13px] font-medium shadow-sm cursor-pointer"
              >
                Confirmer le déclin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#001510] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#bfecdc] shrink-0" />
          <div>
            <p className="text-[13px] font-semibold">{toast.title}</p>
            <p className="text-[12px] text-[#adcdc3]">{toast.subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
}
