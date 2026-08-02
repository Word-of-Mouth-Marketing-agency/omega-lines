import type { Locale } from "@/i18n/routing";
import { getPayloadClient } from "@/lib/payload";
import { isUIReviewMode } from "@/lib/review-mode";

type GlobalSlug =
  | "about-page"
  | "homepage"
  | "site-settings"
  | "header-navigation"
  | "footer"
  | "contact-information"
  | "social-links";

export type CmsMedia = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export type CmsSeo = {
  title?: string | null;
  description?: string | null;
  image?: CmsMedia | number | null;
  noIndex?: boolean | null;
};

export type CmsProductCategory = {
  id?: string | number;
  slug?: string | null;
  name?: string | null;
  description?: string | null;
  image?: CmsMedia | number | null;
  active?: boolean | null;
  sortOrder?: number | null;
  seo?: CmsSeo | null;
  updatedAt?: string | null;
};

export type CmsProductSubcategory = {
  id?: string | number;
  slug?: string | null;
  name?: string | null;
  description?: string | null;
  parentCategory?: CmsProductCategory | number | null;
  active?: boolean | null;
  sortOrder?: number | null;
};

export type CmsProduct = {
  id?: string | number;
  slug?: string | null;
  name?: string | null;
  shortDescription?: string | null;
  fullDescription?: unknown;
  category?: CmsProductCategory | number | null;
  subcategory?: CmsProductSubcategory | number | null;
  featuredImage?: CmsMedia | number | null;
  galleryImages?: Array<{ image?: CmsMedia | number | null }> | null;
  applications?: Array<{ application?: string | null }> | null;
  specifications?: Array<{ label?: string | null; value?: string | null }> | null;
  featured?: boolean | null;
  active?: boolean | null;
  sortOrder?: number | null;
  seo?: CmsSeo | null;
  updatedAt?: string | null;
};

const reviewCategories: CmsProductCategory[] = [
  { id: 1, slug: "food-grade-salt", name: "Food Grade Salt", description: "High-purity salt for food processing, seasoning, and preservation.", active: true, sortOrder: 10 },
  { id: 2, slug: "industrial-sea-salt", name: "Industrial Sea Salt", description: "Sea salt sourced and processed for industrial applications.", active: true, sortOrder: 20 },
  { id: 3, slug: "water-softening", name: "Water Softening", description: "Salt formulations for water softening and treatment systems.", active: true, sortOrder: 30 },
  { id: 4, slug: "de-icing", name: "De-icing", description: "Rock salt and de-icing salt for winter road safety.", active: true, sortOrder: 40 },
  { id: 5, slug: "industrial-salt", name: "Industrial Salt", description: "Salt for chemical processing, textile, and manufacturing.", active: true, sortOrder: 50 },
  { id: 6, slug: "pharma-salt", name: "Pharma Salt", description: "High-purity salt for pharmaceutical and medical applications.", active: true, sortOrder: 60 },
  { id: 7, slug: "animal-salt", name: "Animal Salt", description: "Feed-grade salt for livestock nutrition and feed blocks.", active: true, sortOrder: 70 },
  { id: 8, slug: "pharmaceutical-grade-salt", name: "Pharmaceutical Grade Salt", description: "Controlled-purity salt for specialist pharmaceutical applications.", active: true, sortOrder: 80 },
];

