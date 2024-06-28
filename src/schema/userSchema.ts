import { z } from 'zod';

export const userFormSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: 'Username is required.',
    })
    .max(200, {
      message: 'Username must not be longer than 200 characters.',
    }),
  password: z
    .string()
    .min(1, {
      message: 'Password is required.',
    })
    .max(200, {
      message: 'Password must not be longer than 200 characters.',
    }),
  roleID: z.string().min(1, {
    message: 'Role is required.',
  }),
  firstName: z
    .string()
    .min(1, {
      message: 'First name is required.',
    })
    .max(200, {
      message: 'First name must not be longer than 200 characters.',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Last name is required.',
    })
    .max(200, {
      message: 'Last name must not be longer than 200 characters.',
    }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required.',
    })
    .email(),
  contactNumber: z.string().min(1, {
    message: 'Contact number is required.',
  }),
  parentAccountId: z.string().optional(),
  image: z.string().optional(),
  // address: z
  //   .string()
  //   .min(1, {
  //     message: 'Address is required.',
  //   })
  //   .max(200, {
  //     message: 'Address must not be longer than 200 characters.',
  //   }),
});
