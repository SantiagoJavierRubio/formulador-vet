import { z } from "zod";

export const DietSchema = z.object({
  adjFactor: z.number(),
  weightPercentage: z.number().optional(),
});

export type Diet = z.infer<typeof DietSchema>;
