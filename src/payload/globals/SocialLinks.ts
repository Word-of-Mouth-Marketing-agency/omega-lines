import type { GlobalConfig } from "payload";
import { adminsOnly } from "../access/admins";

export const SocialLinks: GlobalConfig = {
  slug: "social-links",
  admin: {
    group: "Settings",
  },
  access: {
    read: () => true,
    update: adminsOnly,
  },
  fields: [
    {
      name: "links",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
