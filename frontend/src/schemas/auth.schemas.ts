import { z } from "zod";

const emailSchema = z.email("E-mail inválido").min(1, "O e-mail é obrigatório");
const passwordSchema = z
  .string()
  .min(6, "A senha deve ter pelo menos 6 caracteres");
const nameSchema = z.string().min(2, "O nome deve ter pelo menos 2 caracteres");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Tipos
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
