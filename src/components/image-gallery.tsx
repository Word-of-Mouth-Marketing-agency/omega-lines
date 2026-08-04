"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type MediaLike = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

function SaltPlaceholder({ className, label }: { className: string; label: string }) {
  return (
    <div className={`${className} salt-visual`} role="img" aria-label={label}>
      <span className="salt-visual__ridge" aria-hidden="true" />
      <span className="salt-visual__belt" aria-hidden="true" />
    </div>
  );
}

type ImageGalleryProps = {
  images: MediaLike[];
  productName: string;
};

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const allImages = images.length > 0 ? images : [];
  const mainImage = allImages[selectedIndex] ?? null;

  const showPrevious = () => {
    setSelectedIndex((current) => (current - 1 + allImages.length) % allImages.length);
  };

  const showNext = () => {
    setSelectedIndex((current) => (current + 1) % allImages.length);
  };

  if (!mainImage) {
    return (
      <div className="aspect-[4/3] overflow-hidden rounded-md bg-[var(--color-soft)]">
        <SaltPlaceholder className="h-full w-full" label={productName} />
      </div>
    );
  }

  const isActive = (i: number) => i === selectedIndex;

  return (
    <>
      <div className="group relative aspect-[4/3] overflow-hidden rounded-md bg-[var(--color-soft)]">
        <button
          onClick={() => setLightboxOpen(true)}
          className="h-full w-full cursor-zoom-in"
          aria-label="View full size"
        >
          <Image
            src={mainImage.url ?? ""}
            alt={mainImage.alt ?? productName}
            width={mainImage.width ?? 800}
            height={mainImage.height ?? 600}
            priority
            className="h-full w-full object-cover"
          />
        </button>
        {allImages.length > 1 ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[var(--color-primary-strong)] shadow-lg transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:left-4"
              aria-label="Previous product image"
            >
              <ChevronLeft aria-hidden="true" size={24} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[var(--color-primary-strong)] shadow-lg transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:right-4"
              aria-label="Next product image"
            >
              <ChevronRight aria-hidden="true" size={24} strokeWidth={2.5} />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-3 py-1 text-xs font-bold text-white shadow sm:bottom-4 sm:right-4">
              {selectedIndex + 1} / {allImages.length}
            </span>
          </>
        ) : null}
      </div>

      {allImages.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto" role="tablist" aria-label="Product image thumbnails">
          {allImages.map((img, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={isActive(i)}
              aria-label={`View image ${i + 1}`}
              onClick={() => setSelectedIndex(i)}
              className={`size-16 shrink-0 overflow-hidden rounded border-2 transition-colors ${
                isActive(i)
                  ? "border-[var(--color-primary)]"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url ?? ""}
                alt={img.alt ?? `${productName} thumbnail ${i + 1}`}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxOpen(false); }}
        >
          <div className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center">
            <Image
              src={mainImage.url ?? ""}
              alt={mainImage.alt ?? productName}
              width={mainImage.width ?? 1600}
              height={mainImage.height ?? 1200}
              className="max-h-[85vh] w-auto rounded-md object-contain"
              sizes="90vw"
              priority
            />
            {allImages.length > 1 ? (
              <p className="mt-3 text-sm text-white/50">
                {selectedIndex + 1} / {allImages.length}
              </p>
            ) : null}
          </div>
          {allImages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--color-primary-strong)] shadow-lg transition hover:bg-white sm:left-6 sm:size-12"
                aria-label="Previous product image"
              >
                <ChevronLeft aria-hidden="true" size={26} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--color-primary-strong)] shadow-lg transition hover:bg-white sm:right-6 sm:size-12"
                aria-label="Next product image"
              >
                <ChevronRight aria-hidden="true" size={26} strokeWidth={2.5} />
              </button>
            </>
          ) : null}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            aria-label="Close lightbox"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>
      ) : null}
    </>
  );
}
