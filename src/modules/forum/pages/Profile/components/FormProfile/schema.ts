import { z } from 'zod';

export const formProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Digite seu nome' })
    .transform((name) => name.toLowerCase()),
  email: z
    .string()
    .min(1, { message: 'Digite seu email' })
    .email({ message: 'Digite um email válido' })
    .transform((email) => email.toLowerCase()),
  currentPassword: z
    .string()
    .min(1, { message: 'Digite sua senha atual para confirmar qualquer alteração' })
    .transform((currentPassword) => currentPassword.toLowerCase()),
  newPassword: z
    .string()
    .optional()
    .transform((newPassword) => newPassword?.toLowerCase()),
});
