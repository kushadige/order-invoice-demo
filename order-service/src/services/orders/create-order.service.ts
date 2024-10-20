import prisma from "@/lib/prisma";
import { OrderModel, ProductModel } from "@/models";
import { type Product } from "@prisma/client";
import { type CreateOrderResponse } from "@/schemas/order.schemas";

export class CreateOrderService {
  async create(product_codes: string[]): Promise<CreateOrderResponse> {
    if (!product_codes || product_codes.length === 0) {
      throw new Error("No products provided.");
    }

    const products = await this.checkProductsExistence(product_codes);
    this.checkProductsInStock(products, product_codes);
    const [totalAmount, totalTaxAmount, totalDiscountAmount] =
      this.calculateTotalAmount(products);
    const order = await this.createOrder(products, product_codes, totalAmount);

    return {
      orderId: order.orderId,
      products,
      totalAmount,
      totalTaxAmount,
      totalDiscountAmount,
      orderDate: order.orderDate,
    };
  }

  private async checkProductsExistence(product_codes: string[]) {
    const products = await ProductModel.findMany({
      where: {
        code: {
          in: product_codes,
        },
      },
    });

    if (!products || products.length === 0) {
      throw new Error(
        `No products found with codes: ${product_codes.join(", ")}`
      );
    }

    return products;
  }

  private checkProductsInStock(products: Product[], product_codes: string[]) {
    const outOfStockProducts = products.filter(
      (product) => product.stock === 0
    );

    if (outOfStockProducts.length > 0) {
      throw new Error(
        `Some products are out of stock: ${outOfStockProducts
          .map((product) => product.name)
          .join(", ")}`
      );
    }

    const insufficientStockProducts = products.filter(
      (product) =>
        product.stock <
        product_codes.filter((code) => code === product.code).length
    );
    if (insufficientStockProducts.length > 0) {
      throw new Error(
        `Some products have insufficient stock: ${insufficientStockProducts
          .map((product) => product.name)
          .join(", ")}`
      );
    }
  }

  /**
   *
   * @param products
   * @returns [totalAmount, totalTaxAmount, totalDiscountAmount]
   */
  private calculateTotalAmount(products: Product[]) {
    return products.reduce(
      (sum, product) => {
        const taxAmount = product.price * (product.tax / 100);
        const discountAmount = product.price * ((product.discount ?? 0) / 100);

        const totalAmount = product.price + taxAmount - discountAmount;
        return [
          sum[0] + totalAmount,
          sum[1] + taxAmount,
          sum[2] + discountAmount,
        ];
      },
      [0, 0, 0]
    );
  }

  private async createOrder(
    products: Product[],
    product_codes: string[],
    totalAmount: number
  ) {
    return await prisma.$transaction(async () => {
      const orderId = await this.generateOrderId();

      // Update the stock of the products
      const updatePromises = products.map((product) =>
        ProductModel.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: product_codes.filter((code) => code === product.code)
                .length,
            },
          },
        })
      );

      await Promise.all(updatePromises);

      return OrderModel.create({
        data: {
          orderId,
          products: {
            connect: products.map((product) => ({ id: product.id })),
          },

          totalAmount,
        },
      });
    });
  }

  private async generateOrderId() {
    const lastOrder = await OrderModel.findFirst({
      orderBy: { id: "desc" },
    });
    const lastOrderId = lastOrder?.id;

    if (!lastOrderId) {
      return "ORD-0001";
    }

    const formattedId = (lastOrderId + 1).toString().padStart(4, "0");
    return `ORD-${formattedId}`;
  }
}
