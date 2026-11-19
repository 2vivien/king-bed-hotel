"use client";

import { ArrowRight, Lock } from "lucide-react";
import { useState } from "react";
import { submitContact } from "@/features/booking/services/booking.service";

export function ContactFormCard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+229");
  const [phone, setPhone] = useState("");
  const [privilegeType, setPrivilegeType] = useState("Réservation Chambre & Petit-Déjeuner");
  const [destination, setDestination] = useState("Chambre King Size & Petit-Déjeuner");
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
      `Objet: ${privilegeType}`,
      `Espace souhaité: ${destination}`,
      `Téléphone: ${phonePrefix} ${phone.trim()}`,
      `Gazette King's Bed Hotel: ${gazetteOptIn ? "Oui" : "Non"}`,
      `Précisions: ${notes.trim() || "Demande générale d'information"}`,
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
          : "Impossible d'envoyer votre demande. Veuillez vérifier vos coordonnées."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-[0_6px_24px_-4px_rgba(13,43,36,0.05)]">
      <div className="mb-5">
        <span className="text-[11px] font-semibold text-[#3d6659] uppercase tracking-wider block mb-1">
          Transmission Directe
        </span>
        <h2 className="text-[32px] sm:text-[40px] font-medium leading-[1.2] tracking-[-0.02em] text-[#001510]">
          Envoyer une Demande Dédiée
        </h2>
        <p className="text-[15px] text-[#414846] mt-1">
          Notre équipe réception et séminaires étudie vos dates, besoins en chambres ou
          configurations de salle personnellement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label
              htmlFor="contact-first-name"
              className="text-[11px] font-semibold text-[#414846]"
            >
              Prénom *
            </label>
            <input
              id="contact-first-name"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Prénom ou civilité"
              autoComplete="given-name"
              className="w-full px-4 py-3 rounded-full bg-[#f4f3f0] text-[15px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none focus:bg-[#e3e2e0] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="contact-last-name"
              className="text-[11px] font-semibold text-[#414846]"
            >
              Nom *
            </label>
            <input
              id="contact-last-name"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nom ou entreprise"
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
              E-mail *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-full bg-[#f4f3f0] text-[15px] text-[#1a1c1a] placeholder:text-[#727975] focus:outline-none focus:bg-[#e3e2e0] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="contact-phone"
              className="text-[11px] font-semibold text-[#414846]"
            >
              Téléphone Direct *
            </label>
            <div className="flex items-center bg-[#f4f3f0] rounded-full px-3 py-1">
              <select
                aria-label="Indicatif téléphonique"
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}
                className="bg-transparent text-[15px] text-[#1a1c1a] focus:outline-none pr-1 cursor-pointer"
              >
                <option value="+229">+229 (BJ)</option>
                <option value="+33">+33 (FR)</option>
                <option value="+228">+228 (TG)</option>
                <option value="+225">+225 (CI)</option>
                <option value="+234">+234 (NG)</option>
                <option value="+1">+1 (US)</option>
              </select>
              <div className="w-px h-6 bg-[#c1c8c4] mx-2" />
              <input
                id="contact-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="6 12 34 56 78"
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
              Objet de Votre Demande
            </label>
            <select
              id="contact-privilege"
              value={privilegeType}
              onChange={(e) => setPrivilegeType(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-[#f4f3f0] text-[15px] text-[#1a1c1a] focus:outline-none cursor-pointer"
            >
              <option value="Réservation Chambre & Petit-Déjeuner">
                Réservation Chambre &amp; Petit-Déjeuner
              </option>
              <option value="Salle de Réunion / Séminaire">
                Salle de Réunion / Séminaire
              </option>
              <option value="Conférence & Congrès">
                Conférence &amp; Congrès
              </option>
              <option value="Privatisation Étage / Événement">
                Privatisation Étage / Événement
              </option>
              <option value="Presse & Partenariats">Presse &amp; Partenariats</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="contact-destination"
              className="text-[11px] font-semibold text-[#414846]"
            >
              Espace Souhaité
            </label>
            <select
              id="contact-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-[#f4f3f0] text-[15px] text-[#1a1c1a] focus:outline-none cursor-pointer"
            >
              <option value="Chambre King Size & Petit-Déjeuner">
                Chambre King Size &amp; Petit-Déjeuner
              </option>
              <option value="Suite Exécutive & Salon Privé">
                Suite Exécutive &amp; Salon Privé
              </option>
              <option value="Salle de Réunion Conseil (12 pers.)">
                Salle de Réunion Conseil (12 pers.)
              </option>
              <option value="Grande Salle de Conférence (140 pers.)">
                Grande Salle de Conférence (140 pers.)
              </option>
              <option value="Forfait Séminaire Résidentiel">
                Forfait Séminaire Résidentiel
              </option>
              <option value="Demande sur Mesure">
                Demande sur Mesure
              </option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="contact-notes"
            className="text-[11px] font-semibold text-[#414846]"
          >
            Précisions &amp; Besoins Spécifiques
          </label>
          <textarea
            id="contact-notes"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Précisez vos dates, nombre de participants ou d'hôtes, disposition de salle souhaitée, préférences de petit-déjeuner ou transferts..."
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
            Je souhaite recevoir les offres saisonnières et invitations privées de la
            Gazette King&apos;s Bed Hotel.
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
              {submitting ? "Envoi en cours..." : "Envoyer Votre Demande"}
            </span>
            <ArrowRight className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>

          <span className="text-[11px] font-semibold text-[#727975] flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#3d6659]" strokeWidth={1.5} />
            Protocole Conciergerie Sécurisé SSL
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
            Votre demande a bien été transmise à la réception du King&apos;s Bed Hotel.
            Un conseiller vous répondra sous 15 minutes.
          </div>
        ) : null}
      </form>
    </div>
  );
}
