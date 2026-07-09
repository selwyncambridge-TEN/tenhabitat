import type { MetadataRoute } from "next";

import { absoluteUrl, seoRoutes } from "@/lib/seo";

const lastModified = new Date("2026-07-09T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(seoRoutes).map(([path, route]) => ({
    changeFrequency: route.changeFrequency,
    lastModified,
    priority: route.priority,
    url: absoluteUrl(path),
  }));
}
