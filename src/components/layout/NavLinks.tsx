"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/lib/site";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNavLinks() {
  const pathname = usePathname();
  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {mainNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${
                active ? "text-paper" : "text-paper/70 hover:text-paper"
              }`}
            >
              {item.label}
              {active && <span aria-hidden className="bg-lime absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full" />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
