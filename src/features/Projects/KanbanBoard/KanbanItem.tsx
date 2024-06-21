import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Ellipsis, PenIcon, Trash2Icon, EyeIcon } from 'lucide-react';
import { MouseEvent, useState } from 'react';
import { format, formatDistance } from 'date-fns';

import { Button } from '@/components/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { cn } from '@/utils/cn';
import { getTaskInformationById } from '@/api/task';
import { TTask } from '@/types/task';
import { TaskItem } from '@/features/Dashboard/Widgets/MyTasks/TaskItem';

type KanbanItemProps = {
  id: UniqueIdentifier;
  containerId: UniqueIdentifier;
  title: string;
  onDeleteItem: (containerId: UniqueIdentifier, itemId: UniqueIdentifier) => void;
  setIsEditItemOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentId: React.Dispatch<React.SetStateAction<UniqueIdentifier>>;
};

interface MyMouseEvent extends MouseEvent<HTMLDivElement> {
  stopPropagation: () => void;
}

export function KanbanItem({ id, title, onDeleteItem, containerId, setIsEditItemOpen, setCurrentId }: KanbanItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'item',
    },
  });

  const [task, setTask] = useState<TTask | null>(null);
  const [formattedTimeDuration, setFormattedTimeDuration] = useState<string>('');
  const [formattedStartDate, setFormattedStartDate] = useState<string>('');
  const [formattedEndDate, setFormattedEndDate] = useState<string>('');

  const handleViewTask = async () => {
    const data = await getTaskInformationById({ id: Number(id) });
    setTask(data);

    const timeDuration = formatDistance(data.dueDate.toString(), new Date(), {
      addSuffix: true,
    });

    const startDate = format(data.createdAt.toString(), 'MMMM dd, yyyy');
    const endDate = format(data.dueDate.toString(), 'MMMM dd, yyyy');

    setFormattedTimeDuration(timeDuration);
    setFormattedStartDate(startDate);
    setFormattedEndDate(endDate);
  };

  const handleOpenEditForm = (e: MyMouseEvent) => {
    e.stopPropagation();
    setCurrentId(id);
    setIsEditItemOpen(true);
  };

  const handleDelete = (e: MyMouseEvent) => {
    e.stopPropagation();
    onDeleteItem(containerId, id);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={cn(
        'group w-full cursor-pointer list-none rounded-xl border-2 border-transparent bg-custom-50 hover:border-primary-100',
        isDragging && 'opacity-50',
      )}
    >
      <div>
        <DropdownMenu>
          <div className="relative w-full break-words p-2 text-sm text-custom-400" {...listeners}>
            {title}
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                className="absolute right-2 top-1  flex h-7 w-7 items-center justify-center rounded-full bg-background hover:bg-gray-100"
              >
                <Ellipsis className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleViewTask}>
              <EyeIcon className="h-4 w-4" />
              View Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenEditForm}>
              <PenIcon className="h-4 w-4" />
              Edit Item
            </DropdownMenuItem>
            <DropdownMenuItem className="text-error-300 focus:text-error-300" onClick={handleDelete}>
              <Trash2Icon className="h-4 w-4" />
              Delete Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {task ? (
        <TaskItem
          key={task.id}
          isDone={false}
          isRead={false}
          title={task.title}
          formattedDueDate={formattedTimeDuration}
          description={task?.description || ''}
          dueDate={formattedEndDate}
          startDate={formattedStartDate}
          createdBy={task.createdBy?.name} 
          boardLane={task.boardLane?.name} 
          timeAgo={task.timeAgo} 
        />
      ) : null}
    </div>
  );
}
