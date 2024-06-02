import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Task } from './Task';

interface ColumnProps {
  id: string;
  tasks: string[];
}

export function Column({ id, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="w-60 rounded-md bg-gray-100 p-4">
      <h2 className="mb-2 text-xl font-bold capitalize">{id}</h2>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task, index) => (
          <Task key={task} id={task} index={index} />
        ))}
      </SortableContext>
    </div>
  );
}
