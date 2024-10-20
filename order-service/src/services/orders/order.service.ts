import { CreateOrderService } from "./create-order.service";
import { UpdateOrderService } from "./update-order.service";
import { QueryOrderService } from "./query-order.service";
import { DeleteOrderService } from "./delete-order.service";
import { OrderOutboxService } from "./order-outbox.service";
import {
  createOrderRequestSchema,
  type CreateOrderRequest,
  type CreateOrderResponse,
} from "@/schemas/order.schemas";
import type { OutboxStatus } from "@prisma/client";

export class OrderService {
  private createOrderService: CreateOrderService;
  private updateOrderService: UpdateOrderService;
  private queryOrderService: QueryOrderService;
  private deleteOrderService: DeleteOrderService;
  private orderOutboxService: OrderOutboxService;

  constructor() {
    this.createOrderService = new CreateOrderService();
    this.updateOrderService = new UpdateOrderService();
    this.queryOrderService = new QueryOrderService();
    this.deleteOrderService = new DeleteOrderService();
    this.orderOutboxService = new OrderOutboxService();
  }

  // Create order
  createOrder(orderData: CreateOrderRequest) {
    const validatedData = createOrderRequestSchema.parse(orderData);
    const { product_codes } = validatedData;
    return this.createOrderService.create(product_codes);
  }

  // Update order
  updateOrder(orderId: string, updatedData: any) {
    return this.updateOrderService.update(orderId, updatedData);
  }

  // Query order
  getOrderById(orderId: string) {
    return this.queryOrderService.getById(orderId);
  }

  getAllOrders() {
    return this.queryOrderService.getAll();
  }

  // Delete order
  deleteOrder(orderId: string) {
    return this.deleteOrderService.delete(orderId);
  }

  // Send order to outbox
  sendOrderToOutbox(order: CreateOrderResponse) {
    return this.orderOutboxService.createOutbox(order);
  }

  // Update outbox message
  updateOutboxMessage(outboxId: number, status: OutboxStatus) {
    return this.orderOutboxService.updateOutbox(outboxId, status);
  }

  // Process orders from outbox
  processOutboxMessages() {
    return this.orderOutboxService.processOutboxMessages();
  }

  // Get all outbox messages
  getAllOutboxMessages() {
    return this.orderOutboxService.getAllOutboxes();
  }
}

export const orderService = new OrderService();
