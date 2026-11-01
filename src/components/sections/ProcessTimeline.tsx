import { processSteps } from "@/lib/content";

/** Horizontal four-stage timeline with a connecting rail. */
export function ProcessTimeline({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" | "p" }) {
  const Heading = headingLevel;
  return (
    <ol className="relative grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      <span aria-hidden className="bg-lime/40 absolute top-[1.4rem] right-0 left-0 hidden h-px lg:block" />
      {processSteps.map((step) => (
        <li key={step.number} className="relative">
          <div className="flex items-center gap-4">
            <span className="bg-ink border-lime text-lime relative z-10 flex size-11 items-center justify-center rounded-full border font-mono text-sm">
              {step.number}
            </span>
            <span aria-hidden className="bg-lime/40 h-px flex-1 lg:hidden" />
          </div>
          <Heading className="font-display mt-8 text-4xl font-semibold tracking-tight">{step.name}</Heading>
          <p className="text-paper/70 mt-4 leading-relaxed">{step.summary}</p>
        </li>
      ))}
    </ol>
  );
}
