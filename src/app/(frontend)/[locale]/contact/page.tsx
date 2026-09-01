import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Contact Us | Omega Line",
    description: "Get in touch with Omega Line. Submit an inquiry about our salt products and our team will respond promptly.",
    locale,
    path: "/contact",
  });
}

export default async function ContactRoute({ params, searchParams }: PageProps) {
  const locale = (await params).locale;
  const sp = searchParams ? await searchParams : ({} as Record<string, string | string[] | undefined>);
  const product = typeof sp.product === "string" ? sp.product : null;
  return <ContactPage locale={locale} preselectedProduct={product} />;
}
