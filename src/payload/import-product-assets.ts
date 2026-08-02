import fs from "node:fs/promises";
import path from "node:path";
import { getPayloadClient } from "@/lib/payload";

const ASSETS_ROOT = process.env.PRODUCT_ASSETS_ROOT
  ? path.resolve(process.env.PRODUCT_ASSETS_ROOT)
  : path.resolve(process.cwd(), "content/product-assets");

const categories = [
  {
    slug: "food-grade-salt",
    name: "Food Grade Salt",
    description: "Refined and high-purity salt for food processing, cooking, seasoning, and preservation.",
  },
  {
    slug: "industrial-sea-salt",
    name: "Industrial Sea Salt",
    description: "Raw and washed sea salt for industrial processing and bulk applications.",
  },
  {
    slug: "water-softening",
    name: "Water Softening",
    description: "Salt tablets and pellets for water-softening and ion-exchange systems.",
  },
  {
    slug: "de-icing",
    name: "De-icing",
    description: "Salt for melting snow and ice on roads and other surfaces.",
  },
  {
    slug: "industrial-salt",
    name: "Industrial Salt",
    description: "Salt for textile dyeing, chemical processing, and manufacturing.",
  },
  {
    slug: "animal-salt",
    name: "Animal Salt",
    description: "Feed-grade salt and lick blocks for livestock nutrition.",
  },
] as const;

type ProductDefinition = {
  slug: string;
  name: string;
  categorySlug: (typeof categories)[number]["slug"];
  folder: string;
  shortDescription: string;
  paragraphs: string[];
  applications: string[];
  images: string[];
  reuseMediaFilenames?: string[];
  includeAllFolderImages?: boolean;
};

