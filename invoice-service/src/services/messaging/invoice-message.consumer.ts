import { logger } from "@/lib/logger";
import { messageBroker } from "@/lib/broker";
import { messagingConfig } from "@/config/messaging";
import { type MessageBrokerService } from "@/interfaces/message-broker";
import { type Invoice } from "@prisma/client";

class InvoiceConsumer {
  private broker: MessageBrokerService;

  constructor(broker: MessageBrokerService) {
    this.broker = broker;
  }

  async consumeInvoices() {
    logger.info("Starting to consume messages from the 'invoices' queue.");
    await this.broker.consume(
      messagingConfig.queues.invoices,
      this.handleInvoiceMessage.bind(this)
    );
  }

  async handleInvoiceMessage(msg: string) {
    const invoice = JSON.parse(msg) as Invoice;
    // Process the invoice message
  }
}

export const invoiceConsumer = new InvoiceConsumer(messageBroker);
