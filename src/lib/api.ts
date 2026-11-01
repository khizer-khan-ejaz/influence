import "server-only";

import type { ArticleDetail, ArticleSummary, Category, Paginated } from "./types";

const API_URL = (process.env.API_INTERNAL_URL ?? "http://localhost:8000/api/v1").replace(/\/$/, "");

/** Content changes appear on the site within this many seconds of being saved in Django admin. */
export const REVALIDATE_SECONDS = 300;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type Query = Record<string, string | number | undefined>;

function buildUrl(path: string, query?: Query) {
  const url = new URL(`${API_URL}/${path.replace(/^\//, "")}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }
  return url;
}

async function request<T>(path: string, query?: Query): Promise<T> {
  const url = buildUrl(path, query);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS, tags: [path.split("/")[0]] },
  });
  if (!response.ok) {
    throw new ApiError(`GET ${url.pathname} failed with ${response.status}`, response.status);
  }
  return (await response.json()) as T;
}

/** Like request(), but resolves to null for 404 so pages can render notFound(). */
async function requestOrNull<T>(path: string): Promise<T | null> {
  try {
    return await request<T>(path);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export const api = {
  articles: (query?: { category?: string; page?: number; page_size?: number }) =>
    request<Paginated<ArticleSummary>>("insights/", query),
  article: (slug: string) => requestOrNull<ArticleDetail>(`insights/${encodeURIComponent(slug)}/`),
  categories: () => request<Category[]>("insights/categories/"),
};

/** Resolve a section's data without failing the whole page; the section renders an error state instead. */
export async function settle<T>(promise: Promise<T>): Promise<{ data: T; error: null } | { data: null; error: Error }> {
  try {
    return { data: await promise, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
  }
}
