import { z } from 'zod';

export const createCommentFormSchema = z.object({
  content: z.string().min(1, { message: 'Digite algum conteúdo!' }),
});
