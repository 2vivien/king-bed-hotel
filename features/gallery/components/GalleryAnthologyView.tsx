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
  Gift,
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
  | "gastronomy";

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
  { id: "all", label: "Toutes les Vues", count: 38 },
  { id: "villas", label: "Chambres & Suites", count: 14 },
  { id: "architecture", label: "Salles de Conférence", count: 9 },
  { id: "pools", label: "Piscine & Patio", count: 6 },
  { id: "gastronomy", label: "Petit-Déjeuner", count: 5 },
];

const GALLERY_PLATES: readonly GalleryPlate[] = [
  {
    id: "villa-twilight",
    plateLabel: "Sélection Maison • Planche 01",
    category: "pools",
    badge: "Patio & Piscine",
    location: "King's Bed Hotel",
    title: "Patio Paysager & Bassin du Soir",
    subtitle: "35mm • f/1.4 · Crépuscule 18h42 · Photo : Markos V.",
    description:
      "Le bassin miroir et les terrasses en pierre naturelle du King's Bed Hotel, accessibles après vos réunions ou au réveil.",
    image: "/images/hero/hero-pool.jpg",
    specs: "Bassin & Terrasses Calmes",
    lens: "Leica Noctilux-M 50mm f/0.95",
    altitude: "Cœur de l'hôtel • Accès direct",
    roomHref: "/rooms/royal-villa",
  },
  {
    id: "ocean-suite",
    plateLabel: "Planche 02",
    category: "villas",
    badge: "Chambres & Literie",
    location: "Aile Prestige · 4e Étage",
    title: "La Suite King Panorama",
    subtitle: "85 m² d'Espace · Lit King Size · Lumière Naturelle",
    description:
      "Suite lumineuse avec boiseries en chêne, matelas King Size haute densité, coin bureau et terrasse panoramique.",
    image: "/images/rooms/oceanfront-sanctuary.jpg",
    specs: "85 m² · Lit King Size",
    lens: "Hasselblad X2D · 38mm f/2.5",
    altitude: "Aile Prestige · Étage 04",
    roomHref: "/rooms/oceanfront-sanctuary-suite",
  },
  {
    id: "stone-bath",
    plateLabel: "Planche 03",
    category: "villas",
    badge: "Chambres & Literie",
    location: "Aile des Palmiers · 2e Étage",
    title: "Bain Minéral & Pierre Naturelle",
    subtitle: "Pierre Naturelle · Vue Jardin Calme",
    description:
      "Baignoire sculptée dans la pierre pour décompresser après une journée de conférence ou de voyage.",
    image: "/images/rooms/stone-spa-bath.jpg",
    specs: "Suite King · 65 m²",
    lens: "Leica SL3 · 50mm APO",
    altitude: "Niveau Jardin · Aile Palmiers",
    roomHref: "/rooms/palm-horizon-suite",
  },
  {
    id: "riva",
    plateLabel: "Planche 04",
    category: "pools",
    badge: "Service Transferts",
    location: "Conciergerie Hôtel",
    title: "Transfert Privé & Accueil VIP",
    subtitle: "Chauffeur Dédié",
    description:
      "Prise en charge personnalisée pour vos invités d'honneur, intervenants de conférence et séjours en suite.",
    image: "/images/gallery/riva-charter.jpg",
    specs: "Transferts sur Demande",
    lens: "Leica M11 · 35mm Summilux",
    altitude: "Accueil Gare & Aéroport",
    roomHref: "/rooms/penthouse-horizon-retreat",
  },
  {
    id: "gastronomy",
    plateLabel: "Planche 05",
    category: "gastronomy",
    badge: "Petit-Déjeuner",
    location: "Salon de l'Orangerie",
    title: "Petit-Déjeuner & Pauses Séminaires",
    subtitle: "Produits Frais de Saison",
    description:
      "Viennoiseries artisanales, pains au levain, jus pressés et pauses gourmandes servies en salle ou entre deux sessions de réunion.",
    image: "/images/gallery/chef-tasting.jpg",
    specs: "Buffet & Service à la Carte",
    lens: "Sony A1 · 50mm f/1.2 GM",
    altitude: "06h30 – 11h00 tous les jours",
    roomHref: "/rooms/royal-garden-villa",
  },
  {
    id: "amalfi",
    plateLabel: "Planche 06",
    category: "architecture",
    badge: "Conférences",
    location: "Aile Exécutive · 1er Étage",
    title: "Salons de Réunion & Séminaires",
    subtitle: "Lumière Naturelle & Équipement Pro",
    description:
      "Espaces acoustiques modulables pour comités de direction, ateliers d'équipe et conférences jusqu'à 140 personnes.",
    image: "/images/destinations/positano.jpg",
    specs: "6 Salons Modulables",
    lens: "Hasselblad X2D · 55mm V",
    altitude: "Fibre Dédiée & Écrans 4K",
    roomHref: "/rooms/terrace-garden-room",
  },
  {
    id: "lisbon",
    plateLabel: "Planche 07",
    category: "architecture",
    badge: "Salon Exécutif",
    location: "Étage Direction",
    title: "Lounge Affaires & Terrasse",
    subtitle: "Espace Calme & Travail",
    description:
      "Salon feutré ouvert aux participants de conférences et hôtes des suites pour échanger autour d'un café.",
    image: "/images/destinations/lisbon.jpg",
    specs: "Lounge & Pauses Café",
    lens: "Leica Q3 · 28mm Summilux",
    altitude: "Accès Exécutif Inclus",
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
    <div className="bg-white text-[#1a1c1a]">
      {/* Top Editorial Header & Curated Title Area */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-10 pb-8">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e9e8e5] text-[#001510] text-[12px] font-medium tracking-[0.02em]">
                <Camera className="w-3.5 h-3.5 text-[#3d6659]" strokeWidth={1.75} />
                <span>Anthologie Visuelle — King&apos;s Bed Hotel</span>
              </div>
              <h1 className="text-[40px] sm:text-[52px] lg:text-[56px] leading-[1.1] text-[#001510] tracking-[-0.03em] font-semibold">
                Explorez Chaque Espace de l&apos;Hôtel
              </h1>
              <p className="text-[17px] sm:text-[18px] leading-[1.55] text-[#414846] max-w-2xl">
                Un regard en images sur nos chambres King Size, notre salon petit-déjeuner,
                nos salles de réunion et de conférence ainsi que nos chambres &amp; suites.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#f4f3f0] px-5 py-2.5 rounded-full shadow-sm self-start lg:self-end shrink-0">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#3d6659]" />
                <span className="text-[12px] text-[#1a1c1a] font-semibold">
                  38 Vues Haute Définition
                </span>
              </div>
              <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
              <span className="text-[12px] text-[#414846] font-medium">
                Collection 2024–2025
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
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
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
                      <span>Crépuscule 18h42</span>
                      <span className="w-1 h-1 rounded-full bg-white/50" />
                      <span>Photo : Markos V.</span>
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
                        85 m² d&apos;Espace
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
                      <span className="flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-[#3d6659]" />
                        Lit King Size en Teck
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
                      <span>Petit-Déjeuner Inclus</span>
                    </div>
                    <Link
                      href={oceanPlate.roomHref ?? "/rooms"}
                      className="text-[12px] text-[#001510] font-semibold flex items-center gap-1 hover:text-[#3d6659] shrink-0"
                    >
                      Voir les Détails
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Right 5-col: Salle de bain en pierre */}
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
                        <Gift className="w-3.5 h-3.5 text-[#3d6659]" />
                        Pierre Naturelle
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
                      <span>Vue Jardin &amp; Calme</span>
                    </div>
                    <Link
                      href={bathPlate.roomHref ?? "/rooms"}
                      className="text-[12px] text-[#001510] font-semibold flex items-center gap-1 hover:text-[#3d6659] shrink-0"
                    >
                      Découvrir la Suite
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
                        Agrandir
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
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 my-14">
        <Reveal>
          <div className="bg-white border border-[#EDEDEA] rounded-3xl p-6 md:p-12 relative overflow-hidden shadow-[0_8px_30px_rgba(13,43,36,0.04)]">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 space-y-3">
                <div className="inline-flex items-center gap-2 text-[#3d6659] text-[11px] uppercase tracking-widest font-semibold">
                  <BookOpen className="w-4 h-4" />
                  <span>Regard Architectural</span>
                </div>
                <h2 className="text-[28px] md:text-[36px] leading-[1.15] text-[#001510] tracking-tight font-medium">
                  Lumière Naturelle, Pierre &amp; Sérénité
                </h2>
                <p className="text-[15px] leading-[1.6] text-[#414846]">
                  Chaque espace du King&apos;s Bed Hotel est photographié en lumière
                  naturelle réelle : des chambres King Size jusqu&apos;à la salle de
                  petit-déjeuner et aux salons de conférence.
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
                      Directrice Artistique, King&apos;s Bed Hotel
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
                    100% Réel
                  </p>
                  <p className="text-[13px] text-[#414846]">
                    Prises de vues authentiques en lumière naturelle, sans retouche artificielle.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#bce9d9]/40 flex items-center justify-center text-[#3d6659]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <p className="text-[24px] text-[#001510] font-bold">
                    Proportions 1:1
                  </p>
                  <p className="text-[13px] text-[#414846]">
                    Plans et capacités exacts vérifiés pour chaque chambre et salle de réunion.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#bce9d9]/40 flex items-center justify-center text-[#3d6659]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <p className="text-[24px] text-[#001510] font-bold">
                    Contrôle Qualité
                  </p>
                  <p className="text-[13px] text-[#414846]">
                    Audit semestriel de la literie, de la table du matin et de l&apos;équipement AV.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Bottom Visual Call to Action Banner */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-20">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden shadow-lg">
            <SuiteImage
              src="/images/Call-toaction/call-to-action.jpg"
              alt="Feuillage luxuriant du King's Bed Hotel"
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="absolute inset-0"
            />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-8 md:p-12">
              <div className="space-y-2 max-w-xl">
                <span className="text-[11px] text-[#3d6659] uppercase tracking-wider font-semibold">
                  Réservez Votre Séjour ou Séminaire
                </span>
                <h2 className="text-[28px] md:text-[40px] leading-[1.15] text-[#001510] font-medium tracking-tight">
                  Vivez l&apos;Expérience King&apos;s Bed Hotel
                </h2>
                <p className="text-[15px] text-[#414846]">
                  Réservez votre chambre avec petit-déjeuner ou contactez notre équipe pour
                  visiter nos salles de réunion et de conférences.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <Link
                  href="/rooms"
                  className="px-7 py-3.5 rounded-full bg-[#001510] text-white hover:bg-[#0d2b24] text-[13px] font-semibold text-center transition-all shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Voir Toutes les Chambres</span>
                  <Compass className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-3.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#001510]/10 text-[#001510] hover:bg-white text-[13px] font-semibold text-center transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Demander un Devis Séminaire</span>
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
                aria-label="Fermer la galerie"
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
                aria-label="Photo précédente"
                onClick={() => cycleLightbox(-1)}
                className="absolute left-4 w-11 h-11 rounded-full bg-[#001510]/60 text-white hover:bg-[#001510] transition-all flex items-center justify-center backdrop-blur-sm shadow cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Photo suivante"
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
                  <span>Optique : {activePlate.lens}</span>
                  <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
                  <span>{activePlate.altitude}</span>
                  <span className="w-1 h-1 rounded-full bg-[#c1c8c4]" />
                  <span className="text-[#3d6659] font-semibold">
                    Disponible à la Réservation
                  </span>
                </div>
              </div>
              <Link
                href={activePlate.roomHref ?? "/account/reservation"}
                className="px-6 py-2.5 rounded-full bg-[#0d2b24] text-white text-[13px] font-semibold shadow-sm hover:bg-[#001510] transition-colors inline-flex items-center gap-2 shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver cet Espace</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
