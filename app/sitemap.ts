import type { MetadataRoute } from "next";
import { roomsMock } from "@/mocks/rooms";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/about",
    "/rooms",
    "/services",
    "/gallery",
    "/contact",
    "/reservation",
    "/my-booking",
    "/faq",
    "/legal/privacy",
    "/legal/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const roomRoutes = roomsMock.map((room) => ({
    url: `${baseUrl}/rooms/${room.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...roomRoutes];
}
