import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const { ADMIN_NAME = "Administrator", ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (12+ characters) before seeding.");
  }

  // 1. Seed Admin
  await db.admin.upsert({
    where: { email: ADMIN_EMAIL.toLowerCase() },
    update: {
      name: ADMIN_NAME,
      password: await bcrypt.hash(ADMIN_PASSWORD, 12),
    },
    create: {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL.toLowerCase(),
      password: await bcrypt.hash(ADMIN_PASSWORD, 12),
    },
  });
  console.log("Admin ready:", ADMIN_EMAIL);

  // 2. Seed Default Seed Categories
  const categories = [
    { name: "Wheat", slug: "wheat", description: "High-yield, disease-resistant certified wheat seed varieties." },
    { name: "Rice", slug: "rice", description: "Aromatic basmati and coarse hybrid paddy seed varieties." },
    { name: "Maize", slug: "maize", description: "High-performance grain and silage hybrid maize seeds." },
    { name: "Cotton", slug: "cotton", description: "Bollworm-tolerant high germination BT cotton seeds." },
  ];

  for (const c of categories) {
    await db.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
  }

  const wheatCat = await db.category.findUnique({ where: { slug: "wheat" } });
  const riceCat = await db.category.findUnique({ where: { slug: "rice" } });
  const maizeCat = await db.category.findUnique({ where: { slug: "maize" } });
  const cottonCat = await db.category.findUnique({ where: { slug: "cotton" } });

  // 3. Seed Sample Seed Products
  const products = [
    {
      name: "Akbar 2019 Certified Wheat",
      slug: "akbar-2019-wheat",
      description: "Proven high tillering wheat seed suitable for irrigated plains across Punjab.",
      published: true,
      categoryId: wheatCat?.id,
    },
    {
      name: "Super Basmati Elite Rice",
      slug: "super-basmati-rice",
      description: "Extra long grain aromatic paddy seed offering superior cooking length and aroma.",
      published: true,
      categoryId: riceCat?.id,
    },
    {
      name: "ZS Hybrid Gold Maize 8820",
      slug: "zs-hybrid-gold-maize",
      description: "Vigorous early-maturing hybrid corn seed with exceptional heat tolerance.",
      published: true,
      categoryId: maizeCat?.id,
    },
    {
      name: "BS-15 BT Cotton Seed",
      slug: "bs-15-bt-cotton",
      description: "Bollworm resistant, early picking cotton seed with premium staple length.",
      published: true,
      categoryId: cottonCat?.id,
    },
  ];

  for (const p of products) {
    await db.product.upsert({ where: { slug: p.slug }, update: {}, create: p });
  }

  console.log("Categories and products seeded successfully!");
}

main().finally(() => db.$disconnect());
