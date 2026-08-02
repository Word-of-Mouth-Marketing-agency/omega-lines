import type { GlobalConfig } from "payload";
import { adminsOnly } from "../access/admins";

export const Footer: GlobalConfig = {
  slug: "footer",
  admin: {
    group: "Settings",
  },
  access: {
    read: () => true,
    update: adminsOnly,
  },
  fields: [
    {
      name: "summary",
      type: "textarea",
      localized: true,
    },
    {
      name: "links",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
