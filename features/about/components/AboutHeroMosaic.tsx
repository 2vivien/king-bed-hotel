import { Award, Leaf, Star } from "lucide-react";
import { SuiteImage } from "@/components/shared/SuiteImage";

export function AboutHeroMosaic() {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 pb-14">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-[12px] font-medium text-[#3d6659] tracking-widest uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#3d6659]" />
            Our Philosophy &amp; Heritage
          </span>
          <h1 className="text-[clamp(2.4rem,4.5vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#001510] mt-1">
            Curating Sanctuaries for the Discerning Traveler
          </h1>
        </div>
        <p className="text-[18px] leading-[1.55] text-[#414846] max-w-lg pb-1">
          Founded on the belief that true luxury resides in absolute serenity, bespoke
          architectural harmony, and untamed natural beauty.
        </p>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
        <div className="relative h-[460px] md:h-[580px] w-full bg-[#0d2b24]">
          <SuiteImage
            src="/images/about/stone-lobby.jpg"
            alt="Tranquil stone-arched luxury boutique hotel lobby with reflective pebble pool and olive trees"
            sizes="(max-width: 1440px) 100vw, 1440px"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#001510]/80 via-[#001510]/20 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-5 py-3 rounded-full bg-[#faf9f6]/92 backdrop-blur-md shadow-md flex items-center gap-3">
                <Award className="w-5 h-5 text-[#3d6659]" strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-semibold text-[#001510] uppercase tracking-wider">
                    Accreditation
                  </p>
                  <p className="text-[12px] font-semibold text-[#1a1c1a]">
                    Michelin Key Certified 2025
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 rounded-full bg-[#faf9f6]/92 backdrop-blur-md shadow-md flex items-center gap-3">
                <Star className="w-5 h-5 text-[#3d6659]" strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-semibold text-[#001510] uppercase tracking-wider">
                    Affiliation
                  </p>
                  <p className="text-[12px] font-semibold text-[#1a1c1a]">
                    Leading Hotels Patron
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 rounded-full bg-[#faf9f6]/92 backdrop-blur-md shadow-md hidden sm:flex items-center gap-3">
                <Leaf className="w-5 h-5 text-[#3d6659]" strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-semibold text-[#001510] uppercase tracking-wider">
                    Commitment
                  </p>
                  <p className="text-[12px] font-semibold text-[#1a1c1a]">
                    100% Carbon-Neutral Stays
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 rounded-xl bg-[#0d2b24] text-white shadow-lg backdrop-blur-sm flex items-center gap-4">
              <span className="text-[32px] font-semibold leading-none text-[#bfecdc] tabular-nums">
                06
              </span>
              <div>
                <p className="text-[11px] font-semibold text-[#c9eade] uppercase tracking-wider">
                  Years of Curation
                </p>
                <p className="text-[13px] text-white">Refining the Art of Solitude</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
