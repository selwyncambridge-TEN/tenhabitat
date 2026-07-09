import Image from "next/image";

import { CtaLink } from "@/components/site/cta-link";
import { ImageFrame } from "@/components/site/image-frame";
import { siteAssets } from "@/lib/site";

const triptych = [
  {
    src: siteAssets.builderThree,
    alt: "A founder working late on his laptop",
    text: "You didn’t",
  },
  {
    src: siteAssets.builderTwo,
    alt: "A business owner serving customers",
    text: "start a business",
  },
  {
    src: siteAssets.builderOne,
    alt: "A founder standing in a small business space",
    text: "to stay small",
  },
] as const;

export default function BuildersPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-[clamp(20px,4.5vw,56px)] py-[clamp(56px,8vw,88px)]">
          <div className="mb-[clamp(32px,4.5vw,48px)] text-center">
            <p className="mb-3 text-[13px] font-bold uppercase tracking-[2.5px] text-amber">
              Are you a Builder?
            </p>
            <p className="text-[clamp(17px,2vw,20px)] text-slate">
              For founders, entrepreneurs and entrepreneur support organisations
            </p>
          </div>

          <div className="grid grid-cols-1 gap-[clamp(14px,2vw,26px)] sm:grid-cols-3">
            {triptych.map((photo) => (
              <div
                className="relative h-[clamp(240px,30vw,340px)] overflow-hidden rounded-2xl"
                key={photo.text}
              >
                <Image
                  alt={photo.alt}
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 640px) 33vw, 100vw"
                  src={photo.src}
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(26,16,8,0.55),rgba(26,16,8,0.12))]" />
                <span className="absolute inset-0 flex items-center justify-center p-4 text-center text-[clamp(26px,3.2vw,38px)] font-bold text-white shadow-black [text-shadow:0_4px_18px_rgba(0,0,0,0.5)]">
                  {photo.text}
                </span>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-[clamp(30px,4.5vw,44px)] max-w-[760px] text-center text-[clamp(18px,2.1vw,22px)] leading-[1.55] text-slate-body [text-wrap:pretty]">
            Neither did we build <strong className="font-bold">Venture Habitat</strong> to leave you
            where most systems do — full of potential, short on the structure, capital and momentum
            to scale.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy">
        <Image
          alt=""
          className="object-cover opacity-55"
          fill
          sizes="100vw"
          src={siteAssets.networkNavyBg}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,42,0.88),rgba(11,31,42,0.45))]" />
        <div className="relative mx-auto max-w-[1200px] px-[clamp(20px,4.5vw,56px)] py-[clamp(72px,10vw,120px)]">
          <p className="mb-6 max-w-[22ch] text-[clamp(24px,3vw,34px)] font-semibold leading-[1.35] text-white [text-wrap:pretty]">
            The Caribbean has never lacked talent, ambition or ideas. What it has lacked is a{" "}
            <span className="text-gold">Conversion Layer</span> that turns all of that activity into
            businesses capable of attracting real investment and real growth.
          </p>
          <p className="text-[clamp(21px,2.6vw,29px)] font-bold uppercase tracking-[0.5px] text-gold">
            That layer is what we’re building.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[clamp(32px,5vw,72px)] px-[clamp(20px,4.5vw,56px)] py-[clamp(64px,9vw,110px)] lg:grid-cols-2">
          <div>
            <p className="mb-[22px] text-[clamp(18px,2.1vw,22px)] leading-[1.55] text-slate-body [text-wrap:pretty]">
              <strong className="font-bold">Venture Habitat</strong> is designed to move you from a
              promising Micro, Small or Medium business to an investable one — through structured
              progression, a community of builders around you, and a direct line to the capital and
              opportunities that usually stay out of reach.
            </p>
            <p className="mb-3 text-[clamp(19px,2.2vw,24px)] font-bold leading-[1.4] text-ink">
              Not another workshop. Not another certificate.
            </p>
            <p className="text-[clamp(18px,2.1vw,22px)] leading-normal text-slate-body">
              A system built to get you <strong className="font-bold">funded, growing and connected.</strong>
            </p>
          </div>
          <ImageFrame
            alt="A TEN Habitat builder working through business growth plans"
            className="h-[clamp(320px,42vw,520px)] shadow-[0_18px_44px_rgba(17,24,28,0.14)]"
            objectPosition="center 25%"
            src={siteAssets.builderValue}
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-cocoa">
        <Image
          alt=""
          className="object-cover opacity-40"
          fill
          sizes="100vw"
          src={siteAssets.builderCtaBg}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,16,8,0.92)_20%,rgba(26,16,8,0.55))]" />
        <div className="relative mx-auto max-w-[1200px] px-[clamp(20px,4.5vw,56px)] py-[clamp(72px,10vw,120px)]">
          <h1 className="mb-4 max-w-[720px] text-[clamp(28px,3.8vw,44px)] font-bold leading-[1.2] text-white [text-wrap:pretty]">
            We’re opening this to a founding community first — for the builders who want to shape
            it, not just use it.
          </h1>
          <p className="mb-7 text-[clamp(17px,2vw,20px)] text-white/75">
            Be first in line when the doors open.
          </p>
          <CtaLink href="/join?role=builder">Join as a Founding Builder</CtaLink>
        </div>
      </section>
    </main>
  );
}
