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
        <div className="relative rounded-[18px] overflow-hidden min-h-[620px] lg:min-h-[800px] bg-[#1F3A2C]">
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

          <div className="relative z-10 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full min-h-[620px] lg:min-h-[800px]">
            {/* Left column */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="h-11 px-4 rounded-full bg-white text-[#111111] flex items-center gap-2.5 shadow-sm whitespace-nowrap w-max">
                <MapPin className="w-4 h-4 text-[#5F5F5A]" strokeWidth={1.5} />
                <p className="text-[13px] font-medium">Bénin, Savalou</p>
              </div>

              <div className="mt-16 flex items-center gap-5 sm:gap-7">
                <p className="text-[13px] sm:text-[14px] text-white/85 leading-relaxed max-w-[240px]">
                  King&apos;s Bed Hotel vous accueille pour vos séjours en chambre avec petit-déjeuner, ainsi que vos réunions et conférences sur mesure.
                </p>
                <Link
                  href="/account/reservation"
                  className="w-20 h-20 sm:w-24 sm:h-24 lg:w-24 lg:h-24 rounded-full bg-white text-[#111111] shadow-[0_14px_40px_rgba(0,0,0,0.22)] flex flex-col items-center justify-center text-center p-3 hover:scale-105 transition-transform duration-300 shrink-0"
                  aria-label="Réserver votre séjour"
                >
                  <span className="text-[10px] sm:text-[11px] font-medium leading-tight">
                    Réserver votre séjour
                  </span>
                  <ArrowDownRight className="w-4 h-4 mt-1" strokeWidth={1.5} />
                </Link>
              </div>

              <h1 className="mt-auto -mt-1.5 lg:-mt-2 text-[clamp(2.5rem,5.2vw,4.35rem)] font-light leading-[1.02] tracking-[-0.035em] text-balance text-white">
                Réservez Votre Séjour
                <br />
                au King&apos;s Bed Hotel
              </h1>
            </div>

            {/* Right column */}
            <div className="hidden md:flex md:col-span-6 lg:col-span-6 flex-col items-end justify-end gap-4">
              <p className="text-[12px] text-white/85 text-right leading-tight max-w-[16rem]">
                Chambres,<br />Petit-Déjeuner &amp; Salles de Conférence
              </p>
              <HeroCardConfirmed />
              <HeroCardStay />
            </div>

            {/* Mobile: cards stack after text */}
            <div className="md:hidden lg:hidden flex flex-col gap-3.5 w-full max-w-sm">
              <HeroCardConfirmed />
              <HeroCardStay />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
