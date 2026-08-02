import type { Locale } from "@/i18n/routing";

export type ProfileIndustry = {
  title: string;
  description: string;
};

export type PackagingOption = {
  title: string;
  description: string;
};

export type HomepageProfileContent = {
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  trustIndicators: string[];
  capabilitiesLabel: string;
  welcomeEyebrow: string;
  welcomeHeading: string;
  welcomeParagraphs: string[];
  welcomeQuote: string;
  welcomeHighlights: Array<{ title: string; description: string }>;
  welcomeMarketsHeading: string;
  welcomeMarkets: string[];
  welcomeLegacyNote: string;
  aboutEyebrow: string;
  aboutHeading: string;
  aboutDescription: string;
  aboutStrengths: string[];
  aboutButtonLabel: string;
  missionEyebrow: string;
  missionLabel: string;
  missionHeading: string;
  missionDescription: string;
  missionPoints: string[];
  visionHeading: string;
  visionDescription: string;
  visionPoints: string[];
  productsEyebrow: string;
  productsHeading: string;
  productsDescription: string;
  categoriesEmpty: string;
  industriesEyebrow: string;
  industriesHeading: string;
  industriesDescription: string;
  industries: ProfileIndustry[];
  qualityEyebrow: string;
  qualityHeading: string;
  qualityDescription: string;
  qualityBenefits: string[];
  certificatesAction: string;
  certificatesNote: string;
  packagingEyebrow: string;
  packagingHeading: string;
  packagingDescription: string;
  packagingOptions: PackagingOption[];
  shippingEyebrow: string;
  shippingHeading: string;
  shippingDescription: string;
  shippingSteps: Array<{ title: string; description: string }>;
  specificationEyebrow: string;
  specificationHeading: string;
  specificationDescription: string;
  specificationPoints: string[];
  galleryEyebrow: string;
  galleryHeading: string;
  galleryDescription: string;
  galleryAction: string;
  finalCtaHeading: string;
  finalCtaDescription: string;
  finalCtaAction: string;
  seoTitle: string;
  seoDescription: string;
};

