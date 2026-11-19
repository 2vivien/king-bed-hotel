"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
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
      className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24 border-t border-[#EDEDEA]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Texte à gauche */}
        <Reveal className="lg:col-span-3 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#3d6659] font-semibold">
              Avis Clients
            </span>
            <h2 className="mt-2 text-[clamp(2rem,4vw,2.5rem)] leading-[1.12] font-medium tracking-[-0.02em] text-[#001510]">
              Plébiscité par
              <br />
              Nos Voyageurs
            </h2>
          </div>
          <p className="text-[16px] leading-[1.6] text-[#414846] max-w-xs">
            De vraies expériences, vécues par nos résidents à Savalou, au cœur du
            Bénin.
          </p>
        </Reveal>

        {/* Carte + image paysage à droite */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          <Reveal delay={0.06} className="md:col-span-7 flex">
            <figure className="w-full rounded-[28px] bg-white border border-[#111111]/8 p-7 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <Quote className="w-8 h-8 text-[#5F5F5A]" strokeWidth={1.5} aria-hidden="true" />
                <blockquote className="text-[18px] sm:text-[20px] font-light leading-[1.42] tracking-[-0.01em] text-[#111111]">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="flex items-center justify-between gap-4 pt-6 border-t border-[#111111]/8">
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-11 h-11 rounded-full bg-[#EFE6D6] text-[#111111] text-[13px] font-medium flex items-center justify-center shrink-0">
                    {current.avatarLabel}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-[#111111]">
                      {current.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Témoignage précédent"
                    className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#111111]/10 flex items-center justify-center text-[#111111] hover:bg-[#EFE6D6] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Témoignage suivant"
                    className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#111111]/10 flex items-center justify-center text-[#111111] hover:bg-[#EFE6D6] transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-5 flex">
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-full rounded-[28px] overflow-hidden bg-[#EFE6D6]">
              <SuiteImage
                src={current.image}
                alt={current.stayTitle}
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
