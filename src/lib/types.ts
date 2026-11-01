export type TitledItem = { title: string; body: string };
export type Faq = { question: string; answer: string };

export type Service = {
  title: string;
  slug: string;
  eyebrow: string;
  description: string;
  content: string;
  how_it_works: string[];
  business_value: string;
  deliverables: string[];
  featured: boolean;
  display_order: number;
  seo_title: string;
  seo_description: string;
};

export type IndustrySummary = {
  title: string;
  slug: string;
  eyebrow: string;
  short_description: string;
  display_order: number;
};

export type IndustryDetail = Omit<IndustrySummary, "display_order"> & {
  headline: string;
  content: string;
  challenges: TitledItem[];
  creator_types: TitledItem[];
  strategies: TitledItem[];
  examples: TitledItem[];
  faqs: Faq[];
  seo_title: string;
  seo_description: string;
  published_case_studies: CaseStudySummary[];
  updated_at: string;
};

export type Ref = { title: string; slug: string };

export type CaseStudySummary = {
  title: string;
  slug: string;
  brand_name: string;
  industry: Ref;
  campaign_objective: string;
  campaign_objective_label: string;
  summary: string;
  featured_image: string | null;
  image_alt: string;
  published_at: string;
};

export type CaseStudyDetail = CaseStudySummary & {
  creator_strategy: string;
  deliverables: string[];
  execution: string;
  results: string;
  lessons_learned: string;
  seo_title: string;
  seo_description: string;
  updated_at: string;
};

export type FilterOption = { value: string; label: string };
export type CaseStudyFilters = { industries: FilterOption[]; objectives: FilterOption[] };

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
