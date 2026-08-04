import path from "node:path";
import { randomBytes } from "node:crypto";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig, type SharpDependency } from "payload";
import { Gallery } from "@/payload/collections/Gallery";
import { Inquiries } from "@/payload/collections/Inquiries";
import { Media } from "@/payload/collections/Media";
import { ProductCategories } from "@/payload/collections/ProductCategories";
import { ProductSubcategories } from "@/payload/collections/ProductSubcategories";
import { Products } from "@/payload/collections/Products";
import { Users } from "@/payload/collections/Users";
import { AboutPage } from "@/payload/globals/AboutPage";
import { ContactInformation } from "@/payload/globals/ContactInformation";
import { Footer } from "@/payload/globals/Footer";
import { HeaderNavigation } from "@/payload/globals/HeaderNavigation";
import { Homepage } from "@/payload/globals/Homepage";
import { SiteSettings } from "@/payload/globals/SiteSettings";
import { SocialLinks } from "@/payload/globals/SocialLinks";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const payloadSecret =
  process.env.PAYLOAD_SECRET ??
  (process.env.NODE_ENV === "production"
    ? undefined
    : randomBytes(32).toString("hex"));

if (!payloadSecret) {
  throw new Error("PAYLOAD_SECRET is required in production.");
}

let resolvedSharp: SharpDependency | null = null;

try {
  const sharpModule = await import("sharp");
  resolvedSharp = sharpModule.default as unknown as SharpDependency;
} catch {
  resolvedSharp = null;
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ProductCategories, ProductSubcategories, Products, Gallery, Inquiries],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    // Keep local development non-interactive; schema changes are applied through Payload migrations.
    push: false,
  }),
  editor: lexicalEditor(),
  globals: [AboutPage, SiteSettings, HeaderNavigation, Footer, ContactInformation, SocialLinks, Homepage],
  localization: {
    locales: ["en", "fr", "de"],
    defaultLocale: "en",
    fallback: true,
  },
  secret: payloadSecret,
  sharp: resolvedSharp ?? undefined,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
