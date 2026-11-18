"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { Button } from "@/components/ui/Button";
import { DialogModal } from "@/components/ui/DialogModal";
import { SegmentedTabs, type SegmentedOption } from "@/components/ui/SegmentedTabs";
import { galleryMock } from "@/mocks/gallery";
import type { GalleryCategory } from "@/types/hotel.types";

const categoryOptions: readonly SegmentedOption<GalleryCategory>[] = [
  { value: "All", label: "All" },
  { value: "Rooms", label: "Rooms" },
  { value: "Pool", label: "Pool" },
  { value: "Dining", label: "Dining" },
  { value: "Wellness", label: "Wellness" },
];

export function GalleryGrid() {
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered =
    category === "All"
      ? galleryMock
      : galleryMock.filter((item) => item.category === category);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const activeItem = activeIndex !== null ? filtered[activeIndex] ?? null : null;
  const totalCount = filtered.length;

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + totalCount) % totalCount
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % totalCount
    );
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + totalCount) % totalCount
        );
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % totalCount
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, totalCount]);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <SegmentedTabs
          options={categoryOptions}
          value={category}
          onChange={(next) => {
            setCategory(next);
            setVisibleCount(6);
            setActiveIndex(null);
          }}
          ariaLabel="Filter gallery images by category"
        />
        <span className="text-[14px] text-[#5F5F5A] tabular-nums">
          Showing {displayed.length} of {filtered.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayed.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="group relative aspect-[4/3] rounded-[24px] overflow-hidden bg-[#EFE6D6] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          >
            <SuiteImage
              src={item.image}
              alt={item.title}
              sizes="(max-width: 768px) 100vw, 400px"
              className="group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-[12px] text-white/75">{item.category}</p>
              <p className="text-[18px] font-normal tracking-[-0.015em]">{item.title}</p>
            </div>
          </button>
        ))}
      </div>

      {hasMore ? (
        <div className="flex justify-center pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setVisibleCount((prev) => prev + 6)}
          >
            View More
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Button>
        </div>
      ) : null}

      <DialogModal
        open={Boolean(activeItem)}
        onClose={() => setActiveIndex(null)}
        title={activeItem ? activeItem.title : "Gallery Preview"}
        maxWidthClass="max-w-4xl"
      >
        {activeItem ? (
          <div className="space-y-4">
            <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-[#EFE6D6]">
              <SuiteImage
                src={activeItem.image}
                alt={activeItem.caption}
                sizes="(max-width: 1024px) 95vw, 860px"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] text-[#5F5F5A]">{activeItem.category}</p>
                <p className="text-[15px] text-[#111111] mt-0.5">{activeItem.caption}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="w-10 h-10 rounded-full bg-white border border-[#111111]/10 flex items-center justify-center hover:bg-[#EFE6D6] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="w-10 h-10 rounded-full bg-white border border-[#111111]/10 flex items-center justify-center hover:bg-[#EFE6D6] cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </DialogModal>
    </div>
  );
}
