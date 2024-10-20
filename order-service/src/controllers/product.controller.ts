import { productService } from "@/services/products/product.service";
import { type NextFunction, type Request, type Response } from "express";

class ProductController {
  async fetchAllProducts(_: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
