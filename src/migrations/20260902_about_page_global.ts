import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "about_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"overview_image_id" integer,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "about_page_locales" (
	"overview_heading" varchar,
	"history_heading" varchar,
	"nestle_relationship_text" varchar,
	"mission_heading" varchar,
	"mission_text" varchar,
	"vision_heading" varchar,
	"vision_text" varchar,
	"certificates_heading" varchar,
	"verification_note" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "about_page_overview_paragraphs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "about_page_overview_paragraphs_locales" (
	"paragraph" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "about_page_history_paragraphs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "about_page_history_paragraphs_locales" (
	"paragraph" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "about_page_export_countries" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"country" varchar NOT NULL
  );

  CREATE TABLE "about_page_certificates" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" integer,
	"active" boolean DEFAULT true,
	"sort_order" numeric DEFAULT 100
  );

  CREATE TABLE "about_page_certificates_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL
  );

  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_overview_image_id_media_id_fk" FOREIGN KEY ("overview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_overview_paragraphs" ADD CONSTRAINT "about_page_overview_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_overview_paragraphs_locales" ADD CONSTRAINT "about_page_overview_paragraphs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_overview_paragraphs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_history_paragraphs" ADD CONSTRAINT "about_page_history_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_history_paragraphs_locales" ADD CONSTRAINT "about_page_history_paragraphs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_history_paragraphs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_export_countries" ADD CONSTRAINT "about_page_export_countries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_certificates" ADD CONSTRAINT "about_page_certificates_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_certificates" ADD CONSTRAINT "about_page_certificates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_certificates_locales" ADD CONSTRAINT "about_page_certificates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_certificates"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "about_page_overoverview_image_idx" ON "about_page" USING btree ("overview_image_id");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_overview_paragraphs_order_idx" ON "about_page_overview_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_overview_paragraphs_parent_id_idx" ON "about_page_overview_paragraphs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_overview_paragraphs_locales_locale_parent_id_unique" ON "about_page_overview_paragraphs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_history_paragraphs_order_idx" ON "about_page_history_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_history_paragraphs_parent_id_idx" ON "about_page_history_paragraphs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_history_paragraphs_locales_locale_parent_id_unique" ON "about_page_history_paragraphs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_export_countries_order_idx" ON "about_page_export_countries" USING btree ("_order");
  CREATE INDEX "about_page_export_countries_parent_id_idx" ON "about_page_export_countries" USING btree ("_parent_id");
  CREATE INDEX "about_page_certificates_order_idx" ON "about_page_certificates" USING btree ("_order");
  CREATE INDEX "about_page_certificates_parent_id_idx" ON "about_page_certificates" USING btree ("_parent_id");
  CREATE INDEX "about_page_certificates_image_idx" ON "about_page_certificates" USING btree ("image_id");
  CREATE UNIQUE INDEX "about_page_certificates_locales_locale_parent_id_unique" ON "about_page_certificates_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "about_page" CASCADE;`)
}
