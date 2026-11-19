import { ArrowUpRight, Calendar, Check, Sprout } from "lucide-react";
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
                Engagement Environnemental
              </div>
              <h2 className="text-[32px] sm:text-[40px] font-medium leading-[1.2] tracking-[-0.02em] text-white">
                Une Hôtellerie Responsable et Durable
              </h2>
              <p className="text-[15px] leading-[1.6] text-[#c9eade] max-w-xl">
                Au King&apos;s Bed Hotel, chaque nuitée et chaque séminaire s&apos;inscrivent
                dans une démarche durable : circuits courts pour le petit-déjeuner, gestion
                sobre de l&apos;énergie et lutte active contre le gaspillage alimentaire.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-[#001510]/60 backdrop-blur-sm">
                  <span className="text-[19px] font-semibold text-[#bfecdc]">
                    Zéro Gaspillage
                  </span>
                  <p className="text-[13px] text-[#c9eade] mt-1">
                    Portions ajustées au buffet et invendus redistribués aux associations.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#001510]/60 backdrop-blur-sm">
                  <span className="text-[19px] font-semibold text-[#bfecdc]">
                    Circuits Courts
                  </span>
                  <p className="text-[13px] text-[#c9eade] mt-1">
                    Producteurs locaux pour nos petits-déjeuners et pauses séminaires.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#001510]/60 backdrop-blur-sm">
                  <span className="text-[19px] font-semibold text-[#bfecdc]">
                    Énergie Verte
                  </span>
                  <p className="text-[13px] text-[#c9eade] mt-1">
                    Climatisation passive et alimentation électrique 100 % renouvelable.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="p-8 rounded-2xl bg-white text-[#1a1c1a] shadow-2xl w-full max-w-sm space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#3d6659]">
                    Indice Écologique
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#bce9d9] text-[#416b5d] text-[11px] font-semibold">
                    Label Or
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
                        Énergie Renouvelable
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-[13px] text-[#414846]">
                  <div className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#3d6659]" strokeWidth={2} />
                      Récupération d&apos;Eau
                    </span>
                    <span className="font-semibold text-[#001510] tabular-nums">88%</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#3d6659]" strokeWidth={2} />
                      Approvisionnement Local
                    </span>
                    <span className="font-semibold text-[#001510] tabular-nums">100%</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#3d6659]" strokeWidth={2} />
                      Zéro Gaspillage Alimentaire
                    </span>
                    <span className="font-semibold text-[#001510]">Atteint</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 pb-14">
        <div className="rounded-3xl bg-white border border-[#EDEDEA] shadow-[0_8px_30px_rgba(13,43,36,0.04)] p-8 md:p-14 text-center flex flex-col items-center justify-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[12px] font-medium text-[#3d6659] uppercase tracking-widest">
              Votre Prochain Séjour ou Événement
            </span>
            <h2 className="text-[32px] sm:text-[40px] font-medium text-[#001510] tracking-[-0.02em]">
              Préparez Votre Venue au King&apos;s Bed Hotel
            </h2>
            <p className="text-[15px] text-[#414846] max-w-xl mx-auto">
              Réservez votre chambre avec petit-déjeuner ou contactez notre équipe pour
              organiser une réunion, un séminaire ou une conférence sur mesure.
            </p>
            <div className="pt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/rooms"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0d2b24] text-white text-[14px] font-semibold shadow-md hover:bg-[#001510] transition-all inline-flex items-center justify-center gap-2"
              >
                <span>Découvrir nos Chambres</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#e9e8e5] text-[#001510] text-[14px] font-semibold shadow-sm hover:bg-[#e3e2e0] transition-all inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                <span>Devis Réunion &amp; Conférence</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
