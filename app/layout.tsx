import type { Metadata } from "next";
import { Jost } from "next/font/google";

import { SiteChrome } from "@/components/site/site-chrome";
import {
  getRouteMetadata,
  organizationStructuredData,
  serializeStructuredData,
  siteUrl,
} from "@/lib/seo";

import "./globals.css";

const jost = Jost({
  display: "swap",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-jost",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  ...getRouteMetadata("/"),
  applicationName: "TEN Habitat",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  metadataBase: new URL(siteUrl),
  title: {
    default: "TEN Habitat | Venture Habitat Launch",
    template: "%s | TEN Habitat",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body className={`${jost.variable} min-h-screen bg-background text-foreground antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(organizationStructuredData),
          }}
          type="application/ld+json"
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
