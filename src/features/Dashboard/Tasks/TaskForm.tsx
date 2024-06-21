import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

import { CustomIcon } from '../../CustomIcon';

import { Collaborators } from './Collaborators';
import { DueDatePicker } from './DueDatePicker';

import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { useBoolean } from '@/hooks/useBoolean';
import { taskFormSchema } from '@/schema/taskSchema';
import { TTaskFormSchema } from '@/types/task';
import { cn } from '@/utils/cn';
import { getProjectList } from '@/api/projects';
import { getBoardLaneList } from '@/api/boardLane/getBoardLaneList';
import { getAssigneeList } from '@/api/task/getAssigneeList';
import { getMyTasks } from '@/api/task';

export type TaskFormProps = {
  variant: 'create' | 'assign';
  values?: TTaskFormSchema;
  onSubmit: (values: TTaskFormSchema) => void | Promise<void>;
};

interface User {
  id: string;
  fullName: string;
  roleName: string;
}

const defaultValues: TTaskFormSchema = {
  taskTitle: '',
  description: '',
  dueDate: new Date(),
  collaborators: [],
  assignTo: '',
  projectId: '',
  boardLaneId: '',
};

export function TaskForm({ values = defaultValues, variant, onSubmit }: TaskFormProps) {
  const { value: isFormOpen, set: setIsFormOpen } = useBoolean(false);

  const form = useForm<TTaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: values,
  });

  const handleSubmit = async (data: typeof values) => {
    const modifiedData = { ...data, variant };
    await onSubmit(modifiedData);
    setIsFormOpen(false);
    await refetchOwnTasksList();
  };

  const { data: { list: projectList = [] } = {} } = useQuery({
    enabled: isFormOpen,
    queryKey: ['currentUser'],
    queryFn: () => getProjectList({ page: 1, perPage: 20 }),
  });

  const { refetch: refetchOwnTasksList } = useQuery({
    queryKey: ['getMyTasks'],
    queryFn: () => getMyTasks(),
    enabled: isFormOpen,
  });

  const { data: { list: boardLaneList = [] } = {} } = useQuery({
    enabled: isFormOpen,
    queryKey: ['getBoardLaneList'],
    queryFn: () => getBoardLaneList({ page: 1, perPage: 20 }),
  });

  const { data } = useQuery({
    enabled: isFormOpen,
    queryKey: ['getAssigneeList'],
    queryFn: () => getAssigneeList({ page: 1, perPage: 20, sortType: 'asc', currentUserId: '', search: '' }),
  });

  const assigneeUsers = data?.flatMap((item) => item.users) || [];
  const transformedAssigneeUsers = assigneeUsers.map((user) => ({
    value: user.id,
    label: user.fullName,
  }));
  useEffect(() => {
    form.reset(values);
  }, [form, isFormOpen, values]);

  const handleDataFromChild = (receivedData: User[]) => {
    const userIds = receivedData.map((user) => user.id);
    form.setValue('collaborators', userIds, { shouldDirty: true });
  };
  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <Button className="flex w-full items-center justify-start gap-2 p-3 font-semibold capitalize">
          <CustomIcon className="text-custom-200" variant={variant === 'create' ? 'file-plus' : 'file-pen'} />
          {variant === 'create' ? 'Create New Task' : 'Assign New Task'}
        </Button>
      </DialogTrigger>
      <DialogContent variant="top">
        <DialogClose asChild>
          <Button
            type="button"
            variant="secondary"
            className="absolute right-5 top-5 h-6 w-6 rounded-none bg-background p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-background hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5 p-5 sm:p-8">
            <h1 className="text-xl font-bold">{variant === 'create' ? 'New Task' : 'Assign a Task'}</h1>
            {variant === 'assign' && (
              <FormField
                control={form.control}
                name="assignTo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <FormLabel
                          className={cn(
                            'font-bold capitalize leading-7 text-custom-300',
                            form.formState.errors.assignTo && 'text-rose-500',
                          )}
                        >
                          Assign To
                        </FormLabel>
                        <Select
                          options={transformedAssigneeUsers}
                          value={
                            field.value
                              ? transformedAssigneeUsers.find((option) => option.value === field.value)
                              : undefined
                          }
                          onChange={(selectedOption) => {
                            if (selectedOption) {
                              field.onChange(selectedOption.value);
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="taskTitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.taskTitle && 'text-rose-500',
                        )}
                      >
                        Task
                      </FormLabel>
                      <Input
                        placeholder="Enter task title..."
                        className={cn(
                          'h-11 rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                          form.formState.errors.taskTitle && 'border-rose-500',
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.description && 'text-rose-500',
                        )}
                      >
                        Description
                      </FormLabel>
                      <Textarea
                        placeholder="Add description..."
                        {...field}
                        className={cn(
                          'resize-none rounded-lg border-2 border-custom-100 bg-custom-50 shadow-none placeholder:text-custom-200',
                          form.formState.errors.description && 'border-rose-500',
                        )}
                        cols={1}
                        rows={10}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.projectId && 'text-rose-500',
                        )}
                      >
                        Project
                      </FormLabel>
                      <select
                        {...field}
                        className={cn(
                          'h-11 w-full rounded-lg border-2 border-custom-100 bg-custom-50  placeholder:text-custom-200',
                          form.formState.errors.projectId && 'border-rose-500',
                        )}
                      >
                        <option value="">Select a project...</option>
                        {projectList.map((project) => (
                          <option key={project.id} value={Number(project.id)}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="boardLaneId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.boardLaneId && 'text-rose-500',
                        )}
                      >
                        Board Lane
                      </FormLabel>
                      <select
                        {...field}
                        className={cn(
                          'h-11 w-full  rounded-lg border-2 border-custom-100 bg-custom-50 placeholder:text-custom-200',
                          form.formState.errors.boardLaneId && 'border-rose-500',
                        )}
                      >
                        <option value="">Select a board lane...</option>
                        {boardLaneList.map((boardLane) => (
                          <option key={boardLane.id} value={Number(boardLane.id)}>
                            {boardLane.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.dueDate && 'text-rose-500',
                        )}
                      >
                        Due Date
                      </FormLabel>
                      <div className="relative">
                        <DueDatePicker
                          {...field}
                          className={`${form.formState.errors.dueDate ? 'border-rose-500' : ''}`}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collaborators"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FormLabel
                        className={cn(
                          'font-bold capitalize leading-7 text-custom-300',
                          form.formState.errors.collaborators && 'text-rose-500',
                        )}
                      >
                        Collaborators
                      </FormLabel>
                      <div className="relative">
                        <Collaborators {...field} sendDataToParent={handleDataFromChild} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center gap-2">
              <Button
                type="button"
                className="h-10 w-full rounded-lg"
                variant="secondary"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="h-10 w-full rounded-lg" variant="primary">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
