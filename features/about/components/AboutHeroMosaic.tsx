import { Award, Leaf, Star } from "lucide-react";
import { SuiteImage } from "@/components/shared/SuiteImage";

export function AboutHeroMosaic() {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 pb-14">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e9e8e5] text-[#001510] text-[12px] font-medium tracking-[0.02em] mb-2">
            <Award className="w-3.5 h-3.5 text-[#3d6659]" strokeWidth={1.75} />
            <span>Notre Philosophie &amp; Héritage</span>
          </div>
          <h1 className="text-[clamp(2.4rem,4.5vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#001510] mt-1">
            L&apos;Art de Recevoir au King&apos;s Bed Hotel
          </h1>
        </div>
        <p className="text-[18px] leading-[1.55] text-[#414846] max-w-lg pb-1">
          Fondé sur la conviction que le véritable confort réside dans le calme absolu, une
          literie royale, un petit-déjeuner généreux et des espaces dédiés à vos réunions.
        </p>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
        <div className="relative h-[460px] md:h-[580px] w-full bg-[#0d2b24]">
          <SuiteImage
            src="/images/about/stone-lobby.jpg"
            alt="Hall élégant du King's Bed Hotel avec arches de pierre, bassin apaisant et lumière naturelle"
            sizes="(max-width: 1440px) 100vw, 1440px"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#001510]/80 via-[#001510]/20 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-5 py-3 rounded-full bg-[#faf9f6]/92 backdrop-blur-md shadow-md flex items-center gap-3">
                <Award className="w-5 h-5 text-[#3d6659]" strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-semibold text-[#001510] uppercase tracking-wider">
                    Distinction
                  </p>
                  <p className="text-[12px] font-semibold text-[#1a1c1a]">
                    Certifié Clef Michelin 2025
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 rounded-full bg-[#faf9f6]/92 backdrop-blur-md shadow-md flex items-center gap-3">
                <Star className="w-5 h-5 text-[#3d6659]" strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-semibold text-[#001510] uppercase tracking-wider">
                    Affaires &amp; Congrès
                  </p>
                  <p className="text-[12px] font-semibold text-[#1a1c1a]">
                    6 Salles de Conférence Équipées
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 rounded-full bg-[#faf9f6]/92 backdrop-blur-md shadow-md hidden sm:flex items-center gap-3">
                <Leaf className="w-5 h-5 text-[#3d6659]" strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-semibold text-[#001510] uppercase tracking-wider">
                    Engagement
                  </p>
                  <p className="text-[12px] font-semibold text-[#1a1c1a]">
                    Séjours 100 % Éco-Responsables
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 rounded-xl bg-[#0d2b24] text-white shadow-lg backdrop-blur-sm flex items-center gap-4">
              <span className="text-[32px] font-semibold leading-none text-[#bfecdc] tabular-nums">
                06
              </span>
              <div>
                <p className="text-[11px] font-semibold text-[#c9eade] uppercase tracking-wider">
                  Années d&apos;Excellence
                </p>
                <p className="text-[13px] text-white">Chambres, Matins &amp; Séminaires</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
