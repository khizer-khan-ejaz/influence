import Link from "next/link";

import { mainNav, primaryCta, siteConfig } from "@/lib/site";

import { Logo } from "./Logo";

const industryLinks = [
  { href: "/industries/ai", label: "AI" },
  { href: "/industries/saas", label: "SaaS & Software" },
  { href: "/industries/technology", label: "B2B Technology" },
  { href: "/industries/consumer-electronics", label: "Consumer Electronics" },
  { href: "/industries/productivity", label: "Productivity & Workspace" },
  { href: "/industries/diy-home-improvement", label: "DIY & Home Improvement" },
  { href: "/industries/lifestyle", label: "Lifestyle & Consumer" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper relative overflow-hidden">
      <div className="container-x pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="text-3xl" />
            <p className="text-mute mt-5 max-w-sm text-lg leading-relaxed">
              {siteConfig.tagline}. An influencer marketing agency for technology and modern consumer brands.
            </p>
            <Link
              href={primaryCta.href}
              className="group text-lime mt-8 inline-flex items-center gap-2 text-lg font-semibold underline decoration-lime/40 underline-offset-8 hover:decoration-lime"
            >
              Start a conversation
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn title="Agency" links={[...mainNav, { href: "/contact", label: "Contact" }]} />
            <FooterColumn title="Industries" links={industryLinks} />
            <div>
              <p className="eyebrow text-mute">Markets</p>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {siteConfig.markets.map((market) => (
                  <li key={market} className="text-paper/80">
                    {market}
                  </li>
                ))}
                <li className="text-paper/80">International</li>
              </ul>
            </div>
          </div>
        </div>

        <p aria-hidden className="font-display text-paper/[0.04] mt-20 text-[18vw] leading-none font-semibold tracking-[-0.06em] select-none lg:text-[13rem]">
          HiQfluence
        </p>

        <div className="text-mute mt-6 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HiQfluence. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-paper">
                Privacy
              </Link>
            </li>
            <li>
              <a href="/sitemap.xml" className="hover:text-paper">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <p className="eyebrow text-mute">{title}</p>
      <ul className="mt-5 space-y-3 text-[0.95rem]">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-paper/80 hover:text-lime transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
