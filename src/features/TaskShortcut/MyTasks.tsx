import { useQuery } from '@tanstack/react-query';
import { TabsContent } from '@radix-ui/react-tabs';
import { formatDistance, format } from 'date-fns';

import { TASK_WIDGET_DATA } from '../Dashboard/Widgets/MyTasks/mockData';
import { TaskItem } from '../Dashboard/Widgets/MyTasks/TaskItem';

import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';
import { getMyTasks } from '@/api/task';

export function MyTasks() {
  const { data } = useQuery({
    queryKey: ['getMyTasks'],
    queryFn: () => getMyTasks(),
  });

  const filteredTasks = data || [];

  return (
    <Tabs defaultValue="all">
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
          {filteredTasks.map(({ id, dueDate, title, description, createdAt }) => {
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
              />
            );
          })}
        </ul>
      </TabsContent>
      <TabsContent value="completed" className="p-6">
        <ul className="flex flex-col items-end gap-2.5">
          {TASK_WIDGET_DATA.filter(({ isDone }) => isDone).map(({ id, isDone, isRead, time, title, description }) => {
            const formattedTime = formatDistance(time, new Date(), {
              addSuffix: true,
            });
            const formattedStartDate = format(new Date(), 'MMMM dd, yyyy');
            const formattedEndDate = format(new Date(), 'MMMM dd, yyyy');

            return (
              <TaskItem
                key={id}
                isDone={isDone}
                isRead={isRead}
                title={title}
                formattedDueDate={formattedTime}
                description={description}
                dueDate={formattedEndDate}
                startDate={formattedStartDate}
              />
            );
          })}
        </ul>
      </TabsContent>
      <TabsContent value="pastDue" className="p-6">
        <ul className="flex flex-col items-end gap-2.5">
          {TASK_WIDGET_DATA.filter(({ isPastDue }) => isPastDue).map(
            ({ id, isDone, isRead, time, title, description }) => {
              const formattedTime = formatDistance(time, new Date(), {
                addSuffix: true,
              });
              const formattedStartDate = format(new Date(), 'MMMM dd, yyyy');
              const formattedEndDate = format(new Date(), 'MMMM dd, yyyy');

              return (
                <TaskItem
                  key={id}
                  isDone={isDone}
                  isRead={isRead}
                  title={title}
                  formattedDueDate={formattedTime}
                  description={description}
                  dueDate={formattedEndDate}
                  startDate={formattedStartDate}
                />
              );
            },
          )}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
