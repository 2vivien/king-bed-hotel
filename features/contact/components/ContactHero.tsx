import { ConciergeBell, Globe, ShieldCheck, Timer } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative w-full bg-white px-6 lg:px-10 py-14 overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col items-start max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e9e8e5] text-[#001510] text-[12px] font-medium tracking-[0.02em]">
            <ConciergeBell className="w-3.5 h-3.5 text-[#3d6659]" strokeWidth={1.75} />
            <span>Réception Directe &amp; Devis Événements</span>
          </div>

          <h1 className="text-[clamp(2.4rem,4.5vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#001510]">
            Nous Sommes à Votre Écoute
          </h1>

          <p className="text-[18px] leading-[1.55] text-[#414846] max-w-2xl">
            Que vous prépariez un séjour en chambre avec petit-déjeuner, une réunion
            d&apos;équipe ou une conférence sur mesure, l&apos;équipe du King&apos;s Bed Hotel
            vous répond avec précision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 w-full">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#EDEDEA] shadow-sm">
              <Timer className="w-[22px] h-[22px] text-[#3d6659] shrink-0" strokeWidth={1.5} />
              <div>
                <span className="block text-[12px] font-medium text-[#001510]">
                  Temps de Réponse
                </span>
                <span className="text-[13px] text-[#414846]">&lt; 15 min en moyenne</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#EDEDEA] shadow-sm">
              <ShieldCheck
                className="w-[22px] h-[22px] text-[#3d6659] shrink-0"
                strokeWidth={1.5}
              />
              <div>
                <span className="block text-[12px] font-medium text-[#001510]">
                  Accompagnement
                </span>
                <span className="text-[13px] text-[#414846]">
                  Interlocuteur Dédié
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#EDEDEA] shadow-sm">
              <Globe className="w-[22px] h-[22px] text-[#3d6659] shrink-0" strokeWidth={1.5} />
              <div>
                <span className="block text-[12px] font-medium text-[#001510]">
                  Disponibilité
                </span>
                <span className="text-[13px] text-[#414846]">Réception 24h/24 &amp; 7j/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
