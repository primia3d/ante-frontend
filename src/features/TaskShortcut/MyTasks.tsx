import { useQuery } from '@tanstack/react-query';
import { TabsContent } from '@radix-ui/react-tabs';
import { formatDistance, format } from 'date-fns';
import { useState } from 'react';

import { TaskItem } from '../Dashboard/Widgets/MyTasks/TaskItem';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';
import { getMyTasks } from '@/api/task';
import { TaskWidgetTabs } from '@/types/task';

export function MyTasks() {
  const [tab, setTab] = useState<TaskWidgetTabs>('all');

  const { data } = useQuery({
    queryKey: ['getMyTasks'],
    queryFn: () => getMyTasks(),
  });

  const handleTabChange = (newTab: string) => setTab(newTab as TaskWidgetTabs);

  let filteredTasks = data || [];
  if (data) {
    switch (tab) {
      case 'completed':
        filteredTasks = data.filter((task) => task.boardLane.key === 'DONE');
        break;
      case 'pastDue':
        filteredTasks = data.filter((task) => task.isPastDue === true);
        break;
      default:
        filteredTasks = data;
    }
  }

  return (
    <Tabs defaultValue="all" onValueChange={handleTabChange}>
      <TabsList className="h-auto w-full justify-evenly bg-background">
        <TabsTrigger
          value="all"
          className="h-9 rounded-full px-4 text-custom-300 data-[state=active]:bg-custom-100 data-[state-active]:font-bold data-[state=active]:shadow-none"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="h-9 rounded-full px-4 text-custom-300 data-[state=active]:bg-custom-100 data-[state-active]:font-bold data-[state=active]:shadow-none"
        >
          Completed
        </TabsTrigger>
        <TabsTrigger
          value="pastDue"
          className="h-9 rounded-full px-4 text-custom-300 data-[state=active]:bg-custom-100 data-[state-active]:font-bold data-[state=active]:shadow-none"
        >
          Past Due
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="p-6">
        <ul className="flex flex-col items-end gap-2.5">
          {filteredTasks.map(({ id, dueDate, title, description, createdAt, createdBy, boardLane, timeAgo, image }) => {
            const formattedTime = formatDistance(dueDate.toString(), new Date(), {
              addSuffix: true,
            });
            const formattedStartDate = format(createdAt.toString(), 'MMMM dd, yyyy');
            const formattedEndDate = format(dueDate.toString(), 'MMMM dd, yyyy');

            return (
              <TaskItem
                key={id}
                isDone={false}
                isRead={false}
                title={title}
                formattedDueDate={formattedTime}
                description={description}
                dueDate={formattedEndDate}
                startDate={formattedStartDate}
                createdBy={createdBy?.name}
                boardLane={boardLane?.name}
                timeAgo={timeAgo}
                image={image}
              />
            );
          })}
        </ul>
      </TabsContent>
      <TabsContent value="completed" className="p-6">
        <ul className="flex flex-col items-end gap-2.5">
          {filteredTasks
            .filter(({ boardLane }) => boardLane.key === 'DONE')
            .map(({ id, dueDate, title, description, createdAt, createdBy, boardLane, timeAgo, image }) => {
              const formattedTime = formatDistance(dueDate.toString(), new Date(), {
                addSuffix: true,
              });
              const formattedStartDate = format(createdAt.toString(), 'MMMM dd, yyyy');
              const formattedEndDate = format(dueDate.toString(), 'MMMM dd, yyyy');

              return (
                <TaskItem
                  key={id}
                  isDone={true}
                  isRead={false}
                  title={title}
                  formattedDueDate={formattedTime}
                  description={description}
                  dueDate={formattedEndDate}
                  startDate={formattedStartDate}
                  createdBy={createdBy?.name}
                  boardLane={boardLane?.name}
                  timeAgo={timeAgo}
                  image={image}
                />
              );
            })}
        </ul>
      </TabsContent>
      <TabsContent value="pastDue" className="p-6">
        <ul className="flex flex-col items-end gap-2.5">
          {filteredTasks
            .filter(({ isPastDue }) => isPastDue)
            .map(({ id, dueDate, title, description, createdAt, createdBy, boardLane, timeAgo, image }) => {
              const formattedTime = formatDistance(dueDate.toString(), new Date(), {
                addSuffix: true,
              });
              const formattedStartDate = format(createdAt.toString(), 'MMMM dd, yyyy');
              const formattedEndDate = format(dueDate.toString(), 'MMMM dd, yyyy');

              return (
                <TaskItem
                  key={id}
                  isDone={false}
                  isRead={false}
                  title={title}
                  formattedDueDate={formattedTime}
                  description={description}
                  dueDate={formattedEndDate}
                  startDate={formattedStartDate}
                  createdBy={createdBy?.name}
                  boardLane={boardLane?.name}
                  timeAgo={timeAgo}
                  image={image}
                />
              );
            })}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
