import { z } from 'zod';

export const roleFormSchema = z.object({
  name: z
    .string({
      required_error: 'Role name is required.',
    })
    .max(200, {
      message: 'Role name must not be longer than 200 characters.',
    }),
  description: z
    .string({
      required_error: 'Role description is required.',
    })
    .max(200, {
      message: 'Role description must not be longer than 200 characters.',
    }),
  scopeIDs: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  placement: z.enum(['above', 'below'], {
    required_error: 'You need to select a type.',
  }),
  select: z.string({
    required_error: 'Please select an item to display.',
  }),
  roleGroupId: z.string({
    required_error: 'You need to select a role group',
  }),

  parentRoleId: z.string().optional(),
});
