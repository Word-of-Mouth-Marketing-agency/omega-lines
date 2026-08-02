import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}

export function localePrefix(locale: Locale): "" | `/${Locale}` {
  return locale === defaultLocale ? "" : `/${locale}`;
}
