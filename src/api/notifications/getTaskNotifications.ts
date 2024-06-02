import axios from 'axios';

import { TNotificationList } from '@/types/notifications';

type TGetNotificationsResponse = {
  message: string;
  notificationList: TNotificationList[];
};

export const getTaskNotifications = async () => {
  const { data } = await axios.get<TGetNotificationsResponse>('/notification/by-account');

  return data.notificationList;
};
