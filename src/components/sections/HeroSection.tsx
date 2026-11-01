import { PrimaryButton, SecondaryButton } from "../ui/Button";
import { CreatorCollage } from "../visuals/CreatorFrames";
import { Marquee } from "./Marquee";

export function HeroSection({ industries }: { industries: string[] }) {
  return (
    <section aria-labelledby="hero-title" className="bg-ink text-paper grain relative overflow-hidden">
      <div className="container-x grid items-center gap-14 pt-14 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="eyebrow text-mute animate-rise flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-lime">Influencer marketing agency</span>
            <span aria-hidden className="h-px w-6 bg-current opacity-50" />
            <span>US · UK · Canada · Australia</span>
          </p>
          <h1 id="hero-title" className="text-display animate-rise mt-8 font-semibold [animation-delay:80ms]">
            Make Influence <span className="accent text-lime">Work Harder.</span>
          </h1>
          <p className="text-paper/75 animate-rise mt-8 max-w-xl text-xl leading-relaxed [animation-delay:160ms]">
            We connect brands with creators who move audiences, build trust and influence purchasing decisions.
          </p>
          <div className="animate-rise mt-10 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <PrimaryButton href="/contact">Discuss a Campaign</PrimaryButton>
            <SecondaryButton href="/process">Explore Our Approach</SecondaryButton>
          </div>
        </div>
        <div className="animate-rise [animation-delay:200ms] lg:col-span-5">
          <CreatorCollage />
        </div>
      </div>
      {industries.length > 0 && <Marquee items={industries} />}
    </section>
  );
}
