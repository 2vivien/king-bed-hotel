export type UserRole = "user" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  initials: string;
  phone: string;
  memberNumber: string;
}

export type ManagedBookingStatus = "confirmed" | "pending" | "history" | "declined";

export interface ManagedBookingRequest {
  icon: "utensils" | "presentation" | "car" | "bed" | "sparkles" | "ban";
  title: string;
  desc: string;
}

export interface ManagedBooking {
  id: string;
  ref: string;
  guestName: string;
  guestInitials: string;
  guestEmail: string;
  guestPhone: string;
  guestTier: string;
  historyLabel: string;
  status: ManagedBookingStatus;
  statusLabel: string;
  roomTitle: string;
  locationLabel: string;
  dateRange: string;
  durationLabel: string;
  guestsLabel: string;
  breakfastOrHallLabel: string;
  serviceIncluded: string;
  butlerName: string;
  amount: number; // XOF (francs CFA), entiers
  image: string;
  perkTitle: string;
  perkSubtitle: string;
  perkBadge: string;
  deadlineHint: string;
  internalNote: string;
  requests: ManagedBookingRequest[];
}
