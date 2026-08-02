"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/routing";
import type { CmsMedia } from "@/lib/cms";
import { EmptyState } from "./empty-state";
import { ProductCard } from "./product-card";

const ALL_PRODUCTS_FILTER = "all-products";
const GENERAL_PRODUCTS_FILTER = "general-products";

type FilterSubcategory = {
  id: string;
  name: string;
  description?: string | null;
};

type FilterProduct = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  image?: CmsMedia | number | null;
  subcategoryId: string | null;
};

type CategoryProductFilterProps = {
  locale: Locale;
  subcategories: FilterSubcategory[];
  products: FilterProduct[];
};

function FilterButton({
  active,
  count,
  label,
  onClick,
}: {
  active: boolean;
  count: number;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center gap-2 border px-4 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
        active
          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
          : "border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
      }`}
    >
      <span>{label}</span>
      <span
        aria-label={`${count} ${count === 1 ? "product" : "products"}`}
        className={`text-xs font-semibold ${active ? "text-white/75" : "text-[var(--color-muted)]"}`}
      >
        {count}
      </span>
    </button>
  );
}

export function CategoryProductFilter({ locale, subcategories, products }: CategoryProductFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState(ALL_PRODUCTS_FILTER);

  const generalProductsCount = useMemo(
    () => products.filter((product) => product.subcategoryId === null).length,
    [products],
  );

  const productCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const product of products) {
      if (product.subcategoryId !== null) {
        counts.set(product.subcategoryId, (counts.get(product.subcategoryId) ?? 0) + 1);
      }
    }
    return counts;
  }, [products]);

  const selectedSubcategory = useMemo(
    () => subcategories.find((subcategory) => subcategory.id === selectedFilter),
    [selectedFilter, subcategories],
  );

  const filteredProducts = useMemo(() => {
    if (selectedFilter === ALL_PRODUCTS_FILTER) return products;
    if (selectedFilter === GENERAL_PRODUCTS_FILTER) {
      return products.filter((product) => product.subcategoryId === null);
    }
    return products.filter((product) => product.subcategoryId === selectedFilter);
  }, [products, selectedFilter]);

  const resultsTitle = selectedSubcategory?.name
    ?? (selectedFilter === GENERAL_PRODUCTS_FILTER ? "General Products" : "All Products");

  const resultsDescription = selectedSubcategory?.description
    ?? (selectedFilter === GENERAL_PRODUCTS_FILTER
      ? "Products in this category that have not yet been assigned to a specific subcategory."
      : "Browse the complete active product range available in this category.");

  const hasFilters = subcategories.length > 0;

  return (
    <>
      {hasFilters ? (
        <section
          className="border-b border-[var(--color-border)] bg-white py-7"
          aria-labelledby="subcategory-filter-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-eyebrow">Browse this category</p>
                <h2
                  id="subcategory-filter-heading"
                  className="mt-2 text-xl font-black text-[var(--color-ink)]"
                >
                  Filter products by subcategory
                </h2>
              </div>

              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter products by subcategory"
              >
                <FilterButton
                  active={selectedFilter === ALL_PRODUCTS_FILTER}
                  count={products.length}
                  label="All Products"
                  onClick={() => setSelectedFilter(ALL_PRODUCTS_FILTER)}
                />

                {subcategories.map((subcategory) => (
                  <FilterButton
                    key={subcategory.id}
                    active={selectedFilter === subcategory.id}
                    count={productCounts.get(subcategory.id) ?? 0}
                    label={subcategory.name}
                    onClick={() => setSelectedFilter(subcategory.id)}
                  />
                ))}

                {generalProductsCount > 0 ? (
                  <FilterButton
                    active={selectedFilter === GENERAL_PRODUCTS_FILTER}
                    count={generalProductsCount}
                    label="General Products"
                    onClick={() => setSelectedFilter(GENERAL_PRODUCTS_FILTER)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-band" aria-labelledby="filtered-products-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 border-b border-[var(--color-border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-eyebrow">Product range</p>
              <h2
                id="filtered-products-heading"
                className="mt-2 text-2xl font-black text-[var(--color-ink)] sm:text-3xl"
              >
                {resultsTitle}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
                {resultsDescription}
              </p>
            </div>
            <p
              className="shrink-0 text-sm font-bold text-[var(--color-muted)]"
              aria-live="polite"
              aria-atomic="true"
            >
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  name={product.name}
                  shortDescription={product.shortDescription}
                  image={product.image}
                  locale={locale}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState
                message={
                  selectedFilter === ALL_PRODUCTS_FILTER
                    ? "No active products are currently available in this category."
                    : `No active products are currently assigned to ${resultsTitle}.`
                }
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