const en: HomepageProfileContent = {
  heroEyebrow: "Omega Line Egypt",
  heroHeading: "Omega Lines",
  heroDescription: "Egyptian salt. Ready for the world.",
  primaryCtaLabel: "Explore Products",
  secondaryCtaLabel: "Request a Specification Quote",
  trustIndicators: [
    "Over two decades of salt expertise",
    "Manufacturing, packaging and export",
    "Custom granulation and packaging",
    "Food, industrial and specialized uses",
  ],
  capabilitiesLabel: "Omega Line Egypt capabilities",
  welcomeEyebrow: "Welcome to Omega Lines",
  welcomeHeading: "Built on Salt. Growing With the World.",
  welcomeParagraphs: [
    "Professional and skilled staff have supported Omega Line Egypt’s success and expansion over many years. Continued demand from African buyers helped make salt supply the company’s central focus.",
    "Omega Line Egypt supplies raw materials for processing factories as well as finished salt products. The company’s original Dolphin trademark is distributed for edible iodized salt and the food-industry sector, while products carrying customers’ own logos have also been supplied on a regular basis.",
    "Prompt service, quality and an affordable price are presented as the company’s competitive foundation. The business describes established relationships across Europe, Africa, the Middle East and the Far East, with China identified as a leading buyer in that expansion.",
    "The document describes salt as an industry that supports Egypt’s economy and as a mineral product with many uses that became the company’s main export line. It also records overseas growth, international business connections and plans to create branches abroad.",
    "Malta and Bahrain are identified as markets for water-softening salt pellets. The document also highlights raw salt supplied to processors, where material quality can improve processing results and create savings for factories.",
  ],
  welcomeQuote: "High quality and good service with an affordable price.",
  welcomeHighlights: [
    { title: "Dolphin trademark", description: "Omega Line Egypt’s original salt trademark, distributed for edible iodized salt and the food-industry sector." },
    { title: "Raw and finished supply", description: "Raw salt for processing factories alongside finished salt products for connected markets." },
    { title: "Customer branding", description: "Other trademarks using customers’ logos have been produced and supplied on a regular basis." },
    { title: "Service promise", description: "High quality, good service and an affordable price form the stated competitive position." },
  ],
  welcomeMarketsHeading: "Markets named in the welcome document",
  welcomeMarkets: ["Cameroon", "Côte d’Ivoire", "Equatorial Guinea", "Mauritius", "Angola", "Congo", "Togo", "Ghana", "Nigeria", "Senegal", "Burundi", "Netherlands", "Germany", "Turkey", "Ethiopia", "Sudan", "Morocco", "Syria", "Lebanon", "Malta", "Bahrain", "China"],
  welcomeLegacyNote: "The welcome document records ISO 9001:2008 for export of salt and quality management systems, and ISO 22000:2005 for food safety management systems. Newer certificate documents are presented on the About Us page.",
  aboutEyebrow: "About Omega Line Egypt",
  aboutHeading: "A Trusted Egyptian Salt Partner for Global Industries",
  aboutDescription:
    "Omega Line Egypt manufactures, packages and exports a broad range of salt products. Our work is built around disciplined management, consistent quality, modern packaging and professional supervision to meet required chemical specifications and customer expectations in local and international markets.",
  aboutStrengths: [
    "Customer-specific chemical specifications",
    "Different granulations and packaging formats",
    "Quality control from extraction to delivery",
    "Export support for international markets",
  ],
  aboutButtonLabel: "Discover Our Company",
  missionEyebrow: "Purpose and direction",
  missionLabel: "Our Mission",
  missionHeading: "Quality Salt, Reliable Service and Long-Term Partnership",
  missionDescription:
    "Omega Line Egypt puts more than twenty years of salt-industry know-how at the service of customers that require dependable products, processes and delivery.",
  missionPoints: [
    "Supply natural salt in the purity and granulation required for its intended use.",
    "Provide packaging formats suited to industrial handling, distribution and retail markets.",
    "Understand each customer's product, quality and process requirements.",
  ],
  visionHeading: "Our Vision",
  visionDescription:
    "To extend Omega Line Egypt's reach worldwide, become a preferred supplier, grow in new markets and strengthen the company's position across Africa and international salt markets.",
  visionPoints: [
    "Offer excellent service and high-purity products.",
    "Develop market positions through products and services.",
    "Build durable relationships across new regions.",
  ],
  productsEyebrow: "Salt solutions",
  productsHeading: "Products Organized Around Real Applications",
  productsDescription:
    "Explore food-grade, industrial, water-softening, de-icing, pharmaceutical and animal-feed salt categories, then filter by the exact subcategory your operation requires.",
  categoriesEmpty: "Product categories are being prepared. Please contact our team for the right salt solution.",
  industriesEyebrow: "Where our salt is used",
  industriesHeading: "One Natural Mineral. Many Essential Applications.",
  industriesDescription:
    "Omega Line Egypt supplies salt for food production, chemical processes, water treatment, livestock, winter safety and other specialized requirements.",
  industries: [
    {
      title: "Food and culinary",
      description:
        "Table and cooking salt for processing, preservation, dairy, cheese, frozen food, meat, fish, vegetables, snacks, sauces and pickles.",
    },
    {
      title: "Industrial and chemical",
      description:
        "Salt for textile dyeing, petrochemicals, sodium sulphate, caustic soda and chlorine, soda ash, leather tanning and drilling.",
    },
    {
      title: "Water treatment",
      description:
        "Salt pellets and other formats for water softening, treatment units, swimming pools and hardness-ion removal.",
    },
    {
      title: "Roads and airports",
      description:
        "De-icing salt used to lower water's freezing point and support snow and ice removal on roads and airport surfaces.",
    },
    {
      title: "Animal feed",
      description:
        "Salt supplied for animal-feed formulations and other livestock-related applications.",
    },
    {
      title: "Pharma and household",
      description:
        "High-purity and specialized salt for pharmaceutical, household, culinary and customer-defined requirements.",
    },
  ],
  qualityEyebrow: "Quality from source to shipment",
  qualityHeading: "Quality Is Built Into Every Stage",
  qualityDescription:
    "The company profile places quality at the center of operations - from the earliest point of salt extraction through preparation, packaging and on-time delivery.",
  qualityBenefits: [
    "Quality control begins at extraction and continues through customer delivery.",
    "Total Quality Management and Quality Assurance guide production activities.",
    "Products are prepared to required chemical and standard specifications.",
    "Professional supervision supports consistent purity, granulation and packaging.",
    "Food and industrial grades are matched to their intended applications.",
    "Current technical documents and certificate copies are available on request.",
  ],
  certificatesAction: "View Quality Documents",
  certificatesNote:
    "Certificate images are presented from the company profile for reference. Ask our team for the latest valid copies and product-specific documentation.",
  packagingEyebrow: "Flexible packaging",
  packagingHeading: "Packaging Built Around Your Supply Chain",
  packagingDescription:
    "From high-volume industrial supply to consumer-ready packs, Omega Line Egypt prepares salt in formats suited to handling, storage, distribution and destination-market requirements.",
  packagingOptions: [
    {
      title: "Bulk supply",
      description: "For high-volume industrial processing and large-scale handling requirements.",
    },
    {
      title: "1-ton jumbo bags",
      description: "Efficient handling for factories, warehouses and export shipments.",
    },
    {
      title: "25 kg industrial bags",
      description: "A practical format for food processors, distributors and industrial users.",
    },
    {
      title: "1 kg and 500 g retail bags",
      description: "Consumer-ready formats for refined, coarse and vacuum salt products.",
    },
  ],
  shippingEyebrow: "Export and logistics",
  shippingHeading: "Prepared for International Shipping",
  shippingDescription:
    "Omega Line Egypt supports bulk and packaged shipments through containers and vessels, selecting the loading format around the product, packaging, destination and customer requirements.",
  shippingSteps: [
    {
      title: "Specify",
      description: "Confirm salt type, purity, granulation, application, quantity and destination.",
    },
    {
      title: "Pack and load",
      description: "Prepare bulk, jumbo, bagged or carton formats for safe handling and transport.",
    },
    {
      title: "Ship",
      description: "Coordinate containerized cargo or vessel freight for the agreed export route.",
    },
  ],
  specificationEyebrow: "Made for your operation",
  specificationHeading: "Salt Prepared to Your Specification",
  specificationDescription:
    "Tell us what you are going to use the salt for. Share the required type, purity, granulation, application, destination and packaging format, and our team can prepare the right supply proposal.",
  specificationPoints: [
    "Salt type and intended application",
    "Purity and chemical specification",
    "Crystal size or granulation",
    "Packaging, quantity and destination",
  ],
  galleryEyebrow: "Inside Omega Line Egypt",
  galleryHeading: "Products, Packaging and Export Operations",
  galleryDescription:
    "Explore real views of salt products, packaging formats, loading operations and company quality documents.",
  galleryAction: "View Full Gallery",
  finalCtaHeading: "Tell Us What You Need Salt For",
  finalCtaDescription:
    "Send your technical and commercial requirements to Omega Line Egypt and start a focused conversation about the right salt, specification and packaging for your market.",
  finalCtaAction: "Request a Quote",
  seoTitle: "Omega Line Egypt | Salt Manufacturing, Packaging and Export",
  seoDescription:
    "Omega Line Egypt manufactures, packages and exports salt for food, industrial, water-treatment, de-icing, pharmaceutical, animal-feed and specialized applications.",
};

