import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/Dialog';
import { CustomIcon } from '@/features/CustomIcon';
import { useBoolean } from '@/hooks/useBoolean';
import { cn } from '@/utils/cn';
import { moveTaskToInProgress, moveTaskToDone, TMoveTaskResponse } from '@/api/task/moveTask';
import { useToast } from '@/components/Toaster';
import { patchIsReadMyTask } from '@/api/dashboard/isRead';

type TaskItemProps = {
  isRead: boolean;
  isDone: boolean;
  title: string;
  description: string;
  formattedDueDate: string;
  dueDate: string;
  startDate: string;
  createdBy: string;
  boardLane: string;
  timeAgo: string;
  image: string;
  id?: number;
};

function useTaskMutation<TData, TError = unknown, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
): UseMutationResult<TData, TError, TVariables> {
  const { toast } = useToast();

  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess: (data) => {
      toast({
        description: (data as TMoveTaskResponse).message,
        className: 'bg-green-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    },
    onError: (error: TError) => {
      toast({
        description: (error as Error).message,
        className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    },
  });
}

export function TaskItem({
  formattedDueDate,
  dueDate,
  startDate,
  isDone,
  isRead,
  title,
  description,
  createdBy,
  boardLane,
  timeAgo,
  image,
  id,
}: TaskItemProps) {
  const { value: isTaskItemOpen, set: setIsTaskItemOpen } = useBoolean(false);
  const moveTaskToInProgressMutation = useTaskMutation<TMoveTaskResponse, Error, { id: number }>(moveTaskToInProgress);
  const moveTaskToDoneMutation = useTaskMutation<TMoveTaskResponse, Error, { id: number }>(moveTaskToDone);
  const [isReadTask, setIsReadTask] = useState<boolean>(() => {
    const storedIsRead = localStorage.getItem(`isReadTask_${id}`);
    return storedIsRead ? (JSON.parse(storedIsRead) as boolean) : !!isRead;
  });

  useEffect(() => {
    localStorage.setItem(`isReadTask_${id}`, JSON.stringify(isReadTask));
  }, [isReadTask, id]);

  const handleStartTask = async () => {
    if (id !== undefined) await moveTaskToInProgressMutation.mutateAsync({ id });
    setIsTaskItemOpen(false);
  };

  const handleMarkTaskDone = async () => {
    if (id !== undefined) await moveTaskToDoneMutation.mutateAsync({ id });
    setIsTaskItemOpen(false);
  };

  const handleDialogOpen = async () => {
    setIsTaskItemOpen(true);
    if (!isReadTask && id !== undefined) {
      try {
        const updatedTask = await patchIsReadMyTask({ id: id.toString() });
        setIsReadTask(updatedTask.isRead);
      } catch (error) {
        console.error('Error marking task as read:', error);
      }
    }
  };

  return (
    <Dialog open={isTaskItemOpen} onOpenChange={setIsTaskItemOpen}>
      <DialogTrigger asChild>
        <li
          onClick={handleDialogOpen}
          className={cn(
            'relative w-full cursor-pointer rounded-xl px-12 py-5 transition-all duration-150 hover:w-[99%] hover:shadow',
            !isRead && 'bg-custom-100',
          )}
        >
          {isDone && <CustomIcon variant="check" className="absolute left-4 top-4 h-4 w-4 text-success-300" />}

          {!isDone && (
            <CustomIcon
              variant="circle"
              className={cn('absolute left-4 top-4 h-2.5 w-2.5', !isReadTask ? 'text-error-300' : 'text-custom-200')}
            />
          )}
          <h3 className="font-bold">{title}</h3>
          <span className="text-custom-300">{formattedDueDate}</span>
        </li>
      </DialogTrigger>
      <DialogContent variant="top" className="p-5 text-sm sm:p-8">
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
        <div>
          <h3 className="mb-5 flex items-center gap-2 text-[15px] font-bold">
            {isDone && (
              <>
                <CustomIcon variant="check" className="text-success-300" />
                Marked as Completed
              </>
            )}

            {!isDone && (
              <>
                <CustomIcon variant="newTask" className="text-primary-100" />
                Task Information
              </>
            )}
          </h3>
          <section>
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-custom-300">{boardLane}</p>
            <div className="my-4 flex items-center gap-2">
              {isDone && <Badge variant="primary">Marked as Done</Badge>}
              <div className="mb-4 flex w-full items-center after:mt-0.5 after:flex-1 after:border-t after:border-custom-200"></div>
            </div>
          </section>
          <p className="mb-8 text-pretty text-custom-300">{description}</p>

          <ul className="space-y-1">
            <li className="flex items-start gap-2 break-words py-1 text-custom-300">
              <span className="inline-block w-1/5 shrink-0 text-custom-200">Start Date:</span>
              {startDate}
            </li>
            <li className="flex items-start gap-2 break-words py-1 text-custom-300">
              <span className="inline-block w-1/5 shrink-0 text-custom-200">End Date:</span>
              {dueDate}
            </li>
          </ul>

          <section className="my-8">
            <div className="flex w-full items-center after:mt-0.5 after:flex-1 after:border-t after:border-custom-200">
              <p className="mr-4 font-semibold capitalize text-custom-300">Assigned By:</p>
            </div>
            <div className="flex items-center gap-4 py-3">
              <div className="h-9 w-9 overflow-hidden rounded-full">
                <img src={image} alt="" className="h-full w-full object-cover" />
              </div>
              <p className="font-bold">{createdBy}</p>
              <p className="ml-auto text-custom-300">{timeAgo}</p>
            </div>
          </section>
        </div>
        <DialogFooter className="flex-row flex-wrap gap-2 xs:flex-nowrap">
          <Button type="button" variant="secondary" className="w-full" onClick={() => setIsTaskItemOpen(false)}>
            Cancel
          </Button>
          <Button type="button" variant="primary" className="w-full" onClick={handleStartTask}>
            Start this Task
            <CustomIcon variant="externalLink" />
          </Button>
          <Button type="button" variant="secondary" className="w-full" onClick={handleMarkTaskDone}>
            Mark as Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
