import { PackageOpen } from "lucide-react";

type EmptyStateProps = {
  message: string;
  action?: { label: string; href: string } | null;
};

export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-md border border-dashed border-[var(--color-border)] bg-white p-10 text-center">
      <PackageOpen aria-hidden="true" size={40} className="text-[var(--color-muted)]" />
      <p className="max-w-md text-sm leading-6 text-[var(--color-muted)]">{message}</p>
      {action ? (
        <a
          href={action.href}
          className="cta-button border border-[var(--color-primary)] bg-white text-[var(--color-primary)] hover:bg-[var(--color-soft)]"
        >
          {action.label}
        </a>
      ) : null}
    </div>
  );
}
