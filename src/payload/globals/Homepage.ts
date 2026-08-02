import type { Field, GlobalConfig } from "payload";
import { adminsOnly } from "../access/admins";
import { seoFields } from "../fields/seo";

const ctaFields: Field[] = [
  {
    name: "label",
    type: "text",
    localized: true,
  },
  {
    name: "href",
    type: "text",
  },
];

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  admin: {
    group: "Pages",
  },
  access: {
    read: () => true,
    update: adminsOnly,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "heroEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "heroHeading",
              type: "text",
              localized: true,
            },
            {
              name: "heroDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              admin: {
                description: "Fallback image or video poster.",
              },
            },
            {
              name: "heroVideo",
              type: "upload",
              relationTo: "media",
              admin: {
                description: "MP4 or WebM hero video. When set, plays instead of the default hero video.",
              },
            },
            {
              name: "primaryCta",
              type: "group",
              fields: ctaFields,
            },
            {
              name: "secondaryCta",
              type: "group",
              fields: ctaFields,
            },
            {
              name: "trustIndicators",
              type: "array",
              maxRows: 4,
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: "About",
          fields: [
            {
              name: "aboutEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "aboutHeading",
              type: "text",
              localized: true,
            },
            {
              name: "aboutDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "aboutImage",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "aboutStrengths",
              type: "array",
              maxRows: 4,
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  localized: true,
                },
              ],
            },
            {
              name: "aboutButtonLabel",
              type: "text",
              localized: true,
            },
          ],
        },
        {
          label: "Products",
          fields: [
            {
              name: "productsEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "productsHeading",
              type: "text",
              localized: true,
            },
            {
              name: "productsDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "featuredProductCategories",
              type: "relationship",
              relationTo: "product-categories",
              hasMany: true,
              maxRows: 6,
            },
          ],
        },
        {
          label: "Industries",
          fields: [
            {
              name: "industriesHeading",
              type: "text",
              localized: true,
            },
            {
              name: "industriesDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "industries",
              type: "array",
              maxRows: 6,
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
              ],
            },
          ],
        },
        {
          label: "Quality and quote",
          fields: [
            {
              name: "qualityEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "qualityHeading",
              type: "text",
              localized: true,
            },
            {
              name: "qualityBenefits",
              type: "array",
              maxRows: 6,
              fields: [
                {
                  name: "benefit",
                  type: "text",
                  required: true,
                  localized: true,
                },
              ],
            },
            {
              name: "certificateImages",
              type: "array",
              maxRows: 3,
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
            {
              name: "quoteEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "quoteHeading",
              type: "text",
              localized: true,
            },
            {
              name: "quoteDescription",
              type: "textarea",
              localized: true,
            },
          ],
        },
        {
          label: "Export and gallery",
          fields: [
            {
              name: "exportHeading",
              type: "text",
              localized: true,
            },
            {
              name: "exportDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "statistics",
              type: "array",
              maxRows: 4,
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
                  name: "value",
                  type: "number",
                  admin: {
                    description: "Leave empty until verified.",
                  },
                },
                {
                  name: "suffix",
                  type: "text",
                },
                {
                  name: "verified",
                  type: "checkbox",
                  defaultValue: false,
                },
              ],
            },
            {
              name: "galleryHeading",
              type: "text",
              localized: true,
            },
            {
              name: "galleryDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "featuredGalleryItems",
              type: "relationship",
              relationTo: "gallery",
              hasMany: true,
              maxRows: 6,
            },
            {
              name: "finalCtaHeading",
              type: "text",
              localized: true,
            },
            {
              name: "finalCtaDescription",
              type: "textarea",
              localized: true,
            },
          ],
        },
        {
          label: "SEO",
          fields: seoFields,
        },
      ],
    },
  ],
};
