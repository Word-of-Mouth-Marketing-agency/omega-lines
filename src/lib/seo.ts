import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { locales, localePrefix } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  locale: Locale;
  path?: string;
  image?: { url: string; alt: string; width: number; height: number };
};

export function absoluteUrl(path = ""): string {
  return new URL(path, siteConfig.baseUrl).toString();
}

export function localizedPath(locale: Locale, path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${localePrefix(locale)}${normalizedPath === "/" ? "" : normalizedPath}` || "/";
}

export function buildMetadata({
  title,
  description,
  locale,
  path = "/",
  image,
}: MetadataInput): Metadata {
  const canonicalPath = localizedPath(locale, path);
  const languages = Object.fromEntries(
    locales.map((item) => [item, absoluteUrl(localizedPath(item, path))]),
  );

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages,
    },
    openGraph: {
      title,
      description,
      locale,
      siteName: siteConfig.name,
      type: "website",
      url: absoluteUrl(canonicalPath),
      images: image ? [{ ...image, url: absoluteUrl(image.url) }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [absoluteUrl(image.url)] : undefined,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organizationName,
    url: siteConfig.baseUrl,
  };
}
