import { FaFacebookF, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";

const brandIcons: Record<string, IconType> = {
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
  x: FaXTwitter,
  twitter: FaXTwitter,
};

export function getSocialPlatform(label: string): string {
  const key = label.toLowerCase().trim();
  if (key.includes("facebook")) return "facebook";
  if (key.includes("whatsapp")) return "whatsapp";
  if (key === "x" || key.includes("twitter")) return "x";
  return key;
}

export function SocialIcon({
  label,
  size = 18,
}: {
  label: string;
  size?: number;
}) {
  const platform = getSocialPlatform(label);
  const Icon = brandIcons[platform] ?? null;
  if (!Icon) return null;
  return <Icon aria-hidden="true" size={size} />;
}
