import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "contact_information_telephone_numbers" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"number" varchar NOT NULL
  );

  CREATE TABLE "contact_information_fax_numbers" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"number" varchar NOT NULL
  );

  CREATE TABLE "contact_information_cell_numbers" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"number" varchar NOT NULL
  );

  CREATE TABLE "contact_information_email_addresses" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL
  );

  ALTER TABLE "contact_information" DROP COLUMN "email";
  ALTER TABLE "contact_information" DROP COLUMN "phone";

  ALTER TABLE "contact_information_telephone_numbers" ADD CONSTRAINT "contact_information_telephone_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_information"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_information_fax_numbers" ADD CONSTRAINT "contact_information_fax_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_information"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_information_cell_numbers" ADD CONSTRAINT "contact_information_cell_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_information"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_information_email_addresses" ADD CONSTRAINT "contact_information_email_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_information"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "contact_information_telephone_numbers_order_idx" ON "contact_information_telephone_numbers" USING btree ("_order");
  CREATE INDEX "contact_information_telephone_numbers_parent_id_idx" ON "contact_information_telephone_numbers" USING btree ("_parent_id");
  CREATE INDEX "contact_information_fax_numbers_order_idx" ON "contact_information_fax_numbers" USING btree ("_order");
  CREATE INDEX "contact_information_fax_numbers_parent_id_idx" ON "contact_information_fax_numbers" USING btree ("_parent_id");
  CREATE INDEX "contact_information_cell_numbers_order_idx" ON "contact_information_cell_numbers" USING btree ("_order");
  CREATE INDEX "contact_information_cell_numbers_parent_id_idx" ON "contact_information_cell_numbers" USING btree ("_parent_id");
  CREATE INDEX "contact_information_email_addresses_order_idx" ON "contact_information_email_addresses" USING btree ("_order");
  CREATE INDEX "contact_information_email_addresses_parent_id_idx" ON "contact_information_email_addresses" USING btree ("_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_information" ADD COLUMN "email" varchar;
  ALTER TABLE "contact_information" ADD COLUMN "phone" varchar;

  DROP TABLE "contact_information_telephone_numbers" CASCADE;
  DROP TABLE "contact_information_fax_numbers" CASCADE;
  DROP TABLE "contact_information_cell_numbers" CASCADE;
  DROP TABLE "contact_information_email_addresses" CASCADE;`)
}
