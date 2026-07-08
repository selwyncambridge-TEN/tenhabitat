import Link from "next/link";

import { routes } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col gap-10 px-6 py-16">
      <section className="flex flex-col gap-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Scaffold
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-foreground md:text-6xl">
          TEN Habitat website foundation
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Technical scaffold for the approved Next.js, Netlify, and Netlify Database stack.
        </p>
      </section>

      <nav aria-label="Scaffolded routes" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {routes.map((route) => (
          <Link
            className="rounded-lg border border-border bg-card px-4 py-4 text-sm font-medium text-card-foreground transition hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            href={route.href}
            key={route.href}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
