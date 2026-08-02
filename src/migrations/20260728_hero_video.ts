import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "hero_video_id" integer;
    ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "homepage_hero_video_idx" ON "homepage" USING btree ("hero_video_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "homepage" DROP CONSTRAINT IF EXISTS "homepage_hero_video_id_media_id_fk";
    DROP INDEX IF EXISTS "homepage_hero_video_idx";
    ALTER TABLE "homepage" DROP COLUMN IF EXISTS "hero_video_id";
  `)
}
