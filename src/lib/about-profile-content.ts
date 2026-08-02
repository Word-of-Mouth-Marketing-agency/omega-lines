import type { Locale } from "@/i18n/routing";

export type AboutFeature = {
  title: string;
  description: string;
};

export type AboutProfileContent = {
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  heroFacts: Array<{ value: string; label: string }>;
  overviewEyebrow: string;
  overviewHeading: string;
  overviewParagraphs: string[];
  overviewStatement: string;
  capabilitiesEyebrow: string;
  capabilitiesHeading: string;
  capabilitiesDescription: string;
  capabilities: AboutFeature[];
  missionEyebrow: string;
  missionHeading: string;
  missionDescription: string;
  missionPoints: string[];
  visionEyebrow: string;
  visionHeading: string;
  visionDescription: string;
  visionPoints: string[];
  processEyebrow: string;
  processHeading: string;
  processDescription: string;
  processSteps: AboutFeature[];
  reachEyebrow: string;
  reachHeading: string;
  reachDescription: string;
  reachPoints: string[];
  partnershipEyebrow: string;
  partnershipHeading: string;
  partnershipText: string;
  qualityEyebrow: string;
  qualityHeading: string;
  qualityDescription: string;
  qualityPillars: AboutFeature[];
  certificatesEyebrow: string;
  certificatesHeading: string;
  certificatesDescription: string;
  certificatesNote: string;
  certificateAction: string;
  closeCertificateLabel: string;
  finalCtaEyebrow: string;
  finalCtaHeading: string;
  finalCtaDescription: string;
  productsAction: string;
  quoteAction: string;
  seoTitle: string;
  seoDescription: string;
};

