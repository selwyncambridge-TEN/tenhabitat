import type { Metadata } from "next";

export const siteUrl = "https://tenhabitat.com";
export const siteName = "TEN Habitat";

export const defaultSeoDescription =
  "TEN Habitat introduces Venture Habitat, a founding-community entry point for Caribbean builders, backers, and investors.";

export const socialImage = {
  alt: "TEN Habitat Venture Habitat founding community",
  height: 1530,
  url: "/images/vh-collage-launch.jpg",
  width: 2346,
} as const;

export const seoRoutes = {
  "/": {
    changeFrequency: "monthly",
    description: defaultSeoDescription,
    priority: 1,
    title: "TEN Habitat | Venture Habitat Launch",
  },
  "/home": {
    changeFrequency: "monthly",
    description:
      "Explore Venture Habitat, TEN Habitat's conversion layer helping Caribbean businesses gain structure, community, capital access, and growth momentum.",
    priority: 0.9,
    title: "Venture Habitat for Caribbean Builders and Capital | TEN Habitat",
  },
  "/builders": {
    changeFrequency: "monthly",
    description:
      "Venture Habitat helps Caribbean founders, entrepreneurs, and support organizations move from potential to funded, connected, growing businesses.",
    priority: 0.8,
    title: "For Caribbean Builders and Founders | TEN Habitat",
  },
  "/backers": {
    changeFrequency: "monthly",
    description:
      "See how Venture Habitat gives governments, development institutions, credit unions, and corporates decision-grade insight into investable Caribbean businesses.",
    priority: 0.8,
    title: "For Caribbean Backers and Institutions | TEN Habitat",
  },
  "/investors": {
    changeFrequency: "monthly",
    description:
      "Venture Habitat helps diaspora investors and capital partners connect economic participation to investable Caribbean businesses and long-term regional growth.",
    priority: 0.8,
    title: "For Caribbean Diaspora Investors | TEN Habitat",
  },
  "/join": {
    changeFrequency: "monthly",
    description:
      "Join TEN Habitat's founding community as a builder, backer, or investor and be first in line as Venture Habitat launches.",
    priority: 0.7,
    title: "Join the Venture Habitat Founding Community | TEN Habitat",
  },
} as const;

export type SeoPath = keyof typeof seoRoutes;

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function getRouteMetadata(path: SeoPath): Metadata {
  const route = seoRoutes[path];

  return {
    alternates: {
      canonical: path,
    },
    description: route.description,
    openGraph: {
      description: route.description,
      images: [
        {
          alt: socialImage.alt,
          height: socialImage.height,
          url: socialImage.url,
          width: socialImage.width,
        },
      ],
      siteName,
      title: route.title,
      type: "website",
      url: path,
    },
    title: {
      absolute: route.title,
    },
    twitter: {
      card: "summary_large_image",
      description: route.description,
      images: [socialImage.url],
      title: route.title,
    },
  };
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": `${siteUrl}/#organization`,
      "@type": "Organization",
      description: defaultSeoDescription,
      logo: absoluteUrl("/images/ten-habitat-logo.png"),
      name: siteName,
      url: siteUrl,
    },
    {
      "@id": `${siteUrl}/#website`,
      "@type": "WebSite",
      description: defaultSeoDescription,
      inLanguage: "en",
      name: siteName,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      url: siteUrl,
    },
  ],
} as const;

export function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
