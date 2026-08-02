import type { Metadata } from "next";
import { Homepage } from "@/components/homepage";
import type { Locale } from "@/i18n/routing";
import { getHomepage } from "@/lib/cms";
import { getHomepageProfileContent, resolveProfileCopy } from "@/lib/homepage-content";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const profile = getHomepageProfileContent(locale);
  const homepage = (await getHomepage(locale)) as {
    seo?: { title?: string | null; description?: string | null };
  } | null;

  return buildMetadata({
    title: resolveProfileCopy(homepage?.seo?.title, profile.seoTitle),
    description: resolveProfileCopy(homepage?.seo?.description, profile.seoDescription),
    locale,
    path: "/",
  });
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  return <Homepage locale={locale} />;
}
