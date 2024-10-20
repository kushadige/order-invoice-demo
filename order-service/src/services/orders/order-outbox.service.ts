import prisma from "@/lib/prisma";
import { OutboxService } from "../outbox/outbox.service";
import { orderPublisher } from "../messaging/order-message.publisher";
import { type CreateOrderResponse } from "@/schemas/order.schemas";
import { type Outbox } from "@prisma/client";

export class OrderOutboxService extends OutboxService<CreateOrderResponse> {
  type = "order";

  protected async sendMessage(message: Outbox): Promise<void> {
    await prisma.$transaction(async () => {
      await orderPublisher.publishOrderMessage(message);
      await this.updateOutbox(message.id, "IN_PROGRESS");
    });
  }

  async createOutbox(order: CreateOrderResponse): Promise<void> {
    await super.createOutbox(order);
  }
}

export const orderOutboxService = new OrderOutboxService();
