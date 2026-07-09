"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandWordmark } from "@/components/site/brand-wordmark";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-cocoa/95 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-5 px-[clamp(16px,3vw,40px)]">
        <BrandWordmark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-[clamp(18px,2.4vw,32px)] min-[920px]:flex"
        >
          {routes.map((route) => (
            <Link
              className={cn(
                "flex h-16 items-center border-b-[3px] pt-[3px] text-[15px] font-medium tracking-[0.3px] text-white/85 transition hover:text-gold",
                pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))
                  ? "border-gold text-gold"
                  : "border-transparent",
              )}
              href={route.href}
              key={route.href}
            >
              {route.label}
            </Link>
          ))}
          <Link
            className="rounded-md bg-gold px-[18px] py-[11px] text-[13px] font-bold tracking-[0.5px] text-cocoa transition hover:bg-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cocoa"
            href="/join"
          >
            Join the Community
          </Link>
        </nav>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="inline-flex size-11 items-center justify-center rounded-md text-white transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cocoa min-[920px]:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
        </button>
      </div>

      {menuOpen ? (
        <nav
          aria-label="Mobile primary"
          className="flex flex-col bg-cocoa/98 px-6 pb-7 pt-3 shadow-[0_20px_34px_rgba(0,0,0,0.4)] min-[920px]:hidden"
        >
          {routes.map((route) => (
            <Link
              className={cn(
                "border-b border-white/10 py-3.5 text-lg font-medium text-white/85",
                pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))
                  ? "text-gold"
                  : "hover:text-gold",
              )}
              href={route.href}
              key={route.href}
              onClick={() => setMenuOpen(false)}
            >
              {route.label}
            </Link>
          ))}
          <Link
            className="mt-5 rounded-lg bg-gold px-5 py-[15px] text-center text-base font-bold tracking-[0.4px] text-cocoa transition hover:bg-amber"
            href="/join"
            onClick={() => setMenuOpen(false)}
          >
            Join the Community
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
