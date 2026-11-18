"use client";

import { ArrowRight, Lock } from "lucide-react";
import { useState } from "react";
import { submitContact } from "@/features/booking/services/booking.service";

export function ContactFormCard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+41");
  const [phone, setPhone] = useState("");
  const [privilegeType, setPrivilegeType] = useState("Private Villa Booking");
  const [destination, setDestination] = useState("Ubud Sanctuary, Bali");
  const [notes, setNotes] = useState("");
  const [gazetteOptIn, setGazetteOptIn] = useState(true);
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);
    setSubmitting(true);

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const composedMessage = [
      `Privilege: ${privilegeType}`,
      `Destination: ${destination}`,
      `Telephone: ${phonePrefix} ${phone.trim()}`,
      `Gazette Opt-In: ${gazetteOptIn ? "Yes" : "No"}`,
      `Notes: ${notes.trim() || "General private concierge inquiry"}`,
    ].join(" | ");

    try {
      await submitContact({
        name: fullName,
        email: email.trim(),
        message: composedMessage,
        website,
      });
      setSubmitted(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNotes("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to transmit inquiry. Please verify your details."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-[0_6px_24px_-4px_rgba(13,43,36,0.05)]">
      <div className="mb-5">
        <span className="text-[11px] font-semibold text-[#3d6659] uppercase tracking-wider block mb-1">
          Direct Private Transmission
        </span>
        <h2 className="text-[32px] sm:text-[40px] font-medium leading-[1.2] tracking-[-0.02em] text-[#001510]">
          Send a Confidential Inquiry
        </h2>
        <p className="text-[15px] text-[#414846] mt-1">
          Our Senior Hospitality Partners will evaluate your dates and requirements
          personally.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label
              htmlFor="contact-first-name"
              className="text-[11px] font-semibold text-[#414846]"
            >
              First Name *
            </label>
            <input
              id="contact-first-name"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Lord, Lady, Dr., or First Name"
              autoComplete="given-name"
              className="w-full px-4 py-3 rounded-full bg-[#f4f3f0] text-[15px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none focus:bg-[#e3e2e0] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="contact-last-name"
              className="text-[11px] font-semibold text-[#414846]"
            >
              Last Name *
            </label>
            <input
              id="contact-last-name"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Surname or Family Office"
              autoComplete="family-name"
              className="w-full px-4 py-3 rounded-full bg-[#f4f3f0] text-[15px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none focus:bg-[#e3e2e0] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label
              htmlFor="contact-email"
              className="text-[11px] font-semibold text-[#414846]"
            >
              Confidential Email *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="principal@domain.com"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-full bg-[#f4f3f0] text-[15px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none focus:bg-[#e3e2e0] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="contact-phone"
              className="text-[11px] font-semibold text-[#414846]"
            >
              Direct Telephone *
            </label>
            <div className="flex items-center bg-[#f4f3f0] rounded-full px-3 py-1">
              <select
                aria-label="Country calling code"
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}
                className="bg-transparent text-[15px] text-[#1a1c1a] focus:outline-none pr-1 cursor-pointer"
              >
                <option value="+41">+41 (CH)</option>
                <option value="+33">+33 (FR)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+1">+1 (US)</option>
                <option value="+62">+62 (ID)</option>
              </select>
              <div className="w-px h-6 bg-[#c1c8c4] mx-2" />
              <input
                id="contact-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="79 000 0000"
                autoComplete="tel"
                className="w-full bg-transparent py-2 text-[15px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label
              htmlFor="contact-privilege"
              className="text-[11px] font-semibold text-[#414846]"
            >
              Nature of Privileges
            </label>
            <select
              id="contact-privilege"
              value={privilegeType}
              onChange={(e) => setPrivilegeType(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-[#f4f3f0] text-[15px] text-[#1a1c1a] focus:outline-none cursor-pointer"
            >
              <option value="Private Villa Booking">Private Villa Booking</option>
              <option value="Bespoke Itinerary Curation">
                Bespoke Itinerary Curation
              </option>
              <option value="Yacht & Aviation Charter">
                Yacht &amp; Aviation Charter
              </option>
              <option value="Private Estate Buyout">Private Estate Buyout</option>
              <option value="Press & Media Liaison">Press &amp; Media Liaison</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="contact-destination"
              className="text-[11px] font-semibold text-[#414846]"
            >
              Destination of Interest
            </label>
            <select
              id="contact-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-[#f4f3f0] text-[15px] text-[#1a1c1a] focus:outline-none cursor-pointer"
            >
              <option value="Ubud Sanctuary, Bali">Ubud Sanctuary, Bali</option>
              <option value="Cliffside Villas, Positano">
                Cliffside Villas, Positano
              </option>
              <option value="Overwater Residence, Maldives">
                Overwater Residence, Maldives
              </option>
              <option value="Heritage Penthouse, Lisbon">
                Heritage Penthouse, Lisbon
              </option>
              <option value="Multiple Sanctuaries Itinerary">
                Multiple Sanctuaries Itinerary
              </option>
              <option value="Undisclosed / Custom Request">
                Undisclosed / Custom Request
              </option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="contact-notes"
            className="text-[11px] font-semibold text-[#414846]"
          >
            Bespoke Specifications &amp; Requirements
          </label>
          <textarea
            id="contact-notes"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Detail dates, guest count, dietary preferences, private hangar liaison, or personal security protocols..."
            className="w-full px-4 py-3 rounded-2xl bg-[#f4f3f0] text-[15px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none focus:bg-[#e3e2e0] transition-colors resize-none"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer group pt-1">
          <input
            type="checkbox"
            checked={gazetteOptIn}
            onChange={(e) => setGazetteOptIn(e.target.checked)}
            className="mt-1 w-4 h-4 rounded accent-[#0d2b24] cursor-pointer"
          />
          <span className="text-[13px] text-[#414846] group-hover:text-[#1a1c1a] transition-colors">
            I wish to receive discreet, seasonal communications and confidential preview
            keys from the SuiteSavvy Private Gazette.
          </span>
        </label>

        {/* Honeypot anti-bot */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#0d2b24] text-white text-[14px] font-semibold shadow-md hover:bg-[#001510] transition-all duration-200 cursor-pointer disabled:opacity-60"
          >
            <span>
              {submitting ? "Transmitting..." : "Transmit Confidential Message"}
            </span>
            <ArrowRight className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>

          <span className="text-[11px] font-semibold text-[#727975] flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#3d6659]" strokeWidth={1.5} />
            256-Bit SSL Concierge Protocol
          </span>
        </div>

        {error ? (
          <p className="text-[13px] text-[#ba1a1a]" role="alert">
            {error}
          </p>
        ) : null}

        {submitted ? (
          <div
            role="status"
            className="p-4 rounded-xl bg-[#bce9d9] text-[#416b5d] text-[12px] font-medium"
          >
            Your inquiry has been encrypted and assigned to the Senior Regional Concierge.
            Expect immediate contact within 15 minutes.
          </div>
        ) : null}
      </form>
    </div>
  );
}
