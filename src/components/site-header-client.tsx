"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";
import { LanguageSwitcher } from "./language-switcher";
import { SocialIcon } from "./social-icon-link";

type NavItem = {
  href: string;
  label: string;
};

type ProductCategoryLink = {
  slug: string;
  name: string;
};

type SocialLink = {
  label: string;
  url: string;
};

type SiteHeaderClientProps = {
  locale: Locale;
  navItems: NavItem[];
  productCategories: ProductCategoryLink[];
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  socialLinks: SocialLink[];
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isProductsItem(item: NavItem) {
  const path = item.href.split("?")[0]?.replace(/\/+$/, "") || "/";
  return path === "/products";
}

const preHeaderSocialLabels = ["facebook", "whatsapp", "x"];

const productNavigationLabels: Record<Locale, { heading: string; viewAll: string; empty: string }> = {
  en: {
    heading: "Products",
    viewAll: "View all products",
    empty: "No products available",
  },
  fr: {
    heading: "Produits",
    viewAll: "Voir tous les produits",
    empty: "Aucun produit disponible",
  },
  de: {
    heading: "Produkte",
    viewAll: "Alle Produkte ansehen",
    empty: "Keine Produkte verfügbar",
  },
};

export function SiteHeaderClient({
  locale,
  navItems,
  productCategories,
  contact,
  socialLinks,
}: SiteHeaderClientProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const drawerId = useId();
  const desktopProductsId = useId();
  const productsTriggerId = useId();
  const firstProductId = useId();
  const mobileProductsId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const productsMenuRef = useRef<HTMLLIElement>(null);
  const productLabels = productNavigationLabels[locale];

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 8);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setMenuOpen(false);
      setProductsOpen(false);
      setMobileProductsOpen(false);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    if (!productsOpen) return;

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setProductsOpen(false);
      (document.getElementById(productsTriggerId) as HTMLAnchorElement | null)?.focus();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [productsOpen, productsTriggerId]);

  useEffect(() => {
    if (!menuOpen) return;

    const close = closeRef.current;
    const trigger = triggerRef.current;

    close?.focus();

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
      trigger?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setMobileProductsOpen(false);
    };

    const handleFocusTrap = (event: globalThis.FocusEvent) => {
      if (!drawerRef.current?.contains(event.target as Node)) {
        closeRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusTrap);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusTrap);
    };
  }, [menuOpen]);

  const closeDrawer = useCallback(() => {
    setMenuOpen(false);
    setMobileProductsOpen(false);
  }, []);

  const closeProductsMenuWhenFocusLeaves = useCallback((event: FocusEvent<HTMLLIElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (!nextTarget || !productsMenuRef.current?.contains(nextTarget)) {
      setProductsOpen(false);
    }
  }, []);

  const handleProductsTriggerKeyDown = useCallback((event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setProductsOpen(true);
      requestAnimationFrame(() => {
        (document.getElementById(firstProductId) as HTMLAnchorElement | null)?.focus();
      });
    }
  }, [firstProductId]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md">
      <div className="bg-[var(--color-primary-strong)] text-white">
        <div className="mx-auto flex min-h-9 w-full max-w-7xl items-center justify-between gap-3 px-4 text-xs sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <a className="hidden items-center gap-1.5 truncate hover:text-white/80 sm:inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href={`mailto:${contact.email}`}>
              <Mail aria-hidden="true" size={14} className="shrink-0" />
              {contact.email}
            </a>
            <a className="inline-flex items-center gap-1.5 truncate hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href={`tel:${contact.phone.replaceAll(" ", "")}`}>
              <Phone aria-hidden="true" size={14} className="shrink-0" />
              {contact.phone}
            </a>
            <span className="hidden items-center gap-1.5 truncate text-white/80 lg:inline-flex">
              <MapPin aria-hidden="true" size={14} className="shrink-0" />
              {contact.location}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {preHeaderSocialLabels.map((key) => {
              const link = socialLinks.find((item) => item.label.toLowerCase().trim() === key);
              if (!link?.url) return null;
              return (
                <a
                  key={key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={link.label}
                >
                  <SocialIcon label={link.label} size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`border-b border-[var(--color-border)] transition-shadow duration-200 ${
          scrolled ? "shadow-[0_12px_36px_rgba(10,63,122,0.10)]" : "shadow-none"
        }`}
      >
        <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" locale={locale} className="flex min-h-12 shrink-0 items-center text-[var(--color-ink)]">
            <Image
              src="/images/brand/omega-logo.webp"
              alt="Omega Line"
              width={784}
              height={580}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-1 text-sm font-semibold">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);

                if (isProductsItem(item)) {
                  return (
                    <li
                      key={item.href}
                      ref={productsMenuRef}
                      className="relative"
                      onMouseEnter={() => setProductsOpen(true)}
                      onMouseLeave={() => setProductsOpen(false)}
                      onFocusCapture={() => setProductsOpen(true)}
                      onBlurCapture={closeProductsMenuWhenFocusLeaves}
                    >
                      <Link
                        id={productsTriggerId}
                        href="/products"
                        locale={locale}
                        aria-current={active ? "page" : undefined}
                        aria-haspopup="true"
                        aria-expanded={productsOpen}
                        aria-controls={desktopProductsId}
                        onKeyDown={handleProductsTriggerKeyDown}
                        className={`relative flex min-h-11 items-center gap-1.5 px-3 font-semibold transition-colors ${
                          active ? "text-[var(--color-primary)]" : "text-[var(--color-ink)] hover:text-[var(--color-primary)]"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden="true"
                          size={15}
                          className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                        />
                        {active ? (
                          <span className="absolute inset-x-3 bottom-1 h-0.5 bg-[var(--color-primary)]" aria-hidden="true" />
                        ) : null}
                      </Link>

                      <div
                        id={desktopProductsId}
                        aria-label={productLabels.heading}
                        className={`absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-2 transition duration-150 ${
                          productsOpen
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-1 opacity-0"
                        }`}
                      >
                        <div className="border border-[var(--color-border)] bg-white p-3 shadow-[0_20px_55px_rgba(10,63,122,0.18)]">
                          <div className="border-b border-[var(--color-border)] px-3 pb-3 pt-1">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-muted)]">
                              {productLabels.heading}
                            </p>
                          </div>

                          {productCategories.length > 0 ? (
                            <div className="grid grid-cols-2 gap-1 py-2">
                              {productCategories.map((category, index) => (
                                <Link
                                  key={category.slug}
                                  id={index === 0 ? firstProductId : undefined}
                                  href={`/products#category-${category.slug}`}
                                  locale={locale}
                                  onClick={() => setProductsOpen(false)}
                                  className="group flex min-h-11 items-center justify-between gap-3 px-3 py-2 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-soft)] hover:text-[var(--color-primary)]"
                                >
                                  <span>{category.name}</span>
                                  <ArrowRight aria-hidden="true" size={14} className="shrink-0 opacity-45 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <p className="px-3 py-5 text-sm text-[var(--color-muted)]">{productLabels.empty}</p>
                          )}

                          <div className="border-t border-[var(--color-border)] pt-2">
                            <Link
                              href="/products"
                              locale={locale}
                              onClick={() => setProductsOpen(false)}
                              className="flex min-h-11 items-center justify-between px-3 text-sm font-black text-[var(--color-primary)] transition-colors hover:bg-[var(--color-soft)]"
                            >
                              {productLabels.viewAll}
                              <ArrowRight aria-hidden="true" size={15} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      locale={locale}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex min-h-11 items-center px-3 font-semibold transition-colors ${
                        active ? "text-[var(--color-primary)]" : "text-[var(--color-ink)] hover:text-[var(--color-primary)]"
                      }`}
                    >
                      {item.label}
                      {active ? (
                        <span className="absolute inset-x-3 bottom-1 h-0.5 bg-[var(--color-primary)]" aria-hidden="true" />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher locale={locale} />
            <Link
              href="/contact"
              locale={locale}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--color-primary-strong)] px-5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(10,63,122,0.18)] transition hover:bg-[var(--color-primary)] active:scale-[0.98]"
            >
              Request a Quote
            </Link>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md border border-[var(--color-border)] text-sm font-bold text-[var(--color-ink)] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={drawerId}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((value: boolean) => !value)}
          >
            {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>

      {mounted && createPortal(
        <div
          id={drawerId}
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          className={`fixed inset-0 z-[100] transition-opacity duration-200 ${
            menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-black/50 transition-opacity duration-200"
            style={{ opacity: menuOpen ? 1 : 0 }}
            onClick={closeDrawer}
          />

          <aside
            className={`absolute inset-y-0 right-0 flex flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-200 ease-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ width: "min(88vw, 380px)", maxWidth: "min(88vw, 380px)" }}
            onClick={(event: MouseEvent<HTMLElement>) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-4">
              <Link href="/" locale={locale} className="flex shrink-0 items-center" onClick={closeDrawer}>
                <Image
                  src="/images/brand/omega-logo.webp"
                  alt="Omega Line"
                  width={784}
                  height={580}
                  className="h-10 w-auto"
                />
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={closeDrawer}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-[var(--color-ink)] transition-colors hover:bg-[var(--color-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                aria-label="Close navigation"
              >
                <X aria-hidden="true" size={22} />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 px-3 py-4">
              <ul className="grid gap-0.5">
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href);

                  if (isProductsItem(item)) {
                    return (
                      <li key={item.href}>
                        <button
                          type="button"
                          aria-expanded={mobileProductsOpen}
                          aria-controls={mobileProductsId}
                          onClick={() => setMobileProductsOpen((value: boolean) => !value)}
                          className={`flex min-h-12 w-full items-center justify-between rounded-md px-4 text-left text-base font-bold transition-colors ${
                            active
                              ? "bg-[var(--color-soft)] text-[var(--color-primary)]"
                              : "text-[var(--color-ink)] hover:bg-[var(--color-soft)] hover:text-[var(--color-primary)]"
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            aria-hidden="true"
                            size={18}
                            className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        <div
                          id={mobileProductsId}
                          hidden={!mobileProductsOpen}
                          className="mx-3 mb-2 border-l-2 border-[var(--color-border)] pl-2"
                        >
                          <Link
                            href="/products"
                            locale={locale}
                            onClick={closeDrawer}
                            className="flex min-h-11 items-center px-3 text-sm font-black text-[var(--color-primary)] hover:bg-[var(--color-soft)]"
                          >
                            {productLabels.viewAll}
                          </Link>
                          {productCategories.map((category) => (
                            <Link
                              key={category.slug}
                              href={`/products#category-${category.slug}`}
                              locale={locale}
                              onClick={closeDrawer}
                              className="flex min-h-11 items-center px-3 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-soft)] hover:text-[var(--color-primary)]"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        locale={locale}
                        aria-current={active ? "page" : undefined}
                        onClick={closeDrawer}
                        className={`flex min-h-12 items-center rounded-md px-4 text-base font-bold transition-colors ${
                          active
                            ? "bg-[var(--color-soft)] text-[var(--color-primary)]"
                            : "text-[var(--color-ink)] hover:bg-[var(--color-soft)] hover:text-[var(--color-primary)]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-[var(--color-border)] px-3 py-4">
              <Link
                href="/contact"
                locale={locale}
                onClick={closeDrawer}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[var(--color-primary-strong)] px-4 text-sm font-bold text-white shadow-[0_10px_24px_rgba(10,63,122,0.18)] transition hover:bg-[var(--color-primary)] active:scale-[0.98]"
              >
                Request a Quote <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>

            <div className="border-t border-[var(--color-border)] px-3 py-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                Language
              </p>
              <div className="flex gap-2">
                {locales.map((item) => {
                  const activeLocale = item === locale;
                  return (
                    <Link
                      key={item}
                      href={pathname}
                      locale={item}
                      onClick={closeDrawer}
                      className={`flex min-h-11 flex-1 items-center justify-center rounded-md text-sm font-bold uppercase transition-colors ${
                        activeLocale
                          ? "bg-[var(--color-primary)] text-white"
                          : "border border-[var(--color-border)] text-[var(--color-ink)] hover:bg-[var(--color-soft)]"
                      }`}
                      aria-label={activeLocale ? `${item.toUpperCase()} (current)` : item.toUpperCase()}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>,
        document.body,
      )}
    </header>
  );
}
