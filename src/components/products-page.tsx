import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { products } from "@/data/products";
import { ProductCard } from "./product-card";
import { RevealSection } from "./reveal-section";
import { SectionHeading } from "./section-heading";

export function ProductsPage({ locale }: { locale: Locale }) {
  return (
    <main id="main-content">
      <section className="section-band pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Our Products</p>
            <h1 className="mt-3 text-4xl font-black tracking-normal text-[var(--color-ink)] sm:text-5xl">
              Ten salt products for food, industry, treatment, and export
            </h1>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Explore Omega Lines&apos; complete product range. Each product is presented directly with its real image, applications, and quote request path.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                locale={locale}
                slug={product.slug}
                name={product.name}
                shortDescription={product.shortDescription}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </section>

      <RevealSection className="section-band bg-[var(--color-soft)]" as="section">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Need a custom specification?"
            title="Request a Quote"
            description="Tell us your required product, grade, packaging, quantity, and destination. Our team will prepare the right offer."
          />
          <div className="mt-8 flex justify-center">
            <Link href="/contact" locale={locale} className="cta-button bg-[var(--color-primary-strong)] text-white hover:bg-[var(--color-primary)]">
              Request a Quote <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
