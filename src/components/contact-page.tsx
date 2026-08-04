import type { Locale } from "@/i18n/routing";
import { Phone, FileText, Smartphone, MapPin, Mail } from "lucide-react";
import { getContactInformation, getActiveProducts } from "@/lib/cms";
import { InnerPageHero } from "./inner-page-hero";
import { SectionHeading } from "./section-heading";
import { ContactForm } from "./contact-form";

type ContactGlobal = {
  address?: string | null;
  notice?: string | null;
  telephoneNumbers?: Array<{ number?: string | null }> | null;
  faxNumbers?: Array<{ number?: string | null }> | null;
  cellNumbers?: Array<{ number?: string | null }> | null;
  emailAddresses?: Array<{ email?: string | null }> | null;
};

type ContactPageProps = {
  locale: Locale;
  preselectedProduct?: string | null;
};

export async function ContactPage({ locale, preselectedProduct }: ContactPageProps) {
  const [contact, activeProducts] = await Promise.all([
    getContactInformation(locale) as Promise<ContactGlobal | null>,
    getActiveProducts(locale, 50),
  ]);

  const products = activeProducts.map((p: { slug?: string | null; name?: string | null }) => ({
    slug: p.slug ?? "",
    name: p.name ?? "Unnamed",
  }));

  const phones = contact?.telephoneNumbers?.filter((t) => t.number) ?? [];
  const faxes = contact?.faxNumbers?.filter((f) => f.number) ?? [];
  const cells = contact?.cellNumbers?.filter((c) => c.number) ?? [];
  const emails = contact?.emailAddresses?.filter((e) => e.email) ?? [];
  const address = contact?.address ?? "";

  return (
    <main id="main-content">
      <InnerPageHero title="Contact Us" />

      <section className="section-band bg-[var(--color-soft)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Send Message"
            title="Tell Us Your Requirements"
            description="Fill out the form and our team will review your request and respond promptly."
          />

          {contact?.notice ? (
            <p className="mx-auto mt-4 max-w-2xl rounded-md border border-[var(--color-border)] bg-white px-4 py-3 text-center text-sm leading-6 text-[var(--color-muted)]">
              {contact.notice}
            </p>
          ) : null}

          <div className="mt-10">
            <ContactForm locale={locale} preselectedProduct={preselectedProduct} products={products} />
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Contact Information"
            centered={true}
          />

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <ContactInfoGroup
              icon={<Phone size={20} />}
              title="Tel"
              items={phones.map((p) => p.number as string)}
              href={(v) => `tel:${v.replaceAll(/\s/g, "")}`}
            />

            <ContactInfoGroup
              icon={<FileText size={20} />}
              title="Fax"
              items={faxes.map((f) => f.number as string)}
              href={(v) => `tel:${v.replaceAll(/\s/g, "")}`}
            />

            <ContactInfoGroup
              icon={<Smartphone size={20} />}
              title="Cell"
              items={cells.map((c) => c.number as string)}
              href={(v) => `tel:${v.replaceAll(/\s/g, "")}`}
            />

            <ContactInfoGroup
              icon={<MapPin size={20} />}
              title="Address"
              items={address ? [address] : []}
            />

            <ContactInfoGroup
              icon={<Mail size={20} />}
              title="E-Mail"
              items={emails.map((e) => e.email as string)}
              href={(v) => `mailto:${v}`}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactInfoGroup({
  icon,
  title,
  items,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  href?: (value: string) => string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-md border border-[var(--color-border)] bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--color-soft)] text-[var(--color-primary)]">
          {icon}
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">{title}</h3>
      </div>
      <ul className="mt-3 space-y-1">
        {items.map((item, i) => (
          <li key={i}>
            {href ? (
              <a href={href(item)} className="text-sm font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-primary)]">
                {item}
              </a>
            ) : (
              <span className="text-sm font-semibold text-[var(--color-ink)]">{item}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
