import type { Metadata } from "next";
import { AboutUsPage } from "@/components/about-page";
import type { Locale } from "@/i18n/routing";
import { getAboutProfileContent } from "@/lib/about-profile-content";
import { getAboutPage } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const profile = getAboutProfileContent(locale);

  return buildMetadata({
    title: profile.seoTitle,
    description: profile.seoDescription,
    locale,
    path: "/about",
  });
}

export default async function AboutRoute({ params }: PageProps) {
  const { locale } = await params;
  const data = await getAboutPage(locale);

  return <AboutUsPage locale={locale} data={data} />;
}