const fr: HomepageProfileContent = {
  ...en,
  heroEyebrow: "Omega Line Egypt",
  heroHeading: "Omega Lines",
  heroDescription: "Le sel égyptien. Prêt pour le monde.",
  primaryCtaLabel: "Découvrir les produits",
  secondaryCtaLabel: "Demander un devis technique",
  trustIndicators: [
    "Plus de vingt ans d'expertise",
    "Fabrication, conditionnement et export",
    "Granulométrie et emballage sur mesure",
    "Usages alimentaires, industriels et spécialisés",
  ],
  capabilitiesLabel: "Capacités d'Omega Line Egypt",
  welcomeEyebrow: "Bienvenue chez Omega Lines",
  welcomeHeading: "Fondée sur le sel. En croissance avec le monde.",
  welcomeParagraphs: [
    "Un personnel professionnel et qualifié soutient depuis de nombreuses années la réussite et l’expansion d’Omega Line Egypt. La demande continue des acheteurs africains a placé l’approvisionnement en sel au centre de l’activité.",
    "Omega Line Egypt fournit des matières premières aux usines de transformation ainsi que des produits finis. La marque originale Dolphin est distribuée pour le sel iodé alimentaire et le secteur agroalimentaire, tandis que des produits portant les logos des clients sont également fournis régulièrement.",
    "La rapidité du service, la qualité et un prix abordable constituent le positionnement concurrentiel déclaré. L’entreprise décrit des relations établies en Europe, en Afrique, au Moyen-Orient et en Extrême-Orient, avec la Chine comme acheteur majeur de cette expansion.",
    "Le document présente le sel comme une industrie qui soutient l’économie égyptienne et comme un produit minéral aux nombreux usages devenu la principale ligne d’exportation de l’entreprise. Il mentionne également la croissance internationale, les relations commerciales mondiales et la création de succursales à l’étranger.",
    "Malte et Bahreïn sont identifiés comme marchés pour les pastilles de sel d’adoucissement de l’eau. Le document souligne aussi l’approvisionnement des transformateurs en sel brut, dont la qualité peut améliorer les résultats de traitement et générer des économies.",
  ],
  welcomeQuote: "Haute qualité, bon service et prix abordable.",
  welcomeHighlights: [
    { title: "Marque Dolphin", description: "La marque originale de sel d’Omega Line Egypt, distribuée pour le sel iodé alimentaire et le secteur agroalimentaire." },
    { title: "Matières premières et produits finis", description: "Sel brut pour les usines de transformation et produits finis pour les marchés connectés." },
    { title: "Marques clients", description: "Des produits portant les logos des clients sont fabriqués et fournis régulièrement." },
    { title: "Promesse de service", description: "Haute qualité, bon service et prix abordable constituent le positionnement déclaré." },
  ],
  welcomeMarketsHeading: "Marchés cités dans le document Welcome",
  welcomeMarkets: en.welcomeMarkets,
  welcomeLegacyNote: "Le document Welcome mentionne ISO 9001:2008 pour l’exportation du sel et les systèmes de management de la qualité, ainsi qu’ISO 22000:2005 pour les systèmes de management de la sécurité alimentaire. Des certificats plus récents figurent sur la page À propos.",
  aboutEyebrow: "À propos d'Omega Line Egypt",
  aboutHeading: "Un partenaire égyptien fiable pour les industries mondiales",
  aboutDescription:
    "Omega Line Egypt fabrique, conditionne et exporte une large gamme de sels. Notre travail repose sur une gestion rigoureuse, une qualité constante, des emballages modernes et une supervision professionnelle afin de répondre aux spécifications chimiques et aux attentes des clients.",
  aboutStrengths: [
    "Spécifications chimiques selon le client",
    "Différentes granulométries et formats",
    "Contrôle qualité de l'extraction à la livraison",
    "Accompagnement des marchés d'exportation",
  ],
  aboutButtonLabel: "Découvrir notre entreprise",
  missionEyebrow: "Mission et orientation",
  missionLabel: "Notre mission",
  missionHeading: "Qualité, service fiable et partenariat durable",
  missionDescription:
    "Omega Line Egypt met plus de vingt ans de savoir-faire au service des clients qui exigent des produits, des procédés et des livraisons fiables.",
  missionPoints: [
    "Fournir un sel naturel avec la pureté et la granulométrie requises.",
    "Proposer des emballages adaptés à l'industrie, à la distribution et au détail.",
    "Comprendre les exigences de produit, de qualité et de procédé de chaque client.",
  ],
  visionHeading: "Notre vision",
  visionDescription:
    "Étendre la présence d'Omega Line Egypt dans le monde, devenir un fournisseur privilégié, accéder à de nouveaux marchés et renforcer sa position en Afrique et à l'international.",
  visionPoints: [
    "Offrir un excellent service et des produits de haute pureté.",
    "Développer nos marchés grâce aux produits et services.",
    "Construire des relations durables dans de nouvelles régions.",
  ],
  productsEyebrow: "Solutions de sel",
  productsHeading: "Des produits organisés selon les applications réelles",
  productsDescription:
    "Découvrez les catégories alimentaires, industrielles, d'adoucissement de l'eau, de déneigement, pharmaceutiques et d'alimentation animale, puis filtrez selon votre besoin précis.",
  categoriesEmpty: "Les catégories de produits sont en cours de préparation. Contactez notre équipe pour identifier la solution adaptée.",
  industriesEyebrow: "Applications de notre sel",
  industriesHeading: "Un minéral naturel. De nombreuses applications essentielles.",
  industriesDescription:
    "Omega Line Egypt fournit du sel pour l'alimentation, les procédés chimiques, le traitement de l'eau, l'élevage, la sécurité hivernale et d'autres besoins spécialisés.",
  industries: [
    { title: "Alimentation et cuisine", description: "Sel de table et de cuisine pour la transformation, la conservation, les produits laitiers, viandes, poissons, légumes, snacks, sauces et pickles." },
    { title: "Industrie et chimie", description: "Sel pour la teinture textile, la pétrochimie, le sulfate de sodium, la soude et le chlore, le carbonate de sodium, le tannage et le forage." },
    { title: "Traitement de l'eau", description: "Pastilles et autres formats pour l'adoucissement, les unités de traitement, les piscines et l'élimination de la dureté." },
    { title: "Routes et aéroports", description: "Sel de déneigement destiné à réduire le point de congélation et à faciliter l'élimination de la neige et de la glace." },
    { title: "Alimentation animale", description: "Sel pour les formulations d'aliments pour animaux et les applications liées à l'élevage." },
    { title: "Pharmacie et maison", description: "Sel de haute pureté et spécialisé pour les usages pharmaceutiques, domestiques, culinaires et sur mesure." },
  ],
  qualityEyebrow: "Qualité de la source à l'expédition",
  qualityHeading: "La qualité à chaque étape",
  qualityDescription:
    "Le profil de l'entreprise place la qualité au cœur des opérations, depuis l'extraction jusqu'à la préparation, au conditionnement et à la livraison dans les délais.",
  qualityBenefits: [
    "Le contrôle qualité commence à l'extraction et se poursuit jusqu'à la livraison.",
    "La gestion totale de la qualité et l'assurance qualité orientent la production.",
    "Les produits sont préparés selon les spécifications chimiques et normatives requises.",
    "Une supervision professionnelle garantit la pureté, la granulométrie et l'emballage.",
    "Les qualités alimentaires et industrielles sont adaptées à leur application.",
    "Les documents techniques et certificats à jour sont disponibles sur demande.",
  ],
  certificatesAction: "Voir les documents qualité",
  certificatesNote:
    "Les certificats présentés proviennent du profil de l'entreprise. Demandez à notre équipe les copies actuellement valides et la documentation du produit.",
  packagingEyebrow: "Conditionnement flexible",
  packagingHeading: "Un emballage adapté à votre chaîne logistique",
  packagingDescription:
    "De la fourniture industrielle en vrac aux sachets destinés au consommateur, Omega Line Egypt prépare le sel selon les besoins de manutention, de stockage, de distribution et du marché de destination.",
  packagingOptions: [
    { title: "Vrac", description: "Pour les procédés industriels à grand volume et la manutention à grande échelle." },
    { title: "Big bags de 1 tonne", description: "Manutention efficace pour les usines, entrepôts et expéditions export." },
    { title: "Sacs industriels de 25 kg", description: "Format pratique pour les transformateurs, distributeurs et utilisateurs industriels." },
    { title: "Sachets de 1 kg et 500 g", description: "Formats prêts à la vente pour les sels raffinés, gros et sous vide." },
  ],
  shippingEyebrow: "Export et logistique",
  shippingHeading: "Préparé pour l'expédition internationale",
  shippingDescription:
    "Omega Line Egypt prend en charge les expéditions en vrac et conditionnées par conteneur ou navire, selon le produit, l'emballage, la destination et les exigences du client.",
  shippingSteps: [
    { title: "Spécifier", description: "Confirmer le type de sel, la pureté, la granulométrie, l'application, la quantité et la destination." },
    { title: "Conditionner et charger", description: "Préparer le vrac, les big bags, les sacs ou les cartons pour un transport sûr." },
    { title: "Expédier", description: "Coordonner le fret conteneurisé ou maritime selon l'itinéraire convenu." },
  ],
  specificationEyebrow: "Conçu pour votre activité",
  specificationHeading: "Du sel préparé selon vos spécifications",
  specificationDescription:
    "Indiquez-nous l'utilisation prévue, le type, la pureté, la granulométrie, la destination et le format d'emballage afin que notre équipe prépare une proposition adaptée.",
  specificationPoints: ["Type de sel et application", "Pureté et spécification chimique", "Taille des cristaux ou granulométrie", "Emballage, quantité et destination"],
  galleryEyebrow: "Au cœur d'Omega Line Egypt",
  galleryHeading: "Produits, conditionnement et opérations d'export",
  galleryDescription: "Découvrez les produits, formats d'emballage, opérations de chargement et documents qualité de l'entreprise.",
  galleryAction: "Voir toute la galerie",
  finalCtaHeading: "Dites-nous à quoi servira votre sel",
  finalCtaDescription:
    "Envoyez vos exigences techniques et commerciales à Omega Line Egypt pour identifier le sel, la spécification et l'emballage adaptés à votre marché.",
  finalCtaAction: "Demander un devis",
  seoTitle: "Omega Line Egypt | Fabrication, conditionnement et exportation de sel",
  seoDescription:
    "Omega Line Egypt fabrique, conditionne et exporte du sel pour l'alimentation, l'industrie, le traitement de l'eau, le déneigement, la pharmacie et l'alimentation animale.",
};

