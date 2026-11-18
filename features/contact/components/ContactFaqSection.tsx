"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const contactFaqs = [
  {
    id: "faq-1",
    question: "Comment réserver une chambre avec petit-déjeuner inclus ?",
    answer:
      "Depuis notre page Réservation, sélectionnez vos dates, votre chambre ou suite King Size et cochez l'option Petit-Déjeuner Gastronomique. La confirmation avec votre code KB- est immédiate.",
  },
  {
    id: "faq-2",
    question:
      "Comment organiser une réunion, un séminaire ou une conférence à l'hôtel ?",
    answer:
      "Indiquez la date, le nombre de participants (de 8 à 140 personnes) et la disposition souhaitée (en U, théâtre, classe ou conseil) via le formulaire ci-dessus. Notre coordinateur vous transmet un devis détaillé avec pauses café et restauration sous 2 heures.",
  },
  {
    id: "faq-3",
    question:
      "Quelles sont vos conditions d'annulation pour les séjours et les salles ?",
    answer:
      "Les réservations individuelles sont annulables sans frais jusqu'à 48 heures avant l'arrivée. Pour les séminaires et conférences, des modalités flexibles de report et d'ajustement du nombre de participants sont prévues.",
  },
] as const;

export function ContactFaqSection() {
  const [openId, setOpenId] = useState<string>("");

  return (
    <section className="w-full bg-white border-t border-[#EDEDEA] py-14">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center mb-8 space-y-2">
          <span className="text-[11px] font-semibold text-[#3d6659] uppercase tracking-wider">
            Informations Pratiques
          </span>
          <h2 className="text-[32px] sm:text-[40px] font-medium text-[#001510]">
            Questions Fréquentes
          </h2>
          <p className="text-[15px] text-[#414846]">
            Réponses rapides concernant les chambres, le petit-déjeuner et l&apos;organisation
            de vos réunions ou conférences.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {contactFaqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-[#EDEDEA] shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? "" : item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-[18px] sm:text-[20px] font-semibold text-[#001510]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-[#727975] shrink-0 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                {isOpen ? (
                  <div className="px-6 pb-5 pt-0 text-[15px] leading-[1.6] text-[#414846]">
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
