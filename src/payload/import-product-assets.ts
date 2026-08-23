import fs from "node:fs/promises";
import path from "node:path";
import { productCategories, products, type ProductCategory } from "@/data/products";
import { getPayloadClient } from "@/lib/payload";

const categoryDetails: Record<ProductCategory, { slug: string; description: string }> = {
  "Food Grade Salt": { slug: "food-grade-salt", description: "Food-grade salt for cooking, processing, seasoning, preservation, and dairy applications." },
  "Industrial Sea Salt": { slug: "industrial-sea-salt", description: "Sea salt and related mineral products for textile, chemical, drilling, household, and agricultural uses." },
  "Water Softening": { slug: "water-softening", description: "Salt tablets, crushed salt, and salt blocks for water-softening and treatment systems." },
  "De-Icing": { slug: "de-icing", description: "Raw, washed, road, and crushed salt grades for snow and ice management." },
  "Pharma Salt": { slug: "pharma-salt", description: "High-purity sodium chloride products for pharmaceutical and medical-industry applications." },
  "Animal Salt": { slug: "animal-salt", description: "Feed-grade powder salt for animal nutrition and sodium supplementation." },
};

function lexicalDocument(paragraphs: string[]) {
  return {
    root: {
      type: "root" as const,
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph" as const,
        format: "" as const,
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        children: [{ type: "text" as const, detail: 0, format: 0, mode: "normal" as const, style: "", text, version: 1 }],
      })),
    },
  };
}

async function getOrCreateMedia(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  product: (typeof products)[number],
  image: (typeof products)[number]["images"][number],
) {
  const filename = path.basename(image.url);
  const existing = await payload.find({
    collection: "media",
    limit: 1,
    depth: 0,
    where: { filename: { equals: filename } },
  });
  if (existing.docs[0]) return existing.docs[0].id;

  const sourcePath = path.join(process.cwd(), "public", image.url.replace(/^\//, ""));
  const data = await fs.readFile(sourcePath);
  const media = await payload.create({
    collection: "media",
    data: { alt: image.alt, caption: `Product image for ${product.name}` },
    file: { data, mimetype: "image/webp", name: filename, size: data.byteLength },
  });
  return media.id;
}

export async function importProducts({ destroy = true }: { destroy?: boolean } = {}) {
  const payload = await getPayloadClient();
  try {
    const categoryIds = new Map<ProductCategory, number>();

    for (const [index, category] of productCategories.entries()) {
      const details = categoryDetails[category];
      const existing = await payload.find({
        collection: "product-categories",
        limit: 1,
        depth: 0,
        where: { slug: { equals: details.slug } },
      });
      const data = {
        slug: details.slug,
        name: category,
        description: details.description,
        active: true,
        sortOrder: (index + 1) * 10,
        seo: { title: category, description: details.description, noIndex: false },
      };
      const record = existing.docs[0]
        ? await payload.update({ collection: "product-categories", id: existing.docs[0].id, locale: "en", data })
        : await payload.create({ collection: "product-categories", locale: "en", data });
      categoryIds.set(category, record.id);
    }

    for (const [index, product] of products.entries()) {
      console.log(`Importing ${product.name}...`);
      const mediaIds = [];
      for (const image of product.images) mediaIds.push(await getOrCreateMedia(payload, product, image));

      const category = categoryIds.get(product.category);
      if (!category) throw new Error(`Missing category ${product.category}`);
      const existing = await payload.find({
        collection: "products",
        limit: 1,
        depth: 0,
        where: { slug: { equals: product.slug } },
      });
      const data = {
        slug: product.slug,
        name: product.name,
        shortDescription: product.shortDescription,
        fullDescription: lexicalDocument(product.description),
        category,
        featuredImage: mediaIds[0],
        galleryImages: mediaIds.slice(1).map((image) => ({ image })),
        applications: product.applications.map((application) => ({ application })),
        featured: index < 8,
        active: true,
        sortOrder: (index + 1) * 10,
        seo: { title: `${product.name} | Omega Lines`, description: product.shortDescription, image: mediaIds[0], noIndex: false },
      };
      if (existing.docs[0]) {
        await payload.update({ collection: "products", id: existing.docs[0].id, locale: "en", data });
      } else {
        await payload.create({ collection: "products", locale: "en", data });
      }
    }

    const currentSlugs = new Set(products.map((product) => product.slug));
    const allProducts = await payload.find({ collection: "products", depth: 0, pagination: false });
    for (const product of allProducts.docs) {
      if (typeof product.slug === "string" && !currentSlugs.has(product.slug)) {
        await payload.delete({ collection: "products", id: product.id });
      }
    }

    console.log(`Imported ${products.length} products across ${productCategories.length} categories and removed stale product records.`);
  } finally {
    if (destroy) await payload.destroy();
  }
}

if (process.argv[1]?.endsWith("import-product-assets.ts")) {
  importProducts()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
