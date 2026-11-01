import type { Metadata } from "next";

import { ArticleCard } from "@/components/sections/ArticleCard";
import { CTASection } from "@/components/sections/CTASection";
import { FilterChips } from "@/components/sections/FilterChips";
import { PageHero } from "@/components/sections/PageHero";
import { Pagination } from "@/components/sections/Pagination";
import { SecondaryButton } from "@/components/ui/Button";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { api, settle } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

const PAGE_SIZE = 9;

type Filters = { category?: string; page?: string };

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
    title: `Influencer Marketing Insights for Brands${page && page !== "1" ? ` – Page ${page}` : ""}`,
    description:
      "Practical guidance on influencer marketing strategy, working with YouTube and social media creators, creator partnerships and campaign performance.",
    path: listingHref({ category, page }),
  });
  return meta;
}

export default async function InsightsPage({ searchParams }: PageProps<"/insights">) {
  const sp = await searchParams;
  const category = first(sp.category);
  const page = Math.max(1, Number.parseInt(first(sp.page) ?? "1", 10) || 1);

  const [categories, articles] = await Promise.all([
    settle(api.categories()),
    settle(api.articles({ category, page, page_size: PAGE_SIZE })),
  ]);
  const activeCategory = categories.data?.find((c) => c.slug === category);

  return (
    <>
      <PageHero
        label="Insights"
        title={
          <>
            What actually works with <span className="accent text-lime">creators.</span>
          </>
        }
        intro="Short, practical reads for marketers planning their first or next creator campaign."
        breadcrumbs={[{ name: "Insights", href: "/insights" }]}
      />

      <section aria-label="Articles" className="py-20 lg:py-28">
        <div className="container-x">
          <div className="border-ink/15 border-b pb-10">
            {categories.data && (
                <FilterChips
                  label="Category"
                  chips={[
                    { label: "All", href: listingHref({}), active: !category },
                    ...categories.data
                      .filter((c) => c.article_count > 0)
                      .map((c) => ({ label: c.name, href: listingHref({ category: c.slug }), active: c.slug === category })),
                  ]}
                />
            )}
          </div>

          {activeCategory?.description && <p className="text-title mt-10 max-w-3xl font-semibold">{activeCategory.description}</p>}

          <div className="mt-14">
            {articles.error ? (
              <ErrorState />
            ) : articles.data.results.length === 0 ? (
              <EmptyState
                title="No articles here yet."
                message="New articles are on the way. In the meantime, browse everything we have published."
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
                <Pagination page={articles.data.page} totalPages={articles.data.total_pages} hrefFor={(p) => listingHref({ category, page: String(p) })} />
              </>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
