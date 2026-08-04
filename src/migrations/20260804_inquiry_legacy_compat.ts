import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'inquiries' AND column_name = 'name'
      ) THEN
        ALTER TABLE "inquiries" ALTER COLUMN "name" DROP NOT NULL;
      END IF;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'inquiries' AND column_name = 'name'
      ) THEN
        UPDATE "inquiries" SET "name" = CONCAT_WS(' ', "first_name", "last_name") WHERE "name" IS NULL;
        ALTER TABLE "inquiries" ALTER COLUMN "name" SET NOT NULL;
      END IF;
    END $$;
  `);
}
