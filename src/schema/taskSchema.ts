
import { z } from 'zod';

export const taskFormSchema = z.object({
  assignTo: z
    .string()
    .max(100, {
      message: 'Assignee must not be longer than 50 characters.',
    })
    .optional(),
  taskTitle: z
    .string()
    .min(1, {
      message: 'Task title is required.',
    })
    .max(50, {
      message: 'Task title must not be longer than 50 characters.',
    }),
  description: z
    .string()
    .min(1, {
      message: 'Description is required.',
    })
    .max(2000, {
      message: 'Description must not be longer than 200 characters.',
    }),
  dueDate: z.date({
    required_error: 'Due date is required.',
  }),
  collaborators: z.array(z.string()).optional(),
  variant: z.string().optional(),
  projectId: z.string().min(1, {
    message: 'Project Id is required.',
  }),
  boardLaneId: z.string().min(1, {
    message: 'Board Lane Id is required.',
  }),
});
