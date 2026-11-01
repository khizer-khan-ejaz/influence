import type { Metadata } from "next";

import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { FilterChips } from "@/components/sections/FilterChips";
import { PageHero } from "@/components/sections/PageHero";
import { Pagination } from "@/components/sections/Pagination";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { api, settle } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

type SearchParams = { industry?: string; objective?: string; page?: string };

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function listingHref(params: SearchParams) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value && !(key === "page" && value === "1")) query.set(key, value);
  const qs = query.toString();
  return qs ? `/case-studies?${qs}` : "/case-studies";
}

export async function generateMetadata({ searchParams }: PageProps<"/case-studies">): Promise<Metadata> {
  const sp = await searchParams;
  const filtered = Boolean(first(sp.industry) || first(sp.objective) || first(sp.page));
  return pageMetadata({
    title: "Influencer Marketing Case Studies",
    description: "Influencer marketing case studies: creator selection, campaign execution and verified results across technology and consumer categories.",
    path: "/case-studies",
    noIndex: filtered,
  });
}

export default async function CaseStudiesPage({ searchParams }: PageProps<"/case-studies">) {
  const sp = await searchParams;
  const current: SearchParams = { industry: first(sp.industry), objective: first(sp.objective) };
  const page = Math.max(1, Number.parseInt(first(sp.page) ?? "1", 10) || 1);

  const [filters, studies] = await Promise.all([
    settle(api.caseStudyFilters()),
    settle(api.caseStudies({ industry: current.industry, objective: current.objective, page })),
  ]);
  const hasFilters = Boolean(current.industry || current.objective);

  return (
    <>
      <PageHero
        label="Case studies"
        title={
          <>
            Campaigns, <span className="accent text-lime">documented honestly.</span>
          </>
        }
        intro="How we selected creators, what we produced and what it delivered. We only publish verified results with client approval."
        breadcrumbs={[{ name: "Case Studies", href: "/case-studies" }]}
      />

      <section aria-label="Case study listing" className="py-20 lg:py-28">
        <div className="container-x">
          {filters.data && (
            <div className="border-ink/15 space-y-5 border-b pb-10">
              <FilterChips
                label="Industry"
                chips={[
                  { label: "All", href: listingHref({ ...current, industry: undefined }), active: !current.industry },
                  ...filters.data.industries.map((o) => ({
                    label: o.label,
                    href: listingHref({ ...current, industry: o.value }),
                    active: current.industry === o.value,
                  })),
                ]}
              />
              <FilterChips
                label="Objective"
                chips={[
                  { label: "All", href: listingHref({ ...current, objective: undefined }), active: !current.objective },
                  ...filters.data.objectives.map((o) => ({
                    label: o.label,
                    href: listingHref({ ...current, objective: o.value }),
                    active: current.objective === o.value,
                  })),
                ]}
              />
            </div>
          )}

          <div className="mt-14">
            {studies.error ? (
              <ErrorState />
            ) : studies.data.results.length === 0 ? (
              hasFilters ? (
                <EmptyState
                  title="No case studies match these filters."
                  message="Try a different industry or objective, or clear the filters to see everything we've published."
                  action={<SecondaryButton href="/case-studies" tone="light">Clear filters</SecondaryButton>}
                />
              ) : (
                <EmptyState
                  title="Case studies are on their way."
                  message={
                    <p>
                      We publish case studies only when campaign results are verified and our clients have approved them for release. We would
                      rather show nothing than show numbers we can&apos;t stand behind. Until then, we&apos;re glad to walk you through how we
                      would plan a campaign for your brand.
                    </p>
                  }
                  action={
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <PrimaryButton href="/contact" tone="light">
                        Discuss a Campaign
                      </PrimaryButton>
                      <SecondaryButton href="/process" tone="light">
                        See our process
                      </SecondaryButton>
                    </div>
                  }
                />
              )
            ) : (
              <>
                <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                  {studies.data.results.map((study) => (
                    <CaseStudyCard key={study.slug} study={study} />
                  ))}
                </div>
                <Pagination page={studies.data.page} totalPages={studies.data.total_pages} hrefFor={(p) => listingHref({ ...current, page: String(p) })} />
              </>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
