/**
 * Génère le contenu iCalendar (.ics) pour un séjour SuiteSavvy.
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
    "PRODID:-//SuiteSavvy//Reservation//EN",
    "BEGIN:VEVENT",
    `UID:${input.bookingId}@suitesavvy.com`,
    `DTSTART;VALUE=DATE:${dtStart}`,
    `DTEND;VALUE=DATE:${dtEnd}`,
    `SUMMARY:SuiteSavvy Stay — ${input.roomName}`,
    `LOCATION:${input.location}`,
    `DESCRIPTION:Reservation Reference ${input.bookingId}`,
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
    text: `SuiteSavvy Stay — ${input.roomName}`,
    dates,
    location: input.location,
    details: `Reservation Reference: ${input.bookingId}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
