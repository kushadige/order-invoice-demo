import amqp from "amqplib";
import { logger } from "@/lib/logger";
import { messagingConfig } from "@/config/messaging";
import { MessageBrokerService } from "@/interfaces/message-broker";

export class RabbitMQBroker extends MessageBrokerService {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async connect() {
    this.connection = await amqp.connect(messagingConfig.amqpUrl);
    this.channel = await this.connection.createChannel();
    await this.setupQueues(this.channel);
    logger.info("RabbitMQ connected successfully.");
    return this.channel;
  }

  async publish(queue: string, message: string) {
    this.checkChannelInitialized();
    const msgBuffer = Buffer.from(message);
    this.channel!.sendToQueue(queue, msgBuffer, { persistent: true });
    logger.info(`Message sent to queue [${queue}]: ${message}`);
  }

  async consume(queue: string, callback: (msg: string) => Promise<void>) {
    this.checkChannelInitialized();
    this.channel!.consume(
      queue,
      async (msg) => {
        if (msg) {
          const message = msg.content.toString();
          logger.info(`Received message from queue (${queue}): ${message}`);
          callback(message)
            .then(() => this.ackMessage(msg))
            .catch((error) => {
              logger.error("Error processing message:", error);
            });
        }
      },
      { noAck: messagingConfig.consumerOptions.noAck }
    );
  }

  private ackMessage(msg: amqp.ConsumeMessage) {
    this.checkChannelInitialized();
    this.channel!.ack(msg);
  }

  private checkChannelInitialized() {
    if (!this.channel) {
      throw new Error("Channel is not initialized.");
    }
  }

  private async setupQueues(channel: amqp.Channel) {
    await Promise.all(
      Object.values(messagingConfig.queues).map((queue) =>
        channel.assertQueue(queue, { durable: true })
      )
    );
    logger.info("Queues are set up successfully.");
  }

  async close() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
    logger.info("RabbitMQ connection closed.");
  }
}
