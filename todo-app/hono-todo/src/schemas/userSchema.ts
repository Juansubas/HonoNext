import { z } from 'zod';

// Validaciones Reusables
const nameSchema = z.string().min(2, { message: "Debe tener al menos 2 caracteres" }).max(50);
const emailSchema = z.preprocess((arg) => (typeof arg === 'string' ? arg.trim().toLowerCase() : arg), z.string().email({ message: "Formato de email inválido" }));
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Número de teléfono inválido" });

// Esquema para Crear Usuario
export const CreateUserSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  password: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
    { message: "La contraseña debe contener al menos una letra, un número y un carácter especial" }),
  age: z.number().int().min(18, { message: "Debes ser mayor de 18 años" }).max(120),
  email: emailSchema,
  phone: phoneSchema,
  birthDate: z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date()),
});

// Esquema para Usuario Completo
export const UserSchema = CreateUserSchema.extend({
  id: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Esquema para Actualizar Usuario
export const UpdateUserSchema = CreateUserSchema.partial();

export const idSchema = z.object({
  id: z.string()
  .min(1, { message: "ID inválido" })
  .transform((val) => parseInt(val, 10))
  .refine((val) => !isNaN(val), { message: "ID debe ser un número válido" })
})