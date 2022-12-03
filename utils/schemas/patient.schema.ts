import { z } from "zod";

export const PatientSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(40)
    .regex(/([A-Za-z0-9])/),
  species: z.enum(["cat", "dog"]),
  DoB: z.date().max(new Date(), { message: "Patient must be born" }),
  weight: z.number().positive(),
  idealWeight: z.number().positive().optional(),
});

export type PatientInput = z.infer<typeof PatientSchema>;