const en: AboutProfileContent = {
  heroEyebrow: "About Omega Line Egypt",
  heroHeading: "Manufacturing, Packaging and Exporting Salt Since 2000",
  heroDescription:
    "Omega Line Egypt has worked in the manufacturing, packaging and export of all categories of salt since around 2000.",
  heroFacts: [
    { value: "Since 2000", label: "Salt manufacturing, packaging and export" },
    { value: "Thousands of tons", label: "Exported annually according to the company history" },
    { value: "Europe & Africa", label: "Markets identified in the company history" },
  ],
  overviewEyebrow: "Who we are",
  overviewHeading: "Manufacturing, Packaging and Exporting Salt Since 2000",
  overviewParagraphs: [
    "Omega Line Egypt is described in its company history as one of the leading companies working in the manufacturing, packaging and export of all categories of salt since around 2000.",
    "The company history states that Omega Line Egypt exported thousands of tons annually to countries in Europe, Africa and other international markets while following international quality systems.",
    "Products are packed and prepared to conform to required chemical and standard specifications under the supervision of professional and skilled staff, with the aim of meeting customer requirements in different countries.",
  ],
  overviewStatement: "Our main target is to advance the salt industry and export globally.",
  capabilitiesEyebrow: "What we do",
  capabilitiesHeading: "Our Core Activities",
  capabilitiesDescription:
    "Our work connects four areas: manufacturing, packaging, specification control and export.",
  capabilities: [
    { title: "Manufacturing", description: "Manufacturing all categories of salt, as stated in the company history." },
    { title: "Packaging", description: "Using current packing tools to prepare salt products for customer requirements." },
    { title: "Specification control", description: "Preparing products to conform to required chemical and standard specifications." },
    { title: "Export", description: "Exporting salt to countries in Europe, Africa and other markets named in the company history." },
  ],
  missionEyebrow: "Our mission",
  missionHeading: "Excellent Salt for Our Customers",
  missionDescription:
    "Omega Line Egypt puts more than twenty years of know-how at the service of its customers. The mission describes delivering a natural product in different granulations and packaging throughout Africa and worldwide.",
  missionPoints: [
    "Serve industry, trade and authorities as a long-term and reliable partner.",
    "Understand high customer requirements concerning product, quality and processes.",
    "Deliver natural salt in different granulations and packaging.",
  ],
  visionEyebrow: "Our vision",
  visionHeading: "Reaching Worldwide Through Planning, Quality and Management",
  visionDescription:
    "Our vision sets an international direction based on effective planning, efficient design, quality salt, management and customer-required specifications.",
  visionPoints: [
    "Offer the best service and high-purity quality.",
    "Be the preferred supplier for customers worldwide.",
    "Develop market positions through innovative products and services.",
    "Grow into new market regions and enhance synergies.",
    "Strengthen the company’s position in Africa and worldwide.",
  ],
  processEyebrow: "According to customer requirements",
  processHeading: "From Required Specification to Packed Salt",
  processDescription:
    "Our process connects customer requirements with production supervision, chemical conformity, packing and export.",
  processSteps: [
    { title: "Customer specification", description: "Identify the customer’s required chemical and standard specifications." },
    { title: "Salt production", description: "Manufacture the required category of salt." },
    { title: "Professional supervision", description: "Skilled staff supervise conformity with the required specifications." },
    { title: "Packing and export", description: "Pack the product and prepare it for the customer’s market." },
  ],
  reachEyebrow: "International export history",
  reachHeading: "Our Export Markets",
  reachDescription:
    "The company history states that Omega Line Egypt exported thousands of tons annually to Germany, the Netherlands, Nigeria, Cameroon, Côte d’Ivoire, Ghana, Mauritius, Equatorial Guinea, Angola, Senegal, Ethiopia, the Central African Republic, Congo, Turkey, Togo, Bahrain, Malta and Syria.",
  reachPoints: [
    "Countries in Europe and Africa",
    "Other international markets",
    "Thousands of tons exported annually, according to the history",
    "International quality systems followed",
  ],
  partnershipEyebrow: "International supply relationship",
  partnershipHeading: "Pure Vacuum Dried Iodized Salt",
  partnershipText:
    "The supplied company history states that Omega Line Egypt is a supplier agent for Global Nestlé for Pure Vacuum Dried Iodized Salt in various African countries.",
  qualityEyebrow: "Quality and supervision",
  qualityHeading: "Prepared to Required Chemical and Standard Specifications",
  qualityDescription:
    "The company history describes packing and production work intended to keep products aligned with required chemical and standard specifications under professional supervision.",
  qualityPillars: [
    { title: "Packing tools", description: "The history states that the company follows current tools in packing its products." },
    { title: "Chemical specifications", description: "Products are intended to conform to required chemical specifications." },
    { title: "Professional staff", description: "Production is supervised by professional and skilled staff." },
    { title: "Customer requirements", description: "The stated aim is to meet customer requirements in different countries." },
  ],
  certificatesEyebrow: "Supplied certificates",
  certificatesHeading: "ISO Certification Documents",
  certificatesDescription:
    "The supplied documents include ISO 9001:2015 for Export of Salt and ISO 22000:2018 for supervision of contract manufacturing and packaging of salt according to customers’ specifications.",
  certificatesNote:
    "The ISO 9001:2015 document shows an expiry date of 2 April 2025. The ISO 22000:2018 document shows an expiry date of 10 December 2026. The separate certificate summary also records earlier ISO 9001:2008 and ISO 22000:2005 certificates.",
  certificateAction: "View certificate",
  closeCertificateLabel: "Close certificate",
  finalCtaEyebrow: "Customer-required specifications",
  finalCtaHeading: "Discuss Your Salt Specification With Omega Line Egypt",
  finalCtaDescription:
    "Contact the team about the required salt category, chemical specification, granulation and packaging described in the company materials.",
  productsAction: "Explore Products",
  quoteAction: "Request a Quote",
  seoTitle: "About Omega Line Egypt | Salt Manufacturing, Packaging and Export",
  seoDescription:
    "Learn about Omega Line Egypt, a company working in salt manufacturing, packaging and export since around 2000.",
};

