import { X } from 'lucide-react';
import { useState } from 'react';
import { formatDistance } from 'date-fns';

import { CustomIcon } from '../../CustomIcon';

import { NOTIFICATIONS_MOCK } from './mockData';
import { NotificationItem } from './NotificationItem';

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/Dialog';
import { Button } from '@/components/Button';

type NotificationsMenuProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function NotificationsMenu({ isOpen, setIsOpen }: NotificationsMenuProps) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_MOCK);

  const notificationCount = notifications.map(({ isRead }) => isRead === false).length;

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="relative flex h-8 w-8 items-center justify-center">
          <CustomIcon variant="bell" className="text-[#888]" />
          <div className="absolute -right-1 -top-1 h-4 w-5 select-none rounded-full bg-error-300 text-center text-xs font-medium text-white">
            {notificationCount}
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent
        variant="side"
        className="fixed bottom-0 right-0 top-0 z-[60] h-dvh w-full max-w-md overflow-y-auto rounded-l-xl bg-white text-[13px] transition !duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full"
      >
        <DialogHeader className="flex flex-row items-center justify-between px-10 pb-4 pt-14">
          <DialogClose asChild>
            <Button
              type="button"
              className="absolute left-5 top-5 h-8 w-8 -translate-y-0.5 rounded-full bg-custom-100 p-0 opacity-70 shadow-none outline-none ring-offset-background transition-opacity hover:bg-custom-50 hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
          <DialogTitle className="font-bold tracking-wide">Notifications</DialogTitle>
          <Button type="button" className="text-primary-100 hover:underline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </DialogHeader>
        <ul>
          {notifications
            .sort((d1, d2) => new Date(d2.time).getTime() - new Date(d1.time).getTime())
            .map(({ approver, id, image, isRead, task, time }) => {
              const formattedTime = formatDistance(time, new Date(), {
                addSuffix: true,
              });

              return (
                <NotificationItem
                  key={id}
                  approver={approver}
                  image={image}
                  isRead={isRead}
                  task={task}
                  formattedTime={formattedTime}
                  variant="notification"
                />
              );
            })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
