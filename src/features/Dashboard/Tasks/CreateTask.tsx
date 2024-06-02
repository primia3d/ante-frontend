import { Plus } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { TaskForm, TaskFormProps } from './TaskForm';

import { Button } from '@/components/Button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/Dialog';
import { createTask } from '@/api/task/createTask';
import { useToast } from '@/components/Toaster';

type CreateTaskProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};
const formatDate = (isoDateString: string) => {
  const dateObject = new Date(isoDateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
export function CreateTask({ isOpen, setIsOpen }: CreateTaskProps) {
  const { toast } = useToast();
  const createTaskMutation = useMutation({
    mutationFn: createTask,
  });
  const handleSubmit: TaskFormProps['onSubmit'] = async (values) => {
    try {
      const dateString = values.dueDate.toISOString().split('T')[0];
      await createTaskMutation.mutateAsync({
        assignedToId: values.assignTo,
        title: values.taskTitle,
        description: values.description,
        dueDate: formatDate(dateString),
        projectId: Number(values.projectId),
        boardLaneId: Number(values.boardLaneId),
        assignedMode: values.variant === 'create' ? 'assign_to_self' : 'assign_to_others',
      });

      toast({
        description: 'New Task has successfully created!',
        className: 'bg-green-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    } catch (error) {
      toast({
        description: 'Oops! something went wrong',
        className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="absolute bottom-8 right-8 h-14 w-14 rounded-full bg-primary-100 text-white shadow hover:bg-primary-100/90 sm:bottom-14 sm:right-14"
          title="Create/Assign Task"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent
        variant="side"
        className="fixed bottom-36 right-10 z-[60] grid max-h-dvh w-full max-w-[14rem] space-y-8 overflow-y-auto rounded-t-xl rounded-bl-xl border-none bg-white p-3 text-[13px] duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full"
      >
        <ul className="flex flex-col gap-1">
          <li className="rounded-lg hover:bg-custom-100">
            <TaskForm onSubmit={handleSubmit} variant="create" />
          </li>
          <li className="rounded-lg hover:bg-custom-100">
            <TaskForm onSubmit={handleSubmit} variant="assign" />
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}
