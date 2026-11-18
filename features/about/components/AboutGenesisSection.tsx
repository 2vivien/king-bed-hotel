import { Building2, PenTool, ScrollText } from "lucide-react";
import { SuiteImage } from "@/components/shared/SuiteImage";

export function AboutGenesisSection() {
  return (
    <section className="w-full bg-[#f4f3f0] py-14">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeeeb] text-[#3d6659] text-[11px] font-semibold">
              <ScrollText className="w-4 h-4" strokeWidth={1.5} />
              Our Narrative
            </div>
            <h2 className="text-[32px] sm:text-[40px] font-medium leading-[1.2] tracking-[-0.02em] text-[#001510]">
              The SuiteSavvy Genesis — From 2019 to Global Sanctuaries
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.6] text-[#414846]">
              <p>
                In 2019, SuiteSavvy began not as a hospitality brand, but as a deliberate
                critique of standardized five-star monotony. High-end global travel had
                become reproducible: identical marbled atriums, scripted concierges, and
                an inescapable sense of hurry.
              </p>
              <p>
                We set out to assemble the antithesis: authentic private estates where
                architecture serves as an invisible frame for nature. From the clifftop
                pergolas of Positano to the restorative mangrove lagoons of Ubud and the
                wind-sculpted shorelines of the Algarve, every SuiteSavvy destination is
                hand-vetted through over 240 stringent spatial, culinary, and acoustic
                benchmarks.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-[#faf9f6] shadow-sm">
                <span className="block text-[32px] sm:text-[40px] font-bold text-[#001510] leading-tight tabular-nums">
                  24
                </span>
                <span className="text-[11px] font-semibold text-[#414846]">
                  Private Sanctuaries
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#faf9f6] shadow-sm">
                <span className="block text-[32px] sm:text-[40px] font-bold text-[#001510] leading-tight tabular-nums">
                  99.4%
                </span>
                <span className="text-[11px] font-semibold text-[#414846]">
                  Guest Contentment
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#faf9f6] shadow-sm">
                <span className="block text-[32px] sm:text-[40px] font-bold text-[#001510] leading-tight tabular-nums">
                  24/7
                </span>
                <span className="text-[11px] font-semibold text-[#414846]">
                  Dedicated Valet &amp; Host
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-5">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-md bg-[#e3e2e0]">
                <SuiteImage
                  src="/images/about/limestone-craft.jpg"
                  alt="Hand-carved warm limestone columns and raw linen textiles"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
              <div className="p-6 rounded-2xl bg-[#faf9f6] shadow-sm space-y-2">
                <PenTool className="w-7 h-7 text-[#3d6659]" strokeWidth={1.5} />
                <h3 className="text-[20px] font-semibold text-[#001510]">
                  Uncompromising Craft
                </h3>
                <p className="text-[13px] leading-[1.55] text-[#414846]">
                  Every estate incorporates indigenous masonry, century-old timber, and
                  acoustic geometry tailored for utter quietude.
                </p>
              </div>
            </div>

            <div className="space-y-5 sm:pt-8">
              <div className="p-6 rounded-2xl bg-[#0d2b24] text-white shadow-sm space-y-2">
                <Building2 className="w-7 h-7 text-[#bfecdc]" strokeWidth={1.5} />
                <h3 className="text-[20px] font-semibold text-white">
                  Intimate Footprint
                </h3>
                <p className="text-[13px] leading-[1.55] text-[#c9eade]">
                  We strictly cap each territory at 3 properties globally to guarantee
                  uncompromised exclusivity.
                </p>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-md bg-[#e3e2e0]">
                <SuiteImage
                  src="/images/destinations/bali.jpg"
                  alt="Tranquil tropical infinity pool overlooking Ubud dawn mist"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
