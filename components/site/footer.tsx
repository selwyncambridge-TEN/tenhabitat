import Link from "next/link";

import { BrandWordmark } from "@/components/site/brand-wordmark";
import { routes } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-cocoa">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-[clamp(20px,4.5vw,56px)] pb-6 pt-[clamp(40px,6vw,60px)]">
        <div className="flex flex-wrap items-start justify-between gap-7">
          <div className="flex flex-col gap-2.5">
            <BrandWordmark className="text-base" />
            <span className="text-[15px] text-footer-muted">Built for builders. Backed for impact.</span>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-[clamp(18px,3vw,28px)]"
          >
            {routes.map((route) => (
              <Link
                className="text-sm tracking-[0.5px] text-white/80 transition hover:text-gold"
                href={route.href}
                key={route.href}
              >
                {route.label}
              </Link>
            ))}
            <Link
              className="text-sm font-bold tracking-[0.5px] text-gold transition hover:text-amber"
              href="/join"
            >
              Join the Community
            </Link>
          </nav>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-[13px] text-footer-muted">
          <span>© 2026 TEN Habitat. All rights reserved.</span>
          <span>Venture Habitat — launching soon</span>
        </div>
      </div>
    </footer>
  );
}
