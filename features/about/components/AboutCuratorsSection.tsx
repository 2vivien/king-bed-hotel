import { Quote } from "lucide-react";
import { SuiteImage } from "@/components/shared/SuiteImage";

export function AboutCuratorsSection() {
  return (
    <section className="w-full bg-white border-t border-[#EDEDEA] py-14">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="rounded-3xl bg-white border border-[#EDEDEA] p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shrink-0 shadow-md bg-[#e3e2e0]">
            <SuiteImage
              src="/images/curators/henrik.jpg"
              alt="Henrik Valdemar — Fondateur et Directeur Général du King's Bed Hotel"
              sizes="128px"
            />
          </div>
          <div className="space-y-3">
            <Quote className="w-9 h-9 text-[#3d6659]" strokeWidth={1.5} />
            <p className="text-[18px] leading-[1.55] text-[#001510] italic max-w-3xl">
              &laquo;&nbsp;Nous ne proposons pas de simples chambres&nbsp;: nous créons des
              espaces où l&apos;on dort profondément, où l&apos;on savoure chaque matin et
              où vos équipes se réunissent dans des conditions idéales.&nbsp;&raquo;
            </p>
            <div className="pt-2">
              <h3 className="text-[20px] font-semibold text-[#001510]">
                Henrik Valdemar
              </h3>
              <p className="text-[11px] font-semibold text-[#414846] uppercase tracking-wider">
                Fondateur &amp; Directeur Général — King&apos;s Bed Hotel
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
