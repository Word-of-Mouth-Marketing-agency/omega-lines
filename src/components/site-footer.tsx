import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getContactInformation, getFooter, getSocialLinks } from "@/lib/cms";
import { primaryNav } from "@/lib/site";
import { Mail, Phone, MapPin } from "lucide-react";
import { SocialIcon } from "./social-icon-link";

type FooterGlobal = {
  summary?: string | null;
  links?: Array<{
    label?: string | null;
    href?: string | null;
  }> | null;
};

type ContactGlobal = {
  email?: string | null;
  phone?: string | null;
  address?: string | null;
};

type SocialLinksGlobal = {
  links?: Array<{
    label?: string | null;
    url?: string | null;
  }> | null;
};

export async function SiteFooter({ locale }: { locale: Locale }) {
  const [footer, contact, social] = await Promise.all([
    getFooter(locale) as Promise<FooterGlobal | null>,
    getContactInformation(locale) as Promise<ContactGlobal | null>,
    getSocialLinks(locale) as Promise<SocialLinksGlobal | null>,
  ]);

  const footerLinks =
    footer?.links?.length
      ? footer.links
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

  return (
    <footer className="mt-auto bg-[var(--color-ink)] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.9fr] lg:px-8">
        <div>
          <Image
            src="/images/brand/omega-logo-white.webp"
            alt="Omega Line"
            width={838}
            height={594}
            className="h-16 w-auto"
          />
          <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
            {footer?.summary ??
              "Placeholder catalog foundation. Final company claims, certificates, and contact details require client verification."}
          </p>
          {socialLinks.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((item) => {
                return (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label={item.label}
                    >
                      <SocialIcon label={item.label} size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        <nav aria-label="Footer navigation">
          <p className="text-sm font-bold uppercase text-white/60">Main links</p>
          <ul className="mt-4 grid gap-3 text-sm">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} locale={locale} className="text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="not-italic">
          <p className="text-sm font-bold uppercase text-white/60">Contact</p>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-white/75">
            <a href={`mailto:${contact?.email ?? "export@omega-lines.local"}`} className="inline-flex items-center gap-2 text-white/75 hover:text-white">
              <Mail aria-hidden="true" size={14} className="shrink-0" />
              {contact?.email ?? "export@omega-lines.local"}
            </a>
            <a href={`tel:${(contact?.phone ?? "+00 000 000 0000").replaceAll(" ", "")}`} className="inline-flex items-center gap-2 text-white/75 hover:text-white">
              <Phone aria-hidden="true" size={14} className="shrink-0" />
              {contact?.phone ?? "+00 000 000 0000"}
            </a>
            <p className="inline-flex items-center gap-2 text-white/75">
              <MapPin aria-hidden="true" size={14} className="shrink-0" />
              {contact?.address ?? "Location pending verification"}
            </p>
          </div>
        </address>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex min-h-14 w-full max-w-7xl flex-col items-center justify-center px-4 py-4 text-center text-xs text-white/55 sm:px-6 lg:px-8">
          <p>
            {"\u00A9"} {new Date().getFullYear()} Omega Line Egypt. All rights reserved.{" "}
            <span aria-hidden="true">·</span>{" "}
            Powered by{" "}
            <a
              href="https://wordofmoutheg.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/70 transition-colors hover:text-white"
            >
              WORD OF MOUTH
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
