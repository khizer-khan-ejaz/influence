"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm, type FieldPath, type UseFormRegisterReturn } from "react-hook-form";
import { ArrowUpRight, Check, CircleAlert, LoaderCircle } from "lucide-react";
import { z } from "zod";

import { budgetOptions, industryOptions, objectiveOptions } from "@/lib/options";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "/api/v1").replace(/\/$/, "");

const values = <T extends readonly { value: string }[]>(options: T) =>
  options.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

const websitePattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120, "Please keep this under 120 characters."),
  email: z.email("Please enter a valid business email address.").max(254),
  company: z.string().trim().min(2, "Please enter your company name.").max(160),
  website: z
    .string()
    .trim()
    .max(300)
    .refine((v) => v === "" || websitePattern.test(v), "Please enter a valid website, e.g. yourcompany.com."),
  industry: z.enum(values(industryOptions), { error: "Please choose an industry." }),
  campaign_objective: z.enum(values(objectiveOptions), { error: "Please choose a campaign objective." }),
  estimated_budget: z.enum(values(budgetOptions), { error: "Please choose a budget range." }),
  message: z.string().trim().max(5000, "Please keep this under 5,000 characters."),
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
    defaultValues: { name: "", email: "", company: "", website: "", message: "", fax_number: "" },
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
        body: JSON.stringify({ ...data, started_at: startedAt }),
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
        setStatus({ state: "error", message: "Please review the highlighted fields and try again." });
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
        <h2 className="text-title font-semibold">Inquiry received</h2>
        <p className="text-paper/75 max-w-md text-lg leading-relaxed">{status.message}</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="text-lime font-semibold underline underline-offset-4">
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby="form-note" className="surface-light grid gap-x-6 gap-y-7 sm:grid-cols-2">
      <Field label="Name" error={errors.name?.message} required>
        {(props) => <input {...props} {...register("name")} autoComplete="name" />}
      </Field>
      <Field label="Business email" error={errors.email?.message} required>
        {(props) => <input {...props} {...register("email")} type="email" autoComplete="email" inputMode="email" />}
      </Field>
      <Field label="Company" error={errors.company?.message} required>
        {(props) => <input {...props} {...register("company")} autoComplete="organization" />}
      </Field>
      <Field label="Company website" error={errors.website?.message} hint="Optional">
        {(props) => <input {...props} {...register("website")} type="url" inputMode="url" autoComplete="url" placeholder="yourcompany.com" />}
      </Field>
      <Field label="Industry" error={errors.industry?.message} required>
        {(props) => <Select props={props} registration={register("industry")} options={industryOptions} />}
      </Field>
      <Field label="Campaign objective" error={errors.campaign_objective?.message} required>
        {(props) => <Select props={props} registration={register("campaign_objective")} options={objectiveOptions} />}
      </Field>
      <Field label="Estimated budget" error={errors.estimated_budget?.message} required className="sm:col-span-2">
        {(props) => <Select props={props} registration={register("estimated_budget")} options={budgetOptions} />}
      </Field>
      <Field
        label="Additional information"
        error={errors.message?.message}
        hint="Optional. Product, timing, markets, creators you admire…"
        className="sm:col-span-2"
      >
        {(props) => <textarea {...props} {...register("message")} rows={5} className={`${props.className} min-h-36 resize-y py-3`} />}
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
                Send inquiry
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

function Select({
  props,
  registration,
  options,
}: {
  props: ControlProps;
  registration: UseFormRegisterReturn;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <select {...props} {...registration} defaultValue="" className={`${props.className} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%230a0f24' stroke-width='2'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10`}>
      <option value="" disabled>
        Select…
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
