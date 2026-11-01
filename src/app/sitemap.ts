import type { MetadataRoute } from "next";

import { api, settle } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await settle(api.articles({ page_size: 50 }));
  return [
    ...staticRoutes.map((route) => ({ url: absoluteUrl(route.path), priority: route.priority, changeFrequency: route.changeFrequency })),
    ...(articles.data?.results ?? []).map((article) => ({
      url: absoluteUrl(`/insights/${article.slug}`),
      lastModified: article.updated_at,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
  ];
}
