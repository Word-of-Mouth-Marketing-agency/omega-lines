import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ADD COLUMN "about_image_id" integer;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_about_about_image_idx" ON "homepage" USING btree ("about_image_id");

  ALTER TABLE "homepage_locales" ADD COLUMN "about_eyebrow" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "about_heading" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "about_description" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "about_button_label" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_locales" DROP COLUMN "about_eyebrow";
  ALTER TABLE "homepage_locales" DROP COLUMN "about_heading";
  ALTER TABLE "homepage_locales" DROP COLUMN "about_description";
  ALTER TABLE "homepage_locales" DROP COLUMN "about_button_label";

  ALTER TABLE "homepage" DROP COLUMN "about_image_id";`)
}
