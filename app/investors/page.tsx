import { CtaLink } from "@/components/site/cta-link";
import { ImageFrame } from "@/components/site/image-frame";
import { getRouteMetadata } from "@/lib/seo";
import { siteAssets } from "@/lib/site";

export const metadata = getRouteMetadata("/investors");

export default function InvestorsPage() {
  return (
    <main>
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[clamp(32px,5vw,64px)] px-[clamp(20px,4.5vw,56px)] py-[clamp(56px,8vw,90px)] lg:grid-cols-2">
          <div>
            <p className="mb-3 text-[13px] font-bold uppercase tracking-[2.5px] text-amber">
              Are you investing?
            </p>
            <p className="mb-[22px] text-[clamp(17px,2vw,20px)] text-slate">
              For the diaspora, investors and capital partners
            </p>
            <h1 className="mb-2.5 text-[clamp(30px,4vw,46px)] font-bold leading-[1.12] text-ink">
              You’ve always sent something home.
            </h1>
            <h2 className="mb-6 text-[clamp(22px,2.8vw,31px)] font-semibold leading-[1.25] text-slate [text-wrap:pretty]">
              What if it could become something you own a share of?
            </h2>
            <p className="mb-4 text-[clamp(17px,2vw,20px)] leading-[1.55] text-slate-body [text-wrap:pretty]">
              The Caribbean diaspora sends billions home every year. Governments invest.
              Institutions lend. Yet almost none of it is connected into a system that builds
              lasting economic ownership.
            </p>
            <p className="text-[clamp(17px,2vw,20px)] font-semibold leading-[1.55] text-ink [text-wrap:pretty]">
              We think that’s the biggest missed opportunity in the region — and we’re building the
              system to change it.
            </p>
          </div>
          <ImageFrame
            alt="Two business partners in their restaurant kitchen"
            className="h-[clamp(320px,42vw,520px)] shadow-[0_18px_44px_rgba(17,24,28,0.16)]"
            priority
            src={siteAssets.investorKitchen}
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[clamp(32px,5vw,72px)] px-[clamp(20px,4.5vw,56px)] py-[clamp(64px,9vw,110px)] lg:grid-cols-2">
          <ImageFrame
            alt="The TEN Habitat community of founders gathered together"
            className="h-[clamp(300px,38vw,480px)] shadow-[0_18px_44px_rgba(17,24,28,0.14)]"
            objectPosition="center 30%"
            src={siteAssets.communityGroup}
          />
          <div>
            <p className="mb-[22px] text-[clamp(18px,2.1vw,22px)] leading-[1.55] text-slate-body [text-wrap:pretty]">
              <strong className="font-bold">Venture Habitat</strong> is designed to turn everyday
              economic participation into a genuine stake in the region’s future — connecting the
              people who care about these economies with the businesses building them, and the
              returns that follow when ordinary businesses become extraordinary.
            </p>
            <p className="text-[clamp(19px,2.3vw,24px)] font-bold leading-[1.4] text-ink">
              Support today. Ownership tomorrow. <span className="text-amber">Both, at once.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cocoa">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[clamp(32px,5vw,72px)] px-[clamp(20px,4.5vw,56px)] py-[clamp(64px,9vw,110px)] lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-[clamp(27px,3.6vw,42px)] font-bold leading-[1.22] text-white [text-wrap:pretty]">
              We’re gathering a founding community of investors and{" "}
              <span className="text-gold">diaspora partners</span> who want in early as the model
              takes shape.
            </h2>
            <p className="mb-7 text-[clamp(17px,2vw,20px)] text-white/75">
              Be first to see how participation becomes ownership.
            </p>
            <CtaLink href="/join?role=investor">Join as an Investor</CtaLink>
          </div>
          <ImageFrame
            alt="A diaspora investor handing over a package and reviewing plans on a laptop"
            className="h-[clamp(280px,36vw,440px)] shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
            src={siteAssets.investorCta}
          />
        </div>
      </section>
    </main>
  );
}
