import { z } from "zod";
import { OutboxStatus } from "@prisma/client";
import { productSchema } from "./product.schemas";

// REQUEST SCHEMAS
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

export const createOrderRequestSchema = z.object({
  product_codes: z
    .array(
      z.string({
        message: "Product code must be a string.",
      }),
      {
        message: "`product_codes` must be an array of strings.",
      }
    )
    .min(1, {
      message: "At least one product code must be provided.",
    }),
});

export type CreateOrderRequest = z.infer<typeof createOrderRequestSchema>;

// RESPONSE SCHEMAS
export const createOrderResponseSchema = z.object({
  orderId: z.string({
    message: "Order id must be a string.",
  }),
  products: z.array(productSchema),
  totalAmount: z
    .number({
      message: "Total amount must be a number.",
    })
    .positive({
      message: "Total amount must be a positive number.",
    }),
  totalTaxAmount: z
    .number({
      message: "Total tax amount must be a number.",
    })
    .optional(),
  totalDiscountAmount: z
    .number({
      message: "Total discount amount must be a number.",
    })
    .optional(),
  orderDate: z.date({
    message: "Order date must be a date.",
  }),
});

export type CreateOrderResponse = z.infer<typeof createOrderResponseSchema>;
