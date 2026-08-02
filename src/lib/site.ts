import type { Locale } from "@/i18n/routing";

export const siteConfig = {
  name: "Omega Lines",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description: "Placeholder B2B salt product catalog foundation.",
  organizationName: "Omega Lines",
} as const;

export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export type PageKey = "home" | "about" | "products" | "gallery" | "contact";

export const pageContent: Record<
  PageKey,
  {
    title: string;
    kicker: string;
    description: string;
    emptyState: string;
  }
> = {
  home: {
    title: "Omega Lines catalog foundation",
    kicker: "Catalog placeholder",
    description:
      "A multilingual, CMS-backed B2B catalog shell is ready for verified client content.",
    emptyState:
      "Featured products and categories will appear here after CMS content is approved.",
  },
  about: {
    title: "About Omega Lines",
    kicker: "Company placeholder",
    description:
      "This page is reserved for verified company background, capabilities, and approvals.",
    emptyState: "No verified company narrative has been added yet.",
  },
  products: {
    title: "Products",
    kicker: "Product catalog",
    description:
      "Structured product and category content will be managed in Payload CMS.",
    emptyState: "No active products are available yet.",
  },
  gallery: {
    title: "Gallery",
    kicker: "Media library",
    description:
      "Product, factory, packaging, and shipment media can be organized here.",
    emptyState: "No active gallery items are available yet.",
  },
  contact: {
    title: "Contact",
    kicker: "Inquiry placeholder",
    description:
      "Verified contact details and inquiry workflows will be added after client confirmation.",
    emptyState: "No verified contact details have been added yet.",
  },
};

export function localizedPlaceholder(locale: Locale): string | null {
  if (locale === "en") {
    return null;
  }

  return `${locale.toUpperCase()} placeholder. English content is shown until client translations are provided.`;
}
