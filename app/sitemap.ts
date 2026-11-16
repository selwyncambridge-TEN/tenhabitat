import type { MetadataRoute } from "next";

import { retiredPaths } from "@/lib/retired-pages";
import { absoluteUrl, seoRoutes } from "@/lib/seo";

const lastModified = new Date("2026-07-09T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const retired = new Set<string>(retiredPaths);

  return Object.entries(seoRoutes)
    .filter(([path]) => !retired.has(path))
    .map(([path, route]) => ({
      changeFrequency: route.changeFrequency,
      lastModified,
      priority: route.priority,
      url: absoluteUrl(path),
    }));
}
