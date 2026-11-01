"use client";

import { useEffect } from "react";

import { SecondaryButton } from "@/components/ui/Button";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-ink text-paper grain">
      <div className="container-x flex min-h-[60vh] flex-col justify-center py-24">
        <p className="eyebrow text-signal">Something went wrong</p>
        <h1 className="text-headline mt-6 max-w-3xl font-semibold">We couldn&apos;t load this page.</h1>
        <p className="text-paper/70 mt-6 max-w-xl text-lg">This is usually temporary. Please try again, or come back in a few minutes.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="bg-lime text-ink inline-flex min-h-12 items-center justify-center rounded-full px-6 font-semibold hover:bg-white"
          >
            Try again
          </button>
          <SecondaryButton href="/">Go to homepage</SecondaryButton>
        </div>
      </div>
    </section>
  );
}
