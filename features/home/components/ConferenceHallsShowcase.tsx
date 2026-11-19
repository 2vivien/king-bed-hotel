import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { formatMoney } from "@/lib/utils/format-money";
import { conferenceHallsMock } from "@/mocks/halls";

const featureItems = [
  "Écran 4K interactif, fibre symétrique dédiée",
  "Configuration U, théâtre ou conseil",
  "Régie, captation & livestream sur demande",
  "Pauses café & déjeuner d'affaires inclus",
] as const;

export function ConferenceHallsShowcase() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24 border-t border-[#EDEDEA]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Cartes alignées à gauche (ordre inversé) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 order-2 lg:order-1">
          {conferenceHallsMock.map((hall, idx) => (
            <Reveal key={hall.slug} delay={idx * 0.06}>
              <Link
                href={`/account/reservation?destination=maldives&room=${hall.slug}`}
                className="group relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#EFE6D6] block"
              >
                <SuiteImage
                  src={hall.image}
                  alt={hall.name}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4 text-white">
                  <div>
                    <h3 className="text-[18px] font-normal tracking-[-0.015em] leading-tight">
                      {hall.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-white/85 tabular-nums">
                      {hall.maxGuests} pers. ·{" "}
                      {formatMoney(hall.pricePerNight)} / jour
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Texte à droite */}
        <Reveal delay={0.1} className="lg:col-span-4 space-y-6 order-1 lg:order-2">
          <div>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#3d6659] font-semibold">
              Salles de Conférence
            </span>
            <h2 className="mt-2 text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.12] font-medium tracking-[-0.02em] text-[#001510]">
              Des Espaces pour
              <br />
              Tous Vos Séminaires
            </h2>
          </div>
          <p className="text-[16px] leading-[1.6] text-[#414846] max-w-sm">
            Trois espaces modulables, de 35 à 180 participants, pour vos comités,
            séminaires et congrès, avec restauration et régie incluses.
          </p>
          <ul className="space-y-2.5">
            {featureItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[14px] text-[#414846]"
              >
                <CheckCircle2
                  className="w-5 h-5 text-[#3d6659] shrink-0 mt-0.5"
                  strokeWidth={1.75}
                />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/account/reservation"
            className="inline-flex items-center gap-2 h-12 pl-6 pr-7 rounded-full bg-[#001510] text-white text-[14px] font-semibold hover:bg-[#0d2b24] transition-colors"
          >
            Réserver votre salle
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
