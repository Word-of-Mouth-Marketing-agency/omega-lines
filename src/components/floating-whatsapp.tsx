import { FaWhatsapp } from "react-icons/fa6";
import { getSocialLinks } from "@/lib/cms";
import type { Locale } from "@/i18n/routing";

const WHATSAPP_FALLBACK = "https://wa.me/201115508545";

type SocialLinksGlobal = {
  links?: Array<{
    label?: string | null;
    url?: string | null;
  }> | null;
};

export async function FloatingWhatsapp({ locale }: { locale: Locale }) {
  const social = await getSocialLinks(locale) as SocialLinksGlobal | null;

  const whatsappLink = social?.links?.find(
    (item) => item.label?.toLowerCase().trim().includes("whatsapp") && item.url
  );

  const href = whatsappLink?.url || WHATSAPP_FALLBACK;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      title="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:scale-110 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-sm:bottom-4 max-sm:right-4 sm:h-14 sm:w-14"
    >
      <FaWhatsapp aria-hidden="true" size={24} className="max-sm:size-5" />
    </a>
  );
}
