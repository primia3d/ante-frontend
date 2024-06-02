import { useCallback, useMemo, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

import { ColumnContainer } from './ColumnContainer';
import { TaskCard } from './TaskCard';

import { Column, Id, Task } from '@/types/kanbanBoard';
import PlusIcon from '@/components/PlusIcon/PlusIcon';

const defaultCols: Column[] = [
  {
    id: 'todo',
    title: 'Todo',
  },
  {
    id: 'doing',
    title: 'Work in progress',
  },
  {
    id: 'done',
    title: 'Done',
  },
];

const defaultTasks: Task[] = [
  {
    id: '1',
    columnId: 'todo',
    content: 'List admin APIs for dashboard',
  },
  {
    id: '2',
    columnId: 'todo',
    content:
      'Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation',
  },
  {
    id: '3',
    columnId: 'doing',
    content: 'Conduct security testing',
  },
  {
    id: '4',
    columnId: 'doing',
    content: 'Analyze competitors',
  },
  {
    id: '5',
    columnId: 'done',
    content: 'Create UI kit documentation',
  },
  {
    id: '6',
    columnId: 'done',
    content: 'Dev meeting',
  },
  {
    id: '7',
    columnId: 'done',
    content: 'Deliver dashboard prototype',
  },
  {
    id: '8',
    columnId: 'todo',
    content: 'Optimize application performance',
  },
  {
    id: '9',
    columnId: 'todo',
    content: 'Implement data validation',
  },
  {
    id: '10',
    columnId: 'todo',
    content: 'Design database schema',
  },
  {
    id: '11',
    columnId: 'todo',
    content: 'Integrate SSL web certificates into workflow',
  },
  {
    id: '12',
    columnId: 'doing',
    content: 'Implement error logging and monitoring',
  },
  {
    id: '13',
    columnId: 'doing',
    content: 'Design and implement responsive UI',
  },
];

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  };

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  const handleUpdateColumn = useCallback(
    (id: Id, title: string) => {
      const newColumns = columns.map((col) => {
        if (col.id !== id) return col;
        return { ...col, title };
      });

      setColumns(newColumns);
    },
    [columns],
  );

  const onDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  }, []);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === 'Column';
    if (!isActiveAColumn) return;

    setColumns((_columns) => {
      const activeColumnIndex = _columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = _columns.findIndex((col) => col.id === overId);
      return arrayMove(_columns, activeColumnIndex, overColumnIndex);
    });
  }, []);

  const onDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((_tasks) => {
        const activeIndex = _tasks.findIndex((t) => t.id === activeId);
        const overIndex = _tasks.findIndex((t) => t.id === overId);

        if (_tasks[activeIndex].columnId !== _tasks[overIndex].columnId) {
          const updatedTasks = _tasks.map((task, index) => {
            if (index === activeIndex) {
              return { ...task, columnId: _tasks[overIndex].columnId };
            }
            return task;
          });

          return arrayMove(updatedTasks, activeIndex, overIndex - 1);
        }

        return arrayMove(_tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask && isOverAColumn) {
      setTasks((_tasks) => {
        const activeIndex = _tasks.findIndex((t) => t.id === activeId);

        const updatedTasks = _tasks.map((task, index) => {
          if (index === activeIndex) {
            return { ...task, columnId: overId };
          }
          return task;
        });

        return updatedTasks;
      });
    }
  }, []);
  const handleCreateNewColumn = () => {
    createNewColumn();
  };
  const handleDeleteColumn = (id: Id) => {
    deleteColumn(id);
  };
  const handleCreateTask = (columnId: Id) => {
    createTask(columnId);
  };

  const handleDeleteTask = (id: Id) => {
    deleteTask(id);
  };

  const handleUpdateTask = (id: Id, content: string) => {
    updateTask(id, content);
  };

  return (
    <div
      className="
         m-auto
         flex
         min-h-screen
         w-full
         items-center
         overflow-x-auto
         overflow-y-hidden
         px-[40px]
    "
    >
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={handleDeleteColumn}
                  updateColumn={handleUpdateColumn}
                  createTask={handleCreateTask}
                  deleteTask={handleDeleteTask}
                  updateTask={handleUpdateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={handleCreateNewColumn}
            type="button" // Add explicit type attribute for button
            className="
       bg-mainBackgroundColor
       border-columnBackgroundColor
       flex
       h-[60px]
       w-[350px]
       min-w-[350px]
       cursor-pointer
       gap-2
       rounded-lg
       border-2
       p-4
       ring-rose-500
       hover:ring-2
       "
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={handleDeleteColumn}
                updateColumn={handleUpdateColumn}
                createTask={handleCreateTask}
                deleteTask={handleDeleteTask}
                updateTask={handleUpdateTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && <TaskCard task={activeTask} deleteTask={handleDeleteTask} updateTask={handleUpdateTask} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}
