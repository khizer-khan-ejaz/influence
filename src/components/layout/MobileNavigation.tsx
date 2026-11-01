"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { mainNav, primaryCta } from "@/lib/site";

import { isActive } from "./NavLinks";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu after navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="text-paper flex size-11 items-center justify-center rounded-full border border-white/20"
      >
        <Menu aria-hidden className="size-5" />
        <span className="sr-only">Open menu</span>
      </button>

      {/* Native <dialog> provides focus trapping, Escape to close and inert background. */}
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Site menu"
        className="bg-ink text-paper m-0 h-dvh max-h-none w-full max-w-none p-0 backdrop:bg-transparent"
      >
        <div className="container-x flex h-full flex-col py-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-[1.35rem] font-semibold tracking-[-0.04em]">
              Hi<span className="accent text-lime text-[1.55rem]">Q</span>fluence
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-11 items-center justify-center rounded-full border border-white/20"
            >
              <X aria-hidden className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-12 flex-1">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="font-display flex items-center justify-between py-4 text-3xl font-semibold tracking-tight aria-[current=page]:text-lime"
                  >
                    {item.label}
                    <ArrowUpRight aria-hidden className="size-6 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={primaryCta.href}
            className="bg-lime text-ink mt-8 flex min-h-14 items-center justify-center gap-2 rounded-full text-lg font-semibold"
          >
            {primaryCta.label}
            <ArrowUpRight aria-hidden className="size-5" />
          </Link>
        </div>
      </dialog>
    </div>
  );
}
