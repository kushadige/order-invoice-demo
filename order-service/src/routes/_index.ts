import express from "express";
import orderRoutes from "./order.routes";
import productRoutes from "./product.routes";

const router = express.Router();

router.get("/", (_, res) => res.send("Order service is running"));
router.use("/api/orders", orderRoutes);
router.use("/api/products", productRoutes);

export default router;
