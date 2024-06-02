import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Ellipsis, PenIcon, Trash2Icon } from 'lucide-react';
import React, { MouseEvent } from 'react';

import { Button } from '@/components/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { cn } from '@/utils/cn';

type KanbanContainerProps = {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title: string;
  onDeleteContainer: (containerId: UniqueIdentifier) => void;
  itemCount: number;
  currentContainerId: UniqueIdentifier;
  setCurrentContainerId: React.Dispatch<React.SetStateAction<UniqueIdentifier>>;
  isEditContainerOpen: boolean;
  setIsEditContainerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface MyMouseEvent extends MouseEvent<HTMLDivElement> {
  stopPropagation: () => void;
}

export function KanbanContainer({
  id,
  children,
  title,
  onDeleteContainer,
  itemCount,
  currentContainerId,
  setCurrentContainerId,
  isEditContainerOpen,
  setIsEditContainerOpen,
}: KanbanContainerProps) {
  const { attributes, setNodeRef, listeners, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'container',
    },
  });

  const handleOpenEditForm = (e: MyMouseEvent) => {
    e.stopPropagation();
    setCurrentContainerId(id);
    setIsEditContainerOpen(true);
  };

  const handleDelete = (e: MyMouseEvent) => {
    e.stopPropagation();
    onDeleteContainer(id);
  };

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={cn('flex h-full w-full min-w-72 max-w-72 flex-col rounded-xl bg-gray-200', isDragging && 'opacity-50')}
    >
      <div>
        <DropdownMenu>
          <div role="button" className="w-full text-xs" {...listeners}>
            <div className="flex items-center justify-between gap-2 p-2">
              {currentContainerId !== id && (
                <>
                  <h1 className="break-all rounded-md px-4 py-2 text-[15px] font-semibold text-custom-400">
                    {title} (<span className="ml-1 font-semibold tracking-widest text-error-300">{itemCount}</span>)
                  </h1>

                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-custom-300 hover:bg-white/40 hover:text-custom-400"
                    >
                      <Ellipsis className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                </>
              )}
              {!isEditContainerOpen && currentContainerId === id && (
                <>
                  <h1 className="break-all rounded-md px-4 py-2 text-[15px] font-semibold text-custom-400">
                    {title} (<span className="ml-1 font-semibold tracking-widest text-error-300">{itemCount}</span>)
                  </h1>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-custom-300 hover:bg-white/40 hover:text-custom-400"
                    >
                      <Ellipsis className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                </>
              )}
            </div>
          </div>

          <DropdownMenuContent align="end" className={cn(isEditContainerOpen && 'hidden')}>
            <DropdownMenuItem onClick={handleOpenEditForm}>
              <PenIcon className="h-4 w-4" />
              Rename Container
            </DropdownMenuItem>
            <DropdownMenuItem className="text-error-300 focus:text-error-300" onClick={handleDelete}>
              <Trash2Icon className="h-4 w-4" />
              Delete Container
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </div>
  );
}
