"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import { Loader2, CheckCircle, AlertCircle, Info } from "lucide-react";

const phoneRegex = /^[+\d][\d\s\-()]*$/;

const inquirySchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  company: z.string().trim().optional().default(""),
  address: z.string().trim().optional().default(""),
  city: z.string().trim().min(1, "City is required"),
  country: z.string().trim().min(1, "Country is required"),
  phone: z.string().trim().min(1, "Phone is required").regex(phoneRegex, "Enter a valid phone number"),
  cellPhone: z.string().trim().min(1, "Cell phone is required").regex(phoneRegex, "Enter a valid cell phone number"),
  fax: z.string().trim().optional().default("").refine(
    (val) => val === "" || phoneRegex.test(val),
    "Enter a valid fax number"
  ),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  website: z.string().trim().optional().default("").refine(
    (val) => val === "" || /^https?:\/\/.+/i.test(val),
    "Enter a valid URL starting with http:// or https://"
  ),
  interestedIn: z.string().trim().optional().default(""),
  omegaLineProduct: z.string().trim().optional().default(""),
  saltType: z.string().trim().optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message must be under 5000 characters"),
  consent: z.boolean().refine((val) => val === true, "You must accept the privacy terms"),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

type ProductOption = {
  slug: string;
  name: string;
};

type ContactFormProps = {
  locale: string;
  preselectedProduct?: string | null;
  products?: ProductOption[];
  isReviewMode?: boolean;
};