const de: HomepageProfileContent = {
  ...en,
  heroEyebrow: "Omega Line Egypt",
  heroHeading: "Omega Lines",
  heroDescription: "Ägyptisches Salz. Bereit für die Welt.",
  primaryCtaLabel: "Produkte entdecken",
  secondaryCtaLabel: "Spezifikationsangebot anfragen",
  trustIndicators: [
    "Mehr als zwanzig Jahre Erfahrung",
    "Herstellung, Verpackung und Export",
    "Kundenspezifische Körnung und Verpackung",
    "Lebensmittel-, Industrie- und Spezialanwendungen",
  ],
  capabilitiesLabel: "Leistungsbereiche von Omega Line Egypt",
  welcomeEyebrow: "Willkommen bei Omega Lines",
  welcomeHeading: "Auf Salz aufgebaut. Mit der Welt gewachsen.",
  welcomeParagraphs: [
    "Professionelle und qualifizierte Mitarbeiter unterstützen seit vielen Jahren den Erfolg und die Expansion von Omega Line Egypt. Die anhaltende Nachfrage afrikanischer Käufer machte die Salzversorgung zum Schwerpunkt des Unternehmens.",
    "Omega Line Egypt liefert Rohstoffe für Verarbeitungsbetriebe sowie fertige Salzprodukte. Die ursprüngliche Marke Dolphin wird für jodiertes Speisesalz und die Lebensmittelindustrie vertrieben; außerdem werden Produkte mit Kundenlogos regelmäßig geliefert.",
    "Schneller Service, Qualität und ein erschwinglicher Preis bilden die erklärte Wettbewerbsgrundlage. Das Unternehmen beschreibt etablierte Beziehungen in Europa, Afrika, dem Nahen Osten und Fernost, wobei China als führender Käufer dieser Expansion genannt wird.",
    "Das Dokument beschreibt Salz als eine Industrie, die Ägyptens Wirtschaft unterstützt, und als vielseitiges Mineralprodukt, das zur wichtigsten Exportlinie des Unternehmens wurde. Es nennt außerdem internationales Wachstum, weltweite Geschäftsverbindungen und die Gründung von Niederlassungen im Ausland.",
    "Malta und Bahrain werden als Märkte für Wasserenthärtungssalz-Pellets genannt. Das Dokument hebt zudem Rohsalz für Verarbeiter hervor, dessen Qualität die Verarbeitungsergebnisse verbessern und Einsparungen ermöglichen kann.",
  ],
  welcomeQuote: "Hohe Qualität, guter Service und ein erschwinglicher Preis.",
  welcomeHighlights: [
    { title: "Marke Dolphin", description: "Die ursprüngliche Salzmarke von Omega Line Egypt für jodiertes Speisesalz und die Lebensmittelindustrie." },
    { title: "Roh- und Fertigprodukte", description: "Rohsalz für Verarbeitungsbetriebe sowie fertige Salzprodukte für verbundene Märkte." },
    { title: "Kundenmarken", description: "Produkte mit Kundenlogos werden hergestellt und regelmäßig geliefert." },
    { title: "Serviceversprechen", description: "Hohe Qualität, guter Service und ein erschwinglicher Preis bilden die erklärte Positionierung." },
  ],
  welcomeMarketsHeading: "Im Welcome-Dokument genannte Märkte",
  welcomeMarkets: en.welcomeMarkets,
  welcomeLegacyNote: "Das Welcome-Dokument nennt ISO 9001:2008 für Salzexport und Qualitätsmanagementsysteme sowie ISO 22000:2005 für Lebensmittelsicherheits-Managementsysteme. Neuere Zertifikatsdokumente werden auf der Über-uns-Seite gezeigt.",
  aboutEyebrow: "Über Omega Line Egypt",
  aboutHeading: "Ein verlässlicher ägyptischer Salzpartner für globale Industrien",
  aboutDescription:
    "Omega Line Egypt produziert, verpackt und exportiert ein breites Sortiment an Salzprodukten. Diszipliniertes Management, gleichbleibende Qualität, moderne Verpackung und professionelle Überwachung unterstützen die Einhaltung chemischer Spezifikationen und Kundenerwartungen.",
  aboutStrengths: [
    "Chemische Spezifikationen nach Kundenbedarf",
    "Unterschiedliche Körnungen und Verpackungsformate",
    "Qualitätskontrolle von der Gewinnung bis zur Lieferung",
    "Exportunterstützung für internationale Märkte",
  ],
  aboutButtonLabel: "Unser Unternehmen entdecken",
  missionEyebrow: "Auftrag und Richtung",
  missionLabel: "Unser Auftrag",
  missionHeading: "Qualitätssalz, verlässlicher Service und langfristige Partnerschaft",
  missionDescription:
    "Omega Line Egypt stellt mehr als zwanzig Jahre Branchenwissen Kunden zur Verfügung, die verlässliche Produkte, Prozesse und Lieferungen benötigen.",
  missionPoints: [
    "Natürliches Salz in der geforderten Reinheit und Körnung liefern.",
    "Verpackungen für Industrie, Distribution und Einzelhandel bereitstellen.",
    "Produkt-, Qualitäts- und Prozessanforderungen jedes Kunden verstehen.",
  ],
  visionHeading: "Unsere Vision",
  visionDescription:
    "Die weltweite Reichweite von Omega Line Egypt ausbauen, bevorzugter Lieferant werden, neue Märkte erschließen und die Position in Afrika und internationalen Salzmärkten stärken.",
  visionPoints: [
    "Exzellenten Service und hochreine Produkte anbieten.",
    "Marktpositionen durch Produkte und Dienstleistungen ausbauen.",
    "Langfristige Beziehungen in neuen Regionen aufbauen.",
  ],
  productsEyebrow: "Salzlösungen",
  productsHeading: "Produkte nach realen Anwendungen organisiert",
  productsDescription:
    "Entdecken Sie Salz für Lebensmittel, Industrie, Wasserenthärtung, Enteisung, Pharmazie und Tierfutter und filtern Sie anschließend nach der benötigten Unterkategorie.",
  categoriesEmpty: "Die Produktkategorien werden vorbereitet. Kontaktieren Sie unser Team für die passende Salzlösung.",
  industriesEyebrow: "Einsatzbereiche unseres Salzes",
  industriesHeading: "Ein natürliches Mineral. Viele wichtige Anwendungen.",
  industriesDescription:
    "Omega Line Egypt liefert Salz für Lebensmittelproduktion, chemische Prozesse, Wasseraufbereitung, Tierhaltung, Wintersicherheit und weitere spezialisierte Anforderungen.",
  industries: [
    { title: "Lebensmittel und Küche", description: "Tafel- und Kochsalz für Verarbeitung, Konservierung, Milchprodukte, Käse, Tiefkühlkost, Fleisch, Fisch, Gemüse, Snacks, Saucen und Pickles." },
    { title: "Industrie und Chemie", description: "Salz für Textilfärbung, Petrochemie, Natriumsulfat, Natronlauge und Chlor, Soda, Ledergerbung und Bohrungen." },
    { title: "Wasseraufbereitung", description: "Salztabletten und weitere Formate für Enthärtung, Aufbereitungsanlagen, Schwimmbäder und die Entfernung von Härtebildnern." },
    { title: "Straßen und Flughäfen", description: "Auftausalz zur Senkung des Gefrierpunkts und zur Entfernung von Schnee und Eis auf Straßen und Flughafenflächen." },
    { title: "Tierfutter", description: "Salz für Tierfutterformulierungen und weitere Anwendungen in der Nutztierhaltung." },
    { title: "Pharmazie und Haushalt", description: "Hochreines und spezialisiertes Salz für pharmazeutische, häusliche, kulinarische und kundenspezifische Anforderungen." },
  ],
  qualityEyebrow: "Qualität von der Quelle bis zum Versand",
  qualityHeading: "Qualität in jeder Stufe",
  qualityDescription:
    "Das Unternehmensprofil stellt Qualität in den Mittelpunkt - von der Salzgewinnung über Aufbereitung und Verpackung bis zur termingerechten Lieferung.",
  qualityBenefits: [
    "Qualitätskontrolle beginnt bei der Gewinnung und reicht bis zur Lieferung.",
    "Total Quality Management und Qualitätssicherung leiten die Produktion.",
    "Produkte werden nach den erforderlichen chemischen und normativen Spezifikationen vorbereitet.",
    "Professionelle Überwachung unterstützt Reinheit, Körnung und Verpackung.",
    "Lebensmittel- und Industriequalitäten werden auf ihre Anwendung abgestimmt.",
    "Aktuelle technische Unterlagen und Zertifikate sind auf Anfrage erhältlich.",
  ],
  certificatesAction: "Qualitätsdokumente ansehen",
  certificatesNote:
    "Die gezeigten Zertifikate stammen aus dem Unternehmensprofil. Fragen Sie unser Team nach aktuell gültigen Kopien und produktspezifischer Dokumentation.",
  packagingEyebrow: "Flexible Verpackung",
  packagingHeading: "Verpackung für Ihre Lieferkette",
  packagingDescription:
    "Von industrieller Schüttware bis zu verbraucherfertigen Packungen bereitet Omega Line Egypt Salz für Handhabung, Lagerung, Distribution und Zielmarkt vor.",
  packagingOptions: [
    { title: "Schüttware", description: "Für großvolumige Industrieprozesse und umfangreiche Handhabung." },
    { title: "1-Tonnen-Big-Bags", description: "Effiziente Handhabung für Fabriken, Lager und Exportsendungen." },
    { title: "25-kg-Industriesäcke", description: "Praktisches Format für Verarbeiter, Händler und industrielle Nutzer." },
    { title: "1-kg- und 500-g-Beutel", description: "Verkaufsfertige Formate für raffiniertes, grobes und Vakuumsalz." },
  ],
  shippingEyebrow: "Export und Logistik",
  shippingHeading: "Für den internationalen Versand vorbereitet",
  shippingDescription:
    "Omega Line Egypt unterstützt lose und verpackte Sendungen per Container und Schiff und richtet die Verladung nach Produkt, Verpackung, Zielort und Kundenanforderungen aus.",
  shippingSteps: [
    { title: "Spezifizieren", description: "Salzart, Reinheit, Körnung, Anwendung, Menge und Zielort bestätigen." },
    { title: "Verpacken und verladen", description: "Schüttware, Big-Bags, Säcke oder Kartons für eine sichere Beförderung vorbereiten." },
    { title: "Versenden", description: "Container- oder Seefracht für die vereinbarte Exportroute koordinieren." },
  ],
  specificationEyebrow: "Für Ihren Betrieb vorbereitet",
  specificationHeading: "Salz nach Ihrer Spezifikation",
  specificationDescription:
    "Teilen Sie uns Verwendungszweck, Salzart, Reinheit, Körnung, Zielort und Verpackungsformat mit, damit unser Team ein passendes Lieferangebot erstellen kann.",
  specificationPoints: ["Salzart und Anwendung", "Reinheit und chemische Spezifikation", "Kristallgröße oder Körnung", "Verpackung, Menge und Zielort"],
  galleryEyebrow: "Einblick in Omega Line Egypt",
  galleryHeading: "Produkte, Verpackung und Exportbetrieb",
  galleryDescription: "Entdecken Sie Salzprodukte, Verpackungsformate, Verladevorgänge und Qualitätsdokumente des Unternehmens.",
  galleryAction: "Gesamte Galerie ansehen",
  finalCtaHeading: "Sagen Sie uns, wofür Sie Salz benötigen",
  finalCtaDescription:
    "Senden Sie Ihre technischen und kaufmännischen Anforderungen an Omega Line Egypt und bestimmen Sie gemeinsam das passende Salz, die Spezifikation und die Verpackung.",
  finalCtaAction: "Angebot anfragen",
  seoTitle: "Omega Line Egypt | Salzherstellung, Verpackung und Export",
  seoDescription:
    "Omega Line Egypt produziert, verpackt und exportiert Salz für Lebensmittel, Industrie, Wasseraufbereitung, Enteisung, Pharmazie, Tierfutter und Spezialanwendungen.",
};