const products: ProductDefinition[] = [
  {
    slug: "animal-feed-salt",
    name: "Animal Feed Salt",
    categorySlug: "animal-salt",
    folder: "Animal feed salt",
    shortDescription: "Nutrition salt and lick blocks for livestock, breeding animals, pets, and wildlife.",
    paragraphs: [
      "Animal nutrition salt is used as a raw material for industrially produced feed mixes or as a ready-to-use nutritional supplement in breeding. It supports animal health, fertility, performance, and stamina.",
      "Omega nutrition salts are manufactured to high quality and animal-safety standards and are suitable for conventional and biological agriculture.",
      "Omega lick blocks provide a simple, cost-effective mineral supplement. Animals can use the blocks instinctively according to their individual needs. Blocks are available in different sizes, either pure or fortified with minerals, trace elements, and flavors.",
      "Powder feed salt helps breeding animals balance sodium levels where common fodder plants do not provide enough sodium, supporting digestion, physical development, and well-being.",
    ],
    applications: ["Industrial feed mixes", "Livestock mineral supplementation", "Lick blocks", "Powder feed salt"],
    images: ["6355998904251gal.jpg", "20180308_103606.jpg", "6355998944814gal.jpg", "IMG-20180620-WA0002.jpg"],
  },
  {
    slug: "coarse-refined-iodized-salt",
    name: "Coarse Refined Iodized Salt",
    categorySlug: "food-grade-salt",
    folder: "Coarse Refined Salt (Kithchen Salt)",
    shortDescription: "Coarse refined iodized table salt for cooking, food processing, and preservation.",
    paragraphs: [
      "Coarse refined iodized salt is manufactured to meet a variety of food and cooking needs. It contains iodine and additives designed to help the salt remain free-flowing.",
      "Sodium chloride performs several important functions in cooking and food processing. It is widely used with dried fruit, pickles, oils, chips, dairy products, sauces, ketchup, canned fish, cheese, and chicken stock cubes.",
      "This salt is also used in food and beverage preservation and in processed foods as a seasoning and flavor enhancer.",
    ],
    applications: ["Cooking and table use", "Food processing", "Pickling and preservation", "Sauces, dairy, canned foods, and snacks"],
    images: ["18.PNG", "7.PNG", "Coarse.jpeg", "sea-salt-in-wooden-bowl-with-spoon.jpg"],
  },
  {
    slug: "de-icing-salt",
    name: "De-icing Salt",
    categorySlug: "de-icing",
    folder: "De Icing salt",
    shortDescription: "Salt used to lower the freezing point of water and help melt snow and ice on highways and roads.",
    paragraphs: [
      "De-icing salt reduces the freezing point of water, helping to melt snow and ice on highways, roads, and other treated surfaces in winter conditions.",
    ],
    applications: ["Highway de-icing", "Road ice management", "Snow and ice melting"],
    images: ["6355997594986.jpg", "6355999202619gal.jpg", "6355999218544gal.jpg", "6355999219783gal.jpg"],
  },
  {
    slug: "fine-refined-iodized-salt",
    name: "Fine Refined Iodized Salt",
    categorySlug: "food-grade-salt",
    folder: "fine refined salt",
    shortDescription: "Fine refined iodized table salt for cooking, food processing, and preservation.",
    paragraphs: [
      "Fine refined iodized salt is manufactured to meet a variety of food and cooking needs. It contains iodine and additives designed to help the salt remain free-flowing.",
      "Sodium chloride performs several important functions in cooking and food processing. It is widely used with dried fruit, pickles, oils, chips, dairy products, sauces, ketchup, canned fish, cheese, and chicken stock cubes.",
      "This salt is also used in food and beverage preservation and in processed foods as a seasoning and flavor enhancer.",
    ],
    applications: ["Cooking and table use", "Food processing", "Food and beverage preservation", "Sauces, dairy, canned foods, and snacks"],
    images: ["1.PNG", "10.PNG", "IMG_2324.jpg", "nacl.PNG"],
  },
  {
    slug: "pdv-salt-textile-dyeing",
    name: "PDV Salt for Textile Dyeing",
    categorySlug: "industrial-salt",
    folder: "pvd textile",
    shortDescription: "Pure dried vacuum salt used as a dye enhancer in textile manufacturing and processing.",
    paragraphs: [
      "In the textile industry, industrial salt is used as a dye enhancer during the manufacture, processing, and refining of fabrics and materials, including cotton dyeing and textile printing.",
      "The salt helps color penetrate the fabric, bind more effectively, and remain consistent through the dyeing process.",
    ],
    applications: ["Cotton dyeing", "Textile printing", "Fabric processing", "Dye enhancement"],
    images: ["6356055229258.jpg", "6356055218871.jpg"],
  },
  {
    slug: "raw-sea-salt",
    name: "Raw Sea Salt",
    categorySlug: "industrial-sea-salt",
    folder: "raw salt",
    shortDescription: "Naturally evaporated sea salt for chemical, textile, detergent, glass, soap, and petrochemical production.",
    paragraphs: [
      "Raw sea salt is produced through the natural evaporation of seawater. Environmental conditions and seawater quality directly influence the resulting salt quality.",
      "A natural washing process helps produce especially clean sea salt for use as a chemical and industrial raw material.",
    ],
    applications: ["Caustic soda production", "Textile dyestuffs", "Detergents", "Soda ash, glass, and soap", "Petrochemical and chemical plants"],
    images: ["Raw.jpg", "which one.jpg"],
  },
  {
    slug: "salt-tablets",
    name: "Salt Tablets",
    categorySlug: "water-softening",
    folder: "Salt Tablets",
    shortDescription: "High-purity salt tablets for industrial and household water-softening systems.",
    paragraphs: [
      "Soft water is necessary for many industrial processes and private households. Because water hardness varies by region, treatment may be required to obtain soft water.",
      "Water softening uses ion exchange to remove calcium and magnesium. Pure dried vacuum salt tablets are produced to high-purity standards for use in this process.",
      "Salt tablets help water-treatment units and boilers operate efficiently, prevent caking and crust deposits, and reduce interruptions caused by poor water quality.",
    ],
    applications: ["Industrial water softening", "Household water softening", "Hotels, hospitals, and schools", "Factories and apartment buildings", "Boiler and treatment-unit maintenance"],
    images: ["7O3A5319.jpg", "pdv.jpeg", "sodium chloride tablets.jpeg", "Tablets.PNG"],
  },
  {
    slug: "pure-dried-vacuum-salt",
    name: "Pure Dried Vacuum Salt",
    categorySlug: "food-grade-salt",
    folder: "vaccum salt",
    shortDescription: "High-purity, fine food-grade salt for food manufacturing and other applications requiring clean salt.",
    paragraphs: [
      "Pure dried vacuum salt is a high-purity, very clean salt frequently used in food manufacturing and production, as well as other applications requiring pure, fine food-grade salt.",
      "Food-grade PDV salt is well suited to soups, sauces, dressings, marinades, milk, cheese, sausage and meat products, canned foods, and ready-made meals.",
    ],
    applications: ["Soups and sauces", "Dressings and marinades", "Milk and cheese products", "Meat products", "Canned foods and ready-made meals"],
    images: ["11.PNG", "12.PNG"],
  },
  {
    slug: "washed-industrial-salt",
    name: "Washed Industrial Salt",
    categorySlug: "industrial-sea-salt",
    folder: "washed salt",
    shortDescription: "Washed sea salt with low insoluble impurities for chemical, detergent, food, and energy applications.",
    paragraphs: [
      "Washed sea salt is produced through seawater evaporation and washing. It contains a low proportion of insoluble impurities and is available as large white crystals in different crystal sizes.",
      "Industrial salt is used in chemical production as a filler for detergents and solvents and in soap manufacturing. It is also used to maintain salinity in solar ponds and other energy-producing facilities.",
      "Washed industrial salt is used in a range of food and industrial applications and is produced in accordance with international specifications.",
    ],
    applications: ["Detergents and solvents", "Soap manufacturing", "Solar ponds and energy facilities", "Food industries", "General chemical processing"],
    images: ["7O3A5325.jpg", "WASHED.PNG", "Washed.jpeg", "WhatsApp Image 2025-05-05 at 11.10.03 AM (1).jpeg"],
  },
  {
    slug: "salt-blocks-animal-feed",
    name: "Salt Blocks for Animal Feed",
    categorySlug: "animal-salt",
    folder: "Animal feed salt",
    shortDescription: "Lick blocks that provide pets, breeding animals, livestock, and wildlife with a simple mineral supplement.",
    paragraphs: [
      "Omega lick blocks provide a simple, cost-effective mineral supplement for pets, breeding animals, livestock, and wildlife.",
      "Animals use the blocks instinctively according to their individual needs. Blocks are available in different sizes, either pure or fortified with minerals, trace elements, and flavors.",
    ],
    applications: ["Livestock mineral supplementation", "Breeding animals", "Pets and wildlife"],
    images: [],
    reuseMediaFilenames: ["animal-feed-salt-2.jpg", "animal-feed-salt-1.jpg", "animal-feed-salt-4.jpg"],
  },
  {
    slug: "powder-salt-animal-feed",
    name: "Powder Salt for Animal Feed",
    categorySlug: "animal-salt",
    folder: "Animal feed salt",
    shortDescription: "Powder feed salt that helps breeding animals maintain sodium balance and supports digestion and development.",
    paragraphs: [
      "Animals in the wild seek natural salt sources and regulate their sodium intake. Breeding animals may need supplemental sodium where common fodder plants do not provide enough.",
      "Powder feed salt supports digestion, physical development, and animal well-being.",
    ],
    applications: ["Industrial feed mixes", "Breeding-animal nutrition", "Powder feed supplementation"],
    images: [],
    reuseMediaFilenames: ["animal-feed-salt-3.jpg", "animal-feed-salt-1.jpg"],
  },
  {
    slug: "sodium-chloride-tablets",
    name: "Sodium Chloride Tablets",
    categorySlug: "water-softening",
    folder: "Salt Tablets",
    shortDescription: "Sodium chloride tablets for industrial and domestic water-softening units and boiler treatment systems.",
    paragraphs: [
      "Sodium chloride tablets help reduce interruptions caused by poor water quality and support the efficient operation of treatment units and boilers.",
      "They help prevent caking and crust deposits in boiler piping, limit resin and boiler replacement requirements, and are suitable for industrial and household water-softening units.",
    ],
    applications: ["Industrial water softening", "Household water softening", "Boiler treatment", "Water-treatment units"],
    images: [],
    reuseMediaFilenames: ["salt-tablets-3.jpeg", "salt-tablets-4.png", "salt-tablets-1.jpg"],
  },
  {
    slug: "dishwasher-salt",
    name: "Dishwasher Salt",
    categorySlug: "industrial-salt",
    folder: "Salt Photos/Photos",
    shortDescription: "Coarse salt for use in dishwasher water-softening systems.",
    paragraphs: [
      "Dishwasher salt supports the appliance's built-in water-softening system by helping it manage hard-water minerals.",
      "The coarse crystal format is intended for dishwasher salt reservoirs and helps support effective washing performance.",
    ],
    applications: ["Dishwasher water softening", "Hard-water management"],
    images: ["DISH.PNG"],
    includeAllFolderImages: false,
  },
];

