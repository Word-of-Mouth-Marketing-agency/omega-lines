"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type MediaItem = {
  url: string;
  alt: string;
  width?: number | null;
  height?: number | null;
  caption?: string | null;
};

type MediaLightboxProps = {
  items: MediaItem[];
  initialIndex: number;
  onClose: () => void;
};

export function MediaLightbox({ items, initialIndex, onClose }: MediaLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const current = items[currentIndex];
  const closeRef = useRef<HTMLButtonElement>(null);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1 < items.length ? prev + 1 : prev));
  }, [items.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
      }
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
    >
      <div className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center">
        <Image
          src={current.url}
          alt={current.alt}
          width={current.width ?? 1600}
          height={current.height ?? 1200}
          className="max-h-[80vh] w-auto rounded-md object-contain"
          sizes="90vw"
          priority
        />
        {(current.caption || current.alt) ? (
          <p className="mt-3 text-center text-sm text-white/70">
            {current.caption ?? current.alt}
          </p>
        ) : null}
        {items.length > 1 ? (
          <p className="mt-2 text-xs text-white/40">
            {currentIndex + 1} / {items.length}
          </p>
        ) : null}
      </div>

      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Close lightbox"
      >
        <X aria-hidden="true" size={20} />
      </button>

      {items.length > 1 ? (
        <>
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            aria-disabled={currentIndex === 0}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-30 disabled:hover:bg-white/10"
          >
            <ChevronLeft aria-hidden="true" size={24} />
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === items.length - 1}
            aria-disabled={currentIndex === items.length - 1}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-30 disabled:hover:bg-white/10"
          >
            <ChevronRight aria-hidden="true" size={24} />
          </button>
        </>
      ) : null}
    </div>
  );
}
