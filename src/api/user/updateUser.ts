import axios from 'axios';

import { TUser } from '@/types/user';

type TParams = {
  id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  username: string;
  password: string;
  roleID: string;
};

type TUpdateUserResponse = {
  message: string;
  data: TUser;
  token: string;
};

export const updateUser = async (params: TParams) => {
  return axios.patch<TUpdateUserResponse>(`/account`, params);
};
