"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SegmentedTabs, type SegmentedOption } from "@/components/ui/SegmentedTabs";
import { RoomCard } from "@/features/home/components/RoomCard";
import { roomsMock } from "@/mocks/rooms";

type FilterType = "all" | "suites" | "villas";

const filterOptions: readonly SegmentedOption<FilterType>[] = [
  { value: "all", label: "All Rooms" },
  { value: "suites", label: "Suites" },
  { value: "villas", label: "Villas" },
];

function RoomsCatalogInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawType = searchParams.get("type");
  const activeType: FilterType =
    rawType === "suites" || rawType === "villas" ? rawType : "all";

  const filteredRooms =
    activeType === "all"
      ? roomsMock
      : roomsMock.filter((room) => room.category === activeType);

  const handleChange = (next: FilterType) => {
    const query = next === "all" ? "/rooms" : `/rooms?type=${next}`;
    router.replace(query, { scroll: false });
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <SegmentedTabs
          options={filterOptions}
          value={activeType}
          onChange={handleChange}
          ariaLabel="Filter accommodations by type"
        />
        <p className="text-[14px] text-[#5F5F5A] tabular-nums">
          {filteredRooms.length} {filteredRooms.length === 1 ? "residence" : "residences"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <RoomCard key={room.slug} room={room} variant="catalog" />
        ))}
      </div>
    </div>
  );
}

export function RoomsCatalog() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[440px] rounded-[24px] bg-[#F4F1EA] animate-pulse" />
          ))}
        </div>
      }
    >
      <RoomsCatalogInner />
    </Suspense>
  );
}
