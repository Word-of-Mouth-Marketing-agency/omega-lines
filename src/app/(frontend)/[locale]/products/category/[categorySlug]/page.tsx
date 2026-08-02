import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCategoryPage } from "@/components/product-category-page";
import type { Locale } from "@/i18n/routing";
import { getProductCategoryBySlug, type CmsMedia } from "@/lib/cms";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: Locale; categorySlug: string }>;
};

function isMedia(value: CmsMedia | number | null | undefined): value is CmsMedia {
  return typeof value === "object" && value !== null && typeof value.url === "string";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, categorySlug } = await params;
  const category = await getProductCategoryBySlug(categorySlug, locale);

  if (!category) {
    return buildMetadata({
      title: "Product Category Not Found | Omega Lines",
      description: "The requested product category is not available.",
      locale,
      path: `/products/category/${categorySlug}`,
    });
  }

  const title = category.seo?.title ?? `${category.name ?? "Product Category"} | Omega Lines`;
  const description = category.seo?.description
    ?? category.description
    ?? `Explore products available in the ${category.name ?? "selected"} category.`;
  const metadata = buildMetadata({
    title,
    description,
    locale,
    path: `/products/category/${categorySlug}`,
  });

  if (category.seo?.noIndex) {
    metadata.robots = { index: false, follow: true };
  }

  if (isMedia(category.seo?.image) && category.seo?.image.url) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [absoluteUrl(category.seo.image.url)],
    };
  }

  return metadata;
}

export default async function ProductCategoryRoute({ params }: PageProps) {
  const { locale, categorySlug } = await params;
  const category = await getProductCategoryBySlug(categorySlug, locale);

  if (!category || category.active === false || category.id === undefined || !category.slug || !category.name) {
    notFound();
    return null;
  }

  return <ProductCategoryPage locale={locale} category={category} />;
}
