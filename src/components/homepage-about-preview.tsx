import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Reveal, StaggerGrid } from "./gsap-reveal";

type MediaLike = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

type AboutPreviewData = {
  aboutEyebrow?: string | null;
  aboutHeading?: string | null;
  aboutDescription?: string | null;
  aboutImage?: MediaLike | number | null;
  aboutStrengths?: Array<{ label?: string | null }> | null;
  aboutButtonLabel?: string | null;
};

function isMedia(value: MediaLike | number | null | undefined): value is MediaLike {
  return typeof value === "object" && value !== null && typeof value.url === "string";
}

function CmsImage({
  media,
  alt,
}: {
  media?: MediaLike | number | null;
  alt: string;
}) {
  if (!isMedia(media)) {
    return (
      <Image
        src="/images/home/about-salt.webp"
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <Image
      src={media.url ?? ""}
      alt={media.alt ?? alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="h-full w-full object-cover"
    />
  );
}

type HomepageAboutPreviewProps = {
  data: AboutPreviewData;
  locale: Locale;
};

export function HomepageAboutPreview({ data, locale }: HomepageAboutPreviewProps) {
  const strengths = data.aboutStrengths?.filter((strength) => strength.label) ?? [];
  const title = data.aboutHeading ?? "Omega Line Egypt";

  return (
    <section className="section-band bg-white" aria-labelledby="about-preview-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <Reveal direction="left" distance={30}>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-md bg-[var(--color-soft)] shadow-[0_24px_70px_rgba(10,63,122,0.12)]">
            <CmsImage media={data.aboutImage} alt={title} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent p-6 pt-24 text-white">
              <p className="max-w-md text-sm font-semibold leading-6 text-white/90">
                {data.aboutStrengths?.[0]?.label ?? data.aboutEyebrow ?? "Omega Line Egypt"}
              </p>
            </div>
          </figure>
        </Reveal>

        <div>
          <Reveal direction="right" distance={30} delay={0.05}>
            <p className="section-eyebrow">{data.aboutEyebrow ?? "About Us"}</p>
          </Reveal>
          <Reveal direction="right" distance={30} delay={0.1}>
            <h2
              id="about-preview-heading"
              className="mt-3 text-3xl font-black tracking-normal text-[var(--color-ink)] sm:text-4xl"
            >
              {title}
            </h2>
          </Reveal>
          <Reveal direction="right" distance={30} delay={0.15}>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              {data.aboutDescription}
            </p>
          </Reveal>
          <StaggerGrid
            className="mt-7 grid gap-3 sm:grid-cols-2"
            stagger={0.06}
            distance={20}
            direction="up"
          >
            {strengths.slice(0, 4).map((item, index) => (
              <div
                key={item.label ?? index}
                className="flex min-h-16 items-center gap-3 border-l-2 border-[var(--color-primary)] bg-[var(--color-soft)] px-4 py-3 text-sm font-bold leading-6 text-[var(--color-ink)]"
              >
                <Check aria-hidden="true" size={17} className="shrink-0 text-[var(--color-primary)]" />
                <span>{item.label}</span>
              </div>
            ))}
          </StaggerGrid>
          <Reveal direction="right" distance={30} delay={0.2}>
            <div className="mt-8">
              <Link
                href="/about"
                locale={locale}
                className="cta-button bg-[var(--color-primary-strong)] text-white hover:bg-[var(--color-primary)]"
              >
                {data.aboutButtonLabel ?? "Learn More About Us"}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
