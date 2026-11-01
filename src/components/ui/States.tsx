import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";

export function LoadingState({ label = "Loading content", rows = 3 }: { label?: string; rows?: number }) {
  return (
    <div role="status" aria-live="polite" className="grid gap-6 md:grid-cols-3">
      <span className="sr-only">{label}…</span>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} aria-hidden className="space-y-4">
          <div className="bg-ink/8 aspect-[4/3] animate-pulse rounded-sm" />
          <div className="bg-ink/8 h-4 w-1/3 animate-pulse rounded-sm" />
          <div className="bg-ink/8 h-6 w-4/5 animate-pulse rounded-sm" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  title = "This section is temporarily unavailable",
  message = "We couldn't load this content right now. Please refresh the page or try again shortly.",
  action,
}: {
  title?: string;
  message?: string;
  action?: ReactNode;
}) {
  return (
    <div role="alert" className="border-current/15 flex flex-col items-start gap-4 border-l-2 py-2 pl-6">
      <CircleAlert aria-hidden className="text-signal size-6" />
      <p className="text-xl font-semibold">{title}</p>
      <p className="max-w-xl opacity-75">{message}</p>
      {action}
    </div>
  );
}

export function EmptyState({ title, message, action }: { title: string; message: ReactNode; action?: ReactNode }) {
  return (
    <div className="border-current/20 flex flex-col items-start gap-4 border border-dashed p-8 sm:p-12">
      <p className="text-title font-semibold">{title}</p>
      <div className="max-w-2xl text-lg leading-relaxed opacity-75">{message}</div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
