import axios from 'axios';

import { TUser } from '@/types/user';

type TParams = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  username: string;
  password: string;
  roleID: string;
};

type TCreateUserResponse = {
  message: string;
  data: TUser;
  token: string;
};

export const createUser = async (params: TParams) => {
  return axios.post<TCreateUserResponse>(`/account`, params);
};
