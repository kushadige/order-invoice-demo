import { CreateProductService } from "./create-product.service";
import { QueryProductService } from "./query-product.service";

export class ProductService {
  private queryProductService: QueryProductService;
  private createProductService: CreateProductService;

  constructor() {
    this.queryProductService = new QueryProductService();
    this.createProductService = new CreateProductService();
  }

  // Query product
  getAllProducts() {
    return this.queryProductService.getAll();
  }

  // Create product
  createProduct(productData: any) {
    return this.createProductService.create(productData);
  }
}

export const productService = new ProductService();
