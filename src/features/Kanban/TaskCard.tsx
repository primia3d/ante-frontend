import { useState, useEffect, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { TrashIcon } from '@/components/TrashIcon/TrashIcon';
import { Id, Task } from '@/types/kanbanBoard';

interface TaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

export function TaskCard({ task, deleteTask, updateTask }: TaskCardProps) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((previous) => !previous);
    setMouseIsOver(false);
  };

  useEffect(() => {
    if (editMode) {
      textareaRef.current?.focus();
    }
  }, [editMode]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-gray-300 bg-gray-100 p-2.5 text-left opacity-30"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 bg-gray-100 p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-gray-300"
      >
        <textarea
          ref={textareaRef}
          className="h-[90%] w-full resize-none rounded border-black bg-transparent focus:outline-none"
          value={task.content}
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          toggleEditMode();
        }
      }}
      className="task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-gray-100 p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-gray-300"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      role="button"
      tabIndex={0}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-gray-700">
        {task.content}
      </p>

      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-gray-200 stroke-gray-500 p-2 opacity-60 hover:opacity-100"
          type="button"
          aria-label="Delete task"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}
