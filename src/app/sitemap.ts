import type { MetadataRoute } from "next";

import { api, settle } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.9, changeFrequency: "monthly" },
  { path: "/process", priority: 0.7, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.7, changeFrequency: "weekly" },
  { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [industries, articles, caseStudies] = await Promise.all([
    settle(api.industries()),
    settle(api.articles({ page_size: 50 })),
    settle(api.caseStudies()),
  ]);

  return [
    ...staticRoutes.map((route) => ({ url: absoluteUrl(route.path), priority: route.priority, changeFrequency: route.changeFrequency })),
    ...(industries.data ?? []).map((industry) => ({
      url: absoluteUrl(`/industries/${industry.slug}`),
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...(articles.data?.results ?? []).map((article) => ({
      url: absoluteUrl(`/insights/${article.slug}`),
      lastModified: article.updated_at,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    ...(caseStudies.data?.results ?? []).map((study) => ({
      url: absoluteUrl(`/case-studies/${study.slug}`),
      lastModified: study.published_at,
      priority: 0.6,
      changeFrequency: "yearly" as const,
    })),
  ];
}
