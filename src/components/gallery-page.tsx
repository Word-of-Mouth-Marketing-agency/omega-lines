"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { InnerPageHero } from "./inner-page-hero";
import { SectionHeading } from "./section-heading";
import { MediaLightbox } from "./media-lightbox";
import { Reveal, StaggerGrid } from "./gsap-reveal";
import { galleryImages } from "@/data/gallery-images";
import { Link } from "@/i18n/navigation";

type GalleryPageProps = {
  locale?: string;
};

export function GalleryPage({ locale }: GalleryPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems = useMemo(
    () =>
      galleryImages.map((img) => ({
        url: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
        caption: img.alt,
      })),
    []
  );

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <main id="main-content">
      <InnerPageHero title="Gallery" />

      <Reveal as="section" className="section-band">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGrid
            className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4"
            stagger={0.04}
          >
            {galleryImages.map((img, index) => (
              <button
                key={img.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden rounded-md bg-[var(--color-soft)] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                aria-label={`Open full preview of ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[var(--color-primary)] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <Maximize2 aria-hidden="true" size={15} />
                  </span>
                </div>
              </button>
            ))}
          </StaggerGrid>
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
              locale={locale}
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
