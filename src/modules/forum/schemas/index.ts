import { z } from 'zod';

export const createPostFormSchema = z.object({
  title: z.string().min(1, { message: 'Digite um título para seu post.' }),
  content: z.string().min(1, { message: 'Digite uma descrição para seu post.' }),
});

export const createCommentFormSchema = z.object({
  content: z.string().min(1, { message: 'Digite algum conteúdo!' }),
});

export const updateProfileFormSchema = z.object({
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
