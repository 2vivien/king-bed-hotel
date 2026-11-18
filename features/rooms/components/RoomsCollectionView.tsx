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
  RotateCcw,
  Search,
  SlidersHorizontal,
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
import type { Room, RoomCategory, RoomExperienceTag } from "@/types/hotel.types";

type CategoryFilter = "all" | RoomCategory;
type CapacityFilter = "any" | "1-2" | "3-4" | "5+";
type ExperienceFilter = "all" | RoomExperienceTag;

const CATEGORY_TABS: readonly { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All Sanctuaries" },
  { id: "rooms", label: "Deluxe Rooms" },
  { id: "suites", label: "Executive Suites" },
  { id: "villas", label: "Ocean Villas" },
  { id: "penthouses", label: "Presidential Penthouses" },
];

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
    question: "What is the SuiteSavvy Bedding Menu & Pillow Bar?",
    answer:
      "Upon reservation, guests choose from 8 specialized pillow profiles (hypoallergenic Siberian goose down, cooling charcoal memory foam, buckwheat hulls, or organic lavender-infused silk). All suites feature 600-thread-count Egyptian sateen linens pressed daily.",
  },
  {
    id: "dining",
    icon: Utensils,
    question: "How does private in-room and poolside dining work?",
    answer:
      "Our Michelin-trained culinary brigade provides 24-hour à la carte service delivered directly to your terrace or private dining gazebo. For villas and penthouses, you may commission an exclusive private chef tasting menu prepared live in your residence kitchen.",
  },
  {
    id: "policies",
    icon: Clock,
    question: "What are the check-in and checkout policies?",
    answer:
      "Guaranteed check-in begins at 15:00 and checkout is at 12:00 noon. Guests reserving suites and villas receive complimentary flexible early check-in and late departure privileges subject to availability, alongside full access to our private arrival lounge and sea spas.",
  },
  {
    id: "transfers",
    icon: Plane,
    question: "Are private helicopter or luxury car transfers included?",
    answer:
      "Penthouse and Ocean Villa reservations include complimentary private Mercedes Maybach or Range Rover airport chauffeur service. Direct rooftop helipad transfers are coordinated upon request through our aviation desk.",
  },
] as const;

function matchesCapacity(room: Room, capacity: CapacityFilter): boolean {
  if (capacity === "any") return true;
  if (capacity === "1-2") return room.maxGuests <= 2;
  if (capacity === "3-4") return room.maxGuests >= 3 && room.maxGuests <= 4;
  return room.maxGuests >= 5;
}

