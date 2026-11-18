"use client";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  Asterisk,
  Calendar,
  Globe,
  Heart,
  Home,
  KeyRound,
  MapPin,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { DialogModal } from "@/components/ui/DialogModal";
import { useBookingStore } from "@/features/booking/store/booking.store";
import { destinationsMock } from "@/mocks/destinations";
import { HeroCardConfirmed } from "./HeroCardConfirmed";
import { HeroCardStay } from "./HeroCardStay";

export function HeroSection() {
  const { destinationSlug, setDraft } = useBookingStore();
  const [videoOpen, setVideoOpen] = useState(false);

  const selectedDestination =
    destinationsMock.find((d) => d.slug === destinationSlug) ?? destinationsMock[3];

  const handleCycleDestination = () => {
    const idx = destinationsMock.findIndex((d) => d.slug === selectedDestination.slug);
    const next = destinationsMock[(idx + 1) % destinationsMock.length];
    if (next) {
      setDraft({ destinationSlug: next.slug });
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-10 pt-4">
      <div className="max-w-[1280px] mx-auto relative">
        <div className="relative rounded-[36px] overflow-hidden min-h-[640px] lg:min-h-[690px] bg-[#1F3A2C]">
          <SuiteImage
            src="/images/hero/hero-pool.jpg"
            alt="SuiteSavvy luxury stepped stone tropical infinity pool"
            sizes="(max-width: 768px) 100vw, 1280px"
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/35"
            aria-hidden="true"
          />

          <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[640px] lg:min-h-[690px]">
            {/* Top utility row inside hero */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="h-11 px-4 rounded-full bg-white text-[#111111] flex items-center gap-2.5 shadow-sm">
                  <MapPin className="w-4 h-4 text-[#5F5F5A]" strokeWidth={1.5} />
                  <div className="leading-tight">
                    <p className="text-[12px] font-medium">{selectedDestination.name}</p>
                    <p className="text-[10px] text-[#5F5F5A]">
                      {selectedDestination.country}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCycleDestination}
                    className="ml-2 text-[11px] font-medium underline underline-offset-2 text-[#111111] hover:text-[#5F5F5A] cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                <Link
                  href="/reservation"
                  aria-label="Select dates"
                  className="w-11 h-11 rounded-full glass-surface-subtle border border-white/30 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
                >
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/rooms"
                  aria-label="Browse suites"
                  className="w-11 h-11 rounded-full glass-surface-subtle border border-white/30 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
                >
                  <Home className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </div>

              <div className="hidden md:flex flex-col items-end gap-2.5 text-white">
                <p className="text-[12px] text-white/85 text-right max-w-[180px] leading-snug">
                  Your Passport to Unforgettable Suites
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href="/rooms"
                    aria-label="Explore sanctuaries and suites"
                    className="w-9 h-9 rounded-full bg-white text-[#111111] flex items-center justify-center hover:bg-[#EFE6D6] transition-colors"
                  >
                    <Globe className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                  <Link
                    href="/rooms"
                    aria-label="Curated suites"
                    className="w-9 h-9 rounded-full bg-white text-[#111111] flex items-center justify-center hover:bg-[#EFE6D6] transition-colors"
                  >
                    <Heart className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                  <Link
                    href="/my-booking"
                    aria-label="Retrieve reservation"
                    className="w-9 h-9 rounded-full bg-white text-[#111111] flex items-center justify-center hover:bg-[#EFE6D6] transition-colors"
                  >
                    <KeyRound className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Main hero grid */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-6 text-white space-y-6">
                <p className="text-[13px] text-white/85 max-w-xs leading-relaxed">
                  We are a premier hotel booking service tailored for the discerning
                  traveler in search of calm luxury and architectural beauty.
                </p>

                <div className="flex items-start gap-3">
                  <Asterisk
                    className="w-9 h-9 sm:w-11 sm:h-11 text-white shrink-0 mt-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h1 className="text-[clamp(2.5rem,5.2vw,4.35rem)] font-light leading-[1.02] tracking-[-0.035em] text-balance">
                    Book Perfect Stay For Your Vacation
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/rooms"
                    className="h-11 px-6 rounded-full bg-white text-[#111111] text-[14px] font-medium inline-flex items-center gap-2 hover:bg-[#EFE6D6] transition-colors whitespace-nowrap"
                  >
                    Explore More
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setVideoOpen(true)}
                    className="h-11 px-6 rounded-full glass-surface-subtle border border-white/30 text-white text-[14px] font-medium inline-flex items-center gap-2 hover:bg-white/25 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    View Video
                    <Play className="w-3.5 h-3.5 fill-current" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Center circular CTA */}
              <div className="hidden lg:flex lg:col-span-2 justify-center pb-12">
                <Link
                  href="/reservation"
                  className="w-28 h-28 rounded-full bg-white text-[#111111] shadow-[0_14px_40px_rgba(0,0,0,0.22)] flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform duration-300"
                >
                  <span className="text-[12px] font-medium leading-tight">
                    Book your stay
                  </span>
                  <ArrowDownRight className="w-4 h-4 mt-1.5" strokeWidth={1.5} />
                </Link>
              </div>

              {/* Right floating glass cards */}
              <div className="lg:col-span-4 flex flex-col gap-3.5 max-w-sm lg:ml-auto w-full">
                <HeroCardConfirmed />
                <HeroCardStay />
              </div>
            </div>
          </div>
        </div>

        {/* ScrollCue straddling hero bottom edge */}
        <div className="hidden sm:flex flex-col items-center -mt-7 relative z-20 lg:ml-[38%]">
          <a
            href="#destinations-teaser"
            className="w-14 h-14 rounded-full bg-white border border-[#111111]/10 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#111111] hover:translate-y-0.5 transition-transform"
            aria-label="Scroll to explore destinations"
          >
            <ArrowDown className="w-5 h-5" strokeWidth={1.5} />
          </a>
          <span className="mt-1.5 text-[12px] text-[#5F5F5A]">Learn more</span>
        </div>
      </div>

      <DialogModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        title="Inside the SuiteSavvy Sanctuary"
      >
        <div className="relative aspect-video rounded-[20px] overflow-hidden bg-[#1F3A2C]">
          <SuiteImage
            src="/images/about/about-lounge.jpg"
            alt="SuiteSavvy sanctuary architecture walkthrough"
            sizes="(max-width: 768px) 95vw, 760px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
            <p className="text-[13px] text-white/80 mb-1">Architectural Film</p>
            <p className="text-[20px] font-light tracking-[-0.02em]">
              Calm materials, natural daylight, and effortless stillness across 5 destinations.
            </p>
          </div>
        </div>
      </DialogModal>
    </section>
  );
}
