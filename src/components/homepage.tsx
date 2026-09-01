import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  getActiveGalleryItems,
  getHomepage,
} from "@/lib/cms";
import { products } from "@/data/products";
import {
  getHomepageProfileContent,
  isPlaceholderCollection,
  resolveProfileCopy,
} from "@/lib/homepage-content";
import { ProductCarousel } from "./product-carousel";
import { HomepageGalleryPreview } from "./homepage-gallery-preview";
import { HomepageAboutPreview } from "./homepage-about-preview";
import { Reveal, StaggerGrid } from "./gsap-reveal";
import { HeroAnimation } from "./hero-animation";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Droplets,
  Eye,
  Factory,
  Package,
  PawPrint,
  Pill,
  Ship,
  Snowflake,
  Target,
  UtensilsCrossed,
} from "lucide-react";

type MediaLike = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  mimeType?: string | null;
};

type GalleryLike = {
  id?: string | number;
  title?: string | null;
  description?: string | null;
  image?: MediaLike | number | null;
};

type HomepageGlobal = {
  heroEyebrow?: string | null;
  heroHeading?: string | null;
  heroDescription?: string | null;
  heroImage?: MediaLike | number | null;
  heroVideo?: MediaLike | number | null;
  primaryCta?: { label?: string | null; href?: string | null } | null;
  secondaryCta?: { label?: string | null; href?: string | null } | null;
  trustIndicators?: Array<{ label?: string | null }> | null;
  productsEyebrow?: string | null;
  productsHeading?: string | null;
  productsDescription?: string | null;
  industriesHeading?: string | null;
  industriesDescription?: string | null;
  industries?: Array<{ title?: string | null; description?: string | null }> | null;
  qualityEyebrow?: string | null;
  qualityHeading?: string | null;
  qualityBenefits?: Array<{ benefit?: string | null }> | null;
  certificateImages?: Array<{ image?: MediaLike | number | null }> | null;
  quoteEyebrow?: string | null;
  quoteHeading?: string | null;
  quoteDescription?: string | null;
  exportHeading?: string | null;
  exportDescription?: string | null;
  galleryHeading?: string | null;
  galleryDescription?: string | null;
  featuredGalleryItems?: Array<GalleryLike | number> | null;
  finalCtaHeading?: string | null;
  finalCtaDescription?: string | null;
  aboutEyebrow?: string | null;
  aboutHeading?: string | null;
  aboutDescription?: string | null;
  aboutImage?: MediaLike | number | null;
  aboutStrengths?: Array<{ label?: string | null }> | null;
  aboutButtonLabel?: string | null;
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
};

type AboutPreviewData = {
  aboutEyebrow?: string | null;
  aboutHeading?: string | null;
  aboutDescription?: string | null;
  aboutImage?: MediaLike | number | null;
  aboutStrengths?: Array<{ label?: string | null }> | null;
  aboutButtonLabel?: string | null;
};

const industryIconComponents = [
  UtensilsCrossed,
  Factory,
  Droplets,
  Snowflake,
  PawPrint,
  Pill,
];

const packagingImages = [
  {
    src: "/images/home/packaging-bulk.webp",
    alt: "Bulk salt stock prepared for high-volume supply",
  },
  {
    src: "/images/home/packaging-jumbo.webp",
    alt: "Omega Line Egypt one-ton jumbo bag",
  },
  {
    src: "/images/home/packaging-retail.webp",
    alt: "Retail salt packaging in one kilogram and 500 gram formats",
  },
];

const shippingImages = [
  {
    src: "/images/home/shipping-jumbo-container.webp",
    alt: "Jumbo salt bags loaded inside a shipping container",
  },
  {
    src: "/images/home/shipping-cartons-container.webp",
    alt: "Cartoned salt products loaded for container shipment",
  },
  {
    src: "/images/home/shipping-pallet-loading.webp",
    alt: "Bagged salt prepared and loaded for export",
  },
  {
    src: "/images/home/shipping-vessel.webp",
    alt: "Cargo vessel used for international shipment",
  },
];

function isGallery(value: GalleryLike | number | null | undefined): value is GalleryLike {
  return typeof value === "object" && value !== null && typeof value.title === "string";
}

function isMedia(value: MediaLike | number | null | undefined): value is MediaLike {
  return typeof value === "object" && value !== null && typeof value.url === "string";
}

