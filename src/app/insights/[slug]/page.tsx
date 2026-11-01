import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/sections/ArticleCard";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationId } from "@/components/seo/schemas";
import { ShareLinks } from "@/components/sections/ShareLinks";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    return (await api.articles({ page_size: 50 })).results.map((article) => ({ slug: article.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await api.article(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seo_title || article.title,
    absoluteTitle: Boolean(article.seo_title),
    description: article.seo_description || article.excerpt,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.published_at,
    modifiedTime: article.updated_at,
  });
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = await api.article(slug);
  if (!article) notFound();
  const path = `/insights/${article.slug}`;
  const authorName = article.author?.name ?? "HiQfluence";

  return (
    <>
      <article>
        <header className="bg-ink text-paper grain">
          <div className="container-x pt-10 pb-20 lg:pt-14 lg:pb-24">
            <Breadcrumbs
              items={[
                { name: "Insights", href: "/insights" },
                { name: article.title, href: path },
              ]}
            />
            <div className="mx-auto mt-16 max-w-4xl lg:mt-20">
              <Link href={`/insights?category=${article.category.slug}`} className="eyebrow text-lime hover:underline">
                {article.category.name}
              </Link>
              <h1 className="text-headline mt-6 font-semibold">{article.title}</h1>
              <p className="text-paper/75 mt-8 text-xl leading-relaxed">{article.excerpt}</p>
              <div className="text-mute mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm">
                <span>
                  By <span className="text-paper">{authorName}</span>
                  {article.author?.role && <> · {article.author.role}</>}
                </span>
                <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
                <span>{article.reading_time} min read</span>
              </div>
            </div>
          </div>
        </header>

        {article.featured_image && (
          <div className="container-x pt-16">
            <Image
              src={article.featured_image}
              alt={article.image_alt || ""}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="mx-auto aspect-video w-full max-w-4xl rounded-[4px] object-cover"
            />
          </div>
        )}

        <div className="container-x py-16 lg:py-24">
          <div className="prose-article mx-auto max-w-[44rem]" dangerouslySetInnerHTML={{ __html: article.content_html }} />
          <footer className="border-ink/15 mx-auto mt-16 flex max-w-[44rem] flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{authorName}</p>
              {article.author?.bio && <p className="text-slate mt-1 max-w-md text-sm">{article.author.bio}</p>}
            </div>
            <ShareLinks url={absoluteUrl(path)} />
          </footer>
        </div>
      </article>

      {article.related.length > 0 && (
        <section aria-labelledby="related" className="bg-paper-2 py-20 lg:py-28">
          <div className="container-x">
            <h2 id="related" className="text-headline font-semibold">
              Related reading.
            </h2>
            <div className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {article.related.map((related) => (
                <ArticleCard key={related.slug} article={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.seo_description || article.excerpt,
          datePublished: article.published_at,
          dateModified: article.updated_at,
          mainEntityOfPage: absoluteUrl(path),
          image: article.featured_image ?? absoluteUrl("/opengraph-image"),
          articleSection: article.category.name,
          author: article.author
            ? { "@type": "Organization", name: article.author.name, url: siteConfig.url }
            : { "@id": organizationId },
          publisher: { "@id": organizationId },
        }}
      />
    </>
  );
}
