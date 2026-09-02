"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ClipboardCheck,
  Download,
  Eye,
  Factory,
  FlaskConical,
  Globe2,
  Handshake,
  Maximize2,
  Package,
  ShieldCheck,
  Ship,
  Target,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  getAboutProfileContent,
} from "@/lib/about-profile-content";
import type { AboutPage } from "@/payload-types";
import { certificates as certificateData } from "@/data/certificates";
import { Reveal, StaggerGrid } from "./gsap-reveal";
import { InnerPageHero } from "./inner-page-hero";


type AboutPageProps = {
  locale: Locale;
  data: AboutPage | null;
};

type MediaLike = {
  url?: string | null;
  alt?: string | null;
};

type CertificateView = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  documentUrl: string;
  scope: string;
  documentDate: string;
};

const historyMarkets = [
  "Germany", "Netherlands", "Nigeria", "Cameroon", "Côte d’Ivoire", "Ghana",
  "Mauritius", "Equatorial Guinea", "Angola", "Senegal", "Ethiopia",
  "Central African Republic", "Congo", "Turkey", "Togo", "Bahrain", "Malta", "Syria",
  "Poland", "Kenya", "Rwanda", "Benin", "Tanzania", "Uganda",
];

const historyCopy: Record<Locale, { eyebrow: string; heading: string; description: string; markets: string; since: string; download: string; document: string }> = {
  en: {
    eyebrow: "Our story",
    heading: "Salt expertise built since 2000",
    description: "Omega Line Egypt began working in salt export and supply around 2000. The company history records thousands of tons supplied annually across Europe, Africa and the Middle East, supported by international quality systems and customer-specific production.",
    markets: "Markets named in our company history",
    since: "Operating since",
    download: "Download certificate",
    document: "Supplied certificate document",
  },
  fr: {
    eyebrow: "Notre histoire",
    heading: "Une expertise du sel développée depuis 2000",
    description: "Omega Line Egypt exerce dans l’exportation et la fourniture de sel depuis environ 2000. Son historique fait état de milliers de tonnes fournies chaque année en Europe, en Afrique et au Moyen-Orient, selon des systèmes qualité internationaux et les spécifications des clients.",
    markets: "Marchés cités dans notre historique",
    since: "En activité depuis",
    download: "Télécharger le certificat",
    document: "Document de certificat fourni",
  },
  de: {
    eyebrow: "Unsere Geschichte",
    heading: "Salzkompetenz seit 2000",
    description: "Omega Line Egypt ist seit etwa 2000 im Export und in der Lieferung von Salz tätig. Die Unternehmensgeschichte nennt jährlich Tausende gelieferte Tonnen in Europa, Afrika und dem Nahen Osten – unterstützt durch internationale Qualitätssysteme und kundenspezifische Produktion.",
    markets: "In unserer Unternehmensgeschichte genannte Märkte",
    since: "Tätig seit",
    download: "Zertifikat herunterladen",
    document: "Bereitgestelltes Zertifikatsdokument",
  },
};

const pageTitles: Record<Locale, string> = {
  en: "About Us",
  fr: "À propos",
  de: "Über uns",
};

const capabilityIcons = [Factory, ShieldCheck, Package, Ship];
const processIcons = [ClipboardCheck, Factory, FlaskConical, Package];
const qualityIcons = [BadgeCheck, Target, ShieldCheck, Eye];
function isMedia(value: AboutPage["overviewImage"]): boolean {
  return typeof value === "object" && value !== null && typeof value.url === "string";
}

