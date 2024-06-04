import { z } from "zod";

// Quantity and price are strings because they are coming from the form
export const newTransactionSchema = z.object({
  product: z.string().min(1, "Select a product"),
  operation: z.enum(["in", "out"]),
  quantity: z.coerce.number().min(1),
  price: z.coerce.number().min(1),
});
