import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl px-4 py-20">
      <p className="text-sm font-semibold text-[var(--color-primary)]">Not found</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-ink)]">Page unavailable</h1>
      <p className="mt-4 leading-7 text-[var(--color-muted)]">
        This page is not part of the current catalog foundation or has not been published yet.
      </p>
      <Link className="mt-8 inline-flex text-[var(--color-primary)] underline" href="/">
        Return home
      </Link>
    </main>
  );
}
