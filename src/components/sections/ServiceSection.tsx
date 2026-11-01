import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { pad } from "@/lib/format";
import type { Service } from "@/lib/types";

/** Asymmetric service overview: a feature tile plus an editorial list. */
export function ServiceSection({ services }: { services: Service[] }) {
  const [lead, ...rest] = services;
  if (!lead) return null;
  return (
    <div className="grid gap-px overflow-hidden bg-ink/15 lg:grid-cols-12">
      <Link
        href={`/services#${lead.slug}`}
        className="group bg-ink text-paper relative flex flex-col justify-between gap-16 p-8 sm:p-12 lg:col-span-5"
      >
        <div>
          <p className="eyebrow text-lime">{lead.eyebrow}</p>
          <h3 className="mt-6 text-4xl font-semibold tracking-tight lg:text-5xl">
            {lead.title}
          </h3>
          <p className="text-paper/70 mt-6 text-lg leading-relaxed">
            {lead.description}
          </p>
        </div>
        <span className="text-lime inline-flex items-center gap-2 font-semibold">
          Explore this service
          <ArrowUpRight
            aria-hidden
            className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </Link>
      <div className="flex flex-col gap-px lg:col-span-7">
        {rest.map((service, index) => (
          <Link
            key={service.slug}
            href={`/services#${service.slug}`}
            className="group bg-paper hover:bg-paper-2 flex flex-1 flex-col gap-4 p-8 transition-colors lg:flex-row lg:items-start lg:gap-10"
          >
            <span className="text-slate font-mono text-sm lg:w-10 lg:pt-1.5">
              {pad(index + 2)}
            </span>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="text-slate mt-2 leading-relaxed">
                {service.description}
              </p>
            </div>
            <ArrowUpRight
              aria-hidden
              className="text-ink/40 group-hover:text-ink hidden size-6 shrink-0 transition-colors lg:block"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
