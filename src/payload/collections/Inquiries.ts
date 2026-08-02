import type { CollectionConfig } from "payload";
import { adminsOnly, authenticated } from "../access/admins";

export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  labels: {
    singular: "Inquiry",
    plural: "Inquiries",
  },
  admin: {
    defaultColumns: ["firstName", "lastName", "company", "email", "country", "interestedIn", "status", "createdAt"],
    useAsTitle: "firstName",
    group: "Inquiries",
  },
  access: {
    create: () => true,
    read: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
    admin: authenticated,
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "company",
      type: "text",
    },
    {
      name: "address",
      type: "text",
    },
    {
      name: "city",
      type: "text",
      required: true,
    },
    {
      name: "country",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "cellPhone",
      type: "text",
      required: true,
    },
    {
      name: "fax",
      type: "text",
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "website",
      type: "text",
    },
    {
      name: "interestedIn",
      type: "text",
    },
    {
      name: "omegaLineProduct",
      type: "text",
    },
    {
      name: "saltType",
      type: "text",
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "consent",
      type: "checkbox",
      required: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Closed", value: "closed" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "locale",
      type: "text",
      admin: { position: "sidebar" },
    },
  ],
};