function isVideoMedia(value: MediaLike | number | null | undefined): value is MediaLike {
  if (!isMedia(value)) return false;
  return (value.mimeType?.toLowerCase() ?? "").startsWith("video/");
}

function SectionIntro({
  eyebrow,
  title,
  description,
  centered = true,
  light = false,
}: {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className={light ? "section-eyebrow text-blue-200" : "section-eyebrow"}>{eyebrow}</p>
      ) : null}
      <h2
        className={`mt-3 text-3xl font-black tracking-normal sm:text-4xl ${
          light ? "text-white" : "text-[var(--color-ink)]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mx-auto mt-4 max-w-2xl text-base leading-7 ${
            light ? "text-white/70" : "text-[var(--color-muted)]"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CtaLink({
  href,
  label,
  locale,
  variant = "primary",
}: {
  href: string;
  label: string;
  locale: Locale;
  variant?: "primary" | "secondary" | "light" | "outline-light";
}) {
  const className =
    variant === "primary"
      ? "bg-[var(--color-primary-strong)] text-white hover:bg-[var(--color-primary)]"
      : variant === "light"
        ? "bg-white text-[var(--color-primary-strong)] hover:bg-[var(--color-soft)]"
        : variant === "outline-light"
          ? "border border-white/40 bg-white/10 text-white hover:bg-white/20"
          : "border border-[var(--color-primary-strong)] bg-white text-[var(--color-primary-strong)] hover:bg-[var(--color-soft)]";

  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a className={`cta-button ${className}`} href={href}>
        {label}
        <ArrowRight aria-hidden="true" size={16} />
      </a>
    );
  }

  return (
    <Link className={`cta-button ${className}`} href={href} locale={locale}>
      {label}
      <ArrowRight aria-hidden="true" size={16} />
    </Link>
  );
}

function CertificateGallery({
  certificates,
}: {
  certificates?: Array<{ image?: MediaLike | number | null }> | null;
}) {
  const cmsCertificates = certificates
    ?.map((item) => item.image)
    .filter(isMedia)
    .slice(0, 2);

  const certificateMedia = cmsCertificates?.length
    ? cmsCertificates
    : [
        {
          url: "/images/home/iso-9001-2015.jpg",
          alt: "ISO 9001:2015 certificate shown in the Omega Line Egypt profile",
          width: 399,
          height: 561,
        },
        {
          url: "/images/home/iso-22000-2018.jpg",
          alt: "ISO 22000:2018 certificate shown in the Omega Line Egypt profile",
          width: 1242,
          height: 1680,
        },
      ];

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {certificateMedia.map((certificate, index) => (
        <figure
          key={`${certificate.url}-${index}`}
          className="aspect-[3/4] overflow-hidden rounded-md border border-[var(--color-border)] bg-white shadow-[0_18px_50px_rgba(10,63,122,0.11)]"
        >
          <Image
            src={certificate.url ?? ""}
            alt={certificate.alt ?? "Omega Line Egypt quality certificate"}
            width={certificate.width ?? 700}
            height={certificate.height ?? 950}
            className="h-full w-full object-contain p-4"
          />
        </figure>
      ))}
    </div>
  );
}

export async function Homepage({ locale }: { locale: Locale }) {
  const profile = getHomepageProfileContent(locale);
  const [homepage, activeGallery] = await Promise.all([
    getHomepage(locale) as Promise<HomepageGlobal | null>,
    getActiveGalleryItems(locale, 6),
  ]);

  const selectedGallery = homepage?.featuredGalleryItems?.filter(isGallery) ?? [];
  const galleryItems = selectedGallery.length > 0 ? selectedGallery : (activeGallery as GalleryLike[]);

  const cmsIndustries = homepage?.industries?.filter((item) => item.title) ?? [];
  const industries = isPlaceholderCollection(cmsIndustries, (item) => item.description)
    ? profile.industries
    : cmsIndustries.map((item) => ({
        title: item.title as string,
        description: item.description ?? "",
      }));

  const cmsBenefits = homepage?.qualityBenefits?.filter((item) => item.benefit) ?? [];
  const qualityBenefits = isPlaceholderCollection(cmsBenefits, (item) => item.benefit)
    ? profile.qualityBenefits
    : cmsBenefits.map((item) => item.benefit as string);

  const trustIndicators = profile.trustIndicators;

  const cmsStrengths = homepage?.aboutStrengths?.filter((item) => item.label) ?? [];
  const aboutStrengths = isPlaceholderCollection(cmsStrengths, (item) => item.label)
    ? profile.aboutStrengths
    : cmsStrengths.map((item) => item.label as string);

  const aboutData: AboutPreviewData = {
    aboutEyebrow: resolveProfileCopy(homepage?.aboutEyebrow, profile.aboutEyebrow),
    aboutHeading: resolveProfileCopy(homepage?.aboutHeading, profile.aboutHeading),
    aboutDescription: profile.aboutDescription,
    aboutImage: homepage?.aboutImage,
    aboutStrengths: aboutStrengths.map((label) => ({ label })),
    aboutButtonLabel: resolveProfileCopy(homepage?.aboutButtonLabel, profile.aboutButtonLabel),
  };

  return (
    <main id="main-content" className="bg-white">
      <section className="relative isolate flex min-h-[calc(100dvh-116px)] items-end overflow-hidden bg-[var(--color-primary-strong)]">
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="h-full w-full object-cover"
            poster={isMedia(homepage?.heroImage) ? homepage.heroImage.url ?? undefined : undefined}
          >
            {isVideoMedia(homepage?.heroVideo) ? (
              <source
                src={homepage.heroVideo.url ?? ""}
                type={homepage.heroVideo.mimeType ?? "video/mp4"}
                media="(prefers-reduced-motion: no-preference)"
              />
            ) : (
              <source
                src="/videos/omega-hero.mp4"
                type="video/mp4"
                media="(prefers-reduced-motion: no-preference)"
              />
            )}
          </video>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <HeroAnimation>
            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.055em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.4)] sm:text-7xl lg:text-8xl">
              Omega <span className="text-blue-300">Line</span>
            </h1>
            <p className="mt-5 max-w-xl border-l-2 border-blue-300 pl-4 text-base font-semibold leading-7 text-white/90 sm:text-lg">
              {profile.heroDescription}
            </p>
            <div className="mt-8">
              <CtaLink
                href={homepage?.primaryCta?.href ?? "/products"}
                label={profile.primaryCtaLabel}
                locale={locale}
                variant="light"
              />
            </div>
          </HeroAnimation>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-white" aria-label={profile.capabilitiesLabel}>
        <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {trustIndicators.slice(0, 4).map((indicator, index) => (
            <div
              key={indicator}
              className="flex min-h-24 items-center gap-4 border-b border-[var(--color-border)] px-5 py-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <span className="text-2xl font-black text-[var(--color-primary)]">0{index + 1}</span>
              <p className="text-sm font-black leading-6 text-[var(--color-ink)]">{indicator}</p>
            </div>
          ))}
        </div>
      </section>

      <Reveal as="section" className="section-band bg-white" aria-labelledby="home-welcome-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="section-eyebrow">{profile.welcomeEyebrow}</p>
              <h2 id="home-welcome-heading" className="mt-4 text-3xl font-black leading-tight tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
                {profile.welcomeHeading}
              </h2>
              <div className="mt-7 border-l-2 border-[var(--color-primary)] pl-5">
                <p className="text-base font-bold leading-8 text-[var(--color-primary-strong)]">
                  “{profile.welcomeQuote}”
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {profile.welcomeParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-[var(--color-muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <StaggerGrid className="mt-12 grid gap-px overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {profile.welcomeHighlights.map((highlight, index) => (
              <article key={highlight.title} className="bg-[var(--color-soft)] p-6">
                <span className="text-xs font-black tracking-[.16em] text-[var(--color-primary)]">0{index + 1}</span>
                <h3 className="mt-4 text-base font-black text-[var(--color-ink)]">{highlight.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{highlight.description}</p>
              </article>
            ))}
          </StaggerGrid>

          <div className="mt-10 grid gap-8 border-t border-[var(--color-border)] pt-8 lg:grid-cols-[1.25fr_.75fr]">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[.14em] text-[var(--color-ink)]">{profile.welcomeMarketsHeading}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.welcomeMarkets.map((market) => (
                  <span key={market} className="rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-bold text-[var(--color-muted)]">
                    {market}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-[var(--color-primary-strong)] p-6 text-sm leading-7 text-white/75">
              <p>{profile.welcomeLegacyNote}</p>
            </div>
          </div>
        </div>
      </Reveal>

      <HomepageAboutPreview data={aboutData} locale={locale} />

      <Reveal as="section" className="section-band bg-[var(--color-soft)]" aria-labelledby="mission-vision-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-md border border-[var(--color-border)] bg-white lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-[var(--color-primary-strong)] p-7 text-white sm:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-200">
                {profile.missionEyebrow}
              </p>
              <h2 id="mission-vision-heading" className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                {profile.missionHeading}
              </h2>
              <p className="mt-5 text-base leading-8 text-white/75">{profile.missionDescription}</p>
            </div>

            <div className="grid md:grid-cols-2">
              <article className="border-b border-[var(--color-border)] p-7 sm:p-9 md:border-b-0 md:border-r">
                <span className="grid h-12 w-12 place-items-center rounded-md bg-[var(--color-soft)] text-[var(--color-primary)]">
                  <Target aria-hidden="true" size={23} />
                </span>
                <h3 className="mt-5 text-xl font-black text-[var(--color-ink)]">{profile.missionLabel}</h3>
                <ul className="mt-5 space-y-4">
                  {profile.missionPoints.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-[var(--color-muted)]">
                      <Check aria-hidden="true" size={17} className="mt-1 shrink-0 text-[var(--color-primary)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="p-7 sm:p-9">
                <span className="grid h-12 w-12 place-items-center rounded-md bg-[var(--color-soft)] text-[var(--color-primary)]">
                  <Eye aria-hidden="true" size={23} />
                </span>
                <h3 className="mt-5 text-xl font-black text-[var(--color-ink)]">{profile.visionHeading}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{profile.visionDescription}</p>
                <ul className="mt-5 space-y-3">
                  {profile.visionPoints.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-[var(--color-muted)]">
                      <Check aria-hidden="true" size={17} className="mt-1 shrink-0 text-[var(--color-primary)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section-band" aria-labelledby="homepage-products">
        <SectionIntro
          eyebrow="Salt Products"
          title="Our Complete Salt Product Range"
          description="Explore ten Omega Line products directly, each with its real product image, applications, and quote request path."
        />
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductCarousel items={products} locale={locale} />
        </div>
      </Reveal>

      <Reveal as="section" className="export-section section-band" aria-labelledby="industries-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow={profile.industriesEyebrow}
            title={resolveProfileCopy(homepage?.industriesHeading, profile.industriesHeading)}
            description={resolveProfileCopy(homepage?.industriesDescription, profile.industriesDescription)}
            light
          />
          <StaggerGrid className="mx-auto mt-10 grid max-w-7xl gap-px overflow-hidden rounded-md bg-white/15 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {industries.slice(0, 6).map((industry, index) => {
              const IndustryIcon = industryIconComponents[index] ?? Factory;
              return (
                <article key={industry.title} className="bg-white/10 p-6 text-left backdrop-blur-sm sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md border border-white/30 text-white">
                    <IndustryIcon aria-hidden="true" size={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-black text-white">{industry.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{industry.description}</p>
                </article>
              );
            })}
          </StaggerGrid>
        </div>
      </Reveal>

      <Reveal as="section" className="section-band" aria-labelledby="quality-heading">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Reveal direction="left" distance={30}>
            <p className="section-eyebrow">
              {resolveProfileCopy(homepage?.qualityEyebrow, profile.qualityEyebrow)}
            </p>
            <h2 id="quality-heading" className="mt-3 text-3xl font-black text-[var(--color-ink)] sm:text-4xl">
              {resolveProfileCopy(homepage?.qualityHeading, profile.qualityHeading)}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">{profile.qualityDescription}</p>
            <ul className="mt-7 grid gap-4">
              {qualityBenefits.slice(0, 6).map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm leading-6 text-[var(--color-ink)]">
                  <ClipboardCheck aria-hidden="true" size={18} className="mt-1 shrink-0 text-[var(--color-primary)]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="right" distance={30} delay={0.1}>
            <CertificateGallery certificates={homepage?.certificateImages} />
          </Reveal>
        </div>
      </Reveal>

      <Reveal as="section" className="section-band bg-[var(--color-soft)]" aria-labelledby="packaging-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow={profile.packagingEyebrow}
            title={profile.packagingHeading}
            description={profile.packagingDescription}
          />

          <StaggerGrid className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.08}>
            {packagingImages.map((image, index) => (
              <figure key={image.src} className="group overflow-hidden rounded-md bg-white shadow-[0_16px_46px_rgba(10,63,122,0.10)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={900}
                    height={675}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="border-t border-[var(--color-border)] px-5 py-4 text-sm font-black text-[var(--color-ink)]">
                  {profile.packagingOptions[index === 2 ? 3 : index].title}
                </figcaption>
              </figure>
            ))}
          </StaggerGrid>

          <div className="mt-6 grid overflow-hidden rounded-md border border-[var(--color-border)] bg-white sm:grid-cols-2 lg:grid-cols-4">
            {profile.packagingOptions.map((option) => (
              <article
                key={option.title}
                className="border-b border-[var(--color-border)] p-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[var(--color-soft)] text-[var(--color-primary)]">
                    <Package aria-hidden="true" size={17} />
                  </span>
                  <h3 className="text-sm font-black text-[var(--color-ink)]">{option.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{option.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section-band" aria-labelledby="shipping-heading">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <div>
            <p className="section-eyebrow">{profile.shippingEyebrow}</p>
            <h2 id="shipping-heading" className="mt-3 text-3xl font-black text-[var(--color-ink)] sm:text-4xl">
              {resolveProfileCopy(homepage?.exportHeading, profile.shippingHeading)}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              {resolveProfileCopy(homepage?.exportDescription, profile.shippingDescription)}
            </p>

            <ol className="mt-8 space-y-4">
              {profile.shippingSteps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2.6rem_1fr] gap-4 border-t border-[var(--color-border)] pt-4 first:border-t-0 first:pt-0">
                  <span className="text-xl font-black text-[var(--color-primary)]">0{index + 1}</span>
                  <div>
                    <h3 className="text-base font-black text-[var(--color-ink)]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <StaggerGrid className="grid grid-cols-2 gap-3" stagger={0.06} direction="scale" distance={16}>
            {shippingImages.map((image, index) => (
              <figure
                key={image.src}
                className={`overflow-hidden rounded-md bg-[var(--color-soft)] ${index === 0 || index === 3 ? "aspect-[4/3]" : "aspect-square"}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={700}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </figure>
            ))}
          </StaggerGrid>
        </div>
      </Reveal>

      <Reveal as="section" className="section-band bg-[var(--color-primary-strong)]" aria-labelledby="specification-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-200">
              {resolveProfileCopy(homepage?.quoteEyebrow, profile.specificationEyebrow)}
            </p>
            <h2 id="specification-heading" className="mt-3 text-3xl font-black text-white sm:text-4xl">
              {resolveProfileCopy(homepage?.quoteHeading, profile.specificationHeading)}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/75">
              {resolveProfileCopy(homepage?.quoteDescription, profile.specificationDescription)}
            </p>
            <div className="mt-8">
              <CtaLink href="/contact" label={profile.secondaryCtaLabel} locale={locale} variant="light" />
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md bg-white/15 sm:grid-cols-2">
            {profile.specificationPoints.map((point) => (
              <div key={point} className="flex min-h-28 items-start gap-3 bg-white/10 p-5 text-white backdrop-blur-sm">
                <Check aria-hidden="true" size={18} className="mt-1 shrink-0 text-blue-200" />
                <span className="text-sm font-bold leading-6">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section-band" aria-labelledby="gallery-preview-heading">
        <SectionIntro
          eyebrow={profile.galleryEyebrow}
          title={resolveProfileCopy(homepage?.galleryHeading, profile.galleryHeading)}
          description={resolveProfileCopy(homepage?.galleryDescription, profile.galleryDescription)}
        />
        {galleryItems.length > 0 ? (
          <HomepageGalleryPreview items={galleryItems.slice(0, 6) as GalleryLike[]} />
        ) : (
          <div className="mx-auto mt-10 max-w-4xl border border-dashed border-[var(--color-border)] bg-[var(--color-soft)] p-8 text-center text-sm text-[var(--color-muted)]">
            {profile.galleryDescription}
          </div>
        )}
        <div className="mt-9 text-center">
          <CtaLink href="/gallery" label={profile.galleryAction} locale={locale} variant="secondary" />
        </div>
      </Reveal>

      <Reveal as="section" className="final-cta">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-blue-200">
              <Ship aria-hidden="true" size={21} />
              <span className="text-xs font-black uppercase tracking-[0.16em]">Omega Line Egypt</span>
            </div>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              {resolveProfileCopy(homepage?.finalCtaHeading, profile.finalCtaHeading)}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/75">
              {resolveProfileCopy(homepage?.finalCtaDescription, profile.finalCtaDescription)}
            </p>
          </div>
          <div className="shrink-0">
            <CtaLink href="/contact" label={profile.finalCtaAction} locale={locale} variant="light" />
          </div>
        </div>
      </Reveal>
    </main>
  );
}
