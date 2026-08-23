import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const productFolders = [
  { slug: "pure-dried-vacuum-salt", folder: "Food Grade Salt/Pure Dried Vacuum Salt", preferred: "12.PNG" },
  { slug: "fine-refined-iodized-salt", folder: "Food Grade Salt/Fine Refined Iodized Salt", preferred: "1.PNG" },
  { slug: "coarse-refined-iodized-salt", folder: "Food Grade Salt/Coarse Refined Salt (Kithchen Salt)", preferred: "Coarse 2.jpeg" },
  { slug: "dairy-salt", folder: "Food Grade Salt/Dairy Products", preferred: "Cheese.jpg" },
  { slug: "washed-iodized-salt", folder: "Food Grade Salt/Washed Iodized Salt", preferred: "washed salt.PNG" },
  { slug: "flavored-salt", folder: "Food Grade Salt/Flavored Salt", preferred: "flavored-salt1.jpg" },
  { slug: "pdv-salt-textile-dyeing", folder: "Industrial Sea Salt/PDV Salt for Textile", preferred: "6356055218871.jpg" },
  { slug: "fine-refined-salt-textile-dyeing", folder: "Industrial Sea Salt/Fine Refined Salt for Textile Dyeing", preferred: "img.jpg" },
  { slug: "washed-industrial-salt", folder: "Industrial Sea Salt/Washed Salt", preferred: "Washed.jpeg" },
  { slug: "raw-sea-salt", folder: "Industrial Sea Salt/raw salt", preferred: "salt102714-800x500.jpg" },
  { slug: "cosmetic-salt", folder: "Industrial Sea Salt/Cosmetics Salt", preferred: "Bath Relax Salt.jpg" },
  { slug: "epsom-salt", folder: "Industrial Sea Salt/Epsom Salt", preferred: "img.jpg" },
  { slug: "sodium-sulphate", folder: "Industrial Sea Salt/Sodium Sulphate", preferred: "Sodium.jpg" },
  { slug: "petrochemicals-salt", folder: "Industrial Sea Salt/Petrochemicals", preferred: "6355997824289.jpg" },
  { slug: "dishwasher-salt", folder: "Industrial Sea Salt/Dishwasher Salt", preferred: "geschirrspuelsalz.jpg" },
  { slug: "pdv-salt-tablets", folder: "Water Softening/PDV Salt Tablets", preferred: "pdv.jpeg" },
  { slug: "refined-sodium-chloride-tablets", folder: "Water Softening/Refined Sodium Chloride Tablets", preferred: "sodium chloride tablets.jpeg" },
  { slug: "crushed-water-treatment-salt", folder: "Water Softening/Crushed Salt" },
  { slug: "water-softening-salt-blocks", folder: "Water Softening/Salt Blocks", preferred: "salt blocks.jpg" },
  { slug: "raw-de-icing-salt", folder: "De Icing salt/Raw Salt" },
  { slug: "washed-de-icing-salt", folder: "De Icing salt/Washed Salt" },
  { slug: "road-salt", folder: "De Icing salt/Road Salt" },
  { slug: "crushed-raw-sea-salt", folder: "De Icing salt/Crushed Raw Salt", preferred: "rock salt.jpg" },
  { slug: "crushed-washed-sea-salt", folder: "De Icing salt/Crushed Washed Salt", preferred: "6355999202619gal.jpg" },
  { slug: "pdv-pharma-salt", folder: "Pharma Salt/PDV Salt", preferred: "pharma salt.jpg" },
  { slug: "sodium-chloride-pharmaceutical-salt", folder: "Pharma Salt/Sodium Chloride Pharmaceutical Salt", preferred: "pharma salt.jpg" },
  { slug: "sodium-chloride-high-purity", folder: "Pharma Salt/Sodium Chloride High Purity", preferred: "pharmaceutical.jpg" },
  { slug: "powder-salt-animal-feed", folder: "Animal feed salt", preferred: "animal nutrition.jpg" },
];

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const projectRoot = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.resolve(process.argv[2] ?? "");
const outputRoot = path.resolve(projectRoot, "public/images/products/catalog");
const dataFile = path.resolve(projectRoot, "src/data/product-images.ts");

if (!process.argv[2]) throw new Error("Pass the source Products folder as the first argument.");
if (!outputRoot.startsWith(`${projectRoot}${path.sep}`)) throw new Error("Unsafe product asset output path.");
await fs.access(sourceRoot);

function safeStem(filename) {
  return path.basename(filename, path.extname(filename))
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 64) || "product-image";
}

function titleFromFilename(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(outputRoot, { recursive: true });

const productImages = {};
for (const product of productFolders) {
  const sourceFolder = path.resolve(sourceRoot, product.folder);
  if (!sourceFolder.startsWith(`${sourceRoot}${path.sep}`)) throw new Error(`Unsafe source folder: ${product.folder}`);

  const entries = (await fs.readdir(sourceFolder, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => {
      if (a === product.preferred) return -1;
      if (b === product.preferred) return 1;
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    });

  if (entries.length === 0) throw new Error(`No product images found in ${product.folder}`);

  const productOutput = path.join(outputRoot, product.slug);
  await fs.mkdir(productOutput, { recursive: true });
  productImages[product.slug] = [];

  for (const [index, filename] of entries.entries()) {
    const input = path.join(sourceFolder, filename);
    const sourceData = await fs.readFile(input);
    const hash = crypto.createHash("sha256").update(sourceData).digest("hex").slice(0, 10);
    const outputName = `${String(index + 1).padStart(3, "0")}-${safeStem(filename)}-${hash}.webp`;
    const output = path.join(productOutput, outputName);
    const image = sharp(sourceData, { failOn: "none" }).rotate();
    const metadata = await image.metadata();
    await image
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(output);
    const outputMetadata = await sharp(output).metadata();
    productImages[product.slug].push({
      url: `/images/products/catalog/${product.slug}/${outputName}`,
      alt: `${product.slug.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")} - ${titleFromFilename(filename)}`,
      width: outputMetadata.width ?? metadata.width ?? 1,
      height: outputMetadata.height ?? metadata.height ?? 1,
    });
  }

  console.log(`${product.slug}: ${entries.length} images`);
}

const generated = `export type ProductImage = {\n  url: string;\n  alt: string;\n  width: number;\n  height: number;\n};\n\nexport const productImages: Record<string, ProductImage[]> = ${JSON.stringify(productImages, null, 2)};\n`;
await fs.writeFile(dataFile, generated, "utf8");
console.log(`Generated ${dataFile}`);
