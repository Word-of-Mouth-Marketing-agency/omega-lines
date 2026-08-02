import type { ReactNode } from "react";

type ContactCardProps = {
  icon: ReactNode;
  title: string;
  content: ReactNode;
  href?: string;
};

export function ContactCard({ icon, title, content, href }: ContactCardProps) {
  if (href) {
    return (
      <a
        href={href}
        className="group block rounded-md border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-md"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[var(--color-soft)] text-[var(--color-primary)]">
            {icon}
          </span>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">{title}</h3>
            <div className="mt-1 text-base font-semibold text-[var(--color-ink)]">{content}</div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <div className="rounded-md border border-[var(--color-border)] bg-white p-6">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[var(--color-soft)] text-[var(--color-primary)]">
          {icon}
        </span>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">{title}</h3>
          <div className="mt-1 text-base font-semibold text-[var(--color-ink)]">{content}</div>
        </div>
      </div>
    </div>
  );
}
