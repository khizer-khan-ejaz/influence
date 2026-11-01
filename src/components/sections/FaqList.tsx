import { Plus } from "lucide-react";

import type { Faq } from "@/lib/types";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-ink/15 border-t">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-ink/15 border-b">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-xl font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
            <h3 className="font-display">{faq.question}</h3>
            <Plus aria-hidden className="mt-1 size-5 shrink-0 transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <p className="text-slate max-w-3xl pb-7 text-lg leading-relaxed">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
