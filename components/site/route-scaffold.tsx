import Link from "next/link";

type RouteScaffoldProps = {
  title: string;
};

export function RouteScaffold({ title }: RouteScaffoldProps) {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col gap-6 px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Route scaffold
      </p>
      <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">{title}</h1>
      <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
        This route is wired into the application shell and is ready for the approved TEN Habitat
        content and page design.
      </p>
      <Link
        className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        href="/"
      >
        Back to scaffold
      </Link>
    </main>
  );
}
