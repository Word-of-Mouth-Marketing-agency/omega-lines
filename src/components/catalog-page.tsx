import type { PageKey } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import { localizedPlaceholder, pageContent } from "@/lib/site";
import { getActiveProducts } from "@/lib/cms";
import { PageContainer } from "./page-container";

type CatalogPageProps = {
  page: PageKey;
  locale: Locale;
};

export async function CatalogPage({ page, locale }: CatalogPageProps) {
  const content = pageContent[page];
  const products = page === "products" || page === "home" ? await getActiveProducts(locale, 6) : [];
  const localeNote = localizedPlaceholder(locale);

  return (
    <main id="main-content" className="py-14 sm:py-20">
      <PageContainer>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[var(--color-primary)]">{content.kicker}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-[var(--color-ink)] sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">{content.description}</p>
          {localeNote ? (
            <p className="mt-4 rounded-md border border-[var(--color-border)] bg-[var(--color-soft)] px-4 py-3 text-sm text-[var(--color-muted)]">
              {localeNote}
            </p>
          ) : null}
        </div>

        <section className="mt-12" aria-labelledby={`${page}-content-heading`}>
          <h2 id={`${page}-content-heading`} className="text-xl font-semibold text-[var(--color-ink)]">
            Placeholder content
          </h2>
          {products.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article key={product.id} className="rounded-md border border-[var(--color-border)] p-5">
                  <h3 className="font-semibold text-[var(--color-ink)]">{product.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    {product.shortDescription}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-md border border-dashed border-[var(--color-border)] bg-white p-6 text-[var(--color-muted)]">
              {content.emptyState}
            </div>
          )}
        </section>
      </PageContainer>
    </main>
  );
}
