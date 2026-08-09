import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const passwordHash = await bcrypt.hash("Admin123!", 12);

  const restaurant = await prisma.restaurant.upsert({
    where: {
      slug: "lake-view-restaurant",
    },
    update: {},
    create: {
      name: "Lake View Restaurant",
      slug: "lake-view-restaurant",
      description:
        "Experience authentic Ethiopian and international dishes.",
    },
  });

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@lakeview.com",
    },
    update: {
      passwordHash,
      restaurantId: restaurant.id,
    },
    create: {
      name: "Restaurant Admin",
      email: "admin@lakeview.com",
      passwordHash,
      role: "ADMIN",
      restaurantId: restaurant.id,
    },
  });

  console.log("Restaurant created:", restaurant.name);
  console.log("Admin created:", admin.email);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });