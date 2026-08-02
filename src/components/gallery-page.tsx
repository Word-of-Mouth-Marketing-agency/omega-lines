"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize2 } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { InnerPageHero } from "./inner-page-hero";
import { SectionHeading } from "./section-heading";
import { EmptyState } from "./empty-state";
import { MediaLightbox } from "./media-lightbox";
import { Reveal, StaggerGrid } from "./gsap-reveal";

type MediaLike = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

type GalleryItemLike = {
  id?: string | number;
  title?: string | null;
  description?: string | null;
  image?: MediaLike | number | null;
  category?: string | null;
  sortOrder?: number | null;
};

const galleryCategories = [
  { value: "", label: "All" },
  { value: "bulk-shipments", label: "Bulk Shipments" },
  { value: "packing-in-bags", label: "Packing in Bags" },
  { value: "packing-in-sacks", label: "Packing in Sacks" },
  { value: "packing-in-sling-jumbo-bags", label: "Packing in Sling & Jumbo Bags" },
  { value: "shipping-in-containers", label: "Shipping in Containers" },
];

const placeholderItems: GalleryItemLike[] = [
  { id: 1, title: "Bulk shipment arrival", description: "Development gallery placeholder. Replace with actual CMS media.", category: "bulk-shipments" },
  { id: 2, title: "Loading bulk salt", description: "Development gallery placeholder. Replace with actual CMS media.", category: "bulk-shipments" },
  { id: 3, title: "Bag packing line", description: "Development gallery placeholder. Replace with actual CMS media.", category: "packing-in-bags" },
  { id: 4, title: "Bagged product storage", description: "Development gallery placeholder. Replace with actual CMS media.", category: "packing-in-bags" },
  { id: 5, title: "Sack filling operation", description: "Development gallery placeholder. Replace with actual CMS media.", category: "packing-in-sacks" },
  { id: 6, title: "Sling bag handling", description: "Development gallery placeholder. Replace with actual CMS media.", category: "packing-in-sling-jumbo-bags" },
  { id: 7, title: "Jumbo bag loading", description: "Development gallery placeholder. Replace with actual CMS media.", category: "packing-in-sling-jumbo-bags" },
  { id: 8, title: "Container loading process", description: "Development gallery placeholder. Replace with actual CMS media.", category: "shipping-in-containers" },
];

function isMedia(value: MediaLike | number | null | undefined): value is MediaLike {
  return typeof value === "object" && value !== null && typeof value.url === "string";
}

function SaltPlaceholder({ className, label }: { className: string; label: string }) {
  return (
    <div className={`${className} salt-visual`} role="img" aria-label={label}>
      <span className="salt-visual__ridge" aria-hidden="true" />
      <span className="salt-visual__belt" aria-hidden="true" />
    </div>
  );
}

function CmsImage({
  media,
  alt,
  className,
}: {
  media?: MediaLike | number | null;
  alt: string;
  className: string;
}) {
  if (!isMedia(media)) {
    return <SaltPlaceholder className={className} label={alt} />;
  }
  return (
    <Image
      src={media.url ?? ""}
      alt={media.alt ?? alt}
      width={media.width ?? 800}
      height={media.height ?? 600}
      className={className}
    />
  );
}

type GalleryPageProps = {
  locale: Locale;
  items?: GalleryItemLike[];
};

export function GalleryPage({ items = [] }: GalleryPageProps) {
  const [activeCategory, setActiveCategory] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems = items.length > 0 ? items : placeholderItems;

  const filtered = useMemo(
    () => (activeCategory ? galleryItems.filter((item) => item.category === activeCategory) : galleryItems),
    [activeCategory, galleryItems]
  );

  const lightboxItems = useMemo(
    () =>
      filtered
        .filter((item) => isMedia(item.image))
        .map((item) => ({
          url: (item.image as MediaLike).url ?? "",
          alt: (item.image as MediaLike).alt ?? item.title ?? "Gallery image",
          width: (item.image as MediaLike).width,
          height: (item.image as MediaLike).height,
          caption: item.description ?? item.title ?? null,
        })),
    [filtered]
  );

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <main id="main-content">
      <InnerPageHero title="Gallery" />

      <Reveal as="section" className="section-band">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery by category">
            {galleryCategories.map((cat) => (
              <button
                key={cat.value}
                role="tab"
                aria-selected={activeCategory === cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-md px-4 py-2 text-sm font-bold transition-colors ${
                  activeCategory === cat.value
                    ? "bg-[var(--color-primary)] text-white"
                    : "border border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:bg-[var(--color-soft)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <StaggerGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.06}>
              {filtered.map((item, index) => {
                const hasImage = isMedia(item.image);
                return (
                  <button
                    key={item.id ?? index}
                    onClick={() => {
                      if (hasImage) openLightbox(index);
                    }}
                    className={`gallery-tile group relative overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
                      hasImage ? "cursor-pointer" : "cursor-default"
                    }`}
                    aria-label={hasImage ? `Open full preview of ${item.title ?? "gallery image"}` : undefined}
                    disabled={!hasImage}
                  >
                    <CmsImage
                      media={item.image}
                      alt={item.title ?? "Gallery image"}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    {hasImage ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[var(--color-primary)] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                          <Maximize2 aria-hidden="true" size={18} />
                        </span>
                      </div>
                    ) : null}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-sm:opacity-100 max-sm:pt-12">
                      <p className="text-sm font-bold text-white">{item.title ?? "Gallery image"}</p>
                      {item.description ? (
                        <p className="mt-1 text-xs text-white/70 line-clamp-2">{item.description}</p>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </StaggerGrid>
          ) : (
            <div className="mt-8">
              <EmptyState
                message={`No gallery items found in this category. ${
                  items.length === 0
                    ? "Add gallery entries in Payload CMS to populate this page."
                    : "Try selecting a different category."
                }`}
              />
            </div>
          )}

          {items.length === 0 ? (
            <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
              Development placeholder gallery items shown. Add real media in Payload CMS &gt; Gallery.
            </p>
          ) : null}
        </div>
      </Reveal>

      <Reveal as="section" className="section-band bg-[var(--color-soft)]">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get in touch"
            title="Interested in Our Products?"
            description="Contact us for more information about our salt products, samples, or pricing."
          />
          <div className="mt-8">
            <Link
              href="/contact"
              className="cta-button bg-[var(--color-primary-strong)] text-white hover:bg-[var(--color-primary)]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Reveal>

      {lightboxIndex !== null && lightboxItems.length > 0 ? (
        <MediaLightbox
          items={lightboxItems}
          initialIndex={Math.min(lightboxIndex, lightboxItems.length - 1)}
          onClose={closeLightbox}
        />
      ) : null}
    </main>
  );
}
