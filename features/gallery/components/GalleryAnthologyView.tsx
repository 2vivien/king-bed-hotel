"use client";

import {
  Aperture,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BedDouble,
  BookOpen,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Compass,
  Headphones,
  Maximize2,
  ShieldCheck,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { SuiteImage } from "@/components/shared/SuiteImage";

type GalleryFilterId =
  | "all"
  | "villas"
  | "architecture"
  | "pools"
  | "gastronomy"
  | "spa";

interface GalleryPlate {
  id: string;
  plateLabel: string;
  category: Exclude<GalleryFilterId, "all">;
  badge: string;
  location: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  specs: string;
  lens: string;
  altitude: string;
  roomHref?: string;
}

const FILTER_TABS: readonly {
  id: GalleryFilterId;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "All Curations", count: 38 },
  { id: "villas", label: "Villas & Suites", count: 14 },
  { id: "architecture", label: "Architecture & Design", count: 9 },
  { id: "pools", label: "Secluded Pools", count: 6 },
  { id: "gastronomy", label: "Gastronomy", count: 5 },
  { id: "spa", label: "Holistic Spa", count: 4 },
];

const GALLERY_PLATES: readonly GalleryPlate[] = [
  {
    id: "villa-twilight",
    plateLabel: "Curator's Choice • Plate No. 01",
    category: "pools",
    badge: "Private Reserve",
    location: "Bali, Indonesia",
    title: "Ubud Sanctuary, Bali — Villa 04B",
    subtitle: "35mm • f/1.4 · Twilight 18:42 WITA · Photo: Markos V.",
    description:
      "Sunset over the cascading infinity reflection pool, anchored by hand-chiseled volcanic basalt masonry and fragrant Frangipani garden terraces.",
    image: "/images/hero/hero-pool.jpg",
    specs: "Infinity Terrace Pool",
    lens: "Leica Noctilux-M 50mm f/0.95",
    altitude: "Altitude: 420m above sea level",
    roomHref: "/rooms/royal-villa",
  },
  {
    id: "ocean-suite",
    plateLabel: "Plate 02",
    category: "villas",
    badge: "Architecture & Interior",
    location: "Ubud & Cliffside Horizons",
    title: "The Oceanfront Sanctuary Suite",
    subtitle: "85 m² Master Space · King Sized Teak Frame · 180° Panoramic Horizon",
    description:
      "Organic minimalist luxury bedroom suite with oak woodwork, hand-loomed cane accents, and 180° ocean horizon glazing.",
    image: "/images/rooms/oceanfront-sanctuary.jpg",
    specs: "85 m² Master Space",
    lens: "Hasselblad X2D · 38mm f/2.5",
    altitude: "Cliffside Tier 04",
    roomHref: "/rooms/oceanfront-sanctuary-suite",
  },
  {
    id: "stone-bath",
    plateLabel: "Plate 03",
    category: "spa",
    badge: "Holistic Rituals",
    location: "Ayung River Gorge",
    title: "Balinese Herbal Sanctuary Bath",
    subtitle: "River Stone Monolith · Ayung River Gorge View",
    description:
      "Hand-chiseled monolith stone soaking tub adorned with fresh hibiscus petals facing the misty Ayung River gorge.",
    image: "/images/rooms/stone-spa-bath.jpg",
    specs: "River Stone Monolith",
    lens: "Leica SL3 · 50mm APO",
    altitude: "Gorge Elevation 310m",
    roomHref: "/rooms/palm-horizon-suite",
  },
  {
    id: "riva",
    plateLabel: "Plate 04",
    category: "pools",
    badge: "Experiences",
    location: "Positano Coastline",
    title: "Private Riva Charter",
    subtitle: "Aquarama 33ft Tender",
    description:
      "Bespoke Amalfi coastal yacht charter aboard a restored mahogany Riva Aquarama with private skipper and champagne chilled cellar.",
    image: "/images/gallery/riva-charter.jpg",
    specs: "Aquarama 33ft Tender",
    lens: "Leica M11 · 35mm Summilux",
    altitude: "Tyrrhenian Sea Level",
    roomHref: "/rooms/penthouse-horizon-retreat",
  },
  {
    id: "gastronomy",
    plateLabel: "Plate 05",
    category: "gastronomy",
    badge: "Gastronomy",
    location: "Highland Organic Farm",
    title: "Chef's Botanic Tasting",
    subtitle: "Michelin-Inspired Craft",
    description:
      "Hyper-seasonal culinary curation served by candlelight using biodynamic herbs and artisanal coastal harvests.",
    image: "/images/gallery/chef-tasting.jpg",
    specs: "Michelin-Inspired Craft",
    lens: "Sony A1 · 50mm f/1.2 GM",
    altitude: "Terrace Sanctuary 480m",
    roomHref: "/rooms/royal-garden-villa",
  },
  {
    id: "amalfi",
    plateLabel: "Plate 06",
    category: "architecture",
    badge: "Architecture",
    location: "Amalfi Solitude",
    title: "Cliffside Villa Palazzina",
    subtitle: "Vertical Heritage Garden",
    description:
      "Historic vertical Mediterranean architecture carved directly into the sunlit limestone cliffs above Positano.",
    image: "/images/destinations/positano.jpg",
    specs: "Vertical Heritage Garden",
    lens: "Hasselblad X2D · 55mm V",
    altitude: "Cliffside 140m",
    roomHref: "/rooms/terrace-garden-room",
  },
  {
    id: "lisbon",
    plateLabel: "Plate 07",
    category: "architecture",
    badge: "Historic Haven",
    location: "Alfama District",
    title: "Old Town Miradouro",
    subtitle: "18th-Century Azulejos",
    description:
      "Restored heritage palacete in Lisbon overlooking sunlit terracotta rooftops and historic limestone courtyards.",
    image: "/images/destinations/lisbon.jpg",
    specs: "18th-Century Azulejos",
    lens: "Leica Q3 · 28mm Summilux",
    altitude: "Alfama Ridge 95m",
    roomHref: "/rooms/caldera-cliff-suite",
  },
];

