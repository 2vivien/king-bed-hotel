"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { testimonialsMock } from "@/mocks/testimonials";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const current = testimonialsMock[index] ?? testimonialsMock[0];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonialsMock.length) % testimonialsMock.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonialsMock.length);
  };

  return (
    <section
      id="testimonials"
      className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-24"
    >
      <Reveal>
        <div className="mb-12">
          <SectionHeading
            eyebrow="Témoignages"
            title="Plébiscité par Nos Clients & Entreprises"
          />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <Reveal className="lg:col-span-7 flex">
          <div className="w-full rounded-[28px] bg-white border border-[#111111]/8 p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <Quote className="w-8 h-8 text-[#5F5F5A]" strokeWidth={1.5} aria-hidden="true" />
              <blockquote className="text-[20px] sm:text-[24px] font-light leading-[1.4] tracking-[-0.015em] text-[#111111]">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
            </div>

            <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#111111]/8">
              <div className="flex items-center gap-3.5">
                <span className="w-11 h-11 rounded-full bg-[#EFE6D6] text-[#111111] text-[13px] font-medium flex items-center justify-center shrink-0">
                  {current.avatarLabel}
                </span>
                <div>
                  <p className="text-[15px] font-medium text-[#111111]">
                    {current.name}
                  </p>
                  <p className="text-[13px] text-[#5F5F5A]">
                    {current.location} · {current.stayTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Témoignage précédent"
                  className="w-11 h-11 rounded-full bg-[#FAF9F6] border border-[#111111]/10 flex items-center justify-center text-[#111111] hover:bg-[#EFE6D6] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Témoignage suivant"
                  className="w-11 h-11 rounded-full bg-[#FAF9F6] border border-[#111111]/10 flex items-center justify-center text-[#111111] hover:bg-[#EFE6D6] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5 flex">
          <div className="relative w-full min-h-[280px] lg:h-full rounded-[28px] overflow-hidden bg-[#EFE6D6]">
            <SuiteImage
              src={current.image}
              alt={current.stayTitle}
              sizes="(max-width: 1024px) 100vw, 500px"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
