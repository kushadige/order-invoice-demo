import { ProductModel } from "@/models";
import { faker } from "@faker-js/faker";
import { type Product } from "@prisma/client";

export const createRandomProducts = async (count = 1) => {
  const products: Omit<Product, "id">[] = [];

  for (let i = 0; i < count; i++) {
    const product = {
      code: await generateProductId(products),
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      tax: parseFloat(faker.commerce.price({ min: 0, max: 20 })),
      discount: faker.datatype.boolean()
        ? parseFloat(faker.commerce.price({ min: 0, max: 20 }))
        : null,
      stock: faker.number.int({ min: 0, max: 10 }),
    };

    products.push(product);
  }

  return await ProductModel.createMany({
    data: products,
  });
};

const generateProductId = async (products: Omit<Product, "id">[]) => {
  const productCount = products.length;

  if (!productCount) {
    return "PRD-0001";
  }
  const formattedId = (productCount + 1).toString().padStart(4, "0");
  return `PRD-${formattedId}`;
};
