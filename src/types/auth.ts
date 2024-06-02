import { z } from 'zod';

import { loginSchema } from '@/schema/loginSchema';

export type TLoginSchema = z.infer<typeof loginSchema>;
