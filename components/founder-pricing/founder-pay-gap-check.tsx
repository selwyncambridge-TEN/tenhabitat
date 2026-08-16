"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------------ *
 * Config
 * ------------------------------------------------------------------ */

const OFFER_URL = "https://buy.stripe.com/fZubJ2cf28I55vV89v2sM01"; // $99 Founding Member checkout

// Anonymized capture via a free Google Form. Email is optional; sending it blank
// shares only the anonymized gap %. Raw costs/prices are never transmitted.
const GOOGLE_FORM = {
  FORM_ID: "1FAIpQLSeSGVhtIp3Qt0Lnlb-VxEDzEQhkuVUjf9iguYbcax2Qz35nIA",
  email: "entry.932553458",
  gapPercent: "entry.1466201997",
  underpriced: "entry.1593905647",
  currency: "entry.1672852952",
};

const CURRENCIES: Array<[string, string]> = [
  ["USD", "US Dollar"],
  ["EUR", "Euro"],
  ["GBP", "British Pound"],
  ["CAD", "Canadian Dollar"],
  ["AUD", "Australian Dollar"],
  ["BBD", "Barbados Dollar"],
  ["XCD", "East Caribbean Dollar"],
  ["TTD", "Trinidad & Tobago Dollar"],
  ["JMD", "Jamaican Dollar"],
  ["GHS", "Ghanaian Cedi"],
  ["NGN", "Nigerian Naira"],
  ["KES", "Kenyan Shilling"],
  ["ZAR", "South African Rand"],
  ["INR", "Indian Rupee"],
];

/* ------------------------------------------------------------------ *
 * Types + helpers
 * ------------------------------------------------------------------ */

type Inputs = {
  days: string;
  hpd: string;
  off: string;
  bill: number;
  currency: string;
  need: string;
  thing: string;
  oh: string;
  om: string;
  dc: string;
  price: string;
};

type Result = {
  incomeHours: number;
  ownerTargetHr: number;
  offeringHours: number;
  neededPrice: number;
  price: number;
  gapAmt: number;
  gapPct: number | null;
  nowHr: number;
  maxUnits: number;
  monthlyPayNow: number;
  monthlyShortfall: number;
  covered: boolean;
  thing: string;
};

const DEFAULTS: Inputs = {
  days: "5",
  hpd: "8",
  off: "4",
  bill: 60,
  currency: "USD",
  need: "",
  thing: "",
  oh: "",
  om: "",
  dc: "0",
  price: "",
};

const numOf = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : NaN;
};

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

