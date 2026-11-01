import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/components/seo/schemas";
import { PrimaryButton, TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneFrame, VideoFrame, type Scene } from "@/components/visuals/CreatorFrames";
import { api } from "@/lib/api";
import { pad, paragraphs } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import type { TitledItem } from "@/lib/types";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    return (await api.industries()).map((industry) => ({ slug: industry.slug }));
  } catch {
    // API unavailable at build time: pages render on first request instead.
    return [];
  }
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = await api.industry(slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.seo_title || industry.headline,
    absoluteTitle: Boolean(industry.seo_title),
    description: industry.seo_description || industry.short_description,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = await api.industry(slug);
  if (!industry) notFound();

  const path = `/industries/${industry.slug}`;

  return (
    <>
      <PageHero
        label={`Industries · ${industry.eyebrow || industry.title}`}
        title={industry.headline}
        intro={industry.short_description}
        visual={<IndustryVisual industry={industry} />}
        size="headline"
        breadcrumbs={[
          { name: "Industries", href: "/industries" },
          { name: industry.title, href: path },
        ]}
      >
        <PrimaryButton href="/contact" className="mt-10">
          Discuss a Campaign
        </PrimaryButton>
      </PageHero>

      <section aria-labelledby="overview" className="py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <h2 id="overview" className="text-headline font-semibold lg:col-span-5">
            Why creators matter in {industry.title.split(" & ")[0]}.
          </h2>
          <div className="space-y-6 text-xl leading-relaxed lg:col-span-6 lg:col-start-7">
            {paragraphs(industry.content).map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {industry.challenges.length > 0 && (
        <section aria-labelledby="challenges" className="bg-ink text-paper py-24 lg:py-32">
          <div className="container-x">
            <p className="eyebrow text-lime">The challenge</p>
            <h2 id="challenges" className="text-headline mt-6 max-w-4xl font-semibold">
              What makes this category hard to market.
            </h2>
            <ol className="mt-16 grid gap-px overflow-hidden bg-white/10 md:grid-cols-3">
              {industry.challenges.map((item, index) => (
                <li key={item.title} className="bg-ink flex flex-col gap-5 p-8 lg:p-10">
                  <span className="text-lime font-mono text-sm">{pad(index + 1)}</span>
                  <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="text-paper/70 leading-relaxed">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {industry.creator_types.length > 0 && (
        <section aria-labelledby="creators" className="py-24 lg:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-slate">Creator types</p>
              <h2 id="creators" className="text-headline mt-6 font-semibold">
                The voices we look for.
              </h2>
            </div>
            <ItemRows items={industry.creator_types} className="lg:col-span-7 lg:col-start-6" />
          </div>
        </section>
      )}

      {industry.strategies.length > 0 && (
        <section aria-labelledby="strategies" className="bg-paper-2 py-24 lg:py-32">
          <div className="container-x">
            <p className="eyebrow text-slate">Campaign strategies</p>
            <h2 id="strategies" className="text-headline mt-6 max-w-4xl font-semibold">
              How we build campaigns for {industry.eyebrow || industry.title} brands.
            </h2>
            <div className="mt-16 grid gap-12 md:grid-cols-3">
              {industry.strategies.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08}>
                  <h3 className="border-ink border-t-2 pt-6 text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="text-slate mt-4 text-lg leading-relaxed">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {industry.examples.length > 0 && (
        <section aria-labelledby="examples" className="py-24 lg:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-slate">Example campaign formats</p>
              <h2 id="examples" className="text-headline mt-6 font-semibold">
                What it could look like.
              </h2>
              <p className="text-slate mt-6 leading-relaxed">
                Illustrative formats we would consider for brands in this category. These are campaign concepts, not past client work.
              </p>
            </div>
            <ItemRows items={industry.examples} className="lg:col-span-7 lg:col-start-6" />
          </div>
        </section>
      )}

      {industry.published_case_studies.length > 0 && (
        <section aria-labelledby="work" className="bg-paper-2 py-24 lg:py-32">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="work" className="text-headline font-semibold">
                Related case studies.
              </h2>
              <TextLink href={`/case-studies?industry=${industry.slug}`}>All {industry.title} case studies</TextLink>
            </div>
            <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {industry.published_case_studies.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </div>
        </section>
      )}

      {industry.faqs.length > 0 && (
        <section aria-labelledby="faqs" className="border-ink/10 border-t py-24 lg:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-slate">FAQ</p>
              <h2 id="faqs" className="text-headline mt-6 font-semibold">
                Questions, answered.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <FaqList faqs={industry.faqs} />
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={`Planning a ${industry.eyebrow || industry.title} campaign?`}
        body="Tell us about your product and audience. We'll suggest the creator types, formats and measurement approach we'd recommend."
      />

      <JsonLd
        data={serviceSchema({
          name: industry.headline,
          description: industry.seo_description || industry.short_description,
          path,
          serviceType: "Influencer marketing",
        })}
      />
    </>
  );
}

const sceneCycle: Scene[] = ["studio", "desk", "warm", "daylight"];

function IndustryVisual({ industry }: { industry: { slug: string; eyebrow: string; title: string; examples: TitledItem[]; creator_types: TitledItem[] } }) {
  const seed = [...industry.slug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const scene = sceneCycle[seed % sceneCycle.length];
  const phoneScene = sceneCycle[(seed + 2) % sceneCycle.length];
  return (
    <div
      role="img"
      aria-label={`Illustration of creator content formats for ${industry.title} brands.`}
      className="relative pb-16"
    >
      <VideoFrame scene={scene} label={industry.creator_types[0]?.title ?? `${industry.eyebrow} creators`} segment="Sponsored segment" />
      <div className="absolute right-[-1rem] bottom-0 w-[38%]">
        <PhoneFrame scene={phoneScene} caption={industry.examples[0]?.title ?? industry.eyebrow} />
      </div>
    </div>
  );
}

function ItemRows({ items, className = "" }: { items: TitledItem[]; className?: string }) {
  return (
    <ul className={`divide-ink/15 border-ink/15 divide-y border-y ${className}`}>
      {items.map((item, index) => (
        <li key={item.title} className="grid gap-3 py-8 sm:grid-cols-[3.5rem_1fr]">
          <span className="text-slate font-mono text-sm sm:pt-1.5">{pad(index + 1)}</span>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
            <p className="text-slate mt-2 text-lg leading-relaxed">{item.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
