import type { CollectionConfig } from "payload";
import { APIError } from "payload";
import { adminsOnly, authenticated } from "../access/admins";
import { seoFields } from "../fields/seo";

export const ProductCategories: CollectionConfig = {
  slug: "product-categories",
  labels: {
    singular: "Product category",
    plural: "Product categories",
  },
  admin: {
    defaultColumns: ["name", "slug", "active", "sortOrder"],
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
    beforeOperation: [
      async ({ operation, args, req }) => {
        if (operation !== "delete" && operation !== "deleteByID") return;

        const ids: (string | number)[] = [];

        if (operation === "deleteByID") {
          ids.push(args.id);
        } else if (operation === "delete" && args.where) {
          const matching = await req.payload.find({
            collection: "product-categories",
            where: args.where,
            limit: 200,
            depth: 0,
          });
          for (const doc of matching.docs) {
            if (doc.id) ids.push(doc.id);
          }
        }

        if (ids.length === 0) return;

        const blocked: { id: string | number; name: string; count: number }[] = [];

        for (const catId of ids) {
          const products = await req.payload.find({
            collection: "products",
            limit: 0,
            where: {
              category: { equals: catId },
            },
            depth: 0,
          });

          if (products.totalDocs > 0) {
            let catName = `ID ${catId}`;
            try {
              const cat = await req.payload.findByID({
                collection: "product-categories",
                id: catId,
                depth: 0,
              });
              if (cat?.name) catName = cat.name;
            } catch {
              // fall back to ID-only label
            }

            blocked.push({ id: catId, name: catName, count: products.totalDocs });
          }

          const subcategories = await req.payload.find({
            collection: "product-subcategories",
            limit: 0,
            where: {
              parentCategory: { equals: catId },
            },
            depth: 0,
          });

          if (subcategories.totalDocs > 0) {
            let catName = `ID ${catId}`;
            try {
              const cat = await req.payload.findByID({
                collection: "product-categories",
                id: catId,
                depth: 0,
              });
              if (cat?.name) catName = cat.name;
            } catch {
              // fall back to ID-only label
            }

            blocked.push({ id: catId, name: `${catName} (subcategories)`, count: subcategories.totalDocs });
          }
        }

        if (blocked.length > 0) {
          const hasProducts = blocked.some((b) => !b.name.includes("(subcategories)"));
          const details = blocked.map((b) => `"${b.name}" (${b.count})`).join(", ");
          throw new APIError(
            `Cannot delete ${blocked.length === 1 ? "this category" : `${blocked.length} categories`}: ${details}. Remove or reassign related products and subcategories first.`,
            400,
            undefined,
            true,
          );
        }
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const products = await req.payload.find({
          collection: "products",
          limit: 0,
          where: {
            category: { equals: id },
          },
          depth: 0,
        });

        if (products.totalDocs > 0) {
          throw new APIError(
            `Cannot delete this category because ${products.totalDocs} product(s) still reference it. Reassign or delete those products first.`,
            400,
            undefined,
            true,
          );
        }

        const subcategories = await req.payload.find({
          collection: "product-subcategories",
          limit: 0,
          where: {
            parentCategory: { equals: id },
          },
          depth: 0,
        });

        if (subcategories.totalDocs > 0) {
          throw new APIError(
            `Cannot delete this category because ${subcategories.totalDocs} subcategor${subcategories.totalDocs === 1 ? "y" : "ies"} still reference it. Delete or reassign those subcategories first.`,
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
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
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
    ...seoFields,
  ],
};
