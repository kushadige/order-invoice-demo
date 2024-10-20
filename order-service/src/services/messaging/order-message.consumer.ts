import { type MessageBrokerService } from "@/interfaces/message-broker";
import { messageBroker } from "@/lib/broker";

class OrderConsumer {
  private broker: MessageBrokerService;

  constructor(broker: MessageBrokerService) {
    this.broker = broker;
  }

  async consumeOrders() {
    await this.broker.consume("orders", async (msg: string) => {
      const order = JSON.parse(msg);
      // Process the order message
    });
  }
}

export const orderConsumer = new OrderConsumer(messageBroker);
