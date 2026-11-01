import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact: Discuss an Influencer Campaign",
  description: "Planning a campaign with YouTube or social media creators? Tell HiQfluence what you're working on and we'll reply by email.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="grid lg:min-h-[calc(100dvh-4.5rem)] lg:grid-cols-12">
      <section aria-labelledby="contact-title" className="bg-ink text-paper grain lg:col-span-5">
        <div className="flex h-full flex-col px-5 pt-10 pb-16 sm:px-8 lg:px-12 lg:pt-14 lg:pb-20">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
          <p className="eyebrow text-lime mt-14 lg:mt-20">Start a conversation</p>
          <h1 id="contact-title" className="text-headline mt-6 font-semibold">
            Let&apos;s find your <span className="accent text-lime">creators.</span>
          </h1>
          <p className="text-paper/75 mt-8 max-w-md text-xl leading-relaxed">
            A few lines about your product and audience is enough to start.
          </p>
          <div className="mt-auto pt-16">
            <h2 className="eyebrow text-mute">What happens next</h2>
            <p className="text-paper/75 mt-4 max-w-md leading-relaxed">
              We&apos;ll reply by email. If creators suit your goal, we&apos;ll suggest a short call to plan the details.
            </p>
          </div>
        </div>
      </section>
      <section aria-label="Inquiry form" className="lg:col-span-7">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