const reviewProducts: CmsProduct[] = [
  { id: 1, slug: "refined-fine-salt", name: "Refined Fine Salt", shortDescription: "Fine-grain refined salt suitable for food processing, seasoning, and table use.", category: reviewCategories[0], sortOrder: 10, active: true, applications: [{ application: "Food processing and seasoning" }], specifications: [{ label: "Type", value: "Refined Fine Salt" }] },
  { id: 2, slug: "coarse-salt", name: "Coarse Salt", shortDescription: "Coarse-grained salt for grinding, brining, and industrial food applications.", category: reviewCategories[0], sortOrder: 20, active: true, applications: [{ application: "Brining and grinding" }], specifications: [{ label: "Type", value: "Coarse Salt" }] },
  { id: 3, slug: "vacuum-salt", name: "Vacuum Salt", shortDescription: "High-purity vacuum salt produced through evaporation for food and pharmaceutical applications.", category: reviewCategories[5], sortOrder: 30, active: true, applications: [{ application: "Pharmaceutical" }], specifications: [{ label: "Type", value: "Vacuum Salt" }] },
  { id: 4, slug: "washed-salt", name: "Washed Salt", shortDescription: "Washed industrial salt for chemical processing, water softening, and general industrial use.", category: reviewCategories[4], sortOrder: 40, active: true, applications: [{ application: "Industrial processing" }], specifications: [{ label: "Type", value: "Washed Salt" }] },
  { id: 5, slug: "raw-salt", name: "Raw Salt", shortDescription: "Raw salt in its natural form for industrial processing and bulk applications.", category: reviewCategories[4], sortOrder: 50, active: true, applications: [{ application: "Bulk industrial" }], specifications: [{ label: "Type", value: "Raw Salt" }] },
  { id: 6, slug: "salt-pellets", name: "Salt Pellets", shortDescription: "Compressed salt pellets for water softening systems and treatment applications.", category: reviewCategories[2], sortOrder: 60, active: true, applications: [{ application: "Water softening" }], specifications: [{ label: "Type", value: "Salt Pellets" }] },
  { id: 7, slug: "de-icing-salt", name: "De-Icing Salt", shortDescription: "Rock salt for winter road de-icing and ice management.", category: reviewCategories[3], sortOrder: 70, active: true, applications: [{ application: "Road de-icing" }], specifications: [{ label: "Type", value: "Rock Salt" }] },
  { id: 8, slug: "feed-grade-salt", name: "Feed-Grade Salt", shortDescription: "Feed-grade salt for livestock nutrition and feed block production.", category: reviewCategories[6], sortOrder: 80, active: true, applications: [{ application: "Animal nutrition" }], specifications: [{ label: "Type", value: "Feed-Grade Salt" }] },
];

const reviewContact = {
  address: "16 Rabaa Investment Buildings, Nozha St., Nasr City, Cairo – Egypt",
  telephoneNumbers: [{ number: "+202 2 418 61 56" }, { number: "+202 2 690 74 98" }],
  faxNumbers: [{ number: "+202 2 690 01 94" }],
  cellNumbers: [{ number: "+2 011 1 550 85 45" }, { number: "+2 012 2 399 49 09" }, { number: "+2 011 1 093 20 01" }],
  emailAddresses: [{ email: "info@omegalineegypt.com" }, { email: "omega.line.eg@gmail.com" }],
};

async function getPayloadOrNull<T>(fn: () => Promise<T>): Promise<T | null> {
  if (isUIReviewMode) return null;
  try {
    return await fn();
  } catch (error) {
    console.error("[cms] Payload query failed", error);
    return null;
  }
}

async function getPayloadOrEmpty<T>(fn: () => Promise<T[]>): Promise<T[]> {
  if (isUIReviewMode) return [];
  try {
    return await fn();
  } catch (error) {
    console.error("[cms] Payload query failed", error);
    return [];
  }
}

function categoryMatches(value: CmsProduct["category"], categoryId: string | number): boolean {
  if (typeof value === "object" && value !== null) {
    return value.id === categoryId;
  }
  return value === categoryId;
}

function categoryIsPublic(category: CmsProduct["category"]): boolean {
  return typeof category !== "object" || category === null || category.active !== false;
}

export async function getGlobal(slug: GlobalSlug, locale: Locale, depth = 1) {
  return getPayloadOrNull(async () => {
    const payload = await getPayloadClient();
    return payload.findGlobal({ slug, depth, fallbackLocale: "en", locale });
  });
}

export async function getHomepage(locale: Locale) {
  return getGlobal("homepage", locale, 2);
}

export async function getSiteSettings(locale: Locale) {
  return getGlobal("site-settings", locale, 1);
}

export async function getHeaderNavigation(locale: Locale) {
  return getGlobal("header-navigation", locale, 1);
}

export async function getFooter(locale: Locale) {
  return getGlobal("footer", locale, 1);
}

export async function getContactInformation(locale: Locale) {
  if (isUIReviewMode) return reviewContact;
  return getGlobal("contact-information", locale, 1);
}

export async function getSocialLinks(locale: Locale) {
  return getGlobal("social-links", locale, 1);
}

export async function getAboutPage(locale: Locale) {
  return getGlobal("about-page", locale, 2);
}

export async function getActiveProductCategories(
  locale: Locale,
  limit?: number,
): Promise<CmsProductCategory[]> {
  if (isUIReviewMode) {
    return typeof limit === "number" ? reviewCategories.slice(0, limit) : reviewCategories;
  }

  return getPayloadOrEmpty(async () => {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "product-categories",
      depth: 1,
      fallbackLocale: "en",
      locale,
      sort: "sortOrder",
      where: { active: { equals: true } },
      ...(typeof limit === "number" ? { limit } : { pagination: false }),
    });
    return result.docs as CmsProductCategory[];
  });
}

