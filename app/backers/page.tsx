import Image from "next/image";

import { CtaLink } from "@/components/site/cta-link";
import { ImageFrame } from "@/components/site/image-frame";
import { getRouteMetadata } from "@/lib/seo";
import { backerPoints, siteAssets } from "@/lib/site";

export const metadata = getRouteMetadata("/backers");

export default function BackersPage() {
  return (
    <main>
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[clamp(32px,5vw,64px)] px-[clamp(20px,4.5vw,56px)] py-[clamp(56px,8vw,90px)] lg:grid-cols-2">
          <div>
            <p className="mb-3 text-[13px] font-bold uppercase tracking-[2.5px] text-amber">
              Are you a Backer?
            </p>
            <p className="mb-6 text-[clamp(17px,2vw,20px)] text-slate">
              For governments, development institutions, credit unions and corporates
            </p>

            <div className="rounded-2xl bg-white p-[clamp(24px,4vw,36px)] shadow-[0_18px_44px_rgba(17,24,28,0.1)]">
              <p className="mb-1 text-lg text-slate-muted">Across the Caribbean, more than</p>
              <p className="mb-1 flex flex-wrap items-baseline gap-2 text-slate">
                <span className="text-[22px] font-semibold">US$</span>
                <span className="text-[clamp(56px,7vw,84px)] font-bold leading-none">350</span>
                <span className="text-[22px] font-semibold">million</span>
              </p>
              <p className="mb-[18px] text-[17px] leading-normal text-slate-muted">
                was invested in entrepreneurship support between 2020 and 2025.
              </p>
              <div className="mb-[18px] h-px bg-[#E5E9EB]" />
              <p className="mb-2 text-[17px] font-semibold leading-normal text-slate-body">
                Yet roughly 70% of MSMEs remain undercapitalised, and fewer than 3% export
                directly.
              </p>
              <p className="text-[clamp(18px,2.1vw,21px)] font-bold text-ink">
                High activity, low conversion.
              </p>
            </div>
          </div>

          <ImageFrame
            alt="Institutional partners working together at a table"
            className="h-[clamp(300px,38vw,460px)] shadow-[0_18px_44px_rgba(17,24,28,0.16)]"
            priority
            src={siteAssets.pathBacking}
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy">
        <Image
          alt=""
          className="object-cover opacity-50"
          fill
          sizes="100vw"
          src={siteAssets.networkNavyBg}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,42,0.82),rgba(11,31,42,0.66))]" />
        <div className="relative mx-auto max-w-[1200px] px-[clamp(20px,4.5vw,56px)] py-[clamp(72px,10vw,120px)]">
          <h1 className="mb-[18px] max-w-[900px] text-[clamp(25px,3.2vw,37px)] font-semibold leading-[1.3] text-white [text-wrap:pretty]">
            We created <span className="text-gold">Venture Habitat</span> as the missing conversion
            layer that turns entrepreneurial activity into decision-grade intelligence — so that
            capital can be deployed with confidence.
          </h1>
          <p className="mb-8 text-[clamp(17px,2vw,20px)] text-white/80">
            It doesn’t replace what has already been built. It makes it work harder:
          </p>
          <div className="grid grid-cols-1 gap-[clamp(16px,2.4vw,24px)] md:grid-cols-3">
            {backerPoints.map((point) => (
              <article
                className="flex flex-col gap-3 rounded-[14px] border border-white/15 bg-white/[0.06] p-6"
                key={point.num}
              >
                <span className="text-[13px] font-bold tracking-[2px] text-gold">{point.num}</span>
                <p className="text-[17px] leading-[1.55] text-white/90">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[clamp(32px,5vw,72px)] px-[clamp(20px,4.5vw,56px)] py-[clamp(64px,9vw,110px)] lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-[clamp(26px,3.4vw,38px)] font-semibold leading-[1.25] text-ink [text-wrap:pretty]">
              We’re convening a founding group of{" "}
              <span className="font-bold text-amber">institutional partners</span> to shape how this
              is built and proven in the region.
            </h2>
            <p className="mb-7 text-[clamp(17px,2vw,20px)] leading-normal text-slate-muted">
              If you are an institutional partner interested in exploring early collaboration —
            </p>
            <CtaLink href="/join?role=backer">Let’s have a chat</CtaLink>
          </div>
          <ImageFrame
            alt="A working session at a TEN Habitat workshop"
            className="h-[clamp(280px,36vw,440px)] shadow-[0_18px_44px_rgba(17,24,28,0.14)]"
            src={siteAssets.backerCollab}
          />
        </div>
      </section>
    </main>
  );
}
