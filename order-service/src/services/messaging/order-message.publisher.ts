import { messageBroker } from "@/lib/broker";
import { type MessageBrokerService } from "@/interfaces/message-broker";
import { type Outbox } from "@prisma/client";

class OrderPublisher {
  private broker: MessageBrokerService;

  constructor(broker: MessageBrokerService) {
    this.broker = broker;
  }

  async publishOrderMessage(message: Outbox) {
    await this.broker.publish("orders", JSON.stringify(message));
  }
}

export const orderPublisher = new OrderPublisher(messageBroker);
