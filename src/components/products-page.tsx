import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getActiveProductCategories } from "@/lib/cms";
import { EmptyState } from "./empty-state";
import { ProductCategoryCard } from "./product-category-card";
import { RevealSection } from "./reveal-section";
import { SectionHeading } from "./section-heading";

type ProductsPageProps = {
  locale: Locale;
};

export async function ProductsPage({ locale }: ProductsPageProps) {
  const categories = await getActiveProductCategories(locale);
  const visibleCategories = categories.filter(
    (category) => category.slug && category.name && category.active !== false,
  );

  return (
    <main id="main-content">
      <section className="section-band pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Product Categories</p>
            <h1 className="mt-3 text-4xl font-black tracking-normal text-[var(--color-ink)] sm:text-5xl">
              Salt solutions organised around your application
            </h1>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Choose a category to review its available subcategories, grades, and products without mixing unrelated applications.
            </p>
          </div>

          {visibleCategories.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCategories.map((category) => (
                <ProductCategoryCard
                  key={category.slug}
                  locale={locale}
                  slug={category.slug as string}
                  name={category.name as string}
                  description={category.description}
                  image={category.image}
                />
              ))}
            </div>
          ) : (
            <div className="mt-12">
              <EmptyState message="No active product categories are available at the moment." />
            </div>
          )}
        </div>
      </section>

      <RevealSection className="section-band bg-[var(--color-soft)]" as="section">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Need a custom solution?"
            title="Request a Quote"
            description="Tell us your required grade, packaging, quantity, and destination. Our team will help identify the right product category."
          />
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              locale={locale}
              className="cta-button bg-[var(--color-primary-strong)] text-white hover:bg-[var(--color-primary)]"
            >
              Request a Quote <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
