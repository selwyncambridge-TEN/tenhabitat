import Link from "next/link";

import { routes } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6">
        <Link className="text-base font-semibold text-foreground" href="/">
          TEN Habitat
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          {routes.map((route) => (
            <Link className="transition hover:text-foreground" href={route.href} key={route.href}>
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
