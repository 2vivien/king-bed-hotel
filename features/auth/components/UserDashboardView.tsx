"use client";

import {
  ArrowRight,
  Award,
  BedDouble,
  Calendar,
  CalendarCheck,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  FileText,
  LayoutDashboard,

  LogOut,
  MapPin,
  Menu,
  Presentation,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  User,
  Utensils,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type { ManagedBooking } from "@/features/auth/types/auth.types";
import { useBookingStore } from "@/features/booking/store/booking.store";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/utils/format-money";

type ClientSidebarSection =
  | "overview"
  | "bookings";

type ClientTab = "all" | "confirmed" | "pending" | "history";

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function UserDashboardView() {
  const router = useRouter();
  const mounted = useIsMounted();
  const [section, setSection] = useState<ClientSidebarSection>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ClientTab>("all");
  const [toast, setToast] = useState<{ title: string; subtitle: string } | null>(
    null
  );
  const [modifyModalBooking, setModifyModalBooking] =
    useState<ManagedBooking | null>(null);
  const [modifyNote, setModifyNote] = useState("");

  const currentUser = useAuthStore((s) => s.currentUser);
  const managedBookings = useAuthStore((s) => s.managedBookings);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);
  const loginQuickRole = useAuthStore((s) => s.loginQuickRole);
  const logout = useAuthStore((s) => s.logout);
  const updateBookingStatus = useAuthStore((s) => s.updateBookingStatus);
  const updateBookingNote = useAuthStore((s) => s.updateBookingNote);

  const confirmedSessionBookings = useBookingStore((s) => s.confirmedBookings);

  const showToast = (title: string, subtitle: string) => {
    setToast({ title, subtitle });
    window.setTimeout(() => {
      setToast((current) => (current?.title === title ? null : current));
    }, 3600);
  };

  const clientBookings = useMemo(() => {
    if (!currentUser) return [];

    const isDemoClient = currentUser.email === "client@kingsbedhotel.com";
    const base = managedBookings.filter((b) =>
      isDemoClient
        ? b.guestEmail === "client@kingsbedhotel.com"
        : b.guestEmail === currentUser.email ||
          b.guestEmail === "client@kingsbedhotel.com"
    );

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
      guestTier: currentUser.title,
      historyLabel: "Réservation directe web",
      status: b.status === "cancelled" ? "history" : "confirmed",
      statusLabel:
        b.status === "cancelled"
          ? "Annulé • Remboursé"
          : "Confirmé • Billet Réception Actif",
      roomTitle: b.roomName,
      locationLabel: b.address || "King's Bed Hotel",
      dateRange: `${b.checkIn} — ${b.checkOut}`,
      durationLabel: `${b.nights} nuit(s)`,
      guestsLabel: `${b.guests} Personne(s)`,
      breakfastOrHallLabel: "Petit-Déjeuner Inclus",
      serviceIncluded: "Réception 24h/24",
      butlerName: "Henri de Saint-Germain",
      amount: b.total,
      image: b.image || "/images/rooms/oceanfront-sanctuary.jpg",
      perkTitle: "Réservation directe confirmée",
      perkSubtitle:
        b.guest.notes ||
        "Accueil personnalisé à la réception dès votre arrivée à King's Bed Hotel.",
      perkBadge: "Confirmé",
      deadlineHint: "Dossier actif",
      internalNote: b.guest.notes || "",
      requests: [],
    }));

    const existingIds = new Set(base.map((item) => item.id));
    return [
      ...sessionConverted.filter((item) => !existingIds.has(item.id)),
      ...base,
    ];
  }, [currentUser, managedBookings, confirmedSessionBookings]);

  const counts = useMemo(() => {
    return {
      all: clientBookings.length,
      confirmed: clientBookings.filter((b) => b.status === "confirmed").length,
      pending: clientBookings.filter((b) => b.status === "pending").length,
      history: clientBookings.filter(
        (b) => b.status === "history" || b.status === "declined"
      ).length,
      totalSpent: clientBookings
        .filter((b) => b.status !== "declined")
        .reduce((acc, b) => acc + b.amount, 0),
    };
  }, [clientBookings]);

  const filteredBookings = useMemo(() => {
    if (activeTab === "all") return clientBookings;
    if (activeTab === "history") {
      return clientBookings.filter(
        (b) => b.status === "history" || b.status === "declined"
      );
    }
    return clientBookings.filter((b) => b.status === activeTab);
  }, [clientBookings, activeTab]);

  if (!mounted) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 bg-white">
        <div className="h-44 rounded-3xl border border-[#EDEDEA] bg-white animate-pulse" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-[540px] mx-auto px-6 text-center">
          <div className="rounded-3xl border border-[#EDEDEA] bg-white p-8 md:p-10 shadow-[0_10px_30px_-10px_rgba(17,17,17,0.06)] space-y-6">
            <h1 className="text-[30px] md:text-[34px] font-medium tracking-[-0.02em] text-[#111111]">
              Accédez à votre tableau de bord
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => openAuthModal("user")}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#111111] hover:bg-[#2A2A28] text-white text-[14px] font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <User className="w-4 h-4" />
                Continuer avec Google (Client)
              </button>
              <button
                type="button"
                onClick={() => loginQuickRole("user")}
                className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#faf9f6] text-[#111111] text-[13px] font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Accès immédiat Claire M.
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
    id: ClientSidebarSection;
    label: string;
    icon: typeof LayoutDashboard;
    badge?: number;
  }[] = [
    { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
    {
      id: "bookings",
      label: "Mes Réservations",
      icon: CalendarCheck,
      badge: counts.all,
    },
  ];

  const sectionTitleMap: Record<ClientSidebarSection, string> = {
    overview: "Vue d'ensemble",
    bookings: "Mes Réservations",
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-5 bg-white">
      <div className="space-y-6">
        {/* Navigation Links */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9A9A93] mb-2">
            Espace Client
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
                    ? "bg-[#111111] text-white"
                    : "text-[#5F5F5A] hover:text-[#111111] hover:bg-[#faf9f6]"
                )}
              >
                <span className="flex items-center gap-2.5 truncate">
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  <span className="truncate">{item.label}</span>
                </span>
                {typeof item.badge === "number" && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[11px] font-semibold tabular-nums",
                      active
                        ? "bg-white/20 text-white"
                        : "bg-[#e9e8e5] text-[#111111]"
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

      {/* Sidebar Bottom Controls */}
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

  return (
    <div className="w-full bg-white text-[#111111] border-t border-transparent">
      <div className="max-w-[1440px] mx-auto flex min-h-[calc(100vh-64px)] bg-white">
        {/* Desktop Persistent Left Sidebar (260px) */}
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
                  Menu Dashboard
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

        {/* Main Dashboard Viewport */}
        <div className="flex-1 min-w-0 bg-white">
          {/* Top Dashboard Bar */}
          <div className="px-6 lg:px-10 py-5 border-b border-[#EDEDEA] flex flex-wrap items-center justify-between gap-4 bg-white">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Ouvrir le menu latéral"
                className="lg:hidden w-9 h-9 rounded-xl border border-[#EDEDEA] bg-white flex items-center justify-center text-[#111111]"
              >
                <Menu className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-1.5 text-[12px] text-[#5F5F5A]">
                  <span>Dashboard Client</span>
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
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e9e8e5] text-[#111111] text-[12px] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#0d2b24]" />
                {currentUser.title}
              </span>
              <Link
                href="/reservation"
                className="h-10 px-5 rounded-full bg-[#111111] hover:bg-[#2A2A28] text-white text-[13px] font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                Nouvelle réservation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Dashboard Body Content */}
          <div className="p-6 lg:p-10 space-y-8 bg-white">
            {/* OVERVIEW SECTION */}
            {section === "overview" && (
              <>
                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border border-[#EDEDEA] bg-white space-y-1">
                    <p className="text-[11px] font-semibold text-[#5F5F5A] uppercase tracking-wider">
                      Séjours confirmés
                    </p>
                    <p className="text-[30px] font-semibold text-[#111111] tabular-nums">
                      {counts.confirmed}
                    </p>
                    <p className="text-[12px] text-[#3d6659]">
                      Chambres &amp; Suites actives
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl border border-[#EDEDEA] bg-white space-y-1">
                    <p className="text-[11px] font-semibold text-[#5F5F5A] uppercase tracking-wider">
                      Demandes en attente
                    </p>
                    <p className="text-[30px] font-semibold text-[#623f18] tabular-nums">
                      {counts.pending}
                    </p>
                    <p className="text-[12px] text-[#5F5F5A]">
                      Validation sous 2 heures
                    </p>
                  </div>
                </div>

                {/* Featured Active Stay Card */}
                {clientBookings[0] && (
                  <div className="rounded-3xl border border-[#EDEDEA] bg-white overflow-hidden shadow-[0_8px_24px_-6px_rgba(17,17,17,0.05)]">
                    <div className="grid grid-cols-1 xl:grid-cols-12">
                      <div className="relative h-[240px] xl:h-auto xl:col-span-5">
                        <Image
                          src={clientBookings[0].image}
                          alt={clientBookings[0].roomTitle}
                          fill
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d2b24] text-[#bfecdc] text-[11px] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Prochain Séjour
                          </span>
                        </div>
                      </div>
                      <div className="p-6 sm:p-8 xl:col-span-7 space-y-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-[12px] text-[#3d6659] font-medium flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {clientBookings[0].locationLabel}
                            </p>
                            <h2 className="text-[22px] sm:text-[26px] font-semibold text-[#111111] mt-1">
                              {clientBookings[0].roomTitle}
                            </h2>
                          </div>
                          <span className="px-3 py-1 rounded-full border border-[#EDEDEA] bg-[#faf9f6] text-[12px] font-semibold text-[#111111]">
                            {clientBookings[0].ref}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border border-[#EDEDEA] bg-[#faf9f6]">
                          <div>
                            <p className="text-[11px] font-semibold text-[#5F5F5A] uppercase">
                              Dates
                            </p>
                            <p className="text-[14px] font-semibold text-[#111111] mt-0.5 tabular-nums">
                              {clientBookings[0].dateRange}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-[#5F5F5A] uppercase">
                              Hôtes
                            </p>
                            <p className="text-[14px] font-semibold text-[#111111] mt-0.5">
                              {clientBookings[0].guestsLabel}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-[#5F5F5A] uppercase">
                              Petit-Déjeuner
                            </p>
                            <p className="text-[14px] font-semibold text-[#3d6659] mt-0.5">
                              Verrière 08h30
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-[#5F5F5A] uppercase">
                              Total TTC
                            </p>
                            <p className="text-[14px] font-semibold text-[#111111] mt-0.5 tabular-nums">
                              {formatMoney(clientBookings[0].amount)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setSection("bookings")}
                            className="px-5 py-2.5 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#faf9f6] text-[#111111] text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            Gérer toutes mes réservations
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Table of Recent Bookings */}
                <div className="rounded-2xl border border-[#EDEDEA] bg-white overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#EDEDEA] flex items-center justify-between">
                    <h3 className="text-[16px] font-semibold text-[#111111]">
                      Réservations récentes (Chambres &amp; Salles)
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSection("bookings")}
                      className="text-[13px] font-medium text-[#3d6659] hover:text-[#111111] cursor-pointer"
                    >
                      Tout voir
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#EDEDEA] text-[11px] font-semibold uppercase tracking-wider text-[#5F5F5A]">
                          <th className="py-3 px-6">Référence</th>
                          <th className="py-3 px-4">Prestation</th>
                          <th className="py-3 px-4">Dates</th>
                          <th className="py-3 px-4">Statut</th>
                          <th className="py-3 px-6 text-right">Montant</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EDEDEA] text-[13px]">
                        {clientBookings.map((b) => (
                          <tr
                            key={b.id}
                            className="hover:bg-[#faf9f6] transition-colors"
                          >
                            <td className="py-3.5 px-6 font-mono font-medium text-[#111111]">
                              {b.ref}
                            </td>
                            <td className="py-3.5 px-4 font-medium text-[#111111]">
                              {b.roomTitle}
                            </td>
                            <td className="py-3.5 px-4 text-[#5F5F5A] tabular-nums">
                              {b.dateRange}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium",
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
                            <td className="py-3.5 px-6 text-right font-semibold text-[#111111] tabular-nums">
                              {formatMoney(b.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* BOOKINGS SECTION */}
            {section === "bookings" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  {(
                    [
                      { id: "all", label: `Toutes (${counts.all})` },
                      {
                        id: "confirmed",
                        label: `Confirmées (${counts.confirmed})`,
                      },
                      {
                        id: "pending",
                        label: `En attente (${counts.pending})`,
                      },
                      {
                        id: "history",
                        label: `Historique (${counts.history})`,
                      },
                    ] as const
                  ).map((tab) => {
                    const active = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "px-4 py-2 rounded-full text-[13px] font-medium transition-colors cursor-pointer",
                          active
                            ? "bg-[#111111] text-white"
                            : "border border-[#EDEDEA] bg-white text-[#5F5F5A] hover:text-[#111111]"
                        )}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {filteredBookings.length === 0 ? (
                  <div className="rounded-2xl border border-[#EDEDEA] p-10 text-center space-y-3">
                    <p className="text-[16px] font-medium text-[#111111]">
                      Aucune réservation dans ce filtre
                    </p>
                    <Link
                      href="/reservation"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-[13px] font-medium"
                    >
                      Réserver maintenant
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {filteredBookings.map((booking) => (
                      <article
                        key={booking.id}
                        className="rounded-2xl border border-[#EDEDEA] bg-white p-6 space-y-5 shadow-xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-[#EDEDEA]">
                              <Image
                                src={booking.image}
                                alt={booking.roomTitle}
                                fill
                                referrerPolicy="no-referrer"
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold",
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
                                    <XCircle className="w-3.5 h-3.5" />
                                  )}
                                  {booking.statusLabel}
                                </span>
                                <span className="text-[12px] font-mono text-[#5F5F5A]">
                                  {booking.ref}
                                </span>
                              </div>
                              <h3 className="text-[19px] font-semibold text-[#111111]">
                                {booking.roomTitle}
                              </h3>
                              <p className="text-[13px] text-[#5F5F5A]">
                                {booking.dateRange} ({booking.durationLabel}) •{" "}
                                {booking.breakfastOrHallLabel}
                              </p>
                            </div>
                          </div>
                          <div className="sm:text-right shrink-0">
                            <p className="text-[11px] text-[#5F5F5A]">
                              Montant TTC
                            </p>
                            <p className="text-[20px] font-semibold text-[#111111] tabular-nums">
                              {formatMoney(booking.amount)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EDEDEA]">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setModifyModalBooking(booking);
                                setModifyNote(booking.internalNote);
                              }}
                              className="px-4 py-2 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#faf9f6] text-[#111111] text-[12px] font-medium inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              Instructions
                            </button>
                          </div>

                          {booking.status === "pending" ? (
                            <button
                              type="button"
                              onClick={() => {
                                updateBookingStatus(
                                  booking.id,
                                  "history",
                                  "Annulé sans frais par le client."
                                );
                                showToast(
                                  "Réservation annulée",
                                  `Le dossier ${booking.ref} a été annulé sans frais.`
                                );
                              }}
                              className="px-4 py-2 rounded-full text-[#ba1a1a] hover:bg-[#ffdad6]/50 text-[12px] font-medium cursor-pointer"
                            >
                              Annuler sans frais
                            </button>
                          ) : (
                            <Link
                              href="/reservation"
                              className="px-4 py-2 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#faf9f6] text-[#111111] text-[12px] font-medium inline-flex items-center gap-1.5"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              Re-réserver
                            </Link>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Modify Instructions Modal */}
      {modifyModalBooking && (
        <div
          className="fixed inset-0 z-50 bg-[#001510]/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModifyModalBooking(null)}
        >
          <div
            className="bg-white border border-[#EDEDEA] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[19px] font-semibold text-[#111111]">
              Instructions de séjour ({modifyModalBooking.ref})
            </h3>
            <textarea
              rows={4}
              value={modifyNote}
              onChange={(e) => setModifyNote(e.target.value)}
              className="w-full p-3 rounded-2xl border border-[#EDEDEA] text-[13px] text-[#111111] focus:outline-none focus:border-[#111111]"
              placeholder="Précisez vos horaires d'arrivée, régime petit-déjeuner ou aménagement de salle..."
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setModifyModalBooking(null)}
                className="px-4 py-2 rounded-full border border-[#EDEDEA] text-[13px] text-[#5F5F5A] cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  updateBookingNote(modifyModalBooking.id, modifyNote);
                  setModifyModalBooking(null);
                  showToast(
                    "Instructions enregistrées",
                    "La réception a bien reçu votre note."
                  );
                }}
                className="px-5 py-2 rounded-full bg-[#111111] text-white text-[13px] font-medium cursor-pointer"
              >
                Enregistrer
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
