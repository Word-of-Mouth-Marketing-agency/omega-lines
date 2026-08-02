import type { GlobalConfig } from "payload";
import { adminsOnly } from "../access/admins";
import { seoFields } from "../fields/seo";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
    update: adminsOnly,
  },
  admin: {
    group: "Settings",
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "Omega Lines",
    },
    {
      name: "siteDescription",
      type: "textarea",
      localized: true,
    },
    ...seoFields,
  ],
};
