import { z } from 'zod';

export const roleGroupFormSchema = z.object({
  name: z
    .string({
      required_error: 'Role Group name is required.',
    })
    .max(200, {
      message: 'Role Group name must not be longer than 200 characters.',
    }),
  description: z
    .string({
      required_error: 'Role Group description is required.',
    })
    .max(200, {
      message: 'Role Group description must not be longer than 200 characters.',
    }),
});
