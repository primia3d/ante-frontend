import axios from 'axios';

import { TUser } from '@/types/user';

type TGetUserByID = {
  message: string;
  data: TUser;
  token: string;
};

export const getUserByID = async ({ id }: { id: string }) => {
  return axios.get<TGetUserByID>(`/account?id=${id}`);
};
