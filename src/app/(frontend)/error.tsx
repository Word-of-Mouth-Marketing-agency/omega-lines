"use client";

export default function ErrorBoundary({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl px-4 py-20">
      <p className="text-sm font-semibold text-[var(--color-accent)]">Error</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--color-ink)]">Something went wrong</h1>
      <p className="mt-4 leading-7 text-[var(--color-muted)]">
        The page could not be rendered. Try again, or check server logs during development.
      </p>
      <button
        className="mt-8 rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </main>
  );
}
