"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import Image from "next/image";

type MediaLike = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export type CategoryCardData = {
  slug?: string | null;
  name?: string | null;
  description?: string | null;
  image?: MediaLike | number | null;
};

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
      width={media.width ?? 600}
      height={media.height ?? 450}
      className={className}
    />
  );
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const label = direction === "prev" ? "Previous categories" : "Next categories";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-primary)] bg-white text-[var(--color-primary)] shadow-sm transition-colors hover:bg-[var(--color-primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[var(--color-primary)]"
    >
      <Icon aria-hidden="true" size={20} />
    </button>
  );
}

type ProductCategoryCarouselProps = {
  categories: CategoryCardData[];
  locale: Locale;
};

export function ProductCategoryCarousel({ categories, locale }: ProductCategoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    dragFree: false,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setTimeout(() => onSelect(), 0);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      clearTimeout(id);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <ArrowButton direction="prev" onClick={scrollPrev} disabled={prevBtnDisabled} />
        <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {categories.map((category, index) => {
              const slug = category.slug;
              const title = category.name ?? "Category";
              const description = category.description ?? "";
              return (
                <div
                  key={slug ?? index}
                  className="min-w-0 shrink-0 grow-0 basis-full px-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <article className="product-card group h-full">
                    <div className="aspect-[4/3] overflow-hidden bg-[var(--color-soft)]">
                      <CmsImage
                        media={category.image}
                        alt={`${title} placeholder`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-black text-[var(--color-ink)] line-clamp-1">{title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-muted)] line-clamp-3">{description}</p>
                      <Link
                        href={slug ? `/products/category/${slug}` : "/products"}
                        locale={locale}
                        className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                      >
                        View Products <ArrowRight aria-hidden="true" size={14} />
                      </Link>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
        <ArrowButton direction="next" onClick={scrollNext} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
}
