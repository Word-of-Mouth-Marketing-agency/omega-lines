export type CertificateData = {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  documentUrl: string;
  scope: string;
  documentDate: string;
};

export const certificates: CertificateData[] = [
  {
    id: "iso-9001-2015",
    title: "ISO 9001:2015",
    imageUrl: "/images/certificates/iso-9001.png",
    imageAlt: "ISO 9001:2015 certificate for Omega Line Egypt",
    documentUrl: "/documents/certificates/iso-9001-certificate.pdf",
    scope: "Export of salt.",
    documentDate: "Expiry shown: June 2028",
  },
  {
    id: "iso-22000-2018",
    title: "ISO 22000:2018",
    imageUrl: "/images/certificates/iso-22000.png",
    imageAlt: "ISO 22000:2018 certificate for Omega Line Egypt",
    documentUrl: "/documents/certificates/iso-22000-certificate.pdf",
    scope: "ISO 22000:2018 food safety management system certificate.",
    documentDate: "Expiry shown: 10 December 2026",
  },
];
