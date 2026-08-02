import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";

type MediaLike = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

const PRODUCT_IMAGE_PLACEHOLDER = "/images/home/about-salt.webp";

function CmsImage({
  media,
  alt,
  className,
}: {
  media?: MediaLike | number | null;
  alt: string;
  className: string;
}) {
  if (
    !media
    || typeof media !== "object"
    || !("url" in media)
    || typeof media.url !== "string"
    || media.url.trim() === ""
  ) {
    return (
      <Image
        src={PRODUCT_IMAGE_PLACEHOLDER}
        alt={`${alt} placeholder`}
        width={600}
        height={450}
        className={className}
      />
    );
  }
  return (
    <Image
      src={media.url}
      alt={media.alt ?? alt}
      width={media.width ?? 600}
      height={media.height ?? 450}
      className={className}
    />
  );
}

type ProductCardProps = {
  slug: string;
  name: string;
  shortDescription: string;
  categoryName?: string | null;
  image?: MediaLike | number | null;
  locale: Locale;
};

export function ProductCard({ slug, name, shortDescription, categoryName, image, locale }: ProductCardProps) {
  return (
    <article className="product-card group">
      <div className="aspect-[4/3] overflow-hidden bg-[var(--color-soft)]">
        <CmsImage
          media={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {categoryName ? (
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            {categoryName}
          </p>
        ) : null}
        <h3 className="mt-1 text-base font-black text-[var(--color-ink)]">{name}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-[var(--color-muted)] line-clamp-3">{shortDescription}</p>
        <Link
          href={`/products/${slug}`}
          locale={locale}
          className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          View Details <ArrowRight aria-hidden="true" size={14} />
        </Link>
      </div>
    </article>
  );
}
