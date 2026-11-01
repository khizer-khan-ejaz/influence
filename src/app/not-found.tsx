import type { Metadata } from "next";

import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: { absolute: "Page not found | HiQfluence" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-ink text-paper grain">
      <div className="container-x flex min-h-[70vh] flex-col justify-center py-24">
        <p className="eyebrow text-lime">Error 404</p>
        <h1 className="text-display mt-6 max-w-4xl font-semibold">
          This page has <span className="accent text-lime">moved on.</span>
        </h1>
        <p className="text-paper/70 mt-8 max-w-xl text-xl leading-relaxed">
          The page you were looking for doesn&apos;t exist or is no longer available. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton href="/">Back to homepage</PrimaryButton>
          <SecondaryButton href="/services">Explore Our Services</SecondaryButton>
          <SecondaryButton href="/contact">Contact us</SecondaryButton>
        </div>
      </div>
    </section>
  );
}
