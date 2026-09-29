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
  supplyEyebrow: string;
  supplyHeading: string;
  supplyDescription: string;
  supplyHighlights: AboutFeature[];
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
  heroHeading: "Salt Export and Supply Since 2000",
  heroDescription:
    "Omega Line Egypt has worked in the export and supply of all categories of salt since around 2000.",
  heroFacts: [
    { value: "Since 2000", label: "Salt export and supply" },
    { value: "Thousands of tons", label: "Exported annually according to the company history" },
    { value: "Europe & Africa", label: "Markets identified in the company history" },
  ],
  overviewEyebrow: "Who we are",
  overviewHeading: "Salt Export and Supply Since 2000",
  overviewParagraphs: [
    "Omega Line Egypt is described in its company history as one of the leading companies working in the export and supply of all categories of salt since around 2000.",
    "The company history states that Omega Line Egypt exported thousands of tons annually to countries in Europe, Africa and other international markets while following international quality systems.",
    "Products are packed and prepared to conform to required chemical and standard specifications under the supervision of professional and skilled staff, with the aim of meeting customer requirements in different countries.",
  ],
  overviewStatement: "Our main target is to advance the salt industry and export globally.",
  supplyEyebrow: "Omega Line Egypt Advantages",
  supplyHeading: "A Complete and Reliable Supply Solution",
  supplyDescription:
    "At Omega Line Egypt, we offer more than just products — we provide a complete and reliable supply solution for our international customers.",
  supplyHighlights: [
    { title: "Multiple Qualified Sources", description: "You are not dependent on one factory. We provide alternative supply options to ensure continuity.\n\n(At Omega Line Egypt, we believe that international sourcing should involve much more than simply purchasing a product from a factory)" },
    { title: "Consistent Quality", description: "We coordinate specifications, inspection, COA, packaging control, and loading supervision before shipment.\n\nIndependent third-party inspection can also be arranged upon request.\n\nOur goal is to ensure that the product shipped is consistent with the specifications agreed with our customer." },
    { title: "Competitive Sourcing", description: "Our supplier network allows us to secure the right balance between quality, price, and availability." },
    { title: "Flexible Solutions", description: "Different grades, quantities, customized packaging, private label, bulk or bagged shipments. Different markets require different solutions." },
    { title: "Complete Export Service", description: "We handle All Shipping Documentation, logistics, freight options, and shipment follow-up from Egypt to Customer destination.\n\n(This reduces administrative work for our customers and helps facilitate a smoother import process)" },
    { title: "One Contact, Less Risk", description: "Instead of managing factories, inspectors, transporters, and shipping lines separately, Omega Line Egypt manages the entire process for you." },
    { title: "One Main Supplier (Point of Responsibility)", description: "Instead of coordinating separately with factories, transport companies, inspection companies, shipping lines, and documentation providers, our customer communicates with one responsible partner — Omega Line Egypt. We coordinate the complete process on your behalf." },
    { title: "International Logistics Management", description: "Omega Line Egypt supports the shipment from the production stage until export. We coordinate trucking, container loading or bulk shipment arrangements, shipping-line options, best freight quotations, transit-time comparisons, and shipment documentation.\n\nDepending on the customer's requirements, we can offer different commercial terms including FOB, CFR, and CIF." },
    { title: "Backup Supply Solutions", description: "One of our key advantages is our ability to develop alternative supply options. If one production source faces capacity or operational limitations, we can work on an alternative qualified source while maintaining the agreed product requirements.\n\nThis provides an additional level of protection to our customers' supply chains." },
    { title: "Long-Term Partnership & After-Sales Support", description: "Our responsibility does not end when the cargo leaves the port.\n\nWe remain available for shipment follow-up, documentation support, quality feedback, claims coordination, and planning of future shipments.\n\nOur objective is not simply to complete one transaction, but to build a stable and reliable long-term supply relationship." },
    { title: "Reliable Delivery.", description: "Finally, With Omega Line Egypt, you are not only purchasing a product.\n\nYou are gaining an export partner responsible for:\nReliable Delivery | Quality Control | Competitive Supply | Flexible Packaging | Export Documentation | Logistics Management | Backup Supply | After-Sales Support" },
    { title: "One Supplier", description: "Multiple Sources, Consistent Quality, Reliable Delivery." },
  ],
  capabilitiesEyebrow: "What we do",
  capabilitiesHeading: "Our Core Activities",
  capabilitiesDescription:
    "Our work focuses on export and supply.",
  capabilities: [
    { title: "Manufacturing", description: "Salt production under professional supervision, aligned with required chemical and standard specifications for each category." },
    { title: "Packaging", description: "Products packed and prepared to conform to required chemical and standard specifications under the supervision of skilled staff." },
    { title: "Exporting", description: "Exporting thousands of tons annually to countries in Europe, Africa and other markets named in the company history." },
    { title: "Quality & International Supply", description: "International quality systems followed across local and international markets, meeting customer requirements in different countries." },
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
    "The company history states that Omega Line Egypt exported thousands of tons annually to Germany, the Netherlands, Nigeria, Cameroon, Côte d’Ivoire, Ghana, Mauritius, Equatorial Guinea, Angola, Senegal, Ethiopia, the Central African Republic, Congo, Turkey, Togo and Syria.",
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
    "The supplied documents include ISO 9001:2015 and ISO 22000:2018 certification documents for Omega Line Egypt.",
  certificatesNote:
    "The ISO 9001:2015 document shows an expiry date of June 2028. The ISO 22000:2018 document shows an expiry date of 10 Dec 2029. The separate certificate summary also records earlier ISO 9001:2008 and ISO 22000:2005 certificates.",
  certificateAction: "View certificate",
  closeCertificateLabel: "Close certificate",
  finalCtaEyebrow: "Customer-required specifications",
  finalCtaHeading: "Discuss Your Salt Specification With Omega Line Egypt",
  finalCtaDescription:
    "Contact the team about the required salt category, chemical specification, granulation and packaging described in the company materials.",
  productsAction: "Explore Products",
  quoteAction: "Request a Quote",
  seoTitle: "About Omega Line Egypt | Salt Export and Supply",
  seoDescription:
    "Learn about Omega Line Egypt, a company working in salt export and supply since around 2000.",
};

