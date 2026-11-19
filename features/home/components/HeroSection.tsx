"use client";

import { ArrowDownRight, MapPin } from "lucide-react";
import Link from "next/link";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { HeroCardConfirmed } from "./HeroCardConfirmed";
import { HeroCardStay } from "./HeroCardStay";

export function HeroSection() {
  return (
    <section className="px-2 sm:px-2.5 lg:px-3 pt-2.5">
      <div className="max-w-none mx-auto relative">
        <div className="relative rounded-[18px] overflow-hidden min-h-[640px] lg:min-h-[690px] bg-[#1F3A2C]">
          <SuiteImage
            src="/images/hero/hero-pool.jpg"
            alt="Piscine et terrasses architecturales du King's Bed Hotel"
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
            <div className="flex items-center justify-between gap-4">
              <div className="h-11 px-4 rounded-full bg-white text-[#111111] flex items-center gap-2.5 shadow-sm whitespace-nowrap">
                <MapPin className="w-4 h-4 text-[#5F5F5A]" strokeWidth={1.5} />
                <p className="text-[13px] font-medium">Bénin, Savalou</p>
              </div>

              <p className="hidden md:block text-[12px] text-white/85 text-right max-w-[220px] leading-snug">
                Chambres, Petit-Déjeuner &amp; Salles de Conférence
              </p>
            </div>

            {/* Subtitle + cercle CTA sur la même ligne */}
            <div className="grid grid-cols-12 items-center gap-4">
              <p className="col-span-7 sm:col-span-5 text-[13px] sm:text-[14px] text-white/85 leading-relaxed max-w-[280px]">
                King&apos;s Bed Hotel vous accueille pour vos séjours en chambre avec petit-déjeuner, ainsi que vos réunions et conférences sur mesure.
              </p>
              <div className="col-span-5 sm:col-span-2 flex justify-center">
                <Link
                  href="/account/reservation"
                  className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-white text-[#111111] shadow-[0_14px_40px_rgba(0,0,0,0.22)] flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform duration-300"
                  aria-label="Réserver votre séjour"
                >
                  <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-medium leading-tight">
                    Réserver votre séjour
                  </span>
                  <ArrowDownRight className="w-4 h-4 mt-1" strokeWidth={1.5} />
                </Link>
              </div>
              <div className="hidden md:block md:col-span-5" />
            </div>

            {/* Bottom row: Title + Floating cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <h1 className="lg:col-span-6 text-[clamp(2.5rem,5.2vw,4.35rem)] font-light leading-[1.02] tracking-[-0.035em] text-balance text-white">
                Réservez Votre Séjour
                <br />
                au King&apos;s Bed Hotel
              </h1>

              <div className="lg:col-span-4 flex flex-col gap-3.5 max-w-sm lg:ml-auto w-full">
                <HeroCardConfirmed />
                <HeroCardStay />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
