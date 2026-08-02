import { getPayloadClient } from "@/lib/payload";
import { getHomepageProfileContent } from "@/lib/homepage-content";
import { buildHomepageProfileData, type HomepageArrayIds } from "@/payload/homepage-profile-data";
import { getAboutProfileContent } from "@/lib/about-profile-content";
import { buildAboutProfileData, type AboutArrayIds } from "@/payload/about-profile-data";

async function seed() {
  const payload = await getPayloadClient();
  const demoMode = process.env.SEED_DEMO_CONTENT === "true";

  if (demoMode) {
    await seedDemoContent(payload);
  } else {
    console.log("SEED_DEMO_CONTENT env var not set to true — skipping demo categories and products.");
  }

  await seedGlobals(payload, demoMode);
  await seedAboutPage(payload);

  console.log("Seed complete");
}

async function seedGlobals(payload: Awaited<ReturnType<typeof getPayloadClient>>, demoMode: boolean) {
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      siteName: "Omega Lines",
      siteDescription: "Placeholder B2B salt catalog foundation.",
    },
  });

  await payload.updateGlobal({
    slug: "header-navigation",
    data: {
      items: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Products", href: "/products" },
        { label: "Gallery", href: "/gallery" },
        { label: "Contact", href: "/contact" },
      ],
    },
  });

  await payload.updateGlobal({
    slug: "footer",
    data: {
      summary:
        "Development placeholder footer. Replace with verified Omega Lines company description before production use.",
    },
  });

  await payload.updateGlobal({
    slug: "contact-information",
    data: {
      address: "16 Rabaa Investment Buildings, Nozha St., Nasr City, Cairo \u2013 Egypt",
      telephoneNumbers: [
        { number: "+202 2 418 61 56" },
        { number: "+202 2 690 74 98" },
      ],
      faxNumbers: [
        { number: "+202 2 690 01 94" },
      ],
      cellNumbers: [
        { number: "+2 011 1 550 85 45" },
        { number: "+2 012 2 399 49 09" },
        { number: "+2 011 1 093 20 01" },
      ],
      emailAddresses: [
        { email: "info@omegalineegypt.com" },
        { email: "omega.line.eg@gmail.com" },
      ],
    },
  });

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
    data: buildHomepageProfileData(getHomepageProfileContent("fr"), sharedHomepageArrays),
  });

  await payload.updateGlobal({
    slug: "homepage",
    locale: "de",
    data: buildHomepageProfileData(getHomepageProfileContent("de"), sharedHomepageArrays),
  });

  if (demoMode) {
    const catIds = await seedDemoCategories(payload);
    if (catIds.length > 0) {
      await payload.updateGlobal({
        slug: "homepage",
        data: {
          featuredProductCategories: catIds.slice(0, 6),
        },
      });
    }
  }
}

async function seedDemoCategories(
  payload: Awaited<ReturnType<typeof getPayloadClient>>
): Promise<number[]> {
  const demoCategoryDefs = [
    ["food-grade-salt", "Food Grade Salt", "High-purity salt for food processing, seasoning, and preservation."],
    ["industrial-sea-salt", "Industrial Sea Salt", "Sea salt sourced and processed for industrial applications."],
    ["water-softening", "Water Softening", "Salt formulations for water softening and treatment systems."],
    ["de-icing", "De-icing", "Rock salt and de-icing salt for winter road safety."],
    ["industrial-salt", "Industrial Salt", "Salt for chemical processing, textile, and manufacturing."],
    ["pharma-salt", "Pharma Salt", "High-purity salt for pharmaceutical and medical applications."],
    ["animal-salt", "Animal Salt", "Feed-grade salt for livestock nutrition and feed blocks."],
  ];

  const categoryIds: number[] = [];

  for (const [index, [slug, name, description]] of demoCategoryDefs.entries()) {
    const existingCategories = await payload.find({
      collection: "product-categories",
      limit: 1,
      where: {
        slug: { equals: slug },
      },
    });

    const data = {
      slug,
      name,
      description,
      active: true,
      sortOrder: (index + 1) * 10,
      seo: {
        title: `${name} placeholder`,
        description: "Development placeholder category. Replace before production use.",
        noIndex: true,
      },
    };

    if (existingCategories.docs.length === 0) {
      const created = await payload.create({
        collection: "product-categories",
        data,
      });
      categoryIds.push(created.id);
    } else {
      const existing = existingCategories.docs[0];
      await payload.update({
        collection: "product-categories",
        id: existing.id,
        data,
      });
      categoryIds.push(existing.id);
    }
  }

  const catSlugMap: Record<string, number> = {};
  const catSlugs = ["food-grade-salt", "industrial-sea-salt", "water-softening", "de-icing", "industrial-salt", "pharma-salt", "animal-salt"];
  for (let i = 0; i < categoryIds.length; i++) {
    catSlugMap[catSlugs[i]] = categoryIds[i];
  }

  await seedDemoSubcategories(payload, catSlugMap);
  await seedDemoProducts(payload, categoryIds);
  return categoryIds;
}