export function ContactForm({ locale, preselectedProduct, products = [], isReviewMode = false }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<InquiryFormValues>({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    cellPhone: "",
    fax: "",
    email: "",
    website: "",
    interestedIn: "",
    omegaLineProduct: preselectedProduct ?? "",
    saltType: "",
    message: "",
    consent: false as unknown as true,
  });

  const updateField = useCallback((field: keyof InquiryFormValues, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFieldErrors({});

      if (isReviewMode) {
        setStatus("success");
        return;
      }

      const result = inquirySchema.safeParse(form);
      if (!result.success) {
        const errors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const path = issue.path.join(".");
          if (!errors[path]) errors[path] = issue.message;
        }
        setFieldErrors(errors);
        return;
      }

      setStatus("loading");
      setErrorMessage("");

      try {
        const res = await fetch("/api/submit-inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...result.data, locale }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "Submission failed" }));
          throw new Error(err.error ?? "Submission failed");
        }

        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    },
    [form, locale, isReviewMode]
  );

  if (status === "success") {
    if (isReviewMode) {
      return (
        <div className="flex flex-col items-center gap-4 rounded-md border border-amber-200 bg-amber-50 p-10 text-center" role="status" aria-live="polite">
          <Info aria-hidden="true" size={40} className="text-amber-600" />
          <h3 className="text-xl font-bold text-amber-800">Review Preview Mode</h3>
          <p className="max-w-md text-sm text-amber-700">
            This form is disabled in the client review preview.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-4 rounded-md border border-green-200 bg-green-50 p-10 text-center" role="status" aria-live="polite">
        <CheckCircle aria-hidden="true" size={40} className="text-green-600" />
        <h3 className="text-xl font-bold text-green-800">Inquiry Submitted</h3>
        <p className="max-w-md text-sm text-green-700">
          Thank you for your inquiry. Our team will review your requirements and get back to you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {isReviewMode ? (
        <div className="mb-6 flex items-center gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800" role="status" aria-live="polite">
          <Info aria-hidden="true" size={18} className="shrink-0" />
          <span>This form is disabled in the client review preview. No data will be submitted.</span>
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="firstName" label="First Name" error={fieldErrors.firstName} required>
          <input id="firstName" value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} type="text" className={inputClass} placeholder="First name" aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined} aria-invalid={fieldErrors.firstName ? "true" : undefined} />
        </Field>
        <Field name="lastName" label="Last Name" error={fieldErrors.lastName} required>
          <input id="lastName" value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} type="text" className={inputClass} placeholder="Last name" aria-describedby={fieldErrors.lastName ? "lastName-error" : undefined} aria-invalid={fieldErrors.lastName ? "true" : undefined} />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field name="company" label="Company" error={fieldErrors.company}>
          <input id="company" value={form.company} onChange={(e) => updateField("company", e.target.value)} type="text" className={inputClass} placeholder="Company name" aria-describedby={fieldErrors.company ? "company-error" : undefined} aria-invalid={fieldErrors.company ? "true" : undefined} />
        </Field>
        <Field name="address" label="Address" error={fieldErrors.address}>
          <input id="address" value={form.address} onChange={(e) => updateField("address", e.target.value)} type="text" className={inputClass} placeholder="Street address" aria-describedby={fieldErrors.address ? "address-error" : undefined} aria-invalid={fieldErrors.address ? "true" : undefined} />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field name="city" label="City" error={fieldErrors.city} required>
          <input id="city" value={form.city} onChange={(e) => updateField("city", e.target.value)} type="text" className={inputClass} placeholder="City" aria-describedby={fieldErrors.city ? "city-error" : undefined} aria-invalid={fieldErrors.city ? "true" : undefined} />
        </Field>
        <Field name="country" label="Country" error={fieldErrors.country} required>
          <input id="country" value={form.country} onChange={(e) => updateField("country", e.target.value)} type="text" className={inputClass} placeholder="Country" aria-describedby={fieldErrors.country ? "country-error" : undefined} aria-invalid={fieldErrors.country ? "true" : undefined} />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field name="phone" label="Phone" error={fieldErrors.phone} required>
          <input id="phone" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} type="tel" className={inputClass} placeholder="+20 2 418 61 56" aria-describedby={fieldErrors.phone ? "phone-error" : undefined} aria-invalid={fieldErrors.phone ? "true" : undefined} />
        </Field>
        <Field name="cellPhone" label="Cell Phone" error={fieldErrors.cellPhone} required>
          <input id="cellPhone" value={form.cellPhone} onChange={(e) => updateField("cellPhone", e.target.value)} type="tel" className={inputClass} placeholder="+20 100 000 0000" aria-describedby={fieldErrors.cellPhone ? "cellPhone-error" : undefined} aria-invalid={fieldErrors.cellPhone ? "true" : undefined} />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field name="fax" label="Fax" error={fieldErrors.fax}>
          <input id="fax" value={form.fax} onChange={(e) => updateField("fax", e.target.value)} type="tel" className={inputClass} placeholder="Fax number" aria-describedby={fieldErrors.fax ? "fax-error" : undefined} aria-invalid={fieldErrors.fax ? "true" : undefined} />
        </Field>
        <Field name="email" label="Email" error={fieldErrors.email} required>
          <input id="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} type="email" className={inputClass} placeholder="email@company.com" aria-describedby={fieldErrors.email ? "email-error" : undefined} aria-invalid={fieldErrors.email ? "true" : undefined} />
        </Field>
      </div>

      <div className="mt-5">
        <Field name="website" label="Website" error={fieldErrors.website}>
          <input id="website" value={form.website} onChange={(e) => updateField("website", e.target.value)} type="url" className={inputClass} placeholder="https://" aria-describedby={fieldErrors.website ? "website-error" : undefined} aria-invalid={fieldErrors.website ? "true" : undefined} />
        </Field>
      </div>

      <div className="mt-5">
        <Field name="interestedIn" label="Interested In" error={fieldErrors.interestedIn}>
          <input id="interestedIn" value={form.interestedIn} onChange={(e) => updateField("interestedIn", e.target.value)} type="text" className={inputClass} placeholder="e.g. Salt products, export partnership" aria-describedby={fieldErrors.interestedIn ? "interestedIn-error" : undefined} aria-invalid={fieldErrors.interestedIn ? "true" : undefined} />
        </Field>
      </div>

      <div className="mt-5">
        <Field name="omegaLineProduct" label="Omega Line Product" error={fieldErrors.omegaLineProduct}>
          <select
            id="omegaLineProduct"
            value={form.omegaLineProduct}
            onChange={(e) => updateField("omegaLineProduct", e.target.value)}
            className={inputClass}
            aria-describedby={fieldErrors.omegaLineProduct ? "omegaLineProduct-error" : undefined}
            aria-invalid={fieldErrors.omegaLineProduct ? "true" : undefined}
          >
            <option value="">Select a product (optional)</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field name="saltType" label="Salt Type" error={fieldErrors.saltType}>
          <input id="saltType" value={form.saltType} onChange={(e) => updateField("saltType", e.target.value)} type="text" className={inputClass} placeholder="e.g. Rock salt, sea salt, vacuum salt" aria-describedby={fieldErrors.saltType ? "saltType-error" : undefined} aria-invalid={fieldErrors.saltType ? "true" : undefined} />
        </Field>
      </div>

      <div className="mt-5">
        <Field name="message" label="Your Messages" error={fieldErrors.message} required>
          <textarea id="message" value={form.message} onChange={(e) => updateField("message", e.target.value)} rows={4} className={`${inputClass} resize-y`} placeholder="Tell us about your requirements..." aria-describedby={fieldErrors.message ? "message-error" : undefined} aria-invalid={fieldErrors.message ? "true" : undefined} />
        </Field>
      </div>

      <div className="mt-5">
        <Field name="consent" error={fieldErrors.consent}>
          <label className="flex items-start gap-3">
            <input id="consent" checked={form.consent} onChange={(e) => updateField("consent", e.target.checked)} type="checkbox" className="mt-1 h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]" aria-describedby={fieldErrors.consent ? "consent-error" : undefined} aria-invalid={fieldErrors.consent ? "true" : undefined} />
            <span className="text-sm leading-6 text-[var(--color-muted)]">
              I consent to Omega Line processing my data for inquiry handling in accordance with the privacy policy.
            </span>
          </label>
        </Field>
      </div>

      {status === "error" ? (
        <div className="mt-5 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          <AlertCircle aria-hidden="true" size={16} className="shrink-0" />
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-6">
        <button
          type="submit"
          disabled={status === "loading"}
          className="cta-button min-h-[48px] bg-[var(--color-primary-strong)] px-8 text-white hover:bg-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <><Loader2 aria-hidden="true" size={16} className="animate-spin" /> Submitting...</>
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm text-[var(--color-ink)] transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 min-h-[44px]";

function Field({
  name,
  label,
  error,
  required,
  children,
}: {
  name?: string;
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label ? (
        <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          {label}{required ? <span className="ml-0.5 text-[var(--color-accent)]">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? <p id={name ? `${name}-error` : undefined} className="mt-1 text-xs text-[var(--color-accent)]" role="alert">{error}</p> : null}
    </div>
  );
}
