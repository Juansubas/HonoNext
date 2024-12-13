import { z } from "zod";

export const listSchema = z.object({
  name: z.string().min(2, { message: "Debe tener al menos 2 caracteres" }).max(50),
  description: z.string().min(2, { message: "Debe tener al menos 2 caracteres" }).max(50)
});


export const listUpdateSchema = listSchema.partial();