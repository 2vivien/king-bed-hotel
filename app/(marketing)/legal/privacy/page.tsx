import type { Metadata } from "next";
import { LeavesCta } from "@/components/shared/LeavesCta";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Comment King's Bed Hotel protège la vie privée de ses hôtes et vos données de réservation.",
};

export default function PrivacyPage() {
  return (
    <>
    <article className="max-w-[720px] mx-auto px-6 pt-14 pb-24 space-y-8">
      <div className="space-y-3">
        <p className="text-[13px] text-[#5F5F5A]">Informations Légales</p>
        <h1 className="text-[clamp(2.25rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-[#111111]">
          Politique de Confidentialité
        </h1>
      </div>

      <div className="space-y-6 text-[16px] leading-[1.7] text-[#5F5F5A]">
        <p>
          Chez {siteConfig.name}, la confidentialité de nos clients est traitée avec la même
          discrétion que votre séjour ou vos réunions d&apos;affaires. Nous collectons uniquement
          les informations nécessaires à la préparation de votre chambre, de votre petit-déjeuner,
          de vos salles de conférence et à l&apos;envoi de votre confirmation.
        </p>
        <h2 className="text-[22px] font-normal text-[#111111] pt-2">
          1. Informations Collectées
        </h2>
        <p>
          Lorsque vous réservez une chambre, une suite ou une salle de séminaire, nous traitons
          votre nom, votre adresse e-mail, votre numéro de téléphone, vos dates de séjour ainsi que
          vos éventuelles préférences d&apos;arrivée.
        </p>
        <h2 className="text-[22px] font-normal text-[#111111] pt-2">
          2. Conservation et Suppression des Données
        </h2>
        <p>
          Vous pouvez demander à tout moment l&apos;accès, la rectification ou la suppression de vos
          données personnelles en écrivant à {siteConfig.email}.
        </p>
      </div>
    </article>
    <LeavesCta />
    </>
  );
}
