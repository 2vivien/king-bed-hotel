"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const contactFaqs = [
  {
    id: "faq-1",
    question: "How does private villa reservation confirmation work?",
    answer:
      "Upon submitting your initial preferences, an assigned Private Concierge verifies instant availability, provides a curated dossier of the residence, and coordinates private lease agreements. Once vetted, you receive an encrypted booking key and direct personal WhatsApp liaison for in-stay preferences.",
  },
  {
    id: "faq-2",
    question:
      "Can you arrange private jet or helicopter charters directly to the sanctuaries?",
    answer:
      "Yes. Our concierge liaises with certified international aviation brokers to coordinate private runway slots, customs clearance fast-tracking, and seamless onward helicopter or tender transfers straight to your suite or villa helipad.",
  },
  {
    id: "faq-3",
    question:
      "What are the cancellation and confidentiality guarantees for VIP patrons?",
    answer:
      "All guest communications and guest rosters are sealed under stringent Non-Disclosure Agreements (NDAs). Flexible rebooking options and customizable protection deposits are drafted into individual property manifests to ensure peace of mind for sudden schedule shifts.",
  },
] as const;

export function ContactFaqSection() {
  const [openId, setOpenId] = useState<string>("");

  return (
    <section className="w-full bg-[#f4f3f0] py-14">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center mb-8 space-y-2">
          <span className="text-[11px] font-semibold text-[#3d6659] uppercase tracking-wider">
            Protocol &amp; Confidentiality
          </span>
          <h2 className="text-[32px] sm:text-[40px] font-medium text-[#001510]">
            Frequently Addressed Questions
          </h2>
          <p className="text-[15px] text-[#414846]">
            Immediate insights into private estate reservations, bespoke logistics, and
            discretion protocols.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {contactFaqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200"
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
