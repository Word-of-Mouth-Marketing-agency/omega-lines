import type { Field } from "payload";

export const seoFields: Field[] = [
  {
    type: "group",
    name: "seo",
    label: "SEO",
    fields: [
      {
        name: "title",
        type: "text",
        localized: true,
        maxLength: 70,
      },
      {
        name: "description",
        type: "textarea",
        localized: true,
        maxLength: 160,
      },
      {
        name: "image",
        type: "upload",
        relationTo: "media",
      },
      {
        name: "noIndex",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  },
];