const PRODUCT_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function allImagesInFolder(folder: string, preferred: string[]) {
  const entries = await fs.readdir(path.join(ASSETS_ROOT, folder), { withFileTypes: true });
  const remaining = entries
    .filter((entry) => entry.isFile() && PRODUCT_IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .filter((filename) => !preferred.includes(filename))
    .sort((a, b) => a.localeCompare(b));
  return [...preferred, ...remaining];
}

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
        children: [{
          type: "text" as const,
          detail: 0,
          format: 0,
          mode: "normal" as const,
          style: "",
          text,
          version: 1,
        }],
      })),
    },
  };
}

function mimeType(filename: string) {
  switch (path.extname(filename).toLowerCase()) {
    case ".png": return "image/png";
    case ".webp": return "image/webp";
    default: return "image/jpeg";
  }
}

async function getOrCreateMedia(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  product: ProductDefinition,
  filename: string,
  index: number,
) {
  const extension = path.extname(filename).toLowerCase();
  const storedFilename = `${product.slug}-${index + 1}${extension}`;
  const existing = await payload.find({
    collection: "media",
    limit: 1,
    depth: 0,
    where: { filename: { equals: storedFilename } },
  });

  if (existing.docs[0]) return existing.docs[0].id;

  const sourcePath = path.join(ASSETS_ROOT, product.folder, filename);
  const data = await fs.readFile(sourcePath);
  const media = await payload.create({
    collection: "media",
    data: {
      alt: `${product.name}${index === 0 ? "" : ` - image ${index + 1}`}`,
      caption: `Product image for ${product.name}`,
    },
    file: {
      data,
      mimetype: mimeType(filename),
      name: storedFilename,
      size: data.byteLength,
    },
  });
  return media.id;
}

