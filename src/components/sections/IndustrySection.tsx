import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { pad } from "@/lib/format";
import type { IndustrySummary } from "@/lib/types";

/** Editorial index of industries: large typographic rows rather than a card grid. */
export function IndustrySection({ industries, headingLevel = "h3" }: { industries: IndustrySummary[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-white/15">
      {industries.map((industry, index) => (
        <li key={industry.slug} className="border-b border-white/15">
          <Link
            href={`/industries/${industry.slug}`}
            className="group grid items-baseline gap-x-8 gap-y-3 py-7 transition-colors sm:grid-cols-12 sm:py-9"
          >
            <span className="text-mute font-mono text-sm sm:col-span-1">{pad(index + 1)}</span>
            <Heading className="font-display group-hover:text-lime text-3xl font-semibold tracking-tight transition-colors sm:col-span-5 lg:text-[2.75rem] lg:leading-none">
              {industry.title}
            </Heading>
            <p className="text-mute group-hover:text-paper/90 transition-colors sm:col-span-5">{industry.short_description}</p>
            <span className="hidden justify-end sm:col-span-1 sm:flex">
              <span className="group-hover:bg-lime group-hover:text-ink flex size-11 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-transparent">
                <ArrowUpRight aria-hidden className="size-5" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
