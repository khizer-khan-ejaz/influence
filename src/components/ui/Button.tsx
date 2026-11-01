import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Tone = "dark" | "light";

type ButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  children: ReactNode;
  /** Surface the button sits on. */
  tone?: Tone;
  className?: string;
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-semibold transition-colors duration-200";

export function PrimaryButton({ children, tone = "dark", className = "", ...props }: ButtonProps) {
  const colors = tone === "dark" ? "bg-lime text-ink hover:bg-white" : "bg-ink text-paper hover:bg-ink-3";
  return (
    <Link className={`${base} ${colors} ${className}`} {...props}>
      {children}
      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function SecondaryButton({ children, tone = "dark", className = "", ...props }: ButtonProps) {
  const colors =
    tone === "dark"
      ? "border border-white/25 text-paper hover:border-white hover:bg-white/5"
      : "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5";
  return (
    <Link className={`${base} ${colors} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function TextLink({ children, className = "", ...props }: Omit<ButtonProps, "tone">) {
  return (
    <Link
      className={`group inline-flex items-center gap-1.5 font-semibold underline decoration-current/30 decoration-1 underline-offset-[6px] transition-colors hover:decoration-current ${className}`}
      {...props}
    >
      {children}
      <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
