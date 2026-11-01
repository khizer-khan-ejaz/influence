import type { Metadata } from "next";
import { Check } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationId } from "@/components/seo/schemas";
import { ErrorState } from "@/components/ui/States";
import { api, settle } from "@/lib/api";
import { pad, paragraphs } from "@/lib/format";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Influencer Marketing Services",
  description:
    "Creator discovery, audience vetting, negotiation, campaign strategy, YouTube integrations, campaign management, reporting and long-term creator partnerships.",
  path: "/services",
});

export default async function ServicesPage() {
  const { data: services, error } = await settle(api.services());

  return (
    <>
      <PageHero
        label="Services"
        title={
          <>
            Influencer marketing, <span className="accent text-lime">end to end.</span>
          </>
        }
        intro="Eight services that cover the whole campaign: from finding the right creators to proving what they delivered. Use them together or where you need us most."
        breadcrumbs={[{ name: "Services", href: "/services" }]}
      >
        {services && services.length > 0 && (
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
        )}
      </PageHero>

      <div className="container-x py-24 lg:py-32">
        {error ? (
          <ErrorState />
        ) : (
          <div className="divide-ink/15 border-ink/15 divide-y border-y">
            {services.map((service, index) => (
              <section key={service.slug} id={service.slug} aria-labelledby={`${service.slug}-title`} className="grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-28">
                    <p className="eyebrow text-slate flex items-center gap-3">
                      <span className="text-ink">{pad(index + 1)}</span>
                      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                      {service.eyebrow}
                    </p>
                    <h2 id={`${service.slug}-title`} className="text-title mt-5 font-semibold lg:text-[2.75rem] lg:leading-[1.02]">
                      {service.title}
                    </h2>
                    <p className="text-slate mt-6 text-lg leading-relaxed">{service.description}</p>
                  </div>
                </div>
                <div className="space-y-12 lg:col-span-6 lg:col-start-7">
                  <div>
                    <h3 className="eyebrow text-slate">What it involves</h3>
                    <div className="mt-4 space-y-4 text-lg leading-relaxed">
                      {paragraphs(service.content).map((p) => (
                        <p key={p.slice(0, 32)}>{p}</p>
                      ))}
                    </div>
                  </div>
                  {service.how_it_works.length > 0 && (
                    <div>
                      <h3 className="eyebrow text-slate">How it works</h3>
                      <ol className="mt-5 space-y-4">
                        {service.how_it_works.map((step, i) => (
                          <li key={step} className="flex gap-5">
                            <span className="bg-ink text-lime flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-xs">{i + 1}</span>
                            <span className="pt-1 leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {service.business_value && (
                    <div className="bg-ink text-paper p-8">
                      <h3 className="eyebrow text-lime">Business value</h3>
                      <p className="mt-4 text-xl leading-relaxed">{service.business_value}</p>
                    </div>
                  )}
                  {service.deliverables.length > 0 && (
                    <div>
                      <h3 className="eyebrow text-slate">Deliverables</h3>
                      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check aria-hidden className="bg-lime mt-0.5 size-5 shrink-0 rounded-full p-0.5" strokeWidth={3} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {services && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "HiQfluence influencer marketing services",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: service.title,
                description: service.description,
                serviceType: "Influencer marketing",
                url: absoluteUrl(`/services#${service.slug}`),
                provider: { "@id": organizationId },
              },
            })),
          }}
        />
      )}

      <CTASection />
    </>
  );
}