const fr: AboutProfileContent = {
  ...en,
  heroEyebrow: "À propos d’Omega Line Egypt",
  heroHeading: "Exportation et fourniture de sel depuis 2000",
  heroDescription: "Omega Line Egypt travaille dans l’exportation et la fourniture de toutes les catégories de sel depuis environ 2000.",
  overviewEyebrow: "Qui sommes-nous",
  overviewHeading: "Exportation et fourniture de sel depuis 2000",
  overviewParagraphs: [
    "L’historique de l’entreprise décrit Omega Line Egypt comme l’une des sociétés majeures actives dans l’exportation et la fourniture de toutes les catégories de sel depuis environ 2000.",
    "Il indique que l’entreprise exporte chaque année des milliers de tonnes vers des pays d’Europe, d’Afrique et d’autres marchés internationaux en suivant des systèmes qualité internationaux.",
    "Les produits sont conditionnés afin de respecter les spécifications chimiques et normatives requises, sous la supervision d’un personnel professionnel et qualifié.",
  ],
  overviewStatement: "Notre objectif principal est de faire progresser l’industrie du sel et son exportation mondiale.",
  supplyEyebrow: "Avantages d’Omega Line Egypt",
  supplyHeading: "Une solution d’approvisionnement complète et fiable",
  supplyDescription:
    "Chez Omega Line Egypt, nous offrons plus que des produits — nous proposons une solution d’approvisionnement complète et fiable à nos clients internationaux.",
  supplyHighlights: [
    { title: "Plusieurs sources qualifiées", description: "Vous ne dépendez pas d’une seule usine. Nous proposons des options d’approvisionnement alternatives pour assurer la continuité.\n\n(À Omega Line Egypt, nous pensons que l’approvisionnement international doit aller bien au-delà du simple achat d’un produit auprès d’une usine.)" },
    { title: "Qualité constante", description: "Nous coordonnons les spécifications, l’inspection, les certificats d’analyse, le contrôle du conditionnement et la supervision du chargement avant l’expédition.\n\nUne inspection indépendante peut également être organisée sur demande.\n\nNotre objectif est de garantir que le produit expédié est conforme aux spécifications convenues avec notre client." },
    { title: "Approvisionnement compétitif", description: "Notre réseau de fournisseurs nous permet de trouver le juste équilibre entre qualité, prix et disponibilité." },
    { title: "Solutions flexibles", description: "Différentes qualités, quantités, emballages personnalisés, marque de distributeur, expéditions en vrac ou conditionnées. Chaque marché exige des solutions différentes." },
    { title: "Service export complet", description: "Nous prenons en charge toute la documentation d’expédition, la logistique, les options de fret et le suivi des expéditions depuis l’Égypte jusqu’à la destination du client.\n\n(Cela réduit la charge administrative de nos clients et facilite un processus d’importation plus fluide.)" },
    { title: "Un contact, moins de risques", description: "Au lieu de gérer séparément les usines, les inspecteurs, les transporteurs et les lignes maritimes, Omega Line Egypt gère l’ensemble du processus pour vous." },
    { title: "Un seul fournisseur (point de responsabilité)", description: "Au lieu de coordonner séparément les usines, les sociétés de transport, les sociétés d’inspection, les lignes maritimes et les prestataires documentaires, notre client communique avec un partenaire responsable — Omega Line Egypt. Nous coordonnons l’ensemble du processus pour vous." },
    { title: "Gestion de la logistique internationale", description: "Omega Line Egypt accompagne l’expédition depuis la production jusqu’à l’exportation. Nous coordonnons le transport routier, le chargement des conteneurs ou les expéditions en vrac, les options des lignes maritimes, les meilleures offres de fret, la comparaison des temps de transit et la documentation d’expédition.\n\nSelon les exigences du client, nous pouvons proposer différents termes commerciaux, notamment FOB, CFR et CIF." },
    { title: "Solutions d’approvisionnement de secours", description: "L’un de nos principaux avantages est notre capacité à développer des options d’approvisionnement alternatives. Si une source de production rencontre des limites de capacité ou des contraintes opérationnelles, nous pouvons travailler avec une autre source qualifiée tout en maintenant les exigences convenues pour le produit.\n\nCela apporte un niveau de protection supplémentaire à la chaîne d’approvisionnement de nos clients." },
    { title: "Partenariat à long terme et accompagnement après-vente", description: "Notre responsabilité ne s’arrête pas lorsque la cargaison quitte le port.\n\nNous restons disponibles pour le suivi des expéditions, l’assistance documentaire, les retours qualité, la coordination des réclamations et la planification des futures livraisons.\n\nNotre objectif n’est pas simplement de réaliser une transaction, mais de construire une relation d’approvisionnement stable et fiable à long terme." },
    { title: "Livraison fiable.", description: "Enfin, avec Omega Line Egypt, vous n’achetez pas seulement un produit.\n\nVous bénéficiez d’un partenaire export responsable de :\nLivraison fiable | Contrôle qualité | Approvisionnement compétitif | Emballage flexible | Documentation d’exportation | Gestion logistique | Approvisionnement de secours | Accompagnement après-vente" },
    { title: "Un fournisseur", description: "Plusieurs sources, qualité constante, livraison fiable." },
  ],
  capabilitiesEyebrow: "Nos activités",
  capabilitiesHeading: "Nos activités principales",
  capabilitiesDescription: "Notre travail se concentre sur l’exportation et la fourniture.",
  capabilities: [
    { title: "Fabrication", description: "Production de sel sous supervision professionnelle, conforme aux spécifications chimiques et normatives requises pour chaque catégorie." },
    { title: "Conditionnement", description: "Les produits sont conditionnés afin de respecter les spécifications chimiques et normatives requises, sous la supervision d'un personnel qualifié." },
    { title: "Exportation", description: "Exportation de milliers de tonnes chaque année vers des pays d'Europe, d'Afrique et d'autres marchés cités dans l'historique de l'entreprise." },
    { title: "Qualité et approvisionnement international", description: "Des systèmes qualité internationaux suivis sur les marchés locaux et internationaux, répondant aux exigences des clients de différents pays." },
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
  reachDescription: "L’historique indique qu’Omega Line Egypt exporte chaque année des milliers de tonnes vers l’Allemagne, les Pays-Bas, le Nigeria, le Cameroun, la Côte d’Ivoire, le Ghana, Maurice, la Guinée équatoriale, l’Angola, le Sénégal, l’Éthiopie, la République centrafricaine, le Congo, la Turquie, le Togo et la Syrie.",
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
  certificatesDescription: "Les documents fournis comprennent les certificats ISO 9001:2015 et ISO 22000:2018 d’Omega Line Egypt.",
  certificatesNote: "Le document ISO 9001:2015 indique une expiration en juin 2028. Le document ISO 22000:2018 indique une expiration au 10 décembre 2029. Le résumé séparé mentionne également les anciens certificats ISO 9001:2008 et ISO 22000:2005.",
  certificateAction: "Voir le certificat",
  closeCertificateLabel: "Fermer le certificat",
  finalCtaEyebrow: "Spécifications requises par le client",
  finalCtaHeading: "Discutez de vos spécifications avec Omega Line Egypt",
  finalCtaDescription: "Contactez l’équipe au sujet de la catégorie de sel, de la spécification chimique, de la granulométrie et du conditionnement requis.",
  productsAction: "Découvrir les produits",
  quoteAction: "Demander un devis",
  seoTitle: "À propos d’Omega Line Egypt | Exportation et fourniture de sel",
  seoDescription: "Découvrez Omega Line Egypt, active dans l’exportation et la fourniture de sel depuis environ 2000.",
};

const de: AboutProfileContent = {
  ...en,
  heroEyebrow: "Über Omega Line Egypt",
  heroHeading: "Salzexport und Lieferung seit 2000",
  heroDescription: "Omega Line Egypt ist seit etwa 2000 im Export und in der Lieferung aller Salzkategorien tätig.",
  overviewEyebrow: "Wer wir sind",
  overviewHeading: "Salzexport und Lieferung seit 2000",
  overviewParagraphs: [
    "Die Unternehmensgeschichte beschreibt Omega Line Egypt als eines der führenden Unternehmen im Export und in der Lieferung aller Salzkategorien seit etwa 2000.",
    "Sie gibt an, dass das Unternehmen jährlich Tausende Tonnen in Länder Europas, Afrikas und weitere internationale Märkte exportiert und dabei internationale Qualitätssysteme befolgt.",
    "Die Produkte werden unter Aufsicht professioneller und qualifizierter Mitarbeiter nach den geforderten chemischen und normativen Spezifikationen verpackt und vorbereitet.",
  ],
  overviewStatement: "Unser Hauptziel ist es, die Salzindustrie und den weltweiten Export voranzubringen.",
  supplyEyebrow: "Vorteile von Omega Line Egypt",
  supplyHeading: "Eine vollständige und zuverlässige Versorgungslösung",
  supplyDescription:
    "Bei Omega Line Egypt bieten wir mehr als nur Produkte – wir bieten unseren internationalen Kunden eine vollständige und zuverlässige Versorgungslösung.",
  supplyHighlights: [
    { title: "Mehrere qualifizierte Quellen", description: "Sie sind nicht von einer einzigen Fabrik abhängig. Wir bieten alternative Bezugsquellen, um die Kontinuität sicherzustellen.\n\n(Bei Omega Line Egypt sind wir überzeugt, dass internationale Beschaffung weit mehr sein sollte als der einfache Kauf eines Produkts bei einer Fabrik.)" },
    { title: "Konstante Qualität", description: "Wir koordinieren Spezifikationen, Inspektion, Analysezertifikate, Verpackungskontrolle und Verladeüberwachung vor dem Versand.\n\nEine unabhängige Prüfung durch Dritte kann auf Anfrage ebenfalls organisiert werden.\n\nUnser Ziel ist sicherzustellen, dass das versendete Produkt den mit unserem Kunden vereinbarten Spezifikationen entspricht." },
    { title: "Wettbewerbsfähige Beschaffung", description: "Unser Lieferantennetzwerk ermöglicht uns, das richtige Gleichgewicht zwischen Qualität, Preis und Verfügbarkeit zu sichern." },
    { title: "Flexible Lösungen", description: "Unterschiedliche Qualitäten, Mengen, kundenspezifische Verpackungen, Eigenmarken, lose oder verpackte Sendungen. Unterschiedliche Märkte erfordern unterschiedliche Lösungen." },
    { title: "Kompletter Exportservice", description: "Wir übernehmen alle Versanddokumente, Logistik, Frachtoptionen und die Sendungsnachverfolgung von Ägypten bis zum Zielort des Kunden.\n\n(Dies reduziert den Verwaltungsaufwand für unsere Kunden und erleichtert einen reibungsloseren Importprozess.)" },
    { title: "Ein Ansprechpartner, weniger Risiko", description: "Anstatt Fabriken, Inspektoren, Transporteure und Reedereien getrennt zu verwalten, übernimmt Omega Line Egypt den gesamten Prozess für Sie." },
    { title: "Ein Hauptlieferant (verantwortlicher Ansprechpartner)", description: "Anstatt Fabriken, Transportunternehmen, Inspektionsunternehmen, Reedereien und Dokumentationsanbieter getrennt zu koordinieren, kommuniziert unser Kunde mit einem verantwortlichen Partner — Omega Line Egypt. Wir koordinieren den gesamten Prozess für Sie." },
    { title: "Internationale Logistikverwaltung", description: "Omega Line Egypt unterstützt die Sendung von der Produktionsphase bis zum Export. Wir koordinieren Lkw-Transporte, Containerverladung oder lose Sendungen, Optionen der Reedereien, die besten Frachtangebote, Vergleiche der Transitzeiten und Versanddokumente.\n\nJe nach Kundenanforderungen können wir verschiedene Handelskonditionen anbieten, darunter FOB, CFR und CIF." },
    { title: "Lösungen für die Ersatzversorgung", description: "Eine unserer wichtigsten Stärken ist die Fähigkeit, alternative Bezugsquellen zu entwickeln. Wenn eine Produktionsquelle mit Kapazitäts- oder betrieblichen Einschränkungen konfrontiert ist, können wir eine alternative qualifizierte Quelle einbinden und dabei die vereinbarten Produktanforderungen einhalten.\n\nDies bietet zusätzlichen Schutz für die Lieferketten unserer Kunden." },
    { title: "Langfristige Partnerschaft und After-Sales-Unterstützung", description: "Unsere Verantwortung endet nicht, wenn die Ladung den Hafen verlässt.\n\nWir bleiben für Sendungsnachverfolgung, Dokumentationsunterstützung, Qualitätsfeedback, Reklamationskoordination und die Planung zukünftiger Lieferungen verfügbar.\n\nUnser Ziel ist nicht einfach, eine Transaktion abzuschließen, sondern eine stabile und zuverlässige langfristige Lieferbeziehung aufzubauen." },
    { title: "Zuverlässige Lieferung.", description: "Schließlich kaufen Sie mit Omega Line Egypt nicht nur ein Produkt.\n\nSie gewinnen einen Exportpartner, der verantwortlich ist für:\nZuverlässige Lieferung | Qualitätskontrolle | Wettbewerbsfähige Versorgung | Flexible Verpackung | Exportdokumentation | Logistikmanagement | Ersatzversorgung | After-Sales-Unterstützung" },
    { title: "Ein Lieferant", description: "Mehrere Quellen, konstante Qualität, zuverlässige Lieferung." },
  ],
  capabilitiesEyebrow: "Unsere Tätigkeiten",
  capabilitiesHeading: "Unsere Kernaktivitäten",
  capabilitiesDescription: "Unsere Arbeit konzentriert sich auf Export und Lieferung.",
  capabilities: [
    { title: "Herstellung", description: "Salzproduktion unter professioneller Überwachung, conform mit den geforderten chemischen und normativen Spezifikationen für jede Kategorie." },
    { title: "Verpackung", description: "Die Produkte werden unter Aufsicht qualifizierter Mitarbeiter nach den geforderten chemischen und normativen Spezifikationen verpackt." },
    { title: "Export", description: "Jährlicher Export von Tausenden Tonnen nach Ländern Europas, Afrikas und weiteren in der Unternehmensgeschichte genannten Märkten." },
    { title: "Qualität und internationaler Vertrieb", description: "Internationale Qualitätssysteme auf lokalen und internationalen Märkten, die den Kundenanforderungen in verschiedenen Ländern entsprechen." },
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
  reachDescription: "Die Unternehmensgeschichte gibt an, dass Omega Line Egypt jährlich Tausende Tonnen nach Deutschland, in die Niederlande, nach Nigeria, Kamerun, Côte d’Ivoire, Ghana, Mauritius, Äquatorialguinea, Angola, Senegal, Äthiopien, in die Zentralafrikanische Republik, den Kongo, die Türkei, nach Togo und Syrien exportiert.",
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
  certificatesDescription: "Die bereitgestellten Unterlagen umfassen die Zertifikate ISO 9001:2015 und ISO 22000:2018 von Omega Line Egypt.",
  certificatesNote: "Das ISO-9001:2015-Dokument zeigt Juni 2028 als Ablaufdatum. Das ISO-22000:2018-Dokument zeigt den 10. Dezember 2029. Die separate Zusammenfassung nennt außerdem die früheren Zertifikate ISO 9001:2008 und ISO 22000:2005.",
  certificateAction: "Zertifikat ansehen",
  closeCertificateLabel: "Zertifikat schließen",
  finalCtaEyebrow: "Kundenseitig geforderte Spezifikationen",
  finalCtaHeading: "Besprechen Sie Ihre Salzspezifikation mit Omega Line Egypt",
  finalCtaDescription: "Kontaktieren Sie das Team zur gewünschten Salzkategorie, chemischen Spezifikation, Körnung und Verpackung.",
  productsAction: "Produkte entdecken",
  quoteAction: "Angebot anfragen",
  seoTitle: "Über Omega Line Egypt | Salzexport und Lieferung",
  seoDescription: "Erfahren Sie mehr über Omega Line Egypt, seit etwa 2000 im Salzexport und in der Lieferung tätig.",
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
