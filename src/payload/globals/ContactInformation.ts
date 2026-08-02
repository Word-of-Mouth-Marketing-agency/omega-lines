import type { GlobalConfig } from "payload";
import { adminsOnly } from "../access/admins";

export const ContactInformation: GlobalConfig = {
  slug: "contact-information",
  admin: {
    group: "Settings",
  },
  access: {
    read: () => true,
    update: adminsOnly,
  },
  fields: [
    {
      name: "notice",
      type: "textarea",
      localized: true,
      admin: {
        description: "Placeholder-safe public contact note.",
      },
    },
    {
      name: "address",
      type: "textarea",
      localized: true,
    },
    {
      name: "telephoneNumbers",
      type: "array",
      fields: [
        { name: "number", type: "text", required: true },
      ],
    },
    {
      name: "faxNumbers",
      type: "array",
      fields: [
        { name: "number", type: "text", required: true },
      ],
    },
    {
      name: "cellNumbers",
      type: "array",
      fields: [
        { name: "number", type: "text", required: true },
      ],
    },
    {
      name: "emailAddresses",
      type: "array",
      fields: [
        { name: "email", type: "email", required: true },
      ],
    },
  ],
};
