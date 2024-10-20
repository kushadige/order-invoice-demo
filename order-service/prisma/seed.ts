import { createRandomProducts } from "@/factories/product.factory";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingProducts = await prisma.product.findMany();

  if (!existingProducts.length) {
    const products = await createRandomProducts(20);
    console.log("Seeded products: ", products.count);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
