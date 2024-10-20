import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import {
  createOrderRequestSchema,
  updateOutboxRequestSchema,
} from "@/schemas/order.schemas";
import { orderService } from "@/services";
import { type NextFunction, type Request, type Response } from "express";

class OrderController {
  async fetchAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async fetchOrderById(req: Request, res: Response, next: NextFunction) {
    next(new Error("Not implemented (fetchOrderById)"));
  }

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      await prisma.$transaction(async () => {
        const order = await orderService.createOrder(data);
        await orderService.sendOrderToOutbox(order);
        logger.info(`Order created with data: ${JSON.stringify(order)}`);

        res.status(201).json({
          message: "Order created successfully",
          order,
        });
      });
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    next(new Error("Not implemented (updateOrder)"));
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    next(new Error("Not implemented (deleteOrder)"));
  }

  async fetchAllOutboxes(req: Request, res: Response, next: NextFunction) {
    try {
      const outboxes = await orderService.getAllOutboxMessages();
      res.status(200).json(outboxes);
    } catch (error) {
      return next(error);
    }
  }

  async updateOutbox(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = updateOutboxRequestSchema.parse(req.body);

      const { outboxId, status } = validatedData;
      await orderService.updateOutboxMessage(outboxId, status);

      res.status(200).json({ message: "Outbox updated successfully." });
    } catch (error) {
      return next(error);
    }
  }
}

export const orderController = new OrderController();
