import { z } from 'zod';

export const loginSchema = z.object({
  email: z.preprocess((arg) => (typeof arg === 'string' ? arg.trim().toLowerCase() : arg), z.string().email({ message: "Formato de email inválido" })),
  password: z.string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
      { message: "La contraseña debe contener al menos una letra, un número y un carácter especial" }),
})