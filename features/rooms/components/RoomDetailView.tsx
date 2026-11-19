"use client";

import {
  ArrowRight,
  AudioLines,
  BadgeCheck,
  BedDouble,
  Bookmark,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Headphones,
  Images,
  Info,
  Leaf,
  LogIn,
  LogOut,
  MapPin,
  Maximize2,
  MessageSquare,
  Mountain,
  PawPrint,
  Share2,
  Shield,
  Gift,
  Star,
  Trees,
  Users,
  Waves,
  Wifi,
  Wine,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { DialogModal } from "@/components/ui/DialogModal";
import { useBookingStore } from "@/features/booking/store/booking.store";
import { getDefaultFutureDates } from "@/lib/utils/format-date";
import { calculateNights } from "@/lib/utils/nights";
import type { Room } from "@/types/hotel.types";

interface RoomDetailViewProps {
  room: Room;
  similarRooms: Room[];
}

export function RoomDetailView({ room, similarRooms }: RoomDetailViewProps) {
  const router = useRouter();
  const setDraft = useBookingStore((s) => s.setDraft);
  const defaults = getDefaultFutureDates();

  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [guests, setGuests] = useState(Math.min(2, room.maxGuests));
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [held, setHeld] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [blueprintOpen, setBlueprintOpen] = useState(false);

  const nightlyXof = room.pricePerNight;
  const originalXof =
    room.originalPricePerNight ?? Math.round(room.pricePerNight * 1.12);
  const sqft = Math.round(room.sizeSqm * 10.764);
  const nights = Math.max(1, calculateNights(checkIn, checkOut) || 5);
  const roomSubtotal = nightlyXof * nights;
  const ecoTax = Math.round(roomSubtotal * 0.1);
  const memberPrivilege = 100000;
  const totalInvestment = Math.max(0, roomSubtotal + ecoTax - memberPrivilege);

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleReserve = () => {
    setDraft({
      roomSlug: room.slug,
      destinationSlug: room.destinationSlug,
      checkIn,
      checkOut,
      guests,
    });
    const params = new URLSearchParams({
      room: room.slug,
      checkIn,
      checkOut,
      guests: String(guests),
    });
    router.push(`/account/reservation?${params.toString()}`);
  };

  const mainPhoto = room.gallery[0] ?? room.image;
  const topSidePhoto = room.gallery[1] ?? "/images/hero/hero-pool.jpg";
  const bottomSidePhoto = room.gallery[2] ?? "/images/rooms/stone-spa-bath.jpg";

  return (
    <div className="bg-white text-[#1a1c1a]">
      {/* Top Breadcrumb & Page Meta Anchor */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-2 text-[12px] font-medium text-[#414846]"
          >
            <Link href="/" className="hover:text-[#001510] transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/rooms"
              className="hover:text-[#001510] transition-colors"
            >
              Chambres &amp; Suites
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#001510] font-semibold">{room.name}</span>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4f3f0] hover:bg-[#efeeeb] text-[#414846] hover:text-[#1a1c1a] text-[12px] font-medium transition-all shadow-sm cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? "Lien Copié" : "Partager"}</span>
            </button>
            <button
              type="button"
              onClick={() => setSaved((s) => !s)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4f3f0] hover:bg-[#efeeeb] text-[#414846] hover:text-[#1a1c1a] text-[12px] font-medium transition-all shadow-sm cursor-pointer"
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  saved ? "text-[#3d6659] fill-current" : ""
                }`}
              />
              <span>{saved ? "Enregistrée" : "Sauvegarder"}</span>
            </button>
          </div>
        </div>

        {/* Title and Sub-header Line */}
        <div className="mt-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e9e8e5] text-[#001510] text-[12px] font-medium tracking-[0.02em] mb-2">
              <BedDouble className="w-3.5 h-3.5 text-[#3d6659]" strokeWidth={1.75} />
              <span>Collection King&apos;s Bed Hotel • Chambre 04B</span>
            </div>
            <h1 className="text-[32px] sm:text-[40px] leading-[1.15] font-medium tracking-[-0.02em] text-[#001510]">
              {room.name}
            </h1>
            <p className="text-[15px] text-[#414846] mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#3d6659] shrink-0" />
              <span>{room.destinationName} • Disponible Immédiatement</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4f3f0] text-[#001510]">
              <Star className="w-4 h-4 text-[#b18456] fill-current" />
              <span className="text-[14px] font-semibold">
                {(room.rating ?? 4.98).toFixed(2).replace(/\.00$/, ".0")}
              </span>
              <span className="text-[13px] text-[#414846]">
                ({room.reviewCount ?? 124} avis vérifiés)
              </span>
            </div>
            <span className="text-[#414846] text-[11px] font-semibold px-3.5 py-2 rounded-full bg-[#e9e8e5]">
              Petit-Déjeuner Inclus
            </span>
          </div>
        </div>
      </section>

      {/* Photographic Gallery Header (Asymmetric Layout) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-2 pb-8">
        <Reveal>
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(13,43,36,0.06)] bg-[#f4f3f0] p-2">
            {/* Main Large Frame */}
            <div
              onClick={() => {
                setActivePhoto(0);
                setGalleryOpen(true);
              }}
              className="lg:col-span-8 relative group rounded-2xl overflow-hidden min-h-[360px] lg:min-h-[500px] cursor-pointer"
            >
              <SuiteImage
                src={mainPhoto}
                alt={room.name}
                sizes="(max-width: 1024px) 100vw, 820px"
                priority
                className="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/65 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#c9eade] block mb-1">
                  Aile Prestige
                </span>
                <h2 className="text-[22px] sm:text-[24px] font-semibold text-white">
                  Chambre Principale Lumineuse
                </h2>
                <p className="text-[13px] text-white/85 max-w-md mt-1">
                  Baies vitrées à isolation acoustique donnant sur la terrasse
                  privée et les jardins de l&apos;hôtel.
                </p>
              </div>
            </div>

            {/* Stacked Right Column */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div
                onClick={() => {
                  setActivePhoto(1);
                  setGalleryOpen(true);
                }}
                className="relative group rounded-2xl overflow-hidden min-h-[210px] lg:min-h-[242px] cursor-pointer"
              >
                <SuiteImage
                  src={topSidePhoto}
                  alt="Bassin & Terrasse Chauffée"
                  sizes="(max-width: 1024px) 50vw, 400px"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-[12px] font-semibold text-white">
                      Bassin &amp; Détente
                    </p>
                    <p className="text-[12px] text-[#bce9d9]">
                      Eau minérale chauffée toute l&apos;année
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Waves className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div
                onClick={() => {
                  setActivePhoto(2);
                  setGalleryOpen(true);
                }}
                className="relative group rounded-2xl overflow-hidden min-h-[210px] lg:min-h-[242px] cursor-pointer"
              >
                <SuiteImage
                  src={bottomSidePhoto}
                  alt="Salle de Bain en Pierre Naturelle"
                  sizes="(max-width: 1024px) 50vw, 400px"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-[12px] font-semibold text-white">
                      Salle de Bain
                    </p>
                    <p className="text-[12px] text-[#bce9d9]">
                      Soins botaniques &amp; douche pluie
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Gift className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Trigger Overlay Pill Button */}
            <button
              type="button"
              onClick={() => {
                setActivePhoto(0);
                setGalleryOpen(true);
              }}
              className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#001510] text-[12px] font-semibold hover:bg-white transition-all shadow-md cursor-pointer"
            >
              <Images className="w-4 h-4" />
              <span>Voir les {room.gallery.length} photos</span>
            </button>
          </div>
        </Reveal>
      </section>

      {/* Two-Column Main Content & Lateral Booking Panel Layout */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-6">
            {/* Key Suite Specs Ribbon */}
            <div className="w-full bg-[#f4f3f0] rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e3e2e0] flex items-center justify-center text-[#001510] shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-[#414846]">
                    Surface Intérieure
                  </span>
                  <span className="text-[13px] font-semibold text-[#001510]">
                    {room.sizeSqm} m² ({sqft} sq ft)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e3e2e0] flex items-center justify-center text-[#001510] shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-[#414846]">
                    Capacité
                  </span>
                  <span className="text-[13px] font-semibold text-[#001510]">
                    {room.maxGuests} Hôtes Max
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e3e2e0] flex items-center justify-center text-[#001510] shrink-0">
                  <BedDouble className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-[#414846]">
                    Literie
                  </span>
                  <span className="text-[13px] font-semibold text-[#001510]">
                    {room.bedType.split("·")[0].trim()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e3e2e0] flex items-center justify-center text-[#001510] shrink-0">
                  <Mountain className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-[#414846]">
                    Exposition
                  </span>
                  <span className="text-[13px] font-semibold text-[#001510]">
                    {room.horizonView ?? "Vue Panoramique"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e3e2e0] flex items-center justify-center text-[#001510] shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-[#414846]">
                    Service
                  </span>
                  <span className="text-[13px] font-semibold text-[#001510]">
                    Conciergerie 24/7
                  </span>
                </div>
              </div>
            </div>

            {/* Architectural & Interior Narrative */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#1a1c1a]/5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[20px] font-semibold text-[#001510]">
                  Architecture &amp; Art de Vivre
                </h3>
                <span className="text-[11px] font-semibold text-[#3d6659] uppercase tracking-widest">
                  Signé King&apos;s Bed Design
                </span>
              </div>

              <p className="text-[17px] leading-[1.6] text-[#414846]">
                {room.description}
              </p>
              <p className="text-[15px] leading-[1.6] text-[#414846]">
                Conçue pour allier repos profond et efficacité professionnelle,
                cette chambre dispose d&apos;un matelas King Size sur mesure, d&apos;un
                espace bureau calme et d&apos;un accès prioritaire au salon
                petit-déjeuner ainsi qu&apos;aux salles de réunion de l&apos;hôtel.
              </p>

              <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#f4f3f0] flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-[#3d6659] mb-2">
                    <Trees className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">
                      Matériaux Nobles
                    </span>
                  </div>
                  <p className="text-[13px] text-[#414846]">
                    Boiseries en chêne, enduits naturels à la chaux et linge en
                    lin tissé avec soin.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4f3f0] flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-[#3d6659] mb-2">
                    <AudioLines className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">
                      Silence Acoustique
                    </span>
                  </div>
                  <p className="text-[13px] text-[#414846]">
                    Isolation phonique renforcée 42 dB pour un sommeil réparateur
                    à toute heure.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4f3f0] flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-[#3d6659] mb-2">
                    <Leaf className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">
                      Confort Thermique
                    </span>
                  </div>
                  <p className="text-[13px] text-[#414846]">
                    Climatisation silencieuse et régulation naturelle de la
                    lumière du jour.
                  </p>
                </div>
              </div>
            </div>

            {/* In-Suite Curations & Amenities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#1a1c1a]/5 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-[20px] font-semibold text-[#001510]">
                    Prestations &amp; Équipements Inclus
                  </h3>
                  <p className="text-[13px] text-[#414846] mt-1">
                    Chaque détail est préparé pour votre confort nocturne, vos
                    matinées gourmandes et vos réunions.
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#3d6659] bg-[#bce9d9]/50 px-3 py-1.5 rounded-full shrink-0">
                  <BadgeCheck className="w-4 h-4" />
                  100 % Prestations Incluses
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#f4f3f0] space-y-3">
                  <div className="flex items-center gap-2 text-[#001510] font-semibold text-[16px]">
                    <BedDouble className="w-5 h-5 text-[#3d6659]" />
                    <span>Sommeil &amp; Literie Royale</span>
                  </div>
                  <ul className="space-y-2 text-[13px] text-[#414846]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Carte d&apos;oreillers sur mesure avec 8 fermetés au choix
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Draps en satin de coton égyptien 600 fils repassés chaque jour
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Occultation totale motorisée et matelas King Size haute densité
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#f4f3f0] space-y-3">
                  <div className="flex items-center gap-2 text-[#001510] font-semibold text-[16px]">
                    <Waves className="w-5 h-5 text-[#3d6659]" />
                    <span>Bien-Être &amp; Salle de Bain</span>
                  </div>
                  <ul className="space-y-2 text-[13px] text-[#414846]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Sèche-cheveux Dyson Supersonic &amp; peignoirs en coton peigné
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Baignoire en pierre naturelle et douche effet pluie tropicale
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Cosmétiques botaniques Aesop renouvelés quotidiennement
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#f4f3f0] space-y-3">
                  <div className="flex items-center gap-2 text-[#001510] font-semibold text-[16px]">
                    <Wine className="w-5 h-5 text-[#3d6659]" />
                    <span>Petit-Déjeuner &amp; Cave</span>
                  </div>
                  <ul className="space-y-2 text-[13px] text-[#414846]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Machine espresso privée avec cafés de spécialité fraîchement torréfiés
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Petit-déjeuner artisanal inclus au salon Orangerie ou en chambre
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Corbeille de fruits frais et viennoiseries maison chaque matin
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#f4f3f0] space-y-3">
                  <div className="flex items-center gap-2 text-[#001510] font-semibold text-[16px]">
                    <Wifi className="w-5 h-5 text-[#3d6659]" />
                    <span>Travail, Réunions &amp; Technologie</span>
                  </div>
                  <ul className="space-y-2 text-[13px] text-[#414846]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Fibre optique dédiée très haut débit (1 Gbps) &amp; espace bureau
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Accès préférentiel aux salles de réunion et conférences de l&apos;hôtel
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Clé mobile digitale sécurisée et système audio Bang &amp; Olufsen
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Floor Plan & Spatial Flow */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#1a1c1a]/5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-[20px] font-semibold text-[#001510]">
                    Plan &amp; Distribution des Espaces
                  </h3>
                  <p className="text-[13px] text-[#414846]">
                    Agencement de plain-pied offrant espace nuit King Size, salle
                    de bain et terrasse privée.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setBlueprintOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#e9e8e5] hover:bg-[#efeeeb] text-[12px] font-semibold text-[#001510] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Voir le Plan Détaillé</span>
                </button>
              </div>

              <div className="w-full bg-[#f4f3f0] rounded-2xl p-6 flex flex-col items-center justify-center">
                {/* Clean Architectural Schematic */}
                <div className="w-full max-w-xl space-y-2">
                  <div className="flex items-center justify-center text-[10px] font-mono tracking-widest text-[#414846] uppercase border-b border-[#414846]/30 pb-1">
                    Façade 14,2 Mètres
                  </div>
                  <div className="border-2 border-dashed border-[#414846]/35 rounded-xl p-3 grid grid-cols-12 gap-3 bg-white/40">
                    {/* Salle de Bain */}
                    <div className="col-span-4 border border-[#414846]/40 rounded-lg p-3 flex flex-col items-center justify-between min-h-[160px]">
                      <div className="w-16 h-24 rounded-full border border-[#414846]/45 flex items-center justify-center text-[9px] font-mono text-[#414846] text-center px-1">
                        BAIN
                      </div>
                      <span className="text-[9px] font-mono tracking-wider text-[#414846] uppercase">
                        Bain &amp; Dressing
                      </span>
                    </div>

                    {/* King Chamber */}
                    <div className="col-span-4 border border-[#414846]/40 rounded-lg p-3 flex flex-col items-center justify-between min-h-[160px]">
                      <div className="w-24 h-24 rounded-md border border-[#414846]/45 p-2 flex flex-col items-center justify-between">
                        <div className="flex gap-2 w-full justify-center">
                          <span className="w-7 h-4 rounded-sm border border-[#414846]/45" />
                          <span className="w-7 h-4 rounded-sm border border-[#414846]/45" />
                        </div>
                        <span className="text-[9px] font-mono text-[#414846] tracking-wider">
                          CHAMBRE KING
                        </span>
                      </div>
                      <span className="text-[9px] font-mono tracking-wider text-[#414846] uppercase">
                        Espace 42 m²
                      </span>
                    </div>

                    {/* Plunge Pool & Open Deck */}
                    <div className="col-span-4 border border-[#414846]/40 rounded-lg p-3 flex flex-col items-center justify-between min-h-[160px] bg-[#bce9d9]/20">
                      <div className="w-full h-20 rounded-lg border border-[#3d6659]/45 bg-[#bce9d9]/30 flex items-center justify-center text-[9px] font-mono text-[#244e42] tracking-wider text-center px-1">
                        TERRASSE &amp; BASSIN
                      </div>
                      <span className="text-[9px] font-mono tracking-wider text-[#414846] uppercase">
                        Terrasse 32 m²
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 justify-center text-[11px] font-semibold text-[#414846]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3d6659]" />
                    Chambre King Size (42 m²)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#bce9d9]" />
                    Salle de Bain (18 m²)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c1c8c4]" />
                    Terrasse &amp; Espace Détente (25 m²)
                  </span>
                </div>
              </div>
            </div>

            {/* Host & Curator Note Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#1a1c1a]/5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-md relative bg-[#efeeeb]">
                  <SuiteImage
                    src="/images/curators/julian.jpg"
                    alt="Julian Von Berg"
                    sizes="80px"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#3d6659] flex items-center justify-center text-white shadow-sm">
                  <Check className="w-3 h-3" />
                </span>
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-[20px] font-semibold text-[#001510]">
                      Julian Von Berg
                    </h4>
                    <p className="text-[11px] font-semibold text-[#414846]">
                      Directeur d&apos;Accueil &amp; Conférences • King&apos;s Bed Hotel
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="px-4 py-2 rounded-full bg-[#f4f3f0] hover:bg-[#efeeeb] text-[#001510] text-[12px] font-semibold transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Écrire à Julian</span>
                  </Link>
                </div>
                <p className="text-[15px] text-[#414846] leading-relaxed">
                  &laquo;&nbsp;Avant votre arrivée au King&apos;s Bed Hotel, notre
                  équipe ajuste votre literie selon vos préférences, prépare votre
                  table de petit-déjeuner et peut réserver une salle de réunion
                  privative pour vos échanges.&nbsp;&raquo;
                </p>
              </div>
            </div>

            {/* House Guidelines & Protocol */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#1a1c1a]/5 space-y-4">
              <h4 className="text-[20px] font-semibold text-[#001510]">
                Informations Pratiques &amp; Accueil
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#f4f3f0]">
                  <div className="flex items-center gap-2 text-[#001510] text-[14px] font-semibold mb-1">
                    <LogIn className="w-4 h-4 text-[#3d6659]" />
                    <span>Arrivée</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#001510]">
                    15h00
                  </p>
                  <p className="text-[13px] text-[#414846] mt-1">
                    Accueil personnalisé 24h/24 et boisson de bienvenue offerte.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4f3f0]">
                  <div className="flex items-center gap-2 text-[#001510] text-[14px] font-semibold mb-1">
                    <LogOut className="w-4 h-4 text-[#3d6659]" />
                    <span>Départ</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#001510]">
                    12h00
                  </p>
                  <p className="text-[13px] text-[#414846] mt-1">
                    Départ tardif offert jusqu&apos;à 14h00 selon disponibilité.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4f3f0]">
                  <div className="flex items-center gap-2 text-[#001510] text-[14px] font-semibold mb-1">
                    <PawPrint className="w-4 h-4 text-[#3d6659]" />
                    <span>Animaux de Compagnie</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#001510]">
                    Sur Demande
                  </p>
                  <p className="text-[13px] text-[#414846] mt-1">
                    Petits compagnons jusqu&apos;à 12 kg bienvenus avec coussin
                    dédié.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Lateral Booking Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="w-full bg-white rounded-3xl p-6 shadow-[0_20px_48px_-8px_rgba(13,43,36,0.12)] border border-[#1a1c1a]/5 space-y-5">
              {/* Pricing Header */}
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <span className="text-[#414846] line-through text-[13px] mr-1.5">
                    {originalXof.toLocaleString("fr-FR")} F CFA
                  </span>
                  <span className="text-[36px] font-bold tracking-tight text-[#001510]">
                    {nightlyXof.toLocaleString("fr-FR")} F CFA
                  </span>
                  <span className="text-[13px] text-[#414846]"> / nuit</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#bce9d9] text-[#244e42] text-[11px] font-semibold">
                  Tarif Direct
                </span>
              </div>

              {/* Interactive Date & Guest Selector Module */}
              <div className="rounded-2xl bg-[#f4f3f0] p-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <label className="p-2.5 rounded-xl bg-white hover:bg-[#faf9f6] transition-colors cursor-pointer block">
                    <span className="block text-[10px] font-semibold text-[#414846] uppercase tracking-wider">
                      Arrivée
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 text-[#001510]">
                      <Calendar className="w-3.5 h-3.5 text-[#3d6659] shrink-0" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-transparent text-[13px] font-semibold text-[#001510] focus:outline-none cursor-pointer"
                      />
                    </div>
                  </label>

                  <label className="p-2.5 rounded-xl bg-white hover:bg-[#faf9f6] transition-colors cursor-pointer block">
                    <span className="block text-[10px] font-semibold text-[#414846] uppercase tracking-wider">
                      Départ
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 text-[#001510]">
                      <Calendar className="w-3.5 h-3.5 text-[#3d6659] shrink-0" />
                      <input
                        type="date"
                        value={checkOut}
                        min={checkIn}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-transparent text-[13px] font-semibold text-[#001510] focus:outline-none cursor-pointer"
                      />
                    </div>
                  </label>
                </div>

                <div className="text-center py-1.5 bg-[#e3e2e0]/60 rounded-lg">
                  <span className="text-[11px] font-medium text-[#001510]">
                    Durée sélectionnée : {nights} {nights === 1 ? "Nuit" : "Nuits"}
                  </span>
                </div>

                <label className="p-2.5 rounded-xl bg-white hover:bg-[#faf9f6] transition-colors flex items-center justify-between cursor-pointer">
                  <div className="w-full">
                    <span className="block text-[10px] font-semibold text-[#414846] uppercase tracking-wider">
                      Occupation
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[#001510]">
                      <Users className="w-3.5 h-3.5 text-[#3d6659] shrink-0" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full bg-transparent text-[14px] font-semibold text-[#001510] focus:outline-none cursor-pointer"
                      >
                        {Array.from(
                          { length: room.maxGuests },
                          (_, i) => i + 1
                        ).map((count) => (
                          <option key={count} value={count}>
                            {count} {count === 1 ? "Adulte" : "Adultes"}, 0 Enfant
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </label>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2.5 pt-1">
                <div className="flex justify-between text-[13px] text-[#414846]">
                  <span>
                    {nightlyXof.toLocaleString("fr-FR")} F CFA × {nights} {nights === 1 ? "Nuit" : "Nuits"}
                  </span>
                  <span className="font-medium text-[#001510]">
                    {roomSubtotal.toLocaleString("fr-FR")} F CFA
                  </span>
                </div>
                <div className="flex justify-between text-[13px] text-[#414846]">
                  <span className="flex items-center gap-1">
                    Petit-Déjeuner &amp; Literie King
                    <Info className="w-3.5 h-3.5 text-[#3d6659]" />
                  </span>
                  <span className="font-medium text-[#3d6659]">
                    Inclus
                  </span>
                </div>
                <div className="flex justify-between text-[13px] text-[#414846]">
                  <span>Taxes de séjour &amp; éco-taxe (10 %)</span>
                  <span className="font-medium text-[#001510]">
                    {ecoTax.toLocaleString("fr-FR")} F CFA
                  </span>
                </div>
                <div className="flex justify-between text-[13px] text-[#3d6659]">
                  <span>Avantage Réservation Directe</span>
                  <span className="font-medium">-{memberPrivilege.toLocaleString("fr-FR")} F CFA</span>
                </div>
                <div className="h-[1px] bg-[#e3e2e0] my-1" />
                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <span className="text-[18px] font-semibold text-[#001510]">
                      Total du Séjour
                    </span>
                    <p className="text-[11px] text-[#414846]">
                      Toutes taxes &amp; petits-déjeuners inclus
                    </p>
                  </div>
                  <span className="text-[24px] font-bold text-[#001510]">
                    {totalInvestment.toLocaleString("fr-FR")} F CFA
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleReserve}
                  className="w-full py-4 rounded-full bg-[#0d2b24] hover:bg-[#001510] text-white text-[14px] font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Réserver Cette Chambre</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => setHeld((h) => !h)}
                  className={`w-full py-3 rounded-full text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    held
                      ? "bg-[#bce9d9] text-[#001510] font-semibold"
                      : "bg-[#f4f3f0] hover:bg-[#efeeeb] text-[#001510]"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>
                    {held
                      ? "Option 48h Activée"
                      : "Poser une Option 48h (Sans Engagement)"}
                  </span>
                </button>
              </div>

              {/* Reservation Micro-Guarantees */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2.5 text-[#414846] text-[13px]">
                  <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0" />
                  <span>Annulation gratuite jusqu&apos;à 48h avant l&apos;arrivée</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#414846] text-[13px]">
                  <Leaf className="w-4 h-4 text-[#3d6659] shrink-0" />
                  <span>Séjour certifié 100 % éco-responsable</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#414846] text-[13px]">
                  <BadgeCheck className="w-4 h-4 text-[#3d6659] shrink-0" />
                  <span>Accès prioritaire petit-déjeuner &amp; salons d&apos;affaires</span>
                </div>
              </div>

              {/* Safe Traveler Notice */}
              <div className="p-3.5 rounded-xl bg-[#f4f3f0] flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#3d6659] shrink-0" />
                <p className="text-[11px] font-medium text-[#414846] leading-tight">
                  Garantie King&apos;s Bed Hotel : réservation sécurisée et
                  modification flexible sans frais cachés.
                </p>
              </div>
            </div>

            {/* Direct Contact Concierge Teaser */}
            <div className="w-full bg-[#f4f3f0] rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#001510] flex items-center justify-center text-white shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#001510]">
                    Besoin d&apos;une Salle ou d&apos;un Devis ?
                  </p>
                  <p className="text-[12px] text-[#414846]">
                    Réunions, séminaires &amp; transferts
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="px-3.5 py-1.5 rounded-full bg-white text-[11px] font-semibold text-[#001510] hover:bg-[#e9e8e5] transition-colors shrink-0"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Sanctuaries Carousel Section */}
      <section className="w-full bg-white border-t border-[#EDEDEA] py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#3d6659] block mb-1">
                Suggestions de l&apos;Hôtel
              </span>
              <h3 className="text-[32px] sm:text-[40px] leading-[1.15] font-medium tracking-[-0.02em] text-[#001510]">
                Autres Chambres &amp; Suites à Découvrir
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/rooms"
                aria-label="Voir toutes les chambres"
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#e9e8e5] text-[#001510] text-[13px] font-semibold shadow-sm transition-colors inline-flex items-center gap-1.5"
              >
                <span>Toutes les Chambres</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarRooms.map((item) => (
              <div
                key={item.slug}
                className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-[#1a1c1a]/5"
              >
                <Link
                  href={`/rooms/${item.slug}`}
                  className="relative h-64 overflow-hidden block"
                >
                  <SuiteImage
                    src={item.image}
                    alt={item.name}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-[#001510] text-[11px] font-semibold">
                    ★ {(item.rating ?? 4.96).toFixed(2).replace(/\.00$/, ".0")}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[11px] font-semibold bg-[#001510]/55 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
                      {item.destinationName.split(",")[0]}
                    </span>
                  </div>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <Link href={`/rooms/${item.slug}`}>
                      <h4 className="text-[20px] font-semibold text-[#001510] group-hover:text-[#3d6659] transition-colors">
                        {item.name}
                      </h4>
                    </Link>
                    <p className="text-[13px] text-[#414846] mt-1">
                      {item.sizeSqm} m² • {item.bedType.split("·")[0].trim()} •{" "}
                      {item.waterFeature ?? item.amenities[0]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[20px] font-semibold text-[#001510]">
                        {item.pricePerNight.toLocaleString("fr-FR")} F CFA
                      </span>
                      <span className="text-[13px] text-[#414846]"> / nuit</span>
                    </div>
                    <Link
                      href={`/rooms/${item.slug}`}
                      aria-label={`Voir ${item.name}`}
                      className="w-10 h-10 rounded-full bg-[#f4f3f0] group-hover:bg-[#001510] group-hover:text-white text-[#001510] flex items-center justify-center transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Lightbox Modal */}
      <DialogModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title={`${room.name} — Galerie Photos`}
        maxWidthClass="max-w-4xl"
      >
        <div className="space-y-4">
          <p className="text-[13px] text-[#414846] -mt-2">
            {activePhoto + 1} sur {room.gallery.length} vues intérieures et extérieures
          </p>
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#efeeeb]">
            <SuiteImage
              src={room.gallery[activePhoto % room.gallery.length]}
              alt={`${room.name} photo ${activePhoto + 1}`}
              sizes="820px"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() =>
                setActivePhoto(
                  (i) => (i - 1 + room.gallery.length) % room.gallery.length
                )
              }
              className="px-4 py-2 rounded-full bg-[#f4f3f0] hover:bg-[#e9e8e5] text-[#001510] text-[13px] font-medium inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Précédente
            </button>
            <div className="flex gap-2">
              {room.gallery.map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  onClick={() => setActivePhoto(i)}
                  className={`w-12 h-9 rounded-lg overflow-hidden relative border-2 cursor-pointer ${
                    activePhoto === i ? "border-[#001510]" : "border-transparent opacity-60"
                  }`}
                >
                  <SuiteImage src={img} alt={`Aperçu ${i + 1}`} sizes="64px" />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setActivePhoto((i) => (i + 1) % room.gallery.length)
              }
              className="px-4 py-2 rounded-full bg-[#f4f3f0] hover:bg-[#e9e8e5] text-[#001510] text-[13px] font-medium inline-flex items-center gap-1.5 cursor-pointer"
            >
              Suivante
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </DialogModal>

      {/* Architectural Blueprint Modal */}
      <DialogModal
        open={blueprintOpen}
        onClose={() => setBlueprintOpen(false)}
        title={`${room.name} — Plan Architectural`}
        maxWidthClass="max-w-4xl"
      >
        <div className="bg-[#f4f3f0] rounded-2xl p-6 space-y-5">
          <p className="text-[13px] text-[#414846]">
            Agencement de plain-pied {room.sizeSqm} m² ({sqft} sq ft) · Façade 14,2 m
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#414846]/15 space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#3d6659]">
                Zone 01 · 18 m²
              </p>
              <h4 className="text-[16px] font-semibold text-[#001510]">
                Salle de Bain en Pierre
              </h4>
              <p className="text-[13px] text-[#414846]">
                Baignoire îlot en pierre naturelle, double vasque travertin,
                douche effet pluie et dressing en cèdre.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#414846]/15 space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#3d6659]">
                Zone 02 · 42 m²
              </p>
              <h4 className="text-[16px] font-semibold text-[#001510]">
                Chambre Principale King Size
              </h4>
              <p className="text-[13px] text-[#414846]">
                Espace nuit insonorisé avec lit King Size, coin bureau
                exécutif, machine espresso et baies vitrées ouvrantes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#414846]/15 space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#3d6659]">
                Zone 03 · 25 m²
              </p>
              <h4 className="text-[16px] font-semibold text-[#001510]">
                Terrasse Privée &amp; Bassin
              </h4>
              <p className="text-[13px] text-[#414846]">
                Terrasse aménagée avec bains de soleil en lin et bassin chauffé
                à l&apos;abri des regards.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setBlueprintOpen(false)}
              className="px-5 py-2 rounded-full bg-[#001510] text-white text-[13px] font-semibold cursor-pointer"
            >
              Fermer le Plan
            </button>
          </div>
        </div>
      </DialogModal>
    </div>
  );
}
