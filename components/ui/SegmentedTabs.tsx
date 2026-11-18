"use client";

import { cn } from "@/lib/utils";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedTabsProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex flex-wrap items-center gap-1 rounded-full bg-white p-1.5 border border-[#111111]/8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "h-9 px-5 rounded-full text-[14px] font-medium whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer",
              active
                ? "bg-[#111111] text-white shadow-sm"
                : "text-[#5F5F5A] hover:text-[#111111]"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
