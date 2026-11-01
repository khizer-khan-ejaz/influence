import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { pad } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us: Discuss an Influencer Campaign",
  description:
    "Tell HiQfluence about your product, audience and goals. We'll help identify the creators who can bring your brand closer to its audience.",
  path: "/contact",
});

const nextSteps = [
  { title: "We review your brief", body: "We look at your product, market and objective to understand whether creators are the right fit." },
  { title: "An initial conversation", body: "A short call to discuss audiences, timing, budget and what success should look like." },
  { title: "A tailored recommendation", body: "If it's a good fit, we outline creator types, formats and an approach for your campaign." },
];

export default function ContactPage() {
  return (
    <div className="grid lg:min-h-[calc(100dvh-4.5rem)] lg:grid-cols-12">
      <section aria-labelledby="contact-title" className="bg-ink text-paper grain lg:col-span-5">
        <div className="flex h-full flex-col px-5 pt-10 pb-16 sm:px-8 lg:px-12 lg:pt-14 lg:pb-20">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
          <p className="eyebrow text-lime mt-14 lg:mt-20">Start a conversation</p>
          <h1 id="contact-title" className="text-headline mt-6 font-semibold">
            Tell us what you&apos;re <span className="accent text-lime">building.</span>
          </h1>
          <p className="text-paper/75 mt-8 max-w-md text-xl leading-relaxed">
            Share a few details about your brand and goals. We&apos;ll help identify the creators who can bring your brand closer to its audience.
          </p>

          <div className="mt-auto pt-16">
            <h2 className="eyebrow text-mute">What happens next</h2>
            <ol className="mt-6 space-y-6">
              {nextSteps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="text-lime font-mono text-sm">{pad(index + 1)}</span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-paper/65 mt-1 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section aria-labelledby="form-title" className="lg:col-span-7">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-16 lg:py-20">
          <h2 id="form-title" className="text-title font-semibold">
            Campaign inquiry
          </h2>
          <p className="text-slate mt-3 mb-10">It takes about two minutes. The more context you share, the more useful our first conversation will be.</p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
