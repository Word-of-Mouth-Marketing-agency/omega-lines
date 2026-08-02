# Omega Lines Website Foundation

Multilingual B2B salt-product catalog foundation built with Next.js App Router, Payload CMS, PostgreSQL, Tailwind CSS, next-intl, TypeScript, and pnpm.

## Scope

This project is a multilingual B2B salt catalog with completed company-profile content for the Homepage and About Us page, dynamic product category navigation, category-specific product pages, product details, Gallery, and Contact. It does not include prices, cart, checkout, or customer accounts.

## Routes

English is the fallback and has no locale prefix:

- `/`
- `/about`
- `/products`
- `/products/[slug]`
- `/gallery`
- `/contact`

French and German use `/fr` and `/de` prefixes. The Homepage and About Us page include dedicated localized company-profile content in English, French, and German.

## Environment

Copy `.env.example` to `.env.local` and set:

- `DATABASE_URL`: PostgreSQL connection string used by Payload. The local compose file publishes PostgreSQL on host port `5433`.
- `PAYLOAD_SECRET`: long random secret for Payload auth and signing.
- `NEXT_PUBLIC_SITE_URL`: public site origin for canonical URLs and sitemap entries.

Never commit real secrets.

## Local Development

```bash
pnpm install
docker compose up -d
pnpm payload:migrate
pnpm seed
pnpm products:import
pnpm dev
```

`pnpm products:import` imports the complete Omega product catalog and bundled
product imagery into the configured database. It is idempotent: existing
products and categories are updated, and previously imported media is reused.

Open `http://localhost:3000`. Payload Admin is mounted at `/admin`.

## Validation Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm payload:types
pnpm build
```

## CMS Model

Collections:

- `users`: Payload authentication for admin access.
- `media`: image uploads with localized alt text, optional captions, and web image sizes.
- `product-categories`: stable non-localized slug, localized name/description, image, order, active state, SEO.
- `products`: stable non-localized slug, localized descriptions, category, featured/gallery images, applications, specifications, state, order, SEO.
- `gallery`: localized title/description, media relationship, category, order, active state.

Globals:

- `site-settings`
- `header-navigation`
- `footer`
- `contact-information`
- `social-links`

## Database And Migrations

Payload owns the schema through its PostgreSQL adapter. The initial foundation migration is committed under `src/migrations`. Generate a new migration only after schema changes with `pnpm payload:migrate:create`, review the generated SQL, then apply with `pnpm payload:migrate`. Do not edit a deployed migration in place.

## Docker And VPS Notes

`Dockerfile` uses Next standalone output and runs as a non-root user. After `pnpm build`, `pnpm start` runs `.next/standalone/server.js`. `docker-compose.yml` is for local PostgreSQL only. On a VPS, provide production secrets through the host or orchestrator and mount persistent storage for `/app/media`, or replace local storage with S3-compatible object storage before production. Uploaded media must not live only inside an ephemeral container filesystem.

## Company-profile content policy

Homepage and About Us copy is grounded in the supplied Omega Line Egypt company profile. The certificate images are presented as documents shown in that profile, with a request to obtain the latest valid copies before making current certification claims. Unsupported export-country lists, shipment-volume claims, prices, and other unverified figures are not used.
