import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_about_strengths" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "homepage_about_strengths_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL
  );

  ALTER TABLE "homepage_about_strengths" ADD CONSTRAINT "homepage_about_strengths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_about_strengths_locales" ADD CONSTRAINT "homepage_about_strengths_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_about_strengths"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "homepage_about_strengths_order_idx" ON "homepage_about_strengths" USING btree ("_order");
  CREATE INDEX "homepage_about_strengths_parent_id_idx" ON "homepage_about_strengths" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_about_strengths_locales_locale_parent_id_unique" ON "homepage_about_strengths_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_about_strengths" CASCADE;
  DROP TABLE "homepage_about_strengths_locales" CASCADE;`)
}
