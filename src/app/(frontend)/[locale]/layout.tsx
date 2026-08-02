import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { hasLocale } from "next-intl";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { routing } from "@/i18n/routing";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
      <FloatingWhatsapp locale={locale} />
    </NextIntlClientProvider>
  );
}
