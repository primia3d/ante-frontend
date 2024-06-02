import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

import { cn } from '@/utils/cn';

type KanbanContainerProps = {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title: string;

  currentContainerId: UniqueIdentifier;
};

export function KanbanContainer({ id, children, title, currentContainerId }: KanbanContainerProps) {
  const { attributes, setNodeRef, listeners, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'container',
    },
  });

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={cn(
        'flex h-full w-full min-w-96 max-w-96 flex-col rounded-xl bg-custom-100',
        isDragging && 'opacity-50',
      )}
    >
      <div>
        <div role="button" className="w-full text-xs" {...listeners}>
          <div className="flex items-center justify-between gap-2 p-2">
            {currentContainerId !== id && (
              <h1 className="break-all rounded-md px-4 py-2 text-[15px] font-bold text-custom-400">{title}</h1>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
