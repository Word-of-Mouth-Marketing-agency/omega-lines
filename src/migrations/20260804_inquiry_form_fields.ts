import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "first_name" varchar;
    ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "last_name" varchar;
    ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "address" varchar;
    ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "city" varchar;
    ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "cell_phone" varchar;
    ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "fax" varchar;
    ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "website" varchar;
    ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "interested_in" varchar;
    ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "omega_line_product" varchar;
    ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "salt_type" varchar;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'inquiries' AND column_name = 'name'
      ) THEN
        EXECUTE 'UPDATE "inquiries" SET "first_name" = COALESCE(NULLIF("name", ''''), ''Unknown'') WHERE "first_name" IS NULL';
      ELSE
        UPDATE "inquiries" SET "first_name" = 'Unknown' WHERE "first_name" IS NULL;
      END IF;
    END $$;
    UPDATE "inquiries" SET "last_name" = '-' WHERE "last_name" IS NULL;

    ALTER TABLE "inquiries" ALTER COLUMN "first_name" SET NOT NULL;
    ALTER TABLE "inquiries" ALTER COLUMN "last_name" SET NOT NULL;
    CREATE INDEX IF NOT EXISTS "inquiries_email_idx" ON "inquiries" USING btree ("email");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "inquiries_email_idx";
    ALTER TABLE "inquiries" DROP COLUMN IF EXISTS "salt_type";
    ALTER TABLE "inquiries" DROP COLUMN IF EXISTS "omega_line_product";
    ALTER TABLE "inquiries" DROP COLUMN IF EXISTS "interested_in";
    ALTER TABLE "inquiries" DROP COLUMN IF EXISTS "website";
    ALTER TABLE "inquiries" DROP COLUMN IF EXISTS "fax";
    ALTER TABLE "inquiries" DROP COLUMN IF EXISTS "cell_phone";
    ALTER TABLE "inquiries" DROP COLUMN IF EXISTS "city";
    ALTER TABLE "inquiries" DROP COLUMN IF EXISTS "address";
    ALTER TABLE "inquiries" DROP COLUMN IF EXISTS "last_name";
    ALTER TABLE "inquiries" DROP COLUMN IF EXISTS "first_name";
  `);
}
