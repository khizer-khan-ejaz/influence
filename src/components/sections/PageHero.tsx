import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "../layout/Breadcrumbs";

/** Dark interior-page hero with breadcrumbs and a single H1. */
export function PageHero({
  label,
  title,
  intro,
  breadcrumbs,
  visual,
  size = "display",
  children,
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs: Crumb[];
  /** Optional decorative composition shown beside the heading on large screens. */
  visual?: ReactNode;
  /** Use "headline" for long, keyword-led titles. */
  size?: "display" | "headline";
  children?: ReactNode;
}) {
  return (
    <section className="bg-ink text-paper grain relative overflow-hidden">
      <div className="container-x pt-10 pb-20 sm:pb-24 lg:pt-14 lg:pb-28">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <div className={`animate-rise ${visual ? "lg:col-span-7" : "lg:col-span-9"}`}>
            <p className="eyebrow text-lime">{label}</p>
            <h1 className={`mt-6 font-semibold ${size === "display" ? "text-display" : "text-headline lg:text-[5rem]"}`}>{title}</h1>
          </div>
          {visual && <div className="animate-rise hidden [animation-delay:160ms] lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:block lg:self-center">{visual}</div>}
          {intro && (
            <p className="text-paper/75 animate-rise text-xl leading-relaxed [animation-delay:120ms] lg:col-span-7 lg:col-start-1">
              {intro}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
