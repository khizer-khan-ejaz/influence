import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/format";
import type { CaseStudySummary } from "@/lib/types";

import { VideoFrame } from "../visuals/CreatorFrames";

export function CaseStudyCard({ study }: { study: CaseStudySummary }) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-[4px]">
        {study.featured_image ? (
          <Image
            src={study.featured_image}
            alt={study.image_alt || ""}
            width={1200}
            height={800}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <VideoFrame scene="desk" label={study.industry.title} />
        )}
      </div>
      <p className="eyebrow text-slate mt-6 flex flex-wrap gap-x-3">
        <span>{study.industry.title}</span>
        <span aria-hidden>·</span>
        <span>{study.campaign_objective_label}</span>
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">
        <Link href={`/case-studies/${study.slug}`} className="after:absolute after:inset-0 group-hover:underline">
          {study.title}
        </Link>
      </h3>
      <p className="text-slate mt-3 leading-relaxed">{study.summary}</p>
      <p className="text-slate mt-4 text-sm">
        {study.brand_name} · <time dateTime={study.published_at}>{formatDate(study.published_at)}</time>
      </p>
    </article>
  );
}
