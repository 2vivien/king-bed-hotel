"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  parseISO,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Calendar,
  CalendarPlus,
  Car,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Headphones,
  Lock,
  MapPin,
  Minus,
  Plus,
  RefreshCw,
  Shield,
  Sparkles,
  Star,
  Ticket,
  UtensilsCrossed,
  Waves,
  Wifi,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { SuiteImage } from "@/components/shared/SuiteImage";
import {
  createBooking,
  searchAvailability,
} from "@/features/booking/services/booking.service";
import { useBookingStore } from "@/features/booking/store/booking.store";
import {
  GuestDetailsSchema,
  type AvailabilityResult,
  type GuestDetails,
} from "@/features/booking/types/booking.types";
import { buildBookingIcs, buildGoogleCalendarUrl } from "@/lib/utils/ics";
import { calculateNights } from "@/lib/utils/nights";
import { roomsMock } from "@/mocks/rooms";

type AddOnKey = "chauffeur" | "breakfast";

const DESTINATION_OPTIONS = [
  {
    slug: "bali",
    label: "Chambres & Petit-Déjeuner · King's Bed Hotel",
    address: "25 Avenue des Rois, Savalou, Bénin",
    shortLabel: "King's Bed · Aile Royale",
  },
  {
    slug: "positano",
    label: "Suite Exécutive & Salon Privé",
    address: "Niveau Panorama, Aile Royale · Savalou",
    shortLabel: "Niveau Panorama · Savalou",
  },
  {
    slug: "lisbon",
    label: "Forfait Séminaire & Réunion (8–30 pers.)",
    address: "Centre d'Affaires, 1er Étage · Savalou",
    shortLabel: "Espace Réunion · 1er Étage",
  },
  {
    slug: "maldives",
    label: "Conférence & Congrès (40–180 pers.)",
    address: "Grand Auditorium, Aile Est · Savalou",
    shortLabel: "Auditorium · Aile Est",
  },
] as const;

const FEATURED_BOOKING_SLUGS = [
  "royal-villa",
  "oceanfront-sanctuary-suite",
  "premium-suite",
  "deluxe-room",
] as const;

const GLOBAL_SANCTUARIES = [
  {
    slug: "lisbon",
    country: "Chambres & Suites",
    title: "Literie King Size",
    price: "À partir de 196 000 F CFA / nuit",
    image: "/images/destinations/lisbon.jpg",
  },
  {
    slug: "positano",
    country: "Petit-Déjeuner",
    title: "Buffet & En Chambre",
    price: "Formule artisanale chaque matin",
    image: "/images/destinations/positano.jpg",
  },
  {
    slug: "maldives",
    country: "Affaires & Événements",
    title: "Réunions & Conférences",
    price: "Salles équipées de 8 à 180 pers.",
    image: "/images/destinations/maldives.jpg",
  },
] as const;

function formatCurrencyXof(amount: number): string {
  return `${Math.round(amount).toLocaleString("fr-FR")} F CFA`;
}

