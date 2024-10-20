import prisma from "@/lib/prisma";

export const ProductModel = prisma.product;
export const OrderModel = prisma.order;
export const OutboxModel = prisma.outbox;
