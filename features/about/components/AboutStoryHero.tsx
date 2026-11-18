"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { DialogModal } from "@/components/ui/DialogModal";

export function AboutStoryHero() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative rounded-[36px] overflow-hidden min-h-[460px] lg:min-h-[540px] bg-[#1F3A2C]">
        <SuiteImage
          src="/images/about/about-lounge.jpg"
          alt="SuiteSavvy sunlit architectural lounge opening to tropical garden"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20"
          aria-hidden="true"
        />
        <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col justify-end min-h-[460px] lg:min-h-[540px] text-white max-w-2xl space-y-5">
          <p className="text-[13px] text-white/80">About Us</p>
          <h1 className="text-[clamp(2.35rem,4.8vw,3.75rem)] font-light leading-[1.04] tracking-[-0.03em] text-balance">
            Redefining Luxury Stays
          </h1>
          <p className="text-[16px] sm:text-[18px] text-white/85 leading-[1.55]">
            Founded in 2019, SuiteSavvy curates intimate architectural retreats where calm
            materials, local craftsmanship, and attentive hospitality come together.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="h-11 px-6 rounded-full bg-white text-[#111111] text-[14px] font-medium inline-flex items-center gap-2 hover:bg-[#EFE6D6] transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" strokeWidth={1.5} />
              Watch our story
            </button>
          </div>
        </div>
      </div>

      <DialogModal
        open={open}
        onClose={() => setOpen(false)}
        title="The SuiteSavvy Story"
      >
        <div className="space-y-4">
          <div className="relative aspect-video rounded-[20px] overflow-hidden bg-[#1F3A2C]">
            <SuiteImage
              src="/images/hero/hero-pool.jpg"
              alt="SuiteSavvy Ubud estate pool and stone terraces"
              sizes="(max-width: 768px) 95vw, 760px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <p className="text-[13px] text-white/80">Documentary Short · 2019 – Present</p>
              <p className="text-[20px] font-light mt-1">
                From a single limestone sanctuary in Ubud to five coastal &amp; island retreats.
              </p>
            </div>
          </div>
          <p className="text-[15px] text-[#5F5F5A] leading-[1.6]">
            Every SuiteSavvy property is restored or built with regional stone, sustainably
            harvested timber, and passive solar shading—creating tranquil spaces that belong
            to their landscape.
          </p>
        </div>
      </DialogModal>
    </>
  );
}
