import { getAboutProfileContent } from "@/lib/about-profile-content";
import { getPayloadClient } from "@/lib/payload";
import {
  buildAboutProfileData,
  type AboutArrayIds,
} from "@/payload/about-profile-data";

async function syncAboutProfile() {
  const payload = await getPayloadClient();

  const englishAbout = await payload.updateGlobal({
    slug: "about-page",
    locale: "en",
    data: buildAboutProfileData(getAboutProfileContent("en")),
  });

  const sharedArrayIds: AboutArrayIds = {
    overviewParagraphs: englishAbout.overviewParagraphs,
    historyParagraphs: englishAbout.historyParagraphs,
    certificates: englishAbout.certificates,
  };

  await payload.updateGlobal({
    slug: "about-page",
    locale: "fr",
    data: buildAboutProfileData(getAboutProfileContent("fr"), sharedArrayIds),
  });

  await payload.updateGlobal({
    slug: "about-page",
    locale: "de",
    data: buildAboutProfileData(getAboutProfileContent("de"), sharedArrayIds),
  });

  console.log("About page company-profile content synchronized for EN, FR and DE.");
}

syncAboutProfile()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("About page profile synchronization failed", error);
    process.exit(1);
  });