const fr: AboutProfileContent = {
  ...en,
  heroEyebrow: "À propos d’Omega Line Egypt",
  heroHeading: "Fabrication, conditionnement et exportation de sel depuis 2000",
  heroDescription: "Omega Line Egypt travaille dans la fabrication, le conditionnement et l’exportation de toutes les catégories de sel depuis environ 2000.",
  overviewEyebrow: "Qui sommes-nous",
  overviewHeading: "Fabrication, conditionnement et exportation de sel depuis 2000",
  overviewParagraphs: [
    "L’historique de l’entreprise décrit Omega Line Egypt comme l’une des sociétés majeures actives dans la fabrication, le conditionnement et l’exportation de toutes les catégories de sel depuis environ 2000.",
    "Il indique que l’entreprise exporte chaque année des milliers de tonnes vers des pays d’Europe, d’Afrique et d’autres marchés internationaux en suivant des systèmes qualité internationaux.",
    "Les produits sont conditionnés afin de respecter les spécifications chimiques et normatives requises, sous la supervision d’un personnel professionnel et qualifié.",
  ],
  overviewStatement: "Notre objectif principal est de faire progresser l’industrie du sel et son exportation mondiale.",
  capabilitiesEyebrow: "Nos activités",
  capabilitiesHeading: "Nos activités principales",
  capabilitiesDescription: "Notre travail relie quatre activités : fabrication, conditionnement, contrôle des spécifications et exportation.",
  capabilities: [
    { title: "Fabrication", description: "Fabrication de toutes les catégories de sel, selon l’historique de l’entreprise." },
    { title: "Conditionnement", description: "Utilisation d’outils de conditionnement actuels pour répondre aux exigences clients." },
    { title: "Contrôle des spécifications", description: "Préparation conforme aux spécifications chimiques et normatives requises." },
    { title: "Exportation", description: "Exportation vers les pays d’Europe, d’Afrique et les autres marchés cités." },
  ],
  missionEyebrow: "Notre mission",
  missionHeading: "Un sel excellent pour nos clients",
  missionDescription: "Omega Line Egypt met plus de vingt ans de savoir-faire au service de ses clients et livre un produit naturel dans différentes granulométries et différents conditionnements en Afrique et dans le monde.",
  missionPoints: ["Servir l’industrie, le commerce et les autorités comme partenaire fiable à long terme.", "Comprendre les exigences élevées liées au produit, à la qualité et aux processus.", "Livrer du sel naturel dans différentes granulométries et différents conditionnements."],
  visionEyebrow: "Notre vision",
  visionHeading: "Atteindre le monde grâce à la planification, la qualité et la gestion",
  visionDescription: "La vision fournie présente une orientation internationale fondée sur une planification efficace, une conception efficiente, un sel de qualité, la gestion et les spécifications requises par les clients.",
  visionPoints: ["Offrir le meilleur service et une grande pureté.", "Être le fournisseur privilégié des clients dans le monde.", "Développer les positions de marché grâce à des produits et services innovants.", "Accéder à de nouvelles régions et renforcer les synergies.", "Renforcer la position de l’entreprise en Afrique et dans le monde."],
  processEyebrow: "Selon les exigences du client",
  processHeading: "De la spécification requise au sel conditionné",
  processDescription: "Les documents fournis relient les exigences clients à la supervision de la production, à la conformité chimique, au conditionnement et à l’exportation.",
  processSteps: [
    { title: "Spécification client", description: "Identifier les spécifications chimiques et normatives exigées par le client." },
    { title: "Production du sel", description: "Fabriquer la catégorie de sel requise." },
    { title: "Supervision professionnelle", description: "Un personnel qualifié supervise la conformité aux spécifications requises." },
    { title: "Conditionnement et export", description: "Conditionner le produit et le préparer pour le marché du client." },
  ],
  reachEyebrow: "Historique international des exportations",
  reachHeading: "Nos marchés d’exportation",
  reachDescription: "L’historique indique qu’Omega Line Egypt exporte chaque année des milliers de tonnes vers l’Allemagne, les Pays-Bas, le Nigeria, le Cameroun, la Côte d’Ivoire, le Ghana, Maurice, la Guinée équatoriale, l’Angola, le Sénégal, l’Éthiopie, la République centrafricaine, le Congo, la Turquie, le Togo, Bahreïn, Malte et la Syrie.",
  reachPoints: ["Pays d’Europe et d’Afrique", "Autres marchés internationaux", "Milliers de tonnes exportées chaque année selon l’historique", "Systèmes qualité internationaux suivis"],
  partnershipEyebrow: "Relation internationale d’approvisionnement",
  partnershipHeading: "Sel iodé pur séché sous vide",
  partnershipText: "L’historique fourni indique qu’Omega Line Egypt est agent fournisseur de Global Nestlé pour du sel iodé pur séché sous vide dans plusieurs pays africains.",
  qualityEyebrow: "Qualité et supervision",
  qualityHeading: "Préparé selon les spécifications chimiques et normatives requises",
  qualityDescription: "L’historique décrit un travail de conditionnement et de production destiné à maintenir les produits conformes aux spécifications requises sous supervision professionnelle.",
  qualityPillars: [
    { title: "Outils de conditionnement", description: "L’historique indique que l’entreprise suit les outils actuels de conditionnement." },
    { title: "Spécifications chimiques", description: "Les produits sont destinés à respecter les spécifications chimiques requises." },
    { title: "Personnel professionnel", description: "La production est supervisée par un personnel professionnel et qualifié." },
    { title: "Exigences clients", description: "L’objectif déclaré est de répondre aux exigences des clients de différents pays." },
  ],
  certificatesEyebrow: "Certificats fournis",
  certificatesHeading: "Documents de certification ISO",
  certificatesDescription: "Les documents fournis comprennent ISO 9001:2015 pour l’exportation de sel et ISO 22000:2018 pour la supervision de la fabrication sous contrat et du conditionnement du sel selon les spécifications clients.",
  certificatesNote: "Le document ISO 9001:2015 indique une expiration au 2 avril 2025. Le document ISO 22000:2018 indique une expiration au 10 décembre 2026. Le résumé séparé mentionne également les anciens certificats ISO 9001:2008 et ISO 22000:2005.",
  certificateAction: "Voir le certificat",
  closeCertificateLabel: "Fermer le certificat",
  finalCtaEyebrow: "Spécifications requises par le client",
  finalCtaHeading: "Discutez de vos spécifications avec Omega Line Egypt",
  finalCtaDescription: "Contactez l’équipe au sujet de la catégorie de sel, de la spécification chimique, de la granulométrie et du conditionnement requis.",
  productsAction: "Découvrir les produits",
  quoteAction: "Demander un devis",
  seoTitle: "À propos d’Omega Line Egypt | Fabrication, conditionnement et exportation de sel",
  seoDescription: "Découvrez Omega Line Egypt, active dans la fabrication, le conditionnement et l’exportation de sel depuis environ 2000.",
};

