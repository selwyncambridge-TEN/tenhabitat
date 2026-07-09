import { JoinForm } from "@/components/site/join-form";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/join");

type JoinPageProps = {
  searchParams: Promise<{
    role?: string | string[];
  }>;
};

export default async function JoinPage({ searchParams }: JoinPageProps) {
  const params = await searchParams;
  const initialRole = Array.isArray(params.role) ? params.role[0] : params.role;

  return (
    <main className="bg-paper">
      <section className="mx-auto grid max-w-[1160px] grid-cols-1 items-start gap-[clamp(32px,5vw,72px)] px-[clamp(20px,4.5vw,56px)] py-[clamp(56px,8vw,96px)] lg:grid-cols-2">
        <div>
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[2.5px] text-amber">
            Founding community
          </p>
          <h1 className="mb-[18px] text-[clamp(30px,4.2vw,48px)] font-bold leading-[1.12] text-ink [text-wrap:pretty]">
            Join the Founding Community
          </h1>
          <p className="mb-[18px] text-[clamp(17px,2vw,20px)] leading-[1.55] text-slate-body [text-wrap:pretty]">
            Be among the first to benefit from the interventions, partnership and funding
            opportunities shaping our new way to build entrepreneurial economies.
          </p>
          <p className="text-[clamp(17px,2vw,20px)] leading-[1.55] text-slate">
            Built for builders. Backed for impact.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-[clamp(24px,4vw,40px)] shadow-[0_18px_44px_rgba(17,24,28,0.1)]">
          <JoinForm initialRole={initialRole} key={initialRole ?? "builder"} />
        </div>
      </section>
    </main>
  );
}
