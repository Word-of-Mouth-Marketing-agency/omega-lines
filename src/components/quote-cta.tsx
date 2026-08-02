import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";

type QuoteCtaProps = {
  locale: Locale;
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  whatsappUrl?: string | null;
};

export function QuoteCta({ locale, eyebrow, heading, description, whatsappUrl }: QuoteCtaProps) {
  return (
    <aside className="quote-panel">
      <p className="text-sm font-bold uppercase text-blue-200">{eyebrow ?? "Let's work together"}</p>
      <h2 className="mt-3 text-3xl font-black text-white">{heading ?? "Request a Quote Today"}</h2>
      <p className="mt-4 text-sm leading-7 text-white/78">
        {description ?? "Tell us your requirements and the team can respond after contact workflows are configured."}
      </p>
      <div className="mt-7 grid gap-3">
        <Link
          href="/contact"
          locale={locale}
          className="cta-button bg-white text-[var(--color-primary-strong)] hover:bg-[var(--color-soft)]"
        >
          Request a Quote <ArrowRight aria-hidden="true" size={16} />
        </Link>
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button border border-white/40 bg-white/10 text-white hover:bg-white/20"
          >
            Chat on WhatsApp <ArrowRight aria-hidden="true" size={16} />
          </a>
        ) : null}
      </div>
    </aside>
  );
}
