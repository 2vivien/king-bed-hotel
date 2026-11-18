"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqMock } from "@/mocks/testimonials";
import { cn } from "@/lib/utils";

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string>(faqMock[0].id);

  return (
    <div className="space-y-3 max-w-3xl">
      {faqMock.map((item) => {
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
  );
}
