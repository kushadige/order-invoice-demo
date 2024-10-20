import { AMQP_URL } from "./env";

export const messagingConfig = {
  broker: "rabbitmq",
  amqpUrl: AMQP_URL || "amqp://localhost",
  queues: {
    invoices: "invoices",
    orders: "orders",
  },
  consumerOptions: {
    noAck: false, // If the message requires acknowledgment
  },
};
