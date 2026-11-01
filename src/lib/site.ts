export const siteConfig = {
  name: "HiQfluence",
  tagline: "Unify Creators × Brands",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "HiQfluence is an influencer marketing agency for technology, AI, SaaS, consumer electronics, productivity, DIY and modern lifestyle brands, connecting them with creators who move audiences and influence purchasing decisions.",
  markets: ["United States", "United Kingdom", "Canada", "Australia"],
} as const;

export const mainNav = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/process", label: "Process" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
] as const;

export const primaryCta = { href: "/contact", label: "Discuss a Campaign" } as const;
