"use client";

import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Headphones,
  Heart,
  Maximize2,
  Plane,
  Star,
  Users,
  Utensils,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { roomsMock } from "@/mocks/rooms";
import type { Room } from "@/types/hotel.types";

const CURATED_FOUR_SLUGS = [
  "oceanfront-sanctuary-suite",
  "royal-garden-villa",
  "palm-horizon-suite",
  "penthouse-horizon-retreat",
] as const;

const FAQ_ITEMS = [
  {
    id: "bedding",
    icon: BedDouble,
    question: "En quoi consiste la literie King Size et le Bar à Oreillers ?",
    answer:
      "Dès votre réservation au King's Bed Hotel, choisissez parmi 8 profils d'oreillers (duvet naturel, mousse à mémoire de forme rafraîchissante, sarrasin ou soie). Toutes nos chambres sont équipées de draps en satin de coton égyptien 600 fils.",
  },
  {
    id: "dining",
    icon: Utensils,
    question: "Comment fonctionnent le petit-déjeuner et le service en chambre ?",
    answer:
      "Le petit-déjeuner artisanal est servi chaque matin de 06h30 à 11h00 au salon de l'Orangerie ou directement en chambre sans supplément de plateau. Nos équipes préparent également des pauses café et plateaux pour vos réunions.",
  },
  {
    id: "policies",
    icon: Clock,
    question: "Quels sont les horaires d'arrivée, de départ et d'accès aux salles ?",
    answer:
      "L'enregistrement est garanti dès 15h00 et le départ s'effectue jusqu'à 12h00. Un départ tardif jusqu'à 14h00 est offert selon disponibilité, et nos salons de réunion restent accessibles sur réservation de 07h30 à 22h00.",
  },
  {
    id: "transfers",
    icon: Plane,
    question: "Proposez-vous des transferts privés et un accueil séminaire ?",
    answer:
      "Oui, nos suites et forfaits conférence incluent la coordination de transferts privés depuis la gare ou l'aéroport, ainsi qu'un accueil dédié pour vos intervenants et invités.",
  },
] as const;

