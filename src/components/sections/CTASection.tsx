import type { ReactNode } from "react";

import { PrimaryButton } from "../ui/Button";

export function CTASection({
  title = "Your Next Campaign Starts With the Right Creator.",
  body = "Tell us what you're launching and who needs to hear about it. We'll suggest where to start.",
  cta = "Start a Conversation",
  href = "/contact",
}: {
  title?: ReactNode;
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-lime text-ink relative overflow-hidden">
      <div className="container-x grid gap-10 py-24 lg:grid-cols-12 lg:items-end lg:py-32">
        <h2 id="cta-title" className="text-headline font-semibold lg:col-span-8">
          {title}
        </h2>
        <div className="lg:col-span-4">
          <p className="text-ink/75 text-lg leading-relaxed">{body}</p>
          <PrimaryButton href={href} tone="light" className="mt-8">
            {cta}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
