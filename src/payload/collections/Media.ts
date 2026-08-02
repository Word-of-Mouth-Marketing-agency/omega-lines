import type { CollectionConfig } from "payload";
import { adminsOnly, authenticated } from "../access/admins";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    admin: authenticated,
    create: adminsOnly,
    delete: adminsOnly,
    read: () => true,
    update: adminsOnly,
  },
  admin: {
    useAsTitle: "alt",
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/mp4", "video/webm"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "catalog",
        width: 1200,
        height: 900,
        position: "centre",
      },
      {
        name: "wide",
        width: 1600,
        height: 900,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "caption",
      type: "textarea",
      localized: true,
    },
  ],
};
