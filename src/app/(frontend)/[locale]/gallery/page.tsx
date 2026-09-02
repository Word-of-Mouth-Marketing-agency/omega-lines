import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery-page";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Gallery | Omega Line",
    description: "Explore our product range, production facilities, packaging, and shipment photographs.",
    locale,
    path: "/gallery",
  });
}

export default async function GalleryRoute({ params }: PageProps) {
  const { locale } = await params;
  return <GalleryPage locale={locale} />;
}
