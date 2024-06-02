import axios from 'axios';

import { TUser } from '@/types/user';

type TParams = {
  id: string;
};

type TUpdateUserResponse = {
  message: string;
  data: TUser;
  token: string;
};

export const deleteUser = async (params: TParams) => {
  return axios.delete<TUpdateUserResponse>(`/account`, { data: { id: params.id } });
};