export function RoomsCollectionView() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroSaved, setHeroSaved] = useState(false);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [expandedFaq, setExpandedFaq] = useState<string>("bedding");

  const featuredSuite =
    roomsMock.find((r) => r.slug === "oceanfront-sanctuary-suite") ?? roomsMock[0];

  const displayedRooms = roomsMock;

  const comparisonRows = useMemo(
    () =>
      CURATED_FOUR_SLUGS.map((slug) =>
        roomsMock.find((r) => r.slug === slug)
      ).filter((r): r is Room => Boolean(r)),
    []
  );

  const dotColors = [
    "bg-[#3d6659]",
    "bg-[#0d2b24]",
    "bg-[#a3d0c0]",
    "bg-[#1d0d00]",
  ];

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <div className="bg-white text-[#1a1c1a]">
      {/* Top Banner & Editorial Hero Header */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 pb-10">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e9e8e5] text-[#001510] text-[12px] font-medium tracking-[0.02em]">
                <BedDouble className="w-3.5 h-3.5 text-[#3d6659]" strokeWidth={1.75} />
                <span>Collection Hôtelière King&apos;s Bed 2025</span>
              </div>
              <h1 className="text-[40px] sm:text-[52px] lg:text-[56px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#001510]">
                Trouvez Votre Chambre Idéale
              </h1>
              <p className="text-[17px] sm:text-[18px] leading-[1.55] text-[#414846]">
                Chambres King Size, suites exécutives et hébergements avec
                petit-déjeuner inclus et accès privilégié à nos salles de
                réunion et de conférences.
              </p>
            </div>

            {/* Quick Trust Indicators */}
            <div className="flex items-center gap-4 pb-1 shrink-0">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-[#e9e8e5] flex items-center justify-center text-[11px] font-semibold text-[#001510] shadow-sm ring-2 ring-white">
                  KB
                </div>
                <div className="w-10 h-10 rounded-full bg-[#bce9d9] flex items-center justify-center text-[11px] font-semibold text-[#416b5d] shadow-sm ring-2 ring-white">
                  4.9
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0d2b24] text-white flex items-center justify-center text-[11px] font-semibold shadow-sm ring-2 ring-white">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[#001510]">
                  King&apos;s Bed Hotel Savalou
                </span>
                <span className="text-[13px] text-[#414846]">
                  Clef Michelin &amp; Affaires Certifié
                </span>
              </div>
            </div>
          </div>
        </Reveal>

      </section>

      {/* Featured / Hero Suite Showcase */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-4">
        <Reveal delay={0.08}>
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(13,43,36,0.08)] grid grid-cols-1 lg:grid-cols-12 border border-[#1a1c1a]/5">
            {/* Media Left Column */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px] overflow-hidden group">
              <SuiteImage
                src={
                  featuredSuite.gallery[
                    heroSlide % featuredSuite.gallery.length
                  ]
                }
                alt={featuredSuite.name}
                sizes="(max-width: 1024px) 100vw, 760px"
                priority
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001510]/45 via-transparent to-transparent lg:hidden" />

              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#001510] text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-[#416b5d] fill-current" />
                  Suite Signature
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#001510]/85 backdrop-blur-md text-white text-[11px] font-semibold">
                  Chambre 04B
                </span>
              </div>

              {/* Interactive Dot Navigation Indicator */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                {featuredSuite.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Voir la photo ${idx + 1} de la suite`}
                    onClick={() => setHeroSlide(idx)}
                    className={`rounded-full transition-all cursor-pointer ${
                      heroSlide === idx
                        ? "w-2 h-2 bg-[#001510]"
                        : "w-1.5 h-1.5 bg-[#414846]/40 hover:bg-[#414846]"
                    }`}
                  />
                ))}
                <span className="text-[11px] font-semibold text-[#001510] ml-1">
                  {heroSlide + 1} / {featuredSuite.gallery.length}
                </span>
              </div>
            </div>

            {/* Detail Right Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-semibold text-[#3d6659] uppercase tracking-widest">
                    Disponible Immédiatement
                  </span>
                  <div className="flex items-center text-[#416b5d]">
                    <BadgeCheck className="w-4 h-4" />
                    <span className="text-[11px] font-semibold ml-1">
                      King&apos;s Bed Certifié
                    </span>
                  </div>
                </div>

                <div>
                  <Link href={`/rooms/${featuredSuite.slug}`}>
                    <h2 className="text-[30px] sm:text-[36px] leading-[1.15] font-medium tracking-[-0.02em] text-[#001510] hover:text-[#3d6659] transition-colors">
                      {featuredSuite.name}
                    </h2>
                  </Link>
                  <p className="text-[15px] leading-[1.6] text-[#414846] mt-2.5">
                    {featuredSuite.description}
                  </p>
                </div>

                {/* Feature Spec Grid */}
                <div className="grid grid-cols-3 gap-2.5 py-2">
                  <div className="bg-[#f4f3f0] p-3 rounded-2xl text-center">
                    <Maximize2 className="w-4 h-4 text-[#001510] mx-auto mb-1" />
                    <p className="text-[11px] font-semibold text-[#414846]">
                      Surface
                    </p>
                    <p className="text-[14px] font-semibold text-[#001510]">
                      {featuredSuite.sizeSqm} m²
                    </p>
                  </div>
                  <div className="bg-[#f4f3f0] p-3 rounded-2xl text-center">
                    <Users className="w-4 h-4 text-[#001510] mx-auto mb-1" />
                    <p className="text-[11px] font-semibold text-[#414846]">
                      Hôtes
                    </p>
                    <p className="text-[14px] font-semibold text-[#001510]">
                      {featuredSuite.maxGuests} Adultes
                    </p>
                  </div>
                  <div className="bg-[#f4f3f0] p-3 rounded-2xl text-center">
                    <Waves className="w-4 h-4 text-[#001510] mx-auto mb-1" />
                    <p className="text-[11px] font-semibold text-[#414846]">
                      Bien-Être
                    </p>
                    <p className="text-[14px] font-semibold text-[#001510]">
                      Bassin Privé
                    </p>
                  </div>
                </div>

                {/* Amenity Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    "Literie King Size Satin",
                    "Petit-Déjeuner Inclus",
                    "Bureau & Wi-Fi Pro",
                    "Conciergerie 24h/24",
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="px-2.5 py-1 rounded-full bg-[#efeeeb] text-[#414846] text-[11px] font-semibold"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing & Reservation CTA */}
              <div className="pt-5 border-t border-[#efeeeb] flex items-center justify-between gap-3 mt-5">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[36px] leading-none font-semibold tracking-[-0.02em] text-[#001510]">
                      {featuredSuite.pricePerNight.toLocaleString("fr-FR")} F CFA
                    </span>
                    <span className="text-[13px] text-[#414846]">/ nuit</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#414846]">
                    Hors taxe de séjour (9 000 F CFA)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHeroSaved((v) => !v)}
                    aria-label="Enregistrer cette suite"
                    title={heroSaved ? "Enregistrée" : "Enregistrer cette suite"}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      heroSaved
                        ? "bg-[#bce9d9] text-[#001510]"
                        : "bg-[#e9e8e5] text-[#1a1c1a] hover:bg-[#e3e2e0]"
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${heroSaved ? "fill-current" : ""}`}
                    />
                  </button>
                  <Link
                    href={`/reservation?room=${featuredSuite.slug}`}
                    className="px-6 py-3 rounded-full bg-[#0d2b24] text-white text-[14px] font-semibold hover:bg-[#001510] transition-all duration-200 shadow-sm inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Réserver</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Complete Catalogue Grid */}
      <section
        id="catalogue-grid"
        className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-[12px] font-medium text-[#3d6659] uppercase tracking-widest">
              Hébergements &amp; Confort Royal
            </span>
            <h2 className="text-[32px] sm:text-[40px] leading-[1.15] font-medium tracking-[-0.02em] text-[#001510]">
              Toutes nos Chambres &amp; Suites
            </h2>
          </div>
          <div className="text-[13px] text-[#414846] font-medium">
            {roomsMock.length} chambres &amp; suites affichées
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedRooms.map((room, idx) => {
              const nightlyXof = room.pricePerNight;
              const isWished = Boolean(wishlist[room.slug]);
              const badgeColor =
                room.badgeSublabel === "Résidence Privée"
                  ? "bg-[#ffdcbd] text-[#2c1600]"
                  : "bg-[#bce9d9]/90 text-[#416b5d]";

              return (
                <Reveal key={room.slug} delay={idx * 0.05}>
                  <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border border-[#1a1c1a]/5 h-full">
                    <div>
                      <div className="relative w-full h-72 overflow-hidden bg-[#efeeeb]">
                        <Link href={`/rooms/${room.slug}`} className="block w-full h-full">
                          <SuiteImage
                            src={room.image}
                            alt={room.name}
                            sizes="(max-width: 768px) 100vw, 600px"
                            className="group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                        <div className="absolute top-4 left-4 flex gap-1.5">
                          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#001510] text-[11px] font-semibold">
                            {room.badgeLabel ?? room.category}
                          </span>
                          {room.badgeSublabel && (
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-semibold ${badgeColor}`}
                            >
                              {room.badgeSublabel}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(room.slug)}
                          aria-label={`Ajouter ${room.name} aux favoris`}
                          className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
                            isWished
                              ? "bg-[#001510] text-white"
                              : "bg-white/85 text-[#1a1c1a] hover:bg-white"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${isWished ? "fill-current" : ""}`}
                          />
                        </button>
                        <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-white" />
                          <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                          <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 space-y-2.5">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#efeeeb] text-[#414846]">
                              {room.sizeSqm} m²
                            </span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#efeeeb] text-[#414846]">
                              {room.maxGuests} Hôtes
                            </span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#efeeeb] text-[#414846]">
                              {room.bedType.split("·")[0].trim()}
                            </span>
                          </div>
                          <div className="flex items-center text-[#001510] text-[11px] font-semibold">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-current mr-1" />
                            {(room.rating ?? 4.95).toFixed(2).replace(/\.00$/, ".0")}{" "}
                            ({room.reviewCount ?? 85})
                          </div>
                        </div>

                        <Link href={`/rooms/${room.slug}`}>
                          <h3 className="text-[20px] font-semibold text-[#001510] group-hover:text-[#3d6659] transition-colors">
                            {room.name}
                          </h3>
                        </Link>
                        <p className="text-[13px] leading-[1.5] text-[#414846] line-clamp-2">
                          {room.tagline}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {room.amenities.slice(0, 3).map((amenity) => (
                            <span
                              key={amenity}
                              className="px-2.5 py-1 rounded-full bg-[#f4f3f0] text-[#414846] text-[11px] font-semibold"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-5 sm:px-6 py-4 flex items-center justify-between border-t border-[#efeeeb]">
                      <div>
                        <span className="text-[12px] text-[#414846] block">
                          À partir de
                        </span>
                        <span className="text-[20px] font-semibold text-[#001510]">
                          {nightlyXof.toLocaleString("fr-FR")} F CFA{" "}
                          <span className="text-[13px] text-[#414846] font-normal">
                            / nuit
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/rooms/${room.slug}`}
                          className="px-4 py-2 rounded-full text-[12px] font-semibold text-[#414846] hover:text-[#1a1c1a] transition-colors"
                        >
                          Voir les Détails
                        </Link>
                        <Link
                          href={`/reservation?room=${room.slug}`}
                          className="px-5 py-2.5 rounded-full bg-[#0d2b24] text-white text-[12px] font-semibold hover:bg-[#001510] transition-all"
                        >
                          Réserver
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
        </div>
      </section>

      {/* Suite Comparison Matrix */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        <Reveal>
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#1a1c1a]/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
              <div>
                <span className="text-[12px] font-medium text-[#3d6659] uppercase tracking-widest">
                  Comparatif Détaillé
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.15] font-medium tracking-[-0.02em] text-[#001510]">
                  Tableau Comparatif des Suites
                </h2>
                <p className="text-[15px] text-[#414846] mt-1">
                  Comparez les surfaces, capacités, prestations petit-déjeuner et
                  services inclus dans nos catégories phares.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#414846] shrink-0">
                <span>Meilleur Tarif Direct Garanti</span>
                <BadgeCheck className="w-4 h-4 text-[#3d6659]" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr className="bg-[#f4f3f0] text-[#001510] text-[13px] font-semibold">
                    <th className="p-4 rounded-l-2xl">Chambre &amp; Suite</th>
                    <th className="p-4">Surface</th>
                    <th className="p-4">Capacité Max</th>
                    <th className="p-4">Vue &amp; Espace</th>
                    <th className="p-4">Bien-Être</th>
                    <th className="p-4">Petit-Déjeuner</th>
                    <th className="p-4 rounded-r-2xl">Chauffeur / Transfert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efeeeb] text-[#1a1c1a] text-[14px]">
                  {comparisonRows.map((row, idx) => {
                    const sqft = Math.round(row.sizeSqm * 10.764);
                    const chauffeurHighlighted =
                      row.chauffeurInfo?.includes("VIP") ||
                      row.chauffeurInfo?.includes("Inclus");
                    return (
                      <tr
                        key={row.slug}
                        className="hover:bg-[#f4f3f0]/60 transition-colors"
                      >
                        <td className="p-4">
                          <Link
                            href={`/rooms/${row.slug}`}
                            className="font-semibold text-[16px] text-[#001510] hover:text-[#3d6659] flex items-center gap-3 transition-colors"
                          >
                            <span
                              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                dotColors[idx % dotColors.length]
                              }`}
                            />
                            {row.name}
                          </Link>
                        </td>
                        <td className="p-4 text-[13px] font-medium text-[#1a1c1a]">
                          {row.sizeSqm} m² ({sqft.toLocaleString("fr-FR")} sq ft)
                        </td>
                        <td className="p-4">
                          {row.maxGuests} {row.maxGuests === 2 ? "Adultes" : "Hôtes"}
                        </td>
                        <td className="p-4 text-[#416b5d] font-medium text-[13px]">
                          {row.horizonView ?? "Vue Panoramique"}
                        </td>
                        <td className="p-4">{row.waterFeature ?? "Salle de Bain Privée"}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 text-[#3d6659] font-medium text-[13px]">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            {row.breakfastIncluded ?? "Inclus tous les matins"}
                          </span>
                        </td>
                        <td className="p-4">
                          {chauffeurHighlighted ? (
                            <span className="inline-flex items-center gap-1.5 text-[#3d6659] font-medium text-[13px]">
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              {row.chauffeurInfo}
                            </span>
                          ) : (
                            <span className="text-[#414846] text-[13px]">
                              {row.chauffeurInfo ?? "Sur demande"}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Interactive Amenities & Comfort Accordion FAQ */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[12px] font-medium text-[#3d6659] uppercase tracking-widest">
              Hospitalité &amp; Services
            </span>
            <h2 className="text-[32px] sm:text-[40px] leading-[1.15] font-medium tracking-[-0.02em] text-[#001510]">
              Équipements &amp; Attentions
            </h2>
            <p className="text-[15px] leading-[1.6] text-[#414846]">
              Chaque séjour au King&apos;s Bed Hotel inclut notre literie sur mesure,
              l&apos;accès au petit-déjeuner artisanal et l&apos;accompagnement de notre
              réception 24h/24.
            </p>
            <div className="bg-[#f4f3f0] p-5 rounded-3xl space-y-2 mt-4">
              <div className="flex items-center gap-3">
                <Headphones className="w-5 h-5 text-[#3d6659]" />
                <span className="text-[14px] font-semibold text-[#001510]">
                  Besoin d&apos;un aménagement ou d&apos;une salle ?
                </span>
              </div>
              <p className="text-[13px] text-[#414846]">
                Notre équipe prépare votre arrivée, vos préférences de literie ou
                votre salle de réunion privée.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#001510] hover:underline pt-1"
              >
                Contacter la Conciergerie
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {FAQ_ITEMS.map((item) => {
              const Icon = item.icon;
              const isOpen = expandedFaq === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-[#1a1c1a]/5 transition-all duration-200 overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setExpandedFaq((prev) => (prev === item.id ? "" : item.id))
                    }
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <h3 className="text-[17px] sm:text-[19px] font-semibold text-[#001510] flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[#3d6659] shrink-0" />
                      <span>{item.question}</span>
                    </h3>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#414846] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#414846] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-[#414846] text-[15px] leading-[1.6]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
