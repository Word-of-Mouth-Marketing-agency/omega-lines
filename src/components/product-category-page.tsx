import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  getActiveProductsByCategory,
  getActiveSubcategories,
  type CmsMedia,
  type CmsProductCategory,
} from "@/lib/cms";
import { CategoryProductFilter } from "./category-product-filter";
import { RevealSection } from "./reveal-section";
import { SectionHeading } from "./section-heading";

type ProductCategoryPageProps = {
  locale: Locale;
  category: CmsProductCategory;
};

function isMedia(value: CmsMedia | number | null | undefined): value is CmsMedia {
  return typeof value === "object" && value !== null && typeof value.url === "string";
}

export async function ProductCategoryPage({ locale, category }: ProductCategoryPageProps) {
  if (category.id === undefined || !category.slug || !category.name) return null;

  const [subcategories, products] = await Promise.all([
    getActiveSubcategories(locale, category.id),
    getActiveProductsByCategory(locale, category.id),
  ]);

  const visibleSubcategories = subcategories.filter(
    (subcategory) => subcategory.id !== undefined && subcategory.slug && subcategory.name,
  );
  const visibleProducts = products.filter((product) => product.slug && product.name);

  const visibleSubcategoryIds = new Set(visibleSubcategories.map((subcategory) => String(subcategory.id)));

  const filterSubcategories = visibleSubcategories.map((subcategory) => ({
    id: String(subcategory.id),
    name: subcategory.name ?? "Unnamed subcategory",
    description: subcategory.description,
  }));

  const filterProducts = visibleProducts.map((product) => {
    const relationship = product.subcategory;
    const rawSubcategoryId =
      typeof relationship === "number" || typeof relationship === "string"
        ? relationship
        : typeof relationship === "object" && relationship !== null
          ? relationship.id
          : null;
    const subcategoryId =
      rawSubcategoryId !== null && rawSubcategoryId !== undefined && visibleSubcategoryIds.has(String(rawSubcategoryId))
        ? String(rawSubcategoryId)
        : null;

    return {
      id: String(product.id ?? product.slug),
      slug: product.slug ?? "",
      name: product.name ?? "Unnamed product",
      shortDescription: product.shortDescription ?? "",
      image: product.featuredImage,
      subcategoryId,
    };
  });

  return (
    <main id="main-content">
      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-muted)]">
              <li>
                <Link href="/" locale={locale} className="font-semibold hover:text-[var(--color-primary)]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li>
                <Link href="/products" locale={locale} className="font-semibold hover:text-[var(--color-primary)]">
                  Products
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li className="font-bold text-[var(--color-ink)]" aria-current="page">{category.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="overflow-hidden bg-[var(--color-primary-strong)] text-white">
        <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Product Category</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-normal sm:text-5xl lg:text-6xl">
              {category.name}
            </h1>
            {category.description ? (
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                {category.description}
              </p>
            ) : (
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                Review the available subcategories and products for this application area.
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-white/85">
              <span className="border border-white/25 bg-white/8 px-4 py-2">
                {visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}
              </span>
            </div>
          </div>

          <div className="relative min-h-72 bg-white/5 lg:min-h-full">
            {isMedia(category.image) ? (
              <Image
                src={category.image.url ?? ""}
                alt={category.image.alt ?? category.name}
                width={category.image.width ?? 1000}
                height={category.image.height ?? 800}
                className="absolute inset-0 h-full w-full object-cover"
                priority
              />
            ) : (
              <div className="salt-visual absolute inset-0" role="img" aria-label={`${category.name} illustration`}>
                <span className="salt-visual__ridge" aria-hidden="true" />
                <span className="salt-visual__belt" aria-hidden="true" />
              </div>
            )}
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-strong)]/55 via-transparent to-transparent lg:from-[var(--color-primary-strong)]/30" aria-hidden="true" />
          </div>
        </div>
      </section>

      <CategoryProductFilter
        key={category.slug}
        locale={locale}
        subcategories={filterSubcategories}
        products={filterProducts}
      />

      <RevealSection className="section-band bg-[var(--color-soft)]" as="section">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={category.name}
            title="Need specifications, packaging, or export pricing?"
            description="Share your target application and quantity. Our team will help you identify the right grade and supply format."
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              locale={locale}
              className="cta-button bg-[var(--color-primary-strong)] text-white hover:bg-[var(--color-primary)]"
            >
              Request a Quote <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link
              href="/products"
              locale={locale}
              className="cta-button border border-[var(--color-primary-strong)] bg-white text-[var(--color-primary-strong)] hover:bg-[var(--color-soft)]"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
