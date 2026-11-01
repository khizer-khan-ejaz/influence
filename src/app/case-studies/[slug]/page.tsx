import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationId } from "@/components/seo/schemas";
import { TextLink } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { formatDate, paragraphs } from "@/lib/format";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    return (await api.caseStudies()).results.map((study) => ({ slug: study.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await api.caseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: study.seo_title || `${study.title}: Case Study`,
    absoluteTitle: Boolean(study.seo_title),
    description: study.seo_description || study.summary,
    path: `/case-studies/${study.slug}`,
    type: "article",
    publishedTime: study.published_at,
    modifiedTime: study.updated_at,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = await api.caseStudy(slug);
  if (!study) notFound();
  const path = `/case-studies/${study.slug}`;

  const facts = [
    { label: "Brand", value: study.brand_name },
    { label: "Industry", value: study.industry.title },
    { label: "Objective", value: study.campaign_objective_label },
    { label: "Published", value: formatDate(study.published_at) },
  ];

  return (
    <article>
      <PageHero
        label="Case study"
        title={study.title}
        intro={study.summary}
        size="headline"
        breadcrumbs={[
          { name: "Case Studies", href: "/case-studies" },
          { name: study.title, href: path },
        ]}
      >
        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="eyebrow text-mute">{fact.label}</dt>
              <dd className="mt-2 text-lg font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {study.featured_image && (
        <div className="container-x -mt-px pt-16">
          <Image
            src={study.featured_image}
            alt={study.image_alt || ""}
            width={1800}
            height={1000}
            priority
            sizes="(min-width: 1440px) 1360px, 100vw"
            className="aspect-[16/9] w-full rounded-[4px] object-cover"
          />
        </div>
      )}

      <div className="container-x grid gap-16 py-20 lg:grid-cols-12 lg:py-28">
        <div className="space-y-16 lg:col-span-7">
          <Block title="Creator selection approach" text={study.creator_strategy} />
          <Block title="Campaign execution" text={study.execution} />
          {study.lessons_learned && <Block title="Lessons learned" text={study.lessons_learned} />}
        </div>
        <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
          <section aria-labelledby="results" className="bg-ink text-paper p-8">
            <h2 id="results" className="eyebrow text-lime">
              Verified results
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed">
              {paragraphs(study.results).map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </section>
          {study.deliverables.length > 0 && (
            <section aria-labelledby="deliverables">
              <h2 id="deliverables" className="eyebrow text-slate">
                Deliverables
              </h2>
              <ul className="mt-5 space-y-3">
                {study.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check aria-hidden className="bg-lime mt-0.5 size-5 shrink-0 rounded-full p-0.5" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <TextLink href={`/industries/${study.industry.slug}`}>More on {study.industry.title}</TextLink>
        </aside>
      </div>

      <CTASection />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.summary,
          datePublished: study.published_at,
          dateModified: study.updated_at,
          mainEntityOfPage: absoluteUrl(path),
          image: study.featured_image ?? absoluteUrl("/opengraph-image"),
          author: { "@id": organizationId },
          publisher: { "@id": organizationId },
        }}
      />
    </article>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h2 className="text-title font-semibold">{title}</h2>
      <div className="mt-5 space-y-5 text-lg leading-relaxed">
        {paragraphs(text).map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
    </section>
  );
}
