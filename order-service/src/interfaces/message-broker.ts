import amqp from "amqplib";

export interface IMessageBroker {
  connect(): Promise<amqp.Channel>;
  publish(queue: string, message: string): Promise<void>;
  consume(
    queue: string,
    callback: (msg: string) => Promise<void>
  ): Promise<void>;
  close(): Promise<void>;
}

export abstract class MessageBrokerService implements IMessageBroker {
  abstract connect(): Promise<amqp.Channel>;
  abstract publish(queue: string, message: string): Promise<void>;
  abstract consume(
    queue: string,
    callback: (msg: string) => Promise<void>
  ): Promise<void>;
  abstract close(): Promise<void>;
}
