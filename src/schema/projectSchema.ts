import { z } from 'zod';

export const projectFormSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, {
      message: 'Project Name is required.',
    })
    .max(50, {
      message: 'Project Name must not be longer than 50 characters.',
    }),
  description: z
    .string()
    .min(1, {
      message: 'Project Description is required.',
    })
    .max(200, {
      message: 'Project Description must not be longer than 200 characters.',
    }),
  startDate: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  endDate: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  budget: z.number(),
  status: z.enum(['PROJECT', 'LEAD'] as const),
  clientInformation: z.object({
    firstName: z.string().min(1, {
      message: 'First name is required.',
    }),
    lastName: z.string().min(1, {
      message: 'Last name is required.',
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
    address: z
      .string()
      .min(1, {
        message: 'Address is required.',
      })
      .max(200, {
        message: 'Address must not be longer than 200 characters.',
      }),
  }),
});
