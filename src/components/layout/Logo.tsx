import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="HiQfluence home" className={`font-display inline-flex items-baseline text-[1.35rem] font-semibold tracking-[-0.04em] ${className}`}>
      Hi<span className="accent text-lime text-[1.55rem]">Q</span>fluence
    </Link>
  );
}
