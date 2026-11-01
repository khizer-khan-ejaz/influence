import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, totalPages, hrefFor }: { page: number; totalPages: number; hrefFor: (page: number) => string }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const item = "flex min-w-11 h-11 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-colors";
  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" className={`${item} border-ink/20 hover:border-ink`}>
          <ChevronLeft aria-hidden className="size-4" />
          <span className="sr-only">Previous page</span>
        </Link>
      ) : null}
      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${item} ${p === page ? "bg-ink text-paper border-ink" : "border-ink/20 hover:border-ink"}`}
        >
          <span className="sr-only">Page </span>
          {p}
        </Link>
      ))}
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} rel="next" className={`${item} border-ink/20 hover:border-ink`}>
          <ChevronRight aria-hidden className="size-4" />
          <span className="sr-only">Next page</span>
        </Link>
      ) : null}
    </nav>
  );
}
