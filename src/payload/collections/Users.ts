import type { CollectionConfig } from "payload";
import { adminsOnly, authenticated } from "../access/admins";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    admin: authenticated,
    create: adminsOnly,
    delete: adminsOnly,
    read: adminsOnly,
    update: adminsOnly,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
