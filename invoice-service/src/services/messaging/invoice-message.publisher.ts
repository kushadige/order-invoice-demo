import { messageBroker } from "@/lib/broker";
import { type MessageBrokerService } from "@/interfaces/message-broker";
import { type Outbox } from "@prisma/client";

class InvoicePublisher {
  private broker: MessageBrokerService;

  constructor(broker: MessageBrokerService) {
    this.broker = broker;
  }

  async publishInvoiceMessage(message: Outbox) {
    await this.broker.publish("invoices", JSON.stringify(message));
  }
}

export const invoicePublisher = new InvoicePublisher(messageBroker);
