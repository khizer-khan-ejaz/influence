import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicesSchema } from "@/components/seo/schemas";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/content";
import { pad } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

const path = "/services";

export const metadata: Metadata = pageMetadata({
  title: "Influencer Marketing Services for Brands",
  description:
    "Creator discovery and vetting, campaign strategy, creator partnerships, campaign management and performance reporting for brands working with YouTube and social media creators.",
  path,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={
          <>
            From the right creator to <span className="accent text-lime">the final report.</span>
          </>
        }
        intro="Use all five together, or bring us in where your team needs support."
        breadcrumbs={[{ name: "Services", href: path }]}
      >
        <nav aria-label="Services on this page" className="mt-16 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="text-paper/80 hover:border-lime hover:text-lime inline-flex min-h-10 items-center rounded-full border border-white/15 px-4 text-sm transition-colors"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="container-x py-24 lg:py-32">
        <div className="divide-ink/15 border-ink/15 divide-y border-y">
          {services.map((service, index) => (
            <section key={service.slug} id={service.slug} aria-labelledby={`${service.slug}-title`} className="scroll-mt-24 py-14 lg:py-20">
              <Reveal className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span className="text-slate font-mono text-sm">{pad(index + 1)}</span>
                  <h2 id={`${service.slug}-title`} className="text-title mt-4 font-semibold">
                    {service.title}
                  </h2>
                  <p className="text-slate mt-4 text-lg leading-relaxed">{service.summary}</p>
                </div>
                <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
                  <div>
                    <h3 className="eyebrow text-slate">Includes</h3>
                    <ul className="mt-5 space-y-3">
                      {service.includes.map((item) => (
                        <li key={item} className="flex gap-3 leading-snug">
                          <span aria-hidden className="bg-lime mt-2 size-1.5 shrink-0 rounded-full ring-2 ring-ink/80" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="eyebrow text-slate">Why it matters</h3>
                    <p className="font-serif mt-5 text-2xl leading-snug italic">{service.why}</p>
                  </div>
                </div>
              </Reveal>
            </section>
          ))}
        </div>
      </div>

      <CTASection title="Not sure which creators fit your brand?" body="Share your audience and goal. We'll show you who is worth a conversation." cta="Find the Right Creators" />

      <JsonLd data={servicesSchema(path)} />
    </>
  );
}