export async function getProductCategoryBySlug(
  slug: string,
  locale: Locale,
): Promise<CmsProductCategory | null> {
  if (isUIReviewMode) {
    return reviewCategories.find((category) => category.slug === slug && category.active !== false) ?? null;
  }

  return getPayloadOrNull(async () => {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "product-categories",
      depth: 1,
      fallbackLocale: "en",
      limit: 1,
      locale,
      where: {
        and: [
          { slug: { equals: slug } },
          { active: { equals: true } },
        ],
      },
    });
    return (result.docs[0] as CmsProductCategory | undefined) ?? null;
  });
}

export async function getActiveProductCategorySlugs(): Promise<
  Array<{ slug: string; updatedAt?: string | null }>
> {
  if (isUIReviewMode) {
    return reviewCategories
      .filter((category) => category.active !== false && category.slug)
      .map((category) => ({ slug: category.slug as string, updatedAt: category.updatedAt }));
  }

  return getPayloadOrEmpty(async () => {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "product-categories",
      depth: 0,
      locale: "en",
      sort: "sortOrder",
      pagination: false,
      where: { active: { equals: true } },
    });

    const categories = result.docs as CmsProductCategory[];
    return categories
      .filter((category): category is CmsProductCategory & { slug: string } => typeof category.slug === "string" && category.slug.length > 0)
      .map((category) => ({ slug: category.slug, updatedAt: category.updatedAt }));
  });
}

export async function getActiveSubcategories(
  locale: Locale,
  parentCategoryId: string | number,
  limit?: number,
): Promise<CmsProductSubcategory[]> {
  if (isUIReviewMode) return [];

  return getPayloadOrEmpty(async () => {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "product-subcategories",
      depth: 1,
      fallbackLocale: "en",
      locale,
      sort: "sortOrder",
      where: {
        and: [
          { active: { equals: true } },
          { parentCategory: { equals: parentCategoryId } },
        ],
      },
      ...(typeof limit === "number" ? { limit } : { pagination: false }),
    });
    return result.docs as CmsProductSubcategory[];
  });
}

export async function getActiveProducts(locale: Locale, limit = 12): Promise<CmsProduct[]> {
  if (isUIReviewMode) return reviewProducts.slice(0, limit);

  return getPayloadOrEmpty(async () => {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "products",
      depth: 2,
      fallbackLocale: "en",
      limit,
      locale,
      sort: "sortOrder",
      where: { active: { equals: true } },
    });
    return (result.docs as CmsProduct[]).filter(
      (product) => categoryIsPublic(product.category),
    );
  });
}

export async function getActiveProductsByCategory(
  locale: Locale,
  categoryId: string | number,
  limit?: number,
): Promise<CmsProduct[]> {
  if (isUIReviewMode) {
    const products = reviewProducts.filter(
      (product) => product.active !== false && categoryMatches(product.category, categoryId),
    );
    return typeof limit === "number" ? products.slice(0, limit) : products;
  }

  return getPayloadOrEmpty(async () => {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "products",
      depth: 2,
      fallbackLocale: "en",
      locale,
      sort: "sortOrder",
      where: {
        and: [
          { active: { equals: true } },
          { category: { equals: categoryId } },
        ],
      },
      ...(typeof limit === "number" ? { limit } : { pagination: false }),
    });

    return (result.docs as CmsProduct[]).filter(
      (product) => categoryIsPublic(product.category),
    );
  });
}

export async function getActiveGalleryItems(locale: Locale, limit = 6) {
  if (isUIReviewMode) return [];
  return getPayloadOrEmpty(async () => {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "gallery",
      depth: 1,
      fallbackLocale: "en",
      limit,
      locale,
      sort: "sortOrder",
      where: { active: { equals: true } },
    });
    return result.docs;
  });
}

export async function getProductBySlug(slug: string, locale: Locale): Promise<CmsProduct | null> {
  if (isUIReviewMode) {
    return reviewProducts.find((product) => product.slug === slug && product.active !== false) ?? null;
  }

  return getPayloadOrNull(async () => {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "products",
      depth: 2,
      fallbackLocale: "en",
      limit: 1,
      locale,
      where: {
        and: [
          { slug: { equals: slug } },
          { active: { equals: true } },
        ],
      },
    });

    const product = (result.docs[0] as CmsProduct | undefined) ?? null;
    if (!product || !categoryIsPublic(product.category)) {
      return null;
    }
    return product;
  });
}
