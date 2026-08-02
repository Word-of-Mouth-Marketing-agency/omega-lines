"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

type CategoryFilterProps = {
  categories: Array<{ slug: string; name: string }>;
};

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const current = searchParams.get("category") ?? "";

  const setCategory = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams);
      if (slug) {
        params.set("category", slug);
      } else {
        params.delete("category");
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
      <button
        role="tab"
        aria-selected={current === ""}
        onClick={() => setCategory("")}
        className={`rounded-md px-4 py-2 text-sm font-bold transition-colors ${
          current === ""
            ? "bg-[var(--color-primary)] text-white"
            : "border border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:bg-[var(--color-soft)]"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          role="tab"
          aria-selected={current === cat.slug}
          onClick={() => setCategory(cat.slug)}
          className={`rounded-md px-4 py-2 text-sm font-bold transition-colors ${
            current === cat.slug
              ? "bg-[var(--color-primary)] text-white"
              : "border border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:bg-[var(--color-soft)]"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
