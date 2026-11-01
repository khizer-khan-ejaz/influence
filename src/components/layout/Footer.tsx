import Link from "next/link";

import { mainNav, primaryCta, siteConfig } from "@/lib/site";

import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-paper relative overflow-hidden">
      <div className="container-x pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Logo className="text-3xl" />
            <p className="text-mute mt-5 max-w-sm text-lg leading-relaxed">
              {siteConfig.tagline}. Influencer marketing for brands with YouTube and social media creators.
            </p>
            <Link
              href={primaryCta.href}
              className="text-lime mt-8 inline-flex items-center gap-2 text-lg font-semibold underline decoration-lime/40 underline-offset-8 hover:decoration-lime"
            >
              Start a Conversation
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 lg:col-span-5 lg:col-start-8">
            <div>
              <p className="eyebrow text-mute">Explore</p>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {[...mainNav, { href: "/contact", label: "Contact" }].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-paper/80 hover:text-lime transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-mute">Markets</p>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {siteConfig.markets.map((market) => (
                  <li key={market} className="text-paper/80">
                    {market}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p aria-hidden className="font-display text-paper/[0.04] mt-20 text-[18vw] leading-none font-semibold tracking-[-0.06em] select-none lg:text-[13rem]">
          HiQfluence
        </p>

        <div className="text-mute mt-6 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HiQfluence. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-paper">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
