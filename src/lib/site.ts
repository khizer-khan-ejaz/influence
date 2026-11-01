export const siteConfig = {
  name: "HiQfluence",
  tagline: "Unify Creators × Brands",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "HiQfluence is an influencer marketing agency that connects brands with vetted YouTube and social media creators. We manage creator discovery, campaign strategy and partnerships built to drive measurable results.",
  // Target markets from the brief. Remove any the agency cannot actively serve.
  markets: ["North America", "Europe", "GCC"],
} as const;

export const mainNav = [
  { href: "/services", label: "Services" },
  { href: "/#approach", label: "Approach" },
  { href: "/insights", label: "Insights" },
] as const;

export const primaryCta = { href: "/contact", label: "Discuss a Campaign" } as const;
