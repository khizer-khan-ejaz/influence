/** Channels we source creators from. Shown once, on the homepage. */
export const channels = ["YouTube", "Instagram", "TikTok", "X", "LinkedIn"] as const;

export const industries = [
  {
    slug: "ai",
    title: "AI",
    body: "Buyers have heard every claim. A creator showing your product doing real work is what cuts through.",
  },
  {
    slug: "saas",
    title: "SaaS & Software",
    body: "Software is easier to show than describe. Creators turn features into workflows your buyers recognise.",
  },
  {
    slug: "b2b-technology",
    title: "B2B Technology",
    body: "Long cycles, many decision-makers. Practitioner voices reach the buying committee before sales does.",
  },
] as const;

export const services = [
  {
    slug: "creator-discovery",
    title: "Creator Discovery & Audience Vetting",
    summary: "Creators whose audience matches your customers, not just your category.",
    includes: [
      "Research across YouTube, Instagram, TikTok and other social platforms",
      "Audience geography, roles and demographics",
      "Engagement quality and authenticity checks",
      "Content quality and brand-safety review",
    ],
    why: "Follower counts are easy to inflate. Audience fit decides whether a partnership reaches anyone who can buy.",
  },
  {
    slug: "campaign-strategy",
    title: "Campaign Strategy & Planning",
    summary: "A business goal turned into a plan, with a reason behind every creator and every dollar.",
    includes: ["Objectives and success measures", "Creator mix and selection criteria", "Formats, deliverables and timing", "Budget allocation"],
    why: "Without a plan, budgets drift towards whoever is easiest to book.",
  },
  {
    slug: "creator-partnerships",
    title: "Creator Outreach & Partnerships",
    summary: "We approach creators, negotiate terms and secure the partnerships.",
    includes: ["Direct creator outreach", "Rates and deliverables negotiation", "Usage rights and exclusivity", "Agreements and coordination"],
    why: "Clear, fair terms protect your budget and make good creators want to work with you again.",
  },
  {
    slug: "campaign-management",
    title: "Influencer Campaign Management",
    summary: "Briefs, reviews and timelines handled, so content goes live on schedule.",
    includes: ["Creative briefs", "Content and claims review", "Disclosure compliance", "Approvals and publishing schedule"],
    why: "Your team signs off on the work. We run everything around it.",
  },
  {
    slug: "performance-reporting",
    title: "Performance Tracking & Reporting",
    summary: "What each creator delivered, and what to do next.",
    includes: [
      "Tracking links and codes set up before launch",
      "Reach, views and engagement",
      "Clicks, sign-ups and other available outcomes",
      "Recommendations for the next campaign",
    ],
    why: "Honest reporting shows where to scale and where to stop.",
  },
] as const;

export const processSteps = [
  { name: "Discover", summary: "Map who your customers already follow, on every channel they use." },
  { name: "Evaluate", summary: "Verify audiences and authenticity before any rate is discussed." },
  { name: "Activate", summary: "Agree terms, brief creators and manage content to publication." },
  { name: "Measure", summary: "Track delivery and outcomes, then sharpen the next round." },
] as const;
