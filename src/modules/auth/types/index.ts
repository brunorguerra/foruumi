import { z } from 'zod';

import { loginFormSchema, registerFormSchema } from '../schemas';

export type LoginFormData = z.infer<typeof loginFormSchema>;

export type RegisterFormData = z.infer<typeof registerFormSchema>;
