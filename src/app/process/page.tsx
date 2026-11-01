import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Influencer Campaign Process",
  description:
    "How HiQfluence runs influencer campaigns in four stages: Discover, Evaluate, Activate and Measure, from creator research and vetting to execution and reporting.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        label="Our process"
        title={
          <>
            Discover. Evaluate. Activate. <span className="accent text-lime">Measure.</span>
          </>
        }
        intro="Every campaign follows the same four-stage workflow, so you know what is happening, what it is based on and what comes next."
        breadcrumbs={[{ name: "Process", href: "/process" }]}
      >
        <div className="mt-20">
          <ProcessTimeline headingLevel="p" />
        </div>
      </PageHero>

      <section aria-label="Process stages in detail" className="py-24 lg:py-32">
        <div className="container-x">
          <ol className="relative">
            <span aria-hidden className="bg-ink/15 absolute top-0 bottom-0 left-[1.35rem] w-px lg:left-[calc(25%+1.35rem)]" />
            {processSteps.map((step) => (
              <li key={step.number} id={step.name.toLowerCase()} className="relative grid gap-8 pb-20 last:pb-0 lg:grid-cols-4 lg:gap-12">
                <div className="hidden lg:block">
                  <p className="font-display text-ink/10 text-[7rem] leading-none font-semibold tracking-tighter">{step.number}</p>
                </div>
                <Reveal className="relative pl-16 lg:col-span-3">
                  <span className="bg-ink text-lime absolute top-0 left-0 flex size-11 items-center justify-center rounded-full font-mono text-sm">
                    {step.number}
                  </span>
                  <h2 className="text-headline font-semibold">{step.name}</h2>
                  <p className="mt-6 max-w-3xl text-xl leading-relaxed font-medium">{step.summary}</p>
                  <p className="text-slate mt-5 max-w-3xl text-lg leading-relaxed">{step.detail}</p>
                  <div className="mt-10 grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="eyebrow text-slate">Activities</h3>
                      <ul className="mt-4 space-y-2.5">
                        {step.activities.map((activity) => (
                          <li key={activity} className="border-ink/10 flex items-center gap-3 border-b pb-2.5">
                            <span aria-hidden className="bg-lime size-2 rounded-full" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-ink text-paper self-start p-7">
                      <h3 className="eyebrow text-lime">Output</h3>
                      <p className="mt-3 text-lg leading-relaxed">{step.output}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection title="Ready to start with Discover?" body="Tell us about your product, audience and goals. We'll outline how the four stages would apply to your campaign." />
    </>
  );
}
