import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { PrimaryButton, SecondaryButton, TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CreatorCollage } from "@/components/visuals/CreatorFrames";
import { channels, industries, services } from "@/lib/content";
import { pad } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "HiQfluence | Influencer Marketing Agency for Brands",
  absoluteTitle: true,
  description:
    "Connect your brand with vetted YouTube and social media creators. HiQfluence manages creator discovery, campaign strategy and partnerships built to drive measurable results.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="bg-ink text-paper grain relative overflow-hidden">
        <div className="container-x grid items-center gap-14 pt-14 pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-28">
          <div className="lg:col-span-7">
            <p className="eyebrow text-lime animate-rise">Influencer marketing agency</p>
            <h1 id="hero-title" className="text-display animate-rise mt-8 font-semibold [animation-delay:80ms]">
              Influencer Marketing for <span className="accent text-lime">Brands.</span>
            </h1>
            <p className="text-paper/75 animate-rise mt-8 max-w-xl text-xl leading-relaxed [animation-delay:160ms]">
              We connect brands with vetted YouTube and social media creators who move audiences, build trust and drive measurable results.
            </p>
            <div className="animate-rise mt-10 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
              <PrimaryButton href="/contact">Discuss a Campaign</PrimaryButton>
              <SecondaryButton href="/services">Explore Our Services</SecondaryButton>
            </div>
          </div>
          <div className="animate-rise [animation-delay:200ms] lg:col-span-5">
            <CreatorCollage />
          </div>
        </div>
      </section>

      {/* What we do */}
      <section aria-labelledby="what-we-do" className="py-24 lg:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-slate">What we do</p>
            <h2 id="what-we-do" className="text-headline mt-6 font-semibold">
              Your customers already follow someone. <span className="accent">We find who.</span>
            </h2>
          </div>
          <Reveal className="flex flex-col justify-end gap-10 lg:col-span-4 lg:col-start-9">
            <p className="text-slate text-lg leading-relaxed">
              HiQfluence matches brands with the YouTube and social media creators their customers trust, then runs the partnership from first contact to final report.
            </p>
            <div>
              <p className="eyebrow text-slate">Where we find them</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {channels.map((channel) => (
                  <li key={channel} className="border-ink/20 rounded-full border px-3.5 py-1.5 text-sm font-medium">
                    {channel}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" aria-labelledby="industries-title" className="bg-ink text-paper py-24 lg:py-36">
        <div className="container-x">
          <SectionHeader
            id="industries-title"
            tone="dark"
            label="Industries we serve"
            title={
              <>
                Built for products people <span className="accent text-lime">research</span> before they buy.
              </>
            }
          />
          <ul className="mt-16 grid gap-px overflow-hidden bg-white/10 lg:mt-20 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <li key={industry.slug} className="bg-ink flex flex-col gap-6 py-10 lg:px-10 lg:first:pl-0">
                <span className="text-lime font-mono text-sm">{pad(index + 1)}</span>
                <h3 className="font-display text-4xl font-semibold tracking-tight">{industry.title}</h3>
                <p className="text-paper/70 text-lg leading-relaxed">{industry.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="py-24 lg:py-36">
        <div className="container-x">
          <SectionHeader
            id="services-title"
            label="Our services"
            title="Five services. One accountable team."
            aside={<TextLink href="/services">See what each includes</TextLink>}
          />
          <ol className="divide-ink/15 border-ink/15 mt-16 divide-y border-y lg:mt-20">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group grid items-baseline gap-x-8 gap-y-2 py-8 sm:grid-cols-12 lg:py-10"
                >
                  <span className="text-slate font-mono text-sm sm:col-span-1">{pad(index + 1)}</span>
                  <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-ink-3 sm:col-span-6 lg:text-3xl">
                    {service.title}
                  </h3>
                  <p className="text-slate sm:col-span-4">{service.summary}</p>
                  <ArrowUpRight
                    aria-hidden
                    className="text-ink/30 group-hover:text-ink hidden size-6 justify-self-end transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:col-span-1 sm:block"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" aria-labelledby="approach-title" className="bg-ink-2 text-paper py-24 lg:py-36">
        <div className="container-x">
          <SectionHeader id="approach-title" tone="dark" label="Our approach" title="Four steps. No guesswork." />
          <div className="mt-16 lg:mt-24">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
