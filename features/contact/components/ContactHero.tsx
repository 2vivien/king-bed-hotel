import { Globe, ShieldCheck, Timer } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative w-full bg-[#f4f3f0] px-6 lg:px-10 py-14 overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col items-start max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e3e2e0] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#3d6659]" />
            <span className="text-[11px] font-semibold text-[#3d6659] tracking-widest uppercase">
              Direct Sanctuary Access &amp; Inquiries
            </span>
          </div>

          <h1 className="text-[clamp(2.4rem,4.5vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#001510]">
            We Would Love to Hear From You
          </h1>

          <p className="text-[18px] leading-[1.55] text-[#414846] max-w-2xl">
            Whether planning a bespoke multi-destination itinerary, reserving a private
            estate, or requesting private aviation liaison, our global concierges stand at
            your service.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 w-full">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-sm">
              <Timer className="w-[22px] h-[22px] text-[#3d6659] shrink-0" strokeWidth={1.5} />
              <div>
                <span className="block text-[12px] font-medium text-[#001510]">
                  Response Time
                </span>
                <span className="text-[13px] text-[#414846]">&lt; 15 mins average</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-sm">
              <ShieldCheck
                className="w-[22px] h-[22px] text-[#3d6659] shrink-0"
                strokeWidth={1.5}
              />
              <div>
                <span className="block text-[12px] font-medium text-[#001510]">
                  Discretion
                </span>
                <span className="text-[13px] text-[#414846]">
                  Encrypted Private Liaison
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-sm">
              <Globe className="w-[22px] h-[22px] text-[#3d6659] shrink-0" strokeWidth={1.5} />
              <div>
                <span className="block text-[12px] font-medium text-[#001510]">
                  Availability
                </span>
                <span className="text-[13px] text-[#414846]">24/7 Global Desk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-[#bfecdc]/30 blur-3xl pointer-events-none" />
    </section>
  );
}
