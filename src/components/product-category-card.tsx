import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { CmsMedia } from "@/lib/cms";

type ProductCategoryCardProps = {
  locale: Locale;
  slug: string;
  name: string;
  description?: string | null;
  image?: CmsMedia | number | null;
};

function isMedia(value: CmsMedia | number | null | undefined): value is CmsMedia {
  return typeof value === "object" && value !== null && typeof value.url === "string";
}

function CategoryFallback({ name }: { name: string }) {
  return (
    <div
      className="salt-visual relative h-full w-full overflow-hidden bg-[var(--color-soft)]"
      role="img"
      aria-label={`${name} category illustration`}
    >
      <span className="salt-visual__ridge" aria-hidden="true" />
      <span className="salt-visual__belt" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-primary-strong)]/45 to-transparent p-5 pt-16">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-white/90">Omega Lines</span>
      </div>
    </div>
  );
}

export function ProductCategoryCard({
  locale,
  slug,
  name,
  description,
  image,
}: ProductCategoryCardProps) {
  return (
    <article className="product-card group h-full">
      <Link
        href={`/products/category/${slug}`}
        locale={locale}
        className="relative block aspect-[16/10] overflow-hidden bg-[var(--color-soft)] focus-visible:outline-none"
        aria-label={`Explore ${name}`}
      >
        {isMedia(image) ? (
          <Image
            src={image.url ?? ""}
            alt={image.alt ?? name}
            width={image.width ?? 900}
            height={image.height ?? 560}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        ) : (
          <CategoryFallback name={name} />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" aria-hidden="true" />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-black text-[var(--color-ink)]">
          <Link
            href={`/products/category/${slug}`}
            locale={locale}
            className="transition-colors hover:text-[var(--color-primary)]"
          >
            {name}
          </Link>
        </h2>
        {description ? (
          <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-muted)] line-clamp-3">
            {description}
          </p>
        ) : (
          <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-muted)]">
            Explore the products and available grades within this category.
          </p>
        )}
        <Link
          href={`/products/category/${slug}`}
          locale={locale}
          className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-black text-[var(--color-primary)]"
        >
          Explore Category <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </article>
  );
}
