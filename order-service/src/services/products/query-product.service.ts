import { ProductModel } from "@/models";

export class QueryProductService {
  async getAll() {
    return ProductModel.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }
}
