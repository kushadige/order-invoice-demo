import { z } from "zod";
import { OutboxStatus } from "@prisma/client";

// REQUEST SCHEMAS
export const createInvoiceRequestSchema = z.object({
  orderId: z.string({
    message: "Order id must be a string.",
  }),
  products: z.array(z.any()),
  totalAmount: z
    .number({
      message: "Total amount must be a number.",
    })
    .positive({
      message: "Total amount must be a positive number.",
    }),
  orderDate: z.string({
    message: "Order date must be a string.",
  }),
});

export type CreateInvoiceRequest = z.infer<typeof createInvoiceRequestSchema>;

export const updateOutboxRequestSchema = z.object({
  outboxId: z
    .number({
      message: "Outbox id must be a number",
    })
    .int({
      message: "Outbox id must be an integer",
    })
    .positive({
      message: "Outbox id must be a positive integer",
    }),
  status: z.enum(
    [
      OutboxStatus.PENDING,
      OutboxStatus.IN_PROGRESS,
      OutboxStatus.FAILED,
      OutboxStatus.COMPLETED,
    ],
    {
      message:
        "Status must be one of 'PENDING', 'IN_PROGRESS', 'FAILED', 'COMPLETED'",
    }
  ),
});

export type UpdateOutboxRequest = z.infer<typeof updateOutboxRequestSchema>;

// RESPONSE SCHEMAS
