import { getHomepageProfileContent } from "@/lib/homepage-content";
import { getPayloadClient } from "@/lib/payload";
import {
  buildHomepageProfileData,
  type HomepageArrayIds,
} from "@/payload/homepage-profile-data";

async function syncHomepageProfile() {
  const payload = await getPayloadClient();

  const englishHomepage = await payload.updateGlobal({
    slug: "homepage",
    locale: "en",
    data: buildHomepageProfileData(getHomepageProfileContent("en")),
  });

  const sharedHomepageArrays: HomepageArrayIds = {
    trustIndicators: englishHomepage.trustIndicators,
    aboutStrengths: englishHomepage.aboutStrengths,
    industries: englishHomepage.industries,
    qualityBenefits: englishHomepage.qualityBenefits,
  };

  await payload.updateGlobal({
    slug: "homepage",
    locale: "fr",
    data: buildHomepageProfileData(
      getHomepageProfileContent("fr"),
      sharedHomepageArrays,
    ),
  });

  await payload.updateGlobal({
    slug: "homepage",
    locale: "de",
    data: buildHomepageProfileData(
      getHomepageProfileContent("de"),
      sharedHomepageArrays,
    ),
  });

  console.log("Homepage company-profile content synchronized for EN, FR and DE.");
}

syncHomepageProfile()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Homepage profile synchronization failed", error);
    process.exit(1);
  });
