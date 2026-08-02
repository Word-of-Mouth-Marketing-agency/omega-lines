import type { Homepage } from "@/payload-types";
import type { HomepageProfileContent } from "@/lib/homepage-content";

export type HomepageArrayIds = {
  trustIndicators?: Homepage["trustIndicators"];
  aboutStrengths?: Homepage["aboutStrengths"];
  industries?: Homepage["industries"];
  qualityBenefits?: Homepage["qualityBenefits"];
};

function withArrayId<T extends Record<string, unknown>>(
  value: T,
  id?: string | null,
): T & { id?: string } {
  return id ? { ...value, id } : value;
}

export function buildHomepageProfileData(
  profile: HomepageProfileContent,
  existing?: HomepageArrayIds,
) {
  return {
    heroEyebrow: profile.heroEyebrow,
    heroHeading: profile.heroHeading,
    heroDescription: profile.heroDescription,
    primaryCta: { label: profile.primaryCtaLabel, href: "/products" },
    secondaryCta: { label: profile.secondaryCtaLabel, href: "/contact" },
    trustIndicators: profile.trustIndicators.map((label, index) =>
      withArrayId({ label }, existing?.trustIndicators?.[index]?.id),
    ),
    aboutEyebrow: profile.aboutEyebrow,
    aboutHeading: profile.aboutHeading,
    aboutDescription: profile.aboutDescription,
    aboutStrengths: profile.aboutStrengths.map((label, index) =>
      withArrayId({ label }, existing?.aboutStrengths?.[index]?.id),
    ),
    aboutButtonLabel: profile.aboutButtonLabel,
    productsEyebrow: profile.productsEyebrow,
    productsHeading: profile.productsHeading,
    productsDescription: profile.productsDescription,
    industriesHeading: profile.industriesHeading,
    industriesDescription: profile.industriesDescription,
    industries: profile.industries.map((industry, index) =>
      withArrayId({ ...industry }, existing?.industries?.[index]?.id),
    ),
    qualityEyebrow: profile.qualityEyebrow,
    qualityHeading: profile.qualityHeading,
    qualityBenefits: profile.qualityBenefits.map((benefit, index) =>
      withArrayId({ benefit }, existing?.qualityBenefits?.[index]?.id),
    ),
    quoteEyebrow: profile.specificationEyebrow,
    quoteHeading: profile.specificationHeading,
    quoteDescription: profile.specificationDescription,
    exportHeading: profile.shippingHeading,
    exportDescription: profile.shippingDescription,
    statistics: [],
    galleryHeading: profile.galleryHeading,
    galleryDescription: profile.galleryDescription,
    finalCtaHeading: profile.finalCtaHeading,
    finalCtaDescription: profile.finalCtaDescription,
    seo: {
      title: profile.seoTitle,
      description: profile.seoDescription,
      noIndex: false,
    },
  };
}
