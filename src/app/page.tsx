import type { Metadata } from "next";

import { ArticleCard } from "@/components/sections/ArticleCard";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IndustrySection } from "@/components/sections/IndustrySection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { PrimaryButton, SecondaryButton, TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { PhoneFrame, VideoFrame } from "@/components/visuals/CreatorFrames";
import { api, settle } from "@/lib/api";
import { capabilities, principles } from "@/lib/content";
import { pad } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "HiQfluence | Technology Influencer Marketing Agency",
  absoluteTitle: true,
  description:
    "Influencer marketing agency for technology, AI, SaaS and consumer brands. We connect brands with creators who build trust and influence purchasing decisions.",
  path: "/",
});

export default async function HomePage() {
  const [industries, services, caseStudies, articles] = await Promise.all([
    settle(api.industries()),
    settle(api.services()),
    settle(api.caseStudies({ featured: "true" })),
    settle(api.articles({ page_size: 3 })),
  ]);

  return (
    <>
      <HeroSection industries={(industries.data ?? []).map((i) => i.title)} />

      {/* 01 — What we do */}
      <section aria-labelledby="what-we-do" className="py-24 lg:py-36">
        <div className="container-x">
          <SectionHeader
            id="what-we-do"
            index="01"
            label="What we do"
            title="Creator Partnerships Built Around Business Goals."
            intro="We plan, source, negotiate and manage creator campaigns for brands whose buyers research before they commit, and we measure them against outcomes, not vanity metrics."
          />
          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
            <Reveal className="relative hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 space-y-6">
                <VideoFrame scene="desk" label="Tutorial integration · SaaS" segment="Walkthrough 02:40 – 04:10" />
                <div className="ml-auto w-1/2">
                  <PhoneFrame scene="daylight" caption="My desk set-up, one year on" />
                </div>
              </div>
            </Reveal>
            <ol className="divide-ink/15 border-ink/15 divide-y border-y lg:col-span-7 lg:col-start-6">
              {capabilities.map((item, index) => (
                <li key={item.title} className="grid gap-3 py-8 sm:grid-cols-[4rem_1fr] sm:gap-6">
                  <span className="text-slate font-mono text-sm sm:pt-2">{pad(index + 1)}</span>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{item.title}</h3>
                    <p className="text-slate mt-3 max-w-xl text-lg leading-relaxed">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 02 — Industries */}
      <section aria-labelledby="industries" className="bg-ink text-paper py-24 lg:py-36">
        <div className="container-x">
          <SectionHeader
            id="industries"
            tone="dark"
            index="02"
            label="Industries we work with"
            title={
              <>
                Built for brands people <span className="accent text-lime">research</span> before they buy.
              </>
            }
            intro="Technology and modern consumer categories where trust, demonstration and expert opinion shape the purchase."
          />
          <div className="mt-16 lg:mt-20">
            {industries.error ? <ErrorState /> : <IndustrySection industries={industries.data} />}
          </div>
        </div>
      </section>

      {/* 03 — Services */}
      <section aria-labelledby="services" className="py-24 lg:py-36">
        <div className="container-x">
          <SectionHeader
            id="services"
            index="03"
            label="Services"
            title="Everything a creator campaign needs, under one accountable team."
            aside={<TextLink href="/services">View all services</TextLink>}
          />
          <div className="mt-16 lg:mt-20">
            {services.error ? <ErrorState /> : <ServiceSection services={services.data.filter((s) => s.featured).slice(0, 5)} />}
          </div>
        </div>
      </section>

      {/* 04 — Process */}
      <section aria-labelledby="process" className="bg-ink-2 text-paper py-24 lg:py-36">
        <div className="container-x">
          <SectionHeader
            id="process"
            tone="dark"
            index="04"
            label="Our process"
            title="Four stages. No guesswork."
            aside={
              <SecondaryButton href="/process" className="self-start">
                Explore Our Approach
              </SecondaryButton>
            }
          />
          <div className="mt-16 lg:mt-24">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* 05 — Why HiQfluence */}
      <section aria-labelledby="why" className="py-24 lg:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-slate flex items-center gap-3">
                <span className="text-ink">05</span>
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                Why HiQfluence
              </p>
              <h2 id="why" className="text-headline mt-6 font-semibold">
                Influence is only valuable when it <span className="accent">reaches the right people.</span>
              </h2>
              <p className="text-slate mt-8 max-w-md text-lg leading-relaxed">
                We work as an extension of your marketing team: selective about creators, open about costs and focused on outcomes.
              </p>
            </div>
          </div>
          <ul className="grid gap-px self-start overflow-hidden bg-ink/15 sm:grid-cols-2 lg:col-span-7">
            {principles.map((item, index) => (
              <li key={item.title} className="bg-paper flex flex-col gap-4 p-8">
                <span className="text-slate font-mono text-sm">{pad(index + 1)}</span>
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="text-slate leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Case studies */}
      <section aria-labelledby="case-studies" className="bg-paper-2 py-24 lg:py-36">
        <div className="container-x">
          <SectionHeader id="case-studies" index="06" label="Case studies" title="Selected work." />
          <div className="mt-16">
            {caseStudies.error ? (
              <ErrorState />
            ) : caseStudies.data.results.length > 0 ? (
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                {caseStudies.data.results.slice(0, 3).map((study) => (
                  <CaseStudyCard key={study.slug} study={study} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Case studies are on their way."
                message="We publish campaign case studies only once results are verified and our clients have approved them for release. In the meantime, we're happy to walk you through our approach and how we would plan a campaign for your brand."
                action={
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton href="/contact" tone="light">
                      Discuss a Campaign
                    </PrimaryButton>
                    <SecondaryButton href="/process" tone="light">
                      See how we work
                    </SecondaryButton>
                  </div>
                }
              />
            )}
          </div>
        </div>
      </section>

      {/* 07 — Insights */}
      <section aria-labelledby="insights" className="py-24 lg:py-36">
        <div className="container-x">
          <SectionHeader
            id="insights"
            index="07"
            label="Insights"
            title="Notes on creators, campaigns and influence."
            aside={<TextLink href="/insights">All insights</TextLink>}
          />
          <div className="mt-16">
            {articles.error ? (
              <ErrorState />
            ) : articles.data.results.length === 0 ? (
              <EmptyState title="New articles coming soon." message="Our first insights are being prepared." />
            ) : (
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                {articles.data.results.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
