import type { CollectionConfig } from "payload";
import { adminsOnly, authenticated } from "../access/admins";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: {
    singular: "Gallery item",
    plural: "Gallery",
  },
  admin: {
    defaultColumns: ["title", "category", "active", "sortOrder"],
    useAsTitle: "title",
  },
  access: {
    admin: authenticated,
    create: adminsOnly,
    delete: adminsOnly,
    read: () => true,
    update: adminsOnly,
  },
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
      required: true,
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "bulk-shipments",
      options: [
        { label: "Bulk Shipments", value: "bulk-shipments" },
        { label: "Packing in Bags", value: "packing-in-bags" },
        { label: "Packing in Sacks", value: "packing-in-sacks" },
        { label: "Packing in Sling & Jumbo Bags", value: "packing-in-sling-jumbo-bags" },
        { label: "Shipping in Containers", value: "shipping-in-containers" },
      ],
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 100,
      index: true,
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      index: true,
    },
  ],
};
