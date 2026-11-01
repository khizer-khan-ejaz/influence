import type { Metadata } from "next";
import { Search } from "lucide-react";

import { ArticleCard } from "@/components/sections/ArticleCard";
import { CTASection } from "@/components/sections/CTASection";
import { FilterChips } from "@/components/sections/FilterChips";
import { PageHero } from "@/components/sections/PageHero";
import { Pagination } from "@/components/sections/Pagination";
import { SecondaryButton } from "@/components/ui/Button";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { api, settle } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

const PAGE_SIZE = 6;

type Filters = { category?: string; q?: string; page?: string };

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function listingHref(params: Filters) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value && !(key === "page" && value === "1")) query.set(key, value);
  const qs = query.toString();
  return qs ? `/insights?${qs}` : "/insights";
}

export async function generateMetadata({ searchParams }: PageProps<"/insights">): Promise<Metadata> {
  const sp = await searchParams;
  const category = first(sp.category);
  const page = first(sp.page);
  const meta = pageMetadata({
    title: `Influencer Marketing Insights${page && page !== "1" ? ` – Page ${page}` : ""}`,
    description:
      "Practical guidance on influencer marketing for technology brands: creator research, YouTube partnerships, SaaS campaigns, briefing and measurement.",
    path: listingHref({ category, page }),
    // Search result pages are useful to people but should not be indexed.
    noIndex: Boolean(first(sp.q)),
  });
  return meta;
}

export default async function InsightsPage({ searchParams }: PageProps<"/insights">) {
  const sp = await searchParams;
  const category = first(sp.category);
  const q = first(sp.q)?.trim().slice(0, 100) || undefined;
  const page = Math.max(1, Number.parseInt(first(sp.page) ?? "1", 10) || 1);

  const [categories, articles] = await Promise.all([
    settle(api.categories()),
    settle(api.articles({ category, search: q, page, page_size: PAGE_SIZE })),
  ]);
  const activeCategory = categories.data?.find((c) => c.slug === category);

  return (
    <>
      <PageHero
        label="Insights"
        title={
          <>
            Thinking on <span className="accent text-lime">creators</span>, campaigns and influence.
          </>
        }
        intro="Practical guidance for marketing teams working with creators, from vetting and briefing to YouTube integrations and measurement."
        breadcrumbs={[{ name: "Insights", href: "/insights" }]}
      />

      <section aria-label="Articles" className="py-20 lg:py-28">
        <div className="container-x">
          <div className="border-ink/15 grid gap-8 border-b pb-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              {categories.data && (
                <FilterChips
                  label="Category"
                  chips={[
                    { label: "All", href: listingHref({ q }), active: !category },
                    ...categories.data
                      .filter((c) => c.article_count > 0)
                      .map((c) => ({ label: c.name, href: listingHref({ category: c.slug, q }), active: c.slug === category })),
                  ]}
                />
              )}
            </div>
            <form role="search" action="/insights" className="surface-light relative lg:col-span-4">
              {category && <input type="hidden" name="category" value={category} />}
              <label htmlFor="insights-search" className="sr-only">
                Search insights
              </label>
              <input
                id="insights-search"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Search insights"
                maxLength={100}
                className="border-ink/25 focus:border-ink min-h-12 w-full rounded-full border bg-white/60 pr-14 pl-5 outline-none"
              />
              <button type="submit" className="bg-ink text-paper absolute top-1 right-1 flex size-10 items-center justify-center rounded-full">
                <Search aria-hidden className="size-4" />
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>

          {(q || activeCategory) && (
            <p className="text-slate mt-8" aria-live="polite">
              {articles.data ? `${articles.data.count} ${articles.data.count === 1 ? "article" : "articles"}` : "Articles"}
              {activeCategory && <> in <strong className="text-ink">{activeCategory.name}</strong></>}
              {q && <> matching <strong className="text-ink">&ldquo;{q}&rdquo;</strong></>}
            </p>
          )}
          {activeCategory?.description && !q && <h2 className="text-title mt-4 max-w-3xl font-semibold">{activeCategory.description}</h2>}

          <div className="mt-14">
            {articles.error ? (
              <ErrorState />
            ) : articles.data.results.length === 0 ? (
              <EmptyState
                title={q ? "No articles match your search." : "No articles here yet."}
                message="Try a different search term or browse all insights."
                action={<SecondaryButton href="/insights" tone="light">View all insights</SecondaryButton>}
              />
            ) : (
              <>
                <h2 className="sr-only">{activeCategory ? `${activeCategory.name} articles` : "Latest articles"}</h2>
                <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                  {articles.data.results.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
                <Pagination page={articles.data.page} totalPages={articles.data.total_pages} hrefFor={(p) => listingHref({ category, q, page: String(p) })} />
              </>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
