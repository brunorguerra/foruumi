import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Digite seu email',
    })
    .email({
      message: 'Digite um email válido',
    }),
  password: z.string().min(3, { message: 'Digite sua senha, mínimo de três caracteres' }),
});

export const registerFormSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Digite seu nome.',
    }),
    email: z.string().min(1, { message: 'Digite seu email' }).email({
      message: 'Digite um email válido.',
    }),
    password: z.string().min(3, { message: 'Digite uma senha, mínimo de três caracteres' }),
    confirmPassword: z.string().min(3, { message: 'Digite uma senha, mínimo de três caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais.',
    path: ['confirmPassword'],
  });
