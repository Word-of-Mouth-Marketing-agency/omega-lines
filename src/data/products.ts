import { productImages, type ProductImage } from "./product-images";

export type CatalogProduct = {
  slug: string;
  sourceFolder: string;
  name: string;
  shortDescription: string;
  description: string[];
  applications: string[];
  image: ProductImage;
  images: ProductImage[];
};

export const products: CatalogProduct[] = [
  {
    slug: "animal-feed-salt",
    sourceFolder: "Animal feed salt",
    name: "Animal Feed Salt",
    shortDescription: "Nutrition salt and lick blocks for livestock, breeding animals, pets, and wildlife.",
    description: [
      "Animal feed salt supports sodium balance, digestion, physical development, and animal well-being.",
      "Omega feed salt is available in powder and lick-block formats for livestock, breeding animals, pets, and wildlife.",
    ],
    applications: ["Livestock nutrition", "Feed mixes", "Salt lick blocks", "Mineral supplementation"],
    image: productImages["animal-feed-salt"][0],
    images: productImages["animal-feed-salt"],
  },
  {
    slug: "coarse-refined-salt",
    sourceFolder: "Coarse Refined Salt (Kithchen Salt)",
    name: "Coarse Refined Salt",
    shortDescription: "Coarse refined salt for cooking, food processing, brining, and preservation.",
    description: [
      "Coarse refined salt is manufactured for food preparation, processing, pickling, brining, and preservation.",
      "Its larger crystal size makes it suitable for applications that require controlled dissolution and texture.",
    ],
    applications: ["Cooking", "Food processing", "Pickling and brining", "Food preservation"],
    image: productImages["coarse-refined-salt"][0],
    images: productImages["coarse-refined-salt"],
  },
  {
    slug: "de-icing-salt",
    sourceFolder: "De Icing salt",
    name: "De-Icing Salt",
    shortDescription: "Rock salt for winter road de-icing and ice management.",
    description: [
      "De-icing salt lowers the freezing point of water to help melt snow and ice on roads and other treated surfaces.",
      "It is supplied for municipal, commercial, and industrial winter-maintenance operations.",
    ],
    applications: ["Road de-icing", "Highway maintenance", "Snow and ice management"],
    image: productImages["de-icing-salt"][0],
    images: productImages["de-icing-salt"],
  },
  {
    slug: "fine-refined-salt",
    sourceFolder: "fine refined salt",
    name: "Fine Refined Salt",
    shortDescription: "Fine refined salt for food manufacturing, seasoning, and table use.",
    description: [
      "Fine refined salt provides consistent, free-flowing crystals for food manufacturing, cooking, and seasoning.",
      "It is suitable for a broad range of processed-food and table-salt requirements.",
    ],
    applications: ["Food manufacturing", "Seasoning", "Table salt", "Processed foods"],
    image: productImages["fine-refined-salt"][0],
    images: productImages["fine-refined-salt"],
  },
  {
    slug: "pdv-textile-salt",
    sourceFolder: "pvd textile",
    name: "PDV Salt for Textile",
    shortDescription: "Pure dried vacuum salt used in textile dyeing and fabric processing.",
    description: [
      "PDV salt is used as a dye enhancer during textile manufacturing, processing, and refinement.",
      "It supports consistent dye penetration and binding in cotton dyeing, fabric processing, and textile printing.",
    ],
    applications: ["Cotton dyeing", "Textile printing", "Fabric processing", "Dye enhancement"],
    image: productImages["pdv-textile-salt"][0],
    images: productImages["pdv-textile-salt"],
  },
  {
    slug: "raw-salt",
    sourceFolder: "raw salt",
    name: "Raw Salt",
    shortDescription: "Naturally evaporated sea salt for high-volume industrial processing.",
    description: [
      "Raw salt is produced through natural seawater evaporation and supplied as an industrial raw material.",
      "It serves chemical, textile, detergent, glass, soap, and petrochemical production requirements.",
    ],
    applications: ["Chemical production", "Detergents", "Glass and soap", "Industrial processing"],
    image: productImages["raw-salt"][0],
    images: productImages["raw-salt"],
  },
  {
    slug: "sea-salt",
    sourceFolder: "Salt Photos",
    name: "Sea Salt",
    shortDescription: "Natural sea salt crystals for food, industrial, and specialist applications.",
    description: [
      "Sea salt is obtained through seawater evaporation and selected for the required crystal size and application.",
      "Omega supplies sea salt in multiple grades and packaging formats for domestic and export markets.",
    ],
    applications: ["Food applications", "Industrial processing", "Bulk supply", "Export markets"],
    image: productImages["sea-salt"][0],
    images: productImages["sea-salt"],
  },
  {
    slug: "salt-tablets",
    sourceFolder: "Salt Tablets",
    name: "Salt Tablets",
    shortDescription: "High-purity salt tablets for water-softening and treatment systems.",
    description: [
      "Salt tablets support ion-exchange water softening by helping remove calcium and magnesium from hard water.",
      "Their consistent tablet form helps treatment units and boilers operate efficiently while limiting deposits.",
    ],
    applications: ["Water softening", "Boiler treatment", "Ion exchange", "Domestic and industrial systems"],
    image: productImages["salt-tablets"][0],
    images: productImages["salt-tablets"],
  },
  {
    slug: "vacuum-salt",
    sourceFolder: "vaccum salt",
    name: "Vacuum Salt",
    shortDescription: "High-purity pure dried vacuum salt for food and specialist manufacturing.",
    description: [
      "Pure dried vacuum salt is a clean, fine salt used where high purity and consistency are essential.",
      "It is suitable for food manufacturing and other specialist processes requiring a controlled salt grade.",
    ],
    applications: ["Food manufacturing", "Dairy products", "Prepared foods", "Specialist processing"],
    image: productImages["vacuum-salt"][0],
    images: productImages["vacuum-salt"],
  },
  {
    slug: "washed-salt",
    sourceFolder: "washed salt",
    name: "Washed Salt",
    shortDescription: "Washed sea salt with low insoluble impurities for industrial use.",
    description: [
      "Washed salt is produced by washing naturally evaporated sea salt to reduce insoluble impurities.",
      "It is supplied in different crystal sizes for chemical, detergent, food, and energy applications.",
    ],
    applications: ["Chemical processing", "Detergents and soap", "Food industries", "Solar ponds"],
    image: productImages["washed-salt"][0],
    images: productImages["washed-salt"],
  },
];

export function getProduct(slug: string): CatalogProduct | null {
  return products.find((product) => product.slug === slug) ?? null;
}
