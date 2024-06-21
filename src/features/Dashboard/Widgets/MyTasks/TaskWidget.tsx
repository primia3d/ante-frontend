import { useQuery } from '@tanstack/react-query';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { formatDistance, format } from 'date-fns';

// import { TASK_WIDGET_DATA } from './mockData';
import { TaskItem } from './TaskItem';

import { Button } from '@/components/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { cn } from '@/utils/cn';
import { TaskWidgetTabs } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { getMyTasks } from '@/api/task';

export function TaskWidget() {
  const [tab, setTab] = useState<TaskWidgetTabs>('all');
  // const [tasks] = useState(TASK_WIDGET_DATA);

  const { data } = useQuery({
    queryKey: ['getMyTasks'],
    queryFn: () => getMyTasks(),
  });

  const handleTabChange = (newTab: TaskWidgetTabs) => () => setTab(newTab);

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
    <Card className="appear divide-y rounded-lg bg-white">
      <CardHeader className="gap-3 px-8 py-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="whitespace-nowrap text-xl font-bold">My Tasks</CardTitle>
        <div className="flex flex-col items-center justify-end gap-2 xs:flex-row sm:gap-6">
          <Button
            onClick={handleTabChange('all')}
            className={cn(
              'w-14 rounded-full bg-white py-2.5 transition-all duration-300 ease-in-out',
              tab === 'all' && 'bg-custom-100 font-bold',
            )}
          >
            All
          </Button>
          <Button
            onClick={handleTabChange('completed')}
            className={cn(
              'w-28 rounded-full bg-white py-2.5 transition-all duration-300 ease-in-out',
              tab === 'completed' && 'bg-custom-100 font-bold',
            )}
          >
            Completed
          </Button>
          <Button
            onClick={handleTabChange('pastDue')}
            className={cn(
              'w-28 rounded-full bg-white py-2.5 transition-all duration-300 ease-in-out',
              tab === 'pastDue' && 'bg-custom-100 font-bold',
            )}
          >
            Past Due
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <DotsVerticalIcon className="h-5 w-5 text-custom-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuItem>Action A</DropdownMenuItem>
              <DropdownMenuItem>Action B</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="no-scrollbar max-h-[28rem] overflow-y-auto p-4">
        <ul className="flex flex-col items-end gap-2.5">
          {filteredTasks.map(({ id, dueDate, title, description, createdAt, createdBy, boardLane, timeAgo,  }) => {
            const formattedTime = formatDistance(dueDate.toString(), new Date(), {
              addSuffix: true,
            });

            const formattedStartDate = format(createdAt.toString(), 'MMMM dd, yyyy');
            const formattedEndDate = format(dueDate.toString(), 'MMMM dd, yyyy');

            return (
              <TaskItem
                key={id}
                id={id}
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
                image = {createdBy.image}
              />
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
