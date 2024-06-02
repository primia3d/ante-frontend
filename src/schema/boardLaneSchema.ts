import { z } from 'zod';

export const boardLaneFormSchema = z.object({
  name: z
    .string({
      required_error: 'Board Lane name must be provided',
    })
    .max(200, {
      message: 'Board Lane name must not be longer than 200 characters.',
    }),
  description: z
    .string({
      required_error: 'Board Lane description is required',
    })
    .max(200, {
      message: 'Board Lane description must not be longer than 200 characters.',
    }),
});
