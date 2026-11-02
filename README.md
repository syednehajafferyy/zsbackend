# Zaheer Seed Corporation — Backend & Admin API

The backend API and administration system for **Zaheer Seed Corporation** (crop seed breeding, processing, and distribution from Kasur, Pakistan).

Built with **Next.js 14 (App Router)**, **Prisma ORM**, and **Neon PostgreSQL**.

---

## Architecture Overview

- **RESTful API Routes** (`/api/*`):
  - Categories (`/api/categories`)
  - Products catalog (`/api/products`, `/api/products/[slug]`)
  - Customer inquiries & cart order requests (`/api/inquiries`) with honeypot & throttling
  - Admin authentication (`/api/auth/login`, `/api/auth/logout`)
  - Admin CRUD management for products, categories, and inquiries (`/api/admin/*`)
- **Admin Dashboard** (`/admin`):
  - Protected by JWT authentication and Next.js middleware
  - Manage seed catalog (add, update, publish/unpublish, image uploads via Vercel Blob)
  - Manage seed categories
  - Review and update inquiry/order request statuses (Pending, Read, Resolved)
- **Database & Migrations**:
  - Prisma schema with PostgreSQL models (`Admin`, `Category`, `Product`, `Inquiry`)
  - Automated migrations and seeding script
- **CORS Enabled**:
  - Cross-Origin Resource Sharing is configured to serve the frontend client seamlessly.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in every value:
```bash
cp .env.example .env
```
Key variables:
- `DATABASE_URL`: Neon pooled PostgreSQL connection string (host contains `-pooler`)
- `DIRECT_URL`: Neon direct PostgreSQL connection string (used for prisma migrations)
- `AUTH_SECRET`: Random 32+ character string (generate with `openssl rand -base64 32`)
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob read/write token (for seed product image uploads)
- `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`: Credentials for the initial admin user (used by seed)

### 3. Database Migration & Seeding
```bash
npx prisma migrate deploy
npm run db:seed
```
*(After seeding the admin, remove `ADMIN_PASSWORD` from your `.env` for security.)*

### 4. Run Development Server
```bash
npm run dev
```
- API & Status Landing: [http://localhost:3000](http://localhost:3000)
- Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Admin Dashboard: [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

---

## Deploy to Vercel
1. Import this repository into Vercel.
2. Add the environment variables from `.env` in Project Settings.
3. Deploy!
4. Run `npx prisma migrate deploy` and `npm run db:seed` from your computer against your Neon database.
