import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Conditions & Annulation",
  description:
    "Conditions de réservation du King's Bed Hotel, délais d'annulation flexible et consignes d'arrivée.",
};

export default function TermsPage() {
  return (
    <article className="max-w-[720px] mx-auto px-6 pt-14 pb-24 space-y-8">
      <div className="space-y-3">
        <p className="text-[13px] text-[#5F5F5A]">Informations Légales</p>
        <h1 className="text-[clamp(2.25rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-[#111111]">
          Conditions &amp; Annulation
        </h1>
      </div>

      <div className="space-y-6 text-[16px] leading-[1.7] text-[#5F5F5A]">
        <p>
          Toutes les réservations chez {siteConfig.name} incluent des tarifs transparents et une
          taxe de séjour de 10 % calculée lors du règlement, sans aucun frais caché pour vos
          chambres, petits-déjeuners ou réservations de salles de conférence.
        </p>
        <h2 className="text-[22px] font-normal text-[#111111] pt-2">
          1. Conditions d&apos;Annulation Flexible
        </h2>
        <p>
          Les Chambres Deluxe peuvent être annulées sans frais jusqu&apos;à 48 heures avant
          l&apos;arrivée. Les Suites offrent l&apos;annulation gratuite jusqu&apos;à 72 heures
          avant, et les Suites Royales ou privatisations de salles de conférence jusqu&apos;à 7
          jours avant la date prévue.
        </p>
        <h2 className="text-[22px] font-normal text-[#111111] pt-2">
          2. Arrivée, Départ &amp; Réception
        </h2>
        <p>
          {siteConfig.hours}. Les arrivées anticipées et départs tardifs sont organisés selon
          disponibilité par notre réception ouverte 24h/24.
        </p>
      </div>
    </article>
  );
}
