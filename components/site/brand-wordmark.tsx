import Link from "next/link";

type BrandWordmarkProps = {
  className?: string;
  href?: string;
};

export function BrandWordmark({ className = "", href = "/home" }: BrandWordmarkProps) {
  return (
    <Link
      aria-label="TEN Habitat home"
      className={`inline-flex items-baseline gap-1.5 text-[15px] tracking-[2px] ${className}`}
      href={href}
    >
      <span className="font-bold text-amber">TEN</span>
      <span className="font-normal text-white">HABITAT</span>
    </Link>
  );
}
