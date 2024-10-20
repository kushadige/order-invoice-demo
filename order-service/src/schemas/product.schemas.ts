import { z } from "zod";

export const productSchema = z.object({
  id: z.number().int().nonnegative(),
  code: z.string(),
  name: z.string(),
  price: z.number().positive(),
  tax: z.number().nonnegative(),
  discount: z.number().nullable().optional(),
  stock: z.number().int().nonnegative(),
});
