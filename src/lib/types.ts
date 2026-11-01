export type Category = { name: string; slug: string; description: string; article_count: number };

export type Author = { name: string; slug: string; role: string; bio: string };

export type ArticleSummary = {
  title: string;
  slug: string;
  excerpt: string;
  category: { name: string; slug: string };
  author: Author | null;
  featured_image: string | null;
  image_alt: string;
  reading_time: number;
  published_at: string;
  updated_at: string;
};

export type ArticleDetail = ArticleSummary & {
  content_html: string;
  seo_title: string;
  seo_description: string;
  related: ArticleSummary[];
};

export type Paginated<T> = {
  count: number;
  page: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
