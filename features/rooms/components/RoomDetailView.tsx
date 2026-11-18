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
  Sparkles,
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

  const nightlyUsd = Math.round(room.pricePerNight / 100);
  const originalUsd = Math.round(
    (room.originalPricePerNight ?? Math.round(room.pricePerNight * 1.12)) / 100
  );
  const sqft = Math.round(room.sizeSqm * 10.764);
  const nights = Math.max(1, calculateNights(checkIn, checkOut) || 5);
  const roomSubtotal = nightlyUsd * nights;
  const ecoTax = Math.round(roomSubtotal * 0.1);
  const memberPrivilege = 150;
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
    router.push(`/reservation?${params.toString()}`);
  };

  const mainPhoto = room.gallery[0] ?? room.image;
  const topSidePhoto = room.gallery[1] ?? "/images/hero/hero-pool.jpg";
  const bottomSidePhoto = room.gallery[2] ?? "/images/rooms/stone-spa-bath.jpg";

  return (
    <div className="bg-[#faf9f6] text-[#1a1c1a]">
      {/* Top Breadcrumb & Page Meta Anchor */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[12px] font-medium text-[#414846]"
          >
            <Link href="/" className="hover:text-[#001510] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/rooms"
              className="hover:text-[#001510] transition-colors"
            >
              Rooms &amp; Suites
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
              <span>{copied ? "Link Copied" : "Share"}</span>
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
              <span>{saved ? "Saved to Portfolio" : "Save Sanctuary"}</span>
            </button>
          </div>
        </div>

        {/* Title and Sub-header Line */}
        <div className="mt-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bce9d9] text-[#244e42] text-[11px] font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#3d6659]" />
              <span>Rare Horizon Collection • Villa 04B</span>
            </div>
            <h1 className="text-[32px] sm:text-[40px] leading-[1.15] font-medium tracking-[-0.02em] text-[#001510]">
              {room.name}
            </h1>
            <p className="text-[15px] text-[#414846] mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#3d6659] shrink-0" />
              <span>{room.destinationName} • Available Immediately</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4f3f0] text-[#001510]">
              <Star className="w-4 h-4 text-[#b18456] fill-current" />
              <span className="text-[14px] font-semibold">
                {(room.rating ?? 4.98).toFixed(2).replace(/\.00$/, ".0")}
              </span>
              <span className="text-[13px] text-[#414846]">
                ({room.reviewCount ?? 124} verified reviews)
              </span>
            </div>
            <span className="text-[#414846] text-[11px] font-semibold px-3.5 py-2 rounded-full bg-[#e9e8e5]">
              Curated Masterwork
            </span>
          </div>
        </div>
      </section>

      {/* Photographic Gallery Header (Asymmetric Layout) */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-2 pb-8">
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
                  Master Living Wing
                </span>
                <h2 className="text-[22px] sm:text-[24px] font-semibold text-white">
                  Open Horizon Master Chamber
                </h2>
                <p className="text-[13px] text-white/85 max-w-md mt-1">
                  Seamless glass facades opening directly toward the ocean
                  infinity deck.
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
                  alt="Cliff Edge Plunge Pool"
                  sizes="(max-width: 1024px) 50vw, 400px"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-[12px] font-semibold text-white">
                      Cliff Edge Plunge Pool
                    </p>
                    <p className="text-[12px] text-[#bce9d9]">
                      Heated private mineral water
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
                  alt="Sunken Volcanic Stone Spa"
                  sizes="(max-width: 1024px) 50vw, 400px"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-[12px] font-semibold text-white">
                      Sunken Volcanic Stone Spa
                    </p>
                    <p className="text-[12px] text-[#bce9d9]">
                      Daily artisanal floral bath rituals
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
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
              <span>View all {room.gallery.length} suite photos</span>
            </button>
          </div>
        </Reveal>
      </section>

      {/* Two-Column Main Content & Lateral Booking Panel Layout */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-16">
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
                    Interior Space
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
                    Capacity
                  </span>
                  <span className="text-[13px] font-semibold text-[#001510]">
                    {room.maxGuests} Adults Max
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e3e2e0] flex items-center justify-center text-[#001510] shrink-0">
                  <BedDouble className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-[#414846]">
                    Master Bed
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
                    Vista
                  </span>
                  <span className="text-[13px] font-semibold text-[#001510]">
                    {room.horizonView ?? "180° Ocean Edge"}
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
                    Dedicated Butler
                  </span>
                </div>
              </div>
            </div>

            {/* Architectural & Interior Narrative */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#1a1c1a]/5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[20px] font-semibold text-[#001510]">
                  Architectural &amp; Interior Narrative
                </h3>
                <span className="text-[11px] font-semibold text-[#3d6659] uppercase tracking-widest">
                  Designed by Studio Kayan
                </span>
              </div>

              <p className="text-[17px] leading-[1.6] text-[#414846]">
                {room.description}
              </p>
              <p className="text-[15px] leading-[1.6] text-[#414846]">
                Acoustic isolation glass slides fully into hidden wall pockets,
                merging the master bedroom with an expansive ironwood sun deck
                and private mineral plunge pool. Morning brings gentle offshore
                breezes and golden reflections; dusk envelops the residence in
                the soft glow of concealed bronze luminaires and candlelit
                garden paths.
              </p>

              <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#f4f3f0] flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-[#3d6659] mb-2">
                    <Trees className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">
                      Natural Materiality
                    </span>
                  </div>
                  <p className="text-[13px] text-[#414846]">
                    Teak, untreated lime plaster, and hand-loomed jute woven by
                    local master artisans.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4f3f0] flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-[#3d6659] mb-2">
                    <AudioLines className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">
                      Acoustic Shielding
                    </span>
                  </div>
                  <p className="text-[13px] text-[#414846]">
                    42dB sound dampening for complete auditory rest amidst
                    soothing ocean waves.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4f3f0] flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-[#3d6659] mb-2">
                    <Leaf className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">
                      Climate Passive
                    </span>
                  </div>
                  <p className="text-[13px] text-[#414846]">
                    Cross-ventilation layout with whisper-quiet geothermal
                    eco-cooling technology.
                  </p>
                </div>
              </div>
            </div>

            {/* In-Suite Curations & Amenities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#1a1c1a]/5 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-[20px] font-semibold text-[#001510]">
                    In-Suite Curations &amp; Amenities
                  </h3>
                  <p className="text-[13px] text-[#414846] mt-1">
                    Every fixture and sensory element has been selected without
                    compromise.
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#3d6659] bg-[#bce9d9]/50 px-3 py-1.5 rounded-full shrink-0">
                  <BadgeCheck className="w-4 h-4" />
                  100% Complimentary Inclusions
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#f4f3f0] space-y-3">
                  <div className="flex items-center gap-2 text-[#001510] font-semibold text-[16px]">
                    <BedDouble className="w-5 h-5 text-[#3d6659]" />
                    <span>Sleep &amp; Comfort</span>
                  </div>
                  <ul className="space-y-2 text-[13px] text-[#414846]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Siberian goose down pillow menu with 8 personalized
                        firmness options
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Giza Egyptian cotton 600-thread count bespoke bedding
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Silent motorized blackout woven screens with circadian
                        wake cycle
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#f4f3f0] space-y-3">
                  <div className="flex items-center gap-2 text-[#001510] font-semibold text-[16px]">
                    <Waves className="w-5 h-5 text-[#3d6659]" />
                    <span>Wellness &amp; Bathing</span>
                  </div>
                  <ul className="space-y-2 text-[13px] text-[#414846]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Dyson Supersonic grooming station &amp; copper thermal
                        tools
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Monolithic freestanding volcanic stone soaking tub
                        overlooking gorge
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Aesop botanical hair, hand, and body therapies
                        (replenished daily)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#f4f3f0] space-y-3">
                  <div className="flex items-center gap-2 text-[#001510] font-semibold text-[16px]">
                    <Wine className="w-5 h-5 text-[#3d6659]" />
                    <span>Gastronomy &amp; Cellar</span>
                  </div>
                  <ul className="space-y-2 text-[13px] text-[#414846]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Private espresso atelier featuring single-origin
                        Balinese roast
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Complimentary climate-controlled vintage mini-cellar
                        wines
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Daily morning rare tropical fruit presentation &amp;
                        artisan pastries
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#f4f3f0] space-y-3">
                  <div className="flex items-center gap-2 text-[#001510] font-semibold text-[16px]">
                    <Wifi className="w-5 h-5 text-[#3d6659]" />
                    <span>Technology &amp; Discretion</span>
                  </div>
                  <ul className="space-y-2 text-[13px] text-[#414846]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        High-speed dedicated Starlink VIP mesh connection (350
                        Mbps)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Bang &amp; Olufsen Beosound acoustic nodes across room
                        and deck
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0 mt-0.5" />
                      <span>
                        Keyless biometric &amp; encrypted mobile digital key
                        entry system
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
                    Floor Plan &amp; Spatial Flow
                  </h3>
                  <p className="text-[13px] text-[#414846]">
                    Single-level pavilion layout with private access ramp and
                    secluded plunge pool.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setBlueprintOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#e9e8e5] hover:bg-[#efeeeb] text-[12px] font-semibold text-[#001510] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full Scale Vector Blueprint</span>
                </button>
              </div>

              <div className="w-full bg-[#f4f3f0] rounded-2xl p-6 flex flex-col items-center justify-center">
                {/* Clean Architectural Schematic */}
                <div className="w-full max-w-xl space-y-2">
                  <div className="flex items-center justify-center text-[10px] font-mono tracking-widest text-[#414846] uppercase border-b border-[#414846]/30 pb-1">
                    14.2 Meters Frontage
                  </div>
                  <div className="border-2 border-dashed border-[#414846]/35 rounded-xl p-3 grid grid-cols-12 gap-3 bg-white/40">
                    {/* Stone Spa */}
                    <div className="col-span-4 border border-[#414846]/40 rounded-lg p-3 flex flex-col items-center justify-between min-h-[160px]">
                      <div className="w-16 h-24 rounded-full border border-[#414846]/45 flex items-center justify-center text-[9px] font-mono text-[#414846] text-center px-1">
                        STONE SPA
                      </div>
                      <span className="text-[9px] font-mono tracking-wider text-[#414846] uppercase">
                        Bath &amp; Dressing
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
                          KING CHAMBER
                        </span>
                      </div>
                      <span className="text-[9px] font-mono tracking-wider text-[#414846] uppercase">
                        42 m² Pavilion
                      </span>
                    </div>

                    {/* Plunge Pool & Open Deck */}
                    <div className="col-span-4 border border-[#414846]/40 rounded-lg p-3 flex flex-col items-center justify-between min-h-[160px] bg-[#bce9d9]/20">
                      <div className="w-full h-20 rounded-lg border border-[#3d6659]/45 bg-[#bce9d9]/30 flex items-center justify-center text-[9px] font-mono text-[#244e42] tracking-wider text-center px-1">
                        PLUNGE POOL
                      </div>
                      <span className="text-[9px] font-mono tracking-wider text-[#414846] uppercase">
                        Open Deck 32 m²
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 justify-center text-[11px] font-semibold text-[#414846]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3d6659]" />
                    Master Suite (42 m²)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#bce9d9]" />
                    Open Sunken Spa (18 m²)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c1c8c4]" />
                    Teak Sun Deck &amp; Plunge Pool (25 m²)
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
                      Sanctuary Curator &amp; Master Sommelier • SuiteSavvy
                      Fellow
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="px-4 py-2 rounded-full bg-[#f4f3f0] hover:bg-[#efeeeb] text-[#001510] text-[12px] font-semibold transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire With Julian</span>
                  </Link>
                </div>
                <p className="text-[15px] text-[#414846] leading-relaxed">
                  &ldquo;Every sunset at Villa 04B carries its own signature hue
                  over the cliffside. Before your arrival, my team will curate
                  your bath botanicals, configure your preferred pillow
                  densities, and ensure your vintage wine cellar matches your
                  palate.&rdquo;
                </p>
              </div>
            </div>

            {/* House Guidelines & Protocol */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#1a1c1a]/5 space-y-4">
              <h4 className="text-[20px] font-semibold text-[#001510]">
                Sanctuary Guidelines &amp; Protocol
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#f4f3f0]">
                  <div className="flex items-center gap-2 text-[#001510] text-[14px] font-semibold mb-1">
                    <LogIn className="w-4 h-4 text-[#3d6659]" />
                    <span>Check-in</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#001510]">
                    15:00
                  </p>
                  <p className="text-[13px] text-[#414846] mt-1">
                    Discreet in-villa reception. Private butler orientation
                    included.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4f3f0]">
                  <div className="flex items-center gap-2 text-[#001510] text-[14px] font-semibold mb-1">
                    <LogOut className="w-4 h-4 text-[#3d6659]" />
                    <span>Check-out</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#001510]">
                    12:00
                  </p>
                  <p className="text-[13px] text-[#414846] mt-1">
                    Complimentary extended departure up to 14:00 upon
                    availability.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4f3f0]">
                  <div className="flex items-center gap-2 text-[#001510] text-[14px] font-semibold mb-1">
                    <PawPrint className="w-4 h-4 text-[#3d6659]" />
                    <span>Companion Animals</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#001510]">
                    Upon Request
                  </p>
                  <p className="text-[13px] text-[#414846] mt-1">
                    Small pets up to 12kg welcomed with bespoke bedding and
                    meals.
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
                    ${originalUsd.toLocaleString()}
                  </span>
                  <span className="text-[36px] font-bold tracking-tight text-[#001510]">
                    ${nightlyUsd.toLocaleString()}
                  </span>
                  <span className="text-[13px] text-[#414846]"> / night</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#bce9d9] text-[#244e42] text-[11px] font-semibold">
                  Member Benefit
                </span>
              </div>

              {/* Interactive Date & Guest Selector Module */}
              <div className="rounded-2xl bg-[#f4f3f0] p-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <label className="p-2.5 rounded-xl bg-white hover:bg-[#faf9f6] transition-colors cursor-pointer block">
                    <span className="block text-[10px] font-semibold text-[#414846] uppercase tracking-wider">
                      Check-in
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
                      Check-out
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
                    Selected Duration: {nights} Nights Sanctuary Stay
                  </span>
                </div>

                <label className="p-2.5 rounded-xl bg-white hover:bg-[#faf9f6] transition-colors flex items-center justify-between cursor-pointer">
                  <div className="w-full">
                    <span className="block text-[10px] font-semibold text-[#414846] uppercase tracking-wider">
                      Occupancy
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
                            {count} {count === 1 ? "Adult" : "Adults"}, 0 Children
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
                    ${nightlyUsd.toLocaleString()} × {nights} Nights
                  </span>
                  <span className="font-medium text-[#001510]">
                    ${roomSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[13px] text-[#414846]">
                  <span className="flex items-center gap-1">
                    Airport Chauffeur (Mercedes EQS)
                    <Info className="w-3.5 h-3.5 text-[#3d6659]" />
                  </span>
                  <span className="font-medium text-[#3d6659]">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between text-[13px] text-[#414846]">
                  <span>Local Eco-Tourism &amp; Forest Tax (10%)</span>
                  <span className="font-medium text-[#001510]">
                    ${ecoTax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[13px] text-[#3d6659]">
                  <span>Direct Member Privilege</span>
                  <span className="font-medium">-${memberPrivilege}</span>
                </div>
                <div className="h-[1px] bg-[#e3e2e0] my-1" />
                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <span className="text-[18px] font-semibold text-[#001510]">
                      Total Investment
                    </span>
                    <p className="text-[11px] text-[#414846]">
                      Includes all taxes &amp; butler charges
                    </p>
                  </div>
                  <span className="text-[24px] font-bold text-[#001510]">
                    ${totalInvestment.toLocaleString()}
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
                  <span>Reserve This Sanctuary</span>
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
                      ? "48h Courtesy Hold Active"
                      : "Hold for 48h (No Commitment)"}
                  </span>
                </button>
              </div>

              {/* Reservation Micro-Guarantees */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2.5 text-[#414846] text-[13px]">
                  <CheckCircle2 className="w-4 h-4 text-[#3d6659] shrink-0" />
                  <span>Free cancellation up to 48h prior to arrival</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#414846] text-[13px]">
                  <Leaf className="w-4 h-4 text-[#3d6659] shrink-0" />
                  <span>100% Carbon-Neutral Stay certification included</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#414846] text-[13px]">
                  <BadgeCheck className="w-4 h-4 text-[#3d6659] shrink-0" />
                  <span>Direct Sanctuary Privileges &amp; Priority Dining</span>
                </div>
              </div>

              {/* Safe Traveler Notice */}
              <div className="p-3.5 rounded-xl bg-[#f4f3f0] flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#3d6659] shrink-0" />
                <p className="text-[11px] font-medium text-[#414846] leading-tight">
                  SuiteSavvy Escrow Protection: Funds released to estate only
                  upon verified guest check-in.
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
                    Need Bespoke Arrangements?
                  </p>
                  <p className="text-[12px] text-[#414846]">
                    Helicopter transfers &amp; chef diets
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
      <section className="w-full bg-[#f4f3f0] py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#3d6659] block mb-1">
                Curated Alternatives
              </span>
              <h3 className="text-[32px] sm:text-[40px] leading-[1.15] font-medium tracking-[-0.02em] text-[#001510]">
                Other Sanctuaries You May Cherish
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/rooms"
                aria-label="Browse all retreats"
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#e9e8e5] text-[#001510] text-[13px] font-semibold shadow-sm transition-colors inline-flex items-center gap-1.5"
              >
                <span>All Sanctuaries</span>
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
                        ${Math.round(item.pricePerNight / 100).toLocaleString()}
                      </span>
                      <span className="text-[13px] text-[#414846]"> / night</span>
                    </div>
                    <Link
                      href={`/rooms/${item.slug}`}
                      aria-label={`View ${item.name}`}
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
        title={`${room.name} — Suite Gallery`}
        maxWidthClass="max-w-4xl"
      >
        <div className="space-y-4">
          <p className="text-[13px] text-[#414846] -mt-2">
            {activePhoto + 1} of {room.gallery.length} curated interior &amp; horizon views
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
              Previous
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
                  <SuiteImage src={img} alt={`Thumb ${i + 1}`} sizes="64px" />
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
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </DialogModal>

      {/* Architectural Blueprint Modal */}
      <DialogModal
        open={blueprintOpen}
        onClose={() => setBlueprintOpen(false)}
        title={`${room.name} — Architectural Blueprint`}
        maxWidthClass="max-w-4xl"
      >
        <div className="bg-[#f4f3f0] rounded-2xl p-6 space-y-5">
          <p className="text-[13px] text-[#414846]">
            Single-level {room.sizeSqm} m² ({sqft} sq ft) spatial layout · 14.2m oceanfront frontage
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#414846]/15 space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#3d6659]">
                Zone 01 · 18 m²
              </p>
              <h4 className="text-[16px] font-semibold text-[#001510]">
                Open Sunken Stone Spa
              </h4>
              <p className="text-[13px] text-[#414846]">
                Freestanding monolithic basalt tub, double travertine vanity,
                outdoor rainforest shower, and cedar walk-in dressing gallery.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#414846]/15 space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#3d6659]">
                Zone 02 · 42 m²
              </p>
              <h4 className="text-[16px] font-semibold text-[#001510]">
                Master King Chamber
              </h4>
              <p className="text-[13px] text-[#414846]">
                Acoustic-shielded sleeping sanctuary with woven cane joinery,
                espresso atelier, and recessed 3-panel pocket glass doors.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#414846]/15 space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#3d6659]">
                Zone 03 · 25 m²
              </p>
              <h4 className="text-[16px] font-semibold text-[#001510]">
                Teak Sun Deck &amp; Plunge Pool
              </h4>
              <p className="text-[13px] text-[#414846]">
                Cantilevered ironwood veranda with heated infinity-edge mineral
                plunge pool and shaded linen daybed loungers.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setBlueprintOpen(false)}
              className="px-5 py-2 rounded-full bg-[#001510] text-white text-[13px] font-semibold cursor-pointer"
            >
              Close Blueprint
            </button>
          </div>
        </div>
      </DialogModal>
    </div>
  );
}
