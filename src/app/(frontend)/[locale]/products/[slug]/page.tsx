import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { getProduct } from "@/data/products";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  return buildMetadata({
    title: product?.name ? `${product.name} | Omega Lines` : "Product detail | Omega Lines",
    description: product?.shortDescription ?? "Product detail page.",
    locale,
    path: `/products/${slug}`,
    image: product?.image,
  });
}

export default async function ProductDetailRoute({ params }: PageProps) {
  const { locale, slug } = await params;
  return <ProductDetail locale={locale} slug={slug} />;
}
