import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { pad } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Our Influencer Marketing Agency",
  description:
    "How HiQfluence approaches creator partnerships, audience vetting and campaign transparency for technology and modern consumer brands.",
  path: "/about",
});

const beliefs = [
  {
    title: "Our approach to creator partnerships",
    body: [
      "We treat creators as partners with expertise, not media inventory. The strongest sponsored content comes from creators who understand the product, believe it is useful to their audience and have the freedom to say so in their own voice.",
      "That shapes how we work: researched outreach that explains why a creator was chosen, briefs that are precise about facts and relaxed about style, and timelines that allow creators to use the product before they talk about it.",
    ],
  },
  {
    title: "Audience vetting philosophy",
    body: [
      "An audience is only valuable if it is real, reachable and relevant to what you sell. Subscriber and follower counts are a starting point, not a decision.",
      "We look at the evidence that is harder to fake: recent view consistency, audience geography and demographics from first-party analytics, comment quality and growth patterns. Where something cannot be verified, we say so, and we price the risk into our recommendation.",
    ],
  },
  {
    title: "Campaign transparency",
    body: [
      "You should always know what you are paying for and why. We share the agreed rate and deliverables for every creator, explain how they compare with expected performance, and report results that clearly separate verified data from estimates.",
      "When something underperforms, we tell you, and we explain what we would change next time.",
    ],
  },
  {
    title: "Brand and creator relationships",
    body: [
      "The best results tend to come from relationships, not one-off placements. When a creator connects with your audience, we help turn that into an ongoing partnership, with consistent presence, deeper product knowledge and better economics on both sides.",
      "We aim to be the agency creators are glad to hear from: clear briefs, fair terms, prompt payment and respect for their editorial judgement.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About HiQfluence"
        title={
          <>
            Unify creators <span className="accent text-lime">×</span> brands.
          </>
        }
        intro="HiQfluence is an influencer marketing agency that connects technology and modern consumer brands with the creators their customers already trust."
        breadcrumbs={[{ name: "About", href: "/about" }]}
      />

      <section aria-labelledby="what-we-do" className="py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <h2 id="what-we-do" className="text-headline font-semibold lg:col-span-5">
            What we do.
          </h2>
          <div className="text-slate space-y-6 text-xl leading-relaxed lg:col-span-6 lg:col-start-7">
            <p>
              We plan and manage influencer marketing campaigns end to end: creator discovery and research, audience vetting, outreach and
              negotiation, creative briefing, campaign management and performance reporting.
            </p>
            <p>
              Our focus is on categories where buyers research before they commit: AI, SaaS and software, B2B technology, consumer electronics,
              productivity and workspace, DIY and home improvement, and modern lifestyle products. In these categories, a trusted demonstration
              from the right creator often does more than any ad.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="positioning" className="bg-ink text-paper py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow text-lime">Positioning</p>
          <h2 id="positioning" className="text-headline mt-6 max-w-5xl font-semibold">
            Not a creator marketplace. Not a generalist agency. A specialist partner for brands that{" "}
            <span className="accent text-lime">need to be understood</span> before they are bought.
          </h2>
          <div className="text-paper/70 mt-14 grid gap-10 text-lg leading-relaxed md:grid-cols-3">
            <p>We work with marketing directors, growth leaders, brand managers and founders who need creator activity tied to commercial goals.</p>
            <p>We work across the United States, United Kingdom, Canada and Australia, and with brands entering international markets.</p>
            <p>We favour fewer, better-matched creators over volume, and long-term partnerships over one-off placements.</p>
          </div>
        </div>
      </section>

      <section aria-label="How we work" className="py-24 lg:py-32">
        <div className="container-x divide-ink/15 border-ink/15 divide-y border-y">
          {beliefs.map((belief, index) => (
            <Reveal key={belief.title}>
              <article className="grid gap-6 py-14 lg:grid-cols-12 lg:gap-12">
                <span className="text-slate font-mono text-sm lg:col-span-1">{pad(index + 1)}</span>
                <h2 className="text-title font-semibold lg:col-span-4">{belief.title}</h2>
                <div className="text-slate space-y-5 text-lg leading-relaxed lg:col-span-6 lg:col-start-7">
                  {belief.body.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
