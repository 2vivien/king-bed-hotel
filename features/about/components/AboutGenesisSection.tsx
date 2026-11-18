import { Building2, PenTool, ScrollText } from "lucide-react";
import { SuiteImage } from "@/components/shared/SuiteImage";

export function AboutGenesisSection() {
  return (
    <section className="w-full bg-white border-t border-[#EDEDEA] py-14">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeeeb] text-[#3d6659] text-[11px] font-semibold">
              <ScrollText className="w-4 h-4" strokeWidth={1.5} />
              Notre Histoire
            </div>
            <h2 className="text-[32px] sm:text-[40px] font-medium leading-[1.2] tracking-[-0.02em] text-[#001510]">
              La Genèse du King&apos;s Bed Hotel — De 2019 à une Adresse de Référence
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.6] text-[#414846]">
              <p>
                En 2019, le King&apos;s Bed Hotel est né d&apos;une ambition claire : offrir
                une alternative chaleureuse et raffinée à l&apos;hôtellerie standardisée. Nous
                avons imaginé un lieu où la qualité du sommeil, le plaisir du petit-déjeuner
                et l&apos;efficacité des rencontres professionnelles cohabitent avec naturel.
              </p>
              <p>
                Des chambres habillées de matelas King Size sur mesure jusqu&apos;à notre
                grande salle de petit-déjeuner baignée de lumière et nos salons modulables
                pour réunions, séminaires et conférences, chaque espace du King&apos;s Bed
                Hotel répond à des standards exigeants d&apos;acoustique, d&apos;accueil et
                de gastronomie.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#EDEDEA] shadow-sm">
                <span className="block text-[32px] sm:text-[40px] font-bold text-[#001510] leading-tight tabular-nums">
                  48
                </span>
                <span className="text-[11px] font-semibold text-[#414846]">
                  Chambres &amp; Suites
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#EDEDEA] shadow-sm">
                <span className="block text-[32px] sm:text-[40px] font-bold text-[#001510] leading-tight tabular-nums">
                  99.4%
                </span>
                <span className="text-[11px] font-semibold text-[#414846]">
                  Satisfaction Clients
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#EDEDEA] shadow-sm">
                <span className="block text-[32px] sm:text-[40px] font-bold text-[#001510] leading-tight tabular-nums">
                  24/7
                </span>
                <span className="text-[11px] font-semibold text-[#414846]">
                  Réception &amp; Conciergerie
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-5">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-md bg-[#e3e2e0]">
                <SuiteImage
                  src="/images/about/limestone-craft.jpg"
                  alt="Colonnes en pierre naturelle taillée et textiles en lin brut au King's Bed Hotel"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#EDEDEA] shadow-sm space-y-2">
                <PenTool className="w-7 h-7 text-[#3d6659]" strokeWidth={1.5} />
                <h3 className="text-[20px] font-semibold text-[#001510]">
                  Savoir-Faire &amp; Literie
                </h3>
                <p className="text-[13px] leading-[1.55] text-[#414846]">
                  Matériaux nobles, boiseries durables et isolation acoustique soignée pour un
                  repos irréprochable après vos journées ou conférences.
                </p>
              </div>
            </div>

            <div className="space-y-5 sm:pt-8">
              <div className="p-6 rounded-2xl bg-[#0d2b24] text-white shadow-sm space-y-2">
                <Building2 className="w-7 h-7 text-[#bfecdc]" strokeWidth={1.5} />
                <h3 className="text-[20px] font-semibold text-white">
                  Séjours &amp; Conférences
                </h3>
                <p className="text-[13px] leading-[1.55] text-[#c9eade]">
                  Une aile entièrement dédiée aux réunions de direction, séminaires
                  résidentiels et congrès jusqu&apos;à 140 participants.
                </p>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-md bg-[#e3e2e0]">
                <SuiteImage
                  src="/images/destinations/bali.jpg"
                  alt="Patio paysager et bassin apaisant du King's Bed Hotel au petit matin"
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
