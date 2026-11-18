"use client";

import { useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { subscribeNewsletter } from "@/features/booking/services/booking.service";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    try {
      const res = await subscribeNewsletter({ email, company });
      setStatus("success");
      setFeedback(res.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof Error ? err.message : "Unable to subscribe right now."
      );
    }
  };

  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
      <Reveal>
        <div className="relative rounded-[36px] overflow-hidden bg-[#1F3A2C] px-6 sm:px-12 lg:px-16 py-14 sm:py-16 text-white">
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <SuiteImage
              src="/images/textures/leaf-dark.jpg"
              alt="Tropical botanical foliage texture"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#1F3A2C]/90 via-[#1F3A2C]/75 to-[#1F3A2C]/85"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-[clamp(2rem,3.6vw,2.75rem)] font-light leading-[1.1] tracking-[-0.025em]">
              Stay Inspired
            </h2>
            <p className="text-[16px] sm:text-[18px] text-white/80 leading-[1.55]">
              Get the latest offers, travel tips and exclusive seasonal invitations.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-[28px] sm:rounded-full bg-white p-2 max-w-lg mx-auto shadow-[0_12px_36px_rgba(0,0,0,0.2)]"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                autoComplete="email"
                className="flex-1 h-11 px-4 rounded-full bg-transparent text-[15px] text-[#111111] placeholder:text-[#9A9A93] outline-none"
              />
              {/* Honeypot anti-bot field */}
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-11 px-6 rounded-full bg-[#111111] text-white text-[14px] font-medium hover:bg-[#2A2A28] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {feedback ? (
              <p
                role="status"
                aria-live="polite"
                className={`text-[14px] ${
                  status === "error" ? "text-red-200" : "text-[#D8EBDD]"
                }`}
              >
                {feedback}
              </p>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
