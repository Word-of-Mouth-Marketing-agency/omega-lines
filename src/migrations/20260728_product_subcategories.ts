import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "product_subcategories" (
      "id" serial PRIMARY KEY NOT NULL,
      "slug" varchar NOT NULL,
      "name" varchar NOT NULL,
      "parent_category_id" integer,
      "description" varchar,
      "active" boolean DEFAULT true,
      "sort_order" numeric DEFAULT 100,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "product_subcategories_locales" (
      "name" varchar NOT NULL,
      "description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    ALTER TABLE "product_subcategories" ADD CONSTRAINT "product_subcategories_slug_idx" UNIQUE ("slug");
    CREATE INDEX "product_subcategories_parent_category_idx" ON "product_subcategories" USING btree ("parent_category_id");
    CREATE INDEX "product_subcategories_active_idx" ON "product_subcategories" USING btree ("active");
    CREATE INDEX "product_subcategories_sort_order_idx" ON "product_subcategories" USING btree ("sort_order");
    CREATE INDEX "product_subcategories_updated_at_idx" ON "product_subcategories" USING btree ("updated_at");
    CREATE INDEX "product_subcategories_created_at_idx" ON "product_subcategories" USING btree ("created_at");

    ALTER TABLE "product_subcategories" ADD CONSTRAINT "product_subcategories_parent_category_id_product_categories_fk" FOREIGN KEY ("parent_category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "product_subcategories_locales" ADD CONSTRAINT "product_subcategories_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_subcategories"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "product_subcategories_locales_parent_id_idx" ON "product_subcategories_locales" USING btree ("_parent_id");

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_subcategories_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_subcategories_fk" FOREIGN KEY ("product_subcategories_id") REFERENCES "public"."product_subcategories"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "payload_locked_documents_rels_product_subcategories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_subcategories_id");

    ALTER TABLE "products" ADD COLUMN "subcategory_id" integer;
    ALTER TABLE "products" ADD CONSTRAINT "products_subcategory_id_product_subcategories_fk" FOREIGN KEY ("subcategory_id") REFERENCES "public"."product_subcategories"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX "products_subcategory_idx" ON "products" USING btree ("subcategory_id");

    ALTER TABLE "product_subcategories" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "product_subcategories_locales" ENABLE ROW LEVEL SECURITY;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_subcategory_id_product_subcategories_fk";
    DROP INDEX IF EXISTS "products_subcategory_idx";
    ALTER TABLE "products" DROP COLUMN IF EXISTS "subcategory_id";

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_product_subcategories_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_product_subcategories_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "product_subcategories_id";

    ALTER TABLE "product_subcategories_locales" DROP CONSTRAINT IF EXISTS "product_subcategories_locales_parent_fk";
    DROP INDEX IF EXISTS "product_subcategories_locales_parent_id_idx";
    DROP TABLE IF EXISTS "product_subcategories_locales" CASCADE;

    ALTER TABLE "product_subcategories" DROP CONSTRAINT IF EXISTS "product_subcategories_parent_category_id_product_categories_fk";
    ALTER TABLE "product_subcategories" DROP CONSTRAINT IF EXISTS "product_subcategories_slug_idx";
    DROP INDEX IF EXISTS "product_subcategories_slug_idx";
    DROP INDEX IF EXISTS "product_subcategories_parent_category_idx";
    DROP INDEX IF EXISTS "product_subcategories_active_idx";
    DROP INDEX IF EXISTS "product_subcategories_sort_order_idx";
    DROP INDEX IF EXISTS "product_subcategories_updated_at_idx";
    DROP INDEX IF EXISTS "product_subcategories_created_at_idx";
    DROP TABLE IF EXISTS "product_subcategories" CASCADE;

    ALTER TABLE "product_subcategories" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "product_subcategories_locales" DISABLE ROW LEVEL SECURITY;
  `)
}
