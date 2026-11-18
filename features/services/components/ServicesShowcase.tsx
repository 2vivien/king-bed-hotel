"use client";

import { ArrowRight, Bell, Car, Sparkles, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { servicesMock } from "@/mocks/services";
import { cn } from "@/lib/utils";

const serviceIcons = {
  concierge: Bell,
  spa: Sparkles,
  dining: UtensilsCrossed,
  transfers: Car,
} as const;

export function ServicesShowcase() {
  const [selectedId, setSelectedId] = useState<string>(servicesMock[0].id);
  const selected =
    servicesMock.find((s) => s.id === selectedId) ?? servicesMock[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
      <div className="lg:col-span-6 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          {servicesMock.map((service) => {
            const Icon =
              serviceIcons[service.id as keyof typeof serviceIcons] ?? Bell;
            const active = service.id === selected.id;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedId(service.id)}
                className={cn(
                  "w-full text-left rounded-[24px] p-5 transition-all border cursor-pointer",
                  active
                    ? "bg-white border-[#111111]/12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                    : "bg-transparent border-transparent hover:bg-white/60"
                )}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      active
                        ? "bg-[#111111] text-white"
                        : "bg-[#EFE6D6] text-[#111111]"
                    )}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </span>
                  <div className="space-y-1">
                    <h2 className="text-[20px] font-normal tracking-[-0.015em] text-[#111111]">
                      {service.title}
                    </h2>
                    <p className="text-[14px] text-[#5F5F5A]">{service.subtitle}</p>
                  </div>
                </div>

                {active ? (
                  <div className="mt-4 pt-4 border-t border-[#111111]/8 pl-15 space-y-2.5 text-[14px] text-[#5F5F5A]">
                    <p className="leading-[1.6]">{service.description}</p>
                    <p className="text-[13px] font-medium text-[#111111]">
                      {service.hours}
                    </p>
                    <ul className="space-y-1 pt-1">
                      {service.highlights.map((h) => (
                        <li key={h}>· {h}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="pt-4">
          <Link
            href="/contact"
            className="h-11 px-6 rounded-full bg-[#111111] text-white text-[14px] font-medium inline-flex items-center gap-2 hover:bg-[#2A2A28] transition-colors"
          >
            Request Custom Arrangement
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <Reveal className="lg:col-span-6 flex">
        <div className="relative w-full min-h-[420px] lg:h-full rounded-[28px] overflow-hidden bg-[#EFE6D6]">
          <SuiteImage
            src="/images/services/spa-towels.jpg"
            alt="SuiteSavvy Spa & Wellness botanical oils and linen towels"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
          <Link
            href="/reservation"
            aria-label="Reserve stay with bespoke services"
            className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white text-[#111111] shadow-md flex items-center justify-center hover:scale-105 transition-transform"
          >
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
