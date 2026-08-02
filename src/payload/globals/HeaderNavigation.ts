import type { GlobalConfig } from "payload";
import { adminsOnly } from "../access/admins";

export const HeaderNavigation: GlobalConfig = {
  slug: "header-navigation",
  admin: {
    group: "Settings",
  },
  access: {
    read: () => true,
    update: adminsOnly,
  },
  fields: [
    {
      name: "items",
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
