import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().max(35).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});
