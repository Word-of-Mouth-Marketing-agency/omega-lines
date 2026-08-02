import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  getActiveProductsByCategory,
  getProductBySlug,
  type CmsMedia,
  type CmsProductCategory,
  type CmsProductSubcategory,
} from "@/lib/cms";
import { ImageGallery } from "./image-gallery";
import { ProductCard } from "./product-card";
import { RevealSection } from "./reveal-section";

function isMedia(value: CmsMedia | number | null | undefined): value is CmsMedia {
  return typeof value === "object" && value !== null && typeof value.url === "string";
}

function isCategory(value: CmsProductCategory | number | null | undefined): value is CmsProductCategory {
  return typeof value === "object" && value !== null && value.id !== undefined;
}

function isSubcategory(
  value: CmsProductSubcategory | number | null | undefined,
): value is CmsProductSubcategory {
  return typeof value === "object" && value !== null && value.id !== undefined && value.active !== false;
}

type ProductDetailProps = {
  locale: Locale;
  slug: string;
};

export async function ProductDetail({ locale, slug }: ProductDetailProps) {
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
    return null;
  }

  const category = isCategory(product.category) ? product.category : null;
  const subcategory = isSubcategory(product.subcategory) ? product.subcategory : null;
  const categoryName = category?.name ?? null;
  const categorySlug = category?.slug ?? null;

  const relatedProducts = category?.id !== undefined
    ? (await getActiveProductsByCategory(locale, category.id, 6))
        .filter((related) => related.slug && related.slug !== slug)
        .slice(0, 3)
    : [];

  const galleryItems = product.galleryImages
    ?.filter((item) => isMedia(item.image))
    .map((item) => item.image as CmsMedia) ?? [];
  const allImages = [product.featuredImage, ...galleryItems].filter(isMedia);

  const applications = product.applications
    ?.filter((application) => application.application)
    .map((application) => application.application as string) ?? [];
  const specifications = product.specifications?.filter(
    (specification) => specification.label && specification.value,
  ) ?? [];

  const productName = product.name ?? "Product detail";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: product.shortDescription ?? "",
    category: categoryName ?? "",
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

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
              {categoryName && categorySlug ? (
                <>
                  <li aria-hidden="true"><ChevronRight size={14} /></li>
                  <li>
                    <Link
                      href={`/products/category/${categorySlug}`}
                      locale={locale}
                      className="font-semibold hover:text-[var(--color-primary)]"
                    >
                      {categoryName}
                    </Link>
                  </li>
                </>
              ) : null}
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li className="font-bold text-[var(--color-ink)]" aria-current="page">{productName}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="section-band pt-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <ImageGallery images={allImages} productName={productName} />
          </div>

          <div>
            {categoryName ? (
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                {categorySlug ? (
                  <Link href={`/products/category/${categorySlug}`} locale={locale} className="hover:underline">
                    {categoryName}
                  </Link>
                ) : categoryName}
                {subcategory?.name ? (
                  <span className="font-normal text-[var(--color-muted)]"> / {subcategory.name}</span>
                ) : null}
              </p>
            ) : null}
            <h1 className="mt-2 text-3xl font-black text-[var(--color-ink)] sm:text-4xl">
              {productName}
            </h1>
            {product.shortDescription ? (
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                {product.shortDescription}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/contact?product=${slug}`}
                locale={locale}
                className="cta-button bg-[var(--color-primary-strong)] text-white hover:bg-[var(--color-primary)]"
              >
                Request a Quote <ArrowRight aria-hidden="true" size={16} />
              </Link>
              {categoryName && categorySlug ? (
                <Link
                  href={`/products/category/${categorySlug}`}
                  locale={locale}
                  className="cta-button border border-[var(--color-primary-strong)] bg-white text-[var(--color-primary-strong)] hover:bg-[var(--color-soft)]"
                >
                  Back to {categoryName}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {applications.length > 0 || specifications.length > 0 ? (
        <RevealSection className="section-band bg-[var(--color-soft)]" as="div">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              {applications.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-black text-[var(--color-ink)]">Applications</h2>
                  <ul className="mt-4 grid gap-3">
                    {applications.map((application) => (
                      <li key={application} className="flex items-center gap-3 text-sm text-[var(--color-ink)]">
                        <Check aria-hidden="true" size={16} className="shrink-0 text-[var(--color-primary)]" />
                        {application}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {specifications.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-black text-[var(--color-ink)]">Specifications</h2>
                  <dl className="mt-4 divide-y divide-[var(--color-border)] rounded-md border border-[var(--color-border)] bg-white">
                    {specifications.map((specification) => (
                      <div key={specification.label} className="flex justify-between gap-6 px-5 py-3 text-sm">
                        <dt className="font-semibold text-[var(--color-muted)]">{specification.label}</dt>
                        <dd className="text-right font-medium text-[var(--color-ink)]">{specification.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
            </div>
          </div>
        </RevealSection>
      ) : null}

      {relatedProducts.length > 0 ? (
        <RevealSection className="section-band" as="div">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-eyebrow">Same category</p>
                <h2 className="mt-2 text-2xl font-black text-[var(--color-ink)]">Related Products</h2>
              </div>
              {categoryName && categorySlug ? (
                <Link
                  href={`/products/category/${categorySlug}`}
                  locale={locale}
                  className="inline-flex min-h-10 items-center gap-2 text-sm font-black text-[var(--color-primary)]"
                >
                  View {categoryName} <ArrowRight aria-hidden="true" size={15} />
                </Link>
              ) : null}
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related.id ?? related.slug}
                  slug={related.slug ?? ""}
                  name={related.name ?? ""}
                  shortDescription={related.shortDescription ?? ""}
                  image={related.featuredImage}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </RevealSection>
      ) : null}
    </main>
  );
}