function SectionIntro({
  eyebrow,
  title,
  description,
  centered = true,
  light = false,
  as = "h2",
  headingId,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  as?: "h1" | "h2";
  headingId?: string;
}) {
  const Heading = as;

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={light ? "section-eyebrow text-white/60" : "section-eyebrow"}>{eyebrow}</p>
      <Heading
        id={headingId}
        className={`mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] ${
          light ? "text-white" : "text-[var(--color-ink)]"
        }`}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={`mt-5 text-base leading-8 ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          } ${light ? "text-white/70" : "text-[var(--color-muted)]"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CertificateLightbox({
  certificate,
  closeLabel,
  onClose,
}: {
  certificate: CertificateView;
  closeLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-md bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <h2 id="certificate-dialog-title" className="text-base font-black text-[var(--color-ink)]">
            {certificate.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label={closeLabel}
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>
        <div className="relative h-[72vh] max-h-[820px] bg-[#f7f8f8] p-5">
          <Image
            src={certificate.imageUrl}
            alt={certificate.imageAlt}
            fill
            className="object-contain p-5"
            sizes="90vw"
            priority
          />
        </div>
        <div className="flex flex-col gap-3 border-t border-[var(--color-border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-muted)]">{certificate.scope}</p>
          <a href={certificate.documentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-black text-[var(--color-primary)] hover:underline">
            <Download aria-hidden="true" size={16} /> PDF
          </a>
        </div>
      </div>
    </div>
  );
}

export function AboutUsPage({ locale, data: raw }: AboutPageProps) {
  const profile = getAboutProfileContent(locale);
  const story = historyCopy[locale] ?? historyCopy.en;
  const data = raw ?? ({} as AboutPage);
  const [activeCertificate, setActiveCertificate] = useState<CertificateView | null>(null);

  const overviewParagraphs = profile.overviewParagraphs;
  const reachParagraphs = [profile.reachDescription];

  const overviewImage = isMedia(data.overviewImage) ? (data.overviewImage as MediaLike) : null;
  const overviewImageUrl = overviewImage?.url ?? "/images/home/about-salt.webp";
  const overviewImageAlt = overviewImage?.alt ?? "Coarse salt crystals in a wooden bowl";

  const certificates: CertificateView[] = certificateData.map((cert) => ({
      ...cert,
      description: profile.certificatesDescription,
    }));

  const missionHeading = profile.missionHeading;
  const missionDescription = profile.missionDescription;
  const visionHeading = profile.visionHeading;
  const visionDescription = profile.visionDescription;
  const partnershipText = profile.partnershipText;

  return (
    <main id="main-content">
      <InnerPageHero title={pageTitles[locale] ?? pageTitles.en} />

      <Reveal as="section" className="section-band bg-white" aria-labelledby="about-overview-heading">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="relative overflow-hidden rounded-md bg-[var(--color-soft)]">
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src={overviewImageUrl}
                alt={overviewImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 border-l-2 border-white bg-black/45 px-5 py-4 backdrop-blur-sm">
              <p className="text-sm font-bold leading-6 text-white">“{profile.overviewStatement}”</p>
            </div>
          </div>

          <div>
            <SectionIntro
              eyebrow={profile.overviewEyebrow}
              title={profile.overviewHeading}
              centered={false}
              headingId="about-overview-heading"
            />
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-[var(--color-primary-strong)]">
              {profile.heroDescription}
            </p>
            <div className="mt-7 space-y-5">
              {overviewParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-[var(--color-muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {profile.reachPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 border-t border-[var(--color-border)] pt-3">
                  <Check aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--color-primary)]" size={17} />
                  <span className="text-sm font-semibold leading-6 text-[var(--color-ink)]">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <section className="overflow-hidden bg-[var(--color-primary-strong)] text-white" aria-labelledby="about-story-heading">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[.78fr_1.22fr]">
          <Reveal direction="left" className="relative flex min-h-[420px] flex-col justify-end overflow-hidden px-6 py-12 lg:px-10">
            <Image src="/images/about/quality-certificates.jpg" alt="Excellent quality rating selected" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071e36] via-[#071e36]/65 to-transparent" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[.18em] text-white/60">{story.since}</p>
              <p className="mt-2 text-7xl font-black tracking-tight">2000</p>
            </div>
          </Reveal>
          <Reveal direction="right" className="px-4 py-16 sm:px-8 lg:px-14 lg:py-20">
            <p className="section-eyebrow text-white/60">{story.eyebrow}</p>
            <h2 id="about-story-heading" className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">{story.heading}</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70">{story.description}</p>
            <p className="mt-9 text-xs font-black uppercase tracking-[.16em] text-white/55">{story.markets}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {historyMarkets.map((market) => <span key={market} className="rounded-full border border-white/15 bg-white/[.06] px-3 py-2 text-xs font-semibold text-white/80">{market}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className="section-band bg-[var(--color-soft)]" aria-labelledby="about-capabilities-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow={profile.capabilitiesEyebrow}
            title={profile.capabilitiesHeading}
            description={profile.capabilitiesDescription}
          />
          <StaggerGrid className="mt-12 grid gap-px overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2 xl:grid-cols-4" stagger={0.08}>
            {profile.capabilities.map((capability, index) => {
              const Icon = capabilityIcons[index] ?? Factory;
              return (
                <article key={capability.title} className="group bg-white p-7 transition-colors hover:bg-[#fbfcfc]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-transform group-hover:-translate-y-1">
                    <Icon aria-hidden="true" size={23} />
                  </div>
                  <h3 className="mt-6 text-lg font-black text-[var(--color-ink)]">{capability.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{capability.description}</p>
                </article>
              );
            })}
          </StaggerGrid>
        </div>
      </Reveal>

      <section className="overflow-hidden bg-[var(--color-primary-strong)]" aria-label={`${profile.missionEyebrow} / ${profile.visionEyebrow}`}>
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <Reveal direction="left" distance={30} className="border-white/10 px-4 py-16 sm:px-6 lg:border-r lg:px-8 lg:py-20 xl:pr-16">
            <div className="flex items-center gap-3 text-white/60">
              <Target aria-hidden="true" size={20} />
              <p className="section-eyebrow text-white/60">{profile.missionEyebrow}</p>
            </div>
            <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl">{missionHeading}</h2>
            <p className="mt-5 text-base leading-8 text-white/70">{missionDescription}</p>
            <ul className="mt-8 space-y-4">
              {profile.missionPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-7 text-white/80">
                  <Check aria-hidden="true" className="mt-1 shrink-0 text-white" size={17} />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="right" distance={30} className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20 xl:pl-16">
            <div className="flex items-center gap-3 text-[var(--color-primary)]">
              <Eye aria-hidden="true" size={20} />
              <p className="section-eyebrow">{profile.visionEyebrow}</p>
            </div>
            <h2 className="mt-5 text-3xl font-black leading-tight text-[var(--color-ink)] sm:text-4xl">{visionHeading}</h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">{visionDescription}</p>
            <ul className="mt-8 space-y-4">
              {profile.visionPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-7 text-[var(--color-ink)]">
                  <Check aria-hidden="true" className="mt-1 shrink-0 text-[var(--color-primary)]" size={17} />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className="section-band bg-white" aria-labelledby="about-process-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow={profile.processEyebrow}
            title={profile.processHeading}
            description={profile.processDescription}
          />
          <StaggerGrid className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4" stagger={0.09}>
            {profile.processSteps.map((step, index) => {
              const Icon = processIcons[index] ?? ClipboardCheck;
              return (
                <article key={step.title} className="relative border-t-2 border-[var(--color-primary)] pt-7">
                  <div className="flex items-center justify-between">
                    <span className="text-5xl font-black leading-none text-[var(--color-primary)]/10">0{index + 1}</span>
                    <Icon aria-hidden="true" className="text-[var(--color-primary)]" size={25} />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-[var(--color-ink)]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{step.description}</p>
                </article>
              );
            })}
          </StaggerGrid>
        </div>
      </Reveal>

      <section className="section-band overflow-hidden bg-[#071e36] text-white" aria-labelledby="about-reach-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <Reveal direction="left" distance={30} className="flex flex-col justify-center">
            <SectionIntro
              eyebrow={profile.reachEyebrow}
              title={profile.reachHeading}
              centered={false}
              light
            />
            <div className="mt-6 space-y-4">
              {reachParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-white/70">{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {profile.reachPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 border-t border-white/10 pt-3 text-sm font-semibold text-white/80">
                  <Globe2 aria-hidden="true" className="shrink-0 text-white/60" size={16} />
                  {point}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" distance={30} className="flex flex-col justify-center border border-white/10 bg-white/[.04] p-7 sm:p-9">
            <div className="border-l-2 border-white/70 pl-5">
              <div className="flex items-center gap-2 text-white/60">
                <Handshake aria-hidden="true" size={17} />
                <p className="text-[11px] font-bold uppercase tracking-[0.16em]">{profile.partnershipEyebrow}</p>
              </div>
              <h3 className="mt-3 text-lg font-black text-white">{profile.partnershipHeading}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{partnershipText}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className="section-band bg-[var(--color-soft)]" aria-labelledby="about-quality-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <SectionIntro
                eyebrow={profile.qualityEyebrow}
                title={profile.qualityHeading}
                description={profile.qualityDescription}
                centered={false}
              />
              <StaggerGrid className="mt-9 grid gap-4 sm:grid-cols-2" stagger={0.07}>
                {profile.qualityPillars.map((pillar, index) => {
                  const Icon = qualityIcons[index] ?? ShieldCheck;
                  return (
                    <article key={pillar.title} className="border border-[var(--color-border)] bg-white p-5">
                      <Icon aria-hidden="true" className="text-[var(--color-primary)]" size={22} />
                      <h3 className="mt-4 text-sm font-black text-[var(--color-ink)]">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{pillar.description}</p>
                    </article>
                  );
                })}
              </StaggerGrid>
            </div>

            <div>
              <p className="section-eyebrow">{profile.certificatesEyebrow}</p>
              <h3 className="mt-3 text-2xl font-black text-[var(--color-ink)]">
                {profile.certificatesHeading}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{profile.certificatesDescription}</p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {certificates.map((certificate) => (
                  <article key={certificate.id} className="group overflow-hidden border border-[var(--color-border)] bg-white">
                    <button
                      type="button"
                      onClick={() => setActiveCertificate(certificate)}
                      className="relative block aspect-[3/4] w-full overflow-hidden bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)]"
                      aria-label={`${profile.certificateAction}: ${certificate.title}`}
                    >
                      <Image
                        src={certificate.imageUrl}
                        alt={certificate.imageAlt}
                        fill
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.025]"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                      <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-strong)] text-white shadow-lg transition-transform group-hover:scale-105">
                        <Maximize2 aria-hidden="true" size={15} />
                      </span>
                    </button>
                    <div className="border-t border-[var(--color-border)] p-4">
                      <h4 className="text-sm font-black text-[var(--color-ink)]">{certificate.title}</h4>
                      <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{certificate.scope}</p>
                      <p className="mt-3 text-[11px] font-bold uppercase tracking-[.12em] text-[var(--color-primary)]">{certificate.documentDate}</p>
                      <a href={certificate.documentUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-black text-[var(--color-ink)] hover:text-[var(--color-primary)]">
                        <Download aria-hidden="true" size={14} /> {story.download}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-5 border-l-2 border-[var(--color-primary)] pl-4 text-xs leading-6 text-[var(--color-muted)]">
                {profile.certificatesNote}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="final-cta" aria-labelledby="about-final-cta-heading">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <p className="section-eyebrow text-white/60">{profile.finalCtaEyebrow}</p>
            <h2 id="about-final-cta-heading" className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
              {profile.finalCtaHeading}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">{profile.finalCtaDescription}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              locale={locale}
              className="cta-button border border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              {profile.productsAction}
            </Link>
            <Link
              href="/contact"
              locale={locale}
              className="cta-button bg-white text-[var(--color-primary-strong)] hover:bg-[var(--color-soft)]"
            >
              {profile.quoteAction} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </Reveal>

      {activeCertificate ? (
        <CertificateLightbox
          certificate={activeCertificate}
          closeLabel={profile.closeCertificateLabel}
          onClose={() => setActiveCertificate(null)}
        />
      ) : null}
    </main>
  );
}
