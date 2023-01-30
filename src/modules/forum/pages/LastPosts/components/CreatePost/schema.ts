import { z } from 'zod';

export const createPostFormSchema = z.object({
  title: z.string().min(1, { message: 'Digite um título para seu post.' }),
  content: z.string().min(1, { message: 'Digite uma descrição para seu post.' }),
});
