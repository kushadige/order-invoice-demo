import { logger } from "@/lib/logger";
import { OutboxModel } from "@/models";
import { OutboxStatus, type Outbox } from "@prisma/client";

export interface IOutboxService {
  type: string;
  processOutboxMessages(): Promise<void>;
  createOutbox(message: any): Promise<void>;
  updateOutbox(outboxId: number, status: OutboxStatus): Promise<void>;
  getAllOutboxes(): Promise<Outbox[]>;
}

export abstract class OutboxService<T> implements IOutboxService {
  abstract type: string;

  async processOutboxMessages(): Promise<void> {
    try {
      logger.info(`Processing ${this.type} outbox messages...`);
      const pendingMessages = await this.getPendingMessages();
      logger.info(`Found ${pendingMessages.length} pending messages.`);

      for (const message of pendingMessages) {
        await this.sendMessage(message);
      }
    } catch (error) {
      logger.error(`Error processing ${this.type} outbox messages:`, error);
    }
  }

  protected async getPendingMessages(): Promise<Outbox[]> {
    return await OutboxModel.findMany({
      where: { status: "PENDING", type: this.type },
    });
  }

  protected abstract sendMessage(message: Outbox): Promise<void>;

  async createOutbox(messageData: T): Promise<void> {
    await OutboxModel.create({
      data: {
        message: JSON.stringify(messageData),
        type: this.type,
      },
    });
  }

  async updateOutbox(outboxId: number, status: OutboxStatus): Promise<void> {
    await OutboxModel.update({
      where: { id: outboxId },
      data: { status },
    });
  }

  async getAllOutboxes(): Promise<Outbox[]> {
    return await OutboxModel.findMany();
  }
}
