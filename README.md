# ABGOCHI — Handmade Fabric Bags

Cinematic artisan storefront for a Moroccan father-and-workshop brand. **Handmade fabric bags**, traditional craft carries, WhatsApp-only checkout.

## What we sell

- Handmade fabric bags
- Simple traditional craft bags
- Custom orders from the workshop (minimal tools, almost no machines)

## Stack

- Next.js 16 · TypeScript · Tailwind · Framer Motion · GSAP · Lenis
- Neon PostgreSQL · Prisma
- Clerk (admin) · Cloudinary (images)

## Setup

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run db:seed
npm run dev
```

If upgrading from old categories (`knife` / `leather`), run the rename migration in `prisma/migrations/20250523120000_bag_categories/`.

## URLs

- Shop: http://localhost:3000
- Admin: http://localhost:3000/sign-in

## Product categories

| Value | Label |
|-------|--------|
| `bag` | Fabric bag |
| `traditional` | Traditional craft bag |
| `custom` | Custom order |
