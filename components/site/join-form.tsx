"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import type { CommunitySignupInput } from "@/lib/validation/community-signup";
import { cn } from "@/lib/utils";

type FormState = Pick<CommunitySignupInput, "country" | "email" | "name" | "role">;
type Status = "idle" | "submitting" | "submitted";

const roleOptions = [
  { value: "builder", label: "Builder" },
  { value: "backer", label: "Backer" },
  { value: "investor", label: "Investor" },
] as const;

const roleValues = roleOptions.map((role) => role.value);

function normalizeRole(role: string | null): FormState["role"] {
  const nextRole = role?.toLowerCase();
  return roleValues.find((value) => value === nextRole) ?? "builder";
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? "";
}

type JoinFormProps = {
  initialRole?: string;
};

export function JoinForm({ initialRole: initialRoleProp }: JoinFormProps) {
  const initialRole = useMemo(() => normalizeRole(initialRoleProp ?? null), [initialRoleProp]);
  const [form, setForm] = useState<FormState>({
    country: "",
    email: "",
    name: "",
    role: initialRole,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submitted = status === "submitted";
  const submitting = status === "submitting";

  async function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.includes("@")) {
      setError("Please add your name and a valid email address.");
      return;
    }

    setError("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/community-signup", {
        body: JSON.stringify({
          ...form,
          sourcePage: "/join",
        }),
        headers: { "content-type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Signup request failed");
      }

      setStatus("submitted");
    } catch {
      setStatus("idle");
      setError("We couldn’t save your signup. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3.5 px-2 py-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-gold text-3xl font-bold text-cocoa">
          ✓
        </div>
        <h2 className="text-[26px] font-bold text-ink">You’re on the list.</h2>
        <p className="max-w-[38ch] text-[17px] leading-[1.55] text-slate-body">
          Thanks, {firstName(form.name)} — you’ve joined the founding community as a founding{" "}
          {form.role}. We’ll be in touch as Venture Habitat takes shape.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-[18px]" onSubmit={submitSignup}>
      <label className="flex flex-col gap-2 text-sm font-semibold tracking-[0.3px] text-slate-body">
        Full name
        <input
          autoComplete="name"
          className="rounded-lg border-[1.5px] border-[#D9E0E3] bg-white px-3.5 py-[13px] text-base text-ink outline-none transition focus:border-amber"
          name="name"
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          placeholder="Your name"
          value={form.name}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-semibold tracking-[0.3px] text-slate-body">
        Email
        <input
          autoComplete="email"
          className="rounded-lg border-[1.5px] border-[#D9E0E3] bg-white px-3.5 py-[13px] text-base text-ink outline-none transition focus:border-amber"
          name="email"
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          placeholder="you@example.com"
          type="email"
          value={form.email}
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold tracking-[0.3px] text-slate-body">
          I’m joining as
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {roleOptions.map((role) => {
            const selected = form.role === role.value;

            return (
              <button
                aria-pressed={selected}
                className={cn(
                  "min-h-11 flex-1 rounded-lg border-[1.5px] px-2.5 py-3 text-[15px] text-ink transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber",
                  selected
                    ? "border-gold bg-gold font-bold"
                    : "border-[#D9E0E3] bg-white font-normal hover:border-amber",
                )}
                key={role.value}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    role: role.value,
                  }))
                }
                type="button"
              >
                {role.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2 text-sm font-semibold tracking-[0.3px] text-slate-body">
        Country or territory
        <input
          autoComplete="country-name"
          className="rounded-lg border-[1.5px] border-[#D9E0E3] bg-white px-3.5 py-[13px] text-base text-ink outline-none transition focus:border-amber"
          name="country"
          onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))}
          placeholder="e.g. Barbados"
          value={form.country ?? ""}
        />
      </label>

      {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}

      <button
        className="min-h-11 w-full rounded-lg bg-gold px-5 py-4 text-[17px] font-semibold tracking-[0.2px] text-ink shadow-[0_6px_18px_rgba(246,208,10,0.25)] transition hover:bg-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber disabled:cursor-not-allowed disabled:opacity-70"
        disabled={submitting}
        type="submit"
      >
        {submitting ? "Joining…" : "Join the Founding Community"}
      </button>
    </form>
  );
}