export function GalleryAnthologyView() {
  const [filter, setFilter] = useState<GalleryFilterId>("all");
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const filteredPlates = useMemo(() => {
    if (filter === "all") return GALLERY_PLATES;
    return GALLERY_PLATES.filter((p) => p.category === filter);
  }, [filter]);

  const activePlateIndex = useMemo(() => {
    if (!lightboxId) return -1;
    return GALLERY_PLATES.findIndex((p) => p.id === lightboxId);
  }, [lightboxId]);

  const activePlate =
    activePlateIndex >= 0 ? GALLERY_PLATES[activePlateIndex] : null;

  const heroPlate = GALLERY_PLATES[0];
  const oceanPlate = GALLERY_PLATES[1];
  const bathPlate = GALLERY_PLATES[2];
  const mosaicPlates = GALLERY_PLATES.slice(3, 7);

  const cycleLightbox = (dir: -1 | 1) => {
    if (activePlateIndex < 0) return;
    const nextIdx =
      (activePlateIndex + dir + GALLERY_PLATES.length) % GALLERY_PLATES.length;
    setLightboxId(GALLERY_PLATES[nextIdx].id);
  };

  return (
    <div className="bg-[#faf9f6] text-[#1a1c1a]">
      {/* Top Editorial Header & Curated Title Area */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-10 pb-8">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e9e8e5] text-[#414846] text-[11px] font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3d6659]" />
                <span>Bespoke Visual Anthology — Volume IX</span>
              </div>
              <h1 className="text-[40px] sm:text-[52px] lg:text-[56px] leading-[1.1] text-[#001510] tracking-[-0.03em] font-semibold">
                Explore the Beauty of Every Stay
              </h1>
              <p className="text-[17px] sm:text-[18px] leading-[1.55] text-[#414846] max-w-2xl">
                A visual anthology of barefoot elegance, master craftsmanship,
                and secluded natural horizons across our global sanctuaries.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#f4f3f0] px-5 py-2.5 rounded-full shadow-sm self-start lg:self-end shrink-0">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#3d6659]" />
                <span className="text-[12px] text-[#1a1c1a] font-semibold">
                  38 High-Resolution Plates
                </span>
              </div>
              <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
              <span className="text-[12px] text-[#414846] font-medium">
                Archived 2024–2025
              </span>
            </div>
          </div>

          {/* Filter Pills Strip with Count Badges */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
            {FILTER_TABS.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#0d2b24] text-white shadow-sm"
                      : "bg-[#e9e8e5] text-[#414846] hover:text-[#1a1c1a] hover:bg-[#e3e2e0]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                      isActive
                        ? "bg-[#001510] text-white"
                        : "bg-[#dbdad7] text-[#414846]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* Editorial Masonry / Visual Grid */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-6">
        {filter === "all" ? (
          <>
            {/* Hero Showcase: Featured Large Wide Frame */}
            <Reveal>
              <div
                onClick={() => setLightboxId(heroPlate.id)}
                className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#e9e8e5] group cursor-pointer"
              >
                <div className="aspect-[16/9] lg:aspect-[21/9] w-full relative">
                  <SuiteImage
                    src={heroPlate.image}
                    alt={heroPlate.title}
                    sizes="(max-width: 1024px) 100vw, 1280px"
                    priority
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/90 via-[#001510]/20 to-transparent" />

                  <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#001510]/65 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase">
                      {heroPlate.plateLabel}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-[#001510] group-hover:bg-white transition-colors shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[12px] text-[#bfecdc] tracking-wide uppercase font-medium">
                        {heroPlate.badge}
                      </span>
                      <h2 className="text-[28px] md:text-[40px] leading-[1.15] text-white font-medium tracking-tight">
                        {heroPlate.title}
                      </h2>
                      <p className="text-[13px] text-[#e9e8e5] max-w-xl">
                        {heroPlate.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-white/85 text-[11px] font-semibold shrink-0">
                      <span className="flex items-center gap-1">
                        <Aperture className="w-3.5 h-3.5" />
                        35mm • f/1.4
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/50" />
                      <span>Twilight 18:42 WITA</span>
                      <span className="w-1 h-1 rounded-full bg-white/50" />
                      <span>Photo: Markos V.</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Editorial Pair of Columns: Suites & Holistic Retreat */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7-col: Master Ocean Suite */}
              <Reveal delay={0.05} className="lg:col-span-7">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col group border border-[#1a1c1a]/5 h-full">
                  <div
                    onClick={() => setLightboxId(oceanPlate.id)}
                    className="aspect-[16/10] w-full relative overflow-hidden bg-[#e9e8e5] cursor-pointer"
                  >
                    <SuiteImage
                      src={oceanPlate.image}
                      alt={oceanPlate.title}
                      sizes="(max-width: 1024px) 100vw, 720px"
                      className="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/65 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#001510] group-hover:bg-white transition-colors shadow">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div>
                        <span className="text-[11px] font-semibold text-[#bfecdc] uppercase tracking-wider">
                          {oceanPlate.badge}
                        </span>
                        <h3 className="text-[20px] font-semibold">
                          {oceanPlate.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-semibold bg-[#001510]/70 backdrop-blur-md px-3 py-1 rounded-full">
                        {oceanPlate.plateLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-2 bg-white">
                    <div className="flex flex-wrap items-center gap-3 text-[#414846] text-[13px]">
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#3d6659]" />
                        85 m² Master Space
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
                      <span className="flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-[#3d6659]" />
                        King Sized Teak Frame
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
                      <span>180° Panoramic Horizon</span>
                    </div>
                    <Link
                      href={oceanPlate.roomHref ?? "/rooms"}
                      className="text-[12px] text-[#001510] font-semibold flex items-center gap-1 hover:text-[#3d6659] shrink-0"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Right 5-col: Holistic Spa & Stone Bath */}
              <Reveal delay={0.1} className="lg:col-span-5">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col group border border-[#1a1c1a]/5 h-full">
                  <div
                    onClick={() => setLightboxId(bathPlate.id)}
                    className="aspect-[16/10] w-full relative overflow-hidden bg-[#e9e8e5] cursor-pointer"
                  >
                    <SuiteImage
                      src={bathPlate.image}
                      alt={bathPlate.title}
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#001510] group-hover:bg-white transition-colors shadow">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div>
                        <span className="text-[11px] font-semibold text-[#bfecdc] uppercase tracking-wider">
                          {bathPlate.badge}
                        </span>
                        <h3 className="text-[20px] font-semibold">
                          {bathPlate.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-semibold bg-[#001510]/70 backdrop-blur-md px-3 py-1 rounded-full">
                        {bathPlate.plateLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-2 bg-white">
                    <div className="flex flex-wrap items-center gap-3 text-[#414846] text-[13px]">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#3d6659]" />
                        River Stone Monolith
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
                      <span>Ayung River Gorge View</span>
                    </div>
                    <Link
                      href={bathPlate.roomHref ?? "/rooms"}
                      className="text-[12px] text-[#001510] font-semibold flex items-center gap-1 hover:text-[#3d6659] shrink-0"
                    >
                      Ritual Notes
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Editorial Mosaic Row: 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mosaicPlates.map((plate, idx) => (
                <Reveal key={plate.id} delay={idx * 0.04}>
                  <div
                    onClick={() => setLightboxId(plate.id)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer border border-[#1a1c1a]/5"
                  >
                    <div className="aspect-[4/3] w-full relative overflow-hidden bg-[#efeeeb]">
                      <SuiteImage
                        src={plate.image}
                        alt={plate.title}
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/70 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#001510] text-[11px] font-semibold">
                        {plate.badge}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[11px] font-semibold text-[#bfecdc]">
                          {plate.location}
                        </span>
                        <h4 className="text-[19px] font-semibold leading-tight">
                          {plate.title}
                        </h4>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between bg-white">
                      <span className="text-[13px] text-[#414846]">
                        {plate.specs}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#001510] group-hover:bg-[#0d2b24] group-hover:text-white transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          /* Filtered View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlates.map((plate, idx) => (
              <Reveal key={plate.id} delay={idx * 0.04}>
                <div
                  onClick={() => setLightboxId(plate.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col cursor-pointer border border-[#1a1c1a]/5 h-full"
                >
                  <div className="aspect-[16/10] w-full relative overflow-hidden bg-[#efeeeb]">
                    <SuiteImage
                      src={plate.image}
                      alt={plate.title}
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#001510] text-[11px] font-semibold">
                      {plate.badge}
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[11px] font-semibold text-[#bfecdc]">
                        {plate.location}
                      </span>
                      <h3 className="text-[19px] font-semibold">
                        {plate.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                    <p className="text-[13px] text-[#414846]">
                      {plate.description}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#efeeeb]">
                      <span className="text-[12px] font-medium text-[#3d6659]">
                        {plate.specs}
                      </span>
                      <span className="text-[12px] font-semibold text-[#001510] inline-flex items-center gap-1">
                        Inspect Plate
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Curated Storytelling & Architectural Essay Strip */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 my-14">
        <Reveal>
          <div className="bg-[#f4f3f0] rounded-3xl p-6 md:p-12 relative overflow-hidden shadow-sm">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 space-y-3">
                <div className="inline-flex items-center gap-2 text-[#3d6659] text-[11px] uppercase tracking-widest font-semibold">
                  <BookOpen className="w-4 h-4" />
                  <span>Curatorial Perspective</span>
                </div>
                <h2 className="text-[28px] md:text-[36px] leading-[1.15] text-[#001510] tracking-tight font-medium">
                  Architectural Light, Stone &amp; Timeless Silence
                </h2>
                <p className="text-[15px] leading-[1.6] text-[#414846]">
                  Every SuiteSavvy retreat is photographed exclusively during
                  the transitional thresholds of morning dew and evening
                  nautical twilight. No staged lighting sets — only genuine
                  spatial geometry.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e3e2e0] relative shrink-0">
                    <SuiteImage
                      src="/images/curators/elena.jpg"
                      alt="Elena De Smet"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#001510] font-semibold">
                      Elena De Smet
                    </p>
                    <p className="text-[13px] text-[#414846]">
                      Director of Spatial Curation, Antwerp
                    </p>
                  </div>
                </div>
              </div>

              {/* Metric & Technical Standards Bento Block */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl shadow-sm space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#bce9d9]/40 flex items-center justify-center text-[#3d6659]">
                    <Aperture className="w-5 h-5" />
                  </div>
                  <p className="text-[24px] text-[#001510] font-bold">
                    100% Raw
                  </p>
                  <p className="text-[13px] text-[#414846]">
                    True-to-life color grading calibrated for real atmospheric
                    daylight rendition.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#bce9d9]/40 flex items-center justify-center text-[#3d6659]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <p className="text-[24px] text-[#001510] font-bold">
                    1:1 Proportion
                  </p>
                  <p className="text-[13px] text-[#414846]">
                    Architectural floor-plan parity verified before inclusion
                    into the private portfolio.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#bce9d9]/40 flex items-center justify-center text-[#3d6659]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <p className="text-[24px] text-[#001510] font-bold">
                    Physical Audit
                  </p>
                  <p className="text-[13px] text-[#414846]">
                    Every sanctuary is personally inspected by our hospitality
                    council bi-annually.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Bottom Visual Call to Action Banner */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-20">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden shadow-lg bg-[#0d2b24] text-white p-8 md:p-12">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#3d6659]/25 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-2 max-w-xl">
                <span className="text-[11px] text-[#bfecdc] uppercase tracking-wider font-semibold">
                  Reserve Your Private Horizon
                </span>
                <h2 className="text-[28px] md:text-[40px] leading-[1.15] text-white font-medium tracking-tight">
                  Capture Your Own Unforgettable Memories
                </h2>
                <p className="text-[15px] text-[#e9e8e5]">
                  Connect with our private guest ambassadors to schedule a
                  bespoke consultation or request private aviation routing for
                  your upcoming escape.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <Link
                  href="/rooms"
                  className="px-7 py-3.5 rounded-full bg-white text-[#001510] hover:bg-[#efeeeb] text-[13px] font-semibold text-center transition-all shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Explore All Sanctuaries</span>
                  <Compass className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-3.5 rounded-full border border-white/25 bg-transparent text-white hover:bg-white/10 text-[13px] font-semibold text-center transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Reserve a Private Consultation</span>
                  <Headphones className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Interactive Lightbox Modal */}
      {activePlate && (
        <div
          className="fixed inset-0 z-50 bg-[#001510]/85 backdrop-blur-xl flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activePlate.title}
          onClick={() => setLightboxId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Top Modal Bar */}
            <div className="px-6 py-4 bg-[#f4f3f0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-[#3d6659]" />
                <span className="text-[13px] text-[#001510] font-semibold">
                  {activePlate.title}
                </span>
              </div>
              <button
                type="button"
                aria-label="Close lightbox"
                onClick={() => setLightboxId(null)}
                className="w-9 h-9 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#414846] hover:text-[#1a1c1a] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Viewport */}
            <div className="relative w-full aspect-[16/9] bg-[#001510] flex items-center justify-center overflow-hidden">
              <SuiteImage
                src={activePlate.image}
                alt={activePlate.title}
                sizes="1000px"
              />
              <button
                type="button"
                aria-label="Previous plate"
                onClick={() => cycleLightbox(-1)}
                className="absolute left-4 w-11 h-11 rounded-full bg-[#001510]/60 text-white hover:bg-[#001510] transition-all flex items-center justify-center backdrop-blur-sm shadow cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Next plate"
                onClick={() => cycleLightbox(1)}
                className="absolute right-4 w-11 h-11 rounded-full bg-[#001510]/60 text-white hover:bg-[#001510] transition-all flex items-center justify-center backdrop-blur-sm shadow cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Metadata & Inquire */}
            <div className="p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[15px] text-[#001510] font-medium">
                  {activePlate.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#414846]">
                  <span>Lens: {activePlate.lens}</span>
                  <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
                  <span>{activePlate.altitude}</span>
                  <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
                  <span className="text-[#3d6659] font-semibold">
                    Available for Private Booking
                  </span>
                </div>
              </div>
              <Link
                href={activePlate.roomHref ?? "/reservation"}
                className="px-6 py-2.5 rounded-full bg-[#0d2b24] text-white text-[13px] font-semibold shadow-sm hover:bg-[#001510] transition-colors inline-flex items-center gap-2 shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Inquire About This Sanctuary</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
