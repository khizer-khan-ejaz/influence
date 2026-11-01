import Link from "next/link";

export type Chip = { label: string; href: string; active: boolean };

/** Crawlable link-based filters; work without JavaScript. */
export function FilterChips({ label, chips }: { label: string; chips: Chip[] }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
      <p className="eyebrow text-slate shrink-0 sm:w-28">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li key={chip.href}>
            <Link
              href={chip.href}
              scroll={false}
              aria-current={chip.active ? "true" : undefined}
              className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                chip.active ? "bg-ink text-paper border-ink" : "border-ink/20 hover:border-ink"
              }`}
            >
              {chip.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
