import Image from "next/image";
import Link from "next/link";

import { BrandWordmark } from "@/components/site/brand-wordmark";
import { getRouteMetadata } from "@/lib/seo";
import { siteAssets } from "@/lib/site";

export const metadata = getRouteMetadata("/");

export default function SplashPage() {
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-cocoa">
      <Image
        alt="A seedling sprouting from a seed in rich soil"
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src={siteAssets.heroSeedling}
        style={{ objectPosition: "center 62%" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(92deg,rgba(26,16,8,0.9)_0%,rgba(26,16,8,0.66)_46%,rgba(26,16,8,0.1)_100%)]" />

      <div className="relative flex items-center justify-between gap-4 px-[clamp(20px,4vw,48px)] py-[22px]">
        <BrandWordmark className="text-base" />
        <Link
          className="text-sm font-medium tracking-[1px] text-white/70 transition hover:text-gold"
          href="/home"
        >
          Skip intro →
        </Link>
      </div>

      <section className="relative flex flex-1 items-center">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-[clamp(32px,5vw,72px)] px-[clamp(20px,4.5vw,56px)] pb-20 pt-6">
          <Image
            alt="TEN Habitat — The Entrepreneurial Network"
            className="h-[clamp(140px,24vh,300px)] w-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            height={1625}
            priority
            src={siteAssets.logo}
            width={844}
          />
          <div className="flex max-w-[560px] flex-col items-start gap-6">
            <h1 className="text-[clamp(29px,4.3vw,48px)] font-bold leading-[1.16] text-white [text-wrap:pretty]">
              After nearly two decades of helping Caribbean businesses start and grow…{" "}
              <span className="text-gold">we are nurturing something new.</span>
            </h1>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gold px-[30px] py-4 text-lg font-semibold tracking-[0.2px] text-ink shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition hover:bg-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cocoa"
              href="/home"
            >
              Explore Venture Habitat →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
