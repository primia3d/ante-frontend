import { z } from 'zod';

export const scopeFormSchema = z.object({
  id: z
    .string()
    .min(1, {
      message: 'Scope id is required.',
    })
    .max(20, {
      message: 'Scope id must not be longer than 50 characters.',
    }),
  type: z.enum(['PAGE', 'FEATURE', 'ACTION', 'WIDGET']),
  name: z
    .string()
    .min(1, {
      message: 'Scope name is required.',
    })
    .max(200, {
      message: 'Scope name must not be longer than 200 characters.',
    }),
  description: z
    .string()
    .min(1, {
      message: 'Scope description is required.',
    })
    .max(200, {
      message: 'Scope description must not be longer than 200 characters.',
    }),
});
