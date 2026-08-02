import type { CollectionConfig } from "payload";
import { APIError } from "payload";
import { adminsOnly, authenticated } from "../access/admins";

const SUB_SLUG = "product-subcategories";

export const ProductSubcategories: CollectionConfig = {
  slug: SUB_SLUG,
  labels: {
    singular: "Product subcategory",
    plural: "Product subcategories",
  },
  admin: {
    defaultColumns: ["name", "parentCategory", "active", "sortOrder", "updatedAt"],
    useAsTitle: "name",
    group: "Products",
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
            collection: "product-subcategories",
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

        for (const subId of ids) {
          const products = await req.payload.find({
            collection: "products",
            limit: 0,
            where: {
              subcategory: { equals: subId },
            },
            depth: 0,
          });

          if (products.totalDocs > 0) {
            let subName = `ID ${subId}`;
            try {
              const sub = await req.payload.findByID({
                collection: "product-subcategories",
                id: subId,
                depth: 0,
              });
              if (sub?.name) subName = sub.name;
            } catch {
              // fall back to ID-only label
            }

            blocked.push({ id: subId, name: subName, count: products.totalDocs });
          }
        }

        if (blocked.length > 0) {
          const totalProducts = blocked.reduce((sum, b) => sum + b.count, 0);
          const names = blocked.map((b) => `"${b.name}"`).join(", ");
          throw new APIError(
            `Cannot delete ${blocked.length === 1 ? "this subcategory" : `${blocked.length} subcategories`} because ${totalProducts} product(s) still reference ${blocked.length === 1 ? "it" : "them"}. Reassign or delete those products first. Blocked: ${names}`,
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
            subcategory: { equals: id },
          },
          depth: 0,
        });

        if (products.totalDocs > 0) {
          throw new APIError(
            `Cannot delete this subcategory because ${products.totalDocs} product(s) still reference it. Reassign or delete those products first.`,
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
      name: "parentCategory",
      type: "relationship",
      relationTo: "product-categories",
      required: true,
      index: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
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
  ],
};
