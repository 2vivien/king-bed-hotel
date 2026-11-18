/**
 * Génère le contenu iCalendar (.ics) pour un séjour au King's Bed Hotel.
 */
export function buildBookingIcs(input: {
  bookingId: string;
  roomName: string;
  location: string;
  checkIn: string;
  checkOut: string;
}): string {
  const dtStart = input.checkIn.replaceAll("-", "");
  const dtEnd = input.checkOut.replaceAll("-", "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//KingsBedHotel//Reservation//FR",
    "BEGIN:VEVENT",
    `UID:${input.bookingId}@kingsbedhotel.com`,
    `DTSTART;VALUE=DATE:${dtStart}`,
    `DTEND;VALUE=DATE:${dtEnd}`,
    `SUMMARY:Séjour King's Bed Hotel — ${input.roomName}`,
    `LOCATION:${input.location}`,
    `DESCRIPTION:Référence de réservation ${input.bookingId}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Construit un lien Google Calendar pour ajouter le séjour.
 */
export function buildGoogleCalendarUrl(input: {
  bookingId: string;
  roomName: string;
  location: string;
  checkIn: string;
  checkOut: string;
}): string {
  const dates = `${input.checkIn.replaceAll("-", "")}/${input.checkOut.replaceAll("-", "")}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Séjour King's Bed Hotel — ${input.roomName}`,
    dates,
    location: input.location,
    details: `Référence de réservation : ${input.bookingId}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
