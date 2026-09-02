import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Homepage } from "@/components/homepage";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { getHomepage } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import messages from "../../../messages/en.json";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage("en") as { seo?: { title?: string | null; description?: string | null } } | null;
  const seo = homepage?.seo;

  return buildMetadata({
    title: seo?.title ?? "Omega Line salt products and export foundation",
    description:
      seo?.description ??
      "CMS-backed Omega Line homepage foundation for salt products, export information, gallery previews, and quote inquiries.",
    locale: "en",
    path: "/",
  });
}

export default function HomePage() {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <SiteHeader locale="en" />
      <Homepage locale="en" />
      <SiteFooter locale="en" />
      <FloatingWhatsapp locale="en" />
    </NextIntlClientProvider>
  );
}