const subcategoryDefs: Record<string, Array<{ slug: string; name: string; sortOrder: number }>> = {
  "food-grade-salt": [
    { slug: "sea-salt", name: "Sea Salt", sortOrder: 10 },
    { slug: "vacuum-salt", name: "Vacuum Salt", sortOrder: 20 },
    { slug: "table-salt", name: "Table Salt", sortOrder: 30 },
    { slug: "food-industries-dairy-products", name: "Food Industries Dairy Products", sortOrder: 40 },
    { slug: "flavored-salt", name: "Flavored Salt", sortOrder: 50 },
  ],
  "industrial-sea-salt": [
    { slug: "raw-salt-nn", name: "Raw Salt NN", sortOrder: 10 },
    { slug: "raw-salt-ss", name: "Raw Salt SS", sortOrder: 20 },
    { slug: "washed-salt-nn", name: "Washed Salt NN", sortOrder: 30 },
    { slug: "washed-salt-ss", name: "Washed Salt SS", sortOrder: 40 },
  ],
  "water-softening": [
    { slug: "pure-dried-vacuum-salt-pellets", name: "Pure Dried Vacuum Salt Pellets", sortOrder: 10 },
    { slug: "sodium-chloride-pellets", name: "Sodium Chloride Pellets", sortOrder: 20 },
    { slug: "crushed-salt", name: "Crushed Salt", sortOrder: 30 },
  ],
  "de-icing": [
    { slug: "crushed-raw-sea-salt", name: "Crushed Raw Sea Salt", sortOrder: 10 },
    { slug: "crushed-washed-sea-salt", name: "Crushed Washed Sea Salt", sortOrder: 20 },
    { slug: "rock-salt", name: "Rock Salt", sortOrder: 30 },
  ],
  "industrial-salt": [
    { slug: "pure-dried-vacuum-salt-pdv-textile-dyeing", name: "Pure Dried Vacuum Salt PDV for Textile Dyeing", sortOrder: 10 },
    { slug: "fine-refined-salt-textile-dyeing", name: "Fine Refined Salt for Textile Dyeing", sortOrder: 20 },
    { slug: "industrial-salt-drilling-fluids", name: "Industrial Salt for Drilling Fluids", sortOrder: 30 },
    { slug: "epsom-salt-magnesium-sulphate-heptahydrate", name: "Epsom Salt Magnesium Sulphate Heptahydrate", sortOrder: 40 },
    { slug: "sodium-sulfates", name: "Sodium Sulfates", sortOrder: 50 },
    { slug: "petrochemicals-salt", name: "Petrochemicals Salt", sortOrder: 60 },
    { slug: "dishwasher-salt", name: "Dishwasher Salt", sortOrder: 70 },
  ],
  "pharma-salt": [
    { slug: "pure-dried-vacuum-salt-pdv", name: "Pure Dried Vacuum Salt PDV", sortOrder: 10 },
    { slug: "sodium-chloride-nacl-pharmaceutical-salt", name: "Sodium Chloride (NaCl) Pharmaceutical Salt", sortOrder: 20 },
    { slug: "light-salt", name: "Light Salt", sortOrder: 30 },
    { slug: "sodium-chloride-high-purity", name: "Sodium Chloride High Purity", sortOrder: 40 },
  ],
  "animal-salt": [
    { slug: "salt-blocks-animal-feed", name: "Salt Blocks for Animal Feed", sortOrder: 10 },
    { slug: "powder-salt-animal-feed", name: "Powder Salt for Animal Feed", sortOrder: 20 },
  ],
};

async function seedDemoSubcategories(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  catSlugMap: Record<string, number>
) {
  for (const [catSlug, subs] of Object.entries(subcategoryDefs)) {
    const catId = catSlugMap[catSlug];
    if (!catId) continue;

    for (const sub of subs) {
      const existing = await payload.find({
        collection: "product-subcategories",
        limit: 1,
        where: { slug: { equals: sub.slug } },
      });

      const data = {
        slug: sub.slug,
        name: sub.name,
        parentCategory: catId,
        active: true,
        sortOrder: sub.sortOrder,
      };

      if (existing.docs.length === 0) {
        await payload.create({ collection: "product-subcategories", data });
      } else {
        await payload.update({ collection: "product-subcategories", id: existing.docs[0].id, data });
      }
    }
  }
}