export async function importProducts({ destroy = true }: { destroy?: boolean } = {}) {
  await fs.access(ASSETS_ROOT);
  const payload = await getPayloadClient();

  try {
    const categoryIds = new Map<string, number>();

    for (const [index, category] of categories.entries()) {
      const existing = await payload.find({
        collection: "product-categories",
        limit: 1,
        depth: 0,
        where: { slug: { equals: category.slug } },
      });

      const record = existing.docs[0] ?? await payload.create({
        collection: "product-categories",
        locale: "en",
        data: {
          ...category,
          active: true,
          sortOrder: (index + 1) * 10,
          seo: { title: category.name, description: category.description, noIndex: false },
        },
      });
      categoryIds.set(category.slug, record.id);
    }

    for (const [index, product] of products.entries()) {
      console.log(`Importing ${product.name}...`);
      const mediaIds: number[] = [];
      if (product.reuseMediaFilenames) {
        for (const filename of product.reuseMediaFilenames) {
          const existingMedia = await payload.find({
            collection: "media",
            limit: 1,
            depth: 0,
            where: { filename: { equals: filename } },
          });
          if (existingMedia.docs[0]) mediaIds.push(existingMedia.docs[0].id);
        }
      } else {
        const filenames = product.includeAllFolderImages === false
          ? product.images
          : await allImagesInFolder(product.folder, product.images);
        for (const [imageIndex, filename] of filenames.entries()) {
          mediaIds.push(await getOrCreateMedia(payload, product, filename, imageIndex));
        }
      }

      if (mediaIds.length === 0) throw new Error(`No usable images found for ${product.name}`);

      const existing = await payload.find({
        collection: "products",
        limit: 1,
        depth: 0,
        where: { slug: { equals: product.slug } },
      });
      const category = categoryIds.get(product.categorySlug);
      if (!category) throw new Error(`Missing category ${product.categorySlug}`);

      const productData = {
        slug: product.slug,
        name: product.name,
        shortDescription: product.shortDescription,
        fullDescription: lexicalDocument(product.paragraphs),
        category,
        featuredImage: mediaIds[0],
        galleryImages: mediaIds.slice(1).map((image) => ({ image })),
        applications: product.applications.map((application) => ({ application })),
        featured: index < 6,
        active: true,
        sortOrder: (index + 1) * 10,
        seo: {
          title: `${product.name} | Omega Lines`,
          description: product.shortDescription,
          image: mediaIds[0],
          noIndex: false,
        },
      };

      if (existing.docs[0]) {
        await payload.update({ collection: "products", id: existing.docs[0].id, locale: "en", data: productData });
      } else {
        await payload.create({ collection: "products", locale: "en", data: productData });
      }
    }

    console.log(`Imported ${products.length} products across ${categories.length} categories.`);
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
