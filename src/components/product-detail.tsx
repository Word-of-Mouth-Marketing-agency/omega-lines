import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getProduct, products } from "@/data/products";
import { ProductCard } from "./product-card";
import { ImageGallery } from "./image-gallery";
import { RevealSection } from "./reveal-section";

export function ProductDetail({ locale, slug }: { locale: Locale; slug: string }) {
  const product = getProduct(slug);
  if (!product) notFound();

  const relatedProducts = products
    .filter((item) => item.slug !== slug && item.category === product.category)
    .slice(0, 3);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.image.url,
    brand: { "@type": "Brand", name: "Omega Line" },
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-muted)]">
              <li><Link href="/" locale={locale} className="font-semibold hover:text-[var(--color-primary)]">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><Link href="/products" locale={locale} className="font-semibold hover:text-[var(--color-primary)]">Products</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li className="font-bold text-[var(--color-ink)]" aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="section-band pt-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-md shadow-[0_22px_65px_rgba(10,63,122,0.12)]">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--color-primary)]">Omega Line Product</p>
            <p className="mt-3 text-sm font-bold text-[var(--color-primary)]">{product.category}</p>
            <h1 className="mt-2 text-3xl font-black text-[var(--color-ink)] sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">{product.shortDescription}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/contact?product=${product.slug}`} locale={locale} className="cta-button bg-[var(--color-primary-strong)] text-white hover:bg-[var(--color-primary)]">
                Request a Quote <ArrowRight aria-hidden="true" size={16} />
              </Link>
              <Link href="/products" locale={locale} className="cta-button border border-[var(--color-primary-strong)] bg-white text-[var(--color-primary-strong)] hover:bg-[var(--color-soft)]">
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="section-band bg-[var(--color-soft)]" as="section">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="section-eyebrow">Product Overview</p>
            <h2 className="mt-3 text-3xl font-black text-[var(--color-ink)]">About {product.name}</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-[var(--color-muted)]">
              {product.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-[var(--color-ink)]">Applications</h2>
            <ul className="mt-5 grid gap-3">
              {product.applications.map((application) => (
                <li key={application} className="flex items-center gap-3 rounded-md border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-ink)]">
                  <Check aria-hidden="true" size={16} className="shrink-0 text-[var(--color-primary)]" />
                  {application}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="section-band" as="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow">Explore More</p>
          <h2 className="mt-2 text-2xl font-black text-[var(--color-ink)]">Other Omega Line Products</h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} slug={item.slug} name={item.name} shortDescription={item.shortDescription} image={item.image} locale={locale} />
            ))}
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
