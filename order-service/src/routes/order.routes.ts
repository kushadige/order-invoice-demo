import express from "express";
import { orderController } from "../controllers/order.controller";

const router = express.Router();

router.get("/", orderController.fetchAllOrders); // Get all orders
router.get("/outbox", orderController.fetchAllOutboxes); // Get all outboxes
router.get("/:id", orderController.fetchOrderById); // Get single order by id
router.post("/", orderController.createOrder); // Create order
router.put("/:id", orderController.updateOrder); // Update order
router.delete("/:id", orderController.deleteOrder); // Delete order
router.post("/update-outbox", orderController.updateOutbox); // Update outbox

export default router;
