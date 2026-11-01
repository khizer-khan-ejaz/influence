import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { absoluteUrl } from "@/lib/seo";

import { JsonLd } from "../seo/JsonLd";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const trail = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${tone === "dark" ? "text-mute" : "text-slate"}`}>
          {trail.map((crumb, index) => {
            const last = index === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={tone === "dark" ? "text-paper" : "text-ink"}>
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.href} className="hover:underline">
                      {crumb.name}
                    </Link>
                    <ChevronRight aria-hidden className="size-3.5 opacity-60" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: absoluteUrl(crumb.href),
          })),
        }}
      />
    </>
  );
}
