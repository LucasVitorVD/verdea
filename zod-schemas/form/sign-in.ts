import { z } from "zod";

export const signInFormSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type SignInFormSchemaType = z.infer<typeof signInFormSchema>;