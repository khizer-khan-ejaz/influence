import { Check, Play } from "lucide-react";

/*
 * Art-directed, illustrative creator-content previews built in CSS/SVG.
 * They depict content formats, not real creators, brands or results.
 */

const scenes = {
  studio: "bg-[radial-gradient(120%_90%_at_70%_20%,#3b4bd8_0%,#1b2350_45%,#0a0f24_100%)]",
  desk: "bg-[radial-gradient(110%_80%_at_20%_10%,#c8f53c33_0%,#1b2350_40%,#0a0f24_100%)]",
  warm: "bg-[radial-gradient(120%_100%_at_80%_90%,#ff7a5966_0%,#2a1d3f_45%,#0a0f24_100%)]",
  daylight: "bg-[radial-gradient(120%_100%_at_30%_0%,#f5f2eb_0%,#c9c3b4_45%,#6d6a62_100%)]",
} as const;

export type Scene = keyof typeof scenes;

function SceneArt({ scene }: { scene: Scene }) {
  return (
    <div aria-hidden className={`absolute inset-0 ${scenes[scene]}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:10%_10%]" />
      {/* Abstract subject: a figure silhouette and a product on a desk line. */}
      <div className="absolute bottom-0 left-[18%] h-[62%] w-[26%] rounded-t-full bg-black/35 blur-[1px]" />
      <div className="absolute bottom-[22%] left-[22%] size-[13%] rounded-full bg-black/40" />
      <div className="absolute right-[14%] bottom-[18%] h-[22%] w-[24%] rounded-md bg-white/10 ring-1 ring-white/20 backdrop-blur-sm" />
      <div className="absolute inset-x-0 bottom-[16%] h-px bg-white/15" />
    </div>
  );
}

export function VideoFrame({
  scene = "studio",
  label,
  segment,
  className = "",
}: {
  scene?: Scene;
  label: string;
  segment?: string;
  className?: string;
}) {
  return (
    <figure className={`group relative overflow-hidden rounded-[6px] bg-ink-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/10 ${className}`}>
      <div className="relative aspect-video">
        <SceneArt scene={scene} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-ink transition-transform duration-300 group-hover:scale-105">
            <Play aria-hidden className="ml-0.5 size-5 fill-current" />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3">
          <div className="relative h-1 w-full rounded-full bg-white/25">
            <div className="absolute inset-y-0 left-0 w-[38%] rounded-full bg-white/80" />
            <div className="absolute inset-y-0 left-[46%] w-[14%] rounded-full bg-lime" />
          </div>
          {segment && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-sm bg-black/50 px-2 py-0.5 font-mono text-[0.66rem] text-lime backdrop-blur">
              <span className="size-1.5 rounded-full bg-lime" />
              {segment}
            </p>
          )}
        </div>
      </div>
      <span className="absolute top-3 left-3 rounded-full bg-black/45 px-2 py-0.5 text-[0.6rem] font-semibold tracking-wide text-white/85 uppercase backdrop-blur">
        Illustrative
      </span>
      <figcaption className="truncate px-4 py-3 text-[0.78rem] text-paper/80">{label}</figcaption>
    </figure>
  );
}

export function PhoneFrame({ scene = "warm", caption, className = "" }: { scene?: Scene; caption: string; className?: string }) {
  return (
    <figure className={`relative w-full overflow-hidden rounded-[1.6rem] bg-ink p-1.5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] ring-1 ring-white/15 ${className}`}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.25rem]">
        <SceneArt scene={scene} />
        <div className="absolute inset-x-0 top-0 flex justify-center pt-2">
          <span className="h-1.5 w-12 rounded-full bg-black/60" />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-16">
          <p className="mb-1.5 inline-block rounded-sm bg-white/15 px-1.5 py-0.5 text-[0.6rem] font-semibold tracking-wide text-white uppercase backdrop-blur">
            Paid partnership
          </p>
          <figcaption className="text-[0.75rem] leading-snug font-medium text-white">{caption}</figcaption>
          <div aria-hidden className="mt-2 space-y-1">
            <div className="h-1 w-4/5 rounded-full bg-white/30" />
            <div className="h-1 w-3/5 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </figure>
  );
}

export function StatusChip({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-[0.8rem] font-semibold text-ink shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)] ${className}`}>
      <span className="flex size-4 items-center justify-center rounded-full bg-lime">
        <Check aria-hidden className="size-3" strokeWidth={3} />
      </span>
      {children}
    </p>
  );
}

/** Asymmetric hero composition: long-form review, short-form clip and workflow status chips. */
export function CreatorCollage() {
  return (
    <div
      role="img"
      aria-label="Illustration of creator content formats: a long-form YouTube review with a sponsored segment highlighted on the timeline, and a vertical short-form clip labelled as a paid partnership."
      className="relative mx-auto w-full max-w-[38rem] pt-6 pb-10 lg:pt-0"
    >
      <VideoFrame scene="studio" label="Long-form review · YouTube" segment="Integration 06:12 – 07:05" className="w-[88%] [&_figcaption]:pr-[36%] sm:[&_figcaption]:pr-[30%]" />
      <div className="absolute right-0 bottom-0 w-[36%] translate-y-6 sm:w-[32%]">
        <PhoneFrame scene="warm" caption="Day-one set-up: what I'd change" />
      </div>
      <StatusChip className="absolute top-0 right-[6%] sm:top-[-1rem]">Audience vetted</StatusChip>
      <div className="absolute top-[38%] left-[-1rem] hidden sm:block">
        <StatusChip>Brief approved</StatusChip>
      </div>
    </div>
  );
}
