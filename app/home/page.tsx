import Image from "next/image";

import { CtaLink } from "@/components/site/cta-link";
import { ImageFrame } from "@/components/site/image-frame";
import { getRouteMetadata } from "@/lib/seo";
import { homeStats, pathCards, siteAssets } from "@/lib/site";

export const metadata = getRouteMetadata("/home");

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-cocoa">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(640px_420px_at_88%_12%,rgba(232,176,0,0.13),transparent_70%)]"
        />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[clamp(32px,5vw,72px)] px-[clamp(20px,4.5vw,56px)] py-[clamp(56px,8vw,96px)] lg:grid-cols-[minmax(0,1fr)_minmax(420px,1fr)]">
          <div>
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[2.5px] text-amber">
              Venture Habitat
            </p>
            <h1 className="mb-[18px] text-[clamp(31px,4.4vw,52px)] font-bold uppercase leading-[1.1] tracking-[0.5px] text-orange [text-wrap:pretty]">
              While everyone is hunting the next unicorn
            </h1>
            <p className="mb-3.5 text-[clamp(19px,2.2vw,24px)] leading-[1.45] text-white [text-wrap:pretty]">
              We’ve decided to build the conditions that turn thousands of ordinary businesses
              into{" "}
              <strong className="font-bold text-gold">the backbone of tomorrow’s economy.</strong>
            </p>
            <p className="mb-8 max-w-[52ch] text-[17px] italic leading-[1.55] text-white/70">
              Because when ordinary businesses are given the opportunity to become extraordinary,
              economies transform — and returns compound.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <CtaLink href="/join">Join the Founding Community</CtaLink>
              <CtaLink href="#vh-paths" variant="ghost">
                Choose your path ↓
              </CtaLink>
            </div>
          </div>

          <ImageFrame
            alt="A young Caribbean baker in his apron, arms crossed"
            className="h-[clamp(360px,45vw,540px)] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            objectPosition="center 18%"
            priority
            src={siteAssets.ventureFeature}
          />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1000px] px-[clamp(20px,4.5vw,56px)] py-[clamp(64px,9vw,110px)] text-center">
          <h2 className="text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.3] text-slate-body [text-wrap:pretty]">
            For nearly two decades, <span className="font-bold text-amber">TEN Habitat</span> has
            helped Caribbean founders start and grow.
          </h2>
          <dl className="mt-[clamp(36px,5vw,56px)] flex flex-wrap justify-center gap-x-[clamp(30px,6vw,76px)] gap-y-8">
            {homeStats.map((stat) => (
              <div className="flex min-w-[170px] flex-col items-center gap-1.5" key={stat.label}>
                <dt className="text-[clamp(38px,4.5vw,54px)] font-bold leading-none text-amber">
                  {stat.value}
                </dt>
                <dd className="text-base tracking-[0.4px] text-slate-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Image
          alt="The TEN Habitat community gathered together"
          className="object-cover"
          fill
          sizes="100vw"
          src={siteAssets.communityGroup}
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(26,16,8,0.86),rgba(26,16,8,0.72))]" />
        <div className="relative mx-auto max-w-[900px] px-[clamp(20px,4.5vw,56px)] py-[clamp(72px,10vw,130px)] text-center">
          <p className="mb-3.5 text-[clamp(19px,2.2vw,24px)] text-white/85">
            Now comes the layer we were always missing.
          </p>
          <h2 className="mb-3.5 text-[clamp(30px,4.2vw,48px)] font-bold leading-[1.15]">
            <span className="text-gold">Venture Habitat:</span>{" "}
            <span className="text-white">the conversion layer</span>
          </h2>
          <p className="text-[clamp(20px,2.4vw,26px)] leading-[1.4] text-white/90">
            between entrepreneurial activity and investable businesses.
          </p>
        </div>
      </section>

      <section className="bg-white" id="vh-paths">
        <div className="mx-auto max-w-[1200px] px-[clamp(20px,4.5vw,56px)] py-[clamp(64px,9vw,110px)]">
          <div className="mb-[clamp(36px,5vw,56px)] text-center">
            <p className="mb-3 text-[13px] font-bold uppercase tracking-[2.5px] text-amber">
              Choose where you belong
            </p>
            <h2 className="text-[clamp(28px,3.8vw,44px)] font-bold leading-[1.15] text-ink">
              Build the future with us
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-[clamp(20px,3vw,32px)] md:grid-cols-2 lg:grid-cols-3">
            {pathCards.map((card) => (
              <article
                className="flex overflow-hidden rounded-2xl border border-[#E8E2D4] bg-white shadow-[0_10px_28px_rgba(17,24,28,0.08)]"
                key={card.href}
              >
                <div className="flex w-full flex-col">
                  <ImageFrame
                    alt={card.alt}
                    className="h-52 rounded-none shadow-none"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    src={card.image}
                  />
                  <div className="flex flex-1 flex-col gap-3 px-6 py-6">
                    <h3 className="text-[23px] font-bold uppercase tracking-[0.6px] text-ink">
                      {card.title}
                    </h3>
                    <p className="flex-1 text-[17px] leading-normal text-slate-body">{card.body}</p>
                    <CtaLink className="self-start" href={card.href} variant="pill">
                      {card.cta}
                    </CtaLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper">
        <Image alt="" className="object-cover" fill sizes="100vw" src={siteAssets.visionSky} />
        <div className="relative mx-auto max-w-[960px] px-[clamp(20px,4.5vw,56px)] pt-[clamp(64px,9vw,110px)] text-center">
          <h3 className="mb-4 text-[clamp(21px,2.6vw,29px)] font-semibold leading-[1.3] text-slate">
            The future won’t be built by one extraordinary company.
          </h3>
          <h2 className="text-[clamp(29px,4vw,46px)] font-bold leading-[1.18] text-orange [text-wrap:pretty]">
            It will be built by thousands of businesses given the opportunity to{" "}
            <span className="uppercase">become extraordinary.</span>
          </h2>
          <Image
            alt="Many hands raised together"
            className="mx-auto mt-[clamp(28px,4vw,44px)] h-auto w-[min(620px,92%)]"
            height={1402}
            sizes="(min-width: 768px) 620px, 92vw"
            src={siteAssets.handsRaised}
            width={2400}
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-cocoa">
        <Image
          alt=""
          className="object-cover opacity-[0.14]"
          fill
          sizes="100vw"
          src={siteAssets.collageWarmBg}
        />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[clamp(32px,5vw,72px)] px-[clamp(20px,4.5vw,56px)] py-[clamp(64px,9vw,110px)] lg:grid-cols-2">
          <div>
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[2.5px] text-gold">
              Launching soon
            </p>
            <h2 className="mb-[18px] text-[clamp(28px,3.8vw,44px)] font-bold leading-[1.15] text-white">
              Venture Habitat launches soon.
            </h2>
            <p className="mb-7 max-w-[54ch] text-[clamp(17px,2vw,20px)] leading-[1.55] text-white/80">
              Be among the first to benefit from the interventions, partnership and funding
              opportunities shaping our new way to build entrepreneurial economies.
            </p>
            <CtaLink href="/join">Join the Founding Community</CtaLink>
          </div>

          <ImageFrame
            alt="A collage of TEN Habitat founders and community moments"
            className="h-[clamp(320px,40vw,480px)] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            src={siteAssets.launchCollage}
          />
        </div>
      </section>
    </main>
  );
}
