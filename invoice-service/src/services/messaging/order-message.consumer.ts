import { logger } from "@/lib/logger";
import { axiosInstance } from "@/lib/axios";
import { messageBroker } from "@/lib/broker";
import { messagingConfig } from "@/config/messaging";
import { OutboxStatus, type Outbox } from "@prisma/client";
import { type AxiosInstance } from "axios";
import { type MessageBrokerService } from "@/interfaces/message-broker";
import { type InvoiceService, invoiceService } from "@/services";

const retryLimit = 4;

class OrderConsumer {
  constructor(
    private readonly broker: MessageBrokerService,
    private readonly invoiceService: InvoiceService,
    private readonly axiosInstance: AxiosInstance
  ) {}

  async consumeOrders() {
    logger.info("Starting to consume messages from the 'orders' queue.");
    await this.broker.consume(
      messagingConfig.queues.orders,
      this.handleOrderMessage.bind(this)
    );
  }

  async handleOrderMessage(msg: string) {
    const message = JSON.parse(msg) as Outbox;

    for (let i = 0; i < retryLimit; i++) {
      try {
        const order = JSON.parse(message.message);
        await this.invoiceService.createInvoice(order);
        await this.updatePublisherOutbox(message.id, OutboxStatus.COMPLETED);
        break;
      } catch (error) {
        logger.error(
          `Retry ${i + 1}/${retryLimit}: Failed to create invoice`,
          error
        );
        if (i === retryLimit - 1) {
          await this.updatePublisherOutbox(message.id, OutboxStatus.FAILED);
        }
      }
    }
  }

  async updatePublisherOutbox(outboxId: number, status: OutboxStatus) {
    try {
      logger.info(`Updating outbox with id ${outboxId} to status ${status}`);
      await this.axiosInstance.post("/orders/update-outbox", {
        outboxId,
        status,
      });
    } catch (error) {
      logger.error(
        `Failed to update outbox with id ${outboxId} to status ${status}`,
        error
      );
    }
  }
}

export const orderConsumer = new OrderConsumer(
  messageBroker,
  invoiceService,
  axiosInstance
);
