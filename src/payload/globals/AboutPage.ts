import type { GlobalConfig } from "payload";
import { adminsOnly } from "../access/admins";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
  admin: {
    group: "Pages",
  },
  access: {
    read: () => true,
    update: adminsOnly,
  },
  fields: [
    {
      type: "collapsible",
      label: "Company Overview",
      fields: [
        {
          name: "overviewHeading",
          type: "text",
          localized: true,
          defaultValue: "An Egyptian Salt Company Serving Real Industrial Requirements",
        },
        {
          name: "overviewParagraphs",
          type: "array",
          fields: [
            {
              name: "paragraph",
              type: "textarea",
              localized: true,
            },
          ],
        },
        {
          name: "overviewImage",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      type: "collapsible",
      label: "History and Global Reach",
      fields: [
        {
          name: "historyHeading",
          type: "text",
          localized: true,
          defaultValue: "Export Experience Built on Product and Process Reliability",
        },
        {
          name: "historyParagraphs",
          type: "array",
          fields: [
            {
              name: "paragraph",
              type: "textarea",
              localized: true,
            },
          ],
        },
        {
          name: "exportCountries",
          type: "array",
          fields: [
            {
              name: "country",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "nestleRelationshipText",
          type: "textarea",
          localized: true,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Mission",
      fields: [
        {
          name: "missionHeading",
          type: "text",
          localized: true,
          defaultValue: "Excellent Salt, Reliable Service and Long-Term Partnership",
        },
        {
          name: "missionText",
          type: "textarea",
          localized: true,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Vision",
      fields: [
        {
          name: "visionHeading",
          type: "text",
          localized: true,
          defaultValue: "A Preferred Salt Supplier Across Africa and Global Markets",
        },
        {
          name: "visionText",
          type: "textarea",
          localized: true,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Certificates",
      fields: [
        {
          name: "certificatesHeading",
          type: "text",
          localized: true,
          defaultValue: "Quality Documents Presented in the Company Profile",
        },
        {
          name: "certificates",
          type: "array",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "description",
              type: "textarea",
              localized: true,
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "active",
              type: "checkbox",
              defaultValue: true,
            },
            {
              name: "sortOrder",
              type: "number",
              defaultValue: 100,
            },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Admin Notes",
      fields: [
        {
          name: "verificationNote",
          type: "textarea",
          localized: true,
          defaultValue:
            "The supplied 2021 company profile is the source for this page. Certificate images show ISO 9001:2015 and ISO 22000:2018; request the latest valid copies before making current certification claims.",
          admin: {
            description:
              "Internal source and verification guidance for the About page.",
          },
        },
      ],
    },
  ],
};
