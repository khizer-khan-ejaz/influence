import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/format";
import type { ArticleSummary } from "@/lib/types";

export function ArticleCard({ article, tone = "light" }: { article: ArticleSummary; tone?: "light" | "dark" }) {
  const muted = tone === "dark" ? "text-mute" : "text-slate";
  return (
    <article className={`group relative flex h-full flex-col border-t pt-6 ${tone === "dark" ? "border-white/15" : "border-ink/15"}`}>
      {article.featured_image && (
        <Image
          src={article.featured_image}
          alt={article.image_alt || ""}
          width={1200}
          height={675}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="mb-6 aspect-video w-full rounded-[4px] object-cover"
        />
      )}
      <p className={`eyebrow ${tone === "dark" ? "text-lime" : "text-ink"}`}>{article.category.name}</p>
      <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight">
        <Link href={`/insights/${article.slug}`} className="decoration-lime decoration-2 underline-offset-4 after:absolute after:inset-0 group-hover:underline">
          {article.title}
        </Link>
      </h3>
      <p className={`mt-4 flex-1 leading-relaxed ${muted}`}>{article.excerpt}</p>
      <p className={`mt-6 text-sm ${muted}`}>
        <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
        <span aria-hidden> · </span>
        {article.reading_time} min read
      </p>
    </article>
  );
}
