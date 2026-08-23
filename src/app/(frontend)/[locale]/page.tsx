import type { Metadata } from "next";
import { Homepage } from "@/components/homepage";
import type { Locale } from "@/i18n/routing";
import { getHomepageProfileContent } from "@/lib/homepage-content";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const profile = getHomepageProfileContent(locale);

  return buildMetadata({
    title: profile.seoTitle,
    description: profile.seoDescription,
    locale,
    path: "/",
  });
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  return <Homepage locale={locale} />;
}
