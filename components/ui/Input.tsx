import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-[#5F5F5A]"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 w-full rounded-2xl bg-[#F4F1EA] px-4 text-[15px] text-[#111111] placeholder:text-[#9A9A93] transition-colors outline-none border border-transparent focus:bg-white focus:border-[#111111]/20 focus:ring-2 focus:ring-[#111111]/10",
            error && "border-red-500/60 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-[13px] text-red-700" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
