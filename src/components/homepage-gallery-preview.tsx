"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { MediaLightbox } from "./media-lightbox";
import { StaggerGrid } from "./gsap-reveal";

type MediaLike = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

type GalleryLike = {
  id?: string | number;
  title?: string | null;
  description?: string | null;
  image?: MediaLike | number | null;
};

function isMedia(value: MediaLike | number | null | undefined): value is MediaLike {
  return typeof value === "object" && value !== null && typeof value.url === "string";
}

type HomepageGalleryPreviewProps = {
  items: GalleryLike[];
};

export function HomepageGalleryPreview({ items }: HomepageGalleryPreviewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const lightboxItems = useMemo(
    () =>
      items
        .filter((item) => isMedia(item.image))
        .map((item) => ({
          url: (item.image as MediaLike).url ?? "",
          alt: (item.image as MediaLike).alt ?? item.title ?? "Gallery image",
          width: (item.image as MediaLike).width,
          height: (item.image as MediaLike).height,
          caption: item.description ?? item.title ?? null,
        })),
    [items]
  );

  return (
    <>
      <StaggerGrid className="mx-auto mt-10 grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8" stagger={0.06}>
        {items.slice(0, 6).map((item, index) => {
          const hasImage = isMedia(item.image);
          const img = hasImage ? (item.image as MediaLike) : null;
          return (
            <button
              key={item.id ?? index}
              onClick={() => {
                if (hasImage) openLightbox(index);
              }}
              disabled={!hasImage}
              className={`gallery-tile group relative overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
                hasImage ? "cursor-pointer" : "cursor-default"
              }`}
              aria-label={hasImage ? `Open full preview of ${item.title ?? "gallery image"}` : undefined}
            >
              {img ? (
                <Image
                  src={img.url ?? ""}
                  alt={img.alt ?? item.title ?? "Gallery image"}
                  width={img.width ?? 600}
                  height={img.height ?? 450}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="salt-visual h-full w-full" role="img" aria-label={item.title ?? "Gallery image"}>
                  <span className="salt-visual__ridge" aria-hidden="true" />
                  <span className="salt-visual__belt" aria-hidden="true" />
                </div>
              )}
              {hasImage ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[var(--color-primary)] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <Maximize2 aria-hidden="true" size={18} />
                  </span>
                </div>
              ) : null}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-sm:opacity-100 max-sm:pt-12">
                <p className="text-sm font-bold text-white">{item.title ?? "Gallery image"}</p>
              </div>
            </button>
          );
        })}
      </StaggerGrid>
      {lightboxIndex !== null && lightboxItems.length > 0 ? (
        <MediaLightbox
          items={lightboxItems}
          initialIndex={Math.min(lightboxIndex, lightboxItems.length - 1)}
          onClose={closeLightbox}
        />
      ) : null}
    </>
  );
}
