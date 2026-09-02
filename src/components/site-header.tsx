import type { Locale } from "@/i18n/routing";
import {
  getContactInformation,
  getHeaderNavigation,
  getSocialLinks,
} from "@/lib/cms";
import { productCategories, products } from "@/data/products";
import { primaryNav } from "@/lib/site";
import { SiteHeaderClient } from "./site-header-client";

type HeaderGlobal = {
  items?: Array<{
    label?: string | null;
    href?: string | null;
  }> | null;
};

type ContactGlobal = {
  telephoneNumbers?: Array<{ number?: string | null }> | null;
  emailAddresses?: Array<{ email?: string | null }> | null;
  address?: string | null;
};

type SocialLinksGlobal = {
  links?: Array<{
    label?: string | null;
    url?: string | null;
  }> | null;
};

export async function SiteHeader({ locale }: { locale: Locale }) {
  const [navigation, contact, social] = await Promise.all([
    getHeaderNavigation(locale) as Promise<HeaderGlobal | null>,
    getContactInformation(locale) as Promise<ContactGlobal | null>,
    getSocialLinks(locale) as Promise<SocialLinksGlobal | null>,
  ]);

  const navItems =
    navigation?.items?.length
      ? navigation.items
          .filter((item) => item.label && item.href)
          .map((item) => ({ href: item.href as string, label: item.label as string }))
      : primaryNav.map((item) => ({
          href: item.href,
          label: item.label === "About" ? "About Us" : item.label,
        }));

  const socialLinks =
    social?.links?.filter((item) => item.label && item.url).map((item) => ({
      label: item.label as string,
      url: item.url as string,
    })) ?? [];

  const productsByCategory = productCategories.map((category) => ({
    categorySlug: category.toLowerCase().replaceAll(" ", "-"),
    name: category,
    products: products
      .filter((p) => p.category === category)
      .map((p) => ({ slug: p.slug, name: p.name })),
  }));

  return (
    <SiteHeaderClient
      locale={locale}
      navItems={navItems}
      productsByCategory={productsByCategory}
      contact={{
        email: contact?.emailAddresses?.[0]?.email ?? "export@omega-lines.local",
        phone: contact?.telephoneNumbers?.[0]?.number ?? "+00 000 000 0000",
        location: contact?.address ?? "Location pending verification",
      }}
      socialLinks={socialLinks}
    />
  );
}
