import express from "express";
import { productController } from "@/controllers/product.controller";

const router = express.Router();

router.get("/", productController.fetchAllProducts); // Get all products

export default router;