const de: AboutProfileContent = {
  ...en,
  heroEyebrow: "Über Omega Line Egypt",
  heroHeading: "Salzherstellung, Verpackung und Export seit 2000",
  heroDescription: "Omega Line Egypt ist seit etwa 2000 in der Herstellung, Verpackung und Ausfuhr aller Salzkategorien tätig.",
  overviewEyebrow: "Wer wir sind",
  overviewHeading: "Salzherstellung, Verpackung und Export seit 2000",
  overviewParagraphs: [
    "Die Unternehmensgeschichte beschreibt Omega Line Egypt als eines der führenden Unternehmen in der Herstellung, Verpackung und Ausfuhr aller Salzkategorien seit etwa 2000.",
    "Sie gibt an, dass das Unternehmen jährlich Tausende Tonnen in Länder Europas, Afrikas und weitere internationale Märkte exportiert und dabei internationale Qualitätssysteme befolgt.",
    "Die Produkte werden unter Aufsicht professioneller und qualifizierter Mitarbeiter nach den geforderten chemischen und normativen Spezifikationen verpackt und vorbereitet.",
  ],
  overviewStatement: "Unser Hauptziel ist es, die Salzindustrie und den weltweiten Export voranzubringen.",
  capabilitiesEyebrow: "Unsere Tätigkeiten",
  capabilitiesHeading: "Unsere Kernaktivitäten",
  capabilitiesDescription: "Unsere Arbeit verbindet vier Bereiche: Herstellung, Verpackung, Spezifikationskontrolle und Export.",
  capabilities: [
    { title: "Herstellung", description: "Herstellung aller Salzkategorien gemäß der Unternehmensgeschichte." },
    { title: "Verpackung", description: "Einsatz aktueller Verpackungswerkzeuge für Kundenanforderungen." },
    { title: "Spezifikationskontrolle", description: "Vorbereitung nach den geforderten chemischen und normativen Spezifikationen." },
    { title: "Export", description: "Ausfuhr in die genannten Länder Europas, Afrikas und weitere Märkte." },
  ],
  missionEyebrow: "Unsere Mission",
  missionHeading: "Hervorragendes Salz für unsere Kunden",
  missionDescription: "Omega Line Egypt stellt seinen Kunden mehr als zwanzig Jahre Know-how zur Verfügung und liefert ein Naturprodukt in unterschiedlichen Körnungen und Verpackungen in Afrika und weltweit.",
  missionPoints: ["Industrie, Handel und Behörden als langfristiger, zuverlässiger Partner bedienen.", "Hohe Kundenanforderungen an Produkt, Qualität und Prozesse verstehen.", "Naturprodukt in unterschiedlichen Körnungen und Verpackungen liefern."],
  visionEyebrow: "Unsere Vision",
  visionHeading: "Mit Planung, Qualität und Management weltweit präsent sein",
  visionDescription: "Die bereitgestellte Vision beschreibt eine internationale Ausrichtung auf Grundlage effektiver Planung, effizienter Gestaltung, hochwertigen Salzes, guten Managements und kundenseitig geforderter Spezifikationen.",
  visionPoints: ["Besten Service und hohe Reinheit bieten.", "Weltweit bevorzugter Lieferant der Kunden sein.", "Marktpositionen durch innovative Produkte und Dienstleistungen entwickeln.", "Neue Marktregionen erschließen und Synergien stärken.", "Die Position des Unternehmens in Afrika und weltweit stärken."],
  processEyebrow: "Nach Kundenanforderungen",
  processHeading: "Von der geforderten Spezifikation zum verpackten Salz",
  processDescription: "Die bereitgestellten Unterlagen verbinden Kundenanforderungen mit Produktionsüberwachung, chemischer Konformität, Verpackung und Export.",
  processSteps: [
    { title: "Kundenspezifikation", description: "Die geforderten chemischen und normativen Spezifikationen des Kunden bestimmen." },
    { title: "Salzproduktion", description: "Die erforderliche Salzkategorie herstellen." },
    { title: "Professionelle Überwachung", description: "Qualifizierte Mitarbeiter überwachen die Übereinstimmung mit den Anforderungen." },
    { title: "Verpackung und Export", description: "Das Produkt verpacken und für den Markt des Kunden vorbereiten." },
  ],
  reachEyebrow: "Internationale Exportgeschichte",
  reachHeading: "Unsere Exportmärkte",
  reachDescription: "Die Unternehmensgeschichte gibt an, dass Omega Line Egypt jährlich Tausende Tonnen nach Deutschland, in die Niederlande, nach Nigeria, Kamerun, Côte d’Ivoire, Ghana, Mauritius, Äquatorialguinea, Angola, Senegal, Äthiopien, in die Zentralafrikanische Republik, den Kongo, die Türkei, nach Togo, Bahrain, Malta und Syrien exportiert.",
  reachPoints: ["Länder in Europa und Afrika", "Weitere internationale Märkte", "Laut Geschichte jährlich Tausende Tonnen exportiert", "Internationale Qualitätssysteme befolgt"],
  partnershipEyebrow: "Internationale Lieferbeziehung",
  partnershipHeading: "Reines vakuumgetrocknetes Jodsalz",
  partnershipText: "Die bereitgestellte Geschichte gibt an, dass Omega Line Egypt als Lieferagent für Global Nestlé reines vakuumgetrocknetes Jodsalz in verschiedenen afrikanischen Ländern bereitstellt.",
  qualityEyebrow: "Qualität und Überwachung",
  qualityHeading: "Nach geforderten chemischen und normativen Spezifikationen vorbereitet",
  qualityDescription: "Die Unternehmensgeschichte beschreibt Verpackungs- und Produktionsarbeit zur Einhaltung der geforderten Spezifikationen unter professioneller Aufsicht.",
  qualityPillars: [
    { title: "Verpackungswerkzeuge", description: "Die Geschichte gibt an, dass das Unternehmen aktuelle Verpackungswerkzeuge nutzt." },
    { title: "Chemische Spezifikationen", description: "Die Produkte sollen die geforderten chemischen Spezifikationen erfüllen." },
    { title: "Professionelles Personal", description: "Die Produktion wird von professionellen und qualifizierten Mitarbeitern überwacht." },
    { title: "Kundenanforderungen", description: "Das erklärte Ziel ist, Kundenanforderungen in verschiedenen Ländern zu erfüllen." },
  ],
  certificatesEyebrow: "Bereitgestellte Zertifikate",
  certificatesHeading: "ISO-Zertifizierungsdokumente",
  certificatesDescription: "Die bereitgestellten Dokumente umfassen ISO 9001:2015 für den Export von Salz und ISO 22000:2018 für die Überwachung der Auftragsfertigung und Verpackung von Salz nach Kundenspezifikationen.",
  certificatesNote: "Das ISO-9001:2015-Dokument zeigt den 2. April 2025 als Ablaufdatum. Das ISO-22000:2018-Dokument zeigt den 10. Dezember 2026. Die separate Zusammenfassung nennt außerdem die früheren Zertifikate ISO 9001:2008 und ISO 22000:2005.",
  certificateAction: "Zertifikat ansehen",
  closeCertificateLabel: "Zertifikat schließen",
  finalCtaEyebrow: "Kundenseitig geforderte Spezifikationen",
  finalCtaHeading: "Besprechen Sie Ihre Salzspezifikation mit Omega Line Egypt",
  finalCtaDescription: "Kontaktieren Sie das Team zur gewünschten Salzkategorie, chemischen Spezifikation, Körnung und Verpackung.",
  productsAction: "Produkte entdecken",
  quoteAction: "Angebot anfragen",
  seoTitle: "Über Omega Line Egypt | Salzherstellung, Verpackung und Export",
  seoDescription: "Erfahren Sie mehr über Omega Line Egypt, seit etwa 2000 tätig in Salzherstellung, Verpackung und Export.",
};

const contentByLocale: Record<Locale, AboutProfileContent> = { en, fr, de };

export function getAboutProfileContent(locale: Locale): AboutProfileContent {
  return contentByLocale[locale] ?? en;
}

const placeholderSignals = [
  "placeholder",
  "nearly fifteen years",
  "company overview",
  "awaiting verified",
  "before production launch",
];

export function isAboutPlaceholderCopy(value: string | null | undefined): boolean {
  if (!value?.trim()) return true;
  const normalized = value.toLowerCase();
  return placeholderSignals.some((signal) => normalized.includes(signal));
}

export function resolveAboutCopy(value: string | null | undefined, fallback: string): string {
  return isAboutPlaceholderCopy(value) ? fallback : value!.trim();
}

export function isAboutPlaceholderCollection<T>(
  values: T[] | null | undefined,
  textFromValue: (value: T) => string | null | undefined,
): boolean {
  return !values?.length || values.some((value) => isAboutPlaceholderCopy(textFromValue(value)));
}
