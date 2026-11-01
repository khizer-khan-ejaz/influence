import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { IndustrySection } from "@/components/sections/IndustrySection";
import { PageHero } from "@/components/sections/PageHero";
import { ErrorState } from "@/components/ui/States";
import { api, settle } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Influencer Marketing by Industry",
  description:
    "Influencer marketing for AI, SaaS, B2B tech, consumer electronics, productivity, DIY and lifestyle brands, with creator strategies built for each category.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const { data: industries, error } = await settle(api.industries());
  return (
    <>
      <PageHero
        label="Industries"
        title={
          <>
            Specialists in categories where <span className="accent text-lime">trust decides.</span>
          </>
        }
        intro="Every category buys differently. We tailor creator selection, formats and measurement to how your customers research, compare and choose."
        breadcrumbs={[{ name: "Industries", href: "/industries" }]}
      />
      <section aria-labelledby="industry-list" className="bg-ink text-paper pb-24 lg:pb-32">
        <div className="container-x">
          <h2 id="industry-list" className="sr-only">
            Industries we work with
          </h2>
          {error ? <ErrorState /> : <IndustrySection industries={industries} />}
        </div>
      </section>
      <CTASection
        title="Don't see your category?"
        body="If your buyers research before they purchase and trust expert voices, we can probably help. Tell us about your product."
      />
    </>
  );
}
