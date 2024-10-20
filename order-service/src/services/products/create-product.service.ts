import { ProductModel } from "@/models";

export class CreateProductService {
  async create(productData: any) {
    // ...
  }

  private async generateProductId() {
    const lastProduct = await ProductModel.findFirst({
      orderBy: { id: "desc" },
    });
    const lastProductId = lastProduct?.id;

    if (!lastProductId) {
      return "PRD-0001";
    }

    const formattedId = (lastProductId + 1).toString().padStart(4, "0");
    return `PRD-${formattedId}`;
  }
}