const contentByLocale: Record<Locale, HomepageProfileContent> = { en, fr, de };

export function getHomepageProfileContent(locale: Locale): HomepageProfileContent {
  return contentByLocale[locale] ?? en;
}

const placeholderSignals = [
  "placeholder",
  "pure salt. reliable partnership.",
  "quality salt solutions for global industries",
  "wide range of salt products",
  "trusted by industrial buyers",
  "quality you can count on",
  "request a quote today",
  "global reach. local commitment.",
  "production and product media",
  "ready to prepare a salt inquiry",
  "view products",
  "request a quote",
  "learn more about us",
  "our products",
  "why choose us",
  "let's work together",
  "cms-backed",
  "foundation",
  "developing salt",
  "ready for verified",
  "awaiting verified",
  "should be replaced",
  "can be documented",
  "can be described",
  "should be supplied",
  "editable placeholder",
  "generic placeholder",
  "replace this",
  "before launch",
  "high-quality products",
  "international export",
  "quality-focused production",
  "reliable partnership",
  "consistent product quality",
  "flexible packaging options",
  "industrial and food-grade solutions",
  "reliable export support",
];

export function isPlaceholderCopy(value: string | null | undefined): boolean {
  if (!value?.trim()) return true;
  const normalized = value.toLowerCase();
  return placeholderSignals.some((signal) => normalized.includes(signal));
}

export function resolveProfileCopy(
  value: string | null | undefined,
  fallback: string,
): string {
  return isPlaceholderCopy(value) ? fallback : value!.trim();
}

export function isPlaceholderCollection<T>(
  values: T[] | null | undefined,
  textFromValue: (value: T) => string | null | undefined,
): boolean {
  return !values?.length || values.some((value) => isPlaceholderCopy(textFromValue(value)));
}
