import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CtaLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost" | "pill";
  className?: string;
};

export function CtaLink({ children, href, variant = "primary", className }: CtaLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2",
        variant === "primary" &&
          "rounded-lg bg-gold px-7 py-4 text-[17px] font-semibold tracking-[0.2px] text-ink shadow-[0_6px_18px_rgba(246,208,10,0.22)] hover:bg-amber",
        variant === "ghost" &&
          "rounded-lg border-[1.5px] border-white/45 px-6 py-4 text-[17px] font-medium text-white hover:border-gold hover:text-gold focus-visible:ring-offset-cocoa",
        variant === "pill" &&
          "rounded-full border-[1.5px] border-ink px-5 py-2.5 text-[15px] font-semibold text-ink hover:border-gold hover:bg-gold",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
