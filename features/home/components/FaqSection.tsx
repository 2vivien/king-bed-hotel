"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqMock } from "@/mocks/testimonials";
import { cn } from "@/lib/utils";

const HOME_FAQ_IDS = ["check-in", "conferences", "breakfast", "cancellation"] as const;

export function FaqSection() {
  const items = HOME_FAQ_IDS.map((id) =>
    faqMock.find((item) => item.id === id)
  ).filter((item) => item !== undefined);
  const [openId, setOpenId] = useState<string>(items[0]?.id ?? "");

  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24 border-t border-[#EDEDEA]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#3d6659] font-semibold">
              Questions
            </span>
            <h2 className="mt-2 text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.12] font-medium tracking-[-0.02em] text-[#001510]">
              Tout Ce Que Vous
              <br />
              Voulez Savoir
            </h2>
          </div>
          <p className="text-[16px] leading-[1.6] text-[#414846] max-w-xs">
            Avant, pendant et après votre séjour — les réponses qui comptent.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {items.map((item) => {
            const isOpen = item.id === openId;
            return (
              <div
                key={item.id}
                className="rounded-[24px] bg-white border border-[#111111]/8 overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? "" : item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="text-[17px] font-normal text-[#111111]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-[#5F5F5A] shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                {isOpen ? (
                  <div className="px-6 pb-6 text-[15px] leading-[1.6] text-[#5F5F5A]">
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
