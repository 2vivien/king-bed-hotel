import {
  ArrowRight,
  BellRing,
  Compass,
  Shield,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    code: "Pillar 01",
    title: "Architectural Purity",
    description:
      "Organic structures bridging warm Japandi restraint and timeless regional vernaculars. Our suites breathe naturally, inviting external landscapes directly indoors.",
    cta: "Explore design codes",
    href: "/rooms",
    Icon: Compass,
  },
  {
    code: "Pillar 02",
    title: "Tailored Solitude",
    description:
      "Radical privacy engineered into master floorplans. Private access paths, sheltered terraces, and uninterrupted visual horizons preserve sacred decompression.",
    cta: "Spatial seclusion",
    href: "/rooms",
    Icon: Shield,
  },
  {
    code: "Pillar 03",
    title: "Gastronomic Soul",
    description:
      "Direct partnerships with biodynamic family vineyards and artisan foragers. Bespoke in-suite chef tastings inspired by centuries-old regional cooking traditions.",
    cta: "Culinary manifests",
    href: "/services",
    Icon: UtensilsCrossed,
  },
  {
    code: "Pillar 04",
    title: "Invisible Precision",
    description:
      "Attentive hosts who anticipate needs before they are voiced, operating with discreet grace so guests never feel observed, only effortlessly supported.",
    cta: "Concierge standards",
    href: "/contact",
    Icon: BellRing,
  },
] as const;

export function AboutPillarsSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[12px] font-medium text-[#3d6659] tracking-widest uppercase">
          The SuiteSavvy Standard
        </span>
        <h2 className="text-[32px] sm:text-[40px] font-medium text-[#001510] tracking-[-0.02em] mt-1">
          Our Four Cornerstones of Hospitality
        </h2>
        <p className="text-[15px] text-[#414846] mt-2">
          Every encounter, architectural contour, and morning scent is calibrated around
          four non-negotiable principles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.Icon;
          return (
            <Link
              key={pillar.code}
              href={pillar.href}
              className="p-8 rounded-2xl bg-[#f4f3f0] hover:bg-[#efeeeb] transition-colors duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#faf9f6] flex items-center justify-center text-[#001510] shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-semibold text-[#3d6659] uppercase tracking-widest">
                  {pillar.code}
                </span>
                <h3 className="text-[20px] font-semibold text-[#001510] mt-2 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[13px] leading-[1.6] text-[#414846]">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-8 pt-4 flex items-center gap-2 text-[#3d6659] text-[12px] font-medium">
                <span>{pillar.cta}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
