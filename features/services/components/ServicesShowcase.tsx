"use client";

import {
  ArrowRight,
  BedDouble,
  Building2,
  Car,
  ChevronRight,
  Clock,
  Coffee,
  ConciergeBell,
  Headphones,
  MapPin,
  Presentation,
  Sparkles,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { cn } from "@/lib/utils";

type ServiceCategory = "all" | "conferences" | "dining" | "rooms" | "wellness";

interface FilterOption {
  id: ServiceCategory;
  label: string;
}

const SERVICE_FILTERS: readonly FilterOption[] = [
  { id: "all", label: "Tous les Services" },
  { id: "conferences", label: "Réunions & Conférences" },
  { id: "dining", label: "Petit-Déjeuner" },
  { id: "rooms", label: "Chambres & Suites" },
  { id: "wellness", label: "Transferts & Conciergerie" },
];

export function ServicesShowcase() {
  const [activeFilter, setActiveFilter] = useState<ServiceCategory>("all");

  const showConferences = activeFilter === "all" || activeFilter === "conferences";
  const showDining = activeFilter === "all" || activeFilter === "dining";
  const showRooms = activeFilter === "all" || activeFilter === "rooms";
  const showWellness = activeFilter === "all" || activeFilter === "wellness";

  return (
    <div className="flex flex-col w-full bg-white text-[#1a1c1a]">
      {/* Hero Header & Filter Bar */}
      <section className="relative w-full pt-12 pb-14 md:py-16 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e9e8e5] text-[#001510] text-[12px] font-medium tracking-[0.02em]">
                  <ConciergeBell className="w-3.5 h-3.5 text-[#3d6659]" strokeWidth={1.75} />
                  <span>Services Hôteliers &amp; Affaires</span>
                </div>
                <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#001510] text-balance">
                  L&apos;Art de Recevoir, Séjourner &amp; Réunir
                </h1>
                <p className="text-[17px] sm:text-[18px] leading-[1.55] text-[#414846] max-w-xl">
                  Au King&apos;s Bed Hotel, profitez d&apos;une hospitalité complète alliant
                  chambres King Size, petit-déjeuner artisanal servi chaque matin et salles
                  de réunion ou de conférences entièrement équipées.
                </p>
              </div>

              {/* Live Service Summary Card */}
              <div className="flex items-center gap-4 bg-[#f4f3f0] p-4 rounded-2xl border border-[#1a1c1a]/5 self-start lg:self-auto shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#c9eade] flex items-center justify-center text-[#001510]">
                  <Building2 className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[24px] leading-tight text-[#001510] font-bold tabular-nums">
                      24/7
                    </span>
                    <span className="text-[12px] text-[#3d6659] font-bold">
                      Conciergerie
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-[#414846]">
                    Chambres, Breakfast &amp; Conférences
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Category Filter Pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2"
            role="tablist"
            aria-label="Filtrer par pôle de service"
          >
            {SERVICE_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer",
                    isActive
                      ? "bg-[#001510] text-white shadow-sm"
                      : "bg-[#e9e8e5] text-[#1a1c1a] hover:bg-[#e3e2e0]"
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Services Showcase Grid */}
      <section className="w-full px-6 lg:px-10 pb-20">
        <div className="max-w-[1440px] mx-auto space-y-10">
          {/* Card 1: Réunions & Conférences (Wide 12-Col Feature) */}
          {showConferences ? (
            <Reveal>
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(13,43,36,0.06)] border border-[#1a1c1a]/5 transition-all duration-300 hover:shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
                  <div className="lg:col-span-7 relative h-80 lg:h-auto overflow-hidden bg-[#0d2b24]">
                    <SuiteImage
                      src="/images/about/about-lounge.jpg"
                      alt="Salles de réunion et conférences lumineuses du King's Bed Hotel"
                      sizes="(max-width: 1024px) 100vw, 840px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/55 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/92 backdrop-blur-md shadow-sm">
                      <span className="text-[12px] text-[#001510] font-bold flex items-center gap-1.5">
                        <Presentation className="w-4 h-4 text-[#3d6659]" strokeWidth={1.75} />
                        Affaires &amp; Événements
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#3d6659]" strokeWidth={1.75} />
                          <span className="text-[12px] font-medium text-[#414846] uppercase tracking-wider">
                            Centre de Conférences · 1er Étage
                          </span>
                        </div>
                        <h2 className="text-[32px] lg:text-[40px] leading-[1.15] font-medium text-[#001510] tracking-tight">
                          Salles de Réunion &amp; Conférences Équipées
                        </h2>
                      </div>

                      <p className="text-[15px] leading-[1.6] text-[#414846]">
                        Des salons acoustiques modulables et baignés de lumière naturelle
                        pour vos comités de direction, séminaires résidentiels et lancements
                        jusqu&apos;à 120 personnes, avec régie technique dédiée.
                      </p>

                      <div className="space-y-3 pt-1">
                        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f4f3f0]">
                          <div className="w-8 h-8 rounded-full bg-[#001510] text-white flex items-center justify-center shrink-0">
                            <Wifi className="w-4 h-4" strokeWidth={1.75} />
                          </div>
                          <div>
                            <h3 className="text-[15px] font-semibold leading-tight text-[#001510]">
                              Audiovisuel 4K &amp; Visioconférence
                            </h3>
                            <p className="text-[13px] leading-[1.5] text-[#414846] mt-0.5">
                              Écrans géants interactifs, fibre symétrique dédiée et sonorisation
                              de studio.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f4f3f0]">
                          <div className="w-8 h-8 rounded-full bg-[#001510] text-white flex items-center justify-center shrink-0">
                            <Coffee className="w-4 h-4" strokeWidth={1.75} />
                          </div>
                          <div>
                            <h3 className="text-[15px] font-semibold leading-tight text-[#001510]">
                              Forfaits Journée d&apos;Étude
                            </h3>
                            <p className="text-[13px] leading-[1.5] text-[#414846] mt-0.5">
                              Accueil café, pauses gourmandes artisanales et déjeuners
                              d&apos;affaires coordonnés sur mesure.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-semibold text-[#414846] block">
                          À partir de
                        </span>
                        <span className="text-[24px] text-[#001510] font-bold tabular-nums">
                          321 000 F CFA{" "}
                          <span className="text-[13px] font-normal text-[#414846]">
                            / demi-journée
                          </span>
                        </span>
                      </div>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#001510] text-white text-[14px] font-semibold hover:bg-[#0d2b24] transition-colors shadow-sm whitespace-nowrap"
                      >
                        Demander un Devis
                        <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ) : null}

          {/* 2-Column Grid: Petit-Déjeuner & Chambres */}
          {showDining || showRooms ? (
            <div
              className={cn(
                "grid grid-cols-1 gap-6",
                showDining && showRooms ? "md:grid-cols-2" : "md:grid-cols-1 max-w-2xl"
              )}
            >
              {/* Card 2: Petit-Déjeuner Artisanal */}
              {showDining ? (
                <Reveal>
                  <div className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(13,43,36,0.06)] border border-[#1a1c1a]/5 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-72 overflow-hidden bg-[#EFE6D6]">
                      <SuiteImage
                        src="/images/gallery/chef-tasting.jpg"
                        alt="Petit-déjeuner artisanal et table gourmande au King's Bed Hotel"
                        sizes="(max-width: 768px) 100vw, 680px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-5 left-5 px-3.5 py-1 rounded-full bg-white/92 backdrop-blur-md shadow-sm">
                        <span className="text-[12px] text-[#001510] font-bold">
                          Saveurs du Matin
                        </span>
                      </div>
                      <div className="absolute bottom-5 right-5 px-4 py-2 rounded-full bg-white shadow-sm flex items-center gap-1 tabular-nums">
                        <span className="text-[16px] text-[#001510] font-bold">18 000 F CFA</span>
                        <span className="text-[13px] text-[#414846]">/ personne</span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-between flex-grow space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#3d6659]" strokeWidth={1.75} />
                          <span className="text-[12px] font-medium text-[#414846] uppercase tracking-wider">
                            Verrière &amp; Service en Chambre
                          </span>
                        </div>
                        <h2 className="text-[24px] font-semibold text-[#001510] tracking-tight">
                          Petit-Déjeuner Artisanal &amp; Table
                        </h2>
                        <p className="text-[15px] leading-[1.6] text-[#414846]">
                          Buffet chaud et froid préparé dès l&apos;aube avec viennoiseries
                          au beurre AOP, œufs fermiers, jus pressés et spécialités de saison.
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        <div className="flex items-center gap-2.5 text-[13px] font-medium text-[#1a1c1a]">
                          <Clock className="w-4 h-4 text-[#3d6659] shrink-0" strokeWidth={1.75} />
                          <span>Servi chaque matin de 06h30 à 10h30 ou en chambre</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] font-medium text-[#1a1c1a]">
                          <UtensilsCrossed className="w-4 h-4 text-[#3d6659] shrink-0" strokeWidth={1.75} />
                          <span>Options sans gluten, végétales &amp; plateaux séminaires</span>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-[#e9e8e5]">
                        <span className="text-[12px] text-[#3d6659] font-bold">
                          Inclus sur les tarifs Petit-Déjeuner
                        </span>
                        <Link
                          href="/reservation"
                          aria-label="Réserver un séjour avec petit-déjeuner"
                          className="w-11 h-11 rounded-full bg-[#e9e8e5] flex items-center justify-center text-[#001510] hover:bg-[#001510] hover:text-white transition-colors"
                        >
                          <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ) : null}

              {/* Card 3: Chambres King Size & Suites */}
              {showRooms ? (
                <Reveal delay={0.05}>
                  <div className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(13,43,36,0.06)] border border-[#1a1c1a]/5 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-72 overflow-hidden bg-[#EFE6D6]">
                      <SuiteImage
                        src="/images/rooms/oceanfront-sanctuary.jpg"
                        alt="Chambre King Size lumineuse au King's Bed Hotel"
                        sizes="(max-width: 768px) 100vw, 680px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-5 left-5 px-3.5 py-1 rounded-full bg-white/92 backdrop-blur-md shadow-sm">
                        <span className="text-[12px] text-[#001510] font-bold">
                          Repos &amp; Confort
                        </span>
                      </div>
                      <div className="absolute bottom-5 right-5 px-4 py-2 rounded-full bg-white shadow-sm flex items-center gap-1 tabular-nums">
                        <span className="text-[16px] text-[#001510] font-bold">196 000 F CFA</span>
                        <span className="text-[13px] text-[#414846]">/ nuit</span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-between flex-grow space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#3d6659]" strokeWidth={1.75} />
                          <span className="text-[12px] font-medium text-[#414846] uppercase tracking-wider">
                            Chambres &amp; Suites King Size
                          </span>
                        </div>
                        <h2 className="text-[24px] font-semibold text-[#001510] tracking-tight">
                          Literie Royale &amp; Service Hôtelier 24h/24
                        </h2>
                        <p className="text-[15px] leading-[1.6] text-[#414846]">
                          Chambres insonorisées dotées de lits King Size haute couture,
                          d&apos;un espace bureau exécutif et d&apos;une conciergerie permanente.
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        <div className="flex items-center gap-2.5 text-[13px] font-medium text-[#1a1c1a]">
                          <BedDouble className="w-4 h-4 text-[#3d6659] shrink-0" strokeWidth={1.75} />
                          <span>Menu d&apos;oreillers sur mesure &amp; satin de coton</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] font-medium text-[#1a1c1a]">
                          <ConciergeBell className="w-4 h-4 text-[#3d6659] shrink-0" strokeWidth={1.75} />
                          <span>Arrivée fluide, pressing express &amp; room-service</span>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-[#e9e8e5]">
                        <span className="text-[12px] text-[#3d6659] font-bold">
                          5 Catégories Disponibles
                        </span>
                        <Link
                          href="/rooms"
                          aria-label="Découvrir nos chambres et suites"
                          className="w-11 h-11 rounded-full bg-[#e9e8e5] flex items-center justify-center text-[#001510] hover:bg-[#001510] hover:text-white transition-colors"
                        >
                          <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ) : null}
            </div>
          ) : null}

          {/* Card 4: Transferts Chauffeur & Conciergerie (Wide Landscape Reversed) */}
          {showWellness ? (
            <Reveal>
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(13,43,36,0.06)] border border-[#1a1c1a]/5 transition-all duration-300 hover:shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                  <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between order-2 lg:order-1">
                    <div className="space-y-5">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#3d6659]" strokeWidth={1.75} />
                        <span className="text-[12px] font-medium text-[#414846] uppercase tracking-wider">
                          Accueil Gare &amp; Aéroport · 24h/24
                        </span>
                      </div>
                      <h2 className="text-[32px] lg:text-[40px] leading-[1.15] font-medium text-[#001510] tracking-tight">
                        Transferts Chauffeur &amp; Conciergerie
                      </h2>
                      <p className="text-[15px] leading-[1.6] text-[#414846]">
                Rejoignez gares et aéroports à bord de nos berlines avec chauffeur
                        privé, ou laissez notre conciergerie 24h/24 organiser vos
                        transferts et accueils pour vos séminaires.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-2 text-[12px] font-medium text-[#414846]">
                        <span>Chauffeur Privé</span>
                        <span aria-hidden="true">·</span>
                        <span>Accueil VIP</span>
                        <span aria-hidden="true">·</span>
                        <span>Conciergerie 24h/24</span>
                      </div>
                    </div>

                    <div className="pt-8 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-semibold text-[#414846] block">
                          Transfert dès
                        </span>
                        <span className="text-[24px] text-[#001510] font-bold tabular-nums">
                          56 000 F CFA{" "}
                          <span className="text-[13px] font-normal text-[#414846]">
                            / trajet
                          </span>
                        </span>
                      </div>
                      <Link
                        href="/reservation"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#001510] text-white text-[14px] font-semibold hover:bg-[#0d2b24] transition-colors shadow-sm whitespace-nowrap"
                      >
                        Réserver un Service
                        <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-7 relative h-80 lg:h-auto overflow-hidden order-1 lg:order-2 bg-[#EFE6D6]">
                    <SuiteImage
                      src="/images/contact/concierge-desk.jpg"
                      alt="Berline avec chauffeur privé et conciergerie du King's Bed Hotel"
                      sizes="(max-width: 1024px) 100vw, 840px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-white/92 backdrop-blur-md shadow-sm">
                      <span className="text-[12px] text-[#001510] font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#3d6659]" strokeWidth={1.75} />
                        Mobilité &amp; Accueil
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* 4-Column Bento Features Section */}
      <section className="w-full bg-white border-t border-[#EDEDEA] py-20 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <Reveal>
            <div className="max-w-2xl space-y-3">
              <span className="text-[12px] text-[#3d6659] uppercase font-bold tracking-widest block">
                Privilèges Exclusifs
              </span>
              <h2 className="text-[32px] lg:text-[40px] leading-[1.15] font-medium text-[#001510] tracking-tight">
                Des Prestations Pensées pour Chaque Instant
              </h2>
              <p className="text-[15px] leading-[1.6] text-[#414846]">
                Chaque détail de votre séjour ou événement professionnel est orchestré
                avec précision par les équipes du King&apos;s Bed Hotel.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[#EDEDEA] p-8 rounded-3xl space-y-6 shadow-[0_8px_30px_rgba(13,43,36,0.04)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#bce9d9] flex items-center justify-center text-[#0d2b24]">
                  <Car className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-[20px] font-semibold text-[#001510]">
                  Transferts Chauffeur Privé
                </h3>
                <p className="text-[13px] leading-[1.55] text-[#414846]">
                  Accueil personnalisé en gare ou à l&apos;aéroport avec flotte de
                  berlines électriques disponible à toute heure sur réservation.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/reservation"
                  className="text-[12px] text-[#3d6659] font-bold inline-flex items-center gap-1 hover:text-[#001510] transition-colors"
                >
                  Accueil Gare &amp; Aéroport
                  <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>

            <div className="bg-white border border-[#EDEDEA] p-8 rounded-3xl space-y-6 shadow-[0_8px_30px_rgba(13,43,36,0.04)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#bce9d9] flex items-center justify-center text-[#0d2b24]">
                  <UtensilsCrossed className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-[20px] font-semibold text-[#001510]">
                  Petit-Déjeuner &amp; Pauses
                </h3>
                <p className="text-[13px] leading-[1.55] text-[#414846]">
                  Buffet artisanal sous la verrière dès 06h30, service en chambre et
                  pauses gourmandes sur mesure pour vos participants.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/reservation"
                  className="text-[12px] text-[#3d6659] font-bold inline-flex items-center gap-1 hover:text-[#001510] transition-colors"
                >
                  Produits Frais du Jour
                  <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>

            <div className="bg-white border border-[#EDEDEA] p-8 rounded-3xl space-y-6 shadow-[0_8px_30px_rgba(13,43,36,0.04)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#bce9d9] flex items-center justify-center text-[#0d2b24]">
                  <Presentation className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-[20px] font-semibold text-[#001510]">
                  Salles de Conférence 4K
                </h3>
                <p className="text-[13px] leading-[1.55] text-[#414846]">
                  Quatre espaces modulables de 8 à 120 places équipés d&apos;écrans 4K,
                  micros sans fil et assistance technique continue.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-[12px] text-[#3d6659] font-bold inline-flex items-center gap-1 hover:text-[#001510] transition-colors"
                >
                  Capacité 8 à 120 Places
                  <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>

            <div className="bg-white border border-[#EDEDEA] p-8 rounded-3xl space-y-6 shadow-[0_8px_30px_rgba(13,43,36,0.04)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#bce9d9] flex items-center justify-center text-[#0d2b24]">
                  <Sparkles className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-[20px] font-semibold text-[#001510]">
                  Conciergerie &amp; Assistance
                </h3>
                <p className="text-[13px] leading-[1.55] text-[#414846]">
                  Accueil personnalisé, coordination de vos transferts et suivi de vos
                  événements par une conciergerie attentive 24 heures sur 24.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-[12px] text-[#3d6659] font-bold inline-flex items-center gap-1 hover:text-[#001510] transition-colors"
                >
                  Assistance Permanente
                  <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem / Hotel Spaces Overview Card */}
      <section className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgba(13,43,36,0.06)] border border-[#1a1c1a]/5">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                <div>
                  <span className="text-[12px] text-[#3d6659] uppercase font-bold tracking-widest block mb-1">
                    Architecture &amp; Espaces
                  </span>
                  <h2 className="text-[32px] lg:text-[40px] leading-[1.15] font-medium text-[#001510] tracking-tight">
                    L&apos;Écosystème King&apos;s Bed Hotel
                  </h2>
                  <p className="text-[15px] leading-[1.6] text-[#414846] mt-1">
                    Une organisation fluide réunissant chambres calmes, verrière
                    petit-déjeuner et salons de conférence au sein d&apos;une même adresse.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#e9e8e5] text-[12px] font-medium text-[#1a1c1a] shrink-0">
                  <Building2 className="w-4 h-4 text-[#3d6659]" strokeWidth={1.75} />
                  <span>4 Pôles Ouverts 7j/7</span>
                </div>
              </div>

              <div className="relative w-full h-[460px] rounded-2xl overflow-hidden bg-[#0d2b24]">
                <SuiteImage
                  src="/images/hero/hero-pool.jpg"
                  alt="Architecture et espaces du King's Bed Hotel"
                  sizes="(max-width: 1440px) 100vw, 1360px"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                  aria-hidden="true"
                />

                {/* Translucent Floating Info Cards */}
                <div className="absolute bottom-6 left-6 right-6 lg:right-auto flex flex-wrap gap-3">
                  <div className="bg-white/92 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3">
                    <BedDouble className="w-5 h-5 text-[#3d6659] shrink-0" strokeWidth={1.75} />
                    <div>
                      <p className="text-[13px] text-[#001510] font-bold">
                        Aile Chambres &amp; Suites
                      </p>
                      <p className="text-[11px] text-[#414846]">
                        Étages 2 à 5 · Literie King Size
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/92 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3">
                    <UtensilsCrossed className="w-5 h-5 text-[#3d6659] shrink-0" strokeWidth={1.75} />
                    <div>
                      <p className="text-[13px] text-[#001510] font-bold">
                        Verrière Petit-Déjeuner
                      </p>
                      <p className="text-[11px] text-[#414846]">
                        Rez-de-Jardin · 06h30 – 10h30
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/92 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3">
                    <Presentation className="w-5 h-5 text-[#3d6659] shrink-0" strokeWidth={1.75} />
                    <div>
                      <p className="text-[13px] text-[#001510] font-bold">
                        Centre de Conférences
                      </p>
                      <p className="text-[11px] text-[#414846]">
                        1er Étage · 4 Salons Équipés
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Dark Green Bottom CTA Banner */}
      <section className="w-full px-6 lg:px-10 pb-16 bg-white">
        <div className="max-w-[1440px] mx-auto bg-[#0d2b24] rounded-3xl p-10 md:p-16 text-white relative overflow-hidden shadow-xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#3d6659]/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-[12px] text-[#bce9d9] uppercase tracking-widest font-bold block">
              Votre Séjour Commence Ici
            </span>
            <h2 className="text-[36px] md:text-[52px] leading-[1.1] font-semibold tracking-tight text-white text-balance">
              Prêt à Réserver Votre Chambre ou Séminaire ?
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#c9eade] max-w-xl">
              Contactez notre équipe dédiée pour organiser un séjour avec
              petit-déjeuner ou recevoir une proposition sur mesure pour vos réunions et
              conférences.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/reservation"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#001510] text-[14px] font-bold shadow-md hover:bg-[#f4f3f0] transition-all whitespace-nowrap"
              >
                Réserver Maintenant
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#001510]/40 backdrop-blur-md text-white text-[14px] font-semibold hover:bg-[#001510]/60 transition-all whitespace-nowrap"
              >
                <Headphones className="w-4 h-4" strokeWidth={1.75} />
                Contacter la Conciergerie
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
