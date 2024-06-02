import { TabsContent } from '@radix-ui/react-tabs';
import { formatDistance } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { NotificationItem } from '../Header/Notifications/NotificationItem';

import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';
import { useSocketStore } from '@/lib/socketStore';
import { getTaskNotifications } from '@/api/notifications/getTaskNotifications';

export function Updates() {
  const { onEvent, connect, disconnect } = useSocketStore();
  const { data: notificationData = [], refetch } = useQuery({
    queryKey: ['getTaskNotifications'],
    queryFn: () => getTaskNotifications(),
  });
  const defaultImage = '/images/person02.webp';

  useEffect(() => {
    connect();

    const handleBroadcastTaskCreated = async () => {
      await refetch();
    };

    onEvent('BROADCAST_TASK_CREATED', handleBroadcastTaskCreated);

    return () => {
      disconnect();
    };
  }, [connect, disconnect, onEvent, refetch]);

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
          value="unread"
          className="h-9 rounded-full px-4 text-custom-300 data-[state=active]:bg-custom-100 data-[state-active]:font-bold data-[state=active]:shadow-none"
        >
          Unread
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="p-6">
        <ul className="flex flex-col items-end gap-2.5">
          {notificationData.map(({ Notifications, id, updatedAt, hasRead }) => {
            const formattedTime = formatDistance(updatedAt, new Date(), {
              addSuffix: true,
            });

            return (
              <NotificationItem
                key={id}
                isRead={hasRead}
                image={defaultImage}
                task={Notifications.content}
                formattedTime={formattedTime}
                approver="David Paman"
                variant="update"
              />
            );
          })}
        </ul>
      </TabsContent>
      <TabsContent value="unread" className="p-6">
        <ul className="flex flex-col items-end gap-2.5">
          {notificationData
            .filter(({ hasRead }) => !hasRead)
            .map(({ Notifications, id, updatedAt, hasRead }) => {
              const formattedTime = formatDistance(updatedAt, new Date(), {
                addSuffix: true,
              });

              return (
                <NotificationItem
                  key={id}
                  isRead={hasRead}
                  image={defaultImage}
                  task={Notifications.content}
                  formattedTime={formattedTime}
                  approver="David Paman"
                  variant="update"
                />
              );
            })}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
