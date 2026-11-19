import { ConciergeBell, Globe, ShieldCheck, Timer } from "lucide-react";
import { SuiteImage } from "@/components/shared/SuiteImage";

export function ContactHero() {
  return (
    <section className="relative w-full bg-white px-6 lg:px-10 pt-14 pb-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-7 flex flex-col items-start max-w-3xl space-y-3">
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

        {/* Carte « En Service » à droite */}
        <div className="lg:col-span-5">
          <div className="group relative rounded-3xl overflow-hidden shadow-[0_20px_48px_-8px_rgba(13,43,36,0.12)] bg-white h-[320px] sm:h-[400px] lg:h-[460px]">
            <div className="absolute inset-0 bg-[#0d2b24]">
              <SuiteImage
                src="/images/contact/concierge-desk.jpg"
                alt="Réception et conciergerie du King's Bed Hotel"
                sizes="(max-width: 1024px) 100vw, 560px"
                className="group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#001510]/85 via-[#001510]/20 to-transparent"
                aria-hidden="true"
              />
            </div>
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#001510] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3d6659] animate-pulse" />
              En Service
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#bfecdc]">
                Réception &amp; Conciergerie
              </span>
              <h2 className="text-[24px] sm:text-[28px] font-semibold leading-tight">
                Conseil Séjours &amp; Événements
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