export function ReservationFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draft = useBookingStore();

  const initialRoom = searchParams.get("room") ?? draft.roomSlug;
  const initialCheckIn = searchParams.get("checkIn") ?? draft.checkIn;
  const initialCheckOut = searchParams.get("checkOut") ?? draft.checkOut;
  const initialGuests = Number(searchParams.get("guests") ?? draft.guests) || 2;
  const initialDest =
    searchParams.get("destination") ?? draft.destinationSlug ?? "bali";

  const [destinationSlug, setDestinationSlug] = useState(
    DESTINATION_OPTIONS.some((d) => d.slug === initialDest)
      ? initialDest
      : "bali"
  );
  const [selectedRoomSlug, setSelectedRoomSlug] = useState(initialRoom);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [pickingPhase, setPickingPhase] = useState<"start" | "end">("start");
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => {
    const parsed = parseISO(initialCheckIn);
    return Number.isNaN(parsed.getTime())
      ? startOfMonth(new Date())
      : startOfMonth(parsed);
  });

  const [adults, setAdults] = useState(Math.min(Math.max(initialGuests, 1), 6));
  const [children, setChildren] = useState(0);
  const [suitesCount, setSuitesCount] = useState(1);

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoFeedback, setPromoFeedback] = useState("");

  const [addOns, setAddOns] = useState<Record<AddOnKey, boolean>>({
    chauffeur: true,
    breakfast: true,
  });

  const [availability, setAvailability] = useState<AvailabilityResult[] | null>(
    null
  );
  const [checking, setChecking] = useState(true);
  const [bookingError, setBookingError] = useState("");
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  const totalGuests = Math.min(8, adults + children);

  const idempotencyKey = useMemo(
    () =>
      `ss-${selectedRoomSlug}-${checkIn}-${checkOut}-${totalGuests}-${addOns.chauffeur}-${addOns.breakfast}-${appliedPromo}`,
    [
      selectedRoomSlug,
      checkIn,
      checkOut,
      totalGuests,
      addOns.chauffeur,
      addOns.breakfast,
      appliedPromo,
    ]
  );

  useEffect(() => {
    let active = true;
    searchAvailability({
      checkIn,
      checkOut,
      guests: totalGuests,
    })
      .then((results) => {
        if (!active) return;
        setAvailability(results);
      })
      .catch(() => {
        // Keep graceful fallback
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [checkIn, checkOut, totalGuests]);

  const displayedRooms = useMemo(() => {
    const base = FEATURED_BOOKING_SLUGS.map((slug) =>
      roomsMock.find((r) => r.slug === slug)
    ).filter((r): r is (typeof roomsMock)[number] => Boolean(r));

    const urlRoom = roomsMock.find((r) => r.slug === selectedRoomSlug);
    if (urlRoom && !base.some((b) => b.slug === urlRoom.slug)) {
      return [urlRoom, ...base];
    }
    return base;
  }, [selectedRoomSlug]);

  const selectedRoom =
    roomsMock.find((r) => r.slug === selectedRoomSlug) ?? displayedRooms[0];

  const destinationMeta =
    DESTINATION_OPTIONS.find((d) => d.slug === destinationSlug) ??
    DESTINATION_OPTIONS[0];

  const nights = Math.max(1, calculateNights(checkIn, checkOut) || 5);
  const roomSubtotalXof = selectedRoom.pricePerNight * nights * suitesCount;
  const chauffeurXof = addOns.chauffeur ? 80000 : 0;
  const breakfastXof = addOns.breakfast ? 30000 * totalGuests * nights : 0;
  const addOnsTotalXof = chauffeurXof + breakfastXof;
  const taxXof = Math.round((roomSubtotalXof + addOnsTotalXof) * 0.1);
  const discountXof =
    appliedPromo === "KINGSBED" || appliedPromo === "SAVVYVIP" || appliedPromo === "PRIVILEGE"
      ? 130000
      : 0;
  const grandTotalXof = Math.max(
    0,
    roomSubtotalXof + addOnsTotalXof + taxXof - discountXof
  );

  const selectedAvailability = availability?.find(
    (a) => a.roomSlug === selectedRoom.slug
  );
  const isSelectedAvailable = selectedAvailability
    ? selectedAvailability.available
    : totalGuests <= selectedRoom.maxGuests;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuestDetails>({
    resolver: zodResolver(GuestDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
      acceptTerms: false,
    },
  });

  // Calendar Grid Generation
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(calendarMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const mondayOffset = (getDay(monthStart) + 6) % 7; // Mon=0..Sun=6
  const today = startOfDay(new Date());

  const handleDayClick = (day: Date) => {
    if (isBefore(day, today)) return;
    const iso = format(day, "yyyy-MM-dd");
    if (pickingPhase === "start" || iso <= checkIn) {
      setCheckIn(iso);
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);
      if (iso >= checkOut) {
        setCheckOut(format(nextDay, "yyyy-MM-dd"));
      }
      setPickingPhase("end");
    } else {
      setCheckOut(iso);
      setPickingPhase("start");
    }
    setActiveStep(1);
  };

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === "KINGSBED" || code === "SAVVYVIP" || code === "PRIVILEGE") {
      setAppliedPromo(code);
      setPromoFeedback("Avantage Membre appliqué (-130 000 F CFA)");
    } else if (!code) {
      setAppliedPromo("");
      setPromoFeedback("");
    } else {
      setAppliedPromo("");
      setPromoFeedback("Code invalide — essayez KINGSBED pour -130 000 F CFA d'avantage.");
    }
  };

  const toggleAddOn = (key: AddOnKey) => {
    setAddOns((prev) => ({ ...prev, [key]: !prev[key] }));
    setActiveStep(4);
  };

  const scrollToSection = (id: string, step: 1 | 2 | 3 | 4) => {
    setActiveStep(step);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const calendarPayload = {
    bookingId: "KB-PROJET",
    roomName: selectedRoom.name,
    location: destinationMeta.label,
    checkIn,
    checkOut,
  };

  const handleDownloadIcs = () => {
    const icsContent = buildBookingIcs(calendarPayload);
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `KingsBedHotel-${selectedRoom.slug}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const googleCalendarHref = buildGoogleCalendarUrl(calendarPayload);

  const onConfirmBooking = async (guestValues: GuestDetails) => {
    setBookingError("");
    if (calculateNights(checkIn, checkOut) <= 0) {
      setBookingError("La date de départ doit être postérieure à la date d'arrivée.");
      return;
    }
    if (!isSelectedAvailable) {
      setBookingError(
        `${selectedRoom.name} accueille jusqu'à ${selectedRoom.maxGuests} personnes ou est indisponible pour ces dates.`
      );
      return;
    }

    const activeAddOns = (Object.keys(addOns) as AddOnKey[]).filter(
      (k) => addOns[k]
    );

    try {
      const created = await createBooking({
        roomSlug: selectedRoom.slug,
        checkIn,
        checkOut,
        guests: totalGuests,
        guest: guestValues,
        addOns: activeAddOns,
        promoCode: appliedPromo || undefined,
        idempotencyKey,
      });

      draft.saveConfirmedBooking(created);
      draft.setDraft({
        destinationSlug,
        roomSlug: created.roomSlug,
        checkIn: created.checkIn,
        checkOut: created.checkOut,
        guests: created.guests,
      });
      router.push(`/reservation/confirmation/${created.id}`);
    } catch (err) {
      setBookingError(
        err instanceof Error
          ? err.message
          : "Impossible de finaliser la réservation pour le moment."
      );
    }
  };

  const formattedCheckIn = format(parseISO(checkIn), "d MMM", { locale: fr });
  const formattedCheckOut = format(parseISO(checkOut), "d MMM", { locale: fr });
  const formattedYear = format(parseISO(checkOut), "yyyy");

  return (
    <div className="bg-white text-[#1a1c1a]">
      {/* Top Progress Indicator Bar */}
      <section className="w-full bg-white py-5 border-b border-[#EDEDEA]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#3d6659] font-semibold">
                Réservation King&apos;s Bed Hotel
              </span>
              <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#001510] tracking-tight">
                Finalisez Votre Séjour ou Réunion
              </h1>
            </div>

            <nav
              aria-label="Progression de la réservation"
              className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1"
            >
              {[
                { num: 1 as const, label: "Dates & Formule", target: "step-1" },
                { num: 2 as const, label: "Choix de la Chambre", target: "step-2" },
                { num: 3 as const, label: "Coordonnées", target: "step-3" },
                { num: 4 as const, label: "Options & Affaires", target: "step-4" },
              ].map((step) => {
                const isPrimary = activeStep === step.num;
                const isHighlighted = step.num === 2 && activeStep === 1;
                return (
                  <div key={step.num} className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => scrollToSection(step.target, step.num)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-full transition-all cursor-pointer ${
                        isPrimary
                          ? "bg-[#0d2b24] text-white shadow-sm"
                          : isHighlighted
                            ? "bg-[#e3e2e0] text-[#001510]"
                            : "bg-[#efeeeb] text-[#414846] hover:bg-[#e9e8e5]"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                          isPrimary
                            ? "bg-white text-[#0d2b24]"
                            : isHighlighted
                              ? "bg-[#001510] text-white"
                              : "bg-[#dbdad7] text-[#414846]"
                        }`}
                      >
                        {step.num}
                      </span>
                      <span className="text-[12px] font-semibold whitespace-nowrap">
                        {step.label}
                      </span>
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-[#727975] shrink-0" />
                  </div>
                );
              })}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#efeeeb] text-[#414846] shrink-0">
                <span className="w-5 h-5 rounded-full bg-[#dbdad7] text-[#414846] text-[11px] font-bold flex items-center justify-center">
                  5
                </span>
                <span className="text-[12px] font-medium whitespace-nowrap">
                  Confirmation
                </span>
              </div>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Booking Canvas */}
      <form onSubmit={handleSubmit(onConfirmBooking)}>
        <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT BOOKING INTERACTIVE FORM & SUITES */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-10">
              {/* STEP 1: Refine Your Itinerary */}
              <div
                id="step-1"
                className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_12px_36px_-6px_rgba(13,43,36,0.06)] border border-[#1a1c1a]/5 space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#3d6659] font-semibold">
                      Étape 1 sur 5
                    </span>
                    <h2 className="text-[24px] font-semibold text-[#001510]">
                      Affinez Votre Programme
                    </h2>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-[#bce9d9] text-[#244e42] text-[11px] font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    {checking ? "Vérification en cours..." : "Disponibilité en Temps Réel"}
                  </span>
                </div>

                {/* Parameters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="bg-[#f4f3f0] rounded-2xl p-4 flex flex-col justify-between hover:bg-[#e9e8e5]/70 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] uppercase text-[#414846] flex items-center gap-1.5 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#3d6659]" />
                        Formule / Aile
                      </span>
                      <span className="text-[11px] text-[#3d6659] font-semibold">
                        Modifier
                      </span>
                    </div>
                    <select
                      value={destinationSlug}
                      onChange={(e) => setDestinationSlug(e.target.value)}
                      className="w-full bg-transparent text-[18px] text-[#001510] font-semibold focus:outline-none cursor-pointer"
                    >
                      {DESTINATION_OPTIONS.map((dest) => (
                        <option key={dest.slug} value={dest.slug}>
                          {dest.label}
                        </option>
                      ))}
                    </select>
                    <span className="text-[12px] text-[#414846] mt-1">
                      {destinationMeta.address}
                    </span>
                  </label>

                  <div className="bg-[#f4f3f0] rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] uppercase text-[#414846] flex items-center gap-1.5 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#3d6659]" />
                        Durée du Séjour
                      </span>
                      <span className="text-[11px] bg-[#e3e2e0] px-2.5 py-0.5 rounded-full text-[#1a1c1a] font-semibold">
                        {nights} {nights === 1 ? "Nuit" : "Nuits"}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[19px] text-[#001510] font-semibold">
                        {formattedCheckIn} – {formattedCheckOut}
                      </span>
                      <span className="text-[13px] text-[#414846]">
                        {formattedYear}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#414846] mt-1">
                      Arrivée flexible : à partir de 15h00
                    </span>
                  </div>
                </div>

                {/* Inline Calendar & Guest Selector Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Interactive Calendar Visualizer */}
                  <div className="md:col-span-7 bg-[#f4f3f0] rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[14px] font-bold text-[#001510] capitalize">
                        {format(calendarMonth, "MMMM yyyy", { locale: fr })}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label="Mois précédent"
                          onClick={() =>
                            setCalendarMonth((m) => subMonths(m, 1))
                          }
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#e3e2e0] text-[#1a1c1a] cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Mois suivant"
                          onClick={() =>
                            setCalendarMonth((m) => addMonths(m, 1))
                          }
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#e3e2e0] text-[#1a1c1a] cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 text-center text-[11px] text-[#414846] mb-2 font-medium">
                      <span>Lu</span>
                      <span>Ma</span>
                      <span>Me</span>
                      <span>Je</span>
                      <span>Ve</span>
                      <span>Sa</span>
                      <span>Di</span>
                    </div>

                    <div className="grid grid-cols-7 gap-y-1 text-center text-[12px]">
                      {Array.from({ length: mondayOffset }).map((_, idx) => (
                        <span key={`pad-${idx}`} className="py-1.5" />
                      ))}
                      {daysInMonth.map((day) => {
                        const iso = format(day, "yyyy-MM-dd");
                        const disabled = isBefore(day, today);
                        const isStart = iso === checkIn;
                        const isEnd = iso === checkOut;
                        const inRange = iso > checkIn && iso < checkOut;

                        return (
                          <button
                            key={iso}
                            type="button"
                            disabled={disabled}
                            onClick={() => handleDayClick(day)}
                            className={`py-1.5 font-medium transition-colors cursor-pointer ${
                              disabled
                                ? "text-[#727975]/45 cursor-not-allowed"
                                : isStart && isEnd
                                  ? "bg-[#001510] text-white rounded-full font-bold"
                                  : isStart
                                    ? "bg-[#001510] text-white rounded-l-full font-bold shadow-sm"
                                    : isEnd
                                      ? "bg-[#001510] text-white rounded-r-full font-bold shadow-sm"
                                      : inRange
                                        ? "bg-[#bce9d9] text-[#002018]"
                                        : "text-[#414846] hover:bg-[#e3e2e0] rounded-full"
                            }`}
                          >
                            {format(day, "d")}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Guest Configuration */}
                  <div className="md:col-span-5 bg-[#f4f3f0] rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <span className="text-[14px] font-bold text-[#001510]">
                      Nombre de Voyageurs
                    </span>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[13px] font-semibold text-[#001510]">
                          Adultes
                        </p>
                        <p className="text-[12px] text-[#414846]">13 ans et +</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label="Diminuer le nombre d'adultes"
                          onClick={() => setAdults((a) => Math.max(1, a - 1))}
                          className="w-8 h-8 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#1a1c1a] hover:bg-[#e3e2e0] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[18px] text-[#001510] font-bold w-5 text-center">
                          {adults}
                        </span>
                        <button
                          type="button"
                          aria-label="Augmenter le nombre d'adultes"
                          onClick={() =>
                            setAdults((a) => (adults + children < 8 ? a + 1 : a))
                          }
                          className="w-8 h-8 rounded-full bg-[#001510] text-white flex items-center justify-center hover:bg-[#0d2b24] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[13px] font-semibold text-[#001510]">
                          Enfants
                        </p>
                        <p className="text-[12px] text-[#414846]">0 à 12 ans</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label="Diminuer le nombre d'enfants"
                          onClick={() =>
                            setChildren((c) => Math.max(0, c - 1))
                          }
                          className="w-8 h-8 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#1a1c1a] hover:bg-[#e3e2e0] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[18px] text-[#001510] font-bold w-5 text-center">
                          {children}
                        </span>
                        <button
                          type="button"
                          aria-label="Augmenter le nombre d'enfants"
                          onClick={() =>
                            setChildren((c) =>
                              adults + children < 8 ? c + 1 : c
                            )
                          }
                          className="w-8 h-8 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#1a1c1a] hover:bg-[#e3e2e0] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[13px] font-semibold text-[#001510]">
                          Chambres / Suites
                        </p>
                        <p className="text-[12px] text-[#414846]">
                          Espaces réservés
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label="Diminuer le nombre de chambres"
                          onClick={() =>
                            setSuitesCount((s) => Math.max(1, s - 1))
                          }
                          className="w-8 h-8 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#1a1c1a] hover:bg-[#e3e2e0] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[18px] text-[#001510] font-bold w-5 text-center">
                          {suitesCount}
                        </span>
                        <button
                          type="button"
                          aria-label="Augmenter le nombre de chambres"
                          onClick={() =>
                            setSuitesCount((s) => Math.min(4, s + 1))
                          }
                          className="w-8 h-8 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#1a1c1a] hover:bg-[#e3e2e0] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VIP Promo Code Row */}
                <div className="pt-1 space-y-2">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative w-full">
                      <Ticket className="w-4 h-4 text-[#3d6659] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Code privilège ou tarif entreprise (ex. KINGSBED)"
                        className="w-full bg-[#f4f3f0] pl-11 pr-4 py-3 rounded-full text-[14px] text-[#1a1c1a] placeholder:text-[#414846]/70 focus:outline-none focus:ring-2 focus:ring-[#3d6659]/40 transition-all"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#e9e8e5] text-[#001510] text-[14px] font-semibold hover:bg-[#001510] hover:text-white transition-all shrink-0 cursor-pointer"
                    >
                      Appliquer
                    </button>
                  </div>
                  {promoFeedback && (
                    <p
                      className={`text-[12px] font-medium px-2 ${
                        appliedPromo ? "text-[#3d6659]" : "text-[#ba1a1a]"
                      }`}
                    >
                      {promoFeedback}
                    </p>
                  )}
                </div>
              </div>

              {/* STEP 2: Select Your Private Sanctuary */}
              <div id="step-2" className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#3d6659] font-semibold">
                      Étape 2 sur 5
                    </span>
                    <h2 className="text-[24px] font-semibold text-[#001510]">
                      Choisissez Votre Chambre ou Suite
                    </h2>
                  </div>
                  <span className="text-[13px] text-[#414846]">
                    {displayedRooms.length} hébergements affichés
                  </span>
                </div>

                <div className="space-y-4">
                  {displayedRooms.map((room) => {
                    const isSelected = room.slug === selectedRoom.slug;
                    const nightlyUsd = room.pricePerNight;
                    const availItem = availability?.find(
                      (a) => a.roomSlug === room.slug
                    );
                    const canFitGuests = totalGuests <= room.maxGuests;
                    const available = availItem
                      ? availItem.available
                      : canFitGuests;

                    return (
                      <div
                        key={room.slug}
                        onClick={() => {
                          setSelectedRoomSlug(room.slug);
                          setActiveStep(2);
                        }}
                        className={`bg-white rounded-3xl p-6 relative overflow-hidden transition-all duration-300 cursor-pointer border ${
                          isSelected
                            ? "shadow-[0_12px_36px_-6px_rgba(13,43,36,0.12)] border-[#0d2b24]/30"
                            : "shadow-sm hover:shadow-[0_12px_36px_-6px_rgba(13,43,36,0.06)] border-[#1a1c1a]/5"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 right-0 bg-[#0d2b24] text-white px-5 py-1.5 rounded-bl-2xl text-[11px] font-semibold flex items-center gap-1.5 z-10">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Choix Actif
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                          <div className="md:col-span-5 h-52 rounded-2xl overflow-hidden relative group bg-[#efeeeb]">
                            <SuiteImage
                              src={room.image}
                              alt={room.name}
                              sizes="(max-width: 768px) 100vw, 320px"
                              className="group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute bottom-3 left-3 bg-[#faf9f6]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#001510]">
                              {room.sizeSqm} m² •{" "}
                              {room.bedType.split("·")[0].trim()}
                            </span>
                          </div>

                          <div className="md:col-span-7 flex flex-col justify-between space-y-3.5">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[11px] uppercase text-[#3d6659] font-semibold">
                                  {room.badgeLabel ?? "Suite Signature"}
                                </span>
                                <div className="flex items-center text-amber-500 text-[12px]">
                                  <Star className="w-3.5 h-3.5 fill-current" />
                                  <span className="text-[11px] font-bold text-[#1a1c1a] ml-1">
                                    {(room.rating ?? 4.95)
                                      .toFixed(2)
                                      .replace(/\.00$/, ".0")}{" "}
                                    ({room.reviewCount ?? 84} avis)
                                  </span>
                                </div>
                              </div>
                              <h3 className="text-[20px] font-bold text-[#001510]">
                                {room.name}
                              </h3>
                              <p className="text-[13px] text-[#414846] mt-1">
                                {room.tagline}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {room.amenities.slice(0, 3).map((amenity, idx) => (
                                <span
                                  key={amenity}
                                  className="px-2.5 py-1 rounded-full bg-[#f4f3f0] text-[11px] text-[#414846] flex items-center gap-1"
                                >
                                  {idx === 0 ? (
                                    <Waves className="w-3 h-3" />
                                  ) : idx === 1 ? (
                                    <Sparkles className="w-3 h-3" />
                                  ) : (
                                    <Wifi className="w-3 h-3" />
                                  )}
                                  {amenity}
                                </span>
                              ))}
                            </div>

                            {!available && (
                              <p className="text-[12px] font-medium text-[#ba1a1a]">
                                {!canFitGuests
                                  ? `Capacité maximale : ${room.maxGuests} personnes.`
                                  : "Indisponible pour ces dates."}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-2">
                              <div>
                                <div className="flex items-baseline gap-1">
                                  <span className="text-[24px] text-[#001510] font-bold">
                                    {nightlyUsd.toLocaleString("fr-FR")} F CFA
                                  </span>
                                  <span className="text-[13px] text-[#414846]">
                                    / nuit
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#3d6659] font-semibold">
                                  Accueil chaleureux &amp; Wi-Fi fibre pro inclus
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRoomSlug(room.slug);
                                  setActiveStep(3);
                                }}
                                className={`px-6 py-2.5 rounded-full text-[13px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#001510] text-white shadow-sm"
                                    : "bg-[#e9e8e5] text-[#001510] hover:bg-[#001510] hover:text-white"
                                }`}
                              >
                                {isSelected ? (
                                  <>
                                    Sélectionnée <Check className="w-4 h-4" />
                                  </>
                                ) : (
                                  "Choisir"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Guest Details */}
              <div
                id="step-3"
                className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_12px_36px_-6px_rgba(13,43,36,0.06)] border border-[#1a1c1a]/5 space-y-6"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#3d6659] font-semibold">
                    Étape 3 sur 5
                  </span>
                  <h2 className="text-[24px] font-semibold text-[#001510]">
                    Coordonnées &amp; Informations d&apos;Arrivée
                  </h2>
                  <p className="text-[13px] text-[#414846] mt-1">
                    Votre confirmation de réservation et votre accès digital
                    seront envoyés à cette adresse.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="guest-first-name"
                      className="text-[12px] font-medium text-[#414846] block ml-1"
                    >
                      Prénom *
                    </label>
                    <input
                      id="guest-first-name"
                      type="text"
                      placeholder="Camille"
                      onFocus={() => setActiveStep(3)}
                      className="w-full h-12 rounded-2xl bg-[#f4f3f0] px-4 text-[14px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none focus:ring-2 focus:ring-[#3d6659]/40"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-[12px] text-[#ba1a1a] ml-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="guest-last-name"
                      className="text-[12px] font-medium text-[#414846] block ml-1"
                    >
                      Nom *
                    </label>
                    <input
                      id="guest-last-name"
                      type="text"
                      placeholder="Laurent"
                      onFocus={() => setActiveStep(3)}
                      className="w-full h-12 rounded-2xl bg-[#f4f3f0] px-4 text-[14px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none focus:ring-2 focus:ring-[#3d6659]/40"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-[12px] text-[#ba1a1a] ml-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="guest-email"
                      className="text-[12px] font-medium text-[#414846] block ml-1"
                    >
                      Adresse E-mail *
                    </label>
                    <input
                      id="guest-email"
                      type="email"
                      placeholder="camille@exemple.fr"
                      onFocus={() => setActiveStep(3)}
                      className="w-full h-12 rounded-2xl bg-[#f4f3f0] px-4 text-[14px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none focus:ring-2 focus:ring-[#3d6659]/40"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-[12px] text-[#ba1a1a] ml-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="guest-phone"
                      className="text-[12px] font-medium text-[#414846] block ml-1"
                    >
                      Téléphone Direct *
                    </label>
                    <input
                      id="guest-phone"
                      type="tel"
                      placeholder="+229 01 62 34 56 78"
                      onFocus={() => setActiveStep(3)}
                      className="w-full h-12 rounded-2xl bg-[#f4f3f0] px-4 text-[14px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none focus:ring-2 focus:ring-[#3d6659]/40"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-[12px] text-[#ba1a1a] ml-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="guest-notes"
                    className="text-[12px] font-medium text-[#414846] block ml-1"
                  >
                    Préférences &amp; Demandes Spéciales (Optionnel)
                  </label>
                  <textarea
                    id="guest-notes"
                    rows={3}
                    placeholder="Préférence d'oreillers, heure d'arrivée, allergies petit-déjeuner ou besoins de salle de réunion..."
                    onFocus={() => setActiveStep(3)}
                    className="w-full rounded-2xl bg-[#f4f3f0] p-4 text-[14px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none focus:ring-2 focus:ring-[#3d6659]/40"
                    {...register("notes")}
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded accent-[#001510]"
                    {...register("acceptTerms")}
                  />
                  <span className="text-[13px] text-[#414846] leading-relaxed">
                    J&apos;accepte les{" "}
                    <Link
                      href="/legal/terms"
                      className="text-[#001510] underline font-medium"
                    >
                      conditions de réservation
                    </Link>{" "}
                    et la{" "}
                    <Link
                      href="/legal/privacy"
                      className="text-[#001510] underline font-medium"
                    >
                      politique de confidentialité et d&apos;annulation
                    </Link>{" "}
                    (annulation gratuite jusqu&apos;à 48 heures avant l&apos;arrivée).
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-[12px] text-[#ba1a1a]">
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>

              {/* STEP 4: Elevate Your Itinerary (Bespoke Add-ons) */}
              <div
                id="step-4"
                className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_12px_36px_-6px_rgba(13,43,36,0.06)] border border-[#1a1c1a]/5 space-y-6"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#3d6659] font-semibold">
                    Étape 4 sur 5
                  </span>
                  <h2 className="text-[24px] font-semibold text-[#001510]">
                    Personnalisez Votre Séjour
                  </h2>
                  <p className="text-[13px] text-[#414846] mt-1">
                    Options de petit-déjeuner, transfert et espaces professionnels préparés avant votre arrivée.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 rounded-2xl bg-[#f4f3f0] hover:bg-[#e9e8e5]/70 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={addOns.chauffeur}
                        onChange={() => toggleAddOn("chauffeur")}
                        className="w-5 h-5 rounded accent-[#001510]"
                      />
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          addOns.chauffeur
                            ? "bg-[#bce9d9] text-[#002018]"
                            : "bg-[#e3e2e0] text-[#1a1c1a]"
                        }`}
                      >
                        <Car className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#001510]">
                          Transfert Privé avec Chauffeur
                        </h4>
                        <p className="text-[13px] text-[#414846]">
                          Berline Mercedes avec accueil VIP à la gare ou à l&apos;aéroport
                        </p>
                      </div>
                    </div>
                    <div className="text-right pl-4 shrink-0">
                      <span className="text-[18px] text-[#001510] font-bold">
                        +80 000 F CFA
                      </span>
                      <span className="block text-[11px] text-[#414846]">
                        Trajet simple
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-2xl bg-[#f4f3f0] hover:bg-[#e9e8e5]/70 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={addOns.breakfast}
                        onChange={() => toggleAddOn("breakfast")}
                        className="w-5 h-5 rounded accent-[#001510]"
                      />
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          addOns.breakfast
                            ? "bg-[#bce9d9] text-[#002018]"
                            : "bg-[#e3e2e0] text-[#1a1c1a]"
                        }`}
                      >
                        <UtensilsCrossed className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#001510]">
                          Petit-Déjeuner Artisanal Quotidien
                        </h4>
                        <p className="text-[13px] text-[#414846]">
                          Viennoiseries chaudes, œufs à la minute et jus frais servis en salle ou en chambre
                        </p>
                      </div>
                    </div>
                    <div className="text-right pl-4 shrink-0">
                      <span className="text-[18px] text-[#001510] font-bold">
                        +30 000 F CFA
                      </span>
                      <span className="block text-[11px] text-[#414846]">
                        par pers. / jour
                      </span>
                    </div>
                  </label>

                </div>
              </div>
            </div>

            {/* RIGHT FLOATING BOOKING BREAKDOWN PANEL */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-5">
              <div className="bg-white rounded-3xl p-6 md:p-7 shadow-[0_20px_48px_-8px_rgba(13,43,36,0.12)] border border-[#1a1c1a]/5 space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#bce9d9] flex items-center justify-center text-[#002018] shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-bold text-[#001510] leading-tight">
                        Récapitulatif
                      </h3>
                      <span className="text-[11px] text-[#3d6659] font-medium">
                        En attente de validation
                      </span>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0 relative bg-[#efeeeb]">
                    <SuiteImage
                      src={selectedRoom.image}
                      alt={selectedRoom.name}
                      sizes="64px"
                    />
                  </div>
                </div>

                {/* Stay Specs */}
                <div className="space-y-2.5 bg-[#f4f3f0] rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] text-[#414846]">
                      Formule
                    </span>
                    <span className="text-[12px] font-bold text-[#001510]">
                      {destinationMeta.shortLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] text-[#414846]">Arrivée</span>
                    <span className="text-[12px] font-bold text-[#001510]">
                      {format(parseISO(checkIn), "dd.MM.yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] text-[#414846]">
                      Départ
                    </span>
                    <span className="text-[12px] font-bold text-[#001510]">
                      {format(parseISO(checkOut), "dd.MM.yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] text-[#414846]">Hôtes</span>
                    <span className="text-[12px] font-bold text-[#001510]">
                      {adults} {adults > 1 ? "Adultes" : "Adulte"}
                      {children > 0 ? `, ${children} ${children > 1 ? "Enfants" : "Enfant"}` : ""} •{" "}
                      {suitesCount} {suitesCount > 1 ? "Chambres" : "Chambre"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] text-[#414846]">
                      Hébergement
                    </span>
                    <span className="text-[12px] font-bold text-[#3d6659] text-right">
                      {selectedRoom.name}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center text-[13px] text-[#414846]">
                    <span>
                      {selectedRoom.pricePerNight.toLocaleString("fr-FR")} F CFA × {nights}{" "}
                      {nights > 1 ? "Nuits" : "Nuit"}{suitesCount > 1 ? ` × ${suitesCount}` : ""}
                    </span>
                    <span className="font-semibold text-[#001510]">
                      {formatCurrencyXof(roomSubtotalXof)}
                    </span>
                  </div>
                  {addOns.chauffeur && (
                    <div className="flex justify-between items-center text-[13px] text-[#414846]">
                      <span>Transfert avec Chauffeur</span>
                      <span className="font-semibold text-[#001510]">
                        {formatCurrencyXof(chauffeurXof)}
                      </span>
                    </div>
                  )}
                  {addOns.breakfast && (
                    <div className="flex justify-between items-center text-[13px] text-[#414846]">
                      <span>
                        Petit-Déjeuner ({totalGuests} pers. × {nights} j.)
                      </span>
                      <span className="font-semibold text-[#001510]">
                        {formatCurrencyXof(breakfastXof)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-[13px] text-[#414846]">
                    <span>Taxes de séjour &amp; Services (10%)</span>
                    <span className="font-semibold text-[#001510]">
                      {formatCurrencyXof(taxXof)}
                    </span>
                  </div>
                  {discountXof > 0 && (
                    <div className="flex justify-between items-center text-[13px] text-[#3d6659] font-medium">
                      <span>Avantage Membre</span>
                      <span>-{formatCurrencyXof(discountXof)}</span>
                    </div>
                  )}

                  <div className="pt-3 mt-2 border-t border-[#e9e8e5] flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wide text-[#414846]">
                        Montant Total
                      </span>
                      <p className="text-[11px] text-[#3d6659]">
                        Taxes et frais de dossier inclus
                      </p>
                    </div>
                    <span className="text-[24px] text-[#001510] font-bold">
                      {formatCurrencyXof(grandTotalXof)}
                    </span>
                  </div>
                </div>

                {/* Add to Calendar Bar */}
                <div className="space-y-2">
                  <span className="text-[11px] text-[#414846] block">
                    Ajouter à votre agenda :
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadIcs}
                      className="py-2.5 rounded-full bg-[#efeeeb] flex items-center justify-center hover:bg-[#e9e8e5] transition-colors text-[#001510] text-[12px] font-bold gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Apple
                    </button>
                    <a
                      href={googleCalendarHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 rounded-full bg-[#efeeeb] flex items-center justify-center hover:bg-[#e9e8e5] transition-colors text-[#001510] text-[12px] font-bold gap-1.5"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      Google
                    </a>
                    <button
                      type="button"
                      onClick={handleDownloadIcs}
                      className="py-2.5 rounded-full bg-[#efeeeb] flex items-center justify-center hover:bg-[#e9e8e5] transition-colors text-[#001510] text-[12px] font-bold gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      .ICS
                    </button>
                  </div>
                </div>

                {bookingError && (
                  <p className="p-3 rounded-xl bg-[#ffdad6] text-[#93000a] text-[13px] font-medium">
                    {bookingError}
                  </p>
                )}

                {/* Payment Express Actions */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isSelectedAvailable}
                    className="w-full py-3.5 px-6 rounded-full bg-[#001510] text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-[#0d2b24] shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? "Confirmation en cours..."
                        : `Confirmer la Réservation • ${formatCurrencyXof(grandTotalXof)}`}
                    </span>
                  </button>

                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#e3e2e0] bg-[#faf9f6] px-4 py-3 text-center">
                    <Banknote className="w-4 h-4 text-[#3d6659] shrink-0" strokeWidth={1.75} />
                    <span className="text-[12px] font-medium text-[#414846]">
                      Règlement à l&apos;arrivée — espèces, carte bancaire ou Mobile Money
                    </span>
                  </div>
                </div>

                {/* Guarantee Badges */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2.5">
                    <BadgeCheck className="w-4 h-4 text-[#3d6659] shrink-0" />
                    <span className="text-[12px] text-[#414846]">
                      <strong className="text-[#001510] font-semibold">
                        Meilleur Tarif Garanti
                      </strong>{" "}
                      — Réservation directe à l&apos;hôtel
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RefreshCw className="w-4 h-4 text-[#3d6659] shrink-0" />
                    <span className="text-[12px] text-[#414846]">
                      <strong className="text-[#001510] font-semibold">
                        Annulation Flexible
                      </strong>{" "}
                      — Remboursement à 100% jusqu&apos;à 48h avant
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-[#3d6659] shrink-0" />
                    <span className="text-[12px] text-[#414846]">
                      <strong className="text-[#001510] font-semibold">
                        Accueil &amp; Suivi VIP
                      </strong>{" "}
                      — Coordination immédiate à la réception
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Help Card */}
              <div className="bg-[#f4f3f0] rounded-3xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#e3e2e0] flex items-center justify-center text-[#001510] shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#001510]">
                    Besoin d&apos;une organisation sur mesure ?
                  </h4>
                  <p className="text-[13px] text-[#414846]">
                    Échangez avec notre équipe séjour &amp; séminaires.
                  </p>
                  <Link
                    href="/contact"
                    className="text-[12px] text-[#3d6659] font-bold inline-flex items-center gap-1 mt-1 hover:underline"
                  >
                    Appeler le +229 01 42 68 90 00
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>

      {/* Destination Quick Switch Strip */}
      <section className="w-full py-14 bg-white border-t border-[#EDEDEA]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#3d6659] font-semibold">
                Tout en Un Lieu
              </span>
              <h3 className="text-[32px] sm:text-[40px] leading-[1.15] font-medium text-[#001510] tracking-tight">
                L&apos;Expérience Complète King&apos;s Bed Hotel
              </h3>
            </div>
            <p className="text-[15px] text-[#414846] max-w-md">
              Combinez votre chambre avec nos petits-déjeuners artisanaux et nos
              salles de réunion ou de conférence dédiées.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GLOBAL_SANCTUARIES.map((item) => (
              <Link
                key={item.slug}
                href={
                  item.slug === "lisbon"
                    ? "/rooms"
                    : item.slug === "positano"
                      ? "/services"
                      : "/contact"
                }
                className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
              >
                <SuiteImage
                  src={item.image}
                  alt={item.title}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/85 via-[#001510]/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[12px] font-bold text-[#001510] shadow-sm">
                    Découvrir
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] uppercase text-[#bce9d9] tracking-wider font-semibold">
                      {item.country}
                    </span>
                    <h4 className="text-[20px] text-white font-bold">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-white/80">{item.price}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white text-[#001510] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
