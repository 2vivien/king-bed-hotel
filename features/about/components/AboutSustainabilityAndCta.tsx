import { ArrowUpRight, Calendar, Sprout } from "lucide-react";
import Link from "next/link";

export function AboutSustainabilityAndCta() {
  return (
    <>
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
        <div className="rounded-3xl bg-[#0d2b24] text-white p-8 md:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#3d6659]/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001510] text-[#bfecdc] text-[11px] font-semibold">
                <Sprout className="w-4 h-4" strokeWidth={1.5} />
                Environmental Sovereignty
              </div>
              <h2 className="text-[32px] sm:text-[40px] font-medium leading-[1.2] tracking-[-0.02em] text-white">
                Protecting the Fragile Horizons We Inhabit
              </h2>
              <p className="text-[15px] leading-[1.6] text-[#c9eade] max-w-xl">
                We operate with the reverent understanding that our destinations exist as
                guests of the earth. SuiteSavvy commits 3.5% of all global booking revenue
                directly to regional biome restoration, marine sanctuaries, and indigenous
                artisan guild endowments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-[#001510]/60 backdrop-blur-sm">
                  <span className="text-[19px] font-semibold text-[#bfecdc]">
                    Zero-Plastic
                  </span>
                  <p className="text-[13px] text-[#c9eade] mt-1">
                    100% circular glass, stoneware, and linen guest amenities.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#001510]/60 backdrop-blur-sm">
                  <span className="text-[19px] font-semibold text-[#bfecdc]">
                    Geothermal
                  </span>
                  <p className="text-[13px] text-[#c9eade] mt-1">
                    Passive climatic cooling and solar-assisted hydrology.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#001510]/60 backdrop-blur-sm">
                  <span className="text-[19px] font-semibold text-[#bfecdc]">
                    Guild Fund
                  </span>
                  <p className="text-[13px] text-[#c9eade] mt-1">
                    Preserving traditional stone masons and weavers locally.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="p-8 rounded-2xl bg-[#faf9f6] text-[#1a1c1a] shadow-2xl w-full max-w-sm space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#3d6659]">
                    Ecological Index
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#bce9d9] text-[#416b5d] text-[11px] font-semibold">
                    Tier 1 Elite
                  </span>
                </div>

                <div className="flex items-center justify-center relative py-2">
                  <div className="w-40 h-40 rounded-full border-[10px] border-[#efeeeb] flex items-center justify-center relative">
                    <div
                      className="absolute -inset-[10px] rounded-full border-[10px] border-[#3d6659] border-t-transparent -rotate-45"
                      aria-hidden="true"
                    />
                    <div className="text-center">
                      <span className="block text-[38px] font-bold text-[#001510] leading-none tabular-nums">
                        94%
                      </span>
                      <span className="text-[11px] font-semibold text-[#414846] mt-1 block">
                        Renewable Energy
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-[13px] text-[#414846]">
                  <div className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3d6659]" />
                      Rainwater Harvesting
                    </span>
                    <span className="font-semibold text-[#001510] tabular-nums">88%</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3d6659]" />
                      Native Reforestation
                    </span>
                    <span className="font-semibold text-[#001510] tabular-nums">100%</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3d6659]" />
                      Zero Single-Use Waste
                    </span>
                    <span className="font-semibold text-[#001510]">Achieved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 pb-14">
        <div className="rounded-3xl bg-[#e3e2e0] p-8 md:p-14 text-center flex flex-col items-center justify-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[12px] font-medium text-[#3d6659] uppercase tracking-widest">
              Your Private Horizon Awaits
            </span>
            <h2 className="text-[32px] sm:text-[40px] font-medium text-[#001510] tracking-[-0.02em]">
              Begin Your Unforgettable Journey
            </h2>
            <p className="text-[15px] text-[#414846] max-w-xl mx-auto">
              Contact our personal travel curators for discreet portfolio previews,
              bespoke flight arrangements, and dedicated in-suite itineraries.
            </p>
            <div className="pt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/rooms"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0d2b24] text-white text-[14px] font-semibold shadow-md hover:bg-[#001510] transition-all inline-flex items-center justify-center gap-2"
              >
                <span>Explore Our Sanctuaries</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#faf9f6] text-[#001510] text-[14px] font-semibold shadow-sm hover:bg-[#e9e8e5] transition-all inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                <span>Reserve a Private Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
