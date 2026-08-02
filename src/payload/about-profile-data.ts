import type { AboutPage } from "@/payload-types";
import type { AboutProfileContent } from "@/lib/about-profile-content";

export type AboutArrayIds = {
  overviewParagraphs?: AboutPage["overviewParagraphs"];
  historyParagraphs?: AboutPage["historyParagraphs"];
  certificates?: AboutPage["certificates"];
};

function withArrayId<T extends Record<string, unknown>>(
  value: T,
  id?: string | null,
): T & { id?: string } {
  return id ? { ...value, id } : value;
}

export function buildAboutProfileData(
  profile: AboutProfileContent,
  existing?: AboutArrayIds,
) {
  return {
    overviewHeading: profile.overviewHeading,
    overviewParagraphs: profile.overviewParagraphs.map((paragraph, index) =>
      withArrayId({ paragraph }, existing?.overviewParagraphs?.[index]?.id),
    ),
    historyHeading: profile.reachHeading,
    historyParagraphs: [profile.reachDescription].map((paragraph, index) =>
      withArrayId({ paragraph }, existing?.historyParagraphs?.[index]?.id),
    ),
    exportCountries: [],
    nestleRelationshipText: profile.partnershipText,
    missionHeading: profile.missionHeading,
    missionText: profile.missionDescription,
    visionHeading: profile.visionHeading,
    visionText: profile.visionDescription,
    certificatesHeading: profile.certificatesHeading,
    certificates: [
      {
        title: "ISO 9001:2015",
        description: profile.certificatesDescription,
        active: true,
        sortOrder: 10,
      },
      {
        title: "ISO 22000:2018",
        description: profile.certificatesDescription,
        active: true,
        sortOrder: 20,
      },
    ].map((certificate, index) =>
      withArrayId(certificate, existing?.certificates?.[index]?.id),
    ),
    verificationNote: profile.certificatesNote,
  };
}
