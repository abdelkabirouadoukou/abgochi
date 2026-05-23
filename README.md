# Atelier Mohammed — AbGochi

Premium dark luxury artisan website for handcrafted Moroccan knives and leather goods.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** — subtle cinematic animations
- **Lenis** — smooth scrolling
- **Prisma** — PostgreSQL (Neon / Supabase)
- **UploadThing** — image uploads (admin-ready API)

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Postgres connection string (Neon or Supabase) |
| `UPLOADTHING_TOKEN` | UploadThing secret token |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (country code, no +) |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram profile URL |
| `NEXT_PUBLIC_EMAIL` | Contact email |

## Database

```bash
npx prisma migrate dev --name init
npm run db:seed
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run db:seed` — seed products, gallery, testimonials

## Brand

- **Atelier Mohammed** — public artisan brand
- **AbGochi** — project / studio tagline

Replace placeholder Unsplash imagery with your own workshop photography for production.
