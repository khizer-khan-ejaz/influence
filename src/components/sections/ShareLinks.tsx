"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";

export function ShareLinks({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const item = "border-ink/20 hover:border-ink inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="eyebrow text-slate mr-1">Share</span>
      <a className={item} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
        LinkedIn<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <button type="button" onClick={copy} className={item}>
        {copied ? <Check aria-hidden className="size-4" /> : <LinkIcon aria-hidden className="size-4" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
