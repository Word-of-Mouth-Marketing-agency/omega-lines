"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { CatalogProduct } from "@/data/products";

function ArrowButton({ direction, onClick, disabled }: { direction: "prev" | "next"; onClick: () => void; disabled: boolean }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous products" : "Next products"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-primary)] bg-white text-[var(--color-primary)] shadow-sm transition-colors hover:bg-[var(--color-primary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Icon aria-hidden="true" size={20} />
    </button>
  );
}

export function ProductCarousel({ items, locale }: { items: CatalogProduct[]; locale: Locale }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const updateButtons = useCallback(() => {
    setPrevDisabled(!emblaApi?.canScrollPrev());
    setNextDisabled(!emblaApi?.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const raf = requestAnimationFrame(updateButtons);
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  return (
    <div className="flex items-center gap-3">
      <ArrowButton direction="prev" onClick={() => emblaApi?.scrollPrev()} disabled={prevDisabled} />
      <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((product) => (
            <div key={product.slug} className="min-w-0 shrink-0 grow-0 basis-full px-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <article className="product-card group h-full">
                <Link href={`/products/${product.slug}`} locale={locale} className="block aspect-[4/3] overflow-hidden bg-[var(--color-soft)]">
                  <Image src={product.image.url} alt={product.image.alt} width={product.image.width} height={product.image.height} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-black text-[var(--color-ink)]">{product.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-muted)] line-clamp-3">{product.shortDescription}</p>
                  <Link href={`/products/${product.slug}`} locale={locale} className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[var(--color-primary)]">
                    View Product <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
      <ArrowButton direction="next" onClick={() => emblaApi?.scrollNext()} disabled={nextDisabled} />
    </div>
  );
}