export function FounderPayGapCheck() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [err, setErr] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [barsIn, setBarsIn] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [sent, setSent] = useState(false);

  const set = (k: keyof Inputs, v: string | number) =>
    setInputs((prev) => ({ ...prev, [k]: v }));

  const money = useMemo(() => {
    return (n: number) => {
      const value = Number.isFinite(n) ? n : 0;
      try {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: inputs.currency,
          maximumFractionDigits: value % 1 === 0 ? 0 : 2,
        }).format(value);
      } catch {
        return `${inputs.currency} ${Math.round(value).toLocaleString()}`;
      }
    };
  }, [inputs.currency]);

  function validate(i: number): string {
    if (i === 0) {
      const d = numOf(inputs.days);
      const h = numOf(inputs.hpd);
      const o = numOf(inputs.off);
      if (!(d >= 1 && d <= 7)) return "Enter days per week between 1 and 7.";
      if (!(h > 0)) return "Enter your hours per day.";
      if (!(o >= 0 && o < 52)) return "Weeks off should be between 0 and 51.";
    }
    if (i === 1) {
      if (!(numOf(inputs.need) > 0)) return "Enter what you need to earn each month.";
    }
    if (i === 2) {
      const oh = numOf(inputs.oh) || 0;
      const om = numOf(inputs.om) || 0;
      if (!(oh + om / 60 > 0)) return "Enter how long one takes (hours and/or minutes).";
      if (!(numOf(inputs.price) >= 0)) return "Enter what you charge now (0 is allowed).";
    }
    return "";
  }

  function next(i: number) {
    const e = validate(i);
    if (e) {
      setErr(e);
      return;
    }
    setErr("");
    setStep(i + 1);
  }

  function back(i: number) {
    setErr("");
    setStep(i - 1);
  }

  function compute(): Result {
    const days = numOf(inputs.days);
    const hpd = numOf(inputs.hpd);
    const off = numOf(inputs.off);
    const billShare = inputs.bill / 100;
    const weeks = 52 - off;
    const monthlyWorkHours = (days * hpd * weeks) / 12;
    const incomeHours = monthlyWorkHours * billShare;

    const need = numOf(inputs.need);
    const ownerTargetHr = need / incomeHours;

    const offeringHours = (numOf(inputs.oh) || 0) + (numOf(inputs.om) || 0) / 60;
    const directCost = numOf(inputs.dc) || 0;
    const price = numOf(inputs.price) || 0;

    const neededPrice = directCost + ownerTargetHr * offeringHours;
    const gapAmt = neededPrice - price;
    const gapPct = price > 0 ? (gapAmt / price) * 100 : null;
    const nowHr = offeringHours > 0 ? (price - directCost) / offeringHours : 0;
    const maxUnits = offeringHours > 0 ? incomeHours / offeringHours : 0;
    const monthlyPayNow = (price - directCost) * maxUnits;
    const monthlyShortfall = need - monthlyPayNow;

    return {
      incomeHours,
      ownerTargetHr,
      offeringHours,
      neededPrice,
      price,
      gapAmt,
      gapPct,
      nowHr,
      maxUnits,
      monthlyPayNow,
      monthlyShortfall,
      covered: gapAmt <= 0.5,
      thing: inputs.thing.trim(),
    };
  }

  function onCalc() {
    const e = validate(2);
    if (e) {
      setErr(e);
      return;
    }
    setErr("");
    setSent(false);
    setEmail("");
    setEmailErr("");
    setBarsIn(false);
    setResult(compute());
  }

  // animate bars in once a result renders
  useEffect(() => {
    if (!result) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setBarsIn(true)));
    return () => cancelAnimationFrame(id);
  }, [result]);

  function reset() {
    setResult(null);
    setStep(0);
    setErr("");
  }

  function onSubmitEmail(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (value && value.indexOf("@") < 1) {
      setEmailErr("That email doesn’t look right — or send it blank.");
      return;
    }
    setEmailErr("");
    const r = result;
    if (GOOGLE_FORM.FORM_ID && r) {
      const body = new FormData();
      body.append(GOOGLE_FORM.email, value);
      body.append(GOOGLE_FORM.gapPercent, r.gapPct != null ? String(Math.round(r.gapPct)) : "");
      body.append(GOOGLE_FORM.underpriced, r.gapAmt > 0.5 ? "Yes" : "No");
      body.append(GOOGLE_FORM.currency, inputs.currency);
      fetch(`https://docs.google.com/forms/d/e/${GOOGLE_FORM.FORM_ID}/formResponse`, {
        method: "POST",
        mode: "no-cors",
        body,
      }).catch(() => {});
    }
    setSent(true);
  }

  /* ------- shared class helpers ------- */
  const inputCls =
    "w-full rounded-md border-[1.5px] border-[#e8e2d4] bg-white px-3 py-3 text-[16px] text-ink outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/25";
  const labelCls = "mb-1.5 block text-[14px] font-semibold text-ink";
  const hintCls = "mt-1 text-[12.5px] text-slate-muted";
  const primaryBtn =
    "inline-flex flex-1 items-center justify-center rounded-md bg-gold px-5 py-3 text-[15.5px] font-semibold text-ink transition hover:brightness-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60";
  const ghostBtn =
    "inline-flex items-center justify-center rounded-md border-[1.5px] border-[#e8e2d4] px-5 py-3 text-[15.5px] font-semibold text-slate-muted transition hover:border-slate hover:text-ink";

  /* ------------------------------------------------------------------ *
   * Result view
   * ------------------------------------------------------------------ */
  if (result) {
    const r = result;
    const per = r.thing ? ` / ${r.thing}` : "";
    const scale = Math.max(r.neededPrice, r.price, 1);
    const chargeW = Math.max(0, Math.min(100, (r.price / scale) * 100));
    const needW = Math.max(0, Math.min(100, (r.neededPrice / scale) * 100));
    const gapWithinNeed = r.covered || needW <= 0 ? 0 : ((needW - chargeW) / needW) * 100;

    return (
      <div className="rounded-lg border border-[#23384a] bg-navy p-[clamp(22px,4vw,30px)] text-white shadow-[0_24px_60px_-28px_rgba(11,31,42,0.7)]">
        <p className="mb-1 text-[11.5px] font-bold uppercase tracking-[0.15em] text-gold">
          {r.covered ? "Your result" : "Your pay gap"}
        </p>

        {r.covered ? (
          <>
            <h3 className="text-[clamp(27px,8vw,40px)] font-bold leading-[1.05] tracking-tight">
              This one <span className="text-gold">pays you.</span>
            </h3>
            <p className="mb-5 mt-1 text-[14.5px] text-white/70">
              You’re covering your own pay on this — most founders aren’t. But your full price still
              needs overhead, VAT, fees and profit on top.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-[clamp(27px,8vw,40px)] font-bold leading-[1.05] tracking-tight">
              You’re{" "}
              <span className="text-amber">
                {r.gapPct != null ? `${Math.round(r.gapPct)}% under.` : "underpriced."}
              </span>
            </h3>
            <p className="mb-5 mt-1 text-[14.5px] text-white/70">
              To pay yourself properly for the time this takes, you’d need {money(r.neededPrice)}
              {r.thing ? ` per ${r.thing}` : " per sale"} — that’s {money(r.gapAmt)} more than you
              charge today.
            </p>
          </>
        )}

        {/* signature: the gap bars */}
        <div className="my-4">
          <div className="mb-3.5">
            <div className="mb-1.5 flex items-baseline justify-between text-[13px] text-white/60">
              <span>You charge now{per}</span>
              <b className="text-[16px] font-semibold text-white">{money(r.price)}</b>
            </div>
            <div className="h-4 overflow-hidden rounded-lg bg-white/10">
              <div
                className="h-full rounded-lg bg-slate transition-[width] duration-[900ms] ease-out"
                style={{ width: barsIn ? `${chargeW}%` : "0%" }}
              />
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex items-baseline justify-between text-[13px] text-white/60">
              <span>You need to charge</span>
              <b className="text-[16px] font-semibold text-white">{money(r.neededPrice)}</b>
            </div>
            <div className="h-4 overflow-hidden rounded-lg bg-white/10">
              <div
                className="flex h-full rounded-lg bg-gold transition-[width] duration-[900ms] ease-out"
                style={{ width: barsIn ? `${needW}%` : "0%" }}
              >
                <div
                  className="ml-auto h-full rounded-r-lg bg-amber transition-[width] duration-[900ms] ease-out"
                  style={{ width: barsIn ? `${gapWithinNeed}%` : "0%" }}
                />
              </div>
            </div>
            {!r.covered && (
              <p className="mt-1 text-right text-[11.5px] tracking-[0.04em] text-amber">
                {money(r.gapAmt)} left on the table, every sale
              </p>
            )}
          </div>
        </div>

        {/* effective hourly */}
        <div className="my-5 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-[#23384a] sm:grid-cols-2">
          <div className="bg-navy p-4">
            <p className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-white/50">
              You pay yourself now
            </p>
            <p className="text-[20px] font-semibold leading-tight text-amber">
              {money(Math.max(0, r.nowHr))}
            </p>
            <p className="mt-0.5 text-[12px] text-white/55">per hour, effectively</p>
          </div>
          <div className="bg-navy p-4">
            <p className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-white/50">
              You need to earn
            </p>
            <p className="text-[20px] font-semibold leading-tight text-gold">
              {money(r.ownerTargetHr)}
            </p>
            <p className="mt-0.5 text-[12px] text-white/55">per hour, to cover life</p>
          </div>
        </div>

        {/* insight */}
        <div className="my-4 rounded-xl border border-[#26404f] bg-[#0e2a38] px-4 py-3.5 text-[14.5px] text-white/85">
          {r.covered ? (
            <>
              Even fully booked, that’s about <b className="text-white">{Math.floor(r.maxUnits)}</b>{" "}
              of these a month. Nice position — now check it against overhead, tax, fees and profit
              in the full tool.
            </>
          ) : (
            <>
              At today’s price, even <b className="text-white">fully booked</b> (about{" "}
              {Math.floor(r.maxUnits)} a month) you’d pay yourself{" "}
              <b className="text-white">{money(Math.max(0, r.monthlyPayNow))}</b> toward your{" "}
              {money(numOf(inputs.need))} target
              {r.monthlyShortfall > 0 ? (
                <>
                  {" "}
                  — a <span className="font-semibold text-gold">
                    {money(r.monthlyShortfall)}/month gap.
                  </span>
                </>
              ) : (
                <> — clearing it on volume alone, which few founders can sustain.</>
              )}
            </>
          )}
        </div>

        {/* CTA -> full product + founding offer */}
        {!sent ? (
          <div className="mt-5 rounded-xl border border-[#26404f] bg-[#0e2a38] p-4">
            <h4 className="text-[17px] font-semibold text-white">
              {r.covered ? "See where you really stand." : "This is only the floor that pays you."}
            </h4>
            <p className="mt-1 text-[13.5px] text-white/70">
              This one number is just the start. The full tool turns pricing into something you run
              every month — so you stay paid <b className="text-white">and</b> profitable:
            </p>
            <ul className="my-3 grid gap-2 text-left text-[13.5px] text-white/80">
              {[
                <>
                  Cost and price <b className="text-white">every</b> product and service you sell —
                  the right price, every time
                </>,
                <>See how each job pays your living costs, overhead, tax, fees and profit</>,
                <>Review your pricing performance month to month as costs and hours change</>,
                <>Know exactly what to set aside and what you can safely pay yourself, per sale</>,
              ].map((line, i) => (
                <li className="relative pl-6" key={i}>
                  <span className="absolute left-0 font-bold text-gold">✓</span>
                  {line}
                </li>
              ))}
            </ul>
            <p className="mb-3.5 text-[13.5px] text-white/70">
              We’re building it now with our first 100 founders — at a founding price we’ll never
              offer again.
            </p>
            <a
              className="mb-2 flex w-full items-center justify-center rounded-md bg-amber px-5 py-3 text-[15.5px] font-semibold text-cocoa transition hover:brightness-[1.06]"
              href={OFFER_URL}
              rel="noopener"
              target="_blank"
            >
              Become a Founding Member →
            </a>

            <form className="mt-1.5 flex gap-2" onSubmit={onSubmitEmail}>
              <input
                autoComplete="email"
                className="flex-1 rounded-md border-[1.5px] border-[#2c4655] bg-[#0a1c27] px-3 py-2.5 text-[14px] text-white outline-none placeholder:text-white/40 focus:border-gold"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email (optional)"
                type="email"
                value={email}
              />
              <button
                className="rounded-md bg-white px-4 text-[14px] font-semibold text-navy"
                type="submit"
              >
                Notify me
              </button>
            </form>
            <p className="mt-3 text-center text-[11.5px] text-white/45">
              {emailErr ||
                "Email is optional — send it blank to share just your anonymized gap %. Your actual costs and prices never leave your device."}
            </p>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-[#26404f] bg-[#0e2a38] p-5 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-[22px] font-bold text-ink">
              ✓
            </div>
            <h4 className="text-[19px] font-semibold text-white">You’re in.</h4>
            <p className="mx-auto mb-4 mt-1 max-w-[34em] text-[13.5px] text-white/70">
              Thanks for adding your result. You’ve helped map how badly founders underprice — and
              you’ll hear from us first when the full tool opens.
            </p>
            <a
              className="flex w-full items-center justify-center rounded-md bg-amber px-5 py-3 text-[15.5px] font-semibold text-cocoa transition hover:brightness-[1.06]"
              href={OFFER_URL}
              rel="noopener"
              target="_blank"
            >
              Become a Founding Member →
            </a>
          </div>
        )}

        <button
          className="mt-4 w-full text-center text-[13.5px] text-white/60 underline"
          onClick={reset}
          type="button"
        >
          ← Start over
        </button>
      </div>
    );
  }

  /* ------------------------------------------------------------------ *
   * Form view
   * ------------------------------------------------------------------ */
  return (
    <div className="rounded-lg border border-[#e8e2d4] bg-white p-[clamp(22px,4vw,28px)] shadow-[0_12px_28px_-20px_rgba(17,24,28,0.25)]">
      {/* progress */}
      <div className="mb-6 flex gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#e8e2d4]" key={i}>
            <div
              className="h-full rounded-full bg-amber transition-[width] duration-300"
              style={{ width: i <= step ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <p className="mb-2 text-[11.5px] font-bold uppercase tracking-[0.15em] text-amber">
            Step 1 of 3 · How you work
          </p>
          <h3 className="mb-1.5 text-[clamp(21px,5vw,27px)] font-bold leading-tight text-ink">
            The hours you can actually sell
          </h3>
          <p className="mb-5 text-[14.5px] text-slate-muted">
            Not every working hour is billable. Start with your real pattern — defaults are fine to
            tweak.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="mb-4">
              <label className={labelCls} htmlFor="days">
                Days you work per week
              </label>
              <input
                className={inputCls}
                id="days"
                inputMode="numeric"
                max={7}
                min={1}
                onChange={(e) => set("days", e.target.value)}
                type="number"
                value={inputs.days}
              />
            </div>
            <div className="mb-4">
              <label className={labelCls} htmlFor="hpd">
                Hours per day
              </label>
              <input
                className={inputCls}
                id="hpd"
                inputMode="decimal"
                min={1}
                onChange={(e) => set("hpd", e.target.value)}
                step={0.5}
                type="number"
                value={inputs.hpd}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className={labelCls} htmlFor="off">
              Weeks off per year
            </label>
            <input
              className={inputCls}
              id="off"
              inputMode="numeric"
              min={0}
              onChange={(e) => set("off", e.target.value)}
              type="number"
              value={inputs.off}
            />
            <p className={hintCls}>Holidays, sick time, downtime — time you won’t be earning.</p>
          </div>
          <div className="mb-4">
            <label className={labelCls} htmlFor="bill">
              Share of that time you can actually bill or sell
            </label>
            <div className="flex items-center gap-4">
              <input
                className="h-1.5 flex-1 accent-amber"
                id="bill"
                max={100}
                min={10}
                onChange={(e) => set("bill", Number(e.target.value))}
                step={5}
                type="range"
                value={inputs.bill}
              />
              <span className="min-w-[52px] text-right text-[19px] font-semibold text-ink">
                {inputs.bill}%
              </span>
            </div>
            <p className={hintCls}>
              The rest goes to admin, marketing, quoting, learning. Most solo founders land at
              50–65%.
            </p>
          </div>

          <div className="mt-6 flex gap-2.5">
            <button className={primaryBtn} onClick={() => next(0)} type="button">
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <p className="mb-2 text-[11.5px] font-bold uppercase tracking-[0.15em] text-amber">
            Step 2 of 3 · What life costs
          </p>
          <h3 className="mb-1.5 text-[clamp(21px,5vw,27px)] font-bold leading-tight text-ink">
            What you need to earn to live
          </h3>
          <p className="mb-5 text-[14.5px] text-slate-muted">
            One number is fine. This is what your life costs each month — the thing pricing usually
            forgets.
          </p>

          <div className="mb-4">
            <label className={labelCls} htmlFor="cur">
              Your currency
            </label>
            <select
              className={inputCls}
              id="cur"
              onChange={(e) => set("currency", e.target.value)}
              value={inputs.currency}
            >
              {CURRENCIES.map(([code, name]) => (
                <option key={code} value={code}>
                  {code} — {name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className={labelCls} htmlFor="need">
              Monthly amount you need
            </label>
            <input
              className={inputCls}
              id="need"
              inputMode="decimal"
              min={0}
              onChange={(e) => set("need", e.target.value)}
              placeholder="e.g. 4000"
              step={50}
              type="number"
              value={inputs.need}
            />
            <p className={hintCls}>
              Rent, food, health, transport, debt, and savings you want to set aside. Before tax.
            </p>
          </div>

          <div className="mt-6 flex gap-2.5">
            <button className={ghostBtn} onClick={() => back(1)} type="button">
              Back
            </button>
            <button className={primaryBtn} onClick={() => next(1)} type="button">
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-2 text-[11.5px] font-bold uppercase tracking-[0.15em] text-amber">
            Step 3 of 3 · One thing you sell
          </p>
          <h3 className="mb-1.5 text-[clamp(21px,5vw,27px)] font-bold leading-tight text-ink">
            Pick one product or service
          </h3>
          <p className="mb-5 text-[14.5px] text-slate-muted">
            Just one, to start. We’ll compare what you charge for it against what it needs to earn
            you.
          </p>

          <div className="mb-4">
            <label className={labelCls} htmlFor="thing">
              What is it? <span className="font-normal text-slate-muted">(optional)</span>
            </label>
            <input
              className={inputCls}
              id="thing"
              maxLength={40}
              onChange={(e) => set("thing", e.target.value)}
              placeholder="e.g. a logo project, a haircut, a cake"
              type="text"
              value={inputs.thing}
            />
          </div>
          <div className="mb-4">
            <label className={labelCls}>How long does one take you?</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                className={inputCls}
                inputMode="numeric"
                min={0}
                onChange={(e) => set("oh", e.target.value)}
                placeholder="Hours"
                type="number"
                value={inputs.oh}
              />
              <input
                className={inputCls}
                inputMode="numeric"
                max={59}
                min={0}
                onChange={(e) => set("om", e.target.value)}
                placeholder="Minutes"
                step={5}
                type="number"
                value={inputs.om}
              />
            </div>
            <p className={hintCls}>All of it — prep, delivery, admin, follow-up for this one sale.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-4">
              <label className={labelCls} htmlFor="dc">
                Direct cost of one
              </label>
              <input
                className={inputCls}
                id="dc"
                inputMode="decimal"
                min={0}
                onChange={(e) => set("dc", e.target.value)}
                step={1}
                type="number"
                value={inputs.dc}
              />
              <p className={hintCls}>Materials, subcontractors.</p>
            </div>
            <div className="mb-4">
              <label className={labelCls} htmlFor="price">
                What you charge now
              </label>
              <input
                className={inputCls}
                id="price"
                inputMode="decimal"
                min={0}
                onChange={(e) => set("price", e.target.value)}
                placeholder="0"
                type="number"
                value={inputs.price}
              />
              <p className={hintCls}>Your current price.</p>
            </div>
          </div>

          <div className="mt-6 flex gap-2.5">
            <button className={ghostBtn} onClick={() => back(2)} type="button">
              Back
            </button>
            <button className={primaryBtn} onClick={onCalc} type="button">
              Show my pay gap
            </button>
          </div>
        </div>
      )}

      {err && <p className="mt-3 text-[13px] text-[#b3541e]">{err}</p>}

      <p className="mt-5 text-center text-[12.5px] text-slate-muted">
        <b className="font-semibold text-slate-body">Nothing is saved.</b> Everything runs in your
        browser.
      </p>
    </div>
  );
}
