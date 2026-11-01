"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { ArrowUpRight, Check, CircleAlert, LoaderCircle } from "lucide-react";
import { z } from "zod";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "/api/v1").replace(/\/$/, "");

/*
 * The inquiries API also stores industry, objective and budget. The form no longer asks for them,
 * so neutral "not specified" values are sent; the details come from the message instead.
 */
const unaskedFields = { industry: "other", campaign_objective: "not_sure", estimated_budget: "undecided" } as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120, "Please keep this under 120 characters."),
  email: z.email("Please enter a valid email address.").max(254),
  company: z.string().trim().min(2, "Please enter your company name.").max(160),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two is enough: what you're launching and who it's for.")
    .max(5000, "Please keep this under 5,000 characters."),
  fax_number: z.string().optional(),
});

type FormValues = z.input<typeof schema>;
type Status = { state: "idle" } | { state: "success"; message: string } | { state: "error"; message: string };

const fieldNames = new Set<string>(Object.keys(schema.shape));

export function ContactForm() {
  // When the form was first rendered on this device; submissions completed implausibly fast are discarded server-side.
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const successRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", company: "", message: "", fax_number: "" },
  });

  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (data: FormValues) => {
    setStatus({ state: "idle" });
    try {
      const response = await fetch(`${API_URL}/inquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, ...unaskedFields, started_at: startedAt }),
      });
      const body: unknown = await response.json().catch(() => ({}));

      if (response.ok) {
        const message = isRecord(body) && typeof body.detail === "string" ? body.detail : "Thank you. Your inquiry has been received.";
        setStatus({ state: "success", message });
        reset();
        return;
      }
      if (response.status === 400 && isRecord(body)) {
        let mapped = false;
        for (const [field, messages] of Object.entries(body)) {
          if (fieldNames.has(field) && Array.isArray(messages)) {
            setError(field as FieldPath<FormValues>, { type: "server", message: String(messages[0]) }, { shouldFocus: !mapped });
            mapped = true;
          }
        }
        setStatus({
          state: "error",
          message: mapped ? "Please review the highlighted fields and try again." : "We couldn't send your message. Please try again in a few minutes.",
        });
        return;
      }
      if (response.status === 429) {
        setStatus({ state: "error", message: "We've received several submissions from your network recently. Please try again later." });
        return;
      }
      setStatus({ state: "error", message: "Something went wrong on our side. Please try again in a few minutes." });
    } catch {
      setStatus({ state: "error", message: "We couldn't reach our server. Please check your connection and try again." });
    }
  };

  if (status.state === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="bg-ink text-paper flex flex-col items-start gap-6 p-8 outline-none sm:p-12">
        <span className="bg-lime text-ink flex size-12 items-center justify-center rounded-full">
          <Check aria-hidden className="size-6" strokeWidth={3} />
        </span>
        <h2 className="text-title font-semibold">Thanks, we&apos;ve got it.</h2>
        <p className="text-paper/75 max-w-md text-lg leading-relaxed">{status.message}</p>
        <p className="text-paper/75 max-w-md leading-relaxed">
          Next step: watch your inbox for our reply. Meanwhile,{" "}
          <Link href="/insights" className="text-paper underline underline-offset-4">
            browse our insights
          </Link>
          .
        </p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="text-lime font-semibold underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby="form-note" className="surface-light grid gap-x-6 gap-y-7 sm:grid-cols-2">
      <Field label="Name" error={errors.name?.message} required>
        {(props) => <input {...props} {...register("name")} autoComplete="name" />}
      </Field>
      <Field label="Email address" error={errors.email?.message} required>
        {(props) => <input {...props} {...register("email")} type="email" autoComplete="email" inputMode="email" />}
      </Field>
      <Field label="Company" error={errors.company?.message} required className="sm:col-span-2">
        {(props) => <input {...props} {...register("company")} autoComplete="organization" />}
      </Field>
      <Field
        label="What are you working on?"
        error={errors.message?.message}
        hint="Your product, who it's for and what you'd like creators to help with."
        required
        className="sm:col-span-2"
      >
        {(props) => <textarea {...props} {...register("message")} rows={6} className={`${props.className} min-h-40 resize-y py-3`} />}
      </Field>

      {/* Honeypot: hidden from people and assistive technology, often filled in by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Fax number
          <input type="text" tabIndex={-1} autoComplete="off" {...register("fax_number")} />
        </label>
      </div>

      <div className="flex flex-col gap-5 sm:col-span-2">
        {status.state === "error" && (
          <p role="alert" className="text-signal flex items-start gap-2 font-medium">
            <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
            {status.message}
          </p>
        )}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p id="form-note" className="text-slate text-sm">
            Fields marked <span aria-hidden>*</span>
            <span className="sr-only">with an asterisk</span> are required. See our{" "}
            <a href="/privacy" className="underline underline-offset-2">
              privacy notice
            </a>
            .
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-ink text-paper hover:bg-ink-3 inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-8 font-semibold transition-colors disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle aria-hidden className="size-5 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send message
                <ArrowUpRight aria-hidden className="size-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

type ControlProps = {
  id: string;
  className: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
};

const controlClass =
  "border-ink/25 bg-white/60 text-ink placeholder:text-ink/35 focus:border-ink w-full min-h-13 rounded-[4px] border px-4 text-base transition-colors outline-none aria-[invalid=true]:border-signal";

function Field({
  label,
  error,
  hint,
  required,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && (
          <span aria-hidden className="text-signal ml-0.5">
            *
          </span>
        )}
      </label>
      {children({ id, className: controlClass, "aria-invalid": Boolean(error), "aria-describedby": describedBy, "aria-required": required })}
      {hint && (
        <p id={`${id}-hint`} className="text-slate text-sm">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-signal flex items-center gap-1.5 text-sm font-medium">
          <CircleAlert aria-hidden className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
