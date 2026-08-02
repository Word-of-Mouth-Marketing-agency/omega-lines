"use client";

import { useEffect, useRef, useState } from "react";
import { locales, localeLabels } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/i18n/routing";

function FlagGb({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
      <defs>
        <clipPath id="gb"><rect width="60" height="60" rx="4" /></clipPath>
      </defs>
      <g clipPath="url(#gb)">
        <rect width="60" height="60" fill="#012169" />
        <line x1="0" y1="0" x2="60" y2="60" stroke="#FFF" strokeWidth="12" />
        <line x1="60" y1="0" x2="0" y2="60" stroke="#FFF" strokeWidth="12" />
        <line x1="0" y1="0" x2="60" y2="60" stroke="#C8102E" strokeWidth="4" />
        <line x1="60" y1="0" x2="0" y2="60" stroke="#C8102E" strokeWidth="4" />
        <rect x="22" y="0" width="16" height="60" fill="#FFF" />
        <rect x="0" y="22" width="60" height="16" fill="#FFF" />
        <rect x="25" y="0" width="10" height="60" fill="#C8102E" />
        <rect x="0" y="25" width="60" height="10" fill="#C8102E" />
      </g>
    </svg>
  );
}

function FlagFr({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
      <defs>
        <clipPath id="fr"><rect width="60" height="60" rx="4" /></clipPath>
      </defs>
      <g clipPath="url(#fr)">
        <rect x="0" y="0" width="20" height="60" fill="#002395" />
        <rect x="20" y="0" width="20" height="60" fill="#FFF" />
        <rect x="40" y="0" width="20" height="60" fill="#ED2939" />
      </g>
    </svg>
  );
}

function FlagDe({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
      <defs>
        <clipPath id="de"><rect width="60" height="60" rx="4" /></clipPath>
      </defs>
      <g clipPath="url(#de)">
        <rect x="0" y="0" width="60" height="20" fill="#000" />
        <rect x="0" y="20" width="60" height="20" fill="#DD0000" />
        <rect x="0" y="40" width="60" height="20" fill="#FFCE00" />
      </g>
    </svg>
  );
}

const flagComponents: Record<Locale, typeof FlagGb> = {
  en: FlagGb,
  fr: FlagFr,
  de: FlagDe,
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const CurrentFlag = flagComponents[locale];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="flex min-h-10 items-center gap-2 rounded-md border border-[var(--color-border)] px-3 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${localeLabels[locale]}`}
        onClick={() => setOpen((v) => !v)}
      >
        <CurrentFlag size={18} />
        <span className="font-bold tracking-wide">{locale.toUpperCase()}</span>
        <ChevronDown
          aria-hidden="true"
          size={14}
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full z-50 mt-1 min-w-[9rem] overflow-hidden rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-lg"
        >
          {locales.map((item) => {
            const Flag = flagComponents[item];
            const selected = item === locale;
            return (
              <li key={item} role="option" aria-selected={selected}>
                <Link
                  href={pathname}
                  locale={item}
                  className={`flex min-h-10 items-center gap-3 px-3 text-sm font-semibold transition-colors ${
                    selected
                      ? "bg-[var(--color-soft)] text-[var(--color-primary)]"
                      : "text-[var(--color-ink)] hover:bg-[var(--color-soft)]"
                  }`}
                  aria-label={localeLabels[item]}
                  onClick={() => setOpen(false)}
                >
                  <Flag size={18} />
                  <span>{localeLabels[item]}</span>
                  <span className="ml-auto text-xs font-medium uppercase text-[var(--color-muted)]">{item}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
