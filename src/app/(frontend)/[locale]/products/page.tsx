import type { Metadata } from "next";
import { ProductsPage } from "@/components/products-page";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Product Categories | Omega Lines",
    description: "Explore Omega Lines salt products by food, industrial, water treatment, de-icing, animal nutrition, and specialist categories.",
    locale,
    path: "/products",
  });
}

export default async function ProductsRoute({ params }: PageProps) {
  const { locale } = await params;
  return <ProductsPage locale={locale} />;
}
