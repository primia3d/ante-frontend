import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { formatDistance } from 'date-fns';

import { UPDATES_WIDGET_DATA } from './mockData';

import { Button } from '@/components/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { cn } from '@/utils/cn';
import { UpdateWidgetTabs } from '@/types/dashboard';
import { NotificationItem } from '@/features/Header/Notifications/NotificationItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';

export function UpdatesWidget() {
  const [tab, setTab] = useState<UpdateWidgetTabs>('all');
  const [updates] = useState(UPDATES_WIDGET_DATA);

  const handleTabChange = (newTab: UpdateWidgetTabs) => () => setTab(newTab);

  let filteredUpdates = updates;
  if (tab === 'unread') {
    filteredUpdates = updates.filter((update) => !update.isRead);
  }

  return (
    <Card className="appear divide-y rounded-lg bg-white">
      <CardHeader className="gap-3 px-8 py-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="whitespace-nowrap text-xl font-bold">Updates</CardTitle>
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
            onClick={handleTabChange('unread')}
            className={cn(
              'w-28 rounded-full bg-white py-2.5 transition-all duration-300 ease-in-out',
              tab === 'unread' && 'bg-custom-100 font-bold',
            )}
          >
            Unread
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
          {filteredUpdates.map(({ id, isRead, time, title, image }) => {
            const formattedTime = formatDistance(time, new Date(), {
              addSuffix: true,
            });

            return (
              <NotificationItem
                key={id}
                isRead={isRead}
                image={image}
                task={title}
                formattedTime={formattedTime}
                approver="David Paman"
                variant="update"
              />
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