async function seedDemoProducts(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  categoryIds: number[]
) {
  const catSlugMap: Record<string, number> = {};
  const catSlugs = ["food-grade-salt", "industrial-sea-salt", "water-softening", "de-icing", "industrial-salt", "pharma-salt", "animal-salt"];
  for (let i = 0; i < categoryIds.length; i++) {
    catSlugMap[catSlugs[i]] = categoryIds[i];
  }

  const demoProducts = [
    { slug: "refined-fine-salt", name: "Refined Fine Salt", description: "Fine-grain refined salt suitable for food processing, seasoning, and table use. Development placeholder awaiting verified specifications.", categorySlug: "food-grade-salt", sortOrder: 10 },
    { slug: "coarse-salt", name: "Coarse Salt", description: "Coarse-grained salt for grinding, brining, and industrial food applications. Development placeholder.", categorySlug: "food-grade-salt", sortOrder: 20 },
    { slug: "vacuum-salt", name: "Vacuum Salt", description: "High-purity vacuum salt produced through evaporation for food and pharmaceutical applications. Development placeholder.", categorySlug: "pharma-salt", sortOrder: 30 },
    { slug: "washed-salt", name: "Washed Salt", description: "Washed industrial salt for chemical processing, water softening, and general industrial use. Development placeholder.", categorySlug: "industrial-salt", sortOrder: 40 },
    { slug: "raw-salt", name: "Raw Salt", description: "Raw salt in its natural form for industrial processing and bulk applications. Development placeholder.", categorySlug: "industrial-salt", sortOrder: 50 },
    { slug: "salt-pellets", name: "Salt Pellets", description: "Compressed salt pellets for water softening systems and treatment applications. Development placeholder.", categorySlug: "water-softening", sortOrder: 60 },
    { slug: "de-icing-salt", name: "De-Icing Salt", description: "Rock salt for winter road de-icing and ice management. Development placeholder.", categorySlug: "de-icing", sortOrder: 70 },
    { slug: "feed-grade-salt", name: "Feed-Grade Salt", description: "Feed-grade salt for livestock nutrition and feed block production. Development placeholder.", categorySlug: "animal-salt", sortOrder: 80 },
  ];

  for (const prod of demoProducts) {
    const existingProducts = await payload.find({
      collection: "products",
      limit: 1,
      where: { slug: { equals: prod.slug } },
    });

    const catId = catSlugMap[prod.categorySlug];
    const productData = {
      slug: prod.slug,
      name: prod.name,
      shortDescription: prod.description,
      category: catId,
      active: true,
      sortOrder: prod.sortOrder,
      applications: [{ application: "Generic placeholder application" }],
      specifications: [{ label: "Type", value: "Development placeholder" }, { label: "Status", value: "Awaiting data" }],
      seo: {
        title: `${prod.name} placeholder`,
        description: "Development placeholder product. Replace before production use.",
        noIndex: true,
      },
    };

    if (existingProducts.docs.length === 0) {
      await payload.create({ collection: "products", data: productData });
    } else {
      await payload.update({ collection: "products", id: existingProducts.docs[0].id, data: productData });
    }
  }
}

async function seedDemoContent(payload: Awaited<ReturnType<typeof getPayloadClient>>) {
  const catIds = await seedDemoCategories(payload);
  if (catIds.length > 0) {
    const catSlugMap: Record<string, number> = {};
    const catSlugs = ["food-grade-salt", "industrial-sea-salt", "water-softening", "de-icing", "industrial-salt", "pharma-salt", "animal-salt"];
    for (let i = 0; i < catIds.length; i++) {
      catSlugMap[catSlugs[i]] = catIds[i];
    }
    await seedDemoSubcategories(payload, catSlugMap);
  }
}

async function seedAboutPage(payload: Awaited<ReturnType<typeof getPayloadClient>>) {
  const englishAbout = await payload.updateGlobal({
    slug: "about-page",
    locale: "en",
    data: buildAboutProfileData(getAboutProfileContent("en")),
  });

  const sharedAboutArrays: AboutArrayIds = {
    overviewParagraphs: englishAbout.overviewParagraphs,
    historyParagraphs: englishAbout.historyParagraphs,
    certificates: englishAbout.certificates,
  };

  await payload.updateGlobal({
    slug: "about-page",
    locale: "fr",
    data: buildAboutProfileData(getAboutProfileContent("fr"), sharedAboutArrays),
  });

  await payload.updateGlobal({
    slug: "about-page",
    locale: "de",
    data: buildAboutProfileData(getAboutProfileContent("de"), sharedAboutArrays),
  });
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
