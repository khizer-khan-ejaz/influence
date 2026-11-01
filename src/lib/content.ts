export const capabilities = [
  {
    title: "Influencer discovery",
    body: "Research across YouTube, TikTok, Instagram, LinkedIn and newsletters to find creators your buyers already watch and trust.",
  },
  {
    title: "Creator vetting",
    body: "Audience geography, view consistency, engagement quality and brand safety checked before a single rate is discussed.",
  },
  {
    title: "Campaign strategy",
    body: "Objectives, formats, creator mix, messaging and measurement planned around a commercial outcome.",
  },
  {
    title: "Partnership negotiations",
    body: "Rates, deliverables, usage rights and exclusivity negotiated transparently and benchmarked against expected value.",
  },
  {
    title: "Campaign management",
    body: "Briefs, product logistics, script reviews, disclosure checks and publishing schedules managed end to end.",
  },
  {
    title: "Performance reporting",
    body: "Tracked links, codes and creator analytics brought together into reporting that separates verified results from estimates.",
  },
] as const;

export const principles = [
  {
    title: "Data-informed creator selection",
    body: "We shortlist on audience composition, recent view performance and content quality, not follower counts.",
  },
  {
    title: "Audience-first planning",
    body: "Every plan starts with the buyer you need to reach and works back to the creators they already listen to.",
  },
  {
    title: "Direct creator relationships",
    body: "We work with creators directly, which means faster answers, better briefs and partnerships that can grow.",
  },
  {
    title: "Transparent negotiations",
    body: "You see each agreed creator fee, the deliverables behind it and how it compares with expected value, before anything is signed.",
  },
  {
    title: "End-to-end campaign management",
    body: "One accountable team from first shortlist to final report, so your people only step in where their judgement matters.",
  },
  {
    title: "Focus on commercial outcomes",
    body: "We agree on the business result before launch and report against it honestly, including what did not work.",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    name: "Discover",
    summary: "Identify creators based on audience relevance, content quality, engagement and brand alignment.",
    detail:
      "We translate your goals and buyer profile into search criteria, then research creators across platforms by topic, keyword, audience overlap and competitor sponsorship. Every candidate's recent content is reviewed by a person, not just filtered by a tool.",
    activities: ["Buyer and audience definition", "Cross-platform creator research", "Competitor sponsorship mapping", "Manual content review"],
    output: "A researched long-list with the reasoning behind every pick.",
  },
  {
    number: "02",
    name: "Evaluate",
    summary: "Assess demographics, average views, audience authenticity, content quality and commercial suitability.",
    detail:
      "Shortlisted creators are vetted on the numbers that are hard to fake: recent view consistency, audience geography and demographics from first-party analytics, comment quality and growth patterns. We flag risks and state our confidence clearly.",
    activities: ["First-party analytics review", "View and engagement analysis", "Authenticity and fraud checks", "Brand-safety review"],
    output: "A ranked shortlist with confidence ratings, rates and recommended formats.",
  },
  {
    number: "03",
    name: "Activate",
    summary: "Manage outreach, negotiations, deliverables, creative briefs, timelines and campaign execution.",
    detail:
      "We approach creators directly, negotiate rates and terms, issue creative briefs and manage production. Scripts and drafts are reviewed against the brief, claims and disclosure rules before anything goes live.",
    activities: ["Outreach and negotiation", "Agreements and usage rights", "Creative briefs and reviews", "Scheduling and publishing"],
    output: "Live, compliant creator content delivered on schedule.",
  },
  {
    number: "04",
    name: "Measure",
    summary: "Evaluate campaign delivery, content performance and relevant business outcomes.",
    detail:
      "Tracking is set up before launch so results can be attributed. After publication we collect creator analytics, combine them with your own data and report on cost efficiency and outcomes, with clear recommendations for what to do next.",
    activities: ["Tracked links and codes", "Creator analytics collection", "Cost-efficiency analysis", "Recommendations and rebooking"],
    output: "An honest report that shows what worked, what it cost and what to scale.",
  },
] as const;
