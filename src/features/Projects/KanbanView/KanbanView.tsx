import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { PlusCircleIcon } from 'lucide-react';
import { nanoid } from 'nanoid';
import { Fragment, useEffect, useState } from 'react';

import { AddContainerForm } from './AddContainerForm';
import { defaultContainer } from './defaultData';
import { KanbanContainer } from './KanbanContainer';
import { KanbanItem } from './KanbanItem';

import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';

type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
    budget: number;
    startDate: string;
    endDate: string;
    status: string;
  }[];
};

export function KanbanView() {
  const [containers, setContainers] = useState<DNDType[]>(defaultContainer);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentId, setCurrentId] = useState<UniqueIdentifier>('');
  const [currentContainerId] = useState<UniqueIdentifier>('');
  const [containerName, setContainerName] = useState('');

  const [isAddContainerOpen, setIsAddContainerOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  const [isEditItemOpen, setIsEditItemOpen] = useState(false);

  const onAddContainer = () => {
    if (!containerName) return;
    const id = `container-${nanoid()}`;
    setContainers([
      ...containers,
      {
        id,
        title: containerName,
        items: [],
      },
    ]);
    setContainerName('');
    setIsAddContainerOpen(false);
  };

  // Find the value of the items
  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === 'container') {
      return containers.find((item) => item.id === id);
    }
    if (type === 'item') {
      return containers.find((container) => container.items.find((item) => item.id === id));
    }
  }

  const findItemProperty = (id: UniqueIdentifier | undefined, property: 'title' | 'status' | 'budget') => {
    const container = findValueOfItems(id, 'item');
    if (!container) return '';
    const item = container.items.find((x) => x.id === id);
    if (!item) return '';
    return item[property] || '';
  };

  const findContainerTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, 'container');
    if (!container) return '';
    return container.title;
  };

  const findContainerItems = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, 'container');
    if (!container) return [];
    return container.items;
  };

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
    setCurrentId(id);
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('item') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'item');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex((container) => container.id === activeContainer.id);
      const overContainerIndex = containers.findIndex((container) => container.id === overContainer.id);

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex((item) => item.id === active.id);
      const overitemIndex = overContainer.items.findIndex((item) => item.id === over.id);
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        const newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex,
        );

        setContainers(newItems);
      } else {
        // In different containers
        const newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(activeitemIndex, 1);
        newItems[overContainerIndex].items.splice(overitemIndex, 0, removeditem);
        setContainers(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'container');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex((container) => container.id === activeContainer.id);
      const overContainerIndex = containers.findIndex((container) => container.id === overContainer.id);

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex((item) => item.id === active.id);

      // Remove the active item from the active container and add it to the over container
      const newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(activeitemIndex, 1);
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
  };

  // This is the function that handles the sorting of the containers and items when the user is done dragging.
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes('container') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex((container) => container.id === active.id);
      const overContainerIndex = containers.findIndex((container) => container.id === over.id);
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('item') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'item');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex((container) => container.id === activeContainer.id);
      const overContainerIndex = containers.findIndex((container) => container.id === overContainer.id);
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex((item) => item.id === active.id);
      const overitemIndex = overContainer.items.findIndex((item) => item.id === over.id);

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        const newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex,
        );
        setContainers(newItems);
      } else {
        // In different containers
        const newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(activeitemIndex, 1);
        newItems[overContainerIndex].items.splice(overitemIndex, 0, removeditem);
        setContainers(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'container');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex((container) => container.id === activeContainer.id);
      const overContainerIndex = containers.findIndex((container) => container.id === overContainer.id);
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex((item) => item.id === active.id);

      const newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(activeitemIndex, 1);
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
    setActiveId(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isAddItemOpen) setIsAddItemOpen(false);
        if (isAddContainerOpen) setIsAddContainerOpen(false);
        if (isEditItemOpen) setIsEditItemOpen(false);
        // setIsEditContainerOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAddContainerOpen, isAddItemOpen, isEditItemOpen]);

  return (
    <section className="h-full flex-1 overflow-x-auto">
      <div className="h-full">
        <div className="flex h-full items-start gap-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={containers.map((i) => i.id)}>
              {containers.map((container) => {
                return (
                  <Fragment key={container.id}>
                    <KanbanContainer id={container.id} title={container.title} currentContainerId={currentContainerId}>
                      <SortableContext items={container.items.map((i) => i.id)}>
                        <div
                          className={cn(
                            'flex h-[calc(100dvh-360px)] flex-col items-start gap-4 overflow-y-auto',
                            container.items.length && 'p-2',
                          )}
                        >
                          {container.items.map((i) => {
                            return (
                              <Fragment key={i.id}>
                                {currentId !== i.id && (
                                  <KanbanItem
                                    key={i.id}
                                    title={i.title}
                                    id={i.id}
                                    budget={i.budget}
                                    status={i.status}
                                  />
                                )}
                                {!isEditItemOpen && currentId === i.id && (
                                  <KanbanItem
                                    key={i.id}
                                    title={i.title}
                                    id={i.id}
                                    budget={i.budget}
                                    status={i.status}
                                  />
                                )}
                              </Fragment>
                            );
                          })}
                        </div>
                      </SortableContext>
                    </KanbanContainer>
                  </Fragment>
                );
              })}
            </SortableContext>
            <DragOverlay adjustScale={false}>
              {/* Drag Overlay For item Item */}
              {activeId && activeId.toString().includes('item') && (
                <KanbanItem
                  id={activeId}
                  title={findItemProperty(activeId, 'title') as string}
                  budget={findItemProperty(activeId, 'budget') as number}
                  status={findItemProperty(activeId, 'status') as string}
                />
              )}
              {/* Drag Overlay For Container */}
              {activeId && activeId.toString().includes('container') && (
                <KanbanContainer
                  id={activeId}
                  title={findContainerTitle(activeId)}
                  currentContainerId={currentContainerId}
                >
                  <div
                    className={cn(
                      'flex h-[calc(100dvh-360px)] flex-col items-start gap-4 overflow-y-auto',
                      findContainerItems(activeId).length && 'p-2',
                    )}
                  >
                    {findContainerItems(activeId).map((i) => (
                      <KanbanItem key={i.id} title={i.title} id={i.id} budget={i.budget} status={i.status} />
                    ))}
                  </div>
                </KanbanContainer>
              )}
            </DragOverlay>
          </DndContext>
          {!isAddContainerOpen && (
            <Button
              className="w-full max-w-72 justify-start rounded-xl bg-white/90 px-4 py-3 hover:bg-white/50"
              onClick={() => setIsAddContainerOpen(true)}
            >
              <PlusCircleIcon className="h-5 w-5" />
              Add Container
            </Button>
          )}
          {isAddContainerOpen && (
            <AddContainerForm
              containerName={containerName}
              onAddContainer={onAddContainer}
              setContainerName={setContainerName}
              setIsAddContainerOpen={setIsAddContainerOpen}
            />
          )}
        </div>
      </div>
    </section>
  );
}
