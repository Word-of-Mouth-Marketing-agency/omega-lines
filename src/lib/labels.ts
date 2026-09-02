import type { Locale } from "@/i18n/routing";

export const navLabels: Record<Locale, {
  home: string;
  about: string;
  products: string;
  gallery: string;
  contact: string;
  requestQuote: string;
  viewAllProducts: string;
  closeNavigation: string;
  openNavigation: string;
  language: string;
  languageCurrent: string;
  mobileNavigation: string;
  mainLinks: string;
  contactHeading: string;
  allRightsReserved: string;
  poweredBy: string;
}> = {
  en: {
    home: "Home",
    about: "About",
    products: "Products",
    gallery: "Gallery",
    contact: "Contact",
    requestQuote: "Request a Quote",
    viewAllProducts: "View all products",
    closeNavigation: "Close navigation",
    openNavigation: "Open navigation",
    language: "Language",
    languageCurrent: "current",
    mobileNavigation: "Mobile navigation",
    mainLinks: "Main links",
    contactHeading: "Contact",
    allRightsReserved: "All rights reserved.",
    poweredBy: "Powered by",
  },
  fr: {
    home: "Accueil",
    about: "À propos",
    products: "Produits",
    gallery: "Galerie",
    contact: "Contact",
    requestQuote: "Demander un devis",
    viewAllProducts: "Voir tous les produits",
    closeNavigation: "Fermer la navigation",
    openNavigation: "Ouvrir la navigation",
    language: "Langue",
    languageCurrent: "actuel",
    mobileNavigation: "Navigation mobile",
    mainLinks: "Liens principaux",
    contactHeading: "Contact",
    allRightsReserved: "Tous droits réservés.",
    poweredBy: "Propulsé par",
  },
  de: {
    home: "Startseite",
    about: "Über uns",
    products: "Produkte",
    gallery: "Galerie",
    contact: "Kontakt",
    requestQuote: "Angebot anfordern",
    viewAllProducts: "Alle Produkte ansehen",
    closeNavigation: "Navigation schließen",
    openNavigation: "Navigation öffnen",
    language: "Sprache",
    languageCurrent: "aktuell",
    mobileNavigation: "Mobile Navigation",
    mainLinks: "Hauptlinks",
    contactHeading: "Kontakt",
    allRightsReserved: "Alle Rechte vorbehalten.",
    poweredBy: "Bereitgestellt von",
  },
};

export function localizedNav(locale: Locale) {
  const labels = navLabels[locale];
  return [
    { href: "/", label: labels.home },
    { href: "/about", label: labels.about },
    { href: "/products", label: labels.products },
    { href: "/gallery", label: labels.gallery },
    { href: "/contact", label: labels.contact },
  ];
}
