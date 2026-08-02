import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { getActiveProductCategorySlugs } from "@/lib/cms";
import { absoluteUrl, localizedPath } from "@/lib/seo";

const staticRoutes = ["/", "/about", "/products", "/gallery", "/contact"] as const;

function localizedSitemapEntry(
  locale: Locale,
  route: string,
  lastModified: Date,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(localizedPath(locale, route)),
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        locales.map((item) => [item, absoluteUrl(localizedPath(item, route))]),
      ),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const generatedAt = new Date();
  const categories = await getActiveProductCategorySlugs();

  const staticEntries = locales.flatMap((locale: Locale) =>
    staticRoutes.map((route) => localizedSitemapEntry(locale, route, generatedAt)),
  );

  const categoryEntries = categories.flatMap((category) => {
    const route = `/products/category/${category.slug}`;
    const updatedAt = category.updatedAt ? new Date(category.updatedAt) : generatedAt;
    return locales.map((locale: Locale) => localizedSitemapEntry(locale, route, updatedAt));
  });

  return [...staticEntries, ...categoryEntries];
}
