import { productImages, type ProductImage } from "./product-images";

export const productCategories = [
  "Food Grade Salt", "Industrial Sea Salt", "Water Softening",
  "De-Icing", "Pharma Salt", "Animal Salt",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export type CatalogProduct = {
  slug: string;
  sourceFolder: string;
  category: ProductCategory;
  name: string;
  shortDescription: string;
  description: string[];
  applications: string[];
  image: ProductImage;
  images: ProductImage[];
};

type ProductDefinition = Omit<CatalogProduct, "image" | "images">;

const productDefinitions: ProductDefinition[] = [
  {
    slug: "pure-dried-vacuum-salt", sourceFolder: "Food Grade Salt/Pure Dried Vacuum Salt", category: "Food Grade Salt",
    name: "Pure Dried Vacuum Salt",
    shortDescription: "High-purity, fine food-grade salt for food production and precision applications.",
    description: ["Pure dried vacuum salt is a very clean, high-purity salt used in food production and other applications requiring a fine, controlled food-grade salt.", "It is suited to soups, sauces, dressings, marinades, dairy products, meat products, canned food, and ready-made meals."],
    applications: ["Soups and sauces", "Dressings and marinades", "Dairy products", "Meat and prepared foods"],
  },
  {
    slug: "fine-refined-iodized-salt", sourceFolder: "Food Grade Salt/Fine Refined Iodized Salt", category: "Food Grade Salt",
    name: "Fine Refined Iodized Salt",
    shortDescription: "Fine, free-flowing iodized table salt for cooking, seasoning, and food processing.",
    description: ["Fine refined iodized salt is prepared for table use and a wide variety of cooking and food-processing requirements.", "Its fine crystal size suits seasoning, preservation, sauces, dairy products, canned foods, snacks, and other processed foods."],
    applications: ["Table and cooking salt", "Food processing", "Food preservation", "Seasoning and flavoring"],
  },
  {
    slug: "coarse-refined-iodized-salt", sourceFolder: "Food Grade Salt/Coarse Refined Salt (Kithchen Salt)", category: "Food Grade Salt",
    name: "Coarse Refined Iodized Salt",
    shortDescription: "Coarse iodized table salt for cooking, food processing, brining, and preservation.",
    description: ["Coarse refined iodized salt combines larger crystals with iodine and a free-flowing format for food and cooking requirements.", "It can be used in food preparation, pickling, preservation, dairy products, sauces, canned foods, snacks, and other processed foods."],
    applications: ["Cooking", "Pickling and brining", "Food preservation", "Processed foods"],
  },
  {
    slug: "dairy-salt", sourceFolder: "Food Grade Salt/Dairy Products", category: "Food Grade Salt",
    name: "Dairy Salt",
    shortDescription: "High-purity, fine-grained salt for cheese, butter, margarine, and dairy processing.",
    description: ["Dairy salt is a fine, high-purity sodium chloride used in the production of cheese, butter, and margarine.", "Its fine grain dissolves quickly and supports flavor, moisture control, and the management of bacterial growth during dairy processing."],
    applications: ["Cheese production", "Butter and margarine", "Dairy processing", "Flavor and moisture control"],
  },
  {
    slug: "washed-iodized-salt", sourceFolder: "Food Grade Salt/Washed Iodized Salt", category: "Food Grade Salt",
    name: "Washed Iodized Salt",
    shortDescription: "Washed sea salt with iodine, low insoluble impurities, and selectable crystal sizes.",
    description: ["Washed iodized salt is produced from sea salt and washed to reduce insoluble impurities.", "It is supplied as clean white crystals in different sizes for food-industry requirements and customer specifications."],
    applications: ["Food processing", "Iodized salt products", "Cooking and seasoning", "Selected crystal sizes"],
  },
  {
    slug: "flavored-salt", sourceFolder: "Food Grade Salt/Flavored Salt", category: "Food Grade Salt",
    name: "Flavored Salt",
    shortDescription: "Salt blended with natural herbs, spices, vegetables, fruits, or flavor oils.",
    description: ["Flavored salt combines saltiness with a distinctive flavor by blending salt with herbs, spices, vegetables, fruits, smoke flavors, or other natural flavorings.", "Available concepts include lemon, onion, garlic, and celery salt for fish, salads, meats, fruits, vegetables, and everyday meals."],
    applications: ["Fish and seafood", "Salads and vegetables", "Meat dishes", "Seasoning blends"],
  },
  {
    slug: "pdv-salt-textile-dyeing", sourceFolder: "Industrial Sea Salt/PDV Salt for Textile", category: "Industrial Sea Salt",
    name: "PDV Salt for Textile Dyeing",
    shortDescription: "Pure dried vacuum salt used as a dye enhancer in textile processing and printing.",
    description: ["PDV salt is used in textile manufacturing, processing, and finishing as a dye enhancer for fabrics and materials.", "It helps color penetrate the fabric, bind effectively, and remain consistent through cotton dyeing and textile-printing processes."],
    applications: ["Cotton dyeing", "Textile printing", "Fabric processing", "Dye enhancement"],
  },
  {
    slug: "fine-refined-salt-textile-dyeing", sourceFolder: "Industrial Sea Salt/Fine Refined Salt for Textile Dyeing", category: "Industrial Sea Salt",
    name: "Fine Refined Salt for Textile Dyeing",
    shortDescription: "Fine refined salt that supports dye fixation and consistent textile coloration.",
    description: ["Fine refined salt is used in textile dyeing to support the bond between dye molecules and fibers.", "It helps hold dye in place and supports permanent, colorfast results in controlled dyeing processes."],
    applications: ["Textile dyeing", "Dye fixation", "Fabric coloration", "Colorfast processing"],
  },
  {
    slug: "washed-industrial-salt", sourceFolder: "Industrial Sea Salt/Washed Salt", category: "Industrial Sea Salt",
    name: "Washed Industrial Salt",
    shortDescription: "Washed sea salt for detergents, solvents, soap, chemical processing, and solar ponds.",
    description: ["Washed industrial salt is used as a process material and filler in detergent, solvent, and soap production.", "It is also supplied for chemical processes and for maintaining salinity in solar ponds and other energy-producing facilities."],
    applications: ["Detergents and solvents", "Soap production", "Chemical processing", "Solar ponds"],
  },
  {
    slug: "raw-sea-salt", sourceFolder: "Industrial Sea Salt/raw salt", category: "Industrial Sea Salt",
    name: "Raw Sea Salt",
    shortDescription: "Naturally evaporated sea salt for chemical and high-volume industrial processing.",
    description: ["Raw sea salt is produced through the natural evaporation of seawater, with washing used to prepare a cleaner industrial raw material.", "It is supplied for caustic soda, textile dyes, detergents, soda ash, glass, soap, petrochemical, and general chemical production."],
    applications: ["Caustic soda", "Detergents and soap", "Glass and soda ash", "Petrochemical plants"],
  },
  {
    slug: "cosmetic-salt", sourceFolder: "Industrial Sea Salt/Cosmetics Salt", category: "Industrial Sea Salt",
    name: "Cosmetic Salt",
    shortDescription: "Salt for bath, spa, exfoliation, and personal-care formulations.",
    description: ["Cosmetic salt is used in personal-care products and cosmetic formulations where mineral texture and controlled salt content are required.", "Common uses include bath products, spa treatments, exfoliating products, and wellness formulations."],
    applications: ["Bath products", "Spa treatments", "Exfoliation", "Personal-care formulations"],
  },
  {
    slug: "epsom-salt", sourceFolder: "Industrial Sea Salt/Epsom Salt", category: "Industrial Sea Salt",
    name: "Epsom Salt",
    shortDescription: "Magnesium sulphate heptahydrate for plant nutrition and soil-conditioning uses.",
    description: ["Epsom salt is magnesium sulphate heptahydrate (MgSO4·7H2O), recovered and purified through dissolution, crystallization, evaporation, and cooling.", "It is used in plant nutrition and as a soil conditioner, particularly in vegetable and fruit cultivation."],
    applications: ["Plant nutrition", "Soil conditioning", "Vegetable cultivation", "Fruit cultivation"],
  },
  {
    slug: "sodium-sulphate", sourceFolder: "Industrial Sea Salt/Sodium Sulphate", category: "Industrial Sea Salt",
    name: "Sodium Sulphate",
    shortDescription: "Sodium sulphate for detergents, glass, textiles, paper, medical, feed, and fertilizer uses.",
    description: ["Sodium sulphate (Na2SO4) is used across detergents, glass, textile dyeing, paper, medical industries, animal feed, and compound fertilizers.", "The supplied product documentation identifies controlled limits for heavy metals, iron, and rare metals."],
    applications: ["Detergents", "Glass and paper", "Textile dyeing", "Animal feed and fertilizers"],
  },
  {
    slug: "petrochemicals-salt", sourceFolder: "Industrial Sea Salt/Petrochemicals", category: "Industrial Sea Salt",
    name: "Petrochemicals Salt",
    shortDescription: "Industrial salt for drilling muds and petrochemical extraction operations.",
    description: ["Petrochemicals salt is used as a basic material in drilling operations for crude oil, natural gas, and other natural resources.", "Rock or vacuum salt can be selected in different grades to meet the specific requirements of drilling-mud systems and related processes."],
    applications: ["Drilling muds", "Crude-oil extraction", "Natural-gas drilling", "Petrochemical processing"],
  },
  {
    slug: "dishwasher-salt", sourceFolder: "Industrial Sea Salt/Dishwasher Salt", category: "Industrial Sea Salt",
    name: "Dishwasher Salt",
    shortDescription: "Compacted vacuum salt for dishwasher ion-exchange and water-softening systems.",
    description: ["Dishwasher salt, also called regeneration salt, is added to the appliance reservoir so its ion exchanger can soften incoming water.", "It supports cleaning efficiency and protects the dishwasher against calcium deposits."],
    applications: ["Dishwasher water softening", "Ion-exchange regeneration", "Calcium-deposit control", "Cleaning performance"],
  },
  {
    slug: "pdv-salt-tablets", sourceFolder: "Water Softening/PDV Salt Tablets", category: "Water Softening",
    name: "Pure Dried Vacuum Salt Tablets",
    shortDescription: "High-purity salt tablets for industrial and domestic water-softening systems.",
    description: ["Pure dried vacuum salt tablets remove hardness-causing ions through water-softening systems used in commercial, institutional, industrial, and household settings.", "They support treatment-unit and boiler efficiency while helping prevent caking, crust deposits, and service interruptions."],
    applications: ["Industrial water softening", "Domestic water softening", "Treatment units", "Boiler systems"],
  },
  {
    slug: "refined-sodium-chloride-tablets", sourceFolder: "Water Softening/Refined Sodium Chloride Tablets", category: "Water Softening",
    name: "Refined Sodium Chloride Tablets",
    shortDescription: "Refined salt tablets for hygienic ion-exchange water softening.",
    description: ["Refined sodium chloride tablets regenerate ion-exchange systems that remove calcium and magnesium from hard water.", "They are designed for industrial and household treatment units and help prevent caking, crust deposits, and avoidable interruptions."],
    applications: ["Ion exchange", "Industrial water softening", "Household systems", "Boiler treatment"],
  },
  {
    slug: "crushed-water-treatment-salt", sourceFolder: "Water Softening/Crushed Salt", category: "Water Softening",
    name: "Crushed Salt for Water Treatment",
    shortDescription: "Crushed salt for industrial water-treatment and purification processes.",
    description: ["Crushed salt is supplied for water-treatment processes that reduce contaminants and prepare water for drinking, industrial, medical, or environmental end uses.", "Its crushed format supports controlled dissolution in purification and treatment systems."],
    applications: ["Water treatment", "Industrial purification", "Process-water preparation", "Controlled dissolution"],
  },
  {
    slug: "water-softening-salt-blocks", sourceFolder: "Water Softening/Salt Blocks", category: "Water Softening",
    name: "Salt Blocks for Water Softening",
    shortDescription: "Compressed high-purity sodium chloride blocks for domestic and commercial softeners.",
    description: ["Water-softener salt blocks are highly compressed, high-purity sodium chloride blocks for domestic and commercial systems.", "They regenerate ion-exchange resin so it can continue removing hardness-causing calcium and magnesium from water."],
    applications: ["Domestic water softeners", "Commercial water softeners", "Ion-exchange regeneration", "Hardness removal"],
  },
  {
    slug: "raw-de-icing-salt", sourceFolder: "De Icing salt/Raw Salt", category: "De-Icing",
    name: "Raw De-Icing Salt",
    shortDescription: "Raw salt that lowers water’s freezing point to melt snow and ice.",
    description: ["Raw de-icing salt reduces the freezing point of water and supports the melting of snow and ice on highways, roads, and other treated surfaces.", "It is supplied for high-volume winter-maintenance and ice-management operations."],
    applications: ["Highways", "Roads", "Snow melting", "Winter maintenance"],
  },
  {
    slug: "washed-de-icing-salt", sourceFolder: "De Icing salt/Washed Salt", category: "De-Icing",
    name: "Washed De-Icing Salt",
    shortDescription: "Washed salt for road, highway, and winter ice-management requirements.",
    description: ["Washed de-icing salt lowers water’s freezing point and helps melt snow and ice on roads and highways.", "The washed grade provides a cleaner de-icing material for customer-specific winter-maintenance requirements."],
    applications: ["Road de-icing", "Highway maintenance", "Snow and ice melting", "Winter operations"],
  },
  {
    slug: "road-salt", sourceFolder: "De Icing salt/Road Salt", category: "De-Icing",
    name: "Road Salt",
    shortDescription: "Industrial rock salt in customer-specific grain sizes for road treatment.",
    description: ["Road salt is an industrial rock-salt product offered in a broad range of granulations and grain sizes.", "The selected grading can be tailored to customer requirements and the intended road-treatment operation."],
    applications: ["Road treatment", "Winter road safety", "Selected granulation", "Ice management"],
  },
  {
    slug: "crushed-raw-sea-salt", sourceFolder: "De Icing salt/Crushed Raw Salt", category: "De-Icing",
    name: "Crushed Raw Sea Salt",
    shortDescription: "Mixed fine and coarse sea-salt crystals for immediate and lasting de-icing.",
    description: ["Crushed raw sea salt combines fine and coarse crystals for de-icing operations.", "Fine crystals initiate a rapid effect while coarser crystals provide a longer-lasting response across thicker ice and snow layers."],
    applications: ["Rapid de-icing", "Long-duration ice control", "Thick snow layers", "Road treatment"],
  },
  {
    slug: "crushed-washed-sea-salt", sourceFolder: "De Icing salt/Crushed Washed Salt", category: "De-Icing",
    name: "Crushed Washed Sea Salt",
    shortDescription: "Purified crushed sea salt with selectable grain sizes for de-icing.",
    description: ["Crushed washed sea salt is a cleaner de-icing grade than crushed raw salt.", "Its grain-size profile can be selected to match the intended snow, ice, and surface-treatment requirements."],
    applications: ["Road de-icing", "Snow and ice control", "Cleaner de-icing grade", "Selected grain sizes"],
  },
  {
    slug: "pdv-pharma-salt", sourceFolder: "Pharma Salt/PDV Salt", category: "Pharma Salt",
    name: "Pure Dried Vacuum Pharma Salt",
    shortDescription: "High-purity vacuum salt without additives for pharmaceutical and medical uses.",
    description: ["Pure dried vacuum pharma salt is a high-purity material used in pharmaceutical, medical, dietetic-food, cosmetic, care, and wellness production.", "The supplied grade is produced without additives for applications requiring controlled, clean sodium chloride, including haemodialysis-related production."],
    applications: ["Pharmaceutical production", "Medical products", "Haemodialysis applications", "Care and wellness products"],
  },
  {
    slug: "sodium-chloride-pharmaceutical-salt", sourceFolder: "Pharma Salt/Sodium Chloride Pharmaceutical Salt", category: "Pharma Salt",
    name: "Sodium Chloride Pharmaceutical Salt",
    shortDescription: "Pharmaceutical sodium chloride for infusion solutions and specialist formulations.",
    description: ["Omega sodium chloride is supplied as a pharmaceutical salt for use with active pharmaceutical agents.", "It is suited to the manufacture of enteral and parenteral infusion solutions and other controlled pharmaceutical applications."],
    applications: ["Enteral solutions", "Parenteral solutions", "Pharmaceutical formulations", "Medical production"],
  },
  {
    slug: "sodium-chloride-high-purity", sourceFolder: "Pharma Salt/Sodium Chloride High Purity", category: "Pharma Salt",
    name: "High-Purity Sodium Chloride",
    shortDescription: "High-purity sodium chloride for pharmaceutical and medical-industry applications.",
    description: ["High-purity sodium chloride is supplied as a basic material for pharmaceutical and medical-industry requirements.", "It supports drug-salt and specialist formulation work where controlled sodium chloride quality is required."],
    applications: ["Pharmaceutical production", "Drug-salt formulations", "Medical applications", "Specialist chemical use"],
  },
  {
    slug: "powder-salt-animal-feed", sourceFolder: "Animal feed salt", category: "Animal Salt",
    name: "Powder Salt for Animal Feed",
    shortDescription: "Feed-grade powder salt for livestock nutrition, feed mixes, and sodium balance.",
    description: ["Powder animal-feed salt is used as a raw material in industrial feed mixes or as a ready-to-use nutritional supplement in breeding.", "It helps balance sodium where common fodder plants provide insufficient levels and supports digestion, physical development, and animal well-being."],
    applications: ["Industrial feed mixes", "Livestock nutrition", "Sodium supplementation", "Breeding animals"],
  },
];

export const products: CatalogProduct[] = productDefinitions.map((product) => {
  const images = productImages[product.slug];
  if (!images?.length) throw new Error(`Missing images for ${product.name}`);
  return { ...product, image: images[0], images };
});

export function getProduct(slug: string): CatalogProduct | null {
  return products.find((product) => product.slug === slug) ?? null;
}
