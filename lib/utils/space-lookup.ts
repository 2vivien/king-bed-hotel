import { conferenceHallsMock } from "@/mocks/halls";
import { roomsMock } from "@/mocks/rooms";
import type { Room } from "@/types/hotel.types";

/** Tous les espaces réservables : chambres & suites + salles de conférence. */
export const spacesMock: readonly Room[] = [...roomsMock, ...conferenceHallsMock];

export function findSpace(slug: string | undefined): Room | undefined {
  if (!slug) return undefined;
  return spacesMock.find((space) => space.slug === slug);
}
