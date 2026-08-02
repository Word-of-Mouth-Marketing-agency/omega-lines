import type { CollectionConfig } from "payload";
import { APIError } from "payload";
import { adminsOnly, authenticated } from "../access/admins";
import { seoFields } from "../fields/seo";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    defaultColumns: ["name", "slug", "category", "subcategory", "active", "sortOrder"],
    useAsTitle: "name",
  },
  access: {
    admin: authenticated,
    create: adminsOnly,
    delete: adminsOnly,
    read: () => true,
    update: adminsOnly,
  },
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        const subcategoryId = data.subcategory ?? originalDoc?.subcategory;
        const categoryId = data.category ?? originalDoc?.category;

        if (!subcategoryId || !categoryId) return;

        let subcategory;
        try {
          subcategory = await req.payload.findByID({
            collection: "product-subcategories",
            id: subcategoryId,
            depth: 0,
          });
        } catch {
          return;
        }

        if (!subcategory) return;

        const subParentId = typeof subcategory.parentCategory === "object"
          ? subcategory.parentCategory.id
          : subcategory.parentCategory;

        if (subParentId !== categoryId) {
          throw new APIError(
            `The selected subcategory does not belong to the selected parent category. Please choose a subcategory that matches the category.`,
            400,
            undefined,
            true,
          );
        }
      },
    ],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      localized: false,
      index: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "fullDescription",
      type: "richText",
      localized: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "product-categories",
      required: true,
      index: true,
    },
    {
      name: "subcategory",
      type: "relationship",
      relationTo: "product-subcategories",
      hasMany: false,
      required: false,
      index: true,
      admin: {
        condition: (_, siblingData) => !!siblingData.category,
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "galleryImages",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "applications",
      type: "array",
      localized: true,
      fields: [
        {
          name: "application",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "specifications",
      type: "array",
      localized: true,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      index: true,
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      index: true,
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 100,
      index: true,
    },
    ...seoFields,
  ],
};
