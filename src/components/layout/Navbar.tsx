import { primaryCta } from "@/lib/site";

import { PrimaryButton } from "../ui/Button";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";
import { DesktopNavLinks } from "./NavLinks";

export function Navbar() {
  return (
    <header className="bg-ink/95 text-paper sticky top-0 z-50 border-b border-white/10 backdrop-blur-md">
      <nav aria-label="Main" className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <DesktopNavLinks />
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <PrimaryButton href={primaryCta.href} className="min-h-11 px-5 text-sm">
              {primaryCta.label}
            </PrimaryButton>
          </div>
          <MobileNavigation />
        </div>
      </nav>
    </header>
  );
}
