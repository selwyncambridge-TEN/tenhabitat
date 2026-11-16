import Image from "next/image";

import { homeStats, siteAssets } from "@/lib/site";

export function TrackRecordSection() {
  return (
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
  );
}

export function ConversionLayerSection() {
  return (
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
  );
}
