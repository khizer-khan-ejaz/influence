import type { ReactNode } from "react";

type SectionHeaderProps = {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  id?: string;
  aside?: ReactNode;
};

export function SectionHeader({ index, label, title, intro, tone = "light", as: Heading = "h2", id, aside }: SectionHeaderProps) {
  const muted = tone === "dark" ? "text-mute" : "text-slate";
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-8">
        <p className={`eyebrow flex items-center gap-3 ${muted}`}>
          {index && <span className={tone === "dark" ? "text-lime" : "text-ink"}>{index}</span>}
          {index && <span aria-hidden className="h-px w-8 bg-current opacity-40" />}
          <span>{label}</span>
        </p>
        <Heading id={id} className="text-headline mt-6 font-semibold">
          {title}
        </Heading>
      </div>
      {(intro || aside) && (
        <div className={`flex flex-col justify-end gap-6 text-lg leading-relaxed lg:col-span-4 ${muted}`}>
          {intro && <p>{intro}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}