export function RoomsCollectionView() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [maxBudget, setMaxBudget] = useState<number>(1500);
  const [capacity, setCapacity] = useState<CapacityFilter>("any");
  const [experience, setExperience] = useState<ExperienceFilter>("all");
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroSaved, setHeroSaved] = useState(false);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [expandedFaq, setExpandedFaq] = useState<string>("bedding");

  const featuredSuite =
    roomsMock.find((r) => r.slug === "oceanfront-sanctuary-suite") ?? roomsMock[0];

  const hasCustomFilter =
    category !== "all" ||
    maxBudget < 1500 ||
    capacity !== "any" ||
    experience !== "all";

  const displayedRooms = useMemo(() => {
    if (!hasCustomFilter) {
      return CURATED_FOUR_SLUGS.map((slug) =>
        roomsMock.find((r) => r.slug === slug)
      ).filter((r): r is Room => Boolean(r));
    }

    return roomsMock.filter((room) => {
      if (category !== "all" && room.category !== category) return false;
      const nightlyUsd = Math.round(room.pricePerNight / 100);
      if (maxBudget < 1500 && nightlyUsd > maxBudget) return false;
      if (!matchesCapacity(room, capacity)) return false;
      if (
        experience !== "all" &&
        !(room.experienceTags ?? []).includes(experience)
      ) {
        return false;
      }
      return true;
    });
  }, [category, maxBudget, capacity, experience, hasCustomFilter]);

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

  const handleReset = () => {
    setCategory("all");
    setMaxBudget(1500);
    setCapacity("any");
    setExperience("all");
  };

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <div className="bg-[#faf9f6] text-[#1a1c1a]">
      {/* Top Banner & Editorial Hero Header */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-8 pb-10">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#bce9d9]/50 text-[#416b5d] text-[12px] font-medium tracking-[0.03em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3d6659]" />
                Tailored Residential Collection 2025
              </div>
              <h1 className="text-[40px] sm:text-[52px] lg:text-[56px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#001510]">
                Find Your Perfect Stay
              </h1>
              <p className="text-[17px] sm:text-[18px] leading-[1.55] text-[#414846]">
                Curated sanctuaries, private suites, and architectural villas
                designed for uncompromised luxury and rest. Experience seamless
                tactile comfort with elevated ocean horizons.
              </p>
            </div>

            {/* Quick Trust Indicators */}
            <div className="flex items-center gap-4 pb-1 shrink-0">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-[#e9e8e5] flex items-center justify-center text-[11px] font-semibold text-[#001510] shadow-sm ring-2 ring-[#faf9f6]">
                  SS
                </div>
                <div className="w-10 h-10 rounded-full bg-[#bce9d9] flex items-center justify-center text-[11px] font-semibold text-[#416b5d] shadow-sm ring-2 ring-[#faf9f6]">
                  9.9
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0d2b24] text-white flex items-center justify-center text-[11px] font-semibold shadow-sm ring-2 ring-[#faf9f6]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[#001510]">
                  Top 1% Global Escapes
                </span>
                <span className="text-[13px] text-[#414846]">
                  Michelin Key &amp; LHW Certified
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Interactive Filter & Segment Bar */}
        <Reveal delay={0.05}>
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(13,43,36,0.06)] border border-[#1a1c1a]/5">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[#e9e8e5]">
              {CATEGORY_TABS.map((tab) => {
                const active = category === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCategory(tab.id)}
                    className={`px-5 py-2.5 rounded-full text-[12px] font-medium tracking-[0.02em] transition-all whitespace-nowrap cursor-pointer ${
                      active
                        ? "bg-[#001510] text-white shadow-sm"
                        : "bg-[#efeeeb] text-[#1a1c1a] hover:bg-[#e9e8e5]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Segmented Selectors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 items-center">
              {/* Nightly Budget Slider */}
              <div className="bg-[#f4f3f0] p-3 px-4 rounded-2xl flex flex-col justify-center">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-[#414846] uppercase tracking-wider">
                    Nightly Budget
                  </span>
                  <span className="text-[12px] font-semibold text-[#001510]">
                    {maxBudget >= 1500
                      ? "$400 - $1,500+"
                      : `$400 - $${maxBudget.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-[#414846]">$400</span>
                  <input
                    type="range"
                    min={400}
                    max={1500}
                    step={50}
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(Number(e.target.value))}
                    aria-label="Nightly Budget"
                    className="w-full h-1.5 bg-[#e3e2e0] rounded-lg appearance-none cursor-pointer accent-[#001510]"
                  />
                  <span className="text-[12px] text-[#414846]">$1.5k</span>
                </div>
              </div>

              {/* Capacity Selector */}
              <div className="bg-[#f4f3f0] p-3 px-4 rounded-2xl flex flex-col justify-center">
                <label
                  htmlFor="capacitySelect"
                  className="text-[11px] font-semibold text-[#414846] uppercase tracking-wider mb-1"
                >
                  Guests / Capacity
                </label>
                <div className="relative flex items-center justify-between">
                  <select
                    id="capacitySelect"
                    value={capacity}
                    onChange={(e) =>
                      setCapacity(e.target.value as CapacityFilter)
                    }
                    className="bg-transparent text-[15px] font-medium text-[#1a1c1a] focus:outline-none w-full cursor-pointer appearance-none pr-6"
                  >
                    <option value="any">Any Capacity</option>
                    <option value="1-2">1 - 2 Guests (Solo / Couples)</option>
                    <option value="3-4">3 - 4 Guests (Small Families)</option>
                    <option value="5+">5+ Guests (Extended Parties)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#414846] pointer-events-none shrink-0" />
                </div>
              </div>

              {/* Key Experience Selector */}
              <div className="bg-[#f4f3f0] p-3 px-4 rounded-2xl flex flex-col justify-center">
                <label
                  htmlFor="amenitySelect"
                  className="text-[11px] font-semibold text-[#414846] uppercase tracking-wider mb-1"
                >
                  Key Experience
                </label>
                <div className="relative flex items-center justify-between">
                  <select
                    id="amenitySelect"
                    value={experience}
                    onChange={(e) =>
                      setExperience(e.target.value as ExperienceFilter)
                    }
                    className="bg-transparent text-[15px] font-medium text-[#1a1c1a] focus:outline-none w-full cursor-pointer appearance-none pr-6"
                  >
                    <option value="all">All Amenities</option>
                    <option value="pool">Private Plunge Pool</option>
                    <option value="ocean">Panoramic Ocean View</option>
                    <option value="butler">Personal Butler Service</option>
                    <option value="spa">Marble Soaking Tub</option>
                  </select>
                  <SlidersHorizontal className="w-4 h-4 text-[#414846] pointer-events-none shrink-0" />
                </div>
              </div>

              {/* Action & Reset */}
              <div className="flex items-center gap-2">
                <a
                  href="#catalogue-grid"
                  className="flex-1 py-3 px-5 rounded-2xl bg-[#001510] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-[#0d2b24] transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Filter Suites
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset Filters"
                  title="Reset Filters"
                  className="p-3.5 rounded-2xl bg-[#e9e8e5] text-[#414846] hover:text-[#1a1c1a] hover:bg-[#e3e2e0] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Featured / Hero Suite Showcase */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4">
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
                  Signature Suite
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#001510]/85 backdrop-blur-md text-white text-[11px] font-semibold">
                  Villa 04B
                </span>
              </div>

              {/* Interactive Dot Navigation Indicator */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                {featuredSuite.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`View featured suite photo ${idx + 1}`}
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
                    Available Immediately
                  </span>
                  <div className="flex items-center text-[#416b5d]">
                    <BadgeCheck className="w-4 h-4" />
                    <span className="text-[11px] font-semibold ml-1">
                      Verified Sanctum
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
                      Size
                    </p>
                    <p className="text-[14px] font-semibold text-[#001510]">
                      {featuredSuite.sizeSqm} m²
                    </p>
                  </div>
                  <div className="bg-[#f4f3f0] p-3 rounded-2xl text-center">
                    <Users className="w-4 h-4 text-[#001510] mx-auto mb-1" />
                    <p className="text-[11px] font-semibold text-[#414846]">
                      Guests
                    </p>
                    <p className="text-[14px] font-semibold text-[#001510]">
                      {featuredSuite.maxGuests} Adults
                    </p>
                  </div>
                  <div className="bg-[#f4f3f0] p-3 rounded-2xl text-center">
                    <Waves className="w-4 h-4 text-[#001510] mx-auto mb-1" />
                    <p className="text-[11px] font-semibold text-[#414846]">
                      Pool
                    </p>
                    <p className="text-[14px] font-semibold text-[#001510]">
                      Infinity Plunge
                    </p>
                  </div>
                </div>

                {/* Amenity Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    "King Sateen Bedding",
                    "Private Teak Sun Deck",
                    "Dyson Supersonic Bar",
                    "24h Valet Concierge",
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
                      ${Math.round(featuredSuite.pricePerNight / 100)}
                    </span>
                    <span className="text-[13px] text-[#414846]">/ night</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#414846]">
                    Excl. local eco-tax ($14)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHeroSaved((v) => !v)}
                    aria-label="Bookmark Suite"
                    title={heroSaved ? "Saved to Portfolio" : "Bookmark Suite"}
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
                    <span>Reserve Suite</span>
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
        className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-[12px] font-medium text-[#3d6659] uppercase tracking-widest">
              Handcrafted Living Quarters
            </span>
            <h2 className="text-[32px] sm:text-[40px] leading-[1.15] font-medium tracking-[-0.02em] text-[#001510]">
              All Available Suites &amp; Villas
            </h2>
          </div>
          <div className="text-[13px] text-[#414846]">
            Showing <strong>{displayedRooms.length}</strong> of{" "}
            <strong>12</strong> properties worldwide
          </div>
        </div>

        {displayedRooms.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <p className="text-[18px] font-medium text-[#001510]">
              No sanctuaries match your current filter selection.
            </p>
            <p className="text-[14px] text-[#414846]">
              Broaden your nightly budget or clear the experience filter to explore all curated stays.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-[#001510] text-white text-[14px] font-semibold hover:bg-[#0d2b24] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedRooms.map((room, idx) => {
              const nightlyUsd = Math.round(room.pricePerNight / 100);
              const isWished = Boolean(wishlist[room.slug]);
              const badgeColor =
                room.badgeSublabel === "Estate Living"
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
                          aria-label={`Save ${room.name} to wishlist`}
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
                              {room.maxGuests} Guests
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
                          From
                        </span>
                        <span className="text-[20px] font-semibold text-[#001510]">
                          ${nightlyUsd.toLocaleString()}{" "}
                          <span className="text-[13px] text-[#414846] font-normal">
                            / night
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/rooms/${room.slug}`}
                          className="px-4 py-2 rounded-full text-[12px] font-semibold text-[#414846] hover:text-[#1a1c1a] transition-colors"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/reservation?room=${room.slug}`}
                          className="px-5 py-2.5 rounded-full bg-[#0d2b24] text-white text-[12px] font-semibold hover:bg-[#001510] transition-all"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      {/* Suite Comparison Matrix */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
        <Reveal>
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#1a1c1a]/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
              <div>
                <span className="text-[12px] font-medium text-[#3d6659] uppercase tracking-widest">
                  Side-By-Side Evaluation
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.15] font-medium tracking-[-0.02em] text-[#001510]">
                  Suite Comparison Matrix
                </h2>
                <p className="text-[15px] text-[#414846] mt-1">
                  Review key architectural dimensions, pool configurations, and
                  bespoke inclusions across our prime residences.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#414846] shrink-0">
                <span>Guaranteed Direct Booking Privileges</span>
                <BadgeCheck className="w-4 h-4 text-[#3d6659]" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr className="bg-[#f4f3f0] text-[#001510] text-[13px] font-semibold">
                    <th className="p-4 rounded-l-2xl">Property &amp; Suite</th>
                    <th className="p-4">Living Area</th>
                    <th className="p-4">Max Occupancy</th>
                    <th className="p-4">Horizon View</th>
                    <th className="p-4">Water Feature</th>
                    <th className="p-4">Artisan Breakfast</th>
                    <th className="p-4 rounded-r-2xl">Private Chauffeur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efeeeb] text-[#1a1c1a] text-[14px]">
                  {comparisonRows.map((row, idx) => {
                    const sqft = Math.round(row.sizeSqm * 10.764);
                    const chauffeurHighlighted =
                      row.chauffeurInfo?.includes("VIP") ||
                      row.chauffeurInfo?.includes("Included");
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
                          {row.sizeSqm} m² ({sqft.toLocaleString()} sq ft)
                        </td>
                        <td className="p-4">
                          {row.maxGuests} {row.maxGuests === 2 ? "Adults" : "Guests"}
                        </td>
                        <td className="p-4 text-[#416b5d] font-medium text-[13px]">
                          {row.horizonView ?? "Scenic Panorama"}
                        </td>
                        <td className="p-4">{row.waterFeature ?? "Private Bath"}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 text-[#3d6659] font-medium text-[13px]">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            {row.breakfastIncluded ?? "Included Daily"}
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
                              {row.chauffeurInfo ?? "Available on Request"}
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
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[12px] font-medium text-[#3d6659] uppercase tracking-widest">
              Thoughtful Hospitality
            </span>
            <h2 className="text-[32px] sm:text-[40px] leading-[1.15] font-medium tracking-[-0.02em] text-[#001510]">
              Amenities &amp; Guest Care
            </h2>
            <p className="text-[15px] leading-[1.6] text-[#414846]">
              Every stay includes access to our bespoke bedding vault, private
              culinary team, and around-the-clock digital concierge.
            </p>
            <div className="bg-[#f4f3f0] p-5 rounded-3xl space-y-2 mt-4">
              <div className="flex items-center gap-3">
                <Headphones className="w-5 h-5 text-[#3d6659]" />
                <span className="text-[14px] font-semibold text-[#001510]">
                  Need bespoke arrangements?
                </span>
              </div>
              <p className="text-[13px] text-[#414846]">
                Our senior estate managers tailor every arrival, pillow
                firmness, and private transit.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#001510] hover:underline pt-1"
              >
                Speak to Villa Concierge
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
