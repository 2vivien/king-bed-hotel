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
    code: "Pilier 01",
    title: "Chambres & Literie King Size",
    description:
      "Des chambres et suites pensées pour la détente absolue : matelas King Size haute densité, linge en coton égyptien et insonorisation optimale.",
    cta: "Découvrir les chambres",
    href: "/rooms",
    Icon: Compass,
  },
  {
    code: "Pilier 02",
    title: "Salles de Réunion & Conférences",
    description:
      "Des salons modulables baignés de lumière naturelle, équipés d'écrans 4K, fibre dédiée, visioconférence et pauses café gastronomiques.",
    cta: "Espaces professionnels",
    href: "/services",
    Icon: Shield,
  },
  {
    code: "Pilier 03",
    title: "Petit-Déjeuner Artisanal",
    description:
      "Chaque matin, un buffet généreux et un service à la carte composé de viennoiseries tièdes, œufs fermiers, fruits frais et cafés de spécialité.",
    cta: "La carte du matin",
    href: "/services",
    Icon: UtensilsCrossed,
  },
  {
    code: "Pilier 04",
    title: "Accueil & Conciergerie 24/7",
    description:
      "Une équipe attentive anticipe chacun de vos besoins : transfert privé, organisation de séminaire, réservation de table ou départ tardif.",
    cta: "Contacter la réception",
    href: "/contact",
    Icon: BellRing,
  },
] as const;

export function AboutPillarsSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[12px] font-medium text-[#3d6659] tracking-widest uppercase">
          Le Standard King&apos;s Bed Hotel
        </span>
        <h2 className="text-[32px] sm:text-[40px] font-medium text-[#001510] tracking-[-0.02em] mt-1">
          Nos Quatre Piliers d&apos;Hospitalité
        </h2>
        <p className="text-[15px] text-[#414846] mt-2">
          Chaque séjour, chaque petit-déjeuner et chaque journée d&apos;étude repose sur
          quatre engagements essentiels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.Icon;
          return (
            <Link
              key={pillar.code}
              href={pillar.href}
              className="p-8 rounded-2xl bg-white border border-[#EDEDEA] hover:border-[#111111]/20 shadow-sm transition-colors duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#e9e8e5] flex items-center justify-center text-[#001510] shadow-sm mb-6 group-hover:scale-110 transition-transform">
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
