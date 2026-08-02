import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_trust_indicators_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_industries_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_quality_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_quality_benefits_locales" (
  	"benefit" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_certificate_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"suffix" varchar,
  	"verified" boolean DEFAULT false
  );
  
  CREATE TABLE "homepage_statistics_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"primary_cta_href" varchar,
  	"secondary_cta_href" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_locales" (
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_description" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_label" varchar,
  	"products_eyebrow" varchar,
  	"products_heading" varchar,
  	"products_description" varchar,
  	"industries_heading" varchar,
  	"industries_description" varchar,
  	"quality_eyebrow" varchar,
  	"quality_heading" varchar,
  	"quote_eyebrow" varchar,
  	"quote_heading" varchar,
  	"quote_description" varchar,
  	"export_heading" varchar,
  	"export_description" varchar,
  	"gallery_heading" varchar,
  	"gallery_description" varchar,
  	"final_cta_heading" varchar,
  	"final_cta_description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"product_categories_id" integer,
  	"gallery_id" integer
  );
  
  ALTER TABLE "homepage_trust_indicators" ADD CONSTRAINT "homepage_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_trust_indicators_locales" ADD CONSTRAINT "homepage_trust_indicators_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_trust_indicators"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_industries" ADD CONSTRAINT "homepage_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_industries_locales" ADD CONSTRAINT "homepage_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_quality_benefits" ADD CONSTRAINT "homepage_quality_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_quality_benefits_locales" ADD CONSTRAINT "homepage_quality_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_quality_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_certificate_images" ADD CONSTRAINT "homepage_certificate_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_certificate_images" ADD CONSTRAINT "homepage_certificate_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_statistics" ADD CONSTRAINT "homepage_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_statistics_locales" ADD CONSTRAINT "homepage_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_trust_indicators_order_idx" ON "homepage_trust_indicators" USING btree ("_order");
  CREATE INDEX "homepage_trust_indicators_parent_id_idx" ON "homepage_trust_indicators" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_trust_indicators_locales_locale_parent_id_unique" ON "homepage_trust_indicators_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_industries_order_idx" ON "homepage_industries" USING btree ("_order");
  CREATE INDEX "homepage_industries_parent_id_idx" ON "homepage_industries" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_industries_locales_locale_parent_id_unique" ON "homepage_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_quality_benefits_order_idx" ON "homepage_quality_benefits" USING btree ("_order");
  CREATE INDEX "homepage_quality_benefits_parent_id_idx" ON "homepage_quality_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_quality_benefits_locales_locale_parent_id_unique" ON "homepage_quality_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_certificate_images_order_idx" ON "homepage_certificate_images" USING btree ("_order");
  CREATE INDEX "homepage_certificate_images_parent_id_idx" ON "homepage_certificate_images" USING btree ("_parent_id");
  CREATE INDEX "homepage_certificate_images_image_idx" ON "homepage_certificate_images" USING btree ("image_id");
  CREATE INDEX "homepage_statistics_order_idx" ON "homepage_statistics" USING btree ("_order");
  CREATE INDEX "homepage_statistics_parent_id_idx" ON "homepage_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_statistics_locales_locale_parent_id_unique" ON "homepage_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  CREATE INDEX "homepage_seo_seo_image_idx" ON "homepage" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_product_categories_id_idx" ON "homepage_rels" USING btree ("product_categories_id");
  CREATE INDEX "homepage_rels_gallery_id_idx" ON "homepage_rels" USING btree ("gallery_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_trust_indicators" CASCADE;
  DROP TABLE "homepage_trust_indicators_locales" CASCADE;
  DROP TABLE "homepage_industries" CASCADE;
  DROP TABLE "homepage_industries_locales" CASCADE;
  DROP TABLE "homepage_quality_benefits" CASCADE;
  DROP TABLE "homepage_quality_benefits_locales" CASCADE;
  DROP TABLE "homepage_certificate_images" CASCADE;
  DROP TABLE "homepage_statistics" CASCADE;
  DROP TABLE "homepage_statistics_locales" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;`)
}
