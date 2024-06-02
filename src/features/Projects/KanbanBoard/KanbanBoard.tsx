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
import { AddItemForm } from './AddItemForm';
import { defaultContainer } from './defaultData';
import { EditContainerForm } from './EditContainerForm';
import { EditItemForm } from './EditItemForm';
import { KanbanContainer } from './KanbanContainer';
import { KanbanItem } from './KanbanItem';

import { useSocketStore } from '@/lib/socketStore';
import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';
import { payload, ResponsePayload } from '@/types/socket.type';
import { TBoardLane } from '@/types/boardLane.type';
import { ACCOUNT_ID } from '@/constants/common';
import { BoardLaneResponse } from '@/types/kanban.type';

type DNDType = {
  id: number;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
  }[];
};

interface KanBanBoardProps {
  projectId: number;
}

type SelectedUpdateBoardLaneType = Pick<TBoardLane, 'name' | 'description'>;
export function KanbanBoard({ projectId }: KanBanBoardProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentId, setCurrentId] = useState<UniqueIdentifier>('');
  const [currentContainerId, setCurrentContainerId] = useState<UniqueIdentifier>('');
  const [containerName, setContainerName] = useState('');
  const [itemName, setItemName] = useState('');
  const [isAddContainerOpen, setIsAddContainerOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isEditContainerOpen, setIsEditContainerOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const { sendMessage, onEvent } = useSocketStore();
  const [containers, setContainers] = useState<DNDType[]>(defaultContainer);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!hasFetchedData) {
        await sendMessage('FETCH_BOARD_LANE', { message: 'FETCH BOARD LANE', data: { projectId } });

        onEvent('FETCH_BOARD_LANE_SUCCESS', async (response: BoardLaneResponse) => {
          const { data } = response;
          const dataArray = Object.values(data);
          const transformedDataArray: DNDType[] = dataArray.map((item) => {
            const { boardLane, items } = item;
            const newItem: DNDType = {
              id: boardLane.id,
              title: boardLane.name,
              items: items.map((i) => ({
                id: i.id,
                title: i.title,
              })),
            };
            return newItem;
          });
          setContainers(transformedDataArray);
          setHasFetchedData(true);
        });
      }
    };

    fetchData();
  }, [hasFetchedData, onEvent, projectId, sendMessage]);

  const onAddContainer = () => {
    if (!containerName) return;
    const createBoardLanePayload: payload<SelectedUpdateBoardLaneType> = {
      message: 'Create Board Lane',
      data: {
        name: containerName,
        description: `${containerName} description`,
      },
    };

    sendMessage('CREATE_BOARD_LANE', createBoardLanePayload);
    onEvent('CREATE_BOARD_LANE_SUCCESS', (response: ResponsePayload<TBoardLane>) => {
      const { data } = response;
      setContainers([
        ...containers,
        {
          id: data.id,
          title: data.name,
          items: [],
        },
      ]);
    });

    setContainerName('');
    setIsAddContainerOpen(false);
  };

  const deleteContainer = async (containerId: UniqueIdentifier) => {
    const updatedContainers = containers.filter((container) => container.id !== containerId);

    const deleteBoardLanePayload = {
      message: 'DELETE BOARD LANE',
      data: {
        id: containerId,
      },
    };

    await sendMessage('DELETE_BOARD_LANE', deleteBoardLanePayload);
    setContainers(updatedContainers);
  };

  const editContainer = async (containerId: UniqueIdentifier, newTitle: string) => {
    const containerIndex = containers.findIndex((container) => container.id === containerId);
    if (containerIndex === -1) return;

    const updateBoardLanePayload = {
      message: 'UPDATE BOARD LANE',
      data: {
        id: containerId,
        name: newTitle,
        description: `${newTitle} description`,
      },
    };

    await sendMessage('UPDATE_BOARD_LANE_INFORMATION', updateBoardLanePayload);
    onEvent('UPDATE_BOARD_LANE_INFORMATION_SUCCESS', (response: ResponsePayload<TBoardLane>) => {
      const { data } = response;
      const updatedContainers = [...containers];
      updatedContainers[containerIndex] = {
        ...updatedContainers[containerIndex],
        title: data.name,
      };
      setContainers(updatedContainers);
    });
  };

  const onAddItem = () => {
    if (!itemName) return;
    const id = `item-${nanoid()}`;
    const container = containers.find((item) => item.id === currentContainerId);
    sendMessage('CREATE_TASK', {
      message: 'Create Task',
      data: {
        title: itemName,
        description: `${itemName} description`,
        projectId,
        boardLaneId: container?.id,
      },
    });
    if (!container) return;

    container.items.push({
      id,
      title: itemName,
    });
    setContainers([...containers]);
    setItemName('');
    setIsAddItemOpen(false);
  };

  const deleteItem = async (containerId: UniqueIdentifier, itemId: UniqueIdentifier) => {
    const containerIndex = containers.findIndex((container) => container.id === containerId);
    if (containerIndex === -1) return;

    const itemIndex = containers[containerIndex].items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    const updatedContainerItems = [...containers[containerIndex].items];
    updatedContainerItems.splice(itemIndex, 1);

    const deleteTaskPayload = {
      message: 'DELETE TASK',
      data: {
        id: itemId,
      },
    };

    const updatedContainer = {
      ...containers[containerIndex],
      items: updatedContainerItems,
    };

    const updatedContainers = [...containers];
    updatedContainers[containerIndex] = updatedContainer;

    await sendMessage('DELETE_TASK', deleteTaskPayload);
    setContainers(updatedContainers);
  };

  const editItem = async (containerId: UniqueIdentifier, itemId: UniqueIdentifier, newTitle: string) => {
    const containerIndex = containers.findIndex((container) => container.id === containerId);

    if (containerIndex === -1) return;

    const updateTaskPayload = {
      message: 'UPDATE TASK',
      data: {
        id: itemId,
        title: newTitle,
        updatedById: ACCOUNT_ID,
      },
    };

    await sendMessage('UPDATE_TASK', updateTaskPayload);

    const itemIndex = containers[containerIndex].items.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) return;

    const updatedContainerItems = [...containers[containerIndex].items];
    updatedContainerItems[itemIndex] = {
      ...updatedContainerItems[itemIndex],
      title: newTitle,
    };

    const updatedContainer = {
      ...containers[containerIndex],
      items: updatedContainerItems,
    };

    const updatedContainers = [...containers];
    updatedContainers[containerIndex] = updatedContainer;

    setContainers(updatedContainers);
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

  const findItemTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, 'item');
    if (!container) return '';
    const item = container.items.find((x) => x.id === id);
    if (!item) return '';
    return item.title;
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
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    // Handling Container Sorting
    if (active && over && active.id !== over.id) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex((container) => container.id === active.id);
      const overContainerIndex = containers.findIndex((container) => container.id === over.id);
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      await sendMessage('DRAG_BOARD_LANE', {
        message: 'DRAG BOARD LANE',
        data: {
          newItems,
        },
      });
      setContainers(newItems);
    }

    // Handling item Sorting
    if (active && over && active.id !== over.id) {
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
        const dragTaskVerticalPayload = {
          message: 'DRAG TASK VERTICAL',
          data: {
            newItems,
          },
        };
        await sendMessage('DRAG_TASK_VERTICAL', dragTaskVerticalPayload);
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
        setIsEditContainerOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAddContainerOpen, isAddItemOpen, isEditItemOpen]);

  return (
    <section className="h-full flex-1 overflow-x-auto">
      <div className="">
        <div className="flex items-start gap-4">
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
                    <KanbanContainer
                      id={container.id}
                      title={container.title}
                      onDeleteContainer={deleteContainer}
                      itemCount={container.items.length}
                      currentContainerId={currentContainerId}
                      setCurrentContainerId={setCurrentContainerId}
                      isEditContainerOpen={isEditContainerOpen}
                      setIsEditContainerOpen={setIsEditContainerOpen}
                    >
                      {isEditContainerOpen && currentContainerId === container.id && (
                        <EditContainerForm
                          containerId={container.id}
                          onEditContainer={editContainer}
                          setIsEditContainerOpen={setIsEditContainerOpen}
                          title={container.title}
                        />
                      )}
                      <SortableContext items={container.items.map((i) => i.id)}>
                        <div
                          className={cn(
                            'flex max-h-[50rem] flex-col items-start gap-2 overflow-y-auto',
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
                                    onDeleteItem={deleteItem}
                                    containerId={container.id}
                                    setIsEditItemOpen={setIsEditItemOpen}
                                    setCurrentId={setCurrentId}
                                  />
                                )}
                                {!isEditItemOpen && currentId === i.id && (
                                  <KanbanItem
                                    key={i.id}
                                    title={i.title}
                                    id={i.id}
                                    onDeleteItem={deleteItem}
                                    containerId={container.id}
                                    setIsEditItemOpen={setIsEditItemOpen}
                                    setCurrentId={setCurrentId}
                                  />
                                )}
                                {isEditItemOpen && currentId === i.id && (
                                  <EditItemForm
                                    title={i.title}
                                    setIsEditItemOpen={setIsEditItemOpen}
                                    onEditItem={editItem}
                                    containerId={container.id}
                                    itemId={i.id}
                                  />
                                )}
                              </Fragment>
                            );
                          })}
                        </div>
                      </SortableContext>

                      <div className="p-2">
                        {!isAddItemOpen && currentContainerId === container.id && (
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setIsAddItemOpen((prev) => !prev);
                              setCurrentContainerId(container.id);
                            }}
                            className={cn('w-full justify-start px-4 py-3 text-custom-400 hover:bg-white/40')}
                          >
                            <PlusCircleIcon className="h-5 w-5" />
                            Add a card
                          </Button>
                        )}
                        {isAddItemOpen && currentContainerId === container.id && (
                          <AddItemForm
                            itemName={itemName}
                            setItemName={setItemName}
                            onAddItem={onAddItem}
                            setIsAddItemOpen={setIsAddItemOpen}
                          />
                        )}
                        {currentContainerId !== container.id && (
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setIsAddItemOpen((prev) => !prev);
                              setCurrentContainerId(container.id);
                            }}
                            className={cn('w-full justify-start px-4 py-3 text-custom-400 hover:bg-white/40')}
                          >
                            <PlusCircleIcon className="h-5 w-5" />
                            Add a card
                          </Button>
                        )}
                      </div>
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
                  title={findItemTitle(activeId)}
                  containerId={activeId}
                  onDeleteItem={deleteItem}
                  setIsEditItemOpen={setIsEditItemOpen}
                  setCurrentId={setCurrentId}
                />
              )}
              {/* Drag Overlay For Container */}
              {activeId && activeId.toString().includes('container') && (
                <KanbanContainer
                  id={activeId}
                  title={findContainerTitle(activeId)}
                  onDeleteContainer={deleteContainer}
                  itemCount={findContainerItems(activeId).length}
                  currentContainerId={currentContainerId}
                  setCurrentContainerId={setCurrentContainerId}
                  isEditContainerOpen={isEditContainerOpen}
                  setIsEditContainerOpen={setIsEditContainerOpen}
                >
                  <div
                    className={cn(
                      'flex max-h-[50rem] flex-col items-start gap-2 overflow-y-auto',
                      findContainerItems(activeId).length && 'p-2',
                    )}
                  >
                    {findContainerItems(activeId).map((i) => (
                      <KanbanItem
                        key={i.id}
                        title={i.title}
                        id={i.id}
                        containerId={activeId}
                        onDeleteItem={deleteItem}
                        setIsEditItemOpen={setIsEditItemOpen}
                        setCurrentId={setCurrentId}
                      />
                    ))}
                  </div>
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      className={cn('w-full justify-start px-4 py-3 text-custom-400 hover:bg-white/40')}
                    >
                      <PlusCircleIcon className="h-5 w-5" />
                      Add a card
                    </Button>
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
