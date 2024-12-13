import { z } from "zod";

export const cardSchema = z.object({
  title: z.string().min(2, { message: "Debe tener al menos 2 caracteres" }).max(255),
  description: z.string().min(2, { message: "Debe tener al menos 2 caracteres" }),
  position: z.number(),
  dueDate: z.date(),
});

export const cardUpdateSchema = cardSchema.partial();