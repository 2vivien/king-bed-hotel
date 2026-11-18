"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/features/booking/services/booking.service";

export function FooterGazetteForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setFeedback("");
    try {
      const res = await subscribeNewsletter({ email });
      setStatus("success");
      setFeedback(res.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Unable to join right now.");
    }
  };

  return (
    <div className="space-y-2">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-[#e3e2e0] rounded-full p-1 pl-4 shadow-inner"
      >
        <label htmlFor="footer-gazette-email" className="sr-only">
          Enter your email
        </label>
        <input
          id="footer-gazette-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-transparent border-0 text-[13px] text-[#1a1c1a] placeholder:text-[#414846] focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-2 rounded-full bg-[#001510] text-white text-[12px] font-medium hover:bg-[#0d2b24] transition-colors shrink-0 cursor-pointer disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Join"}
        </button>
      </form>
      {feedback ? (
        <p
          role="status"
          className={`text-[12px] ${
            status === "error" ? "text-[#ba1a1a]" : "text-[#3d6659]"
          }`}
        >
          {feedback}
        </p>
      ) : null}
    </div>
  );
}
