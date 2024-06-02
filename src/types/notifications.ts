export type TNotifications = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TNotificationList = {
  id: number;
  notificationsId: number;
  receiverId: string;
  projectId: number;
  taskId: number;
  hasRead: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  Notifications: TNotifications;
};
