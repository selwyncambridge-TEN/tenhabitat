import type { Metadata } from "next";
import { Jost } from "next/font/google";

import { SiteChrome } from "@/components/site/site-chrome";

import "./globals.css";

const jost = Jost({
  display: "swap",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-jost",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Venture Habitat | TEN Habitat",
    template: "%s | TEN Habitat",
  },
  description:
    "Venture Habitat is TEN Habitat's conversion layer between Caribbean entrepreneurial activity and investable businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body className={`${jost.variable} min-h-screen bg-background text-foreground antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
