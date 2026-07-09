"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isSplash = pathname === "/";

  if (isSplash) {
    return children;
  }

  return (
    <>
      <SiteHeader />
      <div className="h-16" aria-hidden="true" />
      {children}
      <SiteFooter />
    </>
  );
}
