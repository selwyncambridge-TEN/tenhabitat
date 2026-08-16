import { CtaLink } from "@/components/site/cta-link";
import { FounderPayGapCheck } from "@/components/founder-pricing/founder-pay-gap-check";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/founder-pricing");

const faqs = [
  {
    q: "Is the check really free?",
    a: "Yes, and there’s no account. It runs in your browser and saves nothing unless you choose to share your result.",
  },
  {
    q: "Do I need to be good with numbers?",
    a: "No. Start with a single monthly figure for your living costs; you can get precise later.",
  },
  {
    q: "What currency does it use?",
    a: "Your choice — pick your currency before you start.",
  },
  {
    q: "Is this accounting or tax software?",
    a: "No. It’s a pricing and owner-pay planner. It doesn’t file taxes or touch your bank.",
  },
  {
    q: "What’s the full tool?",
    a: "Founder Pricing & Pay costs and prices every product and service you sell, shows how each job funds your living and business costs, and lets you review your pricing month to month. We’re building it now with our first 100 founding members.",
  },
] as const;

export default function FounderPricingPage() {
  return (
    <main>
      {/* Hero — dark, focused, single job: get them into the check */}
      <section className="bg-navy">
        <div className="mx-auto max-w-[1200px] px-[clamp(20px,4.5vw,56px)] py-[clamp(56px,8vw,96px)]">
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[2.5px] text-gold">
            A Venture Habitat tool
          </p>
          <h1 className="mb-4 max-w-[820px] text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] text-white [text-wrap:pretty]">
            You’re probably paying yourself last.{" "}
            <span className="text-gold">Let’s find out by how much.</span>
          </h1>
          <p className="mb-8 max-w-[560px] text-[clamp(17px,2vw,20px)] leading-normal text-white/80">
            Most solo founders price to survive, not to get paid. In about two minutes, see the
            gap between what you charge and what you’d need to charge to actually pay yourself a
            living wage — across the hours you can really work.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <CtaLink href="#check" variant="primary">
              Start the free check ↓
            </CtaLink>
            <span className="text-[13px] text-white/60">
              No sign-up · nothing saved · your numbers stay on your device
            </span>
          </div>
        </div>
      </section>

      {/* The interactive check */}
      <section className="scroll-mt-24 bg-paper" id="check">
        <div className="mx-auto max-w-[640px] px-[clamp(20px,4.5vw,40px)] py-[clamp(48px,7vw,80px)]">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-[clamp(24px,3vw,32px)] font-semibold text-ink">
              The Founder Pay Gap Check
            </h2>
            <p className="mx-auto max-w-[34em] text-[clamp(16px,1.9vw,18px)] text-slate-muted">
              Answer a few quick questions. We’ll show you what you charge, what you’d need to
              charge, and the gap between them.
            </p>
          </div>
          <FounderPayGapCheck />
        </div>
      </section>

      {/* Proof — placeholder until the sheet has real numbers */}
      <section className="bg-white">
        <div className="mx-auto max-w-[900px] px-[clamp(20px,4.5vw,56px)] py-[clamp(56px,8vw,90px)]">
          <h2 className="mb-4 text-[clamp(24px,3vw,34px)] font-semibold leading-[1.25] text-ink [text-wrap:pretty]">
            Built with founders, for founders
          </h2>
          <p className="max-w-[46em] text-[clamp(17px,2vw,20px)] leading-normal text-slate-muted">
            We built this because most founders quietly work for far less than they think — and
            pricing that ignores your own pay is exactly why. Every check makes the picture
            clearer.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[760px] px-[clamp(20px,4.5vw,56px)] py-[clamp(56px,8vw,90px)]">
          <h2 className="mb-6 text-[clamp(24px,3vw,34px)] font-semibold text-ink">Questions</h2>
          <div className="divide-y divide-[#e8e2d4]">
            {faqs.map((item) => (
              <details className="group py-4" key={item.q}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="text-amber transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[16px] leading-normal text-slate-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
