import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-full text-[14px] font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[#111111] text-white hover:bg-[#2A2A28] px-6 h-11",
        secondary:
          "bg-white text-[#111111] border border-[#111111]/12 hover:bg-[#F4F1EA] px-6 h-11",
        "ghost-on-image":
          "glass-surface-subtle text-white border border-white/25 hover:bg-white/28 px-6 h-11",
        sand: "bg-[#EFE6D6] text-[#111111] hover:bg-[#E5D9C3] px-6 h-11",
        "icon-circle":
          "bg-white text-[#111111] border border-[#111111]/10 hover:bg-[#F4F1EA] w-11 h-11 p-0",
      },
      size: {
        default: "",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-7 text-[15px]",
        icon: "w-11 h-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
