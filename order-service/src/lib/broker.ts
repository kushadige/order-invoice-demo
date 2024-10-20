import { messagingConfig } from "@/config/messaging";
import { RabbitMQBroker } from "./rabbitmq-broker";
import { type IMessageBroker } from "@/interfaces/message-broker";

const brokers: Record<string, new () => IMessageBroker> = {
  rabbitmq: RabbitMQBroker,
};

export class BrokerFactory {
  static createBroker(type: string): IMessageBroker {
    const BrokerClass = brokers[type];
    if (!BrokerClass) {
      throw new Error("Unsupported broker type");
    }
    return new BrokerClass();
  }
}

export const messageBroker = BrokerFactory.createBroker(messagingConfig.broker);
